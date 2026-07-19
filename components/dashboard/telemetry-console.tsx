"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { HudTabs, HudTabsList, HudTabsTrigger, HudTabsContent } from "@/registry/hud/hud-tabs"
import { HudGauge } from "@/registry/hud/hud-gauge"
import { HudLineChart } from "@/registry/hud/hud-line-chart"
import { HudBarChart } from "@/registry/hud/hud-bar-chart"
import { HudSparkline } from "@/registry/hud/hud-sparkline"
import { HudSkeleton } from "@/registry/hud/hud-skeleton"
import { SegmentBar } from "@/registry/hud/segment-bar"
import { StatusBadge } from "@/registry/hud/status-badge"
import { HudH5 } from "@/registry/hud/hud-typography"
import {
  HudTable,
  HudTableHeader,
  HudTableBody,
  HudTableRow,
  HudTableHead,
  HudTableCell,
} from "@/registry/hud/hud-table"
import { PanelTitleRow } from "@/components/dashboard/console-shell"
import {
  SUBSYSTEMS,
  CYCLE_LABELS,
  isOutOfSpec,
  type Subsystem,
} from "@/app/dashboard/telemetry-data"

function SubsystemView({ sub }: { sub: Subsystem }) {
  // Channel history streams in after the subsystem is selected; hold a skeleton
  // for a beat so the loading state is demonstrated rather than assumed.
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(t)
  }, [sub.key])

  const faults = sub.channels.filter(isOutOfSpec)

  return (
    <div className="flex flex-col gap-3.5">
      {/* gauges */}
      <div className="border border-border bg-[#0F1113]">
        {/* children take over from `meta` so the fault badge can sit alongside it */}
        <PanelTitleRow title={`${sub.label} Instruments`}>
          <div className="flex items-center gap-3">
            {faults.length > 0 && (
              <StatusBadge variant="critical" dot>
                {faults.length} Out Of Spec
              </StatusBadge>
            )}
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5A6065]">
              Refresh 2S
            </span>
          </div>
        </PanelTitleRow>
        <div className="grid grid-cols-6 gap-3 p-4">
          {sub.gauges.map((g) => (
            <div key={g.label} className="flex flex-col items-center gap-2">
              <HudGauge value={g.value} label={g.label} size={96} />
              <SegmentBar
                className="w-full"
                segments={10}
                filled={Math.round(g.value / 10)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* history + draw */}
      <div className="grid grid-cols-[1fr_440px] gap-3.5">
        <div className="border border-border bg-[#0F1113]">
          <PanelTitleRow title="History" meta="Last 12 Cycles" />
          <div className="px-4 py-3.5">
            <HudLineChart
              height={210}
              unit="%"
              labels={CYCLE_LABELS}
              band={sub.band}
              series={sub.series}
            />
          </div>
        </div>
        <div className="border border-border bg-[#0F1113]">
          <PanelTitleRow title="Draw By Wing" meta="Current Rotation" />
          <div className="px-4 py-3.5">
            <HudBarChart height={210} data={sub.draw} series={sub.drawSeries} />
          </div>
        </div>
      </div>

      {/* channels */}
      <div className="border border-border bg-[#0F1113]">
        <PanelTitleRow title="Channels" meta={`${sub.channels.length} Tracked`} />
        {loading ? (
          <div className="flex flex-col gap-2 p-4">
            {sub.channels.map((c) => (
              <HudSkeleton key={c.id} className="h-6 w-full" />
            ))}
          </div>
        ) : (
          <HudTable>
            <HudTableHeader>
              <HudTableRow>
                <HudTableHead>Channel</HudTableHead>
                <HudTableHead>Name</HudTableHead>
                <HudTableHead className="text-right">Value</HudTableHead>
                <HudTableHead className="text-right">Nominal</HudTableHead>
                <HudTableHead className="text-right">Trend</HudTableHead>
                <HudTableHead className="text-right">State</HudTableHead>
              </HudTableRow>
            </HudTableHeader>
            <HudTableBody>
              {sub.channels.map((c) => {
                const bad = isOutOfSpec(c)
                return (
                  <HudTableRow key={c.id} selected={bad}>
                    <HudTableCell className="text-[#8A9094]">{c.id}</HudTableCell>
                    <HudTableCell>{c.name}</HudTableCell>
                    <HudTableCell
                      className={cn("text-right", bad ? "text-primary" : "text-foreground")}
                    >
                      {c.value}
                      {c.unit}
                    </HudTableCell>
                    <HudTableCell className="text-right text-[#5A6065]">
                      {c.nominal[0]}–{c.nominal[1]}
                    </HudTableCell>
                    <HudTableCell>
                      <div className="flex justify-end">
                        <HudSparkline
                          values={c.trend}
                          width={90}
                          height={20}
                          className={bad ? "text-primary" : "text-[#5A6065]"}
                        />
                      </div>
                    </HudTableCell>
                    <HudTableCell className="text-right">
                      <StatusBadge variant={bad ? "critical" : "patrol"}>
                        {bad ? "Out Of Spec" : "Nominal"}
                      </StatusBadge>
                    </HudTableCell>
                  </HudTableRow>
                )
              })}
            </HudTableBody>
          </HudTable>
        )}
      </div>
    </div>
  )
}

function TelemetryConsole() {
  return (
    <div className="flex flex-1 flex-col p-5 pt-4">
      <HudH5 className="mb-3 text-[#5A6065]">Subsystem</HudH5>
      <HudTabs defaultValue="reactor">
        <HudTabsList>
          {SUBSYSTEMS.map((s) => (
            <HudTabsTrigger key={s.key} value={s.key}>
              {s.label}
            </HudTabsTrigger>
          ))}
        </HudTabsList>
        {SUBSYSTEMS.map((s) => (
          <HudTabsContent key={s.key} value={s.key}>
            <SubsystemView sub={s} />
          </HudTabsContent>
        ))}
      </HudTabs>
    </div>
  )
}

export { TelemetryConsole }
