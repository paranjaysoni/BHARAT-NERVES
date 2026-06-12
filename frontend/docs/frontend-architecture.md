# Frontend Architecture

The Project Aegis frontend uses Next.js with the App Router, TypeScript, Tailwind CSS, and a `src/` directory.

## App Router

The App Router lives in `src/app`.

- `layout.tsx` defines the root HTML shell, metadata, and global `AppShell`.
- `page.tsx` redirects `/` to `/control-room`.
- `globals.css` defines Tailwind layers, base styles, and theme variables.

Current product routes under `src/app` are skeleton pages only:

- `/control-room`
- `/scenario-simulator`
- `/trade-sentinel`
- `/ai-parliament`
- `/crisis-commander`
- `/impact-dashboard`
- `/resources`
- `/reports`
- `/settings`

## Folder Structure

- `src/app`: Next.js App Router files.
- `src/components`: Reusable UI components grouped by product area.
- `src/layouts`: Page and application layout compositions.
- `src/hooks`: Shared React hooks.
- `src/lib`: Shared client libraries and setup helpers.
- `src/services`: Frontend service clients and API integration wrappers.
- `src/data`: Static MVP JSON data and local fixtures.
- `src/types`: Shared TypeScript types.
- `src/constants`: Shared constants and configuration values.
- `src/styles`: Additional style modules if needed later.
- `src/utils`: Shared utility functions.

## Component Organization Plan

- `components/layout`: Shell, header, sidebar, and navigation components.
- `components/dashboard`: Dashboard-specific presentation components.
- `components/map`: Map-related presentation components.
- `components/scenario`: Scenario simulator components.
- `components/agents`: AI Parliament and agent-facing components.
- `components/commander`: Crisis Commander components.
- `components/shared`: Small reusable components used across product areas.

## Layout Components Added

- `components/layout/AppShell.tsx`: Composes the persistent sidebar, topbar, and main content area.
- `components/layout/Sidebar.tsx`: Provides product branding, primary navigation, active route state, and system status.
- `components/layout/Topbar.tsx`: Provides platform heading, corridor selector placeholder, notification indicator, time widget, and theme control.
- `components/layout/ThemeToggle.tsx`: Provides a small class-based light/dark theme toggle using the existing CSS variable strategy.

## Shared Components Added

- `components/shared/PageHeader.tsx`: Standard title and description block for placeholder pages.
- `components/shared/SectionCard.tsx`: Basic card wrapper for page sections.
- `components/shared/StatusBadge.tsx`: Small semantic status badge for simple status labels.

## Component System

Issue #5 added a reusable shared component system under `src/components/shared/`.

The shared component set includes:

- `PageHeader`
- `SectionCard`
- `MetricCard`
- `StatusBadge`
- `RiskPill`
- `ProgressBar`
- `AlertCard`
- `ScenarioCard`
- `AgentCard`
- `TimelineItem`
- `ChartCard`
- `EmptyState`
- `DataTable`
- `MapPlaceholder`

These components are presentation-only and should not contain backend calls, AI integrations, map libraries, simulation engines, or business calculations.

## Shared Component Export Strategy

Shared components are exported from `src/components/shared/index.ts`.

Preferred import pattern:

```ts
import { MetricCard, SectionCard } from "@/components/shared";
```

Component props interfaces are exported alongside the components so future pages can compose typed configuration safely.

## Component Preview Route

The `/component-preview` route displays examples of all reusable components using mock data from `src/data/`.

This route is an internal development preview, not a product page. It exists so the team can inspect component behavior in both light and dark themes before composing final dashboards.

## Data Folder Purpose

The `data` folder holds typed MVP mock datasets and fixtures, including Odisha Cyclone Corridor nodes, routes, scenarios, agents, metrics, alerts, reports, resources, settings, navigation, user, corridor, and system status data.

## Mock Data Layer

Issue #4 added a centralized mock data layer under `src/data/`.

- `src/data/index.ts` exports all frontend mock data.
- Pages and layout components should import shared mock data from `@/data`.
- Shared domain interfaces live in `src/types/`.
- Data files should remain static and should not contain business calculations, simulation engines, API calls, or AI logic.

## Data Ownership

Until backend APIs exist, `src/data/` owns prototype content for the frontend. Components may render data, but they should not define their own parallel datasets. This keeps navigation, placeholder page metadata, reports, resources, metrics, and corridor entities consistent across the app.

When APIs are introduced, service clients in `src/services/` should become the boundary for remote data. Existing mock data should remain useful for tests, demos, and fallback development.

## Import Patterns

Prefer importing from centralized barrels:

```ts
import { navigationItems, nodes, routes } from "@/data";
import type { AegisNode, AegisRoute } from "@/types";
```

Avoid hardcoding repeated dashboard, navigation, report, resource, or scenario data inside components.

## Services Folder Purpose

The `services` folder will hold frontend clients for future backend APIs and external integrations. It should not contain business logic that belongs on the backend.

## Product Pages

The following pages exist as placeholders and do not contain real product logic yet:

- Control Room
- Scenario Simulator
- Trade Sentinel
- AI Parliament
- Crisis Commander
- Impact Dashboard
- Resources
- Reports
- Settings
