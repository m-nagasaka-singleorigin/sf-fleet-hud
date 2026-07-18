import * as React from "react"
import { cn } from "@/lib/utils"

function HudKbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "inline-block border border-[#3A3E42] border-b-2 bg-[#101214] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-[#C8CCCE]",
        className
      )}
      {...props}
    />
  )
}

export { HudKbd }
