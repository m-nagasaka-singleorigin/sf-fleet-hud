import * as React from "react"
import { cn } from "@/lib/utils"

// Intensity matrix. Each value in [0, 1] tints a square cell toward the accent.
function HudHeatmap({
  className,
  values,
  columns = 12,
  ...props
}: React.ComponentProps<"div"> & { values: number[]; columns?: number }) {
  return (
    <div
      aria-hidden
      className={cn("grid gap-[3px]", className)}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      {...props}
    >
      {values.map((v, i) => {
        const pct = Math.round(Math.max(0, Math.min(1, v)) * 100)
        return (
          <span
            key={i}
            className="aspect-square"
            style={{
              background:
                pct === 0
                  ? "#14171A"
                  : `color-mix(in srgb, var(--primary) ${pct}%, #14171A)`,
            }}
          />
        )
      })}
    </div>
  )
}

export { HudHeatmap }
