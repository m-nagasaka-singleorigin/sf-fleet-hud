import * as React from "react"
import { cn } from "@/lib/utils"

function HudPanel({ className, brackets = false, children, ...props }: React.ComponentProps<"div"> & { brackets?: boolean }) {
  return (
    <div className={cn("relative border border-border bg-card", className)} {...props}>
      {brackets && (
        <>
          <span aria-hidden className="pointer-events-none absolute -top-px -left-px size-2.5 border-t border-l border-primary" />
          <span aria-hidden className="pointer-events-none absolute -bottom-px -right-px size-2.5 border-b border-r border-primary" />
        </>
      )}
      {children}
    </div>
  )
}

function HudPanelHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex items-center justify-between border-b border-[#1D2023] px-4 py-3", className)} {...props} />
}

function HudPanelTitle({ className, ...props }: React.ComponentProps<"h4">) {
  return <h4 className={cn("m-0 font-sans text-[15px] font-medium uppercase tracking-[0.14em] text-[#C8CCCE]", className)} {...props} />
}

function HudPanelMeta({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("font-mono text-[10px] uppercase tracking-[0.16em] text-[#5A6065]", className)} {...props} />
}

function HudPanelContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("px-4 py-3.5", className)} {...props} />
}

function HudPanelFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex items-center justify-between border-t border-[#1D2023] px-4 py-2.5", className)} {...props} />
}

export { HudPanel, HudPanelHeader, HudPanelTitle, HudPanelMeta, HudPanelContent, HudPanelFooter }
