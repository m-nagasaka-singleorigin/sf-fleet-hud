// Demo-only fixture for the Comms Log screen. NOT part of the registry.

export const COMMS_CHANNELS = ["Command", "Tactical", "Logistics", "Engineering", "Medical"] as const
export type CommsChannel = (typeof COMMS_CHANNELS)[number]

export const PRIORITIES = ["Flash", "Priority", "Routine"] as const
export type Priority = (typeof PRIORITIES)[number]

export type Transmission = {
  id: string
  /** Minutes before "now"; the screen renders clock time from this. */
  minutesAgo: number
  channel: CommsChannel
  priority: Priority
  from: string
  body: string
}

const SEEDS: [number, CommsChannel, Priority, string, string][] = [
  [2, "Tactical", "Flash", "D-0203", "Telemetry dropout — auto-retry scheduled, grid F4"],
  [6, "Command", "Priority", "CIC", "Weapons free authorized — grid D2"],
  [11, "Tactical", "Routine", "D-0301", "Sensor sweep complete — 27 contacts logged"],
  [14, "Engineering", "Priority", "Reactor Watch", "Coolant reserve below nominal — 34.1%"],
  [19, "Command", "Routine", "CIC", "Intercept vector accepted — D-0244"],
  [23, "Logistics", "Routine", "Hangar 2", "Resupply docking confirmed — D-0447"],
  [27, "Medical", "Routine", "Sickbay", "Rotation 04 fitness screening complete"],
  [31, "Tactical", "Flash", "D-0117", "Hostile contact bearing 034 — closing"],
  [36, "Engineering", "Routine", "Damage Ctl", "Hull inspection Deck 3 — no findings"],
  [42, "Command", "Priority", "CIC", "Threat index elevated 0.21 → 0.34"],
  [48, "Logistics", "Routine", "Quartermaster", "Ordnance transfer queued — Phoenix Wing"],
  [55, "Tactical", "Routine", "D-0142", "Patrol handover — rotation 04"],
  [61, "Medical", "Priority", "Sickbay", "Crew member cleared for return to duty"],
  [68, "Engineering", "Routine", "Reactor Watch", "Containment field holding at 99.2%"],
  [74, "Command", "Routine", "CIC", "Standby watch assumed — Halcyon Wing"],
  [83, "Logistics", "Routine", "Hangar 1", "Fuel bunkering complete — 52% reserve"],
  [91, "Tactical", "Priority", "D-0362", "Sensor ghost resolved — false contact"],
  [104, "Engineering", "Flash", "Damage Ctl", "Barrel cooling out of spec — WP-05"],
  [118, "Command", "Routine", "CIC", "Shift change brief distributed"],
  [131, "Medical", "Routine", "Sickbay", "Atmosphere mix verified — Deck 1 through 5"],
  [147, "Logistics", "Routine", "Quartermaster", "Consumables inventory reconciled"],
  [166, "Tactical", "Routine", "D-0491", "Standby vector assigned — sector 4"],
]

export const TRANSMISSIONS: Transmission[] = SEEDS.map(
  ([minutesAgo, channel, priority, from, body], i) => ({
    id: `TX-${String(1000 + i)}`,
    minutesAgo,
    channel,
    priority,
    from,
    body,
  })
)

/** Clock label for a transmission, counted back from a fixed demo epoch. */
export function clockOf(minutesAgo: number) {
  const base = 14 * 60 + 8 // 14:08 demo epoch
  const t = ((base - minutesAgo) % (24 * 60) + 24 * 60) % (24 * 60)
  return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`
}

export const PRIORITY_TONE: Record<Priority, "accent" | "muted" | "destructive"> = {
  Flash: "destructive",
  Priority: "accent",
  Routine: "muted",
}
