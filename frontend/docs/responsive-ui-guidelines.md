# Responsive UI Guidelines

## Tested Viewport Sizes

| Width | Breakpoint | Notes |
|-------|-----------|-------|
| 1440px | `xl` | Full multi-column layouts |
| 1280px | `xl` | Full multi-column layouts |
| 1024px | `lg` | 2-column collapse |
| 768px | `md/sm` | Single-column, cards wrap |

All app pages pass these widths with no overlap, clipping, or horizontal body scroll.

---

## 1. Global Layout Rules

### AppShell
- Outer wrapper: `overflow-x-hidden` to prevent body-level horizontal scroll
- Inner content area: `min-w-0` so it can safely shrink below `lg:pl-[220px]`
- `body` has `max-width: 100vw; overflow-x: hidden`

### Sidebar
- Fixed width `220px` on `lg+`, hidden on smaller widths
- Never changes width — content area shrinks around it via `lg:pl-[220px]`

### Main content
- Always `min-w-0` so flex/grid children do not force overflow
- Vertical scroll allowed; horizontal scroll blocked at body level

---

## 2. Grid Rules

### Multi-column layouts
All page-level section grids follow this pattern:
- Default: single column (stacked)
- `sm:` or `md:`: 2 columns
- `lg:`: 2–3 columns where appropriate
- `xl:`: Full desktop layout

**Never use `minmax(Npx, ...)` with a fixed minimum above ~280px** — it forces the column to that pixel width and causes overflow at 1024px+220px sidebar = 804px available.

Use `minmax(0, Nfr)` for all multi-column grids:
```html
<!-- ✅ Correct -->
<div class="grid gap-4 lg:grid-cols-2 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.9fr)]">

<!-- ❌ Wrong — forces overflow -->
<div class="grid gap-4 xl:grid-cols-[minmax(520px,1.2fr)_minmax(380px,1fr)_minmax(300px,0.9fr)]">
```

### KPI grids
```html
<div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
```
Never use `xl:grid-cols-N` without a `sm:` or `md:` fallback.

### Right-side panels / sidebars
```html
<!-- ✅ Correct: sidebar never forces width -->
<section class="grid gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(0,330px)]">
```

---

## 3. Text Wrapping Rules

- All headings in topbars: `truncate` + `min-w-0` on the container
- Long labels (corridor names, scenario names): `truncate` inside `min-w-0` wrapper
- Card titles: use `truncate` or `line-clamp-2`
- Never `whitespace-nowrap` on labels longer than ~20 chars unless inside a scrollable container

---

## 4. Map Sizing Rules

All `AegisMap` instances use responsive height classes:

| Page | heightClassName |
|------|-----------------|
| Control Room | `h-[320px] sm:h-[420px] lg:h-[480px] xl:h-[520px]` |
| Trade Sentinel | `h-[300px] sm:h-[380px] lg:h-[430px]` |
| Scenario Simulator | `h-[300px] sm:h-[360px] xl:h-[420px]` |
| Impact Dashboard | `h-[240px] sm:h-[282px]` |
| Crisis Commander | `h-full min-h-[280px]` (fills CommandPanel container) |

Rules:
- Desktop height: 360–520px
- Tablet: 320–420px
- Mobile/narrow: 280–360px
- Never use `min-h-[Npx]` alone — it will not constrain maximum height; use `h-[Npx]` or `h-full` with a parent that constrains

---

## 5. Table Overflow Rules

Tables with fixed-width columns must be wrapped:
```html
<div class="overflow-x-auto">
  <div class="min-w-[Npx]">  <!-- matches natural table width -->
    <!-- table content with grid or <table> -->
  </div>
</div>
```

Pages using this pattern:
- Reports → Report Library table (`min-w-[460px]`)
- Resources → Featured Resources table (`min-w-[600px]`)
- Impact Dashboard → Impact by State (`min-w-[340px]`)

The shared `DataTable` component already uses `overflow-auto` with `maxHeight`.

---

## 6. Topbar Rules

- Corridor selector button: `max-w-full justify-between sm:min-w-40`; label inside `<span class="truncate">`
- Clock widget: `hidden sm:block` — hidden at narrow widths
- `GlobalSimulationIndicator`: always `flex-wrap` compatible
- All topbar variants follow same pattern; `flex-wrap items-center gap-2` on the actions row

---

## 7. Theme Safety

All responsive fixes use existing CSS variables (`hsl(var(--border))`, `bg-card`, etc.) — no hardcoded colors were added. Both dark and light themes work unchanged.

---

## 8. CSS Utilities Added (globals.css)

```css
.responsive-page-grid   → grid gap-4 sm:grid-cols-2 xl:grid-cols-4
.responsive-card-grid   → grid gap-3 sm:grid-cols-2 xl:grid-cols-3
.scroll-safe-table      → overflow-x-auto (with min-w-max on child)
```

`body` also has `max-width: 100vw; overflow-x: hidden` added globally.
Map min-height reduced from 320px to 280px in `.aegis-map`.
