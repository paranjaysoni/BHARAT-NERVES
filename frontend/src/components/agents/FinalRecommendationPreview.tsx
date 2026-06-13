import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionCard, StatusBadge } from "@/components/shared";
import { finalRecommendation } from "@/data";

export function FinalRecommendationPreview() {
  return (
    <SectionCard
      title="Final Recommendation Preview"
      description="Governance-ready mock recommendation prepared for Crisis Commander."
      action={<StatusBadge label="Ready" variant="success" size="sm" />}
    >
      <div className="space-y-4">
        <RecommendationBlock
          label="Priority Action"
          value={finalRecommendation.priorityAction}
        />
        <RecommendationBlock label="Reasoning" value={finalRecommendation.reasoning} />
        <RecommendationBlock
          label="Expected Benefit"
          value={finalRecommendation.expectedBenefit}
        />
        <Link
          href={finalRecommendation.href}
          className="btn btn-primary"
        >
          {finalRecommendation.nextStep}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </SectionCard>
  );
}

function RecommendationBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface-inset rounded-md p-4">
      <p className="type-micro-label">
        {label}
      </p>
      <p className="mt-2 text-sm leading-5 text-foreground">{value}</p>
    </div>
  );
}
