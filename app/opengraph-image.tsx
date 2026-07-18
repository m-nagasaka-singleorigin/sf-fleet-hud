import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "SF Fleet HUD — dark sci-fi ops UI kit for shadcn/ui"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#0A0B0C",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            width: 60,
            height: 60,
            borderTop: "3px solid #FF7A29",
            borderLeft: "3px solid #FF7A29",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 40,
            width: 60,
            height: 60,
            borderBottom: "3px solid #FF7A29",
            borderRight: "3px solid #FF7A29",
          }}
        />
        <div
          style={{
            fontSize: 26,
            letterSpacing: 12,
            color: "#FF7A29",
            marginBottom: 18,
          }}
        >
          REGISTRY // SHADCN/UI
        </div>
        <div
          style={{
            fontSize: 110,
            fontWeight: 700,
            letterSpacing: 10,
            color: "#E8ECEE",
          }}
        >
          SF FLEET HUD
        </div>
        <div
          style={{
            marginTop: 22,
            fontSize: 28,
            letterSpacing: 4,
            color: "#7A8085",
          }}
        >
          DARK SCI-FI OPS UI KIT — MONOCHROME + ORANGE — RADIUS 0
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 52,
            display: "flex",
            gap: 10,
          }}
        >
          {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0].map((f, i) => (
            <div
              key={i}
              style={{
                width: 28,
                height: 10,
                background: f ? "#FF7A29" : "#1D2023",
              }}
            />
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
