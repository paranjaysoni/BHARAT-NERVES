# Layout System

The layout system defines the global application shell for the Bharat Nerves Platform. It gives future product pages a consistent mission-control frame without adding dashboard, map, AI, backend, or simulation logic.

## AppShell Purpose

`src/components/layout/AppShell.tsx` composes the persistent application frame:

- Left sidebar
- Topbar
- Main content region

The root Next.js layout wraps all route content in `AppShell`, so future pages automatically inherit the global navigation and spacing.

Issue #15 tightened the shell for desktop density. The desktop sidebar is 220px wide, the topbar targets a compact 48px to 56px height, and the main content area uses viewport-aware height with reduced global padding.

## Sidebar Structure

`src/components/layout/Sidebar.tsx` contains:

- Project Aegis logo/icon placeholder
- `PROJECT AEGIS` product label
- `Bharat Nerves Platform` subtitle
- Primary navigation menu
- System Status card with operational status and version label

The sidebar is fixed on desktop and uses semantic theme classes such as `bg-card`, `text-card-foreground`, `border-border`, `bg-primary`, and `text-muted-foreground`.

Desktop sidebar width should stay near 220px unless navigation labels change materially. Keep logo, menu item, and footer status spacing compact.

## Topbar Structure

`src/components/layout/Topbar.tsx` contains:

- Platform label
- `National Control Room` heading
- Corridor selector placeholder
- Notification button with badge count
- Static time widget
- Theme toggle

The topbar is sticky and uses background, card, border, foreground, and muted tokens.

Topbar controls should use compact 36px control heights where possible so the bar does not consume dashboard viewport space.

## Density Classes

Shared density helpers live in `src/app/globals.css`:

- `app-page-stack`: top-level route spacing.
- `app-section-grid`: major dashboard grids.
- `app-column-stack`: stacked panels inside a column.
- `app-kpi-grid`: KPI rows.
- `app-scroll-region`: long internal panel content.

See `docs/layout-refinement.md` for the full Issue #15 density standard.

## Route List

- `/` redirects to `/control-room`
- `/control-room`
- `/scenario-simulator`
- `/trade-sentinel`
- `/ai-parliament`
- `/crisis-commander`
- `/impact-dashboard`
- `/resources`
- `/reports`
- `/settings`

Each product route currently renders a title, description, and simple placeholder card.

## Navigation Behavior

The sidebar uses `usePathname()` to highlight the active route. Navigation items use Next.js `Link` and lucide-react icons.

## Light/Dark Theme Rules

- Use semantic Tailwind tokens from the CSS variable theme system.
- Prefer `bg-background`, `text-foreground`, `bg-card`, `text-card-foreground`, `border-border`, `text-muted-foreground`, `bg-primary`, and `text-primary-foreground`.
- Do not hardcode one-theme-only colors in layout or shared components.
- Check new layout components in both light and dark mode.

## Future Improvements

- Mobile sidebar drawer
- Route-aware topbar titles
- Persisted user preferences beyond the simple theme toggle
- Breadcrumbs for deeper workflows
- User/account menu
- Notification panel
