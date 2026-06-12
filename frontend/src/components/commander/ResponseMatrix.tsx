import { DataTable, SectionCard, StatusBadge } from "@/components/shared";
import type { DataTableColumn } from "@/components/shared";
import { commanderActions } from "@/data";
import type { CommanderAction, CrisisActionStatus } from "@/types";

const statusVariant: Record<CrisisActionStatus, "success" | "warning" | "danger" | "info" | "neutral"> = {
  blocked: "danger",
  "in-progress": "info",
  pending: "warning",
  prepared: "success"
};

const columns: DataTableColumn<CommanderAction>[] = [
  {
    key: "action",
    header: "Action",
    cell: (row) => <span className="font-medium text-foreground">{row.action}</span>
  },
  { key: "priority", header: "Priority", cell: (row) => row.priority },
  { key: "owner", header: "Owner", cell: (row) => row.owner },
  { key: "resource", header: "Resource", cell: (row) => row.resource },
  {
    key: "status",
    header: "Status",
    cell: (row) => (
      <StatusBadge label={row.status} variant={statusVariant[row.status]} size="sm" />
    )
  },
  {
    key: "impact",
    header: "Expected Impact",
    cell: (row) => row.expectedImpact
  }
];

export function ResponseMatrix() {
  return (
    <SectionCard
      title="Response Matrix"
      description="Mock command matrix for actions, owners, resources, and impact."
    >
      <DataTable
        columns={columns}
        rows={commanderActions}
        emptyMessage="No response actions available."
      />
    </SectionCard>
  );
}
