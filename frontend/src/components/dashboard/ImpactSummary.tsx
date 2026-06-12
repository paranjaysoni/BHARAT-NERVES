import { SectionCard, StatusBadge } from "@/components/shared";
import { impactSummary } from "@/data";

export function ImpactSummary() {
  return (
    <SectionCard
      title="Impact Summary"
      description="High-level mock impact narrative for executive review."
      action={<StatusBadge label={`${impactSummary.recoveryReduction} reduced`} variant="success" size="sm" />}
    >
      <p className="text-sm leading-6 text-foreground">{impactSummary.summary}</p>
    </SectionCard>
  );
}
