import * as React from "react"
import { cn } from "@/lib/utils"

function HudInput({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "w-full bg-[#0F1113] px-3 py-2.5 font-mono text-xs tracking-[0.1em] text-foreground",
        "border border-input outline-none transition-colors placeholder:text-[#4A5054]",
        "focus:border-primary disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { HudInput }
