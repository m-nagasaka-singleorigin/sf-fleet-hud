"use client"

import * as React from "react"
import { HudPopover, HudPopoverTrigger, HudPopoverContent } from "@/registry/hud/hud-popover"
import {
  HudCommand,
  HudCommandInput,
  HudCommandList,
  HudCommandEmpty,
  HudCommandItem,
} from "@/registry/hud/hud-command"
import { cn } from "@/lib/utils"

const OFFICERS = [
  { value: "k-hale", label: "K. HALE", wing: "NOVA" },
  { value: "r-voss", label: "R. VOSS", wing: "KESTREL" },
  { value: "a-drake", label: "A. DRAKE", wing: "RESERVE" },
  { value: "m-sato", label: "M. SATO", wing: "VANTA" },
]

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("k-hale")
  const selected = OFFICERS.find((o) => o.value === value)

  return (
    <HudPopover open={open} onOpenChange={setOpen}>
      <HudPopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className={cn(
            "flex w-[280px] cursor-pointer items-center justify-between gap-3 bg-[#0F1113] px-3 py-2.5 font-mono text-xs tracking-[0.1em]",
            "border border-input outline-none transition-colors hover:border-primary focus-visible:border-primary",
            selected ? "text-foreground" : "text-[#4A5054]"
          )}
        >
          <span className="flex items-center gap-2">
            <span aria-hidden className="text-[10px] text-primary">
              ⌕
            </span>
            {selected ? selected.label : "SELECT COMMANDER"}
          </span>
          <span
            aria-hidden
            className="-mt-0.5 size-1.5 shrink-0 rotate-45 border-r border-b border-primary"
          />
        </button>
      </HudPopoverTrigger>
      <HudPopoverContent className="w-[280px]">
        <HudCommand className="border-0 shadow-none before:hidden">
          <HudCommandInput placeholder="SEARCH OFFICER…" />
          <HudCommandList>
            <HudCommandEmpty>No officer found.</HudCommandEmpty>
            {OFFICERS.map((o) => (
              <HudCommandItem
                key={o.value}
                value={o.label}
                onSelect={() => {
                  setValue(o.value)
                  setOpen(false)
                }}
              >
                <span className={cn(o.value === value && "text-primary")}>{o.label}</span>
                <span className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-[#4A5054]">{o.wing}</span>
                  {o.value === value && (
                    <span className="font-mono text-[10px] text-primary">◆</span>
                  )}
                </span>
              </HudCommandItem>
            ))}
          </HudCommandList>
        </HudCommand>
      </HudPopoverContent>
    </HudPopover>
  )
}
