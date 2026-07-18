"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cn } from "@/lib/utils"

function HudRadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root className={cn("grid gap-3", className)} {...props} />
}

function HudRadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "grid size-[15px] shrink-0 cursor-pointer place-items-center rounded-full border bg-transparent outline-none transition-colors",
        "border-[#3A3E42] data-[state=checked]:border-primary",
        "focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="block size-[7px] rounded-full bg-primary" />
    </RadioGroupPrimitive.Item>
  )
}

export { HudRadioGroup, HudRadioGroupItem }
