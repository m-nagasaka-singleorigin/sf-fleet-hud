// Demo-only fixture for the catalog page. NOT part of the registry — consumers
// installing `crew-card` supply their own data (and their own portraits).
import type { CrewMember } from "@/registry/hud/crew-card"

type RosterSeed = [
  name: string,
  callsign: string,
  rank: string,
  rankTicks: number,
  unit: string,
  status: NonNullable<CrewMember["status"]>,
]

// Index order matches public/crew/crew00001–00025.jpg; names are chosen to suit
// each portrait so the catalog does not read as randomly paired.
const SEEDS: RosterSeed[] = [
  ["Aldridge, Marcus", "Vector", "Lt. Cmdr", 3, "Ops / Nav", "active"],
  ["Nair, Divya", "Ember", "Lieutenant", 2, "Sensors", "active"],
  ["Chaudhary, Rohan", "Ledger", "Lt. Cmdr", 3, "Supply", "active"],
  ["Whitfield, Grant", "Bastion", "Lt. Cmdr", 3, "Damage Ctl", "engaged"],
  ["Novak, Petra", "Ashfall", "Commander", 4, "Executive", "active"],
  ["Moreau, Céline", "Lantern", "Lieutenant", 2, "Nav / Astro", "active"],
  ["Boateng, Kwame", "Halyard", "Master Chief", 3, "Logistics", "standby"],
  ["Lindqvist, Annika", "Frost", "Lt. Cmdr", 3, "Medical", "active"],
  ["Lindholm, Erik", "Quill", "Captain", 5, "Command", "engaged"],
  ["Nakamura, Hideo", "Kite", "Lieutenant", 2, "Comms", "active"],
  ["Silva, Tomás", "Cinder", "Lieutenant", 2, "Propulsion", "active"],
  ["Tran, Mai", "Onyx", "Lt. Cmdr", 3, "Tactical", "engaged"],
  ["Sato, Ren", "Relay", "Ensign", 1, "Comms", "active"],
  ["Kowalski, Zofia", "Beacon", "Lieutenant", 2, "Science", "active"],
  ["Bergström, Nils", "Sextant", "Lieutenant", 2, "Nav / Astro", "active"],
  ["Mbeki, Thandiwe", "Cobalt", "Commander", 4, "Science", "active"],
  ["Osei, Kofi", "Anvil", "Chief Petty Off.", 2, "Engineering", "standby"],
  ["Fontaine, Jules", "Marrow", "Chief Petty Off.", 2, "Life Support", "offline"],
  ["Girma, Abel", "Current", "Ensign", 1, "Engineering", "standby"],
  ["Duarte, Rafael", "Gale", "Ensign", 1, "Flight Deck", "standby"],
  ["Ilves, Katrin", "Wick", "Lieutenant", 2, "Medical", "critical"],
  ["Zhao, Lin", "Prism", "Lieutenant", 2, "Sensors", "active"],
  ["Adeyemi, Folake", "Talon", "Lieutenant", 2, "Tactical", "engaged"],
  ["Yildirim, Emre", "Keel", "Master Chief", 3, "Hull / Structures", "active"],
  ["Nakagawa, Yuki", "Sable", "Lt. Cmdr", 3, "Flight Ops", "critical"],
]

// Deterministic so server and client render identically.
function vitalsFor(seed: number, status: CrewMember["status"]) {
  const base = status === "critical" ? 58 : status === "offline" ? 0 : 82
  const swing = status === "critical" ? 16 : 9
  return Array.from({ length: 14 }, (_, i) =>
    Math.round(base + swing * Math.sin(i * 0.8 + seed * 1.7) + 3 * Math.cos(i * 2.1 + seed))
  )
}

function dutyFor(seed: number, status: CrewMember["status"]) {
  if (status === "offline") return 0
  if (status === "critical") return 88 + (seed % 8)
  // 29 and 53 are coprime, so the sequence does not visibly repeat across 25 cards.
  return 30 + ((seed * 29) % 53)
}

export const CREW_ROSTER: CrewMember[] = SEEDS.map(
  ([name, callsign, rank, rankTicks, unit, status], i) => {
    const n = String(i + 1).padStart(5, "0")
    return {
      id: `ID-${n}`,
      name,
      callsign,
      rank,
      rankTicks,
      unit,
      status,
      photo: `/crew/crew${n}.jpg`,
      vitals: vitalsFor(i, status),
      duty: dutyFor(i, status),
    }
  }
)
