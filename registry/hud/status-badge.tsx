import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] px-2.5 py-0.5",
  {
    variants: {
      variant: {
        engaged: "bg-primary text-primary-foreground",
        priority: "border border-primary/60 text-primary",
        patrol: "border border-[#2E3236] text-[#9AA0A4]",
        standby: "border border-border text-[#5A6065]",
        critical: "border border-destructive/60 text-destructive",
        live: "border border-[#2E3236] text-[#C8CCCE]",
      },
    },
    defaultVariants: { variant: "patrol" },
  }
)

function StatusBadge({ className, variant, dot = false, children, ...props }: React.ComponentProps<"span"> & VariantProps<typeof statusBadgeVariants> & { dot?: boolean }) {
  return (
    <span className={cn(statusBadgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span
          aria-hidden
          className="size-1.5 shrink-0 rounded-full bg-current shadow-[0_0_6px_currentColor] motion-safe:animate-[hud-blink_1.6s_ease-in-out_infinite]"
        />
      )}
      {children}
      <style>{"@keyframes hud-blink{0%,100%{opacity:1}50%{opacity:.15}}"}</style>
    </span>
  )
}

export { StatusBadge, statusBadgeVariants }
