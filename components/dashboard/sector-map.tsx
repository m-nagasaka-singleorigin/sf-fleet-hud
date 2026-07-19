"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Radar, type RadarBlip } from "@/registry/hud/radar"
import { SegmentBar } from "@/registry/hud/segment-bar"
import { DotGlobe, type GlobeMarker } from "@/registry/hud/dot-globe"
import {
  HudPanel,
  HudPanelHeader,
  HudPanelTitle,
  HudPanelMeta,
  HudPanelContent,
  HudPanelFooter,
} from "@/registry/hud/hud-panel"
import { HudPopover, HudPopoverTrigger, HudPopoverContent } from "@/registry/hud/hud-popover"
import { HudSwitch } from "@/registry/hud/hud-switch"
import { HudSlider } from "@/registry/hud/hud-slider"
import { HudLabel } from "@/registry/hud/hud-label"
import { StatusBadge } from "@/registry/hud/status-badge"
import {
  CONTACTS,
  positionAt,
  polarToPercent,
  type ContactKind,
} from "@/app/dashboard/map-data"

const STATIONS: GlobeMarker[] = [
  { code: "D-0203", lat: 28.4, lon: -80.6, status: "incident" },
  { code: "gs-dc", lat: 38.9, lon: -77.4 },
  { code: "gs-ldn", lat: 51.5, lon: -0.1 },
  { code: "gs-tyo", lat: 35.7, lon: 139.7 },
  { code: "gs-syd", lat: -33.9, lon: 151.2 },
]

const LAYERS: { key: ContactKind; label: string }[] = [
  { key: "friendly", label: "Friendly Units" },
  { key: "hostile", label: "Hostile Contacts" },
  { key: "station", label: "Ground Stations" },
]

const KIND_STYLE: Record<ContactKind, { dot: string; text: string }> = {
  friendly: { dot: "bg-[#9AA0A4] shadow-[0_0_6px_#9AA0A4]", text: "text-[#C8CCCE]" },
  hostile: { dot: "bg-primary shadow-[0_0_6px_var(--primary)]", text: "text-primary" },
  station: { dot: "bg-[#5A6065]", text: "text-[#8A9094]" },
}

function SectorMap() {
  const [visible, setVisible] = React.useState<Record<ContactKind, boolean>>({
    friendly: true,
    hostile: true,
    station: true,
  })
  const [minutesAgo, setMinutesAgo] = React.useState(0)
  const [selected, setSelected] = React.useState<string | null>(null)

  const shown = React.useMemo(
    () =>
      CONTACTS.filter((c) => visible[c.kind]).map((c) => ({
        contact: c,
        pos: positionAt(c, minutesAgo),
      })),
    [visible, minutesAgo]
  )

  // The scope's own blips and the interactive hit targets are driven from one
  // position list, so the overlay can never drift out of register with the radar.
  const blips: RadarBlip[] = shown.map(({ contact, pos }) => ({
    angle: pos.bearing,
    distance: pos.range,
    hot: contact.kind === "hostile",
  }))

  const hostileCount = shown.filter((s) => s.contact.kind === "hostile").length
  const active = shown.find((s) => s.contact.id === selected)

  return (
    <div className="grid min-h-0 flex-1 grid-cols-[236px_1fr_300px] gap-3.5 p-5 pt-4">
      {/* layers + scope controls */}
      <div className="flex min-h-0 flex-col gap-3.5">
        <HudPanel brackets>
          <HudPanelHeader>
            <HudPanelTitle>Layers</HudPanelTitle>
            <HudPanelMeta>{shown.length} Shown</HudPanelMeta>
          </HudPanelHeader>
          <HudPanelContent className="flex flex-col gap-3">
            {LAYERS.map((l) => (
              <div key={l.key} className="flex items-center justify-between gap-3">
                <HudLabel htmlFor={`layer-${l.key}`}>{l.label}</HudLabel>
                <HudSwitch
                  id={`layer-${l.key}`}
                  checked={visible[l.key]}
                  onCheckedChange={(on) => setVisible((v) => ({ ...v, [l.key]: on }))}
                />
              </div>
            ))}
          </HudPanelContent>
        </HudPanel>

        <HudPanel>
          <HudPanelHeader>
            <HudPanelTitle>Scope</HudPanelTitle>
            <HudPanelMeta>Auto</HudPanelMeta>
          </HudPanelHeader>
          <HudPanelContent className="flex flex-col gap-3.5">
            {(
              [
                ["Range", 8],
                ["Gain", 7],
                ["Sweep Rate", 4],
              ] as const
            ).map(([label, filled]) => (
              <div key={label} className="flex flex-col gap-1.5">
                <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-[#5A6065]">
                  <span>{label}</span>
                  <span className="text-[#8A9094]">{filled}/10</span>
                </div>
                <SegmentBar segments={10} filled={filled} />
              </div>
            ))}
          </HudPanelContent>
        </HudPanel>
      </div>

      {/* scope */}
      <HudPanel className="flex min-h-0 flex-col">
        <HudPanelHeader>
          <HudPanelTitle>Sector 7 Scope</HudPanelTitle>
          <HudPanelMeta>
            {minutesAgo === 0 ? "Live" : `T−${minutesAgo} Min`}
            {" // Range 40K"}
          </HudPanelMeta>
        </HudPanelHeader>

        <div className="relative grid min-h-0 flex-1 place-items-center p-4">
          <div className="relative aspect-square h-full max-h-full">
            {/* Radar sizes itself inline; the important-modifier lets the scope
                fill this responsive square instead. */}
            <Radar blips={blips} className="!size-full" />

            {/* Interactive contact layer: the radar itself stays decorative. */}
            {shown.map(({ contact, pos }) => {
              const { left, top } = polarToPercent(pos.bearing, pos.range)
              return (
                <HudPopover
                  key={contact.id}
                  open={selected === contact.id}
                  onOpenChange={(o) => setSelected(o ? contact.id : null)}
                >
                  <HudPopoverTrigger asChild>
                    <button
                      type="button"
                      aria-label={`${contact.id} — bearing ${Math.round(pos.bearing)} degrees`}
                      className={cn(
                        "absolute size-5 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full outline-none",
                        "focus-visible:ring-1 focus-visible:ring-ring",
                        selected === contact.id && "ring-1 ring-primary"
                      )}
                      style={{ left: `${left}%`, top: `${top}%` }}
                    />
                  </HudPopoverTrigger>
                  <HudPopoverContent className="w-56 p-0">
                    <div className="flex items-center justify-between border-b border-[#1D2023] px-3 py-2">
                      <span className="font-sans text-sm font-medium uppercase tracking-[0.12em] text-foreground">
                        {contact.id}
                      </span>
                      <StatusBadge
                        variant={contact.kind === "hostile" ? "critical" : "patrol"}
                      >
                        {contact.kind}
                      </StatusBadge>
                    </div>
                    <div className="flex flex-col px-3 py-2">
                      {(
                        [
                          ["Class", contact.label],
                          ["Bearing", `${Math.round(pos.bearing)}°`],
                          ["Range", `${Math.round(pos.range * 40)}K M`],
                          ["Altitude", contact.altitude],
                          ["Speed", contact.speed],
                        ] as const
                      ).map(([k, v]) => (
                        <div
                          key={k}
                          className="flex items-baseline justify-between gap-3 border-b border-[#15181A] py-1"
                        >
                          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5A6065]">
                            {k}
                          </span>
                          <span className="font-mono text-[10px] text-[#D4D8DA]">{v}</span>
                        </div>
                      ))}
                    </div>
                  </HudPopoverContent>
                </HudPopover>
              )
            })}
          </div>

          {/* minimap */}
          <div className="pointer-events-none absolute right-4 bottom-4 size-[132px] border border-[#1D2023] bg-[#0B0D0E]">
            <DotGlobe fill markers={STATIONS} initialLon={-80} initialLat={28} autoRotate />
          </div>
        </div>

        <HudPanelFooter className="gap-6">
          <div className="flex flex-1 items-center gap-3">
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-[#5A6065]">
              Time Scrub
            </span>
            <HudSlider
              className="flex-1"
              min={0}
              max={60}
              step={1}
              value={[60 - minutesAgo]}
              onValueChange={([v]) => setMinutesAgo(60 - v)}
              aria-label="Minutes before now"
            />
            <span className="w-16 shrink-0 text-right font-mono text-[10px] text-[#D4D8DA]">
              {minutesAgo === 0 ? "NOW" : `T−${minutesAgo}M`}
            </span>
          </div>
        </HudPanelFooter>
      </HudPanel>

      {/* contact list */}
      <HudPanel className="flex min-h-0 flex-col">
        <HudPanelHeader>
          <HudPanelTitle>Contacts</HudPanelTitle>
          <HudPanelMeta className={hostileCount ? "text-primary" : undefined}>
            {hostileCount} Hostile
          </HudPanelMeta>
        </HudPanelHeader>
        <div className="min-h-0 flex-1 overflow-y-auto">
          {shown.length === 0 && (
            <p className="px-4 py-6 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-[#4A5054]">
              All layers hidden
            </p>
          )}
          {shown.map(({ contact, pos }) => (
            <button
              key={contact.id}
              type="button"
              onClick={() => setSelected(selected === contact.id ? null : contact.id)}
              className={cn(
                "flex w-full cursor-pointer items-center gap-2.5 border-l-2 px-3 py-2 text-left",
                selected === contact.id
                  ? "border-primary bg-primary/[0.08]"
                  : "border-transparent hover:bg-accent"
              )}
            >
              <span className={cn("size-1.5 shrink-0 rounded-full", KIND_STYLE[contact.kind].dot)} />
              <span
                className={cn(
                  "flex-1 font-mono text-[10px] uppercase tracking-[0.12em]",
                  KIND_STYLE[contact.kind].text
                )}
              >
                {contact.id}
              </span>
              <span className="font-mono text-[10px] text-[#5A6065]">
                {String(Math.round(pos.bearing)).padStart(3, "0")}°
              </span>
            </button>
          ))}
        </div>
        <HudPanelFooter>
          <HudPanelMeta>
            {active ? `Selected ${active.contact.id}` : "Select a contact"}
          </HudPanelMeta>
        </HudPanelFooter>
      </HudPanel>
    </div>
  )
}

export { SectorMap }
