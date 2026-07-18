"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

const HudTabs = TabsPrimitive.Root

function HudTabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn("flex items-center border-b border-border", className)}
      {...props}
    />
  )
}

function HudTabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "-mb-px cursor-pointer border-b-2 border-transparent px-[18px] py-2 font-sans text-sm font-normal uppercase tracking-[0.14em] text-muted-foreground outline-none transition-colors",
        "hover:text-[#C8CCCE] focus-visible:ring-1 focus-visible:ring-ring",
        "data-[state=active]:border-primary data-[state=active]:font-medium data-[state=active]:text-foreground",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function HudTabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content className={cn("mt-4 outline-none", className)} {...props} />
}

export { HudTabs, HudTabsList, HudTabsTrigger, HudTabsContent }
