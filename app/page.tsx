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
import { HudLabel } from "@/registry/hud/hud-label"
import { HudInput } from "@/registry/hud/hud-input"
import { HudTextarea } from "@/registry/hud/hud-textarea"
import { HudSwitch } from "@/registry/hud/hud-switch"
import { HudCheckbox } from "@/registry/hud/hud-checkbox"
import { HudRadioGroup, HudRadioGroupItem } from "@/registry/hud/hud-radio-group"
import {
  HudSelect,
  HudSelectContent,
  HudSelectItem,
  HudSelectLabel,
  HudSelectTrigger,
  HudSelectValue,
} from "@/registry/hud/hud-select"
import { HudTabs, HudTabsList, HudTabsTrigger, HudTabsContent } from "@/registry/hud/hud-tabs"
import { HudAlert, HudAlertTitle, HudAlertDescription } from "@/registry/hud/hud-alert"
import {
  HudDialog,
  HudDialogTrigger,
  HudDialogContent,
  HudDialogHeader,
  HudDialogTitle,
  HudDialogCloseButton,
  HudDialogDescription,
  HudDialogBody,
  HudDialogFooter,
  HudDialogClose,
} from "@/registry/hud/hud-dialog"
import {
  HudSheet,
  HudSheetTrigger,
  HudSheetContent,
  HudSheetHeader,
  HudSheetTitle,
  HudSheetCloseButton,
  HudSheetBody,
  HudSheetFooter,
} from "@/registry/hud/hud-sheet"
import {
  HudTooltipProvider,
  HudTooltip,
  HudTooltipTrigger,
  HudTooltipContent,
} from "@/registry/hud/hud-tooltip"
import {
  HudContextMenu,
  HudContextMenuTrigger,
  HudContextMenuContent,
  HudContextMenuItem,
  HudContextMenuSeparator,
  HudContextMenuShortcut,
} from "@/registry/hud/hud-context-menu"
import {
  HudCommand,
  HudCommandInput,
  HudCommandList,
  HudCommandEmpty,
  HudCommandGroup,
  HudCommandItem,
  HudCommandShortcut,
  HudCommandFooter,
} from "@/registry/hud/hud-command"
import { ToastDemo } from "@/components/toast-demo"

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
        <Section index="10" title="Label + Input" name="hud-input">
          <div className="grid w-full max-w-lg grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <HudLabel htmlFor="callsign">Callsign</HudLabel>
              <HudInput id="callsign" defaultValue="NOVA-01" />
            </div>
            <div className="flex flex-col gap-1.5">
              <HudLabel htmlFor="query">Search Registry</HudLabel>
              <HudInput id="query" placeholder="> QUERY…" />
            </div>
          </div>
        </Section>

        <Section index="11" title="Textarea" name="hud-textarea">
          <div className="relative w-full max-w-lg">
            <HudLabel htmlFor="brief">Mission Brief</HudLabel>
            <HudTextarea
              id="brief"
              rows={4}
              className="mt-1.5"
              defaultValue="Wing 09 advances to grid D2 under emission control. Weapons free on flagged contacts only."
            />
            <span className="absolute right-2.5 bottom-2.5 font-mono text-[8px] tracking-[0.1em] text-[#4A5054]">
              88 / 240
            </span>
          </div>
        </Section>

        <Section index="12" title="Switch / Checkbox / Radio" name="hud-switch">
          <div className="flex flex-wrap items-center gap-10">
            <label className="flex cursor-pointer items-center gap-2.5">
              <HudSwitch defaultChecked />
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#C8CCCE]">
                Autopilot On
              </span>
            </label>
            <label className="flex cursor-pointer items-center gap-2.5">
              <HudSwitch />
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#6E7478]">
                Stealth Off
              </span>
            </label>
            <label className="flex cursor-pointer items-center gap-2.5">
              <HudCheckbox defaultChecked />
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#C8CCCE]">
                Confirm Orders
              </span>
            </label>
            <label className="flex cursor-pointer items-center gap-2.5">
              <HudCheckbox />
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#6E7478]">
                Relay Echo
              </span>
            </label>
            <HudRadioGroup defaultValue="alpha" className="flex items-center gap-4">
              <label className="flex cursor-pointer items-center gap-2">
                <HudRadioGroupItem value="alpha" />
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#C8CCCE]">
                  Alpha
                </span>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <HudRadioGroupItem value="bravo" />
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#6E7478]">
                  Bravo
                </span>
              </label>
            </HudRadioGroup>
          </div>
        </Section>

        <Section index="13" title="Select" name="hud-select">
          <div className="flex w-full max-w-xs flex-col gap-1.5">
            <HudLabel>Sector</HudLabel>
            <HudSelect defaultValue="d2">
              <HudSelectTrigger>
                <HudSelectValue placeholder="SELECT SECTOR" />
              </HudSelectTrigger>
              <HudSelectContent>
                <HudSelectLabel>Select Sector</HudSelectLabel>
                <HudSelectItem value="c1">GRID C1 — PERIMETER</HudSelectItem>
                <HudSelectItem value="d2">GRID D2 — FORWARD</HudSelectItem>
                <HudSelectItem value="e5">GRID E5 — RESERVE</HudSelectItem>
              </HudSelectContent>
            </HudSelect>
          </div>
        </Section>

        <Section index="14" title="Tabs" name="hud-tabs">
          <HudTabs defaultValue="tactical" className="w-full max-w-lg">
            <HudTabsList>
              <HudTabsTrigger value="tactical">Tactical</HudTabsTrigger>
              <HudTabsTrigger value="logistics">Logistics</HudTabsTrigger>
              <HudTabsTrigger value="personnel">Personnel</HudTabsTrigger>
            </HudTabsList>
            <HudTabsContent
              value="tactical"
              className="font-mono text-xs leading-relaxed text-muted-foreground"
            >
              Forward wings holding formation. Grid D2 contested.
            </HudTabsContent>
            <HudTabsContent
              value="logistics"
              className="font-mono text-xs leading-relaxed text-muted-foreground"
            >
              Resupply convoy ETA 04:12. Fuel reserves nominal.
            </HudTabsContent>
            <HudTabsContent
              value="personnel"
              className="font-mono text-xs leading-relaxed text-muted-foreground"
            >
              214 crew active. 12 on medical rotation.
            </HudTabsContent>
          </HudTabs>
        </Section>

        <Section index="15" title="Alert" name="hud-alert">
          <div className="grid w-full gap-3 md:grid-cols-2">
            <HudAlert>
              <HudAlertTitle>Priority Directive</HudAlertTitle>
              <HudAlertDescription>
                Re-route Wing 09 to grid D2. Confirmation required within 90
                seconds.
              </HudAlertDescription>
            </HudAlert>
            <HudAlert variant="destructive">
              <HudAlertTitle>Telemetry Dropout</HudAlertTitle>
              <HudAlertDescription>
                Wing 07 signal lost 42 seconds ago. Last vector 224.081.
              </HudAlertDescription>
            </HudAlert>
          </div>
        </Section>
        <Section index="16" title="Dialog" name="hud-dialog">
          <HudDialog>
            <HudDialogTrigger asChild>
              <HudButton variant="outline">Open Dialog</HudButton>
            </HudDialogTrigger>
            <HudDialogContent>
              <HudDialogHeader>
                <HudDialogTitle>Confirm Launch Order</HudDialogTitle>
                <HudDialogCloseButton />
              </HudDialogHeader>
              <HudDialogBody>
                <HudDialogDescription>
                  Wing 09 will be committed to grid D2. This order cannot be
                  recalled after execution.
                </HudDialogDescription>
                <div className="mt-3 flex items-center gap-2 border border-primary/45 px-2.5 py-2">
                  <span className="font-mono text-[10px] text-primary">◆</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#9AA0A4]">
                    Auth code required — clearance A-1
                  </span>
                </div>
              </HudDialogBody>
              <HudDialogFooter>
                <HudDialogClose asChild>
                  <HudButton variant="ghost" size="sm">
                    Abort
                  </HudButton>
                </HudDialogClose>
                <HudButton size="sm">Execute</HudButton>
              </HudDialogFooter>
            </HudDialogContent>
          </HudDialog>
        </Section>

        <Section index="17" title="Sheet" name="hud-sheet">
          <HudSheet>
            <HudSheetTrigger asChild>
              <HudButton variant="outline">Open Unit Detail</HudButton>
            </HudSheetTrigger>
            <HudSheetContent>
              <HudSheetHeader>
                <HudSheetTitle>Unit D-0117 // Detail</HudSheetTitle>
                <HudSheetCloseButton />
              </HudSheetHeader>
              <HudSheetBody>
                {(
                  [
                    ["Wing", "Nova Wing"],
                    ["Vector", "224.081 / +12.4°"],
                    ["Ping", "12ms"],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#5A6065]">
                      {k}
                    </span>
                    <span className="font-mono text-[10px] uppercase text-[#C8CCCE]">
                      {v}
                    </span>
                  </div>
                ))}
                <TelemetryBar label="Signal" value={92} className="mt-1" />
              </HudSheetBody>
              <HudSheetFooter>
                <HudButton variant="outline" size="sm" className="w-full">
                  Open Full Record
                </HudButton>
              </HudSheetFooter>
            </HudSheetContent>
          </HudSheet>
        </Section>

        <Section index="18" title="Tooltip" name="hud-tooltip">
          <HudTooltipProvider>
            <HudTooltip>
              <HudTooltipTrigger asChild>
                <span className="cursor-help border-b border-dashed border-[#4A5054] pb-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#8A9094]">
                  Relay 3 Status
                </span>
              </HudTooltipTrigger>
              <HudTooltipContent side="top">
                LAST HANDSHAKE 13:58:44 UTC
              </HudTooltipContent>
            </HudTooltip>
          </HudTooltipProvider>
        </Section>

        <Section index="19" title="Toast" name="hud-sonner">
          <ToastDemo />
        </Section>

        <Section index="20" title="Context Menu" name="hud-context-menu">
          <HudContextMenu>
            <HudContextMenuTrigger asChild>
              <div className="grid h-28 w-full max-w-sm place-items-center border border-dashed border-[#2E3236] font-mono text-[9px] uppercase tracking-[0.14em] text-[#4A5054]">
                Right-click this zone
              </div>
            </HudContextMenuTrigger>
            <HudContextMenuContent>
              <HudContextMenuItem>
                Trace Unit
                <HudContextMenuShortcut>⌘T</HudContextMenuShortcut>
              </HudContextMenuItem>
              <HudContextMenuItem>
                Copy Vector
                <HudContextMenuShortcut>⌘C</HudContextMenuShortcut>
              </HudContextMenuItem>
              <HudContextMenuSeparator />
              <HudContextMenuItem variant="destructive">
                Decommission
                <HudContextMenuShortcut>⌘⌫</HudContextMenuShortcut>
              </HudContextMenuItem>
            </HudContextMenuContent>
          </HudContextMenu>
        </Section>

        <Section index="21" title="Command Palette" name="hud-command">
          <HudCommand className="max-w-[560px]">
            <HudCommandInput placeholder="TYPE A COMMAND…" />
            <HudCommandList>
              <HudCommandEmpty>No results found.</HudCommandEmpty>
              <HudCommandGroup heading="Commands">
                <HudCommandItem>
                  REASSIGN WING 09 → GRID…
                  <HudCommandShortcut>⏎</HudCommandShortcut>
                </HudCommandItem>
                <HudCommandItem>
                  RECALL WING — ALL PATROLS
                  <HudCommandShortcut>⌘R</HudCommandShortcut>
                </HudCommandItem>
              </HudCommandGroup>
              <HudCommandGroup heading="Navigate">
                <HudCommandItem>
                  WING 09 — UNIT DETAIL
                  <HudCommandShortcut>↗</HudCommandShortcut>
                </HudCommandItem>
              </HudCommandGroup>
            </HudCommandList>
            <HudCommandFooter />
          </HudCommand>
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
