"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

function HudDropzone({
  className,
  title = "Drop file",
  hint,
  onFiles,
  accept,
  multiple,
  ...props
}: Omit<React.ComponentProps<"div">, "onDrop"> & {
  title?: React.ReactNode
  hint?: React.ReactNode
  onFiles?: (files: FileList) => void
  accept?: string
  multiple?: boolean
}) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = React.useState(false)
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click()
      }}
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragOver(false)
        if (e.dataTransfer.files.length) onFiles?.(e.dataTransfer.files)
      }}
      className={cn(
        "cursor-pointer border border-dashed bg-[#0D0F11] px-5 py-6 text-center transition-colors outline-none",
        dragOver ? "border-primary" : "border-[#3A3E42] hover:border-primary",
        "focus-visible:ring-1 focus-visible:ring-ring",
        className
      )}
      {...props}
    >
      <div aria-hidden className="font-mono text-sm text-primary">
        ⇪
      </div>
      <div className="mt-1.5 font-sans text-[15px] font-medium uppercase tracking-[0.1em] text-[#C8CCCE]">
        {title}
      </div>
      {hint && (
        <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#5A6065]">
          {hint}
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        onChange={(e) => {
          if (e.target.files?.length) onFiles?.(e.target.files)
        }}
      />
    </div>
  )
}

export { HudDropzone }
