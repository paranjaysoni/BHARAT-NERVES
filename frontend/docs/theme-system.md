# Theme System

Project Aegis supports both light and dark themes because Bharat Nerves is planned as a mission-control platform that may be used in different environments, lighting conditions, and presentation contexts. Future interfaces must remain readable and usable in both modes.

## CSS Variable Strategy

Theme values are defined as semantic CSS variables in `src/app/globals.css`.

- Light theme tokens live under `:root`.
- Dark theme tokens live under `.dark`.
- Tailwind maps color utilities to these variables in `tailwind.config.ts`.
- Future theme switching can be implemented by adding or removing the `dark` class on the document root.

The variables use HSL channel values so Tailwind utilities can reference them with `hsl(var(--token-name))`.

## Theme Tokens

- `background`
- `foreground`
- `card`
- `card-foreground`
- `surface`
- `surface-strong`
- `border`
- `border-strong`
- `primary`
- `primary-foreground`
- `secondary`
- `secondary-foreground`
- `muted`
- `muted-foreground`
- `success`
- `warning`
- `danger`
- `info`
- `focus-ring`

## Theme Refinement — Implemented (Issue #16)

Issue #16 refined the light and dark palettes for a more premium mission-control feel.

- Light mode now uses a cooler operational background, stronger foreground contrast, softer card surfaces, and clearer semantic status colors.
- Dark mode now uses deeper base surfaces, less flat card contrast, stronger borders, and brighter status tokens for readability.
- `surface` and `surface-strong` support nested panels, table headers, chart wells, and premium inset regions.
- `border-strong` provides a second border tier for hover states, table headers, and selected surfaces.
- `focus-ring` standardizes visible keyboard focus across buttons, cards, switches, and interactive controls.
- Shared design classes in `globals.css` keep both themes consistent: `surface-card`, `surface-inset`, `btn`, `btn-primary`, `btn-secondary`, `btn-outline`, `btn-ghost`, and typography helpers.

## Theme Switching — Implemented (Issue #14)

Issue #14 added functional theme switching via two entry points:

**1. ThemeToggle (Topbar)**
`src/components/layout/ThemeToggle.tsx` provides a compact light/dark toggle button in the Topbar. On mount it reads `localStorage` under the key `project-aegis-theme` and applies the correct class. On click it toggles between light and dark, writes the choice to `localStorage`, and updates `document.documentElement`.

**2. AppearanceSettings (Settings page)**
`src/components/settings/AppearanceSettings.tsx` provides a three-way selector on the Settings page:
- **Light** — applies light mode and stores `"light"` in `localStorage`
- **Dark** — applies dark mode and stores `"dark"` in `localStorage`
- **System** — reads `window.matchMedia("(prefers-color-scheme: dark)")` and applies accordingly, stores `"system"`

Both components use the same key `project-aegis-theme` so they stay consistent on page reload. No React context, no theme provider, no server component hydration complexity — purely DOM + `localStorage`.

`next-themes` may be added in a future phase if hydration-safe multi-layout theme support is needed. The current approach is sufficient for the MVP single-layout architecture.

## Developer Rules

- Do not hardcode colors in components when a semantic token exists.
- Use semantic tokens such as `bg-background`, `text-foreground`, `border-border`, and `text-muted-foreground`.
- Ensure every component works in both light and dark themes.
- Add new tokens only when the existing semantic set cannot describe the UI need.
- Keep visual styling restrained, enterprise-grade, and consistent with `docs/design-system.md`.
