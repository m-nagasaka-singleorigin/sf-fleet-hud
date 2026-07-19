import * as React from "react"
import { cn } from "@/lib/utils"

// Ring gauge drawn with a masked conic-gradient. Decorative pairing for a numeric readout.
function HudGauge({
  className,
  value,
  label,
  size = 110,
  ...props
}: React.ComponentProps<"div"> & { value: number; label?: string; size?: number }) {
  const pct = Math.max(0, Math.min(100, value))
  const deg = pct * 3.6
  return (
    <div
      role="meter"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      aria-label={label}
      className={cn("relative", className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(var(--primary) 0deg ${deg}deg, #1D2023 ${deg}deg 360deg)`,
          WebkitMask: "radial-gradient(circle, transparent 58%, #000 59%)",
          mask: "radial-gradient(circle, transparent 58%, #000 59%)",
        }}
      />
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="font-sans text-[26px] leading-none font-semibold text-foreground">
            {Math.round(pct)}
          </div>
          {label && (
            <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#5A6065]">
              {label}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export { HudGauge }
