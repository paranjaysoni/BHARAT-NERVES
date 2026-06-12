# Frontend Architecture

The Project Aegis frontend uses Next.js with the App Router, TypeScript, Tailwind CSS, and a `src/` directory.

## App Router

The App Router lives in `src/app`.

- `layout.tsx` defines the root HTML shell, metadata, and global `AppShell`.
- `page.tsx` redirects `/` to `/control-room`.
- `globals.css` defines Tailwind layers, base styles, and theme variables.

Current product routes under `src/app`:

- `/control-room`: National Control Room dashboard built with mock data and reusable dashboard components.
- `/scenario-simulator`: Scenario Simulator skeleton with local scenario selection and mock impact preview.
- `/trade-sentinel`: Trade Sentinel dashboard skeleton with mock trade intelligence.
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

## Control Room Page

Issue #6 added the first composed product page at `/control-room`.

The Control Room page uses:

- `PageHeader` for page identity and status context.
- `MetricCard` for high-level KPIs.
- `MapPlaceholder` for the India Digital Twin / Odisha Corridor preview.
- `AlertCard` for active alerts.
- `ProgressBar` and `RiskPill` for system health and stress summaries.
- `TimelineItem` for recent activity.

Dashboard-specific composition components live in `src/components/dashboard/` and consume centralized mock data from `src/data/`. The page does not include real map integration, backend calls, AI logic, scenario simulation, NetworkX routing, or business calculations.

## Scenario Simulator Page

Issue #7 added the `/scenario-simulator` page.

The Scenario Simulator page uses:

- `PageHeader` for page identity and readiness context.
- `ScenarioCard` for predefined scenario selection.
- `SectionCard` for simulator panels.
- `MetricCard` for expected impact summary values.
- `MapPlaceholder` for a visual impact preview without real map integration.
- `TimelineItem` for the static simulation timeline preview.
- `DataTable` for scenario comparison.

Scenario-specific composition components live in `src/components/scenario/`. The page consumes `scenarios`, `scenarioSimulationImpacts`, and `scenarioTimelineSteps` from `src/data/`.

Scenario selection and the control buttons use local React state only. The page does not include a real simulation engine, backend APIs, NetworkX routing, real AI, real scenario calculations, real map integration, or live data fetching.

## Trade Sentinel Page

Issue #8 added the `/trade-sentinel` page.

The Trade Sentinel page uses:

- `PageHeader` for page identity and monitoring status.
- `MetricCard` for trade KPIs.
- `MapPlaceholder` for the trade network preview.
- `ChartCard` for a trade flow trend placeholder.
- `AlertCard` for active trade alerts.
- `StatusBadge` and `RiskPill` for port, shipment, commodity, and corridor status.
- `DataTable` for the shipment delay table.
- `ProgressBar` for corridor health summaries.

Trade-specific mock data lives in `src/data/trade.ts` and `src/data/shipments.ts`, with supporting types in `src/types/trade.ts` and `src/types/shipment.ts`.

This page is mock trade intelligence only. It does not include real trade APIs, live port data, backend calls, real map integration, AI logic, simulation logic, carbon calculation, business calculations, or live data fetching.

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

The following pages exist in the app:

- Control Room: composed mock-data dashboard.
- Scenario Simulator: mock-data skeleton with local selection state.
- Trade Sentinel: mock trade intelligence dashboard.
- AI Parliament
- Crisis Commander
- Impact Dashboard
- Resources
- Reports
- Settings
