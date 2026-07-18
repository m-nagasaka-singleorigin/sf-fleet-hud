"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

function HudSwitch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "inline-flex h-[18px] w-9 shrink-0 cursor-pointer items-center border bg-transparent p-[2px] outline-none transition-colors",
        "border-[#3A3E42] data-[state=checked]:border-primary",
        "focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "block size-3 bg-[#5A6065] transition-transform data-[state=checked]:translate-x-[18px] data-[state=checked]:bg-primary"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { HudSwitch }
