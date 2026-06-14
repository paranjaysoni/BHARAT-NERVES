import { AegisMap, type HeatZone } from "@/components/maps";
import { SectionCard, StatusBadge } from "@/components/shared";
import { geographicImpact } from "@/data";

const geographicHeatZones: HeatZone[] = [
  {
    id: "geo-odisha-coastal",
    name: "Coastal Odisha",
    latitude: 20.16,
    longitude: 86.48,
    level: "HIGH",
    radiusKm: 86
  },
  {
    id: "geo-kendrapara",
    name: "Kendrapara Cluster",
    latitude: 20.5,
    longitude: 86.42,
    level: "CRITICAL",
    radiusKm: 42
  },
  {
    id: "geo-puri",
    name: "Puri Relief Zone",
    latitude: 19.81,
    longitude: 85.83,
    level: "MEDIUM",
    radiusKm: 48
  }
];

export function GeographicImpactPanel() {
  return (
    <SectionCard
      title="Geographic Impact"
      description={geographicImpact.description}
      action={<StatusBadge label="OpenStreetMap" variant="info" size="sm" />}
    >
      <div className="space-y-4">
        <AegisMap
          title={geographicImpact.title}
          description="Affected districts, high-risk zones, and stress clusters on the shared digital twin map."
          heatZones={geographicHeatZones}
          showImpactLegend
          heightClassName="min-h-64"
          compactMarkers
        />
        <div className="grid gap-3 md:grid-cols-3">
          <ListBlock title="Affected Districts" items={geographicImpact.affectedDistricts} />
          <ListBlock title="High-Risk Zones" items={geographicImpact.highRiskZones} />
          <ListBlock title="Stress Clusters" items={geographicImpact.stressClusters} />
        </div>
      </div>
    </SectionCard>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-md border border-border bg-background p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="text-sm text-foreground">{item}</li>
        ))}
      </ul>
    </div>
  );
}
