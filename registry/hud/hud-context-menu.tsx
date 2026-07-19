"use client"

import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { cn } from "@/lib/utils"

const HudContextMenu = ContextMenuPrimitive.Root
const HudContextMenuTrigger = ContextMenuPrimitive.Trigger
const HudContextMenuGroup = ContextMenuPrimitive.Group
const HudContextMenuPortal = ContextMenuPrimitive.Portal
const HudContextMenuSub = ContextMenuPrimitive.Sub

function HudContextMenuContent({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Content>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        className={cn(
          "z-50 min-w-[220px] border border-[#3A3E42] bg-popover py-1 shadow-[0_12px_24px_rgba(0,0,0,0.6)]",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0",
          className
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  )
}

function HudContextMenuItem({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & { variant?: "default" | "destructive" }) {
  return (
    <ContextMenuPrimitive.Item
      className={cn(
        "flex cursor-pointer items-center justify-between gap-4 px-3 py-[7px] font-mono text-[10px] uppercase tracking-[0.1em] outline-none",
        variant === "destructive"
          ? "text-destructive data-[highlighted]:bg-destructive/10"
          : "text-[#C8CCCE] data-[highlighted]:bg-accent",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function HudContextMenuSubTrigger({ className, children, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger>) {
  return (
    <ContextMenuPrimitive.SubTrigger
      className={cn(
        "flex cursor-pointer items-center justify-between gap-4 px-3 py-[7px] font-mono text-[10px] uppercase tracking-[0.1em] text-[#C8CCCE] outline-none data-[highlighted]:bg-accent data-[state=open]:bg-accent",
        className
      )}
      {...props}
    >
      {children}
      <span className="font-mono text-[10px] text-[#4A5054]">▸</span>
    </ContextMenuPrimitive.SubTrigger>
  )
}

function HudContextMenuSubContent({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.SubContent
        className={cn(
          "z-50 min-w-[180px] border border-[#3A3E42] bg-popover py-1 shadow-[0_12px_24px_rgba(0,0,0,0.6)]",
          className
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  )
}

function HudContextMenuLabel({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Label>) {
  return (
    <ContextMenuPrimitive.Label
      className={cn(
        "px-3 pt-2 pb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#4A5054]",
        className
      )}
      {...props}
    />
  )
}

function HudContextMenuSeparator({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return (
    <ContextMenuPrimitive.Separator className={cn("my-1 h-px bg-[#1D2023]", className)} {...props} />
  )
}

function HudContextMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span className={cn("font-mono text-[10px] normal-case text-[#4A5054]", className)} {...props} />
  )
}

export {
  HudContextMenu,
  HudContextMenuTrigger,
  HudContextMenuGroup,
  HudContextMenuPortal,
  HudContextMenuSub,
  HudContextMenuContent,
  HudContextMenuItem,
  HudContextMenuSubTrigger,
  HudContextMenuSubContent,
  HudContextMenuLabel,
  HudContextMenuSeparator,
  HudContextMenuShortcut,
}
