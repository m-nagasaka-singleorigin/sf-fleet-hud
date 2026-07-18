"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { cn } from "@/lib/utils"

const HudSelect = SelectPrimitive.Root
const HudSelectGroup = SelectPrimitive.Group
const HudSelectValue = SelectPrimitive.Value

function HudSelectTrigger({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "flex w-full cursor-pointer items-center justify-between gap-3 bg-[#0F1113] px-3 py-2.5 font-mono text-xs tracking-[0.1em] text-foreground",
        "border border-input outline-none transition-colors hover:border-primary focus:border-primary",
        "disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-[#4A5054]",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <span
          aria-hidden
          className="-mt-0.5 size-1.5 shrink-0 rotate-45 border-r border-b border-primary transition-transform"
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function HudSelectContent({ className, children, position = "popper", ...props }: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position={position}
        sideOffset={4}
        className={cn(
          "z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden border border-[#3A3E42] border-t-primary bg-popover text-popover-foreground shadow-[0_16px_32px_rgba(0,0,0,0.6)]",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          className
        )}
        {...props}
      >
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function HudSelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      className={cn(
        "border-b border-[#1D2023] px-3 py-[7px] font-mono text-[8px] uppercase tracking-[0.2em] text-[#4A5054]",
        className
      )}
      {...props}
    />
  )
}

function HudSelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "flex cursor-pointer items-center gap-2.5 border-l-2 border-transparent px-3 py-[9px] font-mono text-[11px] tracking-[0.1em] text-[#9AA0A4] outline-none",
        "data-[highlighted]:border-primary data-[highlighted]:bg-accent data-[highlighted]:text-foreground",
        "data-[state=checked]:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="ml-auto font-mono text-[9px] text-primary">
        ◆
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function HudSelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return <SelectPrimitive.Separator className={cn("h-px bg-[#1D2023]", className)} {...props} />
}

export {
  HudSelect,
  HudSelectGroup,
  HudSelectValue,
  HudSelectTrigger,
  HudSelectContent,
  HudSelectLabel,
  HudSelectItem,
  HudSelectSeparator,
}
