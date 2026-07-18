"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { cn } from "@/lib/utils"

function HudCheckbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "grid size-[15px] shrink-0 cursor-pointer place-items-center border bg-transparent outline-none transition-colors",
        "border-[#3A3E42] data-[state=checked]:border-primary",
        "focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="block size-[7px] bg-primary" />
    </CheckboxPrimitive.Root>
  )
}

export { HudCheckbox }
