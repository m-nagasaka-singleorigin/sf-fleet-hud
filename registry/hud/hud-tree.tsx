"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

function HudTree({ className, ...props }: React.ComponentProps<"div">) {
  return <div role="tree" className={cn("font-mono", className)} {...props} />
}

function HudTreeBranch({
  className,
  label,
  defaultOpen = true,
  children,
  ...props
}: React.ComponentProps<"div"> & { label: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = React.useState(defaultOpen)
  return (
    <div role="treeitem" aria-expanded={open} className={className} {...props}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-center gap-2 py-[5px] text-left outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        <span
          aria-hidden
          className={cn("text-[8px]", open ? "text-primary" : "text-[#5A6065]")}
        >
          {open ? "▾" : "▸"}
        </span>
        <span className="text-[11px] tracking-[0.1em] uppercase text-[#C8CCCE]">{label}</span>
      </button>
      {open && (
        <div role="group" className="ml-[3px] border-l border-border pl-3.5">
          {children}
        </div>
      )}
    </div>
  )
}

function HudTreeLeaf({
  className,
  selected = false,
  children,
  ...props
}: React.ComponentProps<"button"> & { selected?: boolean }) {
  return (
    <button
      type="button"
      role="treeitem"
      aria-selected={selected}
      className={cn(
        "flex w-full cursor-pointer items-center gap-2 border-l-2 px-2 py-[5px] text-left outline-none focus-visible:ring-1 focus-visible:ring-ring",
        selected
          ? "border-primary bg-primary/[0.08]"
          : "border-transparent hover:bg-accent",
        className
      )}
      {...props}
    >
      <span aria-hidden className="text-[8px] text-[#4A5054]">
        {selected ? "◆" : "◇"}
      </span>
      <span
        className={cn(
          "text-[11px] tracking-[0.1em] uppercase",
          selected ? "text-primary" : "text-[#8A9094]"
        )}
      >
        {children}
      </span>
    </button>
  )
}

export { HudTree, HudTreeBranch, HudTreeLeaf }
