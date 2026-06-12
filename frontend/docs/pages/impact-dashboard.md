# Impact Dashboard

The Impact Dashboard is the analytics page for Project Aegis / Bharat Nerves Platform.

## Page Purpose

The page shows the measurable impact of a disruption and the expected benefit of Project Aegis recovery actions. It is designed to make the platform feel measurable, serious, and decision-grade.

It answers:

- How much damage is expected?
- How many people are affected?
- Which sectors are impacted?
- How much impact can recovery actions avoid?
- What is the before-vs-after recovery picture?

## Role Inside Project Aegis

Impact Dashboard is the measurement layer. It translates crisis scenarios, trade disruption, population risk, carbon exposure, and recovery actions into an analytics view for executive decisions and later reporting.

## Metrics Shown

- Economic Impact
- Population Affected
- Infrastructure Damage
- Trade Disruption
- Carbon Impact
- Recovery Savings
- Resilience before and after recovery
- District-level impact
- Recovery intervention benefits

## Layout Structure

- Top section: `PageHeader` with `Impact Model Ready` status.
- KPI row: six impact metrics.
- Main left section: impact over time chart, recovery comparison chart, sector breakdown chart, and geographic placeholder.
- Right section: impact summary, risk distribution, resilience recovery score, and key insights.
- Bottom section: district impact table, recovery benefit table, and forecast notes.

## Components Used

- `PageHeader`
- `MetricCard`
- `ChartCard`
- Recharts chart primitives
- `MapPlaceholder`
- `ProgressBar`
- `RiskPill`
- `StatusBadge`
- `DataTable`
- `SectionCard`

## Data Sources Used

The page consumes centralized mock data from `src/data/impact.ts`:

- `impactKpis`
- `impactOverTime`
- `recoveryComparison`
- `sectorImpactBreakdown`
- `geographicImpact`
- `impactSummary`
- `impactRiskDistribution`
- `impactInsights`
- `districtImpacts`
- `recoveryBenefits`
- `forecastNotes`

## Current Limitations

- No backend APIs.
- No real calculations.
- No real forecasting.
- No real AI.
- No live data fetching.
- No simulation execution.
- No real map integration.

## Future Real Calculation Plan

Future versions should connect the page to a real impact engine that receives scenario outputs, route status, population exposure, trade data, and carbon assumptions.

Recommended path:

1. Define backend impact calculation contracts.
2. Connect scenario and commander outputs to the impact model.
3. Replace static chart datasets with API responses.
4. Add confidence intervals and assumptions metadata.
5. Support report export from validated impact results.
