"use client"

import * as React from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { HudStepper, HudStep, HudStepSeparator } from "@/registry/hud/hud-stepper"
import { HudRadioGroup, HudRadioGroupItem } from "@/registry/hud/hud-radio-group"
import { HudCheckbox } from "@/registry/hud/hud-checkbox"
import { HudCalendar } from "@/registry/hud/hud-calendar"
import { HudDropzone } from "@/registry/hud/hud-dropzone"
import { HudTextarea } from "@/registry/hud/hud-textarea"
import { HudLabel } from "@/registry/hud/hud-label"
import { HudButton } from "@/registry/hud/hud-button"
import { HudInputOTP, HudInputOTPGroup, HudInputOTPSlot } from "@/registry/hud/hud-input-otp"
import { StatusBadge } from "@/registry/hud/status-badge"
import { HudBody } from "@/registry/hud/hud-typography"
import {
  HudTable,
  HudTableHeader,
  HudTableBody,
  HudTableRow,
  HudTableHead,
  HudTableCell,
} from "@/registry/hud/hud-table"
import { PanelTitleRow } from "@/components/dashboard/console-shell"
import { FLEET_UNITS } from "@/app/dashboard/fleet-data"
import { formatDay } from "@/app/dashboard/format"

const STEPS = ["Objective", "Units", "Ordnance", "Approval"] as const

const OBJECTIVES = [
  { value: "patrol", label: "Sector Patrol", hint: "Routine sweep, 6-hour window" },
  { value: "intercept", label: "Intercept", hint: "Close on a designated contact" },
  { value: "escort", label: "Convoy Escort", hint: "Shadow a logistics group" },
  { value: "recon", label: "Deep Recon", hint: "Passive sensors, no emissions" },
] as const

const LOADOUTS = [
  { value: "light", label: "Light", hint: "Sensors only — no hardpoints armed" },
  { value: "standard", label: "Standard", hint: "Two hardpoints, defensive" },
  { value: "heavy", label: "Heavy", hint: "Full hardpoints, strike authorised" },
] as const

// Only units that are not already engaged can be assigned to a new plan.
const ASSIGNABLE = FLEET_UNITS.filter((u) => u.status !== "critical").slice(0, 10)

function MissionPlan() {
  const [step, setStep] = React.useState(0)
  const [objective, setObjective] = React.useState("")
  const [brief, setBrief] = React.useState("")
  const [day, setDay] = React.useState<Date | undefined>(undefined)
  const [units, setUnits] = React.useState<string[]>([])
  const [loadout, setLoadout] = React.useState("standard")
  const [attachment, setAttachment] = React.useState<string | null>(null)
  const [auth, setAuth] = React.useState("")
  const [filed, setFiled] = React.useState(false)

  const complete = [
    objective !== "" && day !== undefined,
    units.length > 0,
    loadout !== "",
    auth.length === 6,
  ]
  const canAdvance = complete[step]

  function toggleUnit(id: string, on: boolean) {
    setUnits((u) => (on ? [...u, id] : u.filter((x) => x !== id)))
  }

  function file() {
    setFiled(true)
    toast.success("Mission Plan Filed", {
      description: `${units.length} units // ${loadout} loadout`,
    })
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto p-5 pt-4">
      <div className="border border-border bg-[#0F1113] px-4 py-5">
        <HudStepper className="justify-center gap-3">
          {STEPS.map((label, i) => (
            <React.Fragment key={label}>
              {i > 0 && <HudStepSeparator />}
              <HudStep
                index={i + 1}
                label={label}
                state={i === step ? "active" : i < step ? "done" : "todo"}
              />
            </React.Fragment>
          ))}
        </HudStepper>
      </div>

      <div className="grid grid-cols-[1fr_360px] gap-3.5">
        <div className="border border-border bg-[#0F1113]">
          <PanelTitleRow
            title={STEPS[step]}
            meta={`Step ${step + 1} of ${STEPS.length}`}
          />
          <div className="px-4 py-4">
            {step === 0 && (
              <div className="flex gap-8">
                <div className="flex flex-1 flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <HudLabel>Objective</HudLabel>
                    <HudRadioGroup
                      value={objective}
                      onValueChange={setObjective}
                      className="flex flex-col gap-2.5"
                    >
                      {OBJECTIVES.map((o) => (
                        <div key={o.value} className="flex items-start gap-2">
                          <HudRadioGroupItem value={o.value} id={`obj-${o.value}`} />
                          <div>
                            <HudLabel htmlFor={`obj-${o.value}`}>{o.label}</HudLabel>
                            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#4A5054]">
                              {o.hint}
                            </p>
                          </div>
                        </div>
                      ))}
                    </HudRadioGroup>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <HudLabel htmlFor="brief">Brief</HudLabel>
                    <HudTextarea
                      id="brief"
                      rows={4}
                      value={brief}
                      onChange={(e) => setBrief(e.target.value)}
                      placeholder="Optional operational notes…"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <HudLabel>Launch Window</HudLabel>
                  <HudCalendar mode="single" selected={day} onSelect={setDay} />
                </div>
              </div>
            )}

            {step === 1 && (
              <HudTable>
                <HudTableHeader>
                  <HudTableRow>
                    <HudTableHead className="w-10" />
                    <HudTableHead>Unit</HudTableHead>
                    <HudTableHead>Wing</HudTableHead>
                    <HudTableHead>Status</HudTableHead>
                    <HudTableHead className="text-right">Signal</HudTableHead>
                  </HudTableRow>
                </HudTableHeader>
                <HudTableBody>
                  {ASSIGNABLE.map((u) => {
                    const on = units.includes(u.id)
                    return (
                      <HudTableRow key={u.id} selected={on}>
                        <HudTableCell>
                          <HudCheckbox
                            id={`unit-${u.id}`}
                            checked={on}
                            onCheckedChange={(v) => toggleUnit(u.id, v === true)}
                          />
                        </HudTableCell>
                        <HudTableCell>
                          <HudLabel htmlFor={`unit-${u.id}`}>{u.id}</HudLabel>
                        </HudTableCell>
                        <HudTableCell className="text-[#8A9094]">{u.wing}</HudTableCell>
                        <HudTableCell>
                          <StatusBadge variant={u.status === "engaged" ? "engaged" : "patrol"}>
                            {u.label}
                          </StatusBadge>
                        </HudTableCell>
                        <HudTableCell className="text-right">{u.signal}%</HudTableCell>
                      </HudTableRow>
                    )
                  })}
                </HudTableBody>
              </HudTable>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <HudLabel>Loadout</HudLabel>
                  <HudRadioGroup
                    value={loadout}
                    onValueChange={setLoadout}
                    className="flex flex-col gap-2.5"
                  >
                    {LOADOUTS.map((l) => (
                      <div key={l.value} className="flex items-start gap-2">
                        <HudRadioGroupItem value={l.value} id={`load-${l.value}`} />
                        <div>
                          <HudLabel htmlFor={`load-${l.value}`}>{l.label}</HudLabel>
                          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#4A5054]">
                            {l.hint}
                          </p>
                        </div>
                      </div>
                    ))}
                  </HudRadioGroup>
                </div>
                <div className="flex flex-col gap-1.5">
                  <HudLabel>Supporting Documents</HudLabel>
                  <HudDropzone
                    title={attachment ?? "Drop mission packet"}
                    hint={attachment ? "Click to replace" : "Charts, imagery or prior plans"}
                    onFiles={(files) => setAttachment(files[0]?.name ?? null)}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-5">
                <HudBody className="text-[#8A9094]">
                  Filing this plan commits the selected units for the launch window.
                  Enter your six-digit command authorisation to proceed.
                </HudBody>
                <div className="flex flex-col gap-1.5">
                  <HudLabel>Command Authorisation</HudLabel>
                  <HudInputOTP maxLength={6} value={auth} onChange={setAuth}>
                    <HudInputOTPGroup>
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <HudInputOTPSlot key={i} index={i} />
                      ))}
                    </HudInputOTPGroup>
                  </HudInputOTP>
                </div>
                {filed && (
                  <StatusBadge variant="live" dot>
                    Plan Filed
                  </StatusBadge>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-[#1D2023] px-4 py-3">
            <HudButton
              variant="ghost"
              size="sm"
              disabled={step === 0}
              onClick={() => setStep((s) => s - 1)}
            >
              Back
            </HudButton>
            {step < STEPS.length - 1 ? (
              <HudButton
                size="sm"
                disabled={!canAdvance}
                onClick={() => setStep((s) => s + 1)}
              >
                Continue
              </HudButton>
            ) : (
              <HudButton size="sm" disabled={!canAdvance || filed} onClick={file}>
                File Plan
              </HudButton>
            )}
          </div>
        </div>

        {/* running summary */}
        <div className="border border-border bg-[#0F1113]">
          <PanelTitleRow title="Plan Summary" />
          <div className="flex flex-col px-4 py-2">
            {(
              [
                ["Objective", OBJECTIVES.find((o) => o.value === objective)?.label ?? "——"],
                ["Launch", day ? formatDay(day) : "——"],
                ["Units", units.length ? `${units.length} assigned` : "——"],
                ["Loadout", LOADOUTS.find((l) => l.value === loadout)?.label ?? "——"],
                ["Packet", attachment ?? "——"],
                ["Authorisation", auth.length === 6 ? "Accepted" : "——"],
              ] as const
            ).map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-3 border-b border-[#15181A] py-2 last:border-0"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5A6065]">
                  {k}
                </span>
                <span
                  className={cn(
                    "truncate font-mono text-[10px]",
                    v === "——" ? "text-[#4A5054]" : "text-[#D4D8DA]"
                  )}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>
          {units.length > 0 && (
            <div className="border-t border-[#1D2023] px-4 py-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5A6065]">
                Assigned
              </span>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {units.map((id) => (
                  <span
                    key={id}
                    className="border border-[#26292C] px-2 py-0.5 font-mono text-[10px] text-[#C8CCCE]"
                  >
                    {id}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export { MissionPlan }
