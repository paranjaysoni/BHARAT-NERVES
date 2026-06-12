# Layout System

The layout system defines the global application shell for the Bharat Nerves Platform. It gives future product pages a consistent mission-control frame without adding dashboard, map, AI, backend, or simulation logic.

## AppShell Purpose

`src/components/layout/AppShell.tsx` composes the persistent application frame:

- Left sidebar
- Topbar
- Main content region

The root Next.js layout wraps all route content in `AppShell`, so future pages automatically inherit the global navigation and spacing.

## Sidebar Structure

`src/components/layout/Sidebar.tsx` contains:

- Project Aegis logo/icon placeholder
- `PROJECT AEGIS` product label
- `Bharat Nerves Platform` subtitle
- Primary navigation menu
- System Status card with operational status and version label

The sidebar is fixed on desktop and uses semantic theme classes such as `bg-card`, `text-card-foreground`, `border-border`, `bg-primary`, and `text-muted-foreground`.

## Topbar Structure

`src/components/layout/Topbar.tsx` contains:

- Platform label
- `National Control Room` heading
- Corridor selector placeholder
- Notification button with badge count
- Static time widget
- Theme toggle

The topbar is sticky and uses background, card, border, foreground, and muted tokens.

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
