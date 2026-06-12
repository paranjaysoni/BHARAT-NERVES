import { ProgressBar, SectionCard, StatusBadge } from "@/components/shared";
import { impactSummary } from "@/data";

export function ResilienceRecoveryScore() {
  return (
    <SectionCard
      title="Resilience Recovery Score"
      description="Before-vs-after mock resilience movement."
      action={<StatusBadge label={`+${impactSummary.improvement}`} variant="success" size="sm" />}
    >
      <div className="space-y-5">
        <ScoreRow label="Before Recovery" value={impactSummary.resilienceBefore} variant="warning" />
        <ScoreRow label="After Recovery" value={impactSummary.resilienceAfter} variant="success" />
      </div>
    </SectionCard>
  );
}

function ScoreRow({
  label,
  value,
  variant
}: {
  label: string;
  value: number;
  variant: "success" | "warning";
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold text-foreground">{value}/100</span>
      </div>
      <ProgressBar value={value} variant={variant} />
    </div>
  );
}
