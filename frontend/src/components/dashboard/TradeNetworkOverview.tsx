import { AegisMap } from "@/components/maps";
import { SectionCard } from "@/components/shared";

export function TradeNetworkOverview() {
  return (
    <SectionCard
      title="Trade Flow Map"
      description="Ports, road corridors, rail movement, and port links from the backend static data layer."
      action={
        <div className="hidden items-center gap-3 text-xs text-muted-foreground md:flex">
          <LegendDot label="Road" tone="bg-[#60a5fa]" />
          <LegendDot label="Rail" tone="bg-[#a78bfa]" />
          <LegendDot label="Port Links" tone="bg-[#38bdf8]" />
        </div>
      }
      className="overflow-hidden p-0 lg:p-0"
    >
      <AegisMap
        title="India Trade Network"
        description="Backend routes rendered as OpenStreetMap corridors."
        heightClassName="h-[300px] sm:h-[380px] lg:h-[430px]"
        nodeTypes={["PORT", "WAREHOUSE", "RAIL_HUB", "FUEL_DEPOT", "DISTRICT_HUB", "COMMAND_CENTER"]}
        routeTypes={["ROAD", "RAIL", "PORT_LINK"]}
        compactMarkers
      />
    </SectionCard>
  );
}

function LegendDot({ label, tone }: { label: string; tone: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-full ${tone}`} />
      {label}
    </span>
  );
}
