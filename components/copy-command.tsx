"use client"

import * as React from "react"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://sf-fleet-hud.vercel.app"

export function CopyCommand({ name }: { name: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <button
      type="button"
      title="Copy install command"
      onClick={() => {
        navigator.clipboard.writeText(`npx shadcn@latest add ${BASE_URL}/r/${name}.json`)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.16em] text-[#5A6065] transition-colors outline-none hover:text-primary focus-visible:text-primary"
    >
      {copied ? "Copied ◆" : `npx shadcn add ${name}`}
    </button>
  )
}
