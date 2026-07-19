"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Categorical comparison, built from plain elements rather than SVG so axis type
// stays real text at the kit's 10px minimum. Distinct in role from telemetry-bar
// (one labelled progress bar) and segment-bar (a tick scale).
//
// Series share the validated monochrome order used by hud-line-chart: lightness
// steps, not hues. --chart-5 (red) stays reserved for status. Bars carry a 2px
// surface gap so adjacent steps never bleed together, and data-ends are square —
// the kit is radius 0 by design.
const SERIES_COLORS = [
  "var(--chart-1)", // #FF7A29 accent
  "var(--chart-3)", // #C8CCCE
  "var(--chart-2)", // #8A9094
  "var(--chart-4)", // #5A6065
]

type BarGroup = {
  label: string
  values: number[]
}

function HudBarChart({
  className,
  data,
  series,
  max: maxProp,
  unit = "",
  height = 200,
  horizontal = false,
  legend = true,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  data: BarGroup[]
  /** Series names. Required when groups hold more than one value. */
  series?: string[]
  max?: number
  unit?: string
  /** Plot height in px. Ignored when horizontal. */
  height?: number
  horizontal?: boolean
  legend?: boolean
}) {
  const [hover, setHover] = React.useState<string | null>(null)
  const max = maxProp ?? (Math.max(...data.flatMap((d) => d.values), 0) || 1)
  const names = series ?? []

  const swatch = (i: number) => SERIES_COLORS[i % SERIES_COLORS.length]

  const readout = (g: BarGroup, si: number) => (
    <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 -translate-x-1/2 border border-border bg-popover px-2 py-1 whitespace-nowrap">
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#7A8085]">
        {names[si] ? `${names[si]} // ` : ""}
        {g.label}
      </span>
      <span className="ml-2 font-mono text-[10px] text-[#D4D8DA]">
        {g.values[si]}
        {unit}
      </span>
    </div>
  )

  return (
    <div className={cn("w-full", className)} {...props}>
      {legend && names.length > 1 && (
        <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1">
          {names.map((n, i) => (
            <span key={n} className="flex items-center gap-1.5">
              <span className="size-2" style={{ background: swatch(i) }} />
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#7A8085]">
                {n}
              </span>
            </span>
          ))}
        </div>
      )}

      {horizontal ? (
        <div className="flex flex-col gap-2">
          {data.map((g) => (
            <div key={g.label} className="flex items-center gap-3">
              <span className="w-20 shrink-0 truncate text-right font-mono text-[10px] uppercase tracking-[0.12em] text-[#5A6065]">
                {g.label}
              </span>
              <div className="flex flex-1 flex-col gap-0.5">
                {g.values.map((v, si) => (
                  <div
                    key={si}
                    className="relative h-2.5 bg-[#14171A]"
                    onMouseEnter={() => setHover(`${g.label}-${si}`)}
                    onMouseLeave={() => setHover(null)}
                  >
                    <div
                      className="h-full"
                      style={{
                        width: `${Math.max(0, Math.min(1, v / max)) * 100}%`,
                        background: swatch(si),
                      }}
                    />
                    {hover === `${g.label}-${si}` && readout(g, si)}
                  </div>
                ))}
              </div>
              {/* Trailing readout only makes sense for a single series; grouped
                  rows would silently show just the first value. */}
              {g.values.length === 1 && (
                <span className="w-12 shrink-0 font-mono text-[10px] text-[#D4D8DA]">
                  {g.values[0]}
                  {unit}
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className="flex items-end gap-2" style={{ height }}>
            {data.map((g) => (
              <div key={g.label} className="flex h-full flex-1 items-end gap-0.5">
                {g.values.map((v, si) => (
                  <div
                    key={si}
                    className="relative flex h-full flex-1 items-end"
                    onMouseEnter={() => setHover(`${g.label}-${si}`)}
                    onMouseLeave={() => setHover(null)}
                  >
                    <div
                      className="w-full"
                      style={{
                        height: `${Math.max(0, Math.min(1, v / max)) * 100}%`,
                        background: swatch(si),
                      }}
                    />
                    {hover === `${g.label}-${si}` && readout(g, si)}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-1.5 flex gap-2 border-t border-[#1D2023] pt-1.5">
            {data.map((g) => (
              <span
                key={g.label}
                className="flex-1 truncate text-center font-mono text-[10px] uppercase tracking-[0.12em] text-[#5A6065]"
              >
                {g.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export { HudBarChart, type BarGroup }
