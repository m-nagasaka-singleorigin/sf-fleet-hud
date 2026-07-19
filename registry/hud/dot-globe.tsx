"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { LAND_DOTS_B64 } from "@/registry/hud/dot-globe-data"

export type GlobeMarker = {
  /** Short label, e.g. an AWS region code. */
  code: string
  lat: number
  lon: number
  status?: "ok" | "incident"
}

const PALETTE = {
  rim: "#33383C",
  sphere: "#0C0E10",
}

function hexToRgb(hex: string, fallback: [number, number, number]): [number, number, number] {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim())
  if (!m) return fallback
  const v = parseInt(m[1], 16)
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255]
}

// Decode [lat, lon] centidegree pairs into unit vectors (x, y, z).
let LAND_VECS: Float32Array | null = null
function landVecs(): Float32Array {
  if (LAND_VECS) return LAND_VECS
  const bin = atob(LAND_DOTS_B64)
  const bytes = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
  const pairs = new Int16Array(bytes.buffer)
  const n = pairs.length / 2
  const v = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    const lat = (pairs[i * 2] / 100) * (Math.PI / 180)
    const lon = (pairs[i * 2 + 1] / 100) * (Math.PI / 180)
    v[i * 3] = Math.cos(lat) * Math.cos(lon)
    v[i * 3 + 1] = Math.sin(lat)
    v[i * 3 + 2] = Math.cos(lat) * Math.sin(lon)
  }
  LAND_VECS = v
  return v
}

function toVec(lat: number, lon: number): [number, number, number] {
  const la = lat * (Math.PI / 180)
  const lo = lon * (Math.PI / 180)
  return [Math.cos(la) * Math.cos(lo), Math.sin(la), Math.cos(la) * Math.sin(lo)]
}

// Interactive dotted globe: drag to rotate, wheel to zoom.
// Decorative by default; pass `markers` to plot real locations.
function DotGlobe({
  className,
  size = 340,
  markers = [],
  autoRotate = true,
  initialLon = -50,
  initialLat = 22,
  edgeGlow = false,
  dotGlow = false,
  ...props
}: React.ComponentProps<"div"> & {
  size?: number
  markers?: GlobeMarker[]
  autoRotate?: boolean
  initialLon?: number
  initialLat?: number
  /** Soft accent bloom around the globe rim. */
  edgeGlow?: boolean
  /** Additive halo behind each land dot. */
  dotGlow?: boolean
}) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const stateRef = React.useRef({
    yaw: ((initialLon - 90) * Math.PI) / 180,
    pitch: (initialLat * Math.PI) / 180,
    zoom: 1,
    dragging: false,
    lastX: 0,
    lastY: 0,
    lastMoveT: 0,
    vyaw: 0,
    vpitch: 0,
    lastInteraction: 0,
  })

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    // Resolve theme accents so the globe follows accent-color overrides,
    // re-resolving when the theme changes at runtime (e.g. data-accent toggle).
    let ar = 255, ag = 122, ab = 41, ir = 229, ig = 72, ib = 77
    let dr = 138, dg = 144, db = 148
    let accent = "", incidentColor = ""
    const resolveColors = () => {
      const styles = getComputedStyle(canvas)
      ;[ar, ag, ab] = hexToRgb(styles.getPropertyValue("--primary"), [255, 122, 41])
      ;[ir, ig, ib] = hexToRgb(styles.getPropertyValue("--destructive"), [229, 72, 77])
      ;[dr, dg, db] = hexToRgb(styles.getPropertyValue("--globe-dot"), [138, 144, 148])
      accent = `rgb(${ar},${ag},${ab})`
      incidentColor = `rgb(${ir},${ig},${ib})`
    }
    resolveColors()
    const observer = new MutationObserver(resolveColors)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-accent", "class", "style"],
    })
    canvas.width = size * dpr
    canvas.height = size * dpr

    const vecs = landVecs()
    const n = vecs.length / 3
    const markerVecs = markers.map((m) => ({ ...m, vec: toVec(m.lat, m.lon) }))
    const st = stateRef.current
    let raf = 0
    let prev = performance.now()

    const project = (x: number, y: number, z: number, R: number, cx: number, cy: number) => {
      const cy1 = Math.cos(st.yaw)
      const sy1 = Math.sin(st.yaw)
      const cp = Math.cos(st.pitch)
      const sp = Math.sin(st.pitch)
      const x1 = x * cy1 + z * sy1
      const z1 = -x * sy1 + z * cy1
      const y2 = y * cp - z1 * sp
      const z2 = y * sp + z1 * cp
      // Mirror x so that east runs to the viewer's right (outside view).
      return [cx - x1 * R, cy - y2 * R, z2] as const
    }

    const draw = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.1)
      prev = now

      // inertia after release
      const coasting = Math.abs(st.vyaw) > 0.002 || Math.abs(st.vpitch) > 0.002
      if (!st.dragging && coasting) {
        st.yaw += st.vyaw * dt
        st.pitch = Math.max(-1.3, Math.min(1.3, st.pitch + st.vpitch * dt))
        const decay = Math.exp(-dt * 3)
        st.vyaw *= decay
        st.vpitch *= decay
      }
      if (autoRotate && !reduced && !st.dragging && !coasting && now - st.lastInteraction > 2500) {
        st.yaw += dt * 0.05
      }

      const w = size * dpr
      const cx = w / 2
      const R = (w / 2 - 8 * dpr) * st.zoom
      ctx.clearRect(0, 0, w, w)

      // sphere disc + rim
      ctx.beginPath()
      ctx.arc(cx, cx, R, 0, Math.PI * 2)
      ctx.fillStyle = PALETTE.sphere
      ctx.fill()
      if (edgeGlow) {
        // outer bloom
        ctx.save()
        ctx.shadowColor = `rgba(${ar},${ag},${ab},0.55)`
        ctx.shadowBlur = 16 * dpr
        ctx.beginPath()
        ctx.arc(cx, cx, R, 0, Math.PI * 2)
        ctx.lineWidth = 1.5 * dpr
        ctx.strokeStyle = `rgba(${ar},${ag},${ab},0.5)`
        ctx.stroke()
        ctx.restore()
        // inner atmosphere
        const atm = ctx.createRadialGradient(cx, cx, R * 0.78, cx, cx, R)
        atm.addColorStop(0, `rgba(${ar},${ag},${ab},0)`)
        atm.addColorStop(1, `rgba(${ar},${ag},${ab},0.09)`)
        ctx.beginPath()
        ctx.arc(cx, cx, R, 0, Math.PI * 2)
        ctx.fillStyle = atm
        ctx.fill()
      }
      ctx.lineWidth = 1 * dpr
      ctx.strokeStyle = PALETTE.rim
      ctx.beginPath()
      ctx.arc(cx, cx, R, 0, Math.PI * 2)
      ctx.stroke()

      // land dots (front hemisphere only, depth-faded squares)
      const ds = Math.max(1, 1.1 * dpr * st.zoom)
      if (dotGlow) ctx.globalCompositeOperation = "lighter"
      for (let i = 0; i < n; i++) {
        const [sx, sy, z] = project(vecs[i * 3], vecs[i * 3 + 1], vecs[i * 3 + 2], R, cx, cx)
        if (z <= 0) continue
        if (dotGlow) {
          const hs = ds * 3
          ctx.fillStyle = `rgba(${dr},${dg},${db},${0.04 + 0.09 * z})`
          ctx.fillRect(sx - hs / 2, sy - hs / 2, hs, hs)
        }
        ctx.fillStyle = `rgba(${dr},${dg},${db},${0.16 + 0.5 * z})`
        ctx.fillRect(sx - ds / 2, sy - ds / 2, ds, ds)
      }
      if (dotGlow) ctx.globalCompositeOperation = "source-over"

      // markers
      for (const m of markerVecs) {
        const [sx, sy, z] = project(m.vec[0], m.vec[1], m.vec[2], R, cx, cx)
        if (z <= 0.02) continue
        const incident = m.status === "incident"
        const color = incident ? incidentColor : accent
        const s = (incident ? 5 : 4) * dpr

        if (incident) {
          // expanding pulse ring
          const t = reduced ? 0.35 : ((now / 1600) % 1)
          const pr = s + t * 11 * dpr
          ctx.beginPath()
          ctx.arc(sx, sy, pr, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(${ir},${ig},${ib},${0.55 * (1 - t)})`
          ctx.lineWidth = 1 * dpr
          ctx.stroke()
        }

        ctx.save()
        ctx.translate(sx, sy)
        ctx.rotate(Math.PI / 4)
        ctx.globalAlpha = 0.45 + 0.55 * z
        ctx.fillStyle = color
        ctx.fillRect(-s / 2, -s / 2, s, s)
        ctx.restore()
        ctx.globalAlpha = 1

        if (incident) {
          ctx.font = `${10 * dpr}px "Share Tech Mono", monospace`
          ctx.fillStyle = incidentColor
          const blink = reduced ? 1 : Math.sin(now / 260) > -0.4 ? 1 : 0.35
          ctx.globalAlpha = blink
          ctx.fillText(`${m.code.toUpperCase()} — INCIDENT`, sx + 10 * dpr, sy - 8 * dpr)
          ctx.globalAlpha = 1
        }
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    const onPointerDown = (e: PointerEvent) => {
      st.dragging = true
      st.lastX = e.clientX
      st.lastY = e.clientY
      st.lastMoveT = performance.now()
      st.vyaw = 0
      st.vpitch = 0
      canvas.setPointerCapture(e.pointerId)
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!st.dragging) return
      const now = performance.now()
      const dtm = Math.max((now - st.lastMoveT) / 1000, 0.001)
      const dx = e.clientX - st.lastX
      const dy = e.clientY - st.lastY
      st.lastX = e.clientX
      st.lastY = e.clientY
      st.lastMoveT = now
      const dyaw = -(dx * 0.006) / st.zoom
      const dpitch = (dy * 0.004) / st.zoom
      st.yaw += dyaw
      st.pitch = Math.max(-1.3, Math.min(1.3, st.pitch + dpitch))
      // blend instantaneous velocity for release inertia
      const cap = 3
      st.vyaw = Math.max(-cap, Math.min(cap, 0.75 * (dyaw / dtm) + 0.25 * st.vyaw))
      st.vpitch = Math.max(-cap, Math.min(cap, 0.75 * (dpitch / dtm) + 0.25 * st.vpitch))
      st.lastInteraction = now
    }
    const onPointerUp = () => {
      st.dragging = false
      // if the pointer paused before release, don't fling
      if (performance.now() - st.lastMoveT > 90 || reduced) {
        st.vyaw = 0
        st.vpitch = 0
      }
      st.lastInteraction = performance.now()
    }
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      st.zoom = Math.max(0.7, Math.min(2.4, st.zoom * Math.exp(-e.deltaY * 0.0012)))
      st.lastInteraction = performance.now()
    }

    canvas.addEventListener("pointerdown", onPointerDown)
    canvas.addEventListener("pointermove", onPointerMove)
    canvas.addEventListener("pointerup", onPointerUp)
    canvas.addEventListener("pointercancel", onPointerUp)
    canvas.addEventListener("wheel", onWheel, { passive: false })

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      canvas.removeEventListener("pointerdown", onPointerDown)
      canvas.removeEventListener("pointermove", onPointerMove)
      canvas.removeEventListener("pointerup", onPointerUp)
      canvas.removeEventListener("pointercancel", onPointerUp)
      canvas.removeEventListener("wheel", onWheel)
    }
  }, [size, markers, autoRotate, edgeGlow, dotGlow])

  return (
    <div aria-hidden className={cn("relative select-none", className)} {...props}>
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size, touchAction: "none", cursor: "grab" }}
      />
    </div>
  )
}

export { DotGlobe }
