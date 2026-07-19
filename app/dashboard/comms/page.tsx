import type { Metadata } from "next"
import { ConsoleShell } from "@/components/dashboard/console-shell"
import { CommsLog } from "@/components/dashboard/comms-log"

export const metadata: Metadata = {
  title: "SF FLEET HUD — Comms Log",
}

export default function CommsPage() {
  return (
    <ConsoleShell active="05" title="Comms Log" meta="Sector 7 // Rotation 04">
      <CommsLog />
    </ConsoleShell>
  )
}
