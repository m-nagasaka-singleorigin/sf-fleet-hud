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
  HudSelectGroup,
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
  HudSheetDescription,
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
import {
  HudTable,
  HudTableHeader,
  HudTableBody,
  HudTableRow,
  HudTableHead,
  HudTableCell,
} from "@/registry/hud/hud-table"
import {
  HudPagination,
  HudPaginationItem,
  HudPaginationPrevious,
  HudPaginationNext,
  HudPaginationEllipsis,
} from "@/registry/hud/hud-pagination"
import { HudChip } from "@/registry/hud/hud-chip"
import {
  HudAccordion,
  HudAccordionItem,
  HudAccordionTrigger,
  HudAccordionContent,
} from "@/registry/hud/hud-accordion"
import {
  HudBreadcrumb,
  HudBreadcrumbList,
  HudBreadcrumbItem,
  HudBreadcrumbLink,
  HudBreadcrumbPage,
  HudBreadcrumbSeparator,
} from "@/registry/hud/hud-breadcrumb"
import {
  HudAvatar,
  HudAvatarFallback,
  HudAvatarStatus,
  HudAvatarRank,
} from "@/registry/hud/hud-avatar"
import { HudSlider } from "@/registry/hud/hud-slider"
import { OtpDemo } from "@/components/otp-demo"
import { HudCalendar } from "@/registry/hud/hud-calendar"
import { HudGauge } from "@/registry/hud/hud-gauge"
import { HudSparkline } from "@/registry/hud/hud-sparkline"
import { HudHeatmap } from "@/registry/hud/hud-heatmap"
import { HudTimeline, HudTimelineItem } from "@/registry/hud/hud-timeline"
import { HudTree, HudTreeBranch, HudTreeLeaf } from "@/registry/hud/hud-tree"
import { HudDropzone } from "@/registry/hud/hud-dropzone"
import { HudStepper, HudStep, HudStepSeparator } from "@/registry/hud/hud-stepper"

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
                <HudSelectGroup>
                  <HudSelectLabel>Select Sector</HudSelectLabel>
                  <HudSelectItem value="c1">GRID C1 — PERIMETER</HudSelectItem>
                  <HudSelectItem value="d2">GRID D2 — FORWARD</HudSelectItem>
                  <HudSelectItem value="e5">GRID E5 — RESERVE</HudSelectItem>
                </HudSelectGroup>
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
              <HudSheetDescription className="sr-only">
                Telemetry detail for unit D-0117
              </HudSheetDescription>
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
        <Section index="22" title="Table + Filter + Pagination" name="hud-table">
          <div className="flex w-full flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#4A5054]">
                Filters:
              </span>
              <HudChip variant="active" onRemove={undefined}>
                STATUS: ENGAGED
              </HudChip>
              <HudChip>SECTOR: 7</HudChip>
              <HudChip>PING &lt; 20MS</HudChip>
            </div>
            <HudTable>
              <HudTableHeader>
                <HudTableRow className="hover:bg-transparent">
                  <HudTableHead sorted="asc">Unit</HudTableHead>
                  <HudTableHead>Wing</HudTableHead>
                  <HudTableHead>Status</HudTableHead>
                  <HudTableHead className="text-right">Ping</HudTableHead>
                </HudTableRow>
              </HudTableHeader>
              <HudTableBody>
                <HudTableRow selected>
                  <HudTableCell>D-0117</HudTableCell>
                  <HudTableCell className="font-sans text-sm tracking-[0.08em] text-[#9AA0A4]">
                    NOVA WING
                  </HudTableCell>
                  <HudTableCell>
                    <StatusBadge variant="priority">Engaged</StatusBadge>
                  </HudTableCell>
                  <HudTableCell className="text-right text-[#8A9094]">12MS</HudTableCell>
                </HudTableRow>
                <HudTableRow>
                  <HudTableCell>D-0142</HudTableCell>
                  <HudTableCell className="font-sans text-sm tracking-[0.08em] text-[#9AA0A4]">
                    KESTREL WING
                  </HudTableCell>
                  <HudTableCell>
                    <StatusBadge variant="patrol">Patrol</StatusBadge>
                  </HudTableCell>
                  <HudTableCell className="text-right text-[#8A9094]">18MS</HudTableCell>
                </HudTableRow>
                <HudTableRow>
                  <HudTableCell>D-0219</HudTableCell>
                  <HudTableCell className="font-sans text-sm tracking-[0.08em] text-[#9AA0A4]">
                    VANTA WING
                  </HudTableCell>
                  <HudTableCell>
                    <StatusBadge variant="standby">Standby</StatusBadge>
                  </HudTableCell>
                  <HudTableCell className="text-right text-[#8A9094]">15MS</HudTableCell>
                </HudTableRow>
              </HudTableBody>
            </HudTable>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#5A6065]">
                2 selected / 214 rows
              </span>
              <span className="flex-1" />
              <HudPagination>
                <HudPaginationPrevious />
                <HudPaginationItem>01</HudPaginationItem>
                <HudPaginationItem>02</HudPaginationItem>
                <HudPaginationItem active>03</HudPaginationItem>
                <HudPaginationEllipsis />
                <HudPaginationItem>18</HudPaginationItem>
                <HudPaginationNext />
              </HudPagination>
            </div>
          </div>
        </Section>

        <Section index="23" title="Accordion" name="hud-accordion">
          <HudAccordion type="single" defaultValue="relay" collapsible className="w-full max-w-md">
            <HudAccordionItem value="relay">
              <HudAccordionTrigger>Relay Configuration</HudAccordionTrigger>
              <HudAccordionContent>
                {(
                  [
                    ["Primary Relay", "STATION-3"],
                    ["Fallback", "LUNA-1"],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#5A6065]">
                      {k}
                    </span>
                    <span className="font-mono text-[10px] text-[#C8CCCE]">{v}</span>
                  </div>
                ))}
              </HudAccordionContent>
            </HudAccordionItem>
            <HudAccordionItem value="sensor">
              <HudAccordionTrigger>Sensor Calibration</HudAccordionTrigger>
              <HudAccordionContent className="font-mono text-[10px] text-muted-foreground">
                Array nominal. Last sweep 13:58 UTC.
              </HudAccordionContent>
            </HudAccordionItem>
            <HudAccordionItem value="rules">
              <HudAccordionTrigger>Notification Rules</HudAccordionTrigger>
              <HudAccordionContent className="font-mono text-[10px] text-muted-foreground">
                Critical alerts route to command deck.
              </HudAccordionContent>
            </HudAccordionItem>
          </HudAccordion>
        </Section>

        <Section index="24" title="Breadcrumb + Avatar" name="hud-breadcrumb">
          <div className="flex w-full flex-col gap-6">
            <HudBreadcrumb>
              <HudBreadcrumbList>
                <HudBreadcrumbItem>
                  <HudBreadcrumbLink href="#">Orbital Station</HudBreadcrumbLink>
                </HudBreadcrumbItem>
                <HudBreadcrumbSeparator />
                <HudBreadcrumbItem>
                  <HudBreadcrumbLink href="#">Sector 7</HudBreadcrumbLink>
                </HudBreadcrumbItem>
                <HudBreadcrumbSeparator />
                <HudBreadcrumbItem>
                  <HudBreadcrumbPage>Wing 09 — Nova</HudBreadcrumbPage>
                </HudBreadcrumbItem>
              </HudBreadcrumbList>
            </HudBreadcrumb>
            <div className="flex items-end gap-4">
              <HudAvatar variant="strong">
                <HudAvatarFallback>KV</HudAvatarFallback>
                <HudAvatarStatus />
              </HudAvatar>
              <HudAvatar variant="accent">
                <HudAvatarFallback>HG</HudAvatarFallback>
                <HudAvatarRank />
              </HudAvatar>
              <HudAvatar>
                <HudAvatarFallback>PA</HudAvatarFallback>
              </HudAvatar>
              <HudAvatar size="sm">
                <HudAvatarFallback>MR</HudAvatarFallback>
              </HudAvatar>
            </div>
          </div>
        </Section>

        <Section index="25" title="Slider" name="hud-slider">
          <div className="flex w-full max-w-sm flex-col gap-8">
            <div>
              <div className="flex justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-[#6E7478]">
                <span>Scan Interval</span>
                <span className="text-primary">4.0S</span>
              </div>
              <HudSlider defaultValue={[40]} className="mt-2" />
            </div>
            <div>
              <div className="flex justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-[#6E7478]">
                <span>Ping Threshold (Range)</span>
                <span className="text-primary">08 — 42MS</span>
              </div>
              <HudSlider defaultValue={[16, 68]} className="mt-2" />
            </div>
          </div>
        </Section>

        <Section index="26" title="Calendar" name="hud-calendar">
          <HudCalendar
            mode="range"
            defaultMonth={new Date(2126, 6)}
            selected={{ from: new Date(2126, 6, 8), to: new Date(2126, 6, 14) }}
          />
        </Section>

        <Section index="27" title="Input OTP" name="hud-input-otp">
          <OtpDemo />
        </Section>
        <Section index="28" title="Gauge / Sparkline / Heatmap" name="hud-gauge">
          <div className="flex w-full flex-wrap items-start gap-8">
            <HudGauge value={68} label="Thrust" />
            <div className="border border-border bg-[#0F1113] px-3.5 py-3">
              <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#5A6065]">
                Throughput
              </div>
              <div className="mt-1.5 flex items-end justify-between gap-2.5">
                <span className="font-sans text-[26px] leading-none font-semibold text-foreground">
                  4.2K
                </span>
                <HudSparkline values={[6, 10, 8, 16, 12, 20, 16, 24]} />
              </div>
            </div>
            <div className="min-w-[220px] flex-1 border border-border bg-[#0F1113] px-3.5 py-3">
              <div className="flex justify-between font-mono text-[8px] uppercase tracking-[0.16em] text-[#5A6065]">
                <span>Activity Matrix</span>
                <span className="text-[#4A5054]">LOW ▢▤▦█ HIGH</span>
              </div>
              <HudHeatmap
                className="mt-2.5"
                values={[0.08, 0.3, 0.55, 0.18, 0, 0.4, 0.75, 0.9, 0.45, 0.12, 0, 0.25,
                  0, 0.15, 0.35, 0.6, 0.85, 0.5, 0.2, 0.08, 0, 0.3, 0.65, 0.4,
                  0.22, 0, 0.1, 0.28, 0.55, 0.7, 0.95, 0.6, 0.32, 0.14, 0.42, 0]}
              />
            </div>
          </div>
        </Section>

        <Section index="29" title="Timeline + Tree" name="hud-timeline">
          <div className="grid w-full gap-4 md:grid-cols-2">
            <div className="border border-border bg-[#0F1113] px-4 py-4">
              <HudTimeline>
                <HudTimelineItem variant="accent" time="14:02:11" title="Weapons Free Authorized">
                  BY CMDR HALE // WING 09 → GRID D2 // AUTH A-1
                </HudTimelineItem>
                <HudTimelineItem variant="destructive" time="14:01:30" title="Telemetry Dropout — Wing 07">
                  LAST VECTOR 224.081 // AUTO-RETRY SCHEDULED
                </HudTimelineItem>
                <HudTimelineItem variant="muted" time="13:59:12" title="Sensor Sweep Complete" last>
                  RANGE 40K // 27 CONTACTS // 4 FLAGGED
                </HudTimelineItem>
              </HudTimeline>
            </div>
            <div className="border border-border bg-[#0F1113] px-4 py-3">
              <HudTree>
                <HudTreeBranch label="Orbital Station">
                  <HudTreeBranch label="Sector 7">
                    <HudTreeLeaf selected>Wing 09 — Nova</HudTreeLeaf>
                    <HudTreeLeaf>Wing 07 — Kestrel</HudTreeLeaf>
                    <HudTreeLeaf>Wing 04 — Vanta</HudTreeLeaf>
                  </HudTreeBranch>
                  <HudTreeBranch label="Sector 4" defaultOpen={false}>
                    <HudTreeLeaf>Wing 12 — Aurora</HudTreeLeaf>
                  </HudTreeBranch>
                </HudTreeBranch>
              </HudTree>
            </div>
          </div>
        </Section>

        <Section index="30" title="Dropzone + Stepper" name="hud-dropzone">
          <div className="grid w-full items-start gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2.5">
              <HudDropzone
                title="Drop Telemetry File"
                hint=".TLM .CSV — MAX 40MB — BROWSE"
                accept=".tlm,.csv"
              />
              <div className="border border-border bg-[#0F1113] px-3 py-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.08em] text-[#C8CCCE]">
                    sortie_log_0713.tlm
                  </span>
                  <span className="font-mono text-[9px] text-primary">64%</span>
                </div>
                <div className="mt-1.5 h-[3px] bg-[#1D2023]">
                  <div className="h-full w-[64%] bg-primary" />
                </div>
                <div className="mt-1 flex justify-between font-mono text-[8px] text-[#4A5054]">
                  <span>12.4 / 19.2 MB</span>
                  <span className="cursor-pointer text-[#5A6065] hover:text-destructive">
                    CANCEL
                  </span>
                </div>
              </div>
            </div>
            <div>
              <HudStepper className="w-full">
                <HudStep state="done" index={1} label="Target" />
                <HudStepSeparator reached />
                <HudStep state="done" index={2} label="Forces" />
                <HudStepSeparator reached />
                <HudStep state="active" index={3} label="Auth" />
                <HudStepSeparator />
                <HudStep state="todo" index={4} label="Commit" />
              </HudStepper>
              <div className="mt-4 border border-border bg-[#0F1113] px-4 py-3.5">
                <div className="font-sans text-[15px] font-semibold uppercase tracking-[0.1em] text-foreground">
                  Step 3 — Authorization
                </div>
                <div className="mt-1 font-sans text-[13px] tracking-[0.05em] text-[#9AA0A4]">
                  Two officers with clearance A-1 must countersign this order.
                </div>
              </div>
            </div>
          </div>
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
