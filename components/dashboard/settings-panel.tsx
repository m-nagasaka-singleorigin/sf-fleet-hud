"use client"

import * as React from "react"
import { toast } from "sonner"
import { HudLabel } from "@/registry/hud/hud-label"
import { HudInput } from "@/registry/hud/hud-input"
import { HudSwitch } from "@/registry/hud/hud-switch"
import { HudCheckbox } from "@/registry/hud/hud-checkbox"
import { HudRadioGroup, HudRadioGroupItem } from "@/registry/hud/hud-radio-group"
import { HudSlider } from "@/registry/hud/hud-slider"
import { HudButton } from "@/registry/hud/hud-button"
import { HudBody } from "@/registry/hud/hud-typography"
import {
  HudSelect,
  HudSelectContent,
  HudSelectItem,
  HudSelectTrigger,
  HudSelectValue,
} from "@/registry/hud/hud-select"
import {
  HudAccordion,
  HudAccordionItem,
  HudAccordionTrigger,
  HudAccordionContent,
} from "@/registry/hud/hud-accordion"
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
import { PanelTitleRow } from "@/components/dashboard/console-shell"

const ACCENTS = [
  { value: "orange", label: "Amber", hint: "Default HUD accent" },
  { value: "cyan", label: "Cyan", hint: "theme-hud-cyan registry item" },
] as const

const ALERT_CHANNELS = [
  { key: "console", label: "Console banner" },
  { key: "audio", label: "Audio chime" },
  { key: "relay", label: "Relay to command" },
] as const

function Row({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string
  hint?: string
  htmlFor?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-[#15181A] py-3 last:border-0">
      <div className="min-w-0">
        <HudLabel htmlFor={htmlFor}>{label}</HudLabel>
        {hint && (
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#4A5054]">
            {hint}
          </p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

function SettingsPanel() {
  const [accent, setAccent] = React.useState<"orange" | "cyan">("orange")
  const [callsign, setCallsign] = React.useState("Ashfall")
  const [refresh, setRefresh] = React.useState("2")
  const [threat, setThreat] = React.useState([34])
  const [signalFloor, setSignalFloor] = React.useState([40])
  const [reduceMotion, setReduceMotion] = React.useState(false)
  const [alerts, setAlerts] = React.useState<Record<string, boolean>>({
    console: true,
    audio: false,
    relay: true,
  })
  const [purged, setPurged] = React.useState(false)

  // The accent radio drives the same attribute the catalog's FX bar uses, so this
  // screen is a live demonstration of the theme-hud-cyan registry item.
  React.useEffect(() => {
    if (accent === "cyan") document.documentElement.setAttribute("data-accent", "cyan")
    else document.documentElement.removeAttribute("data-accent")
  }, [accent])

  return (
    <div className="grid min-h-0 flex-1 grid-cols-2 gap-3.5 overflow-y-auto p-5 pt-4">
      {/* appearance */}
      <div className="flex flex-col gap-3.5">
        <div className="border border-border bg-[#0F1113]">
          <PanelTitleRow title="Appearance" meta="Applies immediately" />
          <div className="px-4 py-1">
            <Row label="Accent" hint="Switches the console accent token">
              <HudRadioGroup
                value={accent}
                onValueChange={(v) => setAccent(v as "orange" | "cyan")}
                className="flex gap-5"
              >
                {ACCENTS.map((a) => (
                  <div key={a.value} className="flex items-center gap-2">
                    <HudRadioGroupItem value={a.value} id={`accent-${a.value}`} />
                    <HudLabel htmlFor={`accent-${a.value}`}>{a.label}</HudLabel>
                  </div>
                ))}
              </HudRadioGroup>
            </Row>
            <Row
              label="Reduce motion"
              hint="Stops the radar sweep and blip pulse"
              htmlFor="reduce-motion"
            >
              <HudSwitch
                id="reduce-motion"
                checked={reduceMotion}
                onCheckedChange={setReduceMotion}
              />
            </Row>
            <Row label="Refresh interval" htmlFor="refresh">
              <HudSelect value={refresh} onValueChange={setRefresh}>
                <HudSelectTrigger id="refresh" className="w-[120px]">
                  <HudSelectValue />
                </HudSelectTrigger>
                <HudSelectContent>
                  {["1", "2", "5", "10"].map((s) => (
                    <HudSelectItem key={s} value={s}>
                      {s} seconds
                    </HudSelectItem>
                  ))}
                </HudSelectContent>
              </HudSelect>
            </Row>
          </div>
        </div>

        <div className="border border-border bg-[#0F1113]">
          <PanelTitleRow title="Operator" />
          <div className="px-4 py-1">
            <Row label="Callsign" htmlFor="callsign">
              <HudInput
                id="callsign"
                value={callsign}
                onChange={(e) => setCallsign(e.target.value)}
                className="w-[180px]"
              />
            </Row>
            <Row label="Clearance" hint="Read-only — set by command">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5A6065]">
                A-1
              </span>
            </Row>
          </div>
        </div>
      </div>

      {/* thresholds + alerts + danger */}
      <div className="flex flex-col gap-3.5">
        <div className="border border-border bg-[#0F1113]">
          <PanelTitleRow title="Thresholds" meta="Drives alert banners" />
          <div className="flex flex-col gap-5 px-4 py-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <HudLabel>Threat index alarm</HudLabel>
                <span className="font-mono text-[10px] text-primary">
                  0.{String(threat[0]).padStart(2, "0")}
                </span>
              </div>
              <HudSlider value={threat} onValueChange={setThreat} max={100} step={1} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <HudLabel>Signal integrity floor</HudLabel>
                <span className="font-mono text-[10px] text-primary">{signalFloor[0]}%</span>
              </div>
              <HudSlider
                value={signalFloor}
                onValueChange={setSignalFloor}
                max={100}
                step={1}
              />
            </div>
          </div>
        </div>

        <div className="border border-border bg-[#0F1113]">
          <PanelTitleRow title="Alert Routing" />
          <div className="flex flex-col gap-3 px-4 py-4">
            {ALERT_CHANNELS.map((c) => (
              <div key={c.key} className="flex items-center gap-2">
                <HudCheckbox
                  id={`alert-${c.key}`}
                  checked={alerts[c.key]}
                  onCheckedChange={(v) =>
                    setAlerts((a) => ({ ...a, [c.key]: v === true }))
                  }
                />
                <HudLabel htmlFor={`alert-${c.key}`}>{c.label}</HudLabel>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-border bg-[#0F1113]">
          <PanelTitleRow title="Advanced" />
          <HudAccordion type="single" collapsible className="px-4">
            <HudAccordionItem value="retention">
              <HudAccordionTrigger>Data Retention</HudAccordionTrigger>
              <HudAccordionContent>
                <HudBody className="text-[#8A9094]">
                  Telemetry frames are retained for 90 days, comms transcripts for 30
                  days. Retention is set by command policy and cannot be shortened
                  from this console.
                </HudBody>
              </HudAccordionContent>
            </HudAccordionItem>
            <HudAccordionItem value="danger">
              <HudAccordionTrigger>Danger Zone</HudAccordionTrigger>
              <HudAccordionContent>
                <div className="flex items-center justify-between gap-4 py-1">
                  <HudBody className="text-[#8A9094]">
                    {purged
                      ? "Local cache purged. Telemetry will rebuild on next uplink."
                      : "Purge the local telemetry cache for this console."}
                  </HudBody>
                  <HudDialog>
                    <HudDialogTrigger asChild>
                      <HudButton variant="ghost" size="sm" disabled={purged}>
                        Purge Cache
                      </HudButton>
                    </HudDialogTrigger>
                    <HudDialogContent>
                      <HudDialogHeader>
                        <HudDialogTitle>Purge Local Cache</HudDialogTitle>
                        <HudDialogCloseButton />
                      </HudDialogHeader>
                      <HudDialogBody>
                        <HudDialogDescription>
                          All cached telemetry frames on this console will be
                          discarded. Server-side history is unaffected.
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
                            onClick={() => {
                              setPurged(true)
                              toast.error("Cache Purged", {
                                description: "Local telemetry discarded",
                              })
                            }}
                          >
                            Purge
                          </HudButton>
                        </HudDialogClose>
                      </HudDialogFooter>
                    </HudDialogContent>
                  </HudDialog>
                </div>
              </HudAccordionContent>
            </HudAccordionItem>
          </HudAccordion>
        </div>

        <div className="flex justify-end gap-3">
          <HudButton
            onClick={() =>
              toast.success("Settings Saved", {
                description: `Accent ${accent} // refresh ${refresh}s`,
              })
            }
          >
            Save Settings
          </HudButton>
        </div>
      </div>
    </div>
  )
}

export { SettingsPanel }
