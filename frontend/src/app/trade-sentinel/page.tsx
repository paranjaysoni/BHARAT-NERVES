import {
  CommodityBreakdown,
  FutureRiskIndicators,
  PortStatusPanel,
  ShipmentDelayTable,
  TradeAlertsPanel,
  TradeCorridorHealthSummary,
  TradeKpiRow,
  TradeNetworkOverview
} from "@/components/dashboard";
import { PageHeader, StatusBadge } from "@/components/shared";
import { tradeSentinelPage } from "@/data";

export default function TradeSentinelPage() {
  return (
    <div className="app-page-stack">
      <PageHeader
        title={tradeSentinelPage.title}
        description={tradeSentinelPage.description}
        actions={<StatusBadge label="Monitoring Active" variant="success" />}
      />

      <TradeKpiRow />

      <section className="app-section-grid xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.85fr)]">
        <TradeNetworkOverview />
        <aside className="app-column-stack">
          <TradeAlertsPanel />
          <PortStatusPanel />
          <FutureRiskIndicators />
        </aside>
      </section>

      <ShipmentDelayTable />
      <CommodityBreakdown />
      <TradeCorridorHealthSummary />
    </div>
  );
}
