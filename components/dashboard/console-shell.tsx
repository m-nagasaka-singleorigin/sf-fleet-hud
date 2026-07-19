import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { StatusBadge } from "@/registry/hud/status-badge"
import {
  HudAvatar,
  HudAvatarFallback,
  HudAvatarImage,
  HudAvatarStatus,
} from "@/registry/hud/hud-avatar"
import { Clock } from "@/components/clock"
import { CommandPalette } from "@/components/dashboard/command-palette"
import { CREW_ROSTER } from "@/app/crew-roster"
import { FLEET_UNITS } from "@/app/dashboard/fleet-data"

// Shared chrome for every console screen: logo cell, header strip and the
// navigation rail. Screens supply only their own main content.
export const CONSOLE_NAV = [
  ["01", "Overview", "/dashboard"],
  ["02", "Units", "/dashboard/units"],
  ["03", "Sector Map", "/dashboard/map"],
  ["04", "Telemetry", "/dashboard/telemetry"],
  ["05", "Comms Log", "/dashboard/comms"],
  ["06", "Settings", "/dashboard/settings"],
  ["07", "Mission Plan", "/dashboard/mission"],
] as const

// Signed-in officer shown at the foot of the rail.
const OFFICER = CREW_ROSTER[4]

function ConsoleShell({
  active,
  title,
  meta,
  children,
}: {
  /** Nav index of the current screen, e.g. "02". */
  active: string
  title: string
  meta?: string
  children: React.ReactNode
}) {
  return (
    <div className="grid h-svh grid-cols-[216px_1fr] grid-rows-[56px_1fr] overflow-hidden bg-background">
      {/* logo cell */}
      <div className="flex items-center gap-2.5 border-r border-b border-[#1D2023] px-4">
        <div className="grid size-6 place-items-center border border-primary font-sans text-[13px] font-bold text-primary">
          SF
        </div>
        <div>
          <div className="font-sans text-[15px] font-semibold uppercase tracking-[0.08em] text-foreground">
            SF Fleet
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6065]">
            Admin Console
          </div>
        </div>
      </div>

      {/* header */}
      <div className="flex items-center justify-between border-b border-[#1D2023] px-5">
        <div className="flex items-baseline gap-3">
          <span className="font-sans text-[19px] font-semibold uppercase tracking-[0.1em] text-foreground">
            {title}
          </span>
          {meta && (
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#5A6065]">
              {meta}
            </span>
          )}
        </div>
        <div className="flex items-center gap-5">
          <StatusBadge variant="live" dot>
            Uplink Active
          </StatusBadge>
          <Clock />
          <CommandPalette units={FLEET_UNITS} />
          <Link
            href="/"
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#5A6065] transition-colors hover:text-primary"
          >
            ← Catalog
          </Link>
        </div>
      </div>

      {/* sidebar */}
      <div className="flex flex-col gap-0.5 overflow-y-auto border-r border-[#1D2023] py-4">
        <div className="px-4 pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#4A5054]">
          Navigation
        </div>
        {CONSOLE_NAV.map(([num, label, href]) => {
          const on = num === active
          return (
            <Link
              key={num}
              href={href}
              aria-current={on ? "page" : undefined}
              className={cn(
                "flex items-center gap-2.5 border-l-2 px-4 py-[9px]",
                on ? "border-primary bg-[#121517]" : "border-transparent hover:bg-[#101214]"
              )}
            >
              <span className={cn("font-mono text-[10px]", on ? "text-primary" : "text-[#4A5054]")}>
                {num}
              </span>
              <span
                className={cn(
                  "font-sans text-[15px] uppercase tracking-[0.12em]",
                  on ? "font-medium text-foreground" : "font-normal text-[#8A9094]"
                )}
              >
                {label}
              </span>
            </Link>
          )
        })}
        <div className="flex-1" />
        <div className="mx-3 flex items-center gap-2.5 border border-[#1D2023] px-3 py-2.5">
          <HudAvatar size="sm" variant="strong">
            <HudAvatarImage src={OFFICER.photo} alt="" />
            <HudAvatarFallback>PN</HudAvatarFallback>
            <HudAvatarStatus />
          </HudAvatar>
          <div className="min-w-0">
            <div className="truncate font-sans text-sm font-medium uppercase tracking-[0.1em] text-[#C8CCCE]">
              {OFFICER.name}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5A6065]">
              Clearance A-1
            </div>
          </div>
        </div>
      </div>

      {/* main */}
      <div className="flex min-h-0 flex-col overflow-y-auto">{children}</div>
    </div>
  )
}

/** Shared panel header used across console screens. */
function PanelTitleRow({
  title,
  meta,
  children,
}: {
  title: string
  meta?: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between border-b border-[#1D2023] px-4 py-3">
      <span className="font-sans text-[15px] font-medium uppercase tracking-[0.14em] text-[#C8CCCE]">
        {title}
      </span>
      {children ??
        (meta && (
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5A6065]">
            {meta}
          </span>
        ))}
    </div>
  )
}

export { ConsoleShell, PanelTitleRow }
