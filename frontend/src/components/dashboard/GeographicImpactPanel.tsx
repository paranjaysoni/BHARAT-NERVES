import { MapPlaceholder, SectionCard, StatusBadge } from "@/components/shared";
import { geographicImpact } from "@/data";

export function GeographicImpactPanel() {
  return (
    <SectionCard
      title="Geographic Impact Placeholder"
      description={geographicImpact.description}
      action={<StatusBadge label="No live map" variant="info" size="sm" />}
    >
      <div className="space-y-4">
        <MapPlaceholder
          title={geographicImpact.title}
          description="Affected districts, high-risk zones, and stress clusters are represented as a placeholder until real map layers are added."
          variant="risk"
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
