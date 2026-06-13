# Design System

Issue #16 refines Project Aegis from a functional dashboard UI into a more professional mission-control platform. The design system remains global: pages should become more polished through shared tokens and primitives, not page-specific redesigns.

## Visual Principles

- Dense, calm, enterprise-grade surfaces.
- Clear hierarchy between page identity, KPIs, section panels, data tables, and supporting text.
- Subtle depth through borders, shadows, and surface contrast instead of heavy decorative effects.
- Light and dark themes should both feel intentional, not merely inverted.

## Typography

Global typography helpers live in `src/app/globals.css`.

- `type-display`: rare display use, 30px/36px, semibold.
- `type-page-title`: page titles, 24px to 26px, semibold.
- `type-section-title`: section headers, 16px/24px, semibold.
- `type-card-title`: compact card and timeline titles, 14px/20px, semibold.
- `type-body`: body copy, 14px/20px, muted foreground.
- `type-caption`: supporting metadata, 12px/16px.
- `type-micro-label`: uppercase labels, 11px, semibold, wider tracking.

Use the smallest level that communicates hierarchy. Avoid large type inside dense dashboard cards.

## Colors

Semantic tokens are defined in `src/app/globals.css` and mapped in `tailwind.config.ts`.

- Base: `background`, `foreground`, `card`, `card-foreground`.
- Surfaces: `surface`, `surface-strong`.
- Borders: `border`, `border-strong`.
- Brand/action: `primary`, `primary-foreground`.
- Supporting: `secondary`, `muted`, `muted-foreground`.
- Status: `success`, `warning`, `danger`, `info`.
- Accessibility: `focus-ring`.

Do not hardcode one-off colors when a semantic token exists. Use status tokens consistently across badges, KPI accents, alerts, progress bars, and timeline markers.

## Surfaces And Cards

Use `surface-card` for premium card containers. It provides:

- Semantic card background.
- Standard border.
- Subtle shadow.
- 200ms hover transitions.
- Stronger border and slightly elevated shadow on hover.

Use `surface-inset` for nested surfaces, chart wells, table empty states, setting notes, and small stat blocks.

Cards should generally use `rounded-md`, compact padding, and restrained depth. Avoid heavy shadows, glassmorphism, and large decorative gradients.

## KPI Cards

`MetricCard` is the signature dashboard component.

- Uses a top status accent.
- Keeps the label as a micro label.
- Makes the value the dominant visual element.
- Uses a compact status-tinted icon well.
- Keeps trend/subtitle text secondary.

KPI rows should use `app-kpi-grid` and fit in one row at `xl` where card count allows.

## Badges And Risk Pills

`StatusBadge` and `RiskPill` share the same status language:

- Tinted background.
- Semantic border.
- Strong status text.
- Small leading dot.
- Semibold caption text.

Use `success`, `warning`, `danger`, `info`, and `neutral` consistently. Do not introduce new badge colors without adding them to the semantic system.

## Buttons

Global button classes live in `globals.css`.

- `btn`: base size, typography, motion, and focus ring.
- `btn-primary`: primary command.
- `btn-secondary`: toolbar/topbar controls.
- `btn-outline`: secondary page action.
- `btn-ghost`: low-emphasis action.
- `btn-icon`: square icon-only button.

Buttons use 150ms to 250ms transitions and visible focus rings. Prefer existing button classes over custom per-component button styling.

## Tables

`DataTable` is the default enterprise table primitive.

- Uses a premium card container.
- Keeps the header sticky.
- Uses `surface-strong` for the header.
- Uses micro labels for column names.
- Adds row hover states.
- Keeps internal scrolling with viewport-aware max height.

Tables are allowed to scroll internally; normal dashboard pages should avoid whole-page scrolling when the table is the long region.

## Timeline

`TimelineItem` uses a compact left rail, status-tinted marker, strong title, muted timestamp, and body copy. Timelines should remain scan-first and avoid oversized markers or animated sequencing.

## Motion

Allowed motion:

- Hover color transitions.
- Border and shadow transitions.
- Small icon/card lift states.
- Progress width transition.

Standards:

- Duration: 150ms to 250ms.
- No parallax.
- No large entrance animations.
- No attention-seeking effects.

## Spacing

Issue #15 density helpers remain the layout baseline:

- `app-page-stack`: page sections.
- `app-section-grid`: major grids.
- `app-column-stack`: stacked cards.
- `app-kpi-grid`: KPI rows.
- `app-scroll-region`: long internal regions.

Component padding should stay compact: 16px to 20px for section cards, 14px to 16px for metric cards, and 12px to 16px for inset panels.

## Component Audit

Issue #16 improved:

- `MetricCard`
- `StatusBadge`
- `RiskPill`
- `AlertCard`
- `ScenarioCard`
- `AgentCard`
- `TimelineItem`
- `DataTable`
- `SectionCard`
- `PageHeader`
- `MapPlaceholder`
- `ChartCard`
- `EmptyState`
- `ProgressBar`
- shared topbar/settings/action button styling

Issue #16 Complete.
