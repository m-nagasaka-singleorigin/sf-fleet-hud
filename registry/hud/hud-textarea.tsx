"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

function HudTextarea({
  className,
  showCount = false,
  onChange,
  ...props
}: React.ComponentProps<"textarea"> & { showCount?: boolean }) {
  const isControlled = props.value !== undefined
  const [uncontrolledCount, setUncontrolledCount] = React.useState(
    () => String(props.defaultValue ?? "").length
  )
  const count = isControlled ? String(props.value).length : uncontrolledCount

  const textarea = (
    <textarea
      className={cn(
        "w-full resize-y bg-[#0F1113] px-3 pt-2.5 font-mono text-[11px] leading-[1.6] tracking-[0.06em] text-[#C8CCCE]",
        showCount ? "pb-6" : "pb-2.5",
        "border border-input outline-none transition-colors placeholder:text-[#4A5054]",
        "focus:border-primary disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive",
        className
      )}
      onChange={(e) => {
        if (!isControlled) setUncontrolledCount(e.target.value.length)
        onChange?.(e)
      }}
      {...props}
    />
  )

  if (!showCount) return textarea

  return (
    <div className="relative w-full">
      {textarea}
      <span
        aria-hidden
        className="pointer-events-none absolute right-2.5 bottom-2.5 font-mono text-[8px] tracking-[0.1em] text-[#4A5054]"
      >
        {props.maxLength != null ? `${count} / ${props.maxLength}` : count}
      </span>
    </div>
  )
}

export { HudTextarea }
