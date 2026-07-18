"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { cn } from "@/lib/utils"

function HudInputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & { containerClassName?: string }) {
  return (
    <OTPInput
      containerClassName={cn("flex items-center gap-2 has-disabled:opacity-50", containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

function HudInputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex items-center gap-2", className)} {...props} />
}

function HudInputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & { index: number }) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-active={isActive}
      className={cn(
        "relative grid h-11 w-[38px] place-items-center bg-[#0F1113] font-mono text-base text-foreground",
        char ? "border border-[#3A3E42]" : "border border-border",
        isActive && "border-primary",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <span
          aria-hidden
          className="absolute h-4 w-px bg-primary motion-safe:animate-[hud-caret_1s_step-end_infinite]"
        />
      )}
      <style>{"@keyframes hud-caret{0%,100%{opacity:1}50%{opacity:0}}"}</style>
    </div>
  )
}

function HudInputOTPSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="separator"
      className={cn("h-px w-3 bg-[#4A5054]", className)}
      {...props}
    />
  )
}

export { HudInputOTP, HudInputOTPGroup, HudInputOTPSlot, HudInputOTPSeparator }
