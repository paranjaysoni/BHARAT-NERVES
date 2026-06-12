import { DataTable, SectionCard, StatusBadge } from "@/components/shared";
import type { DataTableColumn } from "@/components/shared";
import { shipments } from "@/data";
import type { Shipment, ShipmentPriority, ShipmentStatus } from "@/types";

const priorityVariant: Record<ShipmentPriority, "success" | "warning" | "danger" | "info" | "neutral"> = {
  critical: "danger",
  high: "warning",
  low: "neutral",
  medium: "info"
};

const statusVariant: Record<ShipmentStatus, "success" | "warning" | "danger" | "info" | "neutral"> = {
  "at-risk": "warning",
  delayed: "danger",
  "on-time": "success",
  rerouted: "info"
};

const columns: DataTableColumn<Shipment>[] = [
  {
    key: "id",
    header: "Shipment ID",
    cell: (shipment) => (
      <span className="font-medium text-foreground">{shipment.id}</span>
    )
  },
  {
    key: "origin",
    header: "Origin",
    cell: (shipment) => shipment.origin
  },
  {
    key: "destination",
    header: "Destination",
    cell: (shipment) => shipment.destination
  },
  {
    key: "priority",
    header: "Priority",
    cell: (shipment) => (
      <StatusBadge
        label={shipment.priority}
        variant={priorityVariant[shipment.priority]}
        size="sm"
      />
    )
  },
  {
    key: "delay",
    header: "Delay",
    cell: (shipment) => shipment.delay
  },
  {
    key: "status",
    header: "Status",
    cell: (shipment) => (
      <StatusBadge
        label={shipment.status}
        variant={statusVariant[shipment.status]}
        size="sm"
      />
    )
  }
];

export function ShipmentDelayTable() {
  return (
    <SectionCard
      title="Shipment Delay Table"
      description="Dummy shipment delay register for future trade operations workflows."
    >
      <DataTable
        columns={columns}
        rows={shipments}
        emptyMessage="No delayed shipments available."
      />
    </SectionCard>
  );
}
