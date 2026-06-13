# Layout Refinement

Issue #15 refines the global layout system for higher desktop density across Project Aegis. This is a shell and shared-component pass only; individual pages should not be redesigned to solve local spacing problems.

## Density Targets

- Primary desktop targets are 1440x900, 1536x960, and 1920x1080.
- Normal dashboard pages should keep critical page identity, KPIs, primary panels, and major operational context visible with significantly less page scrolling.
- Page scrolling is acceptable for long reports, tables, resource lists, and deep secondary sections.
- Dense should still read as professional: preserve hierarchy, line length, and theme contrast.

## Spacing Rules

- Use `app-page-stack` for top-level route spacing.
- Use `app-section-grid` for major dashboard grids.
- Use `app-column-stack` for stacked cards inside a column or aside.
- Use `app-kpi-grid` for KPI rows.
- Default desktop rhythm should be 20px to 24px between major sections, 16px to 20px inside columns, and 12px in KPI grids.
- Avoid ad hoc `space-y-8`, `gap-6`, and oversized page-level padding unless a page has a specific content reason.

## Card Sizing Rules

- `SectionCard` is the default panel wrapper and uses compact 16px mobile / 20px desktop padding.
- `MetricCard` is optimized for single-row desktop KPI strips with compact padding, 32px icon wells, 24px values, and uppercase 12px labels.
- `ChartCard` placeholders should prefer `min-h-48` unless the chart requires a taller fixed visual area.
- `MapPlaceholder` uses a reduced default height so map previews do not dominate the first viewport before real map tooling exists.
- Keep cards at `rounded-md` unless a component has a clear established reason for a larger radius.

## Viewport Rules

- `AppShell` reserves a 220px desktop sidebar and uses `min-h-[calc(100vh-52px)]` for main content below the compact topbar.
- Desktop topbar controls should stay near 48px to 56px total height.
- Sidebar branding, navigation, and status content should remain readable without returning to a 240px+ width.
- Use viewport-aware max heights for long regions instead of letting every list expand the page.

## Scrolling Rules

- Prefer internal scrolling for tables, alerts, activities, timelines, and long resource/report lists.
- `DataTable` has internal overflow with sticky headers and a default `maxHeight` of `calc(100vh - 22rem)`.
- `app-scroll-region` provides a reusable `calc(100vh - 18rem)` max height for long panel content.
- Do not force internal scrolling on short static content; apply it to content types that naturally grow.

## Dashboard Density Standards

- KPI rows should fit in one row at `xl` where card count allows.
- Two-column desktop dashboard grids should use side columns around 300px to 340px unless content demands more.
- Main page padding should come from `AppShell`; route components should not add extra outer padding.
- Page headers should be concise: small eyebrow, compact title, and one short description line block.
- Light and dark themes must continue to use semantic tokens such as `bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`, and `border-border`.

Issue #15 Complete.
