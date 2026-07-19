import * as React from "react"
import { cn } from "@/lib/utils"
import {
  HudAvatar,
  HudAvatarFallback,
  HudAvatarImage,
  HudAvatarRank,
  HudAvatarStatus,
} from "@/registry/hud/hud-avatar"
import { StatusBadge } from "@/registry/hud/status-badge"
import { TelemetryBar } from "@/registry/hud/telemetry-bar"
import { HudSparkline } from "@/registry/hud/hud-sparkline"

type CrewStatus = "active" | "engaged" | "standby" | "critical" | "offline"

type CrewMember = {
  /** Service ID rendered in the meta row, e.g. "ID-00417". */
  id: string
  /** Display name. Rendered uppercase; "SURNAME, GIVEN" reads best. */
  name: string
  /** Callsign, shown quoted under the name. */
  callsign?: string
  /** Rank label, e.g. "LT. CMDR". */
  rank?: string
  /** Rank tick bars under the photo, 0–5. */
  rankTicks?: number
  /** Assignment line, e.g. "OPS / NAV". */
  unit?: string
  status?: CrewStatus
  /** Portrait URL. Falls back to initials when absent or on load failure. */
  photo?: string
  /** Vitals sparkline series. Hidden when omitted. */
  vitals?: number[]
  /** Duty load 0–100. Hidden when omitted. */
  duty?: number
}

// Crew status drives both the badge treatment and the avatar corner dot.
const STATUS_MAP: Record<
  CrewStatus,
  { label: string; badge: React.ComponentProps<typeof StatusBadge>["variant"]; dot: string }
> = {
  active: { label: "Active", badge: "live", dot: "bg-primary" },
  engaged: { label: "Engaged", badge: "engaged", dot: "bg-primary" },
  standby: { label: "Standby", badge: "standby", dot: "bg-[#5A6065]" },
  critical: { label: "Critical", badge: "critical", dot: "bg-destructive" },
  offline: { label: "Offline", badge: "patrol", dot: "bg-[#3A3E42]" },
}

// Derives up to two initials for the photo-less fallback.
function initialsOf(name: string) {
  const parts = name.replace(/,/g, " ").split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "??"
  if (parts.length === 1) return parts[0].slice(0, 2)
  return parts[0][0] + parts[1][0]
}

function CrewCard({
  className,
  crew,
  showTelemetry = true,
  ...props
}: Omit<React.ComponentProps<"article">, "children"> & {
  crew: CrewMember
  showTelemetry?: boolean
}) {
  const status = STATUS_MAP[crew.status ?? "active"]
  const hasTelemetry = showTelemetry && (crew.vitals?.length || crew.duty != null)

  return (
    <article
      className={cn("relative border border-border bg-card", className)}
      {...props}
    >
      <div className="flex items-start gap-3.5 px-4 py-3.5">
        <HudAvatar className="size-16" variant="strong">
          {crew.photo && <HudAvatarImage src={crew.photo} alt="" />}
          <HudAvatarFallback className="text-[15px] tracking-[0.05em]">
            {initialsOf(crew.name)}
          </HudAvatarFallback>
          <HudAvatarStatus className={status.dot} />
          {crew.rankTicks ? <HudAvatarRank count={crew.rankTicks} /> : null}
        </HudAvatar>

        <div className="min-w-0 flex-1">
          <h3 className="m-0 truncate font-sans text-[15px] font-medium uppercase tracking-[0.12em] text-foreground">
            {crew.name}
          </h3>
          {crew.callsign && (
            <p className="mt-0.5 truncate font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
              &ldquo;{crew.callsign}&rdquo;
            </p>
          )}
          {crew.rank && (
            <p className="mt-1.5 truncate font-mono text-[10px] uppercase tracking-[0.16em] text-[#9AA0A4]">
              {crew.rank}
            </p>
          )}
          {crew.unit && (
            <p className="mt-0.5 truncate font-mono text-[10px] uppercase tracking-[0.16em] text-[#5A6065]">
              {crew.unit}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-[#1D2023] px-4 py-2.5">
        <StatusBadge variant={status.badge} dot={crew.status === "critical"}>
          {status.label}
        </StatusBadge>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5A6065]">
          {crew.id}
        </span>
      </div>

      {hasTelemetry ? (
        <div className="flex flex-col gap-2.5 border-t border-[#1D2023] px-4 py-3">
          {crew.vitals?.length ? (
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6E7478]">
                Vitals
              </span>
              <HudSparkline
                className="text-[#8A9094]"
                values={crew.vitals}
                width={110}
                height={20}
              />
            </div>
          ) : null}
          {crew.duty != null && (
            <TelemetryBar label="Duty Load" value={crew.duty} warn={crew.duty >= 85} />
          )}
        </div>
      ) : null}
    </article>
  )
}

export { CrewCard, type CrewMember, type CrewStatus }
