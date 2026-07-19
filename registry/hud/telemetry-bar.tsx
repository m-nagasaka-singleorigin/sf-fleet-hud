import * as React from "react"
import { cn } from "@/lib/utils"

function TelemetryBar({ className, label, value, max = 100, unit = "%", warn = false, ...props }: React.ComponentProps<"div"> & { label: string; value: number; max?: number; unit?: string; warn?: boolean }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className={cn("w-full", className)} {...props}>
      <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-[#6E7478]">
        <span>{label}</span>
        <span className={warn ? "text-warning" : "text-[#C8CCCE]"}>{value}{unit}</span>
      </div>
      <div className="mt-1.5 h-[3px] bg-[#1D2023]">
        <div className={cn("h-full", warn ? "bg-warning" : "bg-[#8A9094]")} style={{ width: pct + "%" }} />
      </div>
    </div>
  )
}

export { TelemetryBar }
