"use client"

import * as React from "react"

export function Clock() {
  const [now, setNow] = React.useState<Date | null>(null)

  React.useEffect(() => {
    const tick = () => setNow(new Date())
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <span className="flex items-baseline gap-6">
      <span className="font-mono text-[10px] tracking-[0.14em] text-[#5A6065]">
        {now
          ? `${now.getUTCFullYear()}.${pad(now.getUTCMonth() + 1)}.${pad(now.getUTCDate())} UTC`
          : "----.--.-- UTC"}
      </span>
      <span className="font-mono text-sm tracking-[0.12em] text-primary">
        {now ? `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}` : "--:--:--"}
      </span>
    </span>
  )
}
