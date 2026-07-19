import * as React from "react"
import { cn } from "@/lib/utils"

function HudTable({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="relative w-full overflow-x-auto border border-border bg-[#0F1113]">
      <table className={cn("w-full caption-bottom border-collapse text-sm", className)} {...props} />
    </div>
  )
}

function HudTableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead className={cn("[&_tr]:border-b [&_tr]:border-border", className)} {...props} />
}

function HudTableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
}

function HudTableRow({ className, selected, ...props }: React.ComponentProps<"tr"> & { selected?: boolean }) {
  return (
    <tr
      data-state={selected ? "selected" : undefined}
      className={cn(
        "border-b border-[#16181B] transition-colors hover:bg-[#121517] data-[state=selected]:bg-primary/[0.04]",
        className
      )}
      {...props}
    />
  )
}

function HudTableHead({ className, sorted, children, ...props }: React.ComponentProps<"th"> & { sorted?: "asc" | "desc" | false }) {
  return (
    <th
      className={cn(
        "px-3.5 py-[9px] text-left align-middle font-mono text-[10px] font-normal uppercase tracking-[0.16em]",
        sorted ? "text-primary" : "text-[#4A5054] [&:has([role=button],button)]:cursor-pointer hover:text-[#C8CCCE]",
        className
      )}
      {...props}
    >
      <span className="inline-flex items-center gap-1.5">
        {children}
        {sorted && <span className="text-[8px]">{sorted === "asc" ? "▲" : "▼"}</span>}
      </span>
    </th>
  )
}

function HudTableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      className={cn("px-3.5 py-[9px] align-middle font-mono text-[11px] text-[#C8CCCE]", className)}
      {...props}
    />
  )
}

function HudTableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return (
    <caption
      className={cn("mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#5A6065]", className)}
      {...props}
    />
  )
}

export {
  HudTable,
  HudTableHeader,
  HudTableBody,
  HudTableRow,
  HudTableHead,
  HudTableCell,
  HudTableCaption,
}
