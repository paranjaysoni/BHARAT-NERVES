import { SectionCard, StatusBadge } from "@/components/shared";
import { approvalStatus } from "@/data";

export function ApprovalStatus() {
  return (
    <SectionCard
      title="Approval Status"
      description="Command status before execution."
    >
      <div className="space-y-3">
        <StatusRow label="Decision" value={approvalStatus.decisionPrepared} variant="success" />
        <StatusRow
          label="AI Parliament Consensus"
          value={approvalStatus.aiParliamentConsensus}
          variant="info"
        />
        <StatusRow
          label="Executive Review"
          value={approvalStatus.executiveReview}
          variant="warning"
        />
        <StatusRow
          label="Human Approval"
          value={approvalStatus.humanApproval}
          variant="danger"
        />
        <StatusRow
          label="Response Status"
          value={approvalStatus.responseStatus}
          variant="success"
        />
      </div>
    </SectionCard>
  );
}

function StatusRow({
  label,
  value,
  variant
}: {
  label: string;
  value: string;
  variant: "success" | "warning" | "danger" | "info" | "neutral";
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-border bg-background p-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <StatusBadge label={value} variant={variant} size="sm" />
    </div>
  );
}
