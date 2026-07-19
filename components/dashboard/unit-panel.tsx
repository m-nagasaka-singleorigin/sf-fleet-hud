"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { StatusBadge } from "@/registry/hud/status-badge"
import { TelemetryBar } from "@/registry/hud/telemetry-bar"
import { HudSparkline } from "@/registry/hud/hud-sparkline"
import { HudButton } from "@/registry/hud/hud-button"
import { HudChip } from "@/registry/hud/hud-chip"
import { HudTabs, HudTabsList, HudTabsTrigger, HudTabsContent } from "@/registry/hud/hud-tabs"
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
} from "@/registry/hud/hud-pagination"
import {
  HudSheet,
  HudSheetContent,
  HudSheetHeader,
  HudSheetTitle,
  HudSheetCloseButton,
  HudSheetDescription,
  HudSheetBody,
  HudSheetFooter,
} from "@/registry/hud/hud-sheet"
import type { FleetEvent, FleetUnit } from "@/app/dashboard/fleet-data"

const PAGE_SIZE = 6

export function UnitPanel({
  units,
  events,
}: {
  units: FleetUnit[]
  events: FleetEvent[]
}) {
  const [filters, setFilters] = React.useState(["Sector 7", "Ping < 30ms"])
  const [page, setPage] = React.useState(1)
  const [selected, setSelected] = React.useState<FleetUnit | null>(null)

  const pageCount = Math.ceil(units.length / PAGE_SIZE)
  const rows = units.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="flex min-h-0 flex-col border border-border bg-[#0F1113]">
      <HudTabs defaultValue="live" className="flex min-h-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-[#1D2023] pr-4 pl-4">
          <span className="py-3 font-sans text-[15px] font-medium uppercase tracking-[0.14em] text-[#C8CCCE]">
            Unit Status
          </span>
          <HudTabsList className="border-b-0">
            <HudTabsTrigger value="live">Live</HudTabsTrigger>
            <HudTabsTrigger value="history">History</HudTabsTrigger>
          </HudTabsList>
        </div>

        <HudTabsContent value="live" className="mt-0 flex min-h-0 flex-1 flex-col">
          <div className="flex flex-wrap items-center gap-2 border-b border-[#1D2023] px-4 py-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#4A5054]">
              Filters:
            </span>
            {filters.map((f, i) => (
              <HudChip
                key={f}
                variant={i === 0 ? "active" : "default"}
                onRemove={() => setFilters((s) => s.filter((x) => x !== f))}
              >
                {f}
              </HudChip>
            ))}
            {filters.length === 0 && (
              <button
                type="button"
                onClick={() => setFilters(["Sector 7", "Ping < 30ms"])}
                className="cursor-pointer border-b border-dashed border-[#4A5054] font-mono text-[10px] uppercase tracking-[0.12em] text-[#5A6065] transition-colors hover:text-primary"
              >
                + Add filter
              </button>
            )}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">
            <HudTable containerClassName="border-0 bg-transparent">
              <HudTableHeader>
                <HudTableRow className="hover:bg-transparent">
                  <HudTableHead sorted="asc">Unit</HudTableHead>
                  <HudTableHead>Wing</HudTableHead>
                  <HudTableHead>Status</HudTableHead>
                  <HudTableHead>Signal</HudTableHead>
                  <HudTableHead className="text-right">Ping</HudTableHead>
                </HudTableRow>
              </HudTableHeader>
              <HudTableBody>
                {rows.map((u) => (
                  <HudTableRow
                    key={u.id}
                    selected={selected?.id === u.id}
                    onClick={() => setSelected(u)}
                    className={cn(
                      "cursor-pointer",
                      u.lost && "bg-destructive/[0.06] hover:bg-destructive/10"
                    )}
                  >
                    <HudTableCell>{u.id}</HudTableCell>
                    <HudTableCell className="font-sans text-sm uppercase tracking-[0.08em] text-[#9AA0A4]">
                      {u.wing}
                    </HudTableCell>
                    <HudTableCell>
                      <StatusBadge variant={u.status}>{u.label}</StatusBadge>
                    </HudTableCell>
                    <HudTableCell>
                      <span className="mr-5 block h-[3px] bg-[#1D2023]">
                        <span
                          className={cn("block h-full", u.lost ? "bg-destructive" : "bg-[#8A9094]")}
                          style={{ width: `${u.signal}%` }}
                        />
                      </span>
                    </HudTableCell>
                    <HudTableCell
                      className={cn("text-right", u.lost ? "text-destructive" : "text-[#8A9094]")}
                    >
                      {u.ping}
                    </HudTableCell>
                  </HudTableRow>
                ))}
              </HudTableBody>
            </HudTable>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-[#1D2023] px-4 py-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#4A5054]">
              {units.length} units tracked — click a row for detail
            </span>
            <HudPagination>
              <HudPaginationPrevious
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              />
              {Array.from({ length: pageCount }, (_, i) => (
                <HudPaginationItem
                  key={i}
                  active={page === i + 1}
                  onClick={() => setPage(i + 1)}
                >
                  {String(i + 1).padStart(2, "0")}
                </HudPaginationItem>
              ))}
              <HudPaginationNext
                disabled={page === pageCount}
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              />
            </HudPagination>
          </div>
        </HudTabsContent>

        <HudTabsContent value="history" className="mt-0 min-h-0 flex-1 overflow-y-auto">
          <HudTable containerClassName="border-0 bg-transparent">
            <HudTableHeader>
              <HudTableRow className="hover:bg-transparent">
                <HudTableHead>Time</HudTableHead>
                <HudTableHead>Unit</HudTableHead>
                <HudTableHead>Event</HudTableHead>
              </HudTableRow>
            </HudTableHeader>
            <HudTableBody>
              {events.map((e) => (
                <HudTableRow key={e.time}>
                  <HudTableCell className="text-[#5A6065]">{e.time}</HudTableCell>
                  <HudTableCell>{e.unit}</HudTableCell>
                  <HudTableCell
                    className={cn(
                      "font-sans text-sm tracking-[0.06em]",
                      e.tone === "destructive" && "text-destructive",
                      e.tone === "accent" && "text-[#D4D8DA]",
                      e.tone === "muted" && "text-[#9AA0A4]"
                    )}
                  >
                    {e.event}
                  </HudTableCell>
                </HudTableRow>
              ))}
            </HudTableBody>
          </HudTable>
        </HudTabsContent>
      </HudTabs>

      <HudSheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <HudSheetContent>
          <HudSheetHeader>
            <HudSheetTitle>{`${selected?.id ?? ""} // Detail`}</HudSheetTitle>
            <HudSheetCloseButton />
          </HudSheetHeader>
          <HudSheetDescription className="sr-only">
            Telemetry detail for unit {selected?.id}
          </HudSheetDescription>
          {selected && (
            <>
              <HudSheetBody>
                <div className="flex items-center justify-between">
                  <StatusBadge variant={selected.status} dot={selected.lost}>
                    {selected.label}
                  </StatusBadge>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5A6065]">
                    {selected.wing}
                  </span>
                </div>
                {(
                  [
                    ["Commander", selected.commander],
                    ["Vector", selected.vector],
                    ["Sorties", String(selected.sorties).padStart(3, "0")],
                    ["Last Contact", selected.lastContact],
                    ["Ping", selected.ping],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#5A6065]">
                      {k}
                    </span>
                    <span className="truncate font-mono text-[10px] uppercase text-[#C8CCCE]">
                      {v}
                    </span>
                  </div>
                ))}
                <div className="mt-1 flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6E7478]">
                    Signal Trace
                  </span>
                  <HudSparkline
                    className={selected.lost ? "text-destructive" : "text-[#8A9094]"}
                    values={selected.vitals}
                    width={120}
                    height={22}
                  />
                </div>
                <TelemetryBar label="Signal" value={selected.signal} warn={selected.lost} />
                <TelemetryBar
                  label="Ordnance"
                  value={selected.ordnance}
                  warn={selected.ordnance < 40}
                />
              </HudSheetBody>
              <HudSheetFooter>
                <HudButton variant="outline" size="sm" className="w-full">
                  Open Full Record
                </HudButton>
              </HudSheetFooter>
            </>
          )}
        </HudSheetContent>
      </HudSheet>
    </div>
  )
}
