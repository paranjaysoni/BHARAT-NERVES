# Mock Data Architecture

The frontend mock data layer provides a centralized source of truth for Project Aegis prototype content. Future pages should consume data from `src/data/` instead of duplicating static values inside components.

## Why Centralized Data Exists

Centralized mock data keeps early prototype work consistent while the backend and APIs are not ready yet. It allows dashboards, maps, reports, and simulation screens to share the same entities and makes the later migration to real API responses more predictable.

## Data Folder Structure

```text
src/data/
├── nodes.ts
├── routes.ts
├── scenarios.ts
├── agents.ts
├── metrics.ts
├── alerts.ts
├── reports.ts
├── resources.ts
├── settings.ts
├── navigation.ts
├── user.ts
├── corridors.ts
├── system-status.ts
└── index.ts
```

## File Purposes

- `nodes.ts`: Odisha Cyclone Corridor infrastructure nodes such as ports, warehouses, hospitals, relief centers, district hubs, junctions, and power assets.
- `routes.ts`: Static corridor route definitions between node IDs.
- `scenarios.ts`: Scenario cards for cyclone, port, highway, and warehouse disruption examples.
- `agents.ts`: AI Parliament agent profiles for future interface work.
- `metrics.ts`: KPI-style mock values for dashboard components.
- `alerts.ts`: Active alert examples for notification and incident surfaces.
- `reports.ts`: Report metadata for future report listing and filtering.
- `resources.ts`: Dataset, document, map, research, guideline, storage, data-source health, MVP data-pack, and future integration metadata.
- `settings.ts`: Mock platform preferences and display settings.
- `navigation.ts`: Sidebar navigation and page placeholder metadata.
- `user.ts`: Current user mock profile.
- `corridors.ts`: Corridor metadata and selected corridor mock.
- `system-status.ts`: Platform status summary.
- `index.ts`: Central export barrel for future imports.

## Migration Path To Real APIs

When backend APIs are introduced, keep the data shapes aligned with the existing TypeScript interfaces. Replace direct imports from `src/data/` with service-layer calls from `src/services/`, then map API responses into the same domain types.

Recommended migration path:

1. Keep interfaces in `src/types/` stable.
2. Add API clients in `src/services/`.
3. Replace page-level data imports gradually.
4. Keep mock data available for tests, demos, and offline development.

## Resource Data Structure

Issue #12 expanded `src/data/resources.ts` into the source of truth for the Resources page.

The file includes:

- `resources`: At least 20 realistic mock resources covering datasets, maps, policies, emergency guidelines, trade documents, carbon references, simulation assets, and reports.
- `resourceCategories`: Category cards shown on the Resources page.
- `storageOverview`: Mock storage capacity and sync summary.
- `recentResourceUpdates`: Timeline events for library changes.
- `dataSourceHealth`: Current mock or planned status for weather, traffic, port, railway, hospital, and carbon sources.
- `mvpDataPackItems`: Summary of the Odisha Cyclone Corridor demo data pack.
- `futureResourcePipeline`: Planned real integrations for later issues.

Resource rows use the shared `Resource` interface from `src/types/resource.ts`, including title, type, category, owner, source, updated date, format, status, description, and optional featured status.

## Resources Migration To APIs And Storage

When real storage arrives, keep `resources.ts` as the local demo fixture and move production reads behind `src/services/`.

Recommended path:

1. Keep `Resource` metadata fields stable.
2. Add a backend resource listing endpoint.
3. Store file objects in cloud storage and keep only metadata plus storage keys in API responses.
4. Replace direct page imports with a service call or server component data boundary.
5. Preserve mock data for offline demos and component tests.

## Report Data Structure

Issue #13 expanded `src/data/reports.ts` into the full source of truth for the Reports page.

The file includes:

- `reports`: 22 realistic typed `Report` objects covering Crisis, Trade, Impact, AI Parliament, Carbon, Infrastructure, Logistics, Executive Briefing, Risk, Health, Policy, Environment, Operations, Technology, Baseline, Response, and Ports categories.
- `reportCategories`: 8 `ReportCategoryCard` objects shown in the category grid.
- `recentReportActivities`: 5 timeline entries for the recent reports sidebar panel.
- `reportActivityTimeline`: 4 chronological timeline entries for the activity log.
- `featuredIntelligenceBrief`: Single `FeaturedBrief` — the premium executive card.
- `scenarioReports`: 5 compact report references linked to the active Cyclone Landfall scenario.
- `futureReportingPipeline`: 7 planned reporting capabilities in the roadmap section.
- `reportStatistics`: Object with `reportsThisWeek`, `reportsThisMonth`, `avgReviewTimeHours`, `criticalFindings`.
- `reportsPageMeta`: Page title and description.

Report rows use the expanded `Report` interface from `src/types/report.ts`, which now includes `priority`, `version`, `executiveSummary`, `keyFindings`, and `recommendations` fields — used by the `ReportPreview` panel.

## Report Categories

Report categories in `src/data/reports.ts` use the `ReportCategoryCard` type (defined in `src/types/report.ts`). Each category card shows count, description, and status. Categories are independent of the `Report.category` field — they are display constructs for the UI grid, not foreign-key relationships.

## Reports Migration To Backend APIs

When a backend reports API is introduced:

1. Keep `Report` interface fields stable — they are already production-shaped.
2. Add a reports listing endpoint in `src/services/`.
3. Replace page-level `reports` imports with a server component or service call.
4. Report preview content (summary, findings, recommendations) should be stored in the API response, not re-derived.
5. Keep `src/data/reports.ts` as the demo fixture for offline development, tests, and demos.
6. Report categories can either come from a separate API endpoint or be derived from the report list dynamically.

## Naming Conventions

- Use plural names for dataset exports: `nodes`, `routes`, `reports`.
- Use singular names for single-object exports: `currentUser`, `systemStatus`, `selectedCorridor`.
- Use stable IDs with domain prefixes such as `node-`, `route-`, `report-`, and `resource-`.
- Store route relationships by node ID, not duplicated node objects.

## Type Safety Rules

- Do not use `any`.
- Add interfaces in `src/types/` for shared domain data.
- Export types through `src/types/index.ts`.
- Annotate every mock dataset with its domain type.
- Import frontend data from `@/data` when possible.
- Keep calculations and simulation logic out of `src/data/`.
