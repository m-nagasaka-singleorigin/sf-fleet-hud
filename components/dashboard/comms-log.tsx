"use client"

import * as React from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { HudTimeline, HudTimelineItem } from "@/registry/hud/hud-timeline"
import { HudCalendar } from "@/registry/hud/hud-calendar"
import { HudCheckbox } from "@/registry/hud/hud-checkbox"
import { HudTextarea } from "@/registry/hud/hud-textarea"
import { HudDropzone } from "@/registry/hud/hud-dropzone"
import { HudLabel } from "@/registry/hud/hud-label"
import { HudButton } from "@/registry/hud/hud-button"
import { HudChip } from "@/registry/hud/hud-chip"
import { HudPopover, HudPopoverTrigger, HudPopoverContent } from "@/registry/hud/hud-popover"
import {
  HudInputOTP,
  HudInputOTPGroup,
  HudInputOTPSlot,
} from "@/registry/hud/hud-input-otp"
import {
  HudSelect,
  HudSelectContent,
  HudSelectItem,
  HudSelectTrigger,
  HudSelectValue,
} from "@/registry/hud/hud-select"
import { PanelTitleRow } from "@/components/dashboard/console-shell"
import { formatDay } from "@/app/dashboard/format"
import {
  TRANSMISSIONS,
  COMMS_CHANNELS,
  PRIORITIES,
  PRIORITY_TONE,
  clockOf,
  type CommsChannel,
  type Priority,
} from "@/app/dashboard/comms-data"

const ALL_CHANNELS = new Set<CommsChannel>(COMMS_CHANNELS)

function CommsLog() {
  const [channels, setChannels] = React.useState<Set<CommsChannel>>(ALL_CHANNELS)
  const [priority, setPriority] = React.useState<Priority | "all">("all")
  const [day, setDay] = React.useState<Date | undefined>(undefined)
  const [body, setBody] = React.useState("")
  const [key, setKey] = React.useState("")
  const [attachment, setAttachment] = React.useState<string | null>(null)
  const [recipient, setRecipient] = React.useState("")

  const filtered =
    day !== undefined || priority !== "all" || channels.size !== COMMS_CHANNELS.length

  const shown = TRANSMISSIONS.filter(
    (t) => channels.has(t.channel) && (priority === "all" || t.priority === priority)
  )

  function toggleChannel(c: CommsChannel, on: boolean) {
    setChannels((prev) => {
      const next = new Set(prev)
      if (on) next.add(c)
      else next.delete(c)
      return next
    })
  }

  const keyComplete = key.length === 6
  const canTransmit = recipient !== "" && body.trim() !== "" && keyComplete

  function transmit() {
    toast.info("Transmission Queued", {
      description: `${recipient} // ${attachment ? "1 attachment" : "no attachment"}`,
    })
    setBody("")
    setKey("")
    setAttachment(null)
  }

  return (
    <div className="grid min-h-0 flex-1 grid-cols-[1fr_400px] gap-3.5 p-5 pt-4">
      {/* log */}
      <div className="flex min-h-0 flex-col border border-border bg-[#0F1113]">
        <PanelTitleRow title="Comms Log">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5A6065]">
            {shown.length} of {TRANSMISSIONS.length}
            {" // Live"}
          </span>
        </PanelTitleRow>

        {/* Active-filter chips carry their own remove button, so the chip stays a
            label and never becomes a fake control. */}
        {filtered && (
          <div className="flex flex-wrap items-center gap-2 border-b border-[#1D2023] px-4 py-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#4A5054]">
              Active
            </span>
            {priority !== "all" && (
              <HudChip variant="active" onRemove={() => setPriority("all")}>
                {priority}
              </HudChip>
            )}
            {day && (
              <HudChip variant="active" onRemove={() => setDay(undefined)}>
                {formatDay(day)}
              </HudChip>
            )}
            {COMMS_CHANNELS.filter((c) => !channels.has(c)).map((c) => (
              <HudChip key={c} variant="active" onRemove={() => toggleChannel(c, true)}>
                −{c}
              </HudChip>
            ))}
          </div>
        )}

        {/* filters */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-[#1D2023] px-4 py-3">
          <div className="flex items-center gap-3">
            {COMMS_CHANNELS.map((c) => (
              <div key={c} className="flex items-center gap-1.5">
                <HudCheckbox
                  id={`ch-${c}`}
                  checked={channels.has(c)}
                  onCheckedChange={(v) => toggleChannel(c, v === true)}
                />
                <HudLabel htmlFor={`ch-${c}`}>{c}</HudLabel>
              </div>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-3">
            <HudSelect value={priority} onValueChange={(v) => setPriority(v as Priority | "all")}>
              <HudSelectTrigger className="w-[132px]">
                <HudSelectValue placeholder="All priorities" />
              </HudSelectTrigger>
              <HudSelectContent>
                <HudSelectItem value="all">All priorities</HudSelectItem>
                {PRIORITIES.map((p) => (
                  <HudSelectItem key={p} value={p}>
                    {p}
                  </HudSelectItem>
                ))}
              </HudSelectContent>
            </HudSelect>

            <HudPopover>
              <HudPopoverTrigger asChild>
                <HudButton variant="ghost" size="sm">
                  {day ? formatDay(day) : "Date range"}
                </HudButton>
              </HudPopoverTrigger>
              <HudPopoverContent className="w-auto p-0">
                <HudCalendar mode="single" selected={day} onSelect={setDay} />
              </HudPopoverContent>
            </HudPopover>

            {filtered && (
              <HudButton
                variant="ghost"
                size="sm"
                onClick={() => {
                  setDay(undefined)
                  setPriority("all")
                  setChannels(new Set(COMMS_CHANNELS))
                }}
              >
                Clear filters
              </HudButton>
            )}
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3.5">
          {shown.length === 0 ? (
            <p className="py-10 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-[#4A5054]">
              No transmissions match the current filters
            </p>
          ) : (
            <HudTimeline>
              {shown.map((t, i, arr) => (
                <HudTimelineItem
                  key={t.id}
                  variant={PRIORITY_TONE[t.priority]}
                  time={clockOf(t.minutesAgo)}
                  title={t.body}
                  last={i === arr.length - 1}
                >
                  {`${t.from} // ${t.channel} // ${t.priority}`}
                </HudTimelineItem>
              ))}
            </HudTimeline>
          )}
        </div>
      </div>

      {/* compose */}
      <div className="flex min-h-0 flex-col overflow-y-auto border border-border bg-[#0F1113]">
        <PanelTitleRow title="Transmit" meta="Encrypted" />
        <div className="flex flex-col gap-4 px-4 py-3.5">
          <div className="flex flex-col gap-1.5">
            <HudLabel htmlFor="tx-to">Recipient</HudLabel>
            <HudSelect value={recipient} onValueChange={setRecipient}>
              <HudSelectTrigger id="tx-to">
                <HudSelectValue placeholder="Select channel" />
              </HudSelectTrigger>
              <HudSelectContent>
                {COMMS_CHANNELS.map((c) => (
                  <HudSelectItem key={c} value={c}>
                    {c}
                  </HudSelectItem>
                ))}
              </HudSelectContent>
            </HudSelect>
          </div>

          <div className="flex flex-col gap-1.5">
            <HudLabel htmlFor="tx-body">Message</HudLabel>
            <HudTextarea
              id="tx-body"
              rows={5}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Compose transmission…"
            />
            <span className="text-right font-mono text-[10px] text-[#4A5054]">
              {body.length}/480
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <HudLabel>Encryption Key</HudLabel>
            <HudInputOTP maxLength={6} value={key} onChange={setKey}>
              <HudInputOTPGroup>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <HudInputOTPSlot key={i} index={i} />
                ))}
              </HudInputOTPGroup>
            </HudInputOTP>
            <span
              className={cn(
                "font-mono text-[10px] uppercase tracking-[0.14em]",
                keyComplete ? "text-primary" : "text-[#4A5054]"
              )}
            >
              {keyComplete ? "Key accepted" : "6-digit rotation key required"}
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <HudLabel>Attachment</HudLabel>
            <HudDropzone
              title={attachment ?? "Drop payload"}
              hint={attachment ? "Click to replace" : "Telemetry capture or chart export"}
              onFiles={(files) => setAttachment(files[0]?.name ?? null)}
            />
          </div>

          <HudButton disabled={!canTransmit} onClick={transmit}>
            Transmit
          </HudButton>
          {!canTransmit && (
            <span className="-mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#4A5054]">
              Recipient, message and key are required
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export { CommsLog }
