# SF Fleet HUD

A dark sci-fi fleet-ops UI kit for [shadcn/ui](https://ui.shadcn.com), distributed as a custom registry. Monochrome + orange accent, radius 0, condensed sans + terminal mono. **44 registry items**: a full set of restyled primitives plus HUD widgets you won't find in a stock kit.

**Live demo:** [sf-fleet-hud.vercel.app](https://sf-fleet-hud.vercel.app) · **Dashboard sample:** [/dashboard](https://sf-fleet-hud.vercel.app/dashboard)

![Dashboard demo](.github/screenshots/dashboard.png)

## Quick start

```bash
# 1. Theme (fonts, tokens, radius 0)
npx shadcn@latest add https://sf-fleet-hud.vercel.app/r/theme-hud.json

# 2. Any component
npx shadcn@latest add https://sf-fleet-hud.vercel.app/r/hud-button.json
npx shadcn@latest add https://sf-fleet-hud.vercel.app/r/dot-globe.json
```

Load the fonts in your app (Google Fonts, OFL-licensed): **Saira Condensed** (300–700) as `--font-sans` and **Share Tech Mono** as `--font-mono`. With Next.js, use `next/font/google` and map the variables in your CSS — see [app/layout.tsx](app/layout.tsx) and [app/globals.css](app/globals.css).

> The theme is **dark-only by design**. Radius is 0 everywhere. The minimum font size is 10px.

### Cyan accent variant

Warnings and destructive tones stay warm; everything accent-driven switches to cyan:

```bash
npx shadcn@latest add https://sf-fleet-hud.vercel.app/r/theme-hud-cyan.json
```

| Amber (default) | Cyan |
| --- | --- |
| ![Catalog](.github/screenshots/catalog.png) | ![Catalog cyan](.github/screenshots/catalog-cyan.png) |

## What's inside

**Restyled primitives** — button, label, input, textarea (live character counter), switch, checkbox, radio-group, select, tabs, alert, dialog, sheet, tooltip, sonner toaster, context-menu, command palette (cmdk), table, pagination, chip, accordion, breadcrumb, avatar, slider, popover, input-otp, calendar.

**HUD widgets** — panel (corner brackets), status-badge, telemetry-bar, segment-bar, kbd, skeleton, gauge, sparkline, heatmap, timeline, tree, dropzone, stepper, typography scale (H1–H6 + body), radar, and **dot-globe**.

### Dot Globe

An interactive dotted earth (canvas, zero runtime deps): drag to rotate with inertia, wheel to zoom, optional edge/dot glow. Pass `markers` to plot real locations — an `incident` marker gets a pulse ring and label, ready for region-outage UIs:

```tsx
<DotGlobe
  size={340}
  edgeGlow
  dotGlow
  markers={[
    { code: "us-east-1", lat: 38.9, lon: -77.4, status: "incident" },
    { code: "eu-central-1", lat: 50.1, lon: 8.7 },
  ]}
/>
```

Land dots are precomputed from Natural Earth data (public domain) and embedded — no fetches, no assets. The radar accepts polar `blips` (`{ angle, distance, hot }`) the same way.

All decorative motion respects `prefers-reduced-motion`.

## Registry

The full catalog with copyable install commands lives at [sf-fleet-hud.vercel.app](https://sf-fleet-hud.vercel.app). Every item is served from `/r/<name>.json`; cross-component dependencies resolve automatically.

## Development

```bash
pnpm install
pnpm dev              # demo catalog
pnpm registry:build   # emit public/r/*.json
```

After cloning, enable the commit guard once: `git config core.hooksPath .githooks`.

## License

MIT. Fonts are served via Google Fonts under the SIL Open Font License. Globe land-dot data derived from [Natural Earth](https://www.naturalearthdata.com/) (public domain).
