"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { cn } from "@/lib/utils"

function HudAccordion({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      className={cn("border border-border bg-[#0F1113]", className)}
      {...props}
    />
  )
}

function HudAccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn("border-b border-[#1D2023] last:border-b-0", className)}
      {...props}
    />
  )
}

function HudAccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex flex-1 cursor-pointer items-center justify-between px-4 py-3 font-sans text-sm font-normal uppercase tracking-[0.12em] text-[#8A9094] transition-colors outline-none",
          "hover:bg-[#121517] focus-visible:ring-1 focus-visible:ring-ring",
          "data-[state=open]:font-medium data-[state=open]:text-foreground data-[state=open]:hover:bg-transparent",
          className
        )}
        {...props}
      >
        {children}
        <span
          aria-hidden
          className="font-mono text-[10px] text-[#5A6065] transition-transform group-data-[state=open]:rotate-90 group-data-[state=open]:text-primary"
        >
          ▸
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function HudAccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
      {...props}
    >
      <div className={cn("flex flex-col gap-2 px-4 pb-3.5", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { HudAccordion, HudAccordionItem, HudAccordionTrigger, HudAccordionContent }
