import * as React from "react"
import { cn } from "@/lib/utils"

function HudBreadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" className={cn("", className)} {...props} />
}

function HudBreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol className={cn("flex flex-wrap items-center gap-2", className)} {...props} />
  )
}

function HudBreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn("inline-flex items-center", className)} {...props} />
}

function HudBreadcrumbLink({ className, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.1em] text-[#8A9094] transition-colors hover:text-primary",
        className
      )}
      {...props}
    />
  )
}

function HudBreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-mono text-[10px] uppercase tracking-[0.1em] text-primary", className)}
      {...props}
    />
  )
}

function HudBreadcrumbSeparator({ className, children, ...props }: React.ComponentProps<"li">) {
  return (
    <li role="presentation" aria-hidden className={cn("font-mono text-[10px] text-[#4A5054]", className)} {...props}>
      {children ?? "▸"}
    </li>
  )
}

export {
  HudBreadcrumb,
  HudBreadcrumbList,
  HudBreadcrumbItem,
  HudBreadcrumbLink,
  HudBreadcrumbPage,
  HudBreadcrumbSeparator,
}
