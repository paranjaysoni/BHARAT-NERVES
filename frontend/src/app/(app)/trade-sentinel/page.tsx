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

      <section className="grid min-h-0 gap-4 xl:grid-cols-[minmax(520px,1.22fr)_minmax(360px,0.95fr)_minmax(320px,0.82fr)]">
        <TradeNetworkOverview />
        <TopTradeCorridors />
        <TradeAlertsPanel />
      </section>

      <section className="grid min-h-0 gap-4 xl:grid-cols-[minmax(260px,0.95fr)_minmax(360px,1.1fr)_minmax(300px,0.95fr)_minmax(320px,1.05fr)]">
        <CommodityBreakdown />
        <PortStatusPanel />
        <SupplyChainHealthPanel />
        <TradeRecentActivity />
      </section>
    </div>
  );
}
