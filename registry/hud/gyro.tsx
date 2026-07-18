"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Decorative 3D attitude widget. Hidden from AT; pair with numeric pitch/yaw/roll readouts.
function Gyro({ className, size = 320, ...props }: React.ComponentProps<"div"> & { size?: number }) {
  return (
    <div aria-hidden className={cn("relative", className)} style={{ width: size, height: size, perspective: 700 }} {...props}>
      <div className="absolute inset-[10%] [transform-style:preserve-3d]">
        <div className="absolute inset-0 rounded-full border border-[rgba(212,216,218,0.55)] motion-safe:animate-[hud-gy1_9s_linear_infinite]" />
        <div className="absolute inset-[6%] rounded-full border border-[rgba(212,216,218,0.35)] motion-safe:animate-[hud-gy2_13s_linear_infinite]" />
        <div className="absolute inset-[14%] rounded-full border border-dashed border-primary/75 motion-safe:animate-[hud-gy3_7s_linear_infinite]" />
        <div className="absolute inset-[26%] rounded-full border border-[rgba(138,144,148,0.4)] motion-safe:animate-[hud-gy2_17s_linear_infinite]" />
      </div>
      <div className="absolute inset-[38%] rounded-full border border-primary/50" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--primary) 22%, transparent), transparent 70%)" }} />
      <div className="absolute -inset-x-[4%] top-1/2 h-px bg-[#1D2023]" />
      <div className="absolute -inset-y-[4%] left-1/2 w-px bg-[#1D2023]" />
      <style>{
        "@keyframes hud-gy1{from{transform:rotateX(68deg) rotate(0)}to{transform:rotateX(68deg) rotate(360deg)}}" +
        "@keyframes hud-gy2{from{transform:rotateY(72deg) rotateX(12deg) rotate(0)}to{transform:rotateY(72deg) rotateX(12deg) rotate(-360deg)}}" +
        "@keyframes hud-gy3{from{transform:rotateX(32deg) rotateY(-24deg) rotate(0)}to{transform:rotateX(32deg) rotateY(-24deg) rotate(360deg)}}"
      }</style>
    </div>
  )
}

export { Gyro }
