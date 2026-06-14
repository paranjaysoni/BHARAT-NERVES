import { ProgressBar, SectionCard } from "@/components/shared";
import { stakeholderPriorities } from "@/data";

export function PriorityBreakdown() {
  return (
    <SectionCard
      title="Stakeholder Priority Breakdown"
      description="Agent-weighted priority scores for the current deliberation."
    >
      <div className="space-y-4">
        {stakeholderPriorities.map((priority) => (
          <ProgressBar
            key={priority.id}
            value={priority.value}
            label={priority.label}
            variant={priority.value >= 85 ? "success" : priority.value >= 70 ? "info" : "warning"}
          />
        ))}
      </div>
    </SectionCard>
  );
}
