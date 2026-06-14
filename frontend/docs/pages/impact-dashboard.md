# Impact Dashboard

## Purpose

The Impact Dashboard is the executive analytics command layer for Bharat Nerves. It visualizes national disruption impact across economic, population, infrastructure, trade, environmental, geographic, sector, and forecast dimensions.

The current implementation is a static MVP UI refinement that matches the approved reference composition. It does not call APIs or calculate live impact.

## Layout Hierarchy

The page is implemented in `frontend/src/app/impact-dashboard/page.tsx` and follows this structure:

1. Page header: `IMPACT DASHBOARD` with the subtitle `Track, analyze and visualize real-time impact across all dimensions`.
2. Top KPI strip: five metric cards plus an export / impact score card.
3. Row 2: `IMPACT HEATMAP`, `IMPACT OVER TIME`, and `SECTOR WISE IMPACT`.
4. Row 3: `IMPACT BY STATE (Top 5)`, `IMPACT BY DIMENSION`, and `KEY INSIGHTS`.
5. Row 4: `IMPACT FORECAST` and `Forecast Summary`.

No legacy report sections are rendered.

## Component Hierarchy

The page is composed from local page-level components:

- `KpiStrip`
- `ImpactHeatmap`
- `ImpactOverTime`
- `SectorWiseImpact`
- `ImpactByState`
- `ImpactByDimension`
- `KeyInsights`
- `ImpactForecast`
- `ForecastSummary`
- `Panel`
- `PanelLink`
- `Sparkline`
- `HeatBlob`
- `LegendItem`

Shared shell components remain unchanged:

- `PageHeader`
- App sidebar
- App top navigation
- Bharat Nerves theme tokens from `globals.css`

## Removed Sections

The refinement intentionally removed the older MVP/report sections:

- Impact Summary card
- Risk Distribution card
- Recovery Score card
- Before vs After Recovery chart
- Geographic Impact placeholder
- State/District Impact table
- Recovery Benefit table
- Forecast Notes
- Large data tables
- Placeholder map panels
- Duplicate analytics widgets

## Added Sections

The final dashboard adds reference-matched executive panels:

- Impact KPI strip with tiny sparklines
- Static India impact heatmap
- Seven-day impact line chart
- Sector-wise donut chart
- Top five state impact table
- Dimension score progress bars
- Compact key insights cards
- Multi-line seven-day impact forecast
- Forecast summary card with action button

## Charts And Visualizations

- KPI sparklines are inline SVG paths.
- Impact heatmap is a static SVG India-style map with heat blobs, state-boundary strokes, and a five-level legend.
- Impact over time is an inline SVG line chart with date labels and a highlighted current score.
- Sector wise impact uses a CSS conic-gradient donut with percentage labels.
- Impact by dimension uses horizontal progress bars.
- Impact forecast uses an inline SVG multi-line chart for high, medium, and low impact projections.

## Mock Data Structures

Mock data is currently declared in `frontend/src/app/impact-dashboard/page.tsx` to keep the reference-specific MVP composition self-contained:

- `kpis`
- `sectorRows`
- `stateRows`
- `dimensionRows`
- `insights`

These are static presentation datasets only. Existing centralized data in `frontend/src/data/impact.ts` remains available for future productized wiring but is not used by the refined reference page.

## Navigation

The route remains:

- `/impact-dashboard`

The existing Bharat Nerves sidebar and top navigation remain unchanged.

## Future Integration Notes

Future implementation can replace the page-local mock arrays with real impact model outputs:

- Scenario and Crisis Commander outputs
- State and district exposure models
- Infrastructure damage models
- Trade disruption and port logistics data
- Environmental impact assumptions
- Forecast model results with confidence intervals
- Export report generation

The first integration step should define a typed view model that matches the current page sections, then hydrate these panels from API responses without changing the layout hierarchy.

## Design Decisions

- The page favors high-density executive analytics over long-form reporting.
- Visual hierarchy is led by the heatmap and impact score.
- Tables are limited to the compact top-five state summary.
- Color usage stays within Bharat Nerves dark navy tokens plus existing semantic accents.
- All panels use existing `surface-card`, border, typography, and spacing conventions.

## Responsive Behavior

The layout is optimized for MacBook-class screens:

- 1440x900
- 1512x982

Large screens use three-panel analytics rows and a two-panel forecast row. Smaller screens naturally collapse through CSS grid behavior while preserving section order.

## Known MVP Limitations

- Static mock data only.
- No backend API calls.
- No GIS engine.
- No real export implementation.
- No live forecast model.
- No user-configurable time range beyond the visual selector.
- No drill-down behavior behind action buttons.
