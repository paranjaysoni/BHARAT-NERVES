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

Future issues will add map, chart, animation, and product-specific libraries only when those features are implemented.

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
│   │   └── shared/
│   ├── layouts/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── data/
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

Issue #3 completed: global application layout and navigation added.

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
- Placeholder index files
- Frontend documentation

Not implemented:

- Real dashboard logic
- Maps
- Charts
- AI logic
- Backend API integrations
- Simulation or business logic

## Next Issue

Issue #4 - Create Frontend Mock Data Layer
