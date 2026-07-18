"use client"

import * as React from "react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

// HUD toast stack. Mount once (e.g. in the root layout), then call
// `toast(...)` / `toast.error(...)` from "sonner" as usual.
function HudToaster(props: ToasterProps) {
  return (
    <Sonner
      position="bottom-right"
      icons={{
        success: <span className="font-mono text-[11px] text-[#8A9094]">●</span>,
        info: <span className="font-mono text-[11px] text-primary">◆</span>,
        warning: <span className="font-mono text-[11px] text-primary">◆</span>,
        error: <span className="font-mono text-[11px] text-destructive">▲</span>,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "group flex w-[340px] items-start gap-2.5 border border-[#3A3E42] border-l-2 border-l-primary bg-popover px-3 py-2.5 shadow-[0_8px_20px_rgba(0,0,0,0.5)] data-[type=success]:border-[#26292C] data-[type=success]:border-l-[#8A9094] data-[type=error]:border-destructive/50 data-[type=error]:border-l-destructive",
          content: "flex-1",
          title:
            "font-sans text-sm font-semibold uppercase tracking-[0.08em] text-foreground group-data-[type=success]:font-medium group-data-[type=success]:text-[#C8CCCE]",
          description: "mt-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-[#6E7478]",
          actionButton:
            "ml-2 cursor-pointer font-sans text-xs font-medium uppercase tracking-[0.1em] text-primary",
          cancelButton:
            "ml-2 cursor-pointer font-mono text-[10px] text-[#4A5054] hover:text-foreground",
          closeButton: "text-[#4A5054] hover:text-foreground",
        },
      }}
      {...props}
    />
  )
}

export { HudToaster }
