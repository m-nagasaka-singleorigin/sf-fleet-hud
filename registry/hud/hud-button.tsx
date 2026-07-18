import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const CLIP = "[clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]"

const hudButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans uppercase tracking-[0.14em] cursor-pointer transition-colors disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-1 focus-visible:ring-ring",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground font-semibold hover:bg-[#FFA05C] " + CLIP,
        secondary: "bg-secondary text-foreground font-medium hover:bg-[#33383C]",
        outline: "border border-[#3A3E42] bg-transparent text-[#C8CCCE] font-medium hover:border-primary hover:text-primary",
        ghost: "bg-transparent text-muted-foreground font-medium hover:text-foreground",
        destructive: "border border-destructive/60 bg-transparent text-destructive font-semibold hover:bg-destructive/10",
      },
      size: {
        default: "h-9 px-6 text-sm",
        sm: "h-7 px-4 text-xs",
        lg: "h-12 px-9 text-base tracking-[0.16em]",
        icon: "size-9 font-mono normal-case",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

function HudButton({ className, variant, size, ...props }: React.ComponentProps<"button"> & VariantProps<typeof hudButtonVariants>) {
  return <button className={cn(hudButtonVariants({ variant, size }), className)} {...props} />
}

export { HudButton, hudButtonVariants }
