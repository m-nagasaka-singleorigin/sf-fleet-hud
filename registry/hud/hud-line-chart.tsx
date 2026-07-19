"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Time-series plot drawn as inline SVG — no charting dependency, matching radar
// and dot-globe. Series are separated by LIGHTNESS plus a dash pattern, not by
// hue: this kit is monochrome + one accent by design, so colour alone would not
// distinguish them. The four steps below are the validated order (CVD and
// normal-vision separation both ΔE 16.4); --chart-5 (red) is deliberately absent
// because it is reserved as a status colour. Past 4 series, facet instead of
// inventing a fifth hue.
const SERIES_COLORS = [
  "var(--chart-1)", // #FF7A29 accent
  "var(--chart-3)", // #C8CCCE
  "var(--chart-2)", // #8A9094
  "var(--chart-4)", // #5A6065 — below 3:1 on card; direct labels are mandatory relief
]

const SERIES_DASH = ["", "5 3", "2 3", "8 3 2 3"]

type LineSeries = {
  name: string
  values: number[]
}

/** Measures the host element so text renders at true pixel size (the kit's
 *  10px minimum would break under a scaled viewBox). */
function useWidth(ref: React.RefObject<HTMLDivElement | null>) {
  const [width, setWidth] = React.useState(0)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref])
  return width
}

function niceTicks(min: number, max: number, count: number) {
  const raw = (max - min) / count
  const mag = Math.pow(10, Math.floor(Math.log10(raw || 1)))
  const step = [1, 2, 2.5, 5, 10].find((s) => s * mag >= raw)! * mag
  const ticks: number[] = []
  for (let v = Math.ceil(min / step) * step; v <= max + 1e-9; v += step) ticks.push(v)
  return ticks
}

function HudLineChart({
  className,
  series,
  labels,
  min: minProp,
  max: maxProp,
  band,
  unit = "",
  height = 200,
  area = false,
  legend = true,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  series: LineSeries[]
  /** X tick labels, one per data point. Thinned automatically to avoid collision. */
  labels?: string[]
  min?: number
  max?: number
  /** Shaded caution range, in data units. */
  band?: { from: number; to: number }
  unit?: string
  height?: number
  area?: boolean
  legend?: boolean
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const width = useWidth(ref)
  const [hover, setHover] = React.useState<number | null>(null)

  const count = Math.max(...series.map((s) => s.values.length), 0)
  const all = series.flatMap((s) => s.values)
  const lo = minProp ?? Math.min(...all, band?.from ?? Infinity)
  const hi = maxProp ?? Math.max(...all, band?.to ?? -Infinity)
  const span = hi - lo || 1

  // Right padding leaves room for the direct end-labels that carry series identity.
  const pad = { l: 40, r: 46, t: 10, b: labels ? 22 : 8 }
  const plotW = Math.max(0, width - pad.l - pad.r)
  const plotH = height - pad.t - pad.b

  const x = (i: number) => pad.l + (count > 1 ? (i / (count - 1)) * plotW : plotW / 2)
  const y = (v: number) => pad.t + plotH - ((v - lo) / span) * plotH

  const yTicks = niceTicks(lo, hi, 4)

  // End-labels are the primary identity cue, so they must never overlap: lay them
  // out top-down and push each one clear of the previous by a full line.
  const endLabels = series
    .map((s, si) => ({ si, value: s.values[s.values.length - 1] }))
    .filter((e) => e.value !== undefined)
    .map((e) => ({ ...e, y: y(e.value) }))
    .sort((a, b) => a.y - b.y)
  for (let i = 1; i < endLabels.length; i++) {
    endLabels[i].y = Math.max(endLabels[i].y, endLabels[i - 1].y + 12)
  }
  const overflow = endLabels.length
    ? Math.max(0, endLabels[endLabels.length - 1].y - (height - 4))
    : 0
  endLabels.forEach((e) => (e.y -= overflow))
  // Thin X labels to whatever fits at 10px rather than shrinking the type.
  const xStride = Math.max(1, Math.ceil(count / Math.max(1, Math.floor(plotW / 56))))

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (count < 2 || plotW <= 0) return
    const rel = e.clientX - e.currentTarget.getBoundingClientRect().left - pad.l
    setHover(Math.max(0, Math.min(count - 1, Math.round((rel / plotW) * (count - 1)))))
  }

  return (
    <div className={cn("w-full", className)} {...props}>
      {legend && series.length > 1 && (
        <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1">
          {series.map((s, i) => (
            <span key={s.name} className="flex items-center gap-1.5">
              <svg width="14" height="2" aria-hidden>
                <line
                  x1="0"
                  y1="1"
                  x2="14"
                  y2="1"
                  stroke={SERIES_COLORS[i % SERIES_COLORS.length]}
                  strokeWidth="2"
                  strokeDasharray={SERIES_DASH[i % SERIES_DASH.length]}
                />
              </svg>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#7A8085]">
                {s.name}
              </span>
            </span>
          ))}
        </div>
      )}

      <div
        ref={ref}
        className="relative"
        style={{ height }}
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
      >
        {width > 0 && (
          <svg width={width} height={height} className="block">
            {band && (
              <g>
                <rect
                  x={pad.l}
                  y={Math.min(y(band.from), y(band.to))}
                  width={plotW}
                  height={Math.abs(y(band.from) - y(band.to))}
                  fill="var(--warning)"
                  opacity={0.08}
                />
                {/* Dashed edges keep the band reading as a threshold rather than
                    as another filled series. */}
                {[band.from, band.to].map((v) =>
                  v <= lo || v >= hi ? null : (
                    <line
                      key={v}
                      x1={pad.l}
                      y1={y(v)}
                      x2={pad.l + plotW}
                      y2={y(v)}
                      stroke="var(--warning)"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                      opacity={0.4}
                    />
                  )
                )}
              </g>
            )}

            {yTicks.map((t) => (
              <g key={t}>
                <line
                  x1={pad.l}
                  y1={y(t)}
                  x2={pad.l + plotW}
                  y2={y(t)}
                  stroke="#1D2023"
                  strokeWidth="1"
                />
                <text
                  x={pad.l - 8}
                  y={y(t)}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="font-mono"
                  fontSize="10"
                  fill="#5A6065"
                >
                  {t}
                </text>
              </g>
            ))}

            {labels &&
              labels.map((l, i) =>
                i % xStride === 0 ? (
                  <text
                    key={i}
                    x={x(i)}
                    y={height - 6}
                    textAnchor="middle"
                    className="font-mono"
                    fontSize="10"
                    fill="#5A6065"
                  >
                    {l}
                  </text>
                ) : null
              )}

            {series.map((s, si) => {
              const color = SERIES_COLORS[si % SERIES_COLORS.length]
              const d = s.values.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ")
              return (
                <g key={s.name}>
                  {area && (
                    <path
                      d={`${d} L${x(s.values.length - 1)},${pad.t + plotH} L${x(0)},${pad.t + plotH} Z`}
                      fill={color}
                      opacity={0.1}
                    />
                  )}
                  <path
                    d={d}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeDasharray={SERIES_DASH[si % SERIES_DASH.length]}
                  />
                </g>
              )
            })}

            {/* Direct end-labels: required relief for the darkest step and the
                reason identity never rests on colour alone. */}
            {endLabels.map((e) => (
              <text
                key={e.si}
                x={pad.l + plotW + 6}
                y={e.y}
                dominantBaseline="middle"
                className="font-mono"
                fontSize="10"
                fill={SERIES_COLORS[e.si % SERIES_COLORS.length]}
              >
                {e.value}
                {unit}
              </text>
            ))}

            {hover !== null && (
              <g>
                <line
                  x1={x(hover)}
                  y1={pad.t}
                  x2={x(hover)}
                  y2={pad.t + plotH}
                  stroke="var(--primary)"
                  strokeWidth="1"
                  opacity={0.5}
                />
                {series.map((s, si) =>
                  s.values[hover] === undefined ? null : (
                    <circle
                      key={s.name}
                      cx={x(hover)}
                      cy={y(s.values[hover])}
                      r="4"
                      fill={SERIES_COLORS[si % SERIES_COLORS.length]}
                      stroke="var(--card)"
                      strokeWidth="2"
                    />
                  )
                )}
              </g>
            )}
          </svg>
        )}

        {hover !== null && (
          <div
            className="pointer-events-none absolute top-0 z-10 border border-border bg-popover px-2.5 py-1.5"
            style={{
              left: Math.min(Math.max(x(hover) + 10, 0), Math.max(width - 132, 0)),
              minWidth: 122,
            }}
          >
            {labels?.[hover] && (
              <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#5A6065]">
                {labels[hover]}
              </div>
            )}
            {series.map((s, si) => (
              <div key={s.name} className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-1.5">
                  <span
                    className="size-1.5"
                    style={{ background: SERIES_COLORS[si % SERIES_COLORS.length] }}
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#7A8085]">
                    {s.name}
                  </span>
                </span>
                <span className="font-mono text-[10px] text-[#D4D8DA]">
                  {s.values[hover]}
                  {unit}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export { HudLineChart, type LineSeries }
