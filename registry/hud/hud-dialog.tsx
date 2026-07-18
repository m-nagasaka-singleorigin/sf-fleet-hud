"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"

const HudDialog = DialogPrimitive.Root
const HudDialogTrigger = DialogPrimitive.Trigger
const HudDialogPortal = DialogPrimitive.Portal
const HudDialogClose = DialogPrimitive.Close

function HudDialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-[rgba(4,5,6,0.85)]",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function HudDialogContent({ className, children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <HudDialogPortal>
      <HudDialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed top-1/2 left-1/2 z-50 w-full max-w-[380px] -translate-x-1/2 -translate-y-1/2 border border-[#3A3E42] bg-popover shadow-[0_24px_48px_rgba(0,0,0,0.7)]",
          "before:pointer-events-none before:absolute before:-top-px before:-left-px before:size-3 before:border-t before:border-l before:border-primary",
          "after:pointer-events-none after:absolute after:-bottom-px after:-right-px after:size-3 after:border-b after:border-r after:border-primary",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </HudDialogPortal>
  )
}

function HudDialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-[#1D2023] px-4 py-3",
        className
      )}
      {...props}
    />
  )
}

function HudDialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn(
        "font-sans text-base font-semibold uppercase tracking-[0.12em] text-foreground",
        className
      )}
      {...props}
    />
  )
}

function HudDialogCloseButton({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return (
    <DialogPrimitive.Close
      className={cn(
        "cursor-pointer font-mono text-[11px] text-[#5A6065] transition-colors outline-none hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring",
        className
      )}
      {...props}
    >
      ✕<span className="sr-only">Close</span>
    </DialogPrimitive.Close>
  )
}

function HudDialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn(
        "font-sans text-sm leading-normal tracking-[0.05em] text-[#9AA0A4]",
        className
      )}
      {...props}
    />
  )
}

function HudDialogBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("p-4", className)} {...props} />
}

function HudDialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-2 border-t border-[#1D2023] px-4 py-3",
        className
      )}
      {...props}
    />
  )
}

export {
  HudDialog,
  HudDialogTrigger,
  HudDialogPortal,
  HudDialogClose,
  HudDialogOverlay,
  HudDialogContent,
  HudDialogHeader,
  HudDialogTitle,
  HudDialogCloseButton,
  HudDialogDescription,
  HudDialogBody,
  HudDialogFooter,
}
