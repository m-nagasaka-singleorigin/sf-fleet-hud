import * as React from "react"
import { cn } from "@/lib/utils"

function SegmentBar({ className, segments = 10, filled = 0, ...props }: React.ComponentProps<"div"> & { segments?: number; filled?: number }) {
  return (
    <div className={cn("flex gap-[3px]", className)} role="meter" aria-valuemin={0} aria-valuemax={segments} aria-valuenow={filled} {...props}>
      {Array.from({ length: segments }, (_, i) => (
        <span key={i} className={cn("h-2 flex-1", i < filled ? "bg-primary" : "bg-[#1D2023]")} />
      ))}
    </div>
  )
}

export { SegmentBar }
