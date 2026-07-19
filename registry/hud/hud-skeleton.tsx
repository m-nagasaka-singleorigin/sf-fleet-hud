import * as React from "react"
import { cn } from "@/lib/utils"

// Shimmer is a FIXED 180px-wide gradient swept via background-position,
// clipped inside each block (overflow-hidden) so speed is uniform across widths.
function HudSkeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("relative overflow-hidden bg-[#1A1D20]", className)} {...props}>
      <span
        aria-hidden
        className="block size-full motion-safe:animate-[hud-skel_1.8s_linear_infinite]"
        style={{
          background: "linear-gradient(90deg, transparent 35%, rgba(220,228,234,0.09) 50%, transparent 65%)",
          backgroundSize: "180px 100%",
          backgroundRepeat: "no-repeat",
        }}
      />
      <style>{"@keyframes hud-skel{from{background-position:-180px 0}to{background-position:320px 0}}"}</style>
    </div>
  )
}

export { HudSkeleton }
