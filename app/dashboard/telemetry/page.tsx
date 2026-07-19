import type { Metadata } from "next"
import { ConsoleShell } from "@/components/dashboard/console-shell"
import { TelemetryConsole } from "@/components/dashboard/telemetry-console"

export const metadata: Metadata = {
  title: "SF FLEET HUD — Telemetry",
}

export default function TelemetryPage() {
  return (
    <ConsoleShell active="04" title="Telemetry" meta="Sector 7 // Rotation 04">
      <TelemetryConsole />
    </ConsoleShell>
  )
}
