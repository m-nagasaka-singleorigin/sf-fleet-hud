// Demo-only fixture for the dashboard page. NOT part of the registry.

export type FleetStatus = "engaged" | "patrol" | "standby" | "critical"

export type FleetUnit = {
  id: string
  wing: string
  status: FleetStatus
  label: string
  signal: number
  ping: string
  lost: boolean
  commander: string
  vector: string
  sorties: number
  lastContact: string
  ordnance: number
  vitals: number[]
}

type UnitSeed = [id: string, wing: string, status: FleetStatus, signal: number, ping: number]

const STATUS_LABEL: Record<FleetStatus, string> = {
  engaged: "Engaged",
  patrol: "Patrol",
  standby: "Standby",
  critical: "Signal Lost",
}

const SEEDS: UnitSeed[] = [
  ["D-0117", "Nova Wing", "engaged", 92, 12],
  ["D-0142", "Kestrel Wing", "patrol", 78, 18],
  ["D-0166", "Vanta Wing", "patrol", 64, 24],
  ["D-0203", "Phoenix Wing", "critical", 8, 0],
  ["D-0219", "Aurora Wing", "standby", 85, 15],
  ["D-0244", "Nova Wing", "engaged", 88, 14],
  ["D-0261", "Kestrel Wing", "patrol", 73, 21],
  ["D-0288", "Halcyon Wing", "standby", 81, 17],
  ["D-0301", "Vanta Wing", "engaged", 95, 11],
  ["D-0327", "Aurora Wing", "patrol", 69, 26],
  ["D-0344", "Phoenix Wing", "standby", 77, 19],
  ["D-0362", "Halcyon Wing", "engaged", 90, 13],
  ["D-0388", "Nova Wing", "patrol", 66, 28],
  ["D-0401", "Kestrel Wing", "standby", 83, 16],
  ["D-0422", "Vanta Wing", "patrol", 71, 23],
  ["D-0447", "Aurora Wing", "engaged", 94, 12],
  ["D-0468", "Halcyon Wing", "patrol", 62, 31],
  ["D-0491", "Phoenix Wing", "standby", 79, 20],
]

const COMMANDERS = [
  "K. Hale",
  "R. Voss",
  "A. Drake",
  "M. Sato",
  "P. Novak",
  "E. Lindholm",
  "D. Nair",
  "T. Silva",
]

// Deterministic so the demo renders identically on server and client.
function vitalsFor(seed: number, signal: number) {
  return Array.from({ length: 14 }, (_, i) =>
    Math.round(signal + 6 * Math.sin(i * 0.9 + seed * 1.3) + 3 * Math.cos(i * 2.2 + seed))
  )
}

export const FLEET_UNITS: FleetUnit[] = SEEDS.map(([id, wing, status, signal, ping], i) => ({
  id,
  wing,
  status,
  label: STATUS_LABEL[status],
  signal,
  ping: status === "critical" ? "——" : `${ping}MS`,
  lost: status === "critical",
  commander: COMMANDERS[i % COMMANDERS.length],
  vector: `${(180 + i * 7) % 360}.${String(10 + ((i * 13) % 89)).padStart(3, "0")}`,
  sorties: 18 + ((i * 17) % 46),
  lastContact: `14:${String(2 + ((i * 5) % 57)).padStart(2, "0")}:${String((i * 11) % 60).padStart(2, "0")} UTC`,
  ordnance: status === "critical" ? 12 : 35 + ((i * 23) % 61),
  vitals: vitalsFor(i, signal),
}))

export type FleetEvent = {
  time: string
  unit: string
  event: string
  tone: "accent" | "muted" | "destructive"
}

export const FLEET_EVENTS: FleetEvent[] = [
  { time: "14:02:11", unit: "D-0117", event: "Weapons free authorized — grid D2", tone: "accent" },
  { time: "14:01:30", unit: "D-0203", event: "Telemetry dropout — auto-retry scheduled", tone: "destructive" },
  { time: "13:59:12", unit: "D-0301", event: "Sensor sweep complete — 27 contacts", tone: "muted" },
  { time: "13:54:48", unit: "D-0244", event: "Intercept vector accepted", tone: "accent" },
  { time: "13:50:03", unit: "D-0142", event: "Patrol handover — rotation 04", tone: "muted" },
  { time: "13:44:37", unit: "D-0447", event: "Resupply docking confirmed", tone: "muted" },
  { time: "13:38:20", unit: "D-0362", event: "Threat index elevated 0.21 → 0.34", tone: "accent" },
  { time: "13:31:55", unit: "D-0288", event: "Standby watch assumed", tone: "muted" },
]
