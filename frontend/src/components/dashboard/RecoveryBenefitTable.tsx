import { DataTable, SectionCard, StatusBadge } from "@/components/shared";
import type { DataTableColumn } from "@/components/shared";
import { recoveryBenefits } from "@/data";
import type { RecoveryBenefit } from "@/types";

const columns: DataTableColumn<RecoveryBenefit>[] = [
  { key: "intervention", header: "Intervention", cell: (row) => <span className="font-medium text-foreground">{row.intervention}</span> },
  { key: "before", header: "Before", cell: (row) => row.before },
  { key: "after", header: "After", cell: (row) => row.after },
  { key: "benefit", header: "Benefit", cell: (row) => row.benefit },
  { key: "confidence", header: "Confidence", cell: (row) => <StatusBadge label={row.confidence} variant="success" size="sm" /> }
];

export function RecoveryBenefitTable() {
  return (
    <SectionCard title="Recovery Benefit Table" description="Mock before-vs-after benefits from recovery interventions.">
      <DataTable columns={columns} rows={recoveryBenefits} emptyMessage="No recovery benefits available." />
    </SectionCard>
  );
}
