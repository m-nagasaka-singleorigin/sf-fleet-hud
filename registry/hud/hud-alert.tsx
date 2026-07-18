import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const hudAlertVariants = cva("flex gap-3 border px-4 py-3", {
  variants: {
    variant: {
      default: "border-primary/50 bg-primary/5",
      destructive: "border-destructive/50 bg-destructive/5",
    },
  },
  defaultVariants: { variant: "default" },
})

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
        className={cn(
          "font-mono text-xs leading-[1.4]",
          variant === "destructive" ? "text-destructive" : "text-primary"
        )}
      >
        {variant === "destructive" ? "▲" : "◆"}
      </span>
      <div className="flex-1">{children}</div>
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
