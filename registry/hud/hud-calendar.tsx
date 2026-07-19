"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"

function HudCalendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("inline-block border border-border bg-[#0F1113] p-4", className)}
      classNames={{
        months: "relative flex flex-col gap-4",
        month: "flex flex-col gap-3",
        month_caption: "flex h-7 items-center justify-center",
        caption_label:
          "font-sans text-[15px] font-semibold uppercase tracking-[0.16em] text-foreground",
        nav: "absolute inset-x-0 top-0 z-10 flex h-7 items-center justify-between",
        button_previous:
          "cursor-pointer font-mono text-[10px] text-[#5A6065] transition-colors outline-none hover:text-primary",
        button_next:
          "cursor-pointer font-mono text-[10px] text-[#5A6065] transition-colors outline-none hover:text-primary",
        month_grid: "w-full border-collapse",
        weekdays: "flex gap-0.5",
        weekday: "w-8 pb-1 text-center font-mono text-[10px] uppercase text-[#4A5054]",
        week: "mt-0.5 flex gap-0.5",
        day: "p-0 text-center font-mono text-[10px] text-[#8A9094]",
        day_button:
          "size-8 cursor-pointer text-inherit outline-none transition-colors hover:bg-accent",
        today: "[&>button]:text-primary",
        selected: "bg-primary text-primary-foreground",
        range_start: "bg-primary text-primary-foreground",
        range_end: "bg-primary text-primary-foreground",
        range_middle: "bg-primary/15 text-foreground",
        outside: "text-[#3A4045]",
        disabled: "text-[#3A4045] opacity-50",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => (
          <span aria-hidden>{orientation === "left" ? "‹" : "›"}</span>
        ),
      }}
      modifiersClassNames={{
        selected: "bg-primary text-primary-foreground",
        range_middle: "bg-primary/15 text-foreground",
      }}
      {...props}
    />
  )
}

export { HudCalendar }
