import {
  CommodityBreakdown,
  PortStatusPanel,
  SupplyChainHealthPanel,
  TopTradeCorridors,
  TradeAlertsPanel,
  TradeKpiRow,
  TradeNetworkOverview,
  TradeRecentActivity
} from "@/components/dashboard";

export default function TradeSentinelPage() {
  return (
    <div className="grid min-h-0 gap-4">
      <TradeKpiRow />

      <section className="grid min-h-0 gap-4 lg:grid-cols-2 xl:grid-cols-[minmax(0,1.22fr)_minmax(0,0.95fr)_minmax(0,0.82fr)]">
        <TradeNetworkOverview />
        <TopTradeCorridors />
        <TradeAlertsPanel />
      </section>

      <section className="grid min-h-0 gap-4 sm:grid-cols-2 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.1fr)_minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <CommodityBreakdown />
        <PortStatusPanel />
        <SupplyChainHealthPanel />
        <TradeRecentActivity />
      </section>
    </div>
  );
}
