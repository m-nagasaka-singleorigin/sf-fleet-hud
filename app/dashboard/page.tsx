import * as React from "react"
import Link from "next/link"
import type { Metadata } from "next"
import { cn } from "@/lib/utils"
import { StatusBadge } from "@/registry/hud/status-badge"
import { TelemetryBar } from "@/registry/hud/telemetry-bar"
import { DotGlobe, type GlobeMarker } from "@/registry/hud/dot-globe"
import { HudAlert } from "@/registry/hud/hud-alert"
import {
  HudAvatar,
  HudAvatarFallback,
  HudAvatarImage,
  HudAvatarStatus,
} from "@/registry/hud/hud-avatar"
import { CrewCard } from "@/registry/hud/crew-card"
import { HudTimeline, HudTimelineItem } from "@/registry/hud/hud-timeline"
import { HudHeatmap } from "@/registry/hud/hud-heatmap"
import { Clock } from "@/components/clock"
import { UnitPanel } from "@/components/dashboard/unit-panel"
import { CommandPalette } from "@/components/dashboard/command-palette"
import { CREW_ROSTER } from "@/app/crew-roster"
import {
  FLEET_UNITS,
  FLEET_EVENTS,
  ACTIVITY_MATRIX,
  ACTIVITY_WINGS,
} from "@/app/dashboard/fleet-data"

const STATIONS: GlobeMarker[] = [
  { code: "D-0203", lat: 28.4, lon: -80.6, status: "incident" },
  { code: "gs-dc", lat: 38.9, lon: -77.4 },
  { code: "gs-van", lat: 49.3, lon: -123.1 },
  { code: "gs-hi", lat: 21.3, lon: -157.9 },
  { code: "gs-sp", lat: -23.5, lon: -46.6 },
  { code: "gs-ldn", lat: 51.5, lon: -0.1 },
  { code: "gs-tyo", lat: 35.7, lon: 139.7 },
  { code: "gs-sin", lat: 1.35, lon: 103.8 },
  { code: "gs-syd", lat: -33.9, lon: 151.2 },
]

export const metadata: Metadata = {
  title: "SF FLEET HUD — Dashboard Demo",
}

const NAV = [
  ["01", "Overview"],
  ["02", "Units"],
  ["03", "Drone Map"],
  ["04", "Telemetry"],
  ["05", "Comms Log"],
  ["06", "Settings"],
] as const

type Stat = {
  label: string
  value: string
  suffix: string
  suffixAccent?: boolean
  bar: number
  accent?: boolean
  corner?: "tl" | "br"
}

const STATS: Stat[] = [
  { label: "Active Units", value: "214", suffix: "+06", suffixAccent: true, bar: 71, corner: "tl" },
  { label: "Sector Coverage", value: "87.2", suffix: "PCT", bar: 87 },
  { label: "Signal Integrity", value: "99.1", suffix: "PCT", bar: 99 },
  { label: "Threat Index", value: "0.34", suffix: "ELEVATED", bar: 34, accent: true, corner: "br" },
]

const ALERTS = [
  {
    tone: "destructive",
    text: "Unit D-0203 signal lost — Sector 7 grid F4",
    time: "00:42",
  },
  { tone: "default", text: "Threat index elevated 0.21 → 0.34", time: "03:15" },
  { tone: "muted", text: "Rotation 04 shift change complete", time: "11:02" },
] as const

// Signed-in officer and the watch roster shown at the bottom of the console.
const OFFICER = CREW_ROSTER[4]
const ON_WATCH = [8, 0, 11, 7].map((i) => CREW_ROSTER[i])

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

export default function Dashboard() {
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
            Tactical Operations
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#5A6065]">
            Sector 7 // Rotation 04
          </span>
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
        {NAV.map(([num, label], i) => (
          <div
            key={num}
            className={cn(
              "flex cursor-pointer items-center gap-2.5 border-l-2 px-4 py-[9px]",
              i === 0 ? "border-primary bg-[#121517]" : "border-transparent hover:bg-[#101214]"
            )}
          >
            <span className={cn("font-mono text-[10px]", i === 0 ? "text-primary" : "text-[#4A5054]")}>
              {num}
            </span>
            <span
              className={cn(
                "font-sans text-[15px] uppercase tracking-[0.12em]",
                i === 0 ? "font-medium text-foreground" : "font-normal text-[#8A9094]"
              )}
            >
              {label}
            </span>
          </div>
        ))}
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
      <div className="flex flex-col gap-3.5 overflow-y-auto p-5 pt-4">
        {/* stat cards */}
        <div className="grid grid-cols-4 gap-3.5">
          {STATS.map((s) => (
            <div
              key={s.label}
              className={cn(
                "relative border bg-[#0F1113] px-4 pt-3.5 pb-3",
                s.accent ? "border-primary/55" : "border-border",
                s.corner === "tl" &&
                  "before:absolute before:-top-px before:-left-px before:size-2.5 before:border-t before:border-l before:border-primary",
                s.corner === "br" &&
                  "after:absolute after:-bottom-px after:-right-px after:size-2.5 after:border-b after:border-r after:border-primary"
              )}
            >
              <div
                className={cn(
                  "flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em]",
                  s.accent ? "text-primary" : "text-[#6E7478]"
                )}
              >
                {s.label}
              </div>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span
                  className={cn(
                    "font-sans text-[38px] leading-none font-semibold",
                    s.accent ? "text-primary" : "text-foreground"
                  )}
                >
                  {s.value}
                </span>
                <span
                  className={cn(
                    "font-mono text-[10px] uppercase",
                    s.suffixAccent ? "text-primary" : "text-[#5A6065]"
                  )}
                >
                  {s.suffix}
                </span>
              </div>
              <div className="mt-2.5 h-0.5 bg-[#1D2023]">
                <div
                  className={cn("h-full", s.accent ? "bg-primary" : "bg-[#8A9094]")}
                  style={{ width: `${s.bar}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* middle row */}
        <div className="grid min-h-[440px] flex-1 grid-cols-[440px_1fr] gap-3.5">
          {/* globe panel */}
          <div className="relative flex flex-col border border-border bg-[#0F1113] before:absolute before:-top-px before:-left-px before:size-2.5 before:border-t before:border-l before:border-primary">
            <PanelTitleRow title="Sector Scan" meta="Range 40K // Auto" />
            <div className="relative min-h-0 flex-1 p-3">
              <DotGlobe fill markers={STATIONS} initialLon={-80} initialLat={28} edgeGlow dotGlow />
            </div>
            <div className="grid grid-cols-3 border-t border-[#1D2023]">
              {(
                [
                  ["Contacts", "27", false],
                  ["Hostile", "04", true],
                  ["Sweep", "4.0S", false],
                ] as const
              ).map(([k, v, hot], i) => (
                <div key={k} className={cn("px-4 py-2.5", i < 2 && "border-r border-[#1D2023]")}>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#5A6065]">
                    {k}
                  </div>
                  <div
                    className={cn(
                      "font-sans text-xl font-semibold",
                      hot ? "text-primary" : "text-foreground"
                    )}
                  >
                    {v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* unit table + history + detail drawer */}
          <UnitPanel units={FLEET_UNITS} events={FLEET_EVENTS} />
        </div>

        {/* bottom row */}
        <div className="grid grid-cols-[1fr_440px] gap-3.5">
          <div className="border border-border bg-[#0F1113] px-4 py-3.5">
            <div className="mb-3 flex justify-between">
              <span className="font-sans text-[15px] font-medium uppercase tracking-[0.14em] text-[#C8CCCE]">
                Telemetry
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#5A6065]">
                Refresh 2S
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-7 gap-y-3.5">
              <TelemetryBar label="Reactor Output" value={76} />
              <TelemetryBar label="Life Support" value={98} />
              <TelemetryBar label="Weapons Array" value={41} warn />
              <TelemetryBar label="Comm Bandwidth" value={63} />
              <TelemetryBar label="Shield Matrix" value={88} />
              <TelemetryBar label="Coolant Reserve" value={34} warn />
            </div>
          </div>
          <div className="flex flex-col gap-2 border border-border bg-[#0F1113] px-4 py-3.5">
            <div className="flex justify-between">
              <span className="font-sans text-[15px] font-medium uppercase tracking-[0.14em] text-[#C8CCCE]">
                Alerts
              </span>
              <span className="bg-primary px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-primary-foreground">
                3 New
              </span>
            </div>
            {ALERTS.map((a) => (
              <HudAlert key={a.time} variant={a.tone} className="items-center px-3 py-2">
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={cn(
                      "font-sans text-sm tracking-[0.06em]",
                      a.tone === "muted" ? "text-[#9AA0A4]" : "text-[#D4D8DA]"
                    )}
                  >
                    {a.text}
                  </span>
                  <span className="font-mono text-[10px] text-[#5A6065]">{a.time}</span>
                </div>
              </HudAlert>
            ))}
          </div>
        </div>

        {/* comms log + activity matrix */}
        <div className="grid grid-cols-[1fr_440px] gap-3.5">
          <div className="border border-border bg-[#0F1113]">
            <PanelTitleRow title="Comms Log" meta="Last 30 min // Live" />
            <div className="px-4 py-3.5">
              <HudTimeline>
                {FLEET_EVENTS.slice(0, 5).map((e, i, arr) => (
                  <HudTimelineItem
                    key={e.time}
                    variant={e.tone}
                    time={e.time}
                    title={e.event}
                    last={i === arr.length - 1}
                  >
                    {`${e.unit} // Sector 7`}
                  </HudTimelineItem>
                ))}
              </HudTimeline>
            </div>
          </div>
          <div className="flex flex-col border border-border bg-[#0F1113]">
            <PanelTitleRow title="Activity Matrix" meta="Wing × Watch" />
            <div className="flex flex-1 flex-col gap-2 px-4 py-3.5">
              {/* One heatmap per wing so labels stay row-aligned at any width. */}
              <div className="flex flex-col gap-[3px]">
                {ACTIVITY_WINGS.map((w, r) => (
                  <div key={w} className="flex items-center gap-3">
                    <span className="w-14 shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-[#5A6065]">
                      {w}
                    </span>
                    <HudHeatmap
                      className="flex-1"
                      columns={12}
                      values={ACTIVITY_MATRIX.slice(r * 12, r * 12 + 12)}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between pl-[68px] font-mono text-[10px] text-[#4A5054]">
                <span>00</span>
                <span>06</span>
                <span>12</span>
                <span>18</span>
                <span>24</span>
              </div>
              <span className="mt-auto text-right font-mono text-[10px] uppercase tracking-[0.12em] text-[#4A5054]">
                Low ▢▤▦█ High
              </span>
            </div>
          </div>
        </div>

        {/* watch roster */}
        <div className="border border-border bg-[#0F1113]">
          <PanelTitleRow title="On Watch" meta="Rotation 04 // 4 of 25" />
          <div className="grid grid-cols-4 gap-3.5 p-3.5">
            {ON_WATCH.map((c) => (
              <CrewCard key={c.id} crew={c} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
