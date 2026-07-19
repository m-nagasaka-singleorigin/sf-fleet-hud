"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const HudSheet = SheetPrimitive.Root
const HudSheetTrigger = SheetPrimitive.Trigger
const HudSheetClose = SheetPrimitive.Close
const HudSheetPortal = SheetPrimitive.Portal

function HudSheetOverlay({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-[rgba(4,5,6,0.85)]",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

const sheetVariants = cva(
  "fixed z-50 flex flex-col bg-popover data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        right:
          "inset-y-0 right-0 w-[280px] border-l border-[#3A3E42] shadow-[-16px_0_32px_rgba(0,0,0,0.5)] data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
        left: "inset-y-0 left-0 w-[280px] border-r border-[#3A3E42] shadow-[16px_0_32px_rgba(0,0,0,0.5)] data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left",
        top: "inset-x-0 top-0 border-b border-[#3A3E42] shadow-[0_16px_32px_rgba(0,0,0,0.5)] data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top",
        bottom:
          "inset-x-0 bottom-0 border-t border-[#3A3E42] shadow-[0_-16px_32px_rgba(0,0,0,0.5)] data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
      },
    },
    defaultVariants: { side: "right" },
  }
)

function HudSheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & VariantProps<typeof sheetVariants>) {
  return (
    <HudSheetPortal>
      <HudSheetOverlay />
      <SheetPrimitive.Content className={cn(sheetVariants({ side }), className)} {...props}>
        {children}
      </SheetPrimitive.Content>
    </HudSheetPortal>
  )
}

function HudSheetHeader({ className, ...props }: React.ComponentProps<"div">) {
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

function HudSheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.16em] text-primary",
        className
      )}
      {...props}
    />
  )
}

function HudSheetCloseButton({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return (
    <SheetPrimitive.Close
      className={cn(
        "cursor-pointer font-mono text-[11px] text-[#5A6065] transition-colors outline-none hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring",
        className
      )}
      {...props}
    >
      ✕<span className="sr-only">Close</span>
    </SheetPrimitive.Close>
  )
}

function HudSheetDescription({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      className={cn("font-mono text-[10px] tracking-[0.14em] text-[#5A6065]", className)}
      {...props}
    />
  )
}

function HudSheetBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-2.5 px-4 py-3.5", className)} {...props} />
}

function HudSheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("mt-auto border-t border-[#1D2023] px-4 py-3", className)} {...props} />
  )
}

export {
  HudSheet,
  HudSheetTrigger,
  HudSheetClose,
  HudSheetPortal,
  HudSheetOverlay,
  HudSheetContent,
  HudSheetHeader,
  HudSheetTitle,
  HudSheetCloseButton,
  HudSheetDescription,
  HudSheetBody,
  HudSheetFooter,
}
