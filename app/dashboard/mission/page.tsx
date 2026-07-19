import type { Metadata } from "next"
import { ConsoleShell } from "@/components/dashboard/console-shell"
import { MissionPlan } from "@/components/dashboard/mission-plan"

export const metadata: Metadata = {
  title: "SF FLEET HUD — Mission Plan",
}

export default function MissionPage() {
  return (
    <ConsoleShell active="07" title="Mission Plan" meta="Rotation 05 // Draft">
      <MissionPlan />
    </ConsoleShell>
  )
}
