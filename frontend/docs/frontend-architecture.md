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
- `/ai-parliament`: AI Parliament skeleton with mock multi-agent recommendations.
- `/crisis-commander`: Crisis Commander executive command page with mock response plan.
- `/impact-dashboard`: Impact Dashboard analytics page with mock impact charts and tables.
- `/resources`: Resources data library page with mock files, source health, and MVP data-pack context.
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
- `components/resources`: Resources page composition components.
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

## AI Parliament Page

Issue #9 added the `/ai-parliament` page.

The AI Parliament page uses:

- `PageHeader` for page identity and deliberation readiness.
- `AgentCard` for participating stakeholder agents.
- `SectionCard` for session, consensus, recommendation, and note panels.
- `MetricCard` for the consensus score.
- `ProgressBar` for consensus and stakeholder priority breakdown.
- `StatusBadge` for readiness, conflict, and matrix status.
- `TimelineItem` for the recommendation timeline.
- `DataTable` for the agent recommendation matrix.

Agent-specific composition components live in `src/components/agents/`. Mock parliament data lives in `src/data/parliament.ts`, with supporting types in `src/types/parliament.ts`.

This page uses mock data only. It does not include real Gemini/OpenAI calls, backend APIs, agent orchestration, decision engines, simulation logic, or live data fetching. Future real AI integration should use strict structured JSON output validated before rendering.

## Crisis Commander Page

Issue #10 added the `/crisis-commander` page.

The Crisis Commander page uses:

- `PageHeader` for page identity and command status.
- `MetricCard` for crisis KPIs and expected outcomes.
- `AlertCard` for active incidents from Control Room and Trade Sentinel.
- `TimelineItem` for command timeline events.
- `DataTable` for the response matrix.
- `ProgressBar`, `RiskPill`, and `StatusBadge` for risk and approval state.
- `SectionCard` for executive summary, situation overview, action plan, resource deployment, approval, and checklist panels.

Commander-specific composition components live in `src/components/commander/`. Mock commander data lives in `src/data/crisis-commander.ts`, with supporting types in `src/types/crisis-commander.ts`.

Crisis Commander is downstream of AI Parliament and Trade Sentinel. AI Parliament provides structured mock recommendations and consensus context; Trade Sentinel contributes trade alerts, port pressure, and freight delay context. This page does not include backend APIs, real AI calls, real decision engines, simulation execution, live data fetching, resource optimization algorithms, or report generation backend.

## Impact Dashboard Page

Issue #11 added the `/impact-dashboard` page.

The Impact Dashboard page uses:

- `PageHeader` for page identity and impact model status.
- `MetricCard` for impact KPIs and recovery savings.
- `ChartCard` with Recharts for static impact charts.
- `MapPlaceholder` for geographic impact context.
- `ProgressBar`, `RiskPill`, and `StatusBadge` for risk and recovery signals.
- `DataTable` for district impact and recovery benefit tables.

Impact-specific composition components live in `src/components/dashboard/`. Mock impact data lives in `src/data/impact.ts`, with supporting types in `src/types/impact.ts`.

This page is mock impact analytics only. It does not include backend APIs, real calculations, real forecasting, real AI, live data fetching, or simulation execution. Future versions should connect to a validated impact engine and replace static chart datasets with model outputs.

## Resources Page

Issue #12 added the `/resources` page.

The Resources page uses:

- `PageHeader` for page identity and library readiness status.
- `MetricCard` for resource library KPIs.
- `SectionCard` for categories, featured resources, side panels, and integration notes.
- `StatusBadge` for resource, category, and source status.
- `TimelineItem` for recent resource updates.
- `DataTable` for the full resource inventory.
- `ProgressBar` for storage usage.

Resources-specific composition components live in `src/components/resources/`. Mock resource data lives in `src/data/resources.ts`, with the shared resource domain type in `src/types/resource.ts`.

This page is a mock resources and data library only. It does not include backend APIs, real uploads, real downloads, authentication, cloud storage, live data fetching, document processing, or AI summarization. Future versions should route resource reads through `src/services/` and connect to real APIs, government datasets, storage systems, and operational feeds.

## Reports Page

Issue #13 added the `/reports` page.

The Reports page uses:

- `PageHeader` for page identity and reporting center status.
- `MetricCard` for six KPI cards across the top.
- `SectionCard` for all panel wrappers.
- `StatusBadge` and `RiskPill` for report status and priority indicators.
- `TimelineItem` for recent activity and the chronological activity timeline.
- `DataTable`-style interactive table for report selection (implemented directly for click interactivity).

Reports-specific composition components live in `src/components/reports/`. Mock report data lives in `src/data/reports.ts`, with supporting types in `src/types/report.ts`.

### Report Data Flow

Reports data is fully centralized in `src/data/reports.ts`. The page component imports all required exports from `@/data`. No component defines its own data.

### Preview Architecture

The `ReportPreview` component receives a `report: Report | null` prop. When null, it displays an empty state prompt. When a report is selected from `ReportsTable`, the page-level `useState` hook updates the `selectedReport` state, and the preview renders the full executive content (summary, findings, recommendations). Selection state is local to the page component — it is not persisted, URL-synced, or shared across pages.

The `ReportsTable` component accepts `onSelectReport` and `selectedReportId` props to wire the interactive row highlighting back to the parent page.

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
- AI Parliament: mock multi-agent decision support page.
- Crisis Commander: mock executive command and response plan page.
- Impact Dashboard: mock impact analytics page with static Recharts visuals.
- Resources: mock resources and data library page.
- Reports: centralized intelligence reporting hub with interactive table, preview panel, and executive briefs.
- Settings
