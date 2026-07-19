import * as React from "react"
import { cn } from "@/lib/utils"

function HudH1({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "font-sans text-[44px] leading-[1.05] font-bold uppercase tracking-[0.08em] text-foreground",
        className
      )}
      {...props}
    />
  )
}

// Optional mono index ("01", "02", …) rendered before the section title.
function HudH2({
  className,
  index,
  children,
  ...props
}: React.ComponentProps<"h2"> & { index?: string }) {
  return (
    <h2
      className={cn(
        "flex items-baseline gap-3 font-sans text-[30px] leading-[1.1] font-semibold uppercase tracking-[0.1em] text-foreground",
        className
      )}
      {...props}
    >
      {index && <span className="font-mono text-xs text-primary">{index}</span>}
      {children}
    </h2>
  )
}

function HudH3({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "font-sans text-[22px] leading-[1.15] font-semibold uppercase tracking-[0.12em] text-[#C8CCCE]",
        className
      )}
      {...props}
    />
  )
}

// Panel heading with a 10px accent tick; disable via tick={false}.
function HudH4({
  className,
  tick = true,
  children,
  ...props
}: React.ComponentProps<"h4"> & { tick?: boolean }) {
  return (
    <h4
      className={cn(
        "flex items-center gap-2.5 font-sans text-base leading-[1.2] font-medium uppercase tracking-[0.14em] text-[#C8CCCE]",
        className
      )}
      {...props}
    >
      {tick && <span aria-hidden className="h-px w-2.5 bg-primary" />}
      {children}
    </h4>
  )
}

function HudH5({ className, ...props }: React.ComponentProps<"h5">) {
  return (
    <h5
      className={cn(
        "font-mono text-[11px] leading-[1.3] font-normal uppercase tracking-[0.2em] text-primary",
        className
      )}
      {...props}
    />
  )
}

// Catalog spec is 9px; bumped to 10px for legibility.
function HudH6({ className, ...props }: React.ComponentProps<"h6">) {
  return (
    <h6
      className={cn(
        "font-mono text-[10px] leading-[1.3] font-normal uppercase tracking-[0.18em] text-[#6E7478]",
        className
      )}
      {...props}
    />
  )
}

function HudBody({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "font-sans text-[15px] leading-[1.6] font-normal tracking-[0.04em] text-[#9AA0A4]",
        className
      )}
      {...props}
    />
  )
}

export { HudH1, HudH2, HudH3, HudH4, HudH5, HudH6, HudBody }
