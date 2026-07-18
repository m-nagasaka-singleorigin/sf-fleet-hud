"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const BLIPS: Array<[string, string, string, boolean]> = [
  ["22%", "61%", "0s", true],
  ["34%", "28%", "0.6s", false],
  ["58%", "70%", "1.1s", false],
  ["66%", "38%", "1.7s", true],
  ["44%", "52%", "2.1s", false],
]

// Decorative. Hidden from AT; pair with a visible data readout.
function Radar({ className, size = 280, ...props }: React.ComponentProps<"div"> & { size?: number }) {
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
      {BLIPS.map(([top, left, delay, hot], i) => (
        <span
          key={i}
          className={cn("absolute size-[5px] rounded-full motion-safe:animate-[hud-pulse_2.4s_ease-in-out_infinite]", hot ? "bg-primary shadow-[0_0_5px_var(--primary)]" : "bg-[#9AA0A4] shadow-[0_0_5px_#9AA0A4]")}
          style={{ top, left, animationDelay: delay }}
        />
      ))}
      <span className="absolute left-1/2 top-1/2 -ml-0.5 -mt-0.5 size-1 bg-primary" />
      <style>{"@keyframes hud-rot{to{transform:rotate(360deg)}}@keyframes hud-pulse{0%,100%{opacity:.9}50%{opacity:.35}}"}</style>
    </div>
  )
}

export { Radar }
