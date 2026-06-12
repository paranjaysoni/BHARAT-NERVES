import { DataTable, SectionCard, StatusBadge } from "@/components/shared";
import type { DataTableColumn } from "@/components/shared";
import type { Resource, ResourceStatus } from "@/types";

interface ResourcesTableProps {
  resources: Resource[];
}

const statusVariant: Record<
  ResourceStatus,
  "success" | "warning" | "danger" | "info" | "neutral"
> = {
  ready: "success",
  mocked: "info",
  planned: "warning",
  static: "neutral",
  review: "warning"
};

const columns: DataTableColumn<Resource>[] = [
  {
    key: "title",
    header: "Resource Name",
    cell: (resource) => (
      <div>
        <p className="font-medium text-foreground">{resource.title}</p>
        <p className="text-xs text-muted-foreground">{resource.format}</p>
      </div>
    )
  },
  {
    key: "type",
    header: "Type",
    cell: (resource) => <span className="capitalize">{resource.type}</span>
  },
  {
    key: "category",
    header: "Category",
    cell: (resource) => resource.category
  },
  {
    key: "owner",
    header: "Owner",
    cell: (resource) => resource.owner
  },
  {
    key: "updatedDate",
    header: "Last Updated",
    cell: (resource) => resource.updatedDate
  },
  {
    key: "status",
    header: "Status",
    cell: (resource) => (
      <StatusBadge
        label={resource.status}
        variant={statusVariant[resource.status]}
        size="sm"
      />
    )
  },
  {
    key: "source",
    header: "Source",
    cell: (resource) => resource.source
  }
];

export function ResourcesTable({ resources }: ResourcesTableProps) {
  return (
    <SectionCard
      title="Resources Table"
      description="Centralized inventory of mock datasets, maps, policy documents and MVP assets."
    >
      <DataTable
        columns={columns}
        rows={resources}
        emptyMessage="No resources are available yet."
      />
    </SectionCard>
  );
}
