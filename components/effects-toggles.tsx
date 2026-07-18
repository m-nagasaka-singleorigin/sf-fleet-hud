"use client"

import * as React from "react"
import { HudSwitch } from "@/registry/hud/hud-switch"

const EFFECTS = [
  { key: "scanlines", label: "Scanlines" },
  { key: "glow", label: "Blue Glow" },
  { key: "additive", label: "Additive Lines" },
] as const

export function EffectsToggles() {
  const [on, setOn] = React.useState<Record<string, boolean>>({})

  React.useEffect(() => {
    for (const { key } of EFFECTS) {
      document.documentElement.setAttribute(`data-fx-${key}`, on[key] ? "on" : "off")
    }
  }, [on])

  return (
    <div className="flex flex-wrap items-center gap-5">
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#4A5054]">
        FX:
      </span>
      {EFFECTS.map(({ key, label }) => (
        <label key={key} className="flex cursor-pointer items-center gap-2">
          <HudSwitch
            checked={!!on[key]}
            onCheckedChange={(v) => setOn((s) => ({ ...s, [key]: v }))}
          />
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#6E7478]">
            {label}
          </span>
        </label>
      ))}
    </div>
  )
}
