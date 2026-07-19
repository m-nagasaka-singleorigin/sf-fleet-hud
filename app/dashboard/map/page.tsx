import type { Metadata } from "next"
import { ConsoleShell } from "@/components/dashboard/console-shell"
import { SectorMap } from "@/components/dashboard/sector-map"

export const metadata: Metadata = {
  title: "SF FLEET HUD — Sector Map",
}

export default function SectorMapPage() {
  return (
    <ConsoleShell active="03" title="Sector Map" meta="Sector 7 // Rotation 04">
      <SectorMap />
    </ConsoleShell>
  )
}
