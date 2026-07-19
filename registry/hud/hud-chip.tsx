"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const hudChipVariants = cva(
  "inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] px-2 py-0.5 border",
  {
    variants: {
      variant: {
        default: "text-[#C8CCCE] border-[#2E3236]",
        active: "text-primary border-primary/55",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

function HudChip({
  className,
  variant,
  onRemove,
  children,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof hudChipVariants> & { onRemove?: () => void }) {
  return (
    <span className={cn(hudChipVariants({ variant }), className)} {...props}>
      {children}
      {onRemove && (
        <button
          type="button"
          aria-label="Remove"
          onClick={onRemove}
          className="cursor-pointer text-[#6E7478] transition-colors outline-none hover:text-foreground focus-visible:text-foreground"
        >
          ✕
        </button>
      )}
    </span>
  )
}

export { HudChip, hudChipVariants }
