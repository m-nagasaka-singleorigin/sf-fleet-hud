import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const hudAlertVariants = cva("flex gap-3 border px-4 py-3", {
  variants: {
    variant: {
      default: "border-primary/50 bg-primary/5",
      destructive: "border-destructive/50 bg-destructive/5",
      muted: "border-border bg-transparent",
    },
  },
  defaultVariants: { variant: "default" },
})

const GLYPH = {
  default: { mark: "◆", color: "text-primary" },
  destructive: { mark: "▲", color: "text-destructive" },
  muted: { mark: "●", color: "text-[#8A9094]" },
} as const

function HudAlert({
  className,
  variant,
  children,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof hudAlertVariants>) {
  return (
    <div role="alert" className={cn(hudAlertVariants({ variant }), className)} {...props}>
      <span
        aria-hidden
        className={cn("font-mono text-xs leading-[1.4]", GLYPH[variant ?? "default"].color)}
      >
        {GLYPH[variant ?? "default"].mark}
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}

function HudAlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "font-sans text-[15px] font-semibold uppercase tracking-[0.1em] text-foreground",
        className
      )}
      {...props}
    />
  )
}

function HudAlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mt-0.5 font-sans text-[13px] tracking-[0.05em] text-[#9AA0A4]", className)}
      {...props}
    />
  )
}

export { HudAlert, HudAlertTitle, HudAlertDescription, hudAlertVariants }
