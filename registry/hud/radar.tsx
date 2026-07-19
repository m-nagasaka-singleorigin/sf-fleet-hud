"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type RadarBlip = {
  /** Bearing in degrees: 0 = top (north), clockwise. */
  angle: number
  /** Distance from center as a fraction of the radius (0 = center, 1 = rim). */
  distance: number
  /** Accent-colored contact. */
  hot?: boolean
  /** Blink stagger, e.g. "0.6s". Defaults to index * 0.5s. */
  delay?: string
}

const DEFAULT_BLIPS: RadarBlip[] = [
  { angle: 21, distance: 0.6, hot: true, delay: "0s" },
  { angle: 306, distance: 0.54, delay: "0.6s" },
  { angle: 112, distance: 0.43, delay: "1.1s" },
  { angle: 217, distance: 0.4, hot: true, delay: "1.7s" },
  { angle: 18, distance: 0.13, delay: "2.1s" },
]

// Decorative by default; pass `blips` to plot real polar data.
// Hidden from AT; pair with a visible data readout.
function Radar({
  className,
  size = 280,
  blips = DEFAULT_BLIPS,
  ...props
}: React.ComponentProps<"div"> & { size?: number; blips?: RadarBlip[] }) {
  return (
    <div aria-hidden className={cn("relative", className)} style={{ width: size, height: size }} {...props}>
      <div className="absolute inset-0 rounded-full border border-[#33383C]" />
      <div className="absolute inset-[18%] rounded-full border border-border" />
      <div className="absolute inset-[36%] rounded-full border border-dashed border-border" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-[#1D2023]" />
      <div className="absolute inset-y-0 left-1/2 w-px bg-[#1D2023]" />
      <div
        className="absolute inset-0 rounded-full motion-safe:animate-[hud-rot_4s_linear_infinite]"
        style={{ background: "conic-gradient(from 0deg, transparent 78%, color-mix(in srgb, var(--primary) 22%, transparent) 100%)" }}
      />
      {blips.map((b, i) => {
        const rad = (b.angle * Math.PI) / 180
        const d = Math.max(0, Math.min(1, b.distance)) * 50
        const left = 50 + d * Math.sin(rad)
        const top = 50 - d * Math.cos(rad)
        return (
          <span
            key={i}
            className={cn(
              "absolute size-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full motion-safe:animate-[hud-pulse_2.4s_ease-in-out_infinite]",
              b.hot ? "bg-primary shadow-[0_0_5px_var(--primary)]" : "bg-[#9AA0A4] shadow-[0_0_5px_#9AA0A4]"
            )}
            style={{ top: `${top}%`, left: `${left}%`, animationDelay: b.delay ?? `${i * 0.5}s` }}
          />
        )
      })}
      <span className="absolute left-1/2 top-1/2 -ml-0.5 -mt-0.5 size-1 bg-primary" />
      <style>{"@keyframes hud-rot{to{transform:rotate(360deg)}}@keyframes hud-pulse{0%,100%{opacity:.9}50%{opacity:.35}}"}</style>
    </div>
  )
}

export { Radar }
