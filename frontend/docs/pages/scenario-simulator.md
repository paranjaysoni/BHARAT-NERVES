# Scenario Simulator

The Scenario Simulator is a frontend skeleton page for selecting and previewing predefined crisis and logistics disruption scenarios.

## Page Purpose

The page lets operators visually inspect mock scenarios that may later trigger Digital Twin overlays, Self-Healing Supply Chain workflows, Trade Sentinel analysis, AI Parliament debate, Crisis Commander actions, and Impact Dashboard reporting.

No real simulation engine runs in this issue.

## Scenario List

The current predefined scenarios are:

- Cyclone Landfall
- Port Shutdown
- Highway Blockage
- Warehouse Fire

Each scenario comes from centralized mock data and includes severity, affected nodes, impact summary, and additional simulator preview estimates.

## Layout Structure

- Top section: `PageHeader` with `Simulation Ready` status badge.
- Main left section: scenario card grid, impact preview panel, and simulation timeline preview.
- Right section: selected scenario details, visual simulation controls, and expected impact summary.
- Bottom section: scenario comparison table and future enhancements note.

The layout is responsive:

- Desktop: scenario grid and preview beside a right-side details panel.
- Tablet: stacked cards with preserved hierarchy.
- Mobile: single-column layout.

## Components Used

- `PageHeader`
- `StatusBadge`
- `ScenarioCard`
- `SectionCard`
- `MetricCard`
- `MapPlaceholder`
- `TimelineItem`
- `DataTable`
- `EmptyState`

Scenario-specific composition components live in `src/components/scenario/`:

- `ScenarioSimulatorDashboard`
- `ScenarioGrid`
- `SelectedScenarioPanel`
- `SimulationControls`
- `ImpactPreview`
- `ScenarioTimeline`
- `ExpectedImpactSummary`
- `ScenarioComparisonTable`

## Data Sources Used

The page consumes centralized mock data from `src/data/`:

- `scenarios`
- `scenarioSimulationImpacts`
- `scenarioTimelineSteps`
- `scenarioSimulatorPage`

## Current Limitations

- Scenario selection uses local React state only.
- Control buttons update local UI state only.
- No backend APIs.
- No live data fetching.
- No NetworkX routing.
- No real simulation calculations.
- No real AI logic.
- No real map integration.

## Future Enhancements

- Connect scenario activation to a real simulation engine.
- Add route impact and rerouting calculation.
- Add real map layers for affected districts, nodes, and routes.
- Connect Trade Sentinel delay estimation.
- Send selected scenarios to AI Parliament and Crisis Commander workflows.
- Persist scenario runs and compare historical outcomes.
