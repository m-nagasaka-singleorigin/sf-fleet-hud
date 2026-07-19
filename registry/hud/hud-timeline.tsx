import * as React from "react"
import { cn } from "@/lib/utils"

function HudTimeline({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col", className)} {...props} />
}

function HudTimelineItem({
  className,
  variant = "muted",
  last = false,
  time,
  title,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  variant?: "accent" | "destructive" | "muted"
  last?: boolean
  time?: string
  title: React.ReactNode
}) {
  return (
    <div className={cn("flex gap-3.5", className)} {...props}>
      <div className="flex flex-col items-center">
        <span
          aria-hidden
          className={cn(
            "mt-1 size-[9px] shrink-0 rotate-45",
            variant === "accent" && "bg-primary",
            variant === "destructive" && "border border-destructive",
            variant === "muted" && "border border-[#5A6065]"
          )}
        />
        {!last && <span aria-hidden className="mt-1 w-px flex-1 bg-border" />}
      </div>
      <div className={cn(!last && "pb-4")}>
        <div className="flex items-baseline gap-2.5">
          {time && <span className="font-mono text-[10px] text-[#5A6065]">{time}</span>}
          <span
            className={cn(
              "font-sans text-[15px] tracking-[0.08em] uppercase",
              variant === "accent" && "font-semibold text-foreground",
              variant === "destructive" && "font-semibold text-destructive",
              variant === "muted" && "font-medium text-[#9AA0A4]"
            )}
          >
            {title}
          </span>
        </div>
        {children && (
          <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[#6E7478]">
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

export { HudTimeline, HudTimelineItem }
