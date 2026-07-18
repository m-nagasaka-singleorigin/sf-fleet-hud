import * as React from "react"
import { cn } from "@/lib/utils"

function HudPagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("flex items-center gap-1.5", className)}
      {...props}
    />
  )
}

function HudPaginationItem({
  className,
  active = false,
  ...props
}: React.ComponentProps<"button"> & { active?: boolean }) {
  return (
    <button
      aria-current={active ? "page" : undefined}
      className={cn(
        "grid size-[26px] cursor-pointer place-items-center font-mono text-[10px] transition-colors outline-none focus-visible:ring-1 focus-visible:ring-ring",
        active
          ? "bg-primary text-primary-foreground"
          : "border border-border text-[#8A9094] hover:border-primary hover:text-primary",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function HudPaginationPrevious(props: React.ComponentProps<typeof HudPaginationItem>) {
  return (
    <HudPaginationItem aria-label="Go to previous page" {...props}>
      ‹
    </HudPaginationItem>
  )
}

function HudPaginationNext(props: React.ComponentProps<typeof HudPaginationItem>) {
  return (
    <HudPaginationItem aria-label="Go to next page" {...props}>
      ›
    </HudPaginationItem>
  )
}

function HudPaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      className={cn("grid size-[26px] place-items-center font-mono text-[10px] text-[#4A5054]", className)}
      {...props}
    >
      …
    </span>
  )
}

export {
  HudPagination,
  HudPaginationItem,
  HudPaginationPrevious,
  HudPaginationNext,
  HudPaginationEllipsis,
}
