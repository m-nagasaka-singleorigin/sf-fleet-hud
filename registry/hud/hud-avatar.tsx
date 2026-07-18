"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const hudAvatarVariants = cva("relative inline-grid shrink-0 place-items-center bg-[#1A1D20] font-sans font-semibold", {
  variants: {
    size: {
      default: "size-10 text-[15px] tracking-[0.05em]",
      sm: "size-7 text-[11px]",
    },
    variant: {
      default: "border border-border text-[#8A9094]",
      strong: "border border-[#3A3E42] text-foreground",
      accent: "border border-primary text-primary",
    },
  },
  defaultVariants: { size: "default", variant: "default" },
})

function HudAvatar({
  className,
  size,
  variant,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & VariantProps<typeof hudAvatarVariants>) {
  return (
    <AvatarPrimitive.Root className={cn(hudAvatarVariants({ size, variant }), className)} {...props} />
  )
}

function HudAvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      className={cn("absolute inset-0 size-full object-cover", className)}
      {...props}
    />
  )
}

function HudAvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return <AvatarPrimitive.Fallback className={cn("uppercase", className)} {...props} />
}

// 8px square status dot pinned to the bottom-right corner.
function HudAvatarStatus({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute -right-0.5 -bottom-0.5 size-2 border border-background bg-primary",
        className
      )}
      {...props}
    />
  )
}

// Rank tick bars centered under the avatar.
function HudAvatarRank({ className, count = 3, ...props }: React.ComponentProps<"span"> & { count?: number }) {
  return (
    <span
      aria-hidden
      className={cn("absolute inset-x-0 -bottom-1.5 flex justify-center gap-0.5", className)}
      {...props}
    >
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="h-0.5 w-1.5 bg-primary" />
      ))}
    </span>
  )
}

export { HudAvatar, HudAvatarImage, HudAvatarFallback, HudAvatarStatus, HudAvatarRank }
