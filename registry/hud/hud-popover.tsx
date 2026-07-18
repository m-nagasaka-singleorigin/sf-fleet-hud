"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "@/lib/utils"

const HudPopover = PopoverPrimitive.Root
const HudPopoverTrigger = PopoverPrimitive.Trigger
const HudPopoverAnchor = PopoverPrimitive.Anchor

function HudPopoverContent({
  className,
  align = "start",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-72 border border-[#3A3E42] bg-popover text-popover-foreground shadow-[0_12px_24px_rgba(0,0,0,0.6)] outline-none",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

export { HudPopover, HudPopoverTrigger, HudPopoverAnchor, HudPopoverContent }
