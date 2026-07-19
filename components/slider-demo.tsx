"use client"

import * as React from "react"
import { HudSlider } from "@/registry/hud/hud-slider"

export function SliderDemo() {
  const [interval, setInterval] = React.useState([4])
  const [ping, setPing] = React.useState([8, 42])

  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <div>
        <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-[#6E7478]">
          <span>Scan Interval</span>
          <span className="text-primary">{interval[0].toFixed(1)}S</span>
        </div>
        <HudSlider
          value={interval}
          onValueChange={setInterval}
          min={1}
          max={10}
          step={0.1}
          className="mt-2"
        />
        <div className="mt-1 flex justify-between font-mono text-[8px] text-[#4A5054]">
          <span>1S</span>
          <span>5S</span>
          <span>10S</span>
        </div>
      </div>
      <div>
        <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-[#6E7478]">
          <span>Ping Threshold (Range)</span>
          <span className="text-primary">
            {String(ping[0]).padStart(2, "0")} — {String(ping[1]).padStart(2, "0")}MS
          </span>
        </div>
        <HudSlider value={ping} onValueChange={setPing} min={0} max={100} className="mt-2" />
        <div className="mt-1 flex justify-between font-mono text-[8px] text-[#4A5054]">
          <span>0MS</span>
          <span>50MS</span>
          <span>100MS</span>
        </div>
      </div>
    </div>
  )
}
