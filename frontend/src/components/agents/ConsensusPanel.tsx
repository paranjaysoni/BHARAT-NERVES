import type { ReactNode } from "react";
import { Gauge } from "lucide-react";
import { MetricCard, ProgressBar, SectionCard, StatusBadge } from "@/components/shared";
import { parliamentConsensus } from "@/data";

export function ConsensusPanel() {
  return (
    <SectionCard
      title="Consensus Score"
      description="Structured mock consensus for human review."
    >
      <div className="space-y-4">
        <MetricCard
          title="Consensus Score"
          value={`${parliamentConsensus.consensusScore}%`}
          subtitle="Agent alignment across recommendations"
          icon={<Gauge className="h-4 w-4" aria-hidden="true" />}
          status="success"
        />
        <ProgressBar
          value={parliamentConsensus.consensusScore}
          label="Consensus readiness"
          variant="success"
        />
        <div className="grid gap-3">
          <PanelRow label="Decision Readiness">
            <StatusBadge
              label={parliamentConsensus.decisionReadiness}
              variant="success"
              size="sm"
            />
          </PanelRow>
          <PanelRow label="Conflict Level">
            <StatusBadge
              label={parliamentConsensus.conflictLevel}
              variant="warning"
              size="sm"
            />
          </PanelRow>
          <PanelRow label="Human Review Needed">
            <StatusBadge
              label={parliamentConsensus.humanReviewNeeded ? "Yes" : "No"}
              variant={parliamentConsensus.humanReviewNeeded ? "info" : "success"}
              size="sm"
            />
          </PanelRow>
        </div>
      </div>
    </SectionCard>
  );
}

function PanelRow({
  label,
  children
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-border bg-background p-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}
