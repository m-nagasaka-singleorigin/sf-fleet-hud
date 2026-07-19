import type { Metadata } from "next"
import { ConsoleShell } from "@/components/dashboard/console-shell"
import { UnitsBrowser } from "@/components/dashboard/units-browser"
import { FLEET_UNITS } from "@/app/dashboard/fleet-data"

export const metadata: Metadata = {
  title: "SF FLEET HUD — Units",
}

export default function UnitsPage() {
  return (
    <ConsoleShell active="02" title="Fleet Units" meta="Sector 7 // Rotation 04">
      <UnitsBrowser units={FLEET_UNITS} />
    </ConsoleShell>
  )
}
