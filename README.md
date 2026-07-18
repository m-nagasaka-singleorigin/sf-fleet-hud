# SF Fleet HUD

> **Work in progress** — not yet published.

A dark sci-fi fleet-ops UI kit for [shadcn/ui](https://ui.shadcn.com), distributed as a custom registry. Monochrome + orange accent, radius 0, condensed sans + terminal mono.

## Install (once published)

```bash
# Theme
npx shadcn@latest add https://sf-fleet-hud.vercel.app/r/theme-hud.json

# Components
npx shadcn@latest add https://sf-fleet-hud.vercel.app/r/hud-button.json
```

## Development

```bash
pnpm install
pnpm dev              # demo catalog at localhost:3000
pnpm registry:build   # emit public/r/*.json
bash scripts/check-ip.sh   # content guard (also runs as pre-commit + CI)
```

After cloning, enable the commit guard once:

```bash
git config core.hooksPath .githooks
```

## License

MIT. Fonts (Saira Condensed, Share Tech Mono) are served via Google Fonts under the SIL Open Font License.
