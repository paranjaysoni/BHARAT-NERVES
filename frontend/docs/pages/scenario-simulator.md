# Scenario Simulator

The Scenario Simulator is the Project Aegis crisis simulation lab for selecting and previewing predefined logistics and disaster disruption scenarios.

## Page Purpose

The page lets operators visually inspect mock scenarios that may later trigger Digital Twin overlays, Self-Healing Supply Chain workflows, Trade Sentinel analysis, AI Parliament debate, Crisis Commander actions, and Impact Dashboard reporting.

No real simulation engine runs in this issue.

## MVP Refinement

Issue #18 transforms the page from a scenario form/dashboard into a professional simulation command center. The page follows the attached reference structure: scenario selection across the top, simulation overview, scenario intelligence on the left, a dominant impact preview map in the center, and controls/results along the bottom.

## Simulation Workflow

1. Operator selects a scenario card.
2. Simulation overview updates with predicted impact, affected nodes, affected routes, estimated economic loss, and recovery time.
3. Scenario details and impact summary explain the event context.
4. Impact Preview map shows affected routes, nodes, risk zones, and cyclone/disruption indicators.
5. Simulation Controls provide visual-only speed, progression, run, pause, and reset controls.
6. Results Preview summarizes estimated outcomes for executive review.

## Visual Hierarchy

Attention order:

1. Selected scenario
2. Impact Preview map
3. Predicted impact overview
4. Simulation controls
5. Results preview

The Impact Preview map is the hero surface and should visually explain what happens if the selected scenario occurs.

## Scenario Storytelling Strategy

- Scenario cards show icon, name, short description, location, and action.
- Selected scenario state is visually prominent.
- The map renders Odisha-focused infrastructure with nodes, routes, affected links, risk pulses, legend, and cyclone visualization.
- Left-side details expose type, severity, location, predicted time, weather conditions, and confidence score.
- Impact summary compresses affected ports, warehouses, hospitals, relief centers, population, supply chain disruption, and economic impact.
- Results preview makes economic loss, carbon impact, recovery time, and service disruption immediately visible.

## Scenario List

The current predefined scenarios are:

- Cyclone Landfall
- Port Shutdown
- Highway Blockage
- Warehouse Fire

Each scenario comes from centralized mock data and includes severity, affected nodes, impact summary, and additional simulator preview estimates.

## Layout Structure

- Top: route-specific Scenario Simulator header in the global topbar.
- Scenario row: premium simulator cards and compact Simulation Overview.
- Main: Scenario Details + Impact Summary on the left, large Impact Preview map in the center.
- Bottom: Simulation Controls and Results Preview.

The layout is responsive:

- Desktop: reference-aligned simulation command center with the map as the hero.
- Tablet: stacked cards with preserved hierarchy.
- Mobile: single-column layout.

## Components Used

- `PageHeader`
- `StatusBadge`
- `RiskPill`

Scenario-specific composition components live in `src/components/scenario/`:

- `ScenarioSimulatorDashboard`

## Data Sources Used

The page consumes centralized mock data from `src/data/`:

- `scenarios`
- `scenarioSimulationImpacts`
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

Issue #18 Complete.

## Future Enhancements

- Connect scenario activation to a real simulation engine.
- Add route impact and rerouting calculation.
- Add real map layers for affected districts, nodes, and routes.
- Connect Trade Sentinel delay estimation.
- Send selected scenarios to AI Parliament and Crisis Commander workflows.
- Persist scenario runs and compare historical outcomes.
