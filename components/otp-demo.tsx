"use client"

import * as React from "react"
import {
  HudInputOTP,
  HudInputOTPGroup,
  HudInputOTPSlot,
  HudInputOTPSeparator,
} from "@/registry/hud/hud-input-otp"

export function OtpDemo() {
  const [code, setCode] = React.useState("7A4")
  return (
    <div className="flex items-center gap-2">
      <HudInputOTP maxLength={6} value={code} onChange={setCode}>
        <HudInputOTPGroup>
          <HudInputOTPSlot index={0} />
          <HudInputOTPSlot index={1} />
          <HudInputOTPSlot index={2} />
        </HudInputOTPGroup>
        <HudInputOTPSeparator />
        <HudInputOTPGroup>
          <HudInputOTPSlot index={3} />
          <HudInputOTPSlot index={4} />
          <HudInputOTPSlot index={5} />
        </HudInputOTPGroup>
      </HudInputOTP>
      <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#4A5054]">
        Expires 00:47
      </span>
    </div>
  )
}
