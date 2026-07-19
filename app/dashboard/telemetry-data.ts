// Demo-only fixture for the Telemetry screen. NOT part of the registry.

export type SubsystemKey = "reactor" | "propulsion" | "weapons" | "life"

export type Channel = {
  id: string
  name: string
  value: number
  unit: string
  nominal: [number, number]
  trend: number[]
}

export type Subsystem = {
  key: SubsystemKey
  label: string
  /** Ring gauges across the top of the screen. */
  gauges: { label: string; value: number }[]
  /** History series for the line chart, one point per 5-minute cycle. */
  series: { name: string; values: number[] }[]
  /** Caution range for the history chart, in the same units as the series. */
  band: { from: number; to: number }
  /** Per-wing draw for the bar chart. */
  draw: { label: string; values: number[] }[]
  drawSeries: string[]
  channels: Channel[]
}

const CYCLES = 12

/** Deterministic wave so server and client renders match exactly. */
function wave(seed: number, base: number, amp: number, length = CYCLES) {
  return Array.from({ length }, (_, i) =>
    Math.round(base + amp * Math.sin(i * 0.7 + seed) + (amp / 3) * Math.cos(i * 1.9 + seed * 2))
  )
}

export const CYCLE_LABELS = Array.from({ length: CYCLES }, (_, i) =>
  `${String(i * 2).padStart(2, "0")}:00`
)

export const SUBSYSTEMS: Subsystem[] = [
  {
    key: "reactor",
    label: "Reactor",
    gauges: [
      { label: "Output", value: 76 },
      { label: "Core Temp", value: 62 },
      { label: "Coolant", value: 34 },
      { label: "Pressure", value: 81 },
      { label: "Shield Draw", value: 58 },
      { label: "Efficiency", value: 92 },
    ],
    series: [
      { name: "Output", values: wave(0.4, 74, 12) },
      { name: "Coolant", values: wave(2.1, 40, 9) },
      { name: "Core Temp", values: wave(1.2, 61, 7) },
    ],
    band: { from: 85, to: 100 },
    draw: [
      { label: "Nova", values: [42, 28] },
      { label: "Kestrel", values: [36, 31] },
      { label: "Vanta", values: [29, 18] },
      { label: "Phoenix", values: [47, 35] },
      { label: "Aurora", values: [21, 14] },
      { label: "Halcyon", values: [33, 22] },
    ],
    drawSeries: ["Allocated", "Drawn"],
    channels: [
      { id: "RX-01", name: "Primary Coil", value: 76.4, unit: "%", nominal: [60, 85], trend: wave(0.4, 74, 12) },
      { id: "RX-02", name: "Secondary Coil", value: 71.2, unit: "%", nominal: [60, 85], trend: wave(0.9, 70, 10) },
      { id: "RX-03", name: "Core Temperature", value: 618, unit: "K", nominal: [520, 700], trend: wave(1.2, 610, 40) },
      { id: "RX-04", name: "Coolant Reserve", value: 34.1, unit: "%", nominal: [40, 100], trend: wave(2.1, 40, 9) },
      { id: "RX-05", name: "Containment Field", value: 99.2, unit: "%", nominal: [95, 100], trend: wave(3.0, 99, 1) },
      { id: "RX-06", name: "Neutron Flux", value: 12.8, unit: "kN", nominal: [8, 20], trend: wave(1.7, 13, 3) },
    ],
  },
  {
    key: "propulsion",
    label: "Propulsion",
    gauges: [
      { label: "Thrust", value: 68 },
      { label: "Burn Rate", value: 44 },
      { label: "Nozzle Temp", value: 71 },
      { label: "Vector Trim", value: 88 },
      { label: "Fuel", value: 52 },
      { label: "Ignition", value: 97 },
    ],
    series: [
      { name: "Thrust", values: wave(0.2, 66, 14) },
      { name: "Fuel", values: wave(1.5, 55, 11) },
      { name: "Nozzle Temp", values: wave(2.6, 70, 8) },
    ],
    band: { from: 0, to: 30 },
    draw: [
      { label: "Nova", values: [51, 40] },
      { label: "Kestrel", values: [44, 39] },
      { label: "Vanta", values: [38, 26] },
      { label: "Phoenix", values: [55, 47] },
      { label: "Aurora", values: [30, 21] },
      { label: "Halcyon", values: [41, 30] },
    ],
    drawSeries: ["Capacity", "Consumed"],
    channels: [
      { id: "PR-01", name: "Main Thrust", value: 68.0, unit: "%", nominal: [40, 90], trend: wave(0.2, 66, 14) },
      { id: "PR-02", name: "Manoeuvre Jets", value: 41.5, unit: "%", nominal: [20, 70], trend: wave(1.1, 42, 8) },
      { id: "PR-03", name: "Nozzle Temperature", value: 1180, unit: "K", nominal: [900, 1400], trend: wave(2.6, 1180, 90) },
      { id: "PR-04", name: "Fuel Reserve", value: 52.3, unit: "%", nominal: [25, 100], trend: wave(1.5, 55, 11) },
      { id: "PR-05", name: "Vector Trim", value: 88.1, unit: "%", nominal: [80, 100], trend: wave(0.7, 88, 4) },
      { id: "PR-06", name: "Ignition Charge", value: 97.4, unit: "%", nominal: [90, 100], trend: wave(3.3, 97, 2) },
    ],
  },
  {
    key: "weapons",
    label: "Weapons",
    gauges: [
      { label: "Array", value: 41 },
      { label: "Capacitor", value: 63 },
      { label: "Ordnance", value: 47 },
      { label: "Targeting", value: 84 },
      { label: "Cooling", value: 29 },
      { label: "Safeties", value: 100 },
    ],
    series: [
      { name: "Capacitor", values: wave(1.9, 62, 16) },
      { name: "Cooling", values: wave(0.6, 33, 10) },
      { name: "Array Load", values: wave(2.8, 44, 12) },
    ],
    band: { from: 0, to: 30 },
    draw: [
      { label: "Nova", values: [18, 12] },
      { label: "Kestrel", values: [22, 15] },
      { label: "Vanta", values: [14, 9] },
      { label: "Phoenix", values: [31, 26] },
      { label: "Aurora", values: [11, 6] },
      { label: "Halcyon", values: [19, 13] },
    ],
    drawSeries: ["Loadout", "Expended"],
    channels: [
      { id: "WP-01", name: "Forward Array", value: 41.2, unit: "%", nominal: [50, 100], trend: wave(2.8, 44, 12) },
      { id: "WP-02", name: "Capacitor Bank", value: 63.4, unit: "%", nominal: [40, 100], trend: wave(1.9, 62, 16) },
      { id: "WP-03", name: "Ordnance Stores", value: 47.0, unit: "%", nominal: [30, 100], trend: wave(0.3, 47, 7) },
      { id: "WP-04", name: "Targeting Lock", value: 84.6, unit: "%", nominal: [70, 100], trend: wave(1.4, 84, 6) },
      { id: "WP-05", name: "Barrel Cooling", value: 29.3, unit: "%", nominal: [35, 100], trend: wave(0.6, 33, 10) },
      { id: "WP-06", name: "Safety Interlock", value: 100, unit: "%", nominal: [100, 100], trend: wave(0, 100, 0) },
    ],
  },
  {
    key: "life",
    label: "Life Support",
    gauges: [
      { label: "Atmosphere", value: 98 },
      { label: "Scrubbers", value: 91 },
      { label: "Water", value: 73 },
      { label: "Thermal", value: 66 },
      { label: "Pressure", value: 95 },
      { label: "Reserve", value: 88 },
    ],
    series: [
      { name: "Atmosphere", values: wave(0.1, 97, 3) },
      { name: "Water", values: wave(1.8, 74, 8) },
      { name: "Thermal", values: wave(2.4, 66, 6) },
    ],
    band: { from: 0, to: 60 },
    draw: [
      { label: "Deck 1", values: [24, 19] },
      { label: "Deck 2", values: [31, 27] },
      { label: "Deck 3", values: [28, 20] },
      { label: "Deck 4", values: [19, 13] },
      { label: "Deck 5", values: [22, 17] },
      { label: "Hangar", values: [35, 29] },
    ],
    drawSeries: ["Supplied", "Consumed"],
    channels: [
      { id: "LS-01", name: "Atmosphere Mix", value: 98.1, unit: "%", nominal: [95, 100], trend: wave(0.1, 97, 3) },
      { id: "LS-02", name: "CO₂ Scrubbers", value: 91.4, unit: "%", nominal: [85, 100], trend: wave(0.8, 91, 4) },
      { id: "LS-03", name: "Water Recovery", value: 73.2, unit: "%", nominal: [60, 100], trend: wave(1.8, 74, 8) },
      { id: "LS-04", name: "Thermal Loop", value: 66.0, unit: "%", nominal: [50, 85], trend: wave(2.4, 66, 6) },
      { id: "LS-05", name: "Cabin Pressure", value: 95.3, unit: "kPa", nominal: [90, 105], trend: wave(3.1, 95, 3) },
      { id: "LS-06", name: "Emergency Reserve", value: 88.0, unit: "%", nominal: [75, 100], trend: wave(0.5, 88, 5) },
    ],
  },
]

/** A channel is out of spec when it falls outside its nominal window. */
export function isOutOfSpec(c: Channel) {
  return c.value < c.nominal[0] || c.value > c.nominal[1]
}
