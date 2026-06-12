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

Future issues will add map, animation, and product-specific libraries only when those features are implemented.

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
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── control-room/
│   │   ├── scenario-simulator/
│   │   ├── trade-sentinel/
│   │   ├── ai-parliament/
│   │   ├── crisis-commander/
│   │   ├── impact-dashboard/
│   │   ├── resources/
│   │   ├── reports/
│   │   ├── settings/
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   ├── dashboard/
│   │   ├── map/
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

## Current Status

Issue #14 complete: Settings page added. Skeleton phase complete.

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
- AI Parliament page at `/ai-parliament`
- Agent-specific composition components in `src/components/agents`
- Parliament mock data in `src/data/parliament.ts`
- Crisis Commander page at `/crisis-commander`
- Commander-specific composition components in `src/components/commander`
- Crisis Commander mock data in `src/data/crisis-commander.ts`
- Impact Dashboard page at `/impact-dashboard`
- Impact dashboard components in `src/components/dashboard`
- Impact mock data in `src/data/impact.ts`
- Static Recharts visualizations for impact analytics
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
- Frontend documentation

Not implemented:

- Backend/API integrations
- Real map integration
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
