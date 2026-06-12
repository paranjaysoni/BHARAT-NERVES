import { SectionCard, StatusBadge } from "@/components/shared";
import { situationOverview } from "@/data";

export function SituationOverview() {
  return (
    <SectionCard
      title="Situation Overview"
      description="Current command context for the active disruption."
      action={<StatusBadge label={situationOverview.currentStatus} variant="warning" />}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <OverviewItem label="Scenario" value={situationOverview.scenario} />
        <OverviewItem label="Expected Duration" value={situationOverview.expectedDuration} />
        <OverviewList label="Affected Regions" items={situationOverview.affectedRegions} />
        <OverviewList label="Affected Nodes" items={situationOverview.affectedNodes} />
      </div>
    </SectionCard>
  );
}

function OverviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-background p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}

function OverviewList({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="rounded-md border border-border bg-background p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <ul className="mt-2 space-y-1">
        {items.map((item) => (
          <li key={item} className="text-sm text-foreground">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
