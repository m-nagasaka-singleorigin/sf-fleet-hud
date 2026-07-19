// Demo-only fixture for the Sector Map screen. NOT part of the registry.
import { FLEET_UNITS } from "@/app/dashboard/fleet-data"

export type ContactKind = "friendly" | "hostile" | "station"

export type Contact = {
  id: string
  kind: ContactKind
  /** Bearing in degrees at t=0: 0 = north, clockwise. */
  bearing: number
  /** Range from the scope centre, 0–1. */
  range: number
  /** Degrees of bearing drift per minute; stations do not move. */
  drift: number
  altitude: string
  speed: string
  label: string
}

const HOSTILE_SEEDS: [string, number, number, number][] = [
  ["X-118", 34, 0.72, -1.9],
  ["X-204", 152, 0.61, 2.4],
  ["X-233", 268, 0.83, -1.2],
  ["X-291", 311, 0.47, 3.1],
]

const STATION_SEEDS: [string, number, number][] = [
  ["GS-DELTA", 78, 0.34],
  ["GS-MERIDIAN", 196, 0.55],
  ["GS-HALO", 299, 0.24],
]

// Friendlies come from the fleet roster so the two screens agree on unit ids.
const friendlies: Contact[] = FLEET_UNITS.map((u, i) => ({
  id: u.id,
  kind: "friendly" as const,
  bearing: (i * 47 + 12) % 360,
  range: 0.24 + ((i * 13) % 60) / 100,
  drift: ((i % 5) - 2) * 1.4,
  altitude: `${8 + ((i * 7) % 22)}.${(i * 3) % 10}K M`,
  speed: `${380 + ((i * 29) % 240)} KPH`,
  label: u.wing,
}))

const hostiles: Contact[] = HOSTILE_SEEDS.map(([id, bearing, range, drift], i) => ({
  id,
  kind: "hostile" as const,
  bearing,
  range,
  drift,
  altitude: `${11 + i * 3}.${i * 2}K M`,
  speed: `${620 + i * 55} KPH`,
  label: "Unidentified",
}))

const stations: Contact[] = STATION_SEEDS.map(([id, bearing, range]) => ({
  id,
  kind: "station" as const,
  bearing,
  range,
  drift: 0,
  altitude: "SURFACE",
  speed: "——",
  label: "Ground Station",
}))

export const CONTACTS: Contact[] = [...friendlies, ...hostiles, ...stations]

/**
 * Position of a contact `minutesAgo` minutes back. Pure and deterministic so the
 * time scrub replays identically on server and client.
 */
export function positionAt(c: Contact, minutesAgo: number) {
  const bearing = (((c.bearing - c.drift * minutesAgo) % 360) + 360) % 360
  const wobble = c.kind === "station" ? 0 : Math.sin(minutesAgo * 0.21 + c.bearing) * 0.04
  return { bearing, range: Math.max(0.06, Math.min(0.95, c.range + wobble)) }
}

/** Scope geometry, shared by the radar blips and the interactive hit targets. */
export function polarToPercent(bearing: number, range: number) {
  const rad = (bearing * Math.PI) / 180
  const d = Math.max(0, Math.min(1, range)) * 50
  return { left: 50 + d * Math.sin(rad), top: 50 - d * Math.cos(rad) }
}
