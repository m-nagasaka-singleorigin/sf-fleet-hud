import type { Metadata } from "next"
import { ConsoleShell } from "@/components/dashboard/console-shell"
import { SettingsPanel } from "@/components/dashboard/settings-panel"

export const metadata: Metadata = {
  title: "SF FLEET HUD — Settings",
}

export default function SettingsPage() {
  return (
    <ConsoleShell active="06" title="Settings" meta="Console Local">
      <SettingsPanel />
    </ConsoleShell>
  )
}
