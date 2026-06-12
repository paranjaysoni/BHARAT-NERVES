# Trade Sentinel

Trade Sentinel is the supply-chain intelligence dashboard for Project Aegis / Bharat Nerves Platform.

## Page Purpose

The page monitors mock trade corridor health, port pressure, shipment delays, bottlenecks, and future risk indicators. It is a frontend skeleton that demonstrates how the trade intelligence layer may look before real data integrations exist.

It visually answers:

- Which trade corridors are under stress?
- Are ports operating normally?
- Which shipments are delayed?
- Where are bottlenecks forming?
- What future risks are emerging?

## Trade Sentinel Role

Inside Project Aegis, Trade Sentinel is planned as the monitoring layer between the Digital Twin, logistics network, and Crisis Commander. It will later consume real port, route, shipment, and commodity signals. In this issue, all values are typed mock data.

## Layout Structure

- Top section: `PageHeader` with `Monitoring Active` status.
- KPI row: trade flow, supply chain stress, transit delay, bottlenecks, and port health.
- Main section: trade network map placeholder and trade flow trend placeholder beside alerts, port status, and future risk cards.
- Bottom section: shipment delay table, commodity breakdown, and corridor health summary.

The layout is responsive:

- Desktop: KPI row, map/chart center, right-side intelligence panel, tables below.
- Tablet: stacked dashboard sections.
- Mobile: single-column layout.

## Components Used

- `PageHeader`
- `MetricCard`
- `MapPlaceholder`
- `ChartCard`
- `AlertCard`
- `SectionCard`
- `StatusBadge`
- `RiskPill`
- `ProgressBar`
- `DataTable`

Dashboard-specific composition components live in `src/components/dashboard/`:

- `TradeKpiRow`
- `TradeNetworkOverview`
- `TradeAlertsPanel`
- `PortStatusPanel`
- `FutureRiskIndicators`
- `ShipmentDelayTable`
- `CommodityBreakdown`
- `TradeCorridorHealthSummary`

## Data Sources Used

The page consumes centralized mock data from `src/data/`:

- `tradeKpis`
- `tradeAlerts`
- `portStatuses`
- `futureRiskIndicators`
- `shipments`
- `commodityBreakdown`
- `tradeCorridorHealth`
- `tradeFlowTrend`
- `nodes`
- `routes`

## Current Limitations

- No backend APIs.
- No real trade data APIs.
- No live port data.
- No live shipment feeds.
- No real map integration.
- No AI logic.
- No simulation logic.
- No carbon calculation engine.
- No business calculations.
- No live data fetching.

## Future Enhancements

- Connect real port and shipment feeds.
- Replace `MapPlaceholder` with trade corridor map layers.
- Replace chart placeholder with Recharts or a richer analytics component.
- Add corridor, commodity, and shipment filters.
- Add alert drilldowns and bottleneck detail panels.
- Connect Trade Sentinel insights to Crisis Commander and reports.
