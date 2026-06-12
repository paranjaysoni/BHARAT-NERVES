import { DataTable, SectionCard, StatusBadge } from "@/components/shared";
import type { DataTableColumn } from "@/components/shared";
import { agentRecommendations, agents } from "@/data";
import type { AgentRecommendation, ParliamentConflictLevel } from "@/types";

interface AgentRecommendationRow extends AgentRecommendation {
  agentName: string;
  priority: string;
}

const conflictVariant: Record<
  ParliamentConflictLevel,
  "success" | "warning" | "danger" | "info" | "neutral"
> = {
  high: "danger",
  low: "success",
  moderate: "warning"
};

const rows: AgentRecommendationRow[] = agentRecommendations.map((recommendation) => {
  const agent = agents.find((item) => item.id === recommendation.agentId);

  return {
    ...recommendation,
    agentName: agent?.name ?? "Unknown Agent",
    priority: agent?.priority ?? "Not specified"
  };
});

const columns: DataTableColumn<AgentRecommendationRow>[] = [
  {
    key: "agent",
    header: "Agent",
    cell: (row) => <span className="font-medium text-foreground">{row.agentName}</span>
  },
  {
    key: "priority",
    header: "Priority",
    cell: (row) => row.priority
  },
  {
    key: "recommendation",
    header: "Recommendation",
    cell: (row) => row.recommendation
  },
  {
    key: "confidence",
    header: "Confidence",
    cell: (row) => `${row.confidence}%`
  },
  {
    key: "conflict",
    header: "Conflict Level",
    cell: (row) => (
      <StatusBadge
        label={row.conflictLevel}
        variant={conflictVariant[row.conflictLevel]}
        size="sm"
      />
    )
  },
  {
    key: "status",
    header: "Status",
    cell: (row) => <StatusBadge label={row.status} variant="info" size="sm" />
  }
];

export function AgentRecommendationMatrix() {
  return (
    <SectionCard
      title="Agent Recommendation Matrix"
      description="Structured mock recommendations from every participating agent."
    >
      <DataTable
        columns={columns}
        rows={rows}
        emptyMessage="No agent recommendations available."
      />
    </SectionCard>
  );
}
