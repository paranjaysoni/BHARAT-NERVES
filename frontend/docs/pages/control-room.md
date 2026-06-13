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

## Control Room MVP Redesign Revision

Issue #17 revision makes the Control Room closely follow the attached mission-control reference image while preserving Project Aegis branding and architecture. The page prioritizes a command-center first impression: centered national header, dominant map, compact right-side system intelligence, four-panel bottom analytics, and a slim footer status strip.

## Visual Hierarchy Strategy

Attention order:

1. Digital Twin hero visualization
2. System Overview
3. Active Alerts
4. Bottom analytics row
5. Quick Actions
6. Footer operational status

The page is designed to fit a standard laptop viewport where possible. Long content is compressed into command feeds instead of expanding the whole page.

## Layout Structure

- Top header strip: route-specific command header with `NATIONAL CONTROL ROOM`, mission subtitle, corridor selector, notification center, clock, and theme toggle.
- Main left: large Digital Twin Command Center occupying the primary visual area.
- Main right: compact `System Overview` KPI grid and `Active Alerts` command stream.
- Bottom row: four equally weighted panels for Resilience Trend, Economic Impact, Weather Outlook, and Quick Actions.
- Footer: compact product/version and all-systems-operational status strip.

The layout is responsive:

- Desktop: reference-aligned command-center layout with the digital twin taking roughly two-thirds of visual attention.
- Tablet: stacked sections with preserved spacing.
- Mobile: single-column dashboard.

## Digital Twin Strategy

The page still does not load Leaflet or a real map library. Instead, `DigitalTwinOverview` now renders a polished MVP visualization using local mock data:

- Dark mission-map surface with India outline and Odisha corridor focus zone.
- Node indicators for ports, warehouses, hospitals, relief centers, district hubs, transport junctions, and power stations.
- Route indicators with status-based colors for clear, watch, congested, and rerouted links.
- Animated pulse markers for active watch/stressed risk nodes.
- Map labels, zoom-style controls, coastal route arcs, and node-type legend.

This is intentionally a credible bridge to the real Digital Twin phase: it communicates the intended product direction without adding map dependencies or backend logic.

## Command Center UX Rationale

- Alerts are shown as a compact operations feed, not support-ticket cards.
- System Overview uses a 2x2 command KPI grid for resilience, alerts, at-risk nodes, and disrupted routes.
- Bottom analytics row gives the executive readout: resilience trend, economic impact, weather outlook, and quick actions.
- Quick Actions map to the MVP response flow: Scenario Simulator, Trade Sentinel, AI Parliament, and Crisis Commander.
- Footer status reinforces the operations-center framing without adding page scroll.

## Components Used

- `MetricCard`
- `SectionCard`
- `StatusBadge`
- `RiskPill`

Dashboard-specific composition components live in `src/components/dashboard/`:

- `ControlRoomKpis`
- `ControlRoomAnalyticsRow`
- `DigitalTwinOverview`
- `ActiveAlertsPanel`
- `QuickActions`

## Data Sources Used

The page consumes centralized mock data from `src/data/`:

- `metrics`
- `alerts`
- `nodes`
- `routes`
- `selectedCorridor`
- `systemStatus`
- `controlRoomQuickActions`

## Current Skeleton Limitations

- No backend calls.
- No live data fetching.
- No real Leaflet map integration.
- No route optimization or NetworkX logic.
- No AI or AI Parliament logic.
- No simulation engine.
- No business calculations.

Issue #17 Revision Complete.

## Future Enhancements

- Replace `MapPlaceholder` with real digital twin map layers.
- Add live alert detail panels and operator workflows.
- Connect KPI values to backend APIs.
- Add filtering by corridor, district, asset type, and risk level.
- Add real report generation and Crisis Commander handoff flows.
