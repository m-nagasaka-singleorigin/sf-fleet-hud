import * as React from "react"
import { cn } from "@/lib/utils"

function HudStepper({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex items-center", className)} {...props} />
}

function HudStep({
  className,
  state = "todo",
  index,
  label,
  ...props
}: React.ComponentProps<"div"> & {
  state?: "done" | "active" | "todo"
  index: number
  label: React.ReactNode
}) {
  return (
    <div
      aria-current={state === "active" ? "step" : undefined}
      className={cn("flex flex-col items-center gap-1.5", className)}
      {...props}
    >
      <span
        className={cn(
          "grid size-[26px] place-items-center font-mono text-[11px]",
          state === "done" && "bg-primary text-primary-foreground",
          state === "active" && "border border-primary text-primary",
          state === "todo" && "border border-border text-[#4A5054]"
        )}
      >
        {state === "done" ? "✓" : index}
      </span>
      <span
        className={cn(
          "font-mono text-[10px] uppercase tracking-[0.12em]",
          state === "active" ? "text-primary" : state === "done" ? "text-[#8A9094]" : "text-[#4A5054]"
        )}
      >
        {label}
      </span>
    </div>
  )
}

// Connector between steps; `reached` colors it with the accent.
function HudStepSeparator({
  className,
  reached = false,
  ...props
}: React.ComponentProps<"span"> & { reached?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn("mx-2 mb-[18px] h-px flex-1", reached ? "bg-primary" : "bg-border", className)}
      {...props}
    />
  )
}

export { HudStepper, HudStep, HudStepSeparator }
