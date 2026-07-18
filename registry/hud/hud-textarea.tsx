import * as React from "react"
import { cn } from "@/lib/utils"

function HudTextarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "w-full resize-y bg-[#0F1113] px-3 pt-2.5 pb-6 font-mono text-[11px] leading-[1.6] tracking-[0.06em] text-[#C8CCCE]",
        "border border-input outline-none transition-colors placeholder:text-[#4A5054]",
        "focus:border-primary disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { HudTextarea }
