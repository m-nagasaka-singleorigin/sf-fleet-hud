import * as React from "react"
import { cn } from "@/lib/utils"

// Inline SVG sparkline. Values are normalized to the viewBox; stroke follows
// currentColor so wrap it in a text color class (defaults to primary).
function HudSparkline({
  className,
  values,
  width = 90,
  height = 28,
  strokeWidth = 1.5,
  ...props
}: Omit<React.ComponentProps<"svg">, "values"> & {
  values: number[]
  width?: number
  height?: number
  strokeWidth?: number
}) {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = max - min || 1
  const pad = 4
  const step = values.length > 1 ? (width - 0) / (values.length - 1) : 0
  const points = values
    .map((v, i) => `${i * step},${height - pad - ((v - min) / span) * (height - pad * 2)}`)
    .join(" ")
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden
      className={cn("block text-primary", className)}
      style={{ width }}
      {...props}
    >
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  )
}

export { HudSparkline }
