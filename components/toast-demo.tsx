"use client"

import * as React from "react"
import { toast } from "sonner"
import { HudButton } from "@/registry/hud/hud-button"

export function ToastDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <HudButton
        variant="outline"
        size="sm"
        onClick={() =>
          toast.info("Order Transmitted", {
            description: "WING 09 → GRID D2 // ACK 12MS",
          })
        }
      >
        Directive Toast
      </HudButton>
      <HudButton
        variant="outline"
        size="sm"
        onClick={() =>
          toast.success("Sync Complete", { description: "REGISTRY 214/214" })
        }
      >
        Neutral Toast
      </HudButton>
      <HudButton
        variant="outline"
        size="sm"
        onClick={() =>
          toast.error("Relay Timeout", {
            description: "COMMS RELAY 3 — RETRY 2/3",
            action: { label: "Retry", onClick: () => {} },
          })
        }
      >
        Critical Toast
      </HudButton>
    </div>
  )
}
