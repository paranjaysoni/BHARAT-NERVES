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
- `components/maps`: Reusable Leaflet/OpenStreetMap digital twin components.
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

## Global Layout Density

Issue #15 refined the global shell and shared layout rhythm for denser desktop dashboards.

- `AppShell` now uses a 220px desktop sidebar, compact main padding, and viewport-aware main height below the topbar.
- `Topbar` targets a compact 48px to 56px desktop height.
- `PageHeader`, `SectionCard`, `MetricCard`, `ChartCard`, `MapPlaceholder`, `AlertCard`, `TimelineItem`, and `DataTable` have tighter global defaults.
- `globals.css` defines reusable layout classes: `app-page-stack`, `app-section-grid`, `app-column-stack`, `app-kpi-grid`, and `app-scroll-region`.
- Long tables, alert lists, and timelines should prefer internal scrolling over expanding the full page.

See `docs/layout-refinement.md` for the spacing, card sizing, viewport, scrolling, and dashboard density standards.

## Global Design System

Issue #16 refined the shared visual system without redesigning individual pages.

- `globals.css` now defines typography helpers, premium surface classes, focus rings, button variants, motion defaults, and density helpers.
- `tailwind.config.ts` maps additional semantic surface, border, and focus-ring tokens.
- Shared primitives now provide stronger hierarchy through premium card surfaces, status accents, better table headers, clearer timeline markers, refined badges, and standardized buttons.
- Components should use shared classes such as `surface-card`, `surface-inset`, `btn`, `btn-primary`, `btn-secondary`, `btn-outline`, `type-section-title`, `type-body`, and `type-micro-label`.

See `docs/design-system.md` for typography, colors, spacing, cards, badges, buttons, tables, and motion standards.

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

## Reusable Digital Twin Map System

Issue #64 added the shared digital twin map system under `src/components/maps`.

The map stack uses:

- Leaflet
- React Leaflet
- OpenStreetMap tiles
- Static backend APIs from Issue #55

Primary components:

- `AegisMap.tsx`: shared map engine and backend data fetcher.
- `NodeMarker.tsx`: node status markers, tooltips, and popups.
- `RouteLayer.tsx`: route polylines between backend node coordinates.
- `MapLegend.tsx`: node, route, and impact legends.
- `MapControls.tsx`: zoom and fit-to-India controls.
- `HeatmapLayer.tsx`: lightweight static impact circles.

Pages using the shared map:

- `/control-room`
- `/scenario-simulator`
- `/trade-sentinel`
- `/impact-dashboard`

The map system is visualization-only. It does not execute simulations, block routes, recover routes, calculate impact, call AI systems, consume weather APIs, or connect live traffic/port feeds.

See `docs/digital-twin-map.md` for the full map architecture and future GIS roadmap.

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
- `AegisMap` for the India Digital Twin / national infrastructure network.
- `AlertCard` for active alerts.
- `ProgressBar` and `RiskPill` for system health and stress summaries.
- `TimelineItem` for recent activity.

Dashboard-specific composition components live in `src/components/dashboard/` and consume centralized mock data from `src/data/`. The map consumes backend static node and route APIs. The page does not include AI logic, scenario simulation, NetworkX routing, or business calculations.

## Scenario Simulator Page

Issue #7 added the `/scenario-simulator` page.

The Scenario Simulator page uses:

- `PageHeader` for page identity and readiness context.
- `ScenarioCard` for predefined scenario selection.
- `SectionCard` for simulator panels.
- `MetricCard` for expected impact summary values.
- `AegisMap` for a visual impact preview with affected node and route highlighting.
- `TimelineItem` for the static simulation timeline preview.
- `DataTable` for scenario comparison.

Scenario-specific composition components live in `src/components/scenario/`. The page consumes `scenarios`, `scenarioSimulationImpacts`, and `scenarioTimelineSteps` from `src/data/`.

Scenario selection and the control buttons use local React state only. The map consumes backend static node and route APIs for visualization. The page does not include a real simulation engine, NetworkX routing, real AI, real scenario calculations, or live data fetching beyond the static map data.

## Trade Sentinel Page

Issue #8 added the `/trade-sentinel` page.

The Trade Sentinel page uses:

- `PageHeader` for page identity and monitoring status.
- `MetricCard` for trade KPIs.
- `AegisMap` for the trade network preview.
- `ChartCard` for a trade flow trend placeholder.
- `AlertCard` for active trade alerts.
- `StatusBadge` and `RiskPill` for port, shipment, commodity, and corridor status.
- `DataTable` for the shipment delay table.
- `ProgressBar` for corridor health summaries.

Trade-specific mock data lives in `src/data/trade.ts` and `src/data/shipments.ts`, with supporting types in `src/types/trade.ts` and `src/types/shipment.ts`.

This page is mock trade intelligence with a real OpenStreetMap route visualization from backend static data. It does not include real trade APIs, live port data, AI logic, simulation logic, carbon calculation, business calculations, or live data fetching beyond the static map data.

## AI Parliament Page

Issue #9 added the `/ai-parliament` page. Issue #20 (MVP Refinement) transformed it into the flagship intelligence feature.

AI Parliament is a Multi-Agent Deliberation & Consensus Engine — 8 expert AI agents debate and negotiate a crisis response plan, producing a governance-ready recommendation for Crisis Commander.

### Layout (Issue #20 reference design)

1. **Session Header** — scenario title, session ID, timer, objectives, tab navigation
2. **Agent Grid** — 8 live deliberation cards (animated status dots, position, confidence bars, per-agent color accents)
3. **Consensus Panel** — SVG semicircular gauge, agree/partial/disagree/neutral breakdown
4. **Decision Timeline** — step-by-step milestones with Live indicator
5. **Parliament Recommendation** — proposed decision, implementation priorities, Crisis Commander CTA
6. **Key Discussion Insights** — colored insight cards (agree/debate/info types)
7. **Key Metrics** — compact 4-metric row (AI Agents, Key Factors, Discussion Rounds, Avg Response Time)
8. **Agent Recommendation Matrix** — full detail table, below the fold

### Agent-specific components (`src/components/agents/`)

- `ParliamentSessionSummary` — session header with tabs and countdown
- `AgentGrid` — 8 live deliberation agent cards with animated pulsing dots
- `ConsensusPanel` — SVG gauge visualization + agreement breakdown
- `AgentTimeline` — premium decision timeline with Live badge
- `FinalRecommendationPreview` — parliament recommendation with implementation priority bars
- `KeyDiscussionInsights` — colored insight cards
- `KeyMetrics` — compact 4-metric row
- `PriorityBreakdown` — stakeholder priority weight bars
- `AgentRecommendationMatrix` — full data table (detail view)

### Data

Mock parliament data lives in `src/data/parliament.ts`, with types in `src/types/parliament.ts`. New data exports added in Issue #20: `keyDiscussionInsights`, `parliamentMetrics`. New type fields: `position` on `AgentRecommendation`; `agreePercent`, `partialPercent`, `disagreePercent`, `neutralPercent`, `topAgreedPriority` on `ParliamentConsensus`; `proposedDecision`, `implementationPriorities` on `FinalRecommendation`; full session metadata (`sessionId`, `startedAt`, `timeRemaining`, `objectives`) on `ParliamentSession`.

This page uses mock data only. No real Gemini/OpenAI calls, backend APIs, agent orchestration, or live data fetching. Future real AI integration should use strict structured JSON output validated before rendering.

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

## Settings Page

Issue #14 added the `/settings` page and completed the skeleton phase of the Project Aegis frontend.

The Settings page uses:

- `PageHeader` for page identity and configuration center status.
- `MetricCard` for 6 KPI cards across the top.
- `SectionCard` for all panel wrappers.
- `StatusBadge` for integration, security, data source, and dev mode status indicators.

Settings-specific composition components live in `src/components/settings/`. Mock settings data lives in `src/data/settings.ts`, with supporting types in `src/types/settings.ts`.

### Configuration Architecture

The settings page is a read/display configuration panel. The only stateful behavior is:

1. **Appearance** — `AppearanceSettings` uses `useState` + `localStorage` + DOM class manipulation to apply themes without a provider.
2. **Notifications** — `NotificationSettings` uses `useState` initialized from mock data for toggle visual state. State is not persisted.

All other panels are pure display components consuming static mock data. No backend calls, no API writes, no persistence beyond `localStorage` for theme.

### Theme Architecture

Both `ThemeToggle` (Topbar) and `AppearanceSettings` (Settings) write to and read from `localStorage` under `project-aegis-theme`. Both apply `.dark` on `document.documentElement`. No React context is needed — both components read the stored value on mount via `useEffect` and stay consistent on reload.

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
- Settings: platform administration and configuration center with appearance, notifications, data sources, integrations, AI, security, and system health panels.

## Current Layout Status

Issue #15 Complete: global layout refinement applied across the shared shell, reusable primitives, KPI rows, route composition spacing, internal table/list scrolling, and frontend documentation.

## Current Design Status

Issue #16 Complete: global design system refinement applied across theme tokens, typography utilities, shared surfaces, KPI cards, badges, tables, timelines, buttons, and frontend documentation.

## Current Page Refinement Status

- Issue #17 Revision Complete: Control Room MVP redesign applied with reference-aligned command header, dominant digital twin map, right-side system overview and active alerts, bottom analytics row, quick actions, and footer status strip.
- Issue #18 Complete: Scenario Simulator MVP refinement applied with reference-aligned scenario selection, simulation overview, scenario details, impact summary, dominant impact preview map, simulation controls, and results preview.

---

## Global Simulation State (Issue #63)

The frontend uses a module-level singleton store in `src/lib/simulation-store.ts` to share simulation results across all pages without Zustand, Redux, or React Context.

**Store:** `src/lib/simulation-store.ts`
**Hook:** `src/hooks/use-simulation-store.ts`
**Persistence:** `localStorage` key `project-aegis-simulation-state`

### Flow

1. `ScenarioSimulatorDashboard` calls `setSimulationRunning()` → `runSimulation()` → `setSimulationDone(result)`
2. Parliament and Commander APIs fire immediately after, in parallel
3. All pages subscribe via `useSimulationStore()` and re-render when state changes
4. On page refresh, the store hydrates from localStorage before first render

### Global indicator

`GlobalSimulationIndicator` renders in every Topbar variant showing:
- Active scenario name
- Risk level (color-coded)
- Last updated time
- Reset button

### Reset

`resetSimulation()` clears localStorage and notifies all subscribers to return to baseline.
