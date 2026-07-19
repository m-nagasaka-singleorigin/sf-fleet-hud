"use client"

import * as React from "react"
import { HudSwitch } from "@/registry/hud/hud-switch"

const EFFECTS = [
  { key: "scanlines", label: "Scanlines" },
  { key: "glow", label: "Blue Glow" },
  { key: "additive", label: "Additive Lines" },
] as const

export function EffectsToggles() {
  const [on, setOn] = React.useState<Record<string, boolean>>({
    scanlines: true,
    glow: true,
    additive: true,
  })
  const [cyan, setCyan] = React.useState(false)

  React.useEffect(() => {
    for (const { key } of EFFECTS) {
      document.documentElement.setAttribute(`data-fx-${key}`, on[key] ? "on" : "off")
    }
  }, [on])

  React.useEffect(() => {
    if (cyan) document.documentElement.setAttribute("data-accent", "cyan")
    else document.documentElement.removeAttribute("data-accent")
  }, [cyan])

  return (
    <div className="flex flex-wrap items-center gap-5">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#4A5054]">
        FX:
      </span>
      {EFFECTS.map(({ key, label }) => (
        <label key={key} className="flex cursor-pointer items-center gap-2">
          <HudSwitch
            checked={!!on[key]}
            onCheckedChange={(v) => setOn((s) => ({ ...s, [key]: v }))}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#6E7478]">
            {label}
          </span>
        </label>
      ))}
      <label className="flex cursor-pointer items-center gap-2 border-l border-[#1D2023] pl-5">
        <HudSwitch checked={cyan} onCheckedChange={setCyan} />
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#6E7478]">
          Cyan Accent
        </span>
      </label>
    </div>
  )
}
