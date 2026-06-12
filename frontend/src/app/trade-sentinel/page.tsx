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
    <div className="space-y-8">
      <PageHeader
        title={tradeSentinelPage.title}
        description={tradeSentinelPage.description}
        actions={<StatusBadge label="Monitoring Active" variant="success" />}
      />

      <TradeKpiRow />

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(340px,0.85fr)]">
        <TradeNetworkOverview />
        <aside className="space-y-6">
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
