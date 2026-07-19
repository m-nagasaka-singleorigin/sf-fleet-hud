"use client"

import * as React from "react"
import { toast } from "sonner"
import { HudKbd } from "@/registry/hud/hud-kbd"
import {
  HudCommandDialog,
  HudCommandInput,
  HudCommandList,
  HudCommandEmpty,
  HudCommandGroup,
  HudCommandItem,
  HudCommandShortcut,
  HudCommandFooter,
} from "@/registry/hud/hud-command"
import type { FleetUnit } from "@/app/dashboard/fleet-data"

const NAVIGATE = [
  ["Overview", "01"],
  ["Units", "02"],
  ["Drone Map", "03"],
  ["Telemetry", "04"],
  ["Comms Log", "05"],
  ["Settings", "06"],
] as const

const ACTIONS = [
  ["Reassign wing → grid…", "⏎"],
  ["Recall all patrols", "⌘R"],
  ["Acknowledge active alerts", "⌘A"],
  ["Broadcast fleet directive", "⌘B"],
] as const

export function CommandPalette({ units }: { units: FleetUnit[] }) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  const run = (label: string) => {
    setOpen(false)
    toast.info(label, { description: "COMMAND ACCEPTED // DEMO ONLY" })
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="flex cursor-pointer items-center gap-2 border border-border px-2.5 py-1 transition-colors hover:border-primary"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#5A6065]">
          Command
        </span>
        <HudKbd className="border-b px-1.5 py-0">⌘K</HudKbd>
      </button>

      <HudCommandDialog open={open} onOpenChange={setOpen}>
        <HudCommandInput placeholder="SEARCH UNITS OR COMMANDS…" />
        <HudCommandList>
          <HudCommandEmpty>No results found.</HudCommandEmpty>
          <HudCommandGroup heading="Actions">
            {ACTIONS.map(([label, key]) => (
              <HudCommandItem key={label} value={label} onSelect={() => run(label)}>
                {label.toUpperCase()}
                <HudCommandShortcut>{key}</HudCommandShortcut>
              </HudCommandItem>
            ))}
          </HudCommandGroup>
          <HudCommandGroup heading="Navigate">
            {NAVIGATE.map(([label, num]) => (
              <HudCommandItem key={label} value={label} onSelect={() => run(label)}>
                {label.toUpperCase()}
                <HudCommandShortcut>{num}</HudCommandShortcut>
              </HudCommandItem>
            ))}
          </HudCommandGroup>
          <HudCommandGroup heading="Units">
            {units.slice(0, 8).map((u) => (
              <HudCommandItem
                key={u.id}
                value={`${u.id} ${u.wing}`}
                onSelect={() => run(`${u.id} — ${u.wing}`)}
              >
                {u.id} — {u.wing.toUpperCase()}
                <HudCommandShortcut>↗</HudCommandShortcut>
              </HudCommandItem>
            ))}
          </HudCommandGroup>
        </HudCommandList>
        <HudCommandFooter />
      </HudCommandDialog>
    </>
  )
}
