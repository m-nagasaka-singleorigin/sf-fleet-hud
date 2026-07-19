"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"

function HudTooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />
}

// Self-providing root: usable standalone, shows instantly on hover.
function HudTooltip(props: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <HudTooltipProvider>
      <TooltipPrimitive.Root {...props} />
    </HudTooltipProvider>
  )
}

const HudTooltipTrigger = TooltipPrimitive.Trigger

function HudTooltipContent({
  className,
  sideOffset = 6,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={sideOffset}
        className={cn(
          "z-50 border border-[#3A3E42] bg-popover px-3 py-[7px] font-mono text-[9px] tracking-[0.12em] text-[#C8CCCE] shadow-[0_8px_16px_rgba(0,0,0,0.5)]",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="fill-popover" width={10} height={5} />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { HudTooltipProvider, HudTooltip, HudTooltipTrigger, HudTooltipContent }
