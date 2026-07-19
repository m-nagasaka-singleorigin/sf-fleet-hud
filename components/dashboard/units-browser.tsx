"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { HudTree, HudTreeBranch, HudTreeLeaf } from "@/registry/hud/hud-tree"
import {
  HudBreadcrumb,
  HudBreadcrumbList,
  HudBreadcrumbItem,
  HudBreadcrumbLink,
  HudBreadcrumbPage,
  HudBreadcrumbSeparator,
} from "@/registry/hud/hud-breadcrumb"
import {
  HudAccordion,
  HudAccordionItem,
  HudAccordionTrigger,
  HudAccordionContent,
} from "@/registry/hud/hud-accordion"
import {
  HudContextMenu,
  HudContextMenuTrigger,
  HudContextMenuContent,
  HudContextMenuItem,
  HudContextMenuLabel,
  HudContextMenuSeparator,
  HudContextMenuShortcut,
} from "@/registry/hud/hud-context-menu"
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
  HudTooltip,
  HudTooltipTrigger,
  HudTooltipContent,
} from "@/registry/hud/hud-tooltip"
import { HudSkeleton } from "@/registry/hud/hud-skeleton"
import { HudButton } from "@/registry/hud/hud-button"
import { StatusBadge } from "@/registry/hud/status-badge"
import { TelemetryBar } from "@/registry/hud/telemetry-bar"
import { HudSparkline } from "@/registry/hud/hud-sparkline"
import { HudLineChart } from "@/registry/hud/hud-line-chart"
import { CrewCard } from "@/registry/hud/crew-card"
import { PanelTitleRow } from "@/components/dashboard/console-shell"
import { CREW_ROSTER } from "@/app/crew-roster"
import type { FleetUnit, FleetStatus } from "@/app/dashboard/fleet-data"

const STATUS_BADGE: Record<FleetStatus, React.ComponentProps<typeof StatusBadge>["variant"]> = {
  engaged: "engaged",
  patrol: "patrol",
  standby: "standby",
  critical: "critical",
}

/** Airframe spec lines are derived from the unit id so the demo stays deterministic. */
function specOf(u: FleetUnit, index: number) {
  return {
    frame: ["MK-IV Interceptor", "MK-III Escort", "MK-VI Recon"][index % 3],
    hull: `${88 - (index % 5) * 4}%`,
    thrust: `${2 + (index % 4)}.${(index * 7) % 10} G`,
    range: `${1200 + (index % 6) * 140} KM`,
    hardpoints: 2 + (index % 3),
    yard: ["Kestrel Yards", "Helios Dock", "Meridian Slip"][index % 3],
    commissioned: `21${40 + (index % 9)}.0${1 + (index % 9)}`,
    lastService: `${3 + (index % 20)} days ago`,
  }
}

function Field({ label, value, hint }: { label: string; value: string; hint?: string }) {
  const body = (
    <div className="flex items-baseline justify-between gap-3 border-b border-[#15181A] py-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5A6065]">
        {label}
      </span>
      <span className="font-mono text-[10px] text-[#D4D8DA]">{value}</span>
    </div>
  )
  if (!hint) return body
  return (
    <HudTooltip>
      <HudTooltipTrigger asChild>
        <div className="cursor-help">{body}</div>
      </HudTooltipTrigger>
      <HudTooltipContent>{hint}</HudTooltipContent>
    </HudTooltip>
  )
}

function UnitsBrowser({ units }: { units: FleetUnit[] }) {
  const [selectedId, setSelectedId] = React.useState(units[0].id)
  const [loading, setLoading] = React.useState(false)
  const [decommissioned, setDecommissioned] = React.useState<string[]>([])

  const index = units.findIndex((u) => u.id === selectedId)
  const unit = units[index]
  const spec = specOf(unit, index)
  const crew = CREW_ROSTER[index % CREW_ROSTER.length]

  // Wings, in first-seen order, so the tree matches the roster's own ordering.
  const wings = React.useMemo(() => {
    const map = new Map<string, FleetUnit[]>()
    for (const u of units) {
      const list = map.get(u.wing)
      if (list) list.push(u)
      else map.set(u.wing, [u])
    }
    return [...map.entries()]
  }, [units])

  // The spec sheet is fetched per unit in a real console; hold a skeleton for a
  // beat on selection so the loading treatment is part of the demo, not a guess.
  function select(id: string) {
    if (id === selectedId) return
    setSelectedId(id)
    setLoading(true)
  }
  React.useEffect(() => {
    if (!loading) return
    const t = setTimeout(() => setLoading(false), 320)
    return () => clearTimeout(t)
  }, [loading, selectedId])

  const isGone = decommissioned.includes(unit.id)

  return (
    <div className="grid min-h-0 flex-1 grid-cols-[260px_1fr] gap-3.5 p-5 pt-4">
      {/* roster tree */}
      <div className="flex min-h-0 flex-col border border-border bg-[#0F1113]">
        <PanelTitleRow title="Roster" meta={`${units.length} Units`} />
        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
          <HudTree>
            {wings.map(([wing, list]) => (
              <HudTreeBranch key={wing} label={`${wing} (${list.length})`}>
                {list.map((u) => (
                  <HudContextMenu key={u.id}>
                    <HudContextMenuTrigger asChild>
                      <HudTreeLeaf
                        selected={u.id === selectedId}
                        onClick={() => select(u.id)}
                        className={cn(decommissioned.includes(u.id) && "opacity-40")}
                      >
                        <span className="flex w-full items-center justify-between gap-2">
                          <span>{u.id}</span>
                          <span
                            className={cn(
                              "text-[10px]",
                              u.status === "critical" ? "text-destructive" : "text-[#4A5054]"
                            )}
                          >
                            {u.status === "critical" ? "!!" : u.ping}
                          </span>
                        </span>
                      </HudTreeLeaf>
                    </HudContextMenuTrigger>
                    <HudContextMenuContent>
                      <HudContextMenuLabel>{u.id}</HudContextMenuLabel>
                      <HudContextMenuSeparator />
                      <HudContextMenuItem onSelect={() => select(u.id)}>
                        Open Spec Sheet
                        <HudContextMenuShortcut>↵</HudContextMenuShortcut>
                      </HudContextMenuItem>
                      <HudContextMenuItem>Assign Patrol Vector</HudContextMenuItem>
                      <HudContextMenuItem>Request Telemetry Ping</HudContextMenuItem>
                      <HudContextMenuSeparator />
                      <HudContextMenuItem variant="destructive">
                        Recall to Dock
                      </HudContextMenuItem>
                    </HudContextMenuContent>
                  </HudContextMenu>
                ))}
              </HudTreeBranch>
            ))}
          </HudTree>
        </div>
      </div>

      {/* spec sheet */}
      <div className="flex min-h-0 flex-col gap-3.5 overflow-y-auto">
        <div className="border border-border bg-[#0F1113]">
          <div className="flex items-center justify-between border-b border-[#1D2023] px-4 py-3">
            <HudBreadcrumb>
              <HudBreadcrumbList>
                <HudBreadcrumbItem>
                  <HudBreadcrumbLink href="/dashboard">Fleet</HudBreadcrumbLink>
                </HudBreadcrumbItem>
                <HudBreadcrumbSeparator />
                <HudBreadcrumbItem>
                  <HudBreadcrumbLink href="/dashboard/units">{unit.wing}</HudBreadcrumbLink>
                </HudBreadcrumbItem>
                <HudBreadcrumbSeparator />
                <HudBreadcrumbItem>
                  <HudBreadcrumbPage>{unit.id}</HudBreadcrumbPage>
                </HudBreadcrumbItem>
              </HudBreadcrumbList>
            </HudBreadcrumb>
            <div className="flex items-center gap-3">
              <StatusBadge variant={STATUS_BADGE[unit.status]} dot>
                {isGone ? "Decommissioned" : unit.label}
              </StatusBadge>
              <HudDialog>
                <HudDialogTrigger asChild>
                  <HudButton variant="ghost" size="sm">
                    Decommission
                  </HudButton>
                </HudDialogTrigger>
                <HudDialogContent>
                  <HudDialogHeader>
                    <HudDialogTitle>Decommission {unit.id}</HudDialogTitle>
                    <HudDialogCloseButton />
                  </HudDialogHeader>
                  <HudDialogBody>
                    <HudDialogDescription>
                      {unit.id} will be struck from {unit.wing} and its patrol vector
                      reassigned. Telemetry history is retained for 90 days.
                    </HudDialogDescription>
                  </HudDialogBody>
                  <HudDialogFooter>
                    <HudDialogClose asChild>
                      <HudButton variant="ghost" size="sm">
                        Cancel
                      </HudButton>
                    </HudDialogClose>
                    <HudDialogClose asChild>
                      <HudButton
                        size="sm"
                        onClick={() =>
                          setDecommissioned((d) =>
                            d.includes(unit.id) ? d : [...d, unit.id]
                          )
                        }
                      >
                        Confirm
                      </HudButton>
                    </HudDialogClose>
                  </HudDialogFooter>
                </HudDialogContent>
              </HudDialog>
            </div>
          </div>

          <div className="grid grid-cols-[1fr_260px] gap-5 p-4">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-sans text-[32px] leading-none font-semibold text-foreground">
                  {unit.id}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5A6065]">
                  {spec.frame}
                  {" // "}
                  {unit.sector}
                </span>
              </div>

              {loading ? (
                <div className="mt-4 flex flex-col gap-2">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <HudSkeleton key={i} className="h-4 w-full" />
                  ))}
                </div>
              ) : (
                <div className="mt-3 grid grid-cols-2 gap-x-6">
                  <Field label="Hull Integrity" value={spec.hull} />
                  <Field label="Thrust Ceiling" value={spec.thrust} />
                  <Field
                    label="Combat Range"
                    value={spec.range}
                    hint="Unrefuelled radius at cruise. Halve for engaged profiles."
                  />
                  <Field label="Hardpoints" value={String(spec.hardpoints)} />
                  <Field label="Vector" value={unit.vector} />
                  <Field label="Sorties" value={String(unit.sorties)} />
                  <Field
                    label="Last Contact"
                    value={unit.lastContact}
                    hint="Timestamp of the last acknowledged telemetry frame."
                  />
                  <Field label="Ping" value={unit.ping} />
                </div>
              )}

              <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
                <TelemetryBar label="Signal Integrity" value={unit.signal} warn={unit.signal < 40} />
                <TelemetryBar label="Ordnance" value={unit.ordnance} warn={unit.ordnance < 30} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5A6065]">
                Assigned Commander
              </span>
              <CrewCard crew={crew} />
            </div>
          </div>
        </div>

        <div className="border border-border bg-[#0F1113]">
          <PanelTitleRow title="Vitals" meta="Last 14 Frames" />
          <div className="px-4 py-3.5">
            <HudLineChart
              height={160}
              unit="%"
              min={0}
              max={100}
              band={{ from: 0, to: 40 }}
              series={[{ name: unit.id, values: unit.vitals }]}
              legend={false}
            />
          </div>
        </div>

        <div className="border border-border bg-[#0F1113]">
          <PanelTitleRow title="Service Record" />
          <HudAccordion type="single" collapsible defaultValue="airframe" className="px-4">
            <HudAccordionItem value="airframe">
              <HudAccordionTrigger>Airframe</HudAccordionTrigger>
              <HudAccordionContent>
                <div className="grid grid-cols-2 gap-x-6">
                  <Field label="Build Yard" value={spec.yard} />
                  <Field label="Commissioned" value={spec.commissioned} />
                  <Field label="Last Service" value={spec.lastService} />
                  <Field label="Frame" value={spec.frame} />
                </div>
              </HudAccordionContent>
            </HudAccordionItem>
            <HudAccordionItem value="crew">
              <HudAccordionTrigger>Crew Assignment</HudAccordionTrigger>
              <HudAccordionContent>
                <div className="grid grid-cols-2 gap-x-6">
                  <Field label="Commander" value={unit.commander} />
                  <Field label="Callsign" value={crew.callsign ?? "——"} />
                  <Field label="Section" value={crew.unit ?? "——"} />
                  <Field label="Watch" value="Rotation 04" />
                </div>
              </HudAccordionContent>
            </HudAccordionItem>
            <HudAccordionItem value="telemetry">
              <HudAccordionTrigger>Telemetry Trace</HudAccordionTrigger>
              <HudAccordionContent>
                <div className="flex items-center justify-between gap-4 py-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5A6065]">
                    Signal, last 14 frames
                  </span>
                  <HudSparkline values={unit.vitals} width={160} height={32} />
                </div>
              </HudAccordionContent>
            </HudAccordionItem>
          </HudAccordion>
        </div>
      </div>
    </div>
  )
}

export { UnitsBrowser }
