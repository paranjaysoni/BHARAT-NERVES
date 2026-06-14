# Project Aegis Frontend

Frontend foundation for the Bharat Nerves Platform.

Project Aegis is a self-healing digital nervous system for trade, logistics, and disaster resilience. This frontend will become the mission-control interface for digital twin simulation, scenario analysis, trade sentinel monitoring, AI Parliament, Crisis Commander, impact analysis, resources, reports, and settings.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- ESLint
- lucide-react
- clsx
- Recharts
- Leaflet
- React Leaflet
- OpenStreetMap

Digital Twin Map is implemented using Leaflet + OpenStreetMap. No paid provider or API key is required.

## Setup Commands

```bash
npm install
npm run dev
npm run lint
npm run build
```

The local development server will run from the `frontend/` directory.

## Folder Structure

```text
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx           ← Minimal root (html/body only)
│   │   ├── globals.css
│   │   ├── (public)/            ← Public landing, no AppShell
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx         ← Landing page at /
│   │   └── (app)/               ← All dashboard routes, AppShell injected
│   │       ├── layout.tsx
│   │       ├── control-room/
│   │       ├── scenario-simulator/
│   │       ├── trade-sentinel/
│   │       ├── ai-parliament/
│   │       ├── crisis-commander/
│   │       ├── impact-dashboard/
│   │       ├── resources/
│   │       ├── reports/
│   │       ├── settings/
│   │       └── loading.tsx
│   ├── components/
│   │   ├── landing/             ← Landing page sections
│   │   ├── layout/
│   │   ├── dashboard/
│   │   ├── maps/
│   │   ├── scenario/
│   │   ├── agents/
│   │   ├── commander/
│   │   ├── resources/
│   │   └── shared/
│   ├── layouts/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── data/
│   │   ├── control-room.ts
│   │   ├── scenario-simulator.ts
│   │   ├── trade.ts
│   │   ├── shipments.ts
│   │   ├── parliament.ts
│   │   ├── crisis-commander.ts
│   │   ├── impact.ts
│   │   ├── nodes.ts
│   │   ├── routes.ts
│   │   ├── scenarios.ts
│   │   ├── agents.ts
│   │   ├── metrics.ts
│   │   ├── alerts.ts
│   │   ├── reports.ts
│   │   ├── resources.ts
│   │   ├── settings.ts
│   │   ├── navigation.ts
│   │   ├── user.ts
│   │   ├── corridors.ts
│   │   ├── system-status.ts
│   │   └── index.ts
│   ├── types/
│   ├── constants/
│   ├── styles/
│   └── utils/
├── public/
├── docs/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.ts
└── README.md
```

## Theme Strategy

The frontend is prepared for both light and dark themes.

- Theme tokens are defined as CSS variables in `src/app/globals.css`.
- Tailwind colors are mapped to semantic tokens in `tailwind.config.ts`.
- Dark mode uses the Tailwind `class` strategy.
- A future issue can add a ThemeProvider and theme toggle without changing the token model.

Developers should use semantic utilities such as `bg-background`, `text-foreground`, `border-border`, and `text-muted-foreground` instead of hardcoded colors.

## Landing Page

The public-facing landing page at `/` is now live (MVP complete).

### Status: MVP Complete

The landing page uses a **Next.js App Router route group** strategy:

- `(public)/page.tsx` — resolves to `/`, no sidebar, standalone layout
- `(app)/layout.tsx` — all dashboard routes (`/control-room`, etc.) get the full AppShell

### Landing Sections

1. **LandingNavbar** — sticky, scroll-aware, mobile hamburger
2. **HeroSection** — headline + CSS dashboard mockup (ProductPreview)
3. **MetricsStrip** — 550+ nodes / 45+ agents / 120+ sources / 98.7% uptime
4. **CapabilitiesSection** — 6 platform capability cards
5. **ScenarioShowcase** — 4 scenario cards (Cyclone, Wildfire, Earthquake, Port)
6. **TrustedInstitutions** — NDRF, IMD, MoS, AICTE, NIC, ISRO grid
7. **TestimonialsSection** — 3 testimonial cards
8. **FinalCTA** — "Access Command Center" → /control-room
9. **LandingFooter** — logo, copyright, links

All landing components are in `src/components/landing/`. Full documentation at `docs/landing-page.md`.

---

## Current Status

Issue #18 complete: Scenario Simulator MVP refinement applied. Skeleton phase complete.

Implemented:

- Next.js App Router foundation
- TypeScript strict mode
- Tailwind CSS configuration
- ESLint configuration
- Light and dark CSS variable theme tokens
- Global `AppShell`
- Desktop sidebar navigation
- Topbar
- Simple theme toggle
- Placeholder pages for all primary app sections
- Shared `PageHeader`, `SectionCard`, and `StatusBadge` components
- Centralized mock data layer in `src/data`
- Strongly typed domain interfaces in `src/types`
- Navigation config moved into centralized data
- Placeholder pages consuming data imports
- Reusable shared dashboard components
- Shared component export barrel
- Internal `/component-preview` route
- National Control Room dashboard at `/control-room`
- Dashboard-specific composition components in `src/components/dashboard`
- Control Room mock data slice in `src/data/control-room.ts`
- Scenario Simulator page at `/scenario-simulator`
- Scenario-specific composition components in `src/components/scenario`
- Scenario Simulator mock data slice in `src/data/scenario-simulator.ts`
- Trade Sentinel dashboard at `/trade-sentinel`
- Trade-specific dashboard components in `src/components/dashboard`
- Trade mock data in `src/data/trade.ts`
- Shipment mock data in `src/data/shipments.ts`
- AI Parliament page at `/ai-parliament` — full MVP refinement (Issue #20): live deliberation storytelling, SVG consensus gauge, animated agent cards, decision timeline, discussion insights, key metrics, reduced table dominance
- Agent-specific composition components in `src/components/agents`
- Parliament mock data in `src/data/parliament.ts`
- Crisis Commander page at `/crisis-commander`
- Commander-specific composition components in `src/components/commander`
- Crisis Commander mock data in `src/data/crisis-commander.ts`
- Impact Dashboard page at `/impact-dashboard`
- Impact dashboard components in `src/components/dashboard`
- Impact mock data in `src/data/impact.ts`
- Static Recharts visualizations for impact analytics
- Reusable Digital Twin Map system with Leaflet + OpenStreetMap
- Backend static node and route map data displayed from `/api/nodes` and `/api/routes`
- Control Room real digital twin map
- Scenario Simulator real scenario preview map
- Trade Sentinel real trade corridor map
- Impact Dashboard real map with static mock impact heat zones
- Resources page at `/resources`
- Resources-specific composition components in `src/components/resources`
- Expanded resource mock data in `src/data/resources.ts`
- Reports page at `/reports`
- Reports-specific composition components in `src/components/reports`
- Expanded report mock data in `src/data/reports.ts` (22 reports with full executive preview content)
- Interactive report selection with local state preview panel
- Settings page at `/settings`
- Settings-specific composition components in `src/components/settings`
- Full settings data in `src/data/settings.ts`
- Functional theme switching (Light / Dark / System) shared between Topbar and Settings page
- Global layout density refinement for AppShell, Sidebar, Topbar, PageHeader, cards, KPI rows, grids, tables, and long scroll regions
- `frontend/docs/layout-refinement.md` density, spacing, viewport, and scrolling standards
- Global design system refinement for typography, semantic colors, premium surfaces, KPI cards, badges, tables, timelines, buttons, focus rings, and motion standards
- `frontend/docs/design-system.md` typography, colors, spacing, cards, badges, buttons, tables, and motion standards
- Control Room MVP redesign with reference-aligned command header, dominant digital twin map, right-side system overview and active alerts, bottom analytics row, quick actions, and footer status strip
- Scenario Simulator MVP refinement with reference-aligned scenario selection, simulation overview, scenario details, impact summary, dominant impact preview map, simulation controls, and results preview
- Frontend documentation

Not implemented:

- Real forecasting
- Real uploads/downloads
- Cloud storage
- AI logic
- Scenario simulation
- NetworkX routing
- Business calculations

## Next Phase

Phase 2 — Intelligence Layer & Real Product Logic

Skeleton phase complete. All 9 product pages implemented with mock data.

Suggested Phase 2 priorities:
- Real map integration (MapLibre GL or Leaflet)
- Live weather data feed (IMD API)
- Port AIS data integration
- Authentication and user management
- Recharts → live data binding
- Backend API layer (Next.js API routes or separate service)
- AI Parliament live agent calls (Gemini 2.5)
