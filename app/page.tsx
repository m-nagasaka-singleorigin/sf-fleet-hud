import * as React from "react"
import { OpenInV0Button } from "@/components/open-in-v0-button"
import { HudButton } from "@/registry/hud/hud-button"
import {
  HudPanel,
  HudPanelHeader,
  HudPanelTitle,
  HudPanelMeta,
  HudPanelContent,
  HudPanelFooter,
} from "@/registry/hud/hud-panel"
import { StatusBadge } from "@/registry/hud/status-badge"
import { TelemetryBar } from "@/registry/hud/telemetry-bar"
import { SegmentBar } from "@/registry/hud/segment-bar"
import { HudKbd } from "@/registry/hud/hud-kbd"
import { HudSkeleton } from "@/registry/hud/hud-skeleton"
import { Radar } from "@/registry/hud/radar"
import { Gyro } from "@/registry/hud/gyro"

function Section({
  index,
  title,
  name,
  children,
}: {
  index: string
  title: string
  name: string
  children: React.ReactNode
}) {
  return (
    <HudPanel>
      <HudPanelHeader>
        <HudPanelTitle>
          <span className="mr-2 font-mono text-[10px] text-primary">{index}</span>
          {title}
        </HudPanelTitle>
        <div className="flex items-center gap-3">
          <HudPanelMeta>npx shadcn add {name}</HudPanelMeta>
          <OpenInV0Button name={name} />
        </div>
      </HudPanelHeader>
      <HudPanelContent className="flex flex-wrap items-center gap-4 py-6">
        {children}
      </HudPanelContent>
    </HudPanel>
  )
}

export default function Home() {
  return (
    <div className="mx-auto flex min-h-svh max-w-5xl flex-col gap-6 px-6 py-10">
      <header className="flex flex-col gap-2 border-b border-[#1D2023] pb-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
          Registry // Component Catalog
        </p>
        <h1 className="font-sans text-4xl font-bold uppercase tracking-[0.08em]">
          SF Fleet HUD
        </h1>
        <p className="max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          Dark sci-fi fleet-ops UI kit for shadcn/ui. Monochrome + orange
          accent, radius 0, condensed sans + terminal mono.
        </p>
      </header>

      <main className="flex flex-col gap-6">
        <Section index="01" title="HUD Button" name="hud-button">
          <HudButton>Engage</HudButton>
          <HudButton variant="secondary">Standby</HudButton>
          <HudButton variant="outline">Scan</HudButton>
          <HudButton variant="ghost">Dismiss</HudButton>
          <HudButton variant="destructive">Abort</HudButton>
          <HudButton size="sm">Small</HudButton>
          <HudButton size="lg">Launch Sequence</HudButton>
        </Section>

        <Section index="02" title="Status Badge" name="status-badge">
          <StatusBadge variant="engaged">Engaged</StatusBadge>
          <StatusBadge variant="priority" dot>
            Priority
          </StatusBadge>
          <StatusBadge variant="patrol">Patrol</StatusBadge>
          <StatusBadge variant="standby">Standby</StatusBadge>
          <StatusBadge variant="critical" dot>
            Critical
          </StatusBadge>
          <StatusBadge variant="live" dot>
            Live Feed
          </StatusBadge>
        </Section>

        <Section index="03" title="Telemetry Bar" name="telemetry-bar">
          <div className="flex w-full max-w-sm flex-col gap-4">
            <TelemetryBar label="Hull Integrity" value={92} />
            <TelemetryBar label="Reactor Load" value={67} />
            <TelemetryBar label="O2 Reserve" value={23} warn />
          </div>
        </Section>

        <Section index="04" title="Segment Bar" name="segment-bar">
          <div className="flex w-full max-w-sm flex-col gap-4">
            <SegmentBar segments={10} filled={7} />
            <SegmentBar segments={16} filled={4} />
          </div>
        </Section>

        <Section index="05" title="Kbd" name="hud-kbd">
          <HudKbd>⌘</HudKbd>
          <HudKbd>K</HudKbd>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Open command deck
          </span>
        </Section>

        <Section index="06" title="Skeleton" name="hud-skeleton">
          <div className="flex w-full max-w-sm flex-col gap-3">
            <HudSkeleton className="h-4 w-2/3" />
            <HudSkeleton className="h-4 w-full" />
            <HudSkeleton className="h-24 w-full" />
          </div>
        </Section>

        <Section index="07" title="Radar" name="radar">
          <Radar size={240} />
        </Section>

        <Section index="08" title="Gyro" name="gyro">
          <Gyro size={240} />
        </Section>

        <Section index="09" title="Panel" name="hud-panel">
          <HudPanel brackets className="w-full max-w-md">
            <HudPanelHeader>
              <HudPanelTitle>Orbital Relay</HudPanelTitle>
              <HudPanelMeta>Sector 12 // Node 04</HudPanelMeta>
            </HudPanelHeader>
            <HudPanelContent className="font-mono text-xs leading-relaxed text-muted-foreground">
              Uplink stable. Signal delay 240ms. Awaiting handshake from relay
              KESTREL-9.
            </HudPanelContent>
            <HudPanelFooter>
              <StatusBadge variant="live" dot>
                Link
              </StatusBadge>
              <HudButton size="sm" variant="outline">
                Details
              </HudButton>
            </HudPanelFooter>
          </HudPanel>
        </Section>
      </main>

      <footer className="border-t border-[#1D2023] pt-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          MIT licensed. Fonts: Saira Condensed + Share Tech Mono (OFL).
        </p>
      </footer>
    </div>
  )
}
