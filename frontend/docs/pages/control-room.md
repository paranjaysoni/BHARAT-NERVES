# National Control Room

The National Control Room is the main landing dashboard for Project Aegis / Bharat Nerves Platform.

## Page Purpose

The page gives operators a high-level view of the resilience network using mock frontend data. It is designed to answer:

- What is the current system status?
- Which corridors are under stress?
- What is the resilience score?
- Are there active alerts?
- What does the digital twin preview look like?
- What quick actions can the operator take?

## Layout Structure

- Top section: `PageHeader` with status badges.
- KPI row: five `MetricCard` components for resilience, alerts, monitored nodes, corridors, and economic exposure.
- Main content: large digital twin placeholder on the left and alert/health summary cards on the right.
- Bottom content: corridor overview, quick actions, and recent activity timeline.

The layout is responsive:

- Desktop: KPI row and map/right-panel composition.
- Tablet: stacked sections with preserved spacing.
- Mobile: single-column dashboard.

## Components Used

- `PageHeader`
- `MetricCard`
- `MapPlaceholder`
- `AlertCard`
- `SectionCard`
- `StatusBadge`
- `ProgressBar`
- `RiskPill`
- `TimelineItem`

Dashboard-specific composition components live in `src/components/dashboard/`:

- `ControlRoomKpis`
- `DigitalTwinOverview`
- `ActiveAlertsPanel`
- `SystemHealthSummary`
- `CorridorOverview`
- `QuickActions`
- `RecentActivity`

## Data Sources Used

The page consumes centralized mock data from `src/data/`:

- `metrics`
- `alerts`
- `nodes`
- `routes`
- `selectedCorridor`
- `systemStatus`
- `controlRoomHealthItems`
- `controlRoomQuickActions`
- `controlRoomActivityItems`
- `controlRoomFeaturedNodeIds`

## Current Skeleton Limitations

- No backend calls.
- No live data fetching.
- No real Leaflet map integration.
- No route optimization or NetworkX logic.
- No AI or AI Parliament logic.
- No simulation engine.
- No business calculations.

## Future Enhancements

- Replace `MapPlaceholder` with real digital twin map layers.
- Add live alert detail panels and operator workflows.
- Connect KPI values to backend APIs.
- Add filtering by corridor, district, asset type, and risk level.
- Add real report generation and Crisis Commander handoff flows.
