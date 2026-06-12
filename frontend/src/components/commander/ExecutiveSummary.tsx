import { SectionCard, StatusBadge } from "@/components/shared";
import { executiveSummary } from "@/data";

export function ExecutiveSummary() {
  return (
    <SectionCard
      title="Crisis Commander Summary"
      description="Executive-level response brief."
      action={<StatusBadge label="Executive Brief" variant="danger" size="sm" />}
    >
      <div className="space-y-4">
        <SummaryBlock label="Summary" value={executiveSummary.summary} />
        <SummaryBlock
          label="Key Recommendation"
          value={executiveSummary.keyRecommendation}
        />
        <SummaryBlock
          label="Estimated Benefit"
          value={executiveSummary.estimatedBenefit}
        />
      </div>
    </SectionCard>
  );
}

function SummaryBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-background p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-foreground">{value}</p>
    </div>
  );
}
