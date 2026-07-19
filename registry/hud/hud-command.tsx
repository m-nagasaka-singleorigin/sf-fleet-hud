"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { cn } from "@/lib/utils"
import {
  HudDialog,
  HudDialogContent,
  HudDialogDescription,
  HudDialogTitle,
} from "@/registry/hud/hud-dialog"

function HudCommand({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      className={cn(
        "relative flex w-full flex-col overflow-hidden border border-[#3A3E42] bg-popover shadow-[0_24px_48px_rgba(0,0,0,0.7)]",
        "before:pointer-events-none before:absolute before:-top-px before:-left-px before:z-10 before:size-3 before:border-t before:border-l before:border-primary",
        className
      )}
      {...props}
    />
  )
}

function HudCommandDialog({
  title = "Command Palette",
  description = "Search for a command to run",
  children,
  ...props
}: React.ComponentProps<typeof HudDialog> & { title?: string; description?: string }) {
  return (
    <HudDialog {...props}>
      <HudDialogContent className="max-w-[560px] border-none p-0 shadow-none before:hidden after:hidden">
        <HudDialogTitle className="sr-only">{title}</HudDialogTitle>
        <HudDialogDescription className="sr-only">{description}</HudDialogDescription>
        <HudCommand>{children}</HudCommand>
      </HudDialogContent>
    </HudDialog>
  )
}

function HudCommandInput({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div className="flex items-center gap-2.5 border-b border-[#1D2023] px-4 py-3">
      <span aria-hidden className="font-mono text-xs text-primary">
        &gt;
      </span>
      <CommandPrimitive.Input
        className={cn(
          "flex-1 bg-transparent font-mono text-xs tracking-[0.1em] text-foreground outline-none placeholder:text-[#4A5054]",
          className
        )}
        {...props}
      />
      <span className="border border-border px-1.5 py-0.5 font-mono text-[10px] tracking-[0.1em] text-[#4A5054]">
        ESC
      </span>
    </div>
  )
}

function HudCommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      className={cn("max-h-[320px] overflow-y-auto pt-1.5 pb-2.5", className)}
      {...props}
    />
  )
}

function HudCommandEmpty({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      className={cn(
        "px-4 py-6 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-[#4A5054]",
        className
      )}
      {...props}
    />
  )
}

function HudCommandGroup({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      className={cn(
        "[&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.2em] [&_[cmdk-group-heading]]:text-[#4A5054]",
        className
      )}
      {...props}
    />
  )
}

function HudCommandItem({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      className={cn(
        "flex cursor-pointer items-center justify-between gap-4 border-l-2 border-transparent px-4 py-2 font-mono text-[11px] tracking-[0.08em] text-[#9AA0A4] outline-none",
        "data-[selected=true]:border-primary data-[selected=true]:bg-accent data-[selected=true]:text-foreground",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function HudCommandShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("font-mono text-[10px] text-[#4A5054]", className)} {...props} />
}

function HudCommandSeparator({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator className={cn("my-1 h-px bg-[#1D2023]", className)} {...props} />
  )
}

function HudCommandFooter({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex gap-4 border-t border-[#1D2023] px-4 py-2 font-mono text-[10px] tracking-[0.1em] text-[#4A5054]",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <span>↑↓ NAVIGATE</span>
          <span>⏎ EXECUTE</span>
          <span className="ml-auto">⌘K</span>
        </>
      )}
    </div>
  )
}

export {
  HudCommand,
  HudCommandDialog,
  HudCommandInput,
  HudCommandList,
  HudCommandEmpty,
  HudCommandGroup,
  HudCommandItem,
  HudCommandShortcut,
  HudCommandSeparator,
  HudCommandFooter,
}
