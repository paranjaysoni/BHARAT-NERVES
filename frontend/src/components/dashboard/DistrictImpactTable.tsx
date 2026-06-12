import { DataTable, SectionCard, StatusBadge } from "@/components/shared";
import type { DataTableColumn } from "@/components/shared";
import { districtImpacts } from "@/data";
import type { DistrictImpact } from "@/types";

const statusVariant: Record<DistrictImpact["status"], "success" | "warning" | "danger" | "info" | "neutral"> = {
  critical: "danger",
  stable: "success",
  stressed: "warning",
  watch: "info"
};

const columns: DataTableColumn<DistrictImpact>[] = [
  { key: "district", header: "District", cell: (row) => <span className="font-medium text-foreground">{row.district}</span> },
  { key: "populationRisk", header: "Population Risk", cell: (row) => row.populationRisk },
  { key: "medicalRisk", header: "Medical Risk", cell: (row) => row.medicalRisk },
  { key: "logisticsStress", header: "Logistics Stress", cell: (row) => row.logisticsStress },
  { key: "economicExposure", header: "Economic Exposure", cell: (row) => row.economicExposure },
  { key: "status", header: "Status", cell: (row) => <StatusBadge label={row.status} variant={statusVariant[row.status]} size="sm" /> }
];

export function DistrictImpactTable() {
  return (
    <SectionCard title="State/District Impact Table" description="Mock district-level impact posture.">
      <DataTable columns={columns} rows={districtImpacts} emptyMessage="No district impact data available." />
    </SectionCard>
  );
}
