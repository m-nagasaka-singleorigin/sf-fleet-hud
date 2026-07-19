import * as React from "react"
import Link from "next/link"
import type { Metadata } from "next"
import { cn } from "@/lib/utils"
import { StatusBadge } from "@/registry/hud/status-badge"
import { TelemetryBar } from "@/registry/hud/telemetry-bar"
import { DotGlobe, type GlobeMarker } from "@/registry/hud/dot-globe"
import { Clock } from "@/components/clock"

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

const UNITS = [
  { id: "D-0117", wing: "NOVA WING", status: "engaged", label: "Engaged", signal: 92, ping: "12MS" },
  { id: "D-0142", wing: "KESTREL WING", status: "patrol", label: "Patrol", signal: 78, ping: "18MS" },
  { id: "D-0166", wing: "VANTA WING", status: "patrol", label: "Patrol", signal: 64, ping: "24MS" },
  { id: "D-0203", wing: "PHOENIX WING", status: "critical", label: "Signal Lost", signal: 8, ping: "——", lost: true },
  { id: "D-0219", wing: "AURORA WING", status: "standby", label: "Standby", signal: 85, ping: "15MS" },
] as const

const ALERTS = [
  { glyph: "▲", tone: "destructive", text: "Unit D-0203 signal lost — Sector 7 grid F4", time: "00:42" },
  { glyph: "◆", tone: "accent", text: "Threat index elevated 0.21 → 0.34", time: "03:15" },
  { glyph: "●", tone: "muted", text: "Rotation 04 shift change complete", time: "11:02" },
] as const

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
      {children ?? (
        meta && (
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5A6065]">
            {meta}
          </span>
        )
      )}
    </div>
  )
}

export default function Dashboard() {
  return (
    <div className="grid min-h-svh grid-cols-[216px_1fr] grid-rows-[56px_1fr] bg-background">
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
        <div className="flex items-center gap-6">
          <StatusBadge variant="live" dot>
            Uplink Active
          </StatusBadge>
          <Clock />
          <Link
            href="/"
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#5A6065] transition-colors hover:text-primary"
          >
            ← Catalog
          </Link>
        </div>
      </div>

      {/* sidebar */}
      <div className="flex flex-col gap-0.5 border-r border-[#1D2023] py-4">
        <div className="px-4 pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#4A5054]">
          Navigation
        </div>
        {NAV.map(([num, label], i) => (
          <div
            key={num}
            className={cn(
              "flex cursor-pointer items-center gap-2.5 border-l-2 px-4 py-[9px]",
              i === 0
                ? "border-primary bg-[#121517]"
                : "border-transparent hover:bg-[#101214]"
            )}
          >
            <span
              className={cn("font-mono text-[10px]", i === 0 ? "text-primary" : "text-[#4A5054]")}
            >
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
        <div className="mx-3 flex flex-col gap-1 border border-[#1D2023] px-3 py-2.5">
          <span className="font-sans text-sm font-medium uppercase tracking-[0.1em] text-[#C8CCCE]">
            Cmdr K. Hale
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5A6065]">
            Clearance A-1
          </span>
        </div>
      </div>

      {/* main */}
      <div className="grid grid-rows-[auto_1fr_auto] gap-3.5 overflow-hidden p-5 pt-4">
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
        <div className="grid min-h-0 grid-cols-[440px_1fr] gap-3.5">
          {/* radar panel */}
          <div className="relative flex flex-col border border-border bg-[#0F1113] before:absolute before:-top-px before:-left-px before:size-2.5 before:border-t before:border-l before:border-primary">
            <PanelTitleRow title="Sector Scan" meta="Range 40K // Auto" />
            <div className="grid flex-1 place-items-center p-3">
              <DotGlobe
                size={280}
                markers={STATIONS}
                initialLon={-80}
                initialLat={28}
                edgeGlow
                dotGlow
              />
            </div>
            <div className="grid grid-cols-3 border-t border-[#1D2023]">
              {(
                [
                  ["Contacts", "27", false],
                  ["Hostile", "04", true],
                  ["Sweep", "4.0S", false],
                ] as const
              ).map(([k, v, hot], i) => (
                <div
                  key={k}
                  className={cn("px-4 py-2.5", i < 2 && "border-r border-[#1D2023]")}
                >
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

          {/* unit table */}
          <div className="flex min-h-0 flex-col border border-border bg-[#0F1113]">
            <PanelTitleRow title="Unit Status">
              <div className="flex gap-2">
                <StatusBadge variant="engaged">Live</StatusBadge>
                <StatusBadge variant="patrol">History</StatusBadge>
              </div>
            </PanelTitleRow>
            <div className="grid grid-cols-[90px_1fr_110px_1fr_70px] border-b border-[#1D2023] px-4 py-2">
              {["Unit", "Wing", "Status", "Signal", "Ping"].map((h, i) => (
                <span
                  key={h}
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-[0.16em] text-[#4A5054]",
                    i === 4 && "text-right"
                  )}
                >
                  {h}
                </span>
              ))}
            </div>
            {UNITS.map((u) => (
              <div
                key={u.id}
                className={cn(
                  "grid grid-cols-[90px_1fr_110px_1fr_70px] items-center border-b border-[#16181B] px-4 py-2.5",
                  "lost" in u && u.lost
                    ? "bg-destructive/[0.06] hover:bg-destructive/10"
                    : "hover:bg-[#121517]"
                )}
              >
                <span className="font-mono text-[11px] text-[#C8CCCE]">{u.id}</span>
                <span className="font-sans text-sm tracking-[0.08em] text-[#9AA0A4]">{u.wing}</span>
                <span>
                  <StatusBadge variant={u.status}>{u.label}</StatusBadge>
                </span>
                <span className="mr-5 block h-[3px] bg-[#1D2023]">
                  <span
                    className={cn(
                      "block h-full",
                      "lost" in u && u.lost ? "bg-destructive" : "bg-[#8A9094]"
                    )}
                    style={{ width: `${u.signal}%` }}
                  />
                </span>
                <span
                  className={cn(
                    "text-right font-mono text-[11px]",
                    "lost" in u && u.lost ? "text-destructive" : "text-[#8A9094]"
                  )}
                >
                  {u.ping}
                </span>
              </div>
            ))}
            <div className="flex-1" />
            <div className="flex justify-between border-t border-[#1D2023] px-4 py-2.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#4A5054]">
                214 Units Tracked
              </span>
              <Link
                href="/"
                className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary hover:text-primary-bright"
              >
                View All →
              </Link>
            </div>
          </div>
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
            <div className="grid grid-cols-2 gap-x-7 gap-y-3">
              <TelemetryBar label="Reactor Output" value={76} />
              <TelemetryBar label="Life Support" value={98} />
              <TelemetryBar label="Weapons Array" value={41} warn />
              <TelemetryBar label="Comm Bandwidth" value={63} />
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
              <div
                key={a.time}
                className={cn(
                  "flex items-center gap-2.5 border px-3 py-2",
                  a.tone === "destructive" && "border-destructive/45",
                  a.tone === "accent" && "border-primary/45",
                  a.tone === "muted" && "border-border"
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[10px]",
                    a.tone === "destructive" && "text-destructive",
                    a.tone === "accent" && "text-primary",
                    a.tone === "muted" && "text-[#8A9094]"
                  )}
                >
                  {a.glyph}
                </span>
                <span
                  className={cn(
                    "font-sans text-sm tracking-[0.06em]",
                    a.tone === "muted" ? "text-[#9AA0A4]" : "text-[#D4D8DA]"
                  )}
                >
                  {a.text}
                </span>
                <span className="ml-auto font-mono text-[10px] text-[#5A6065]">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
