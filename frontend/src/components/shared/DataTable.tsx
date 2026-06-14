import type { ReactNode } from "react";
import { EmptyState } from "./EmptyState";
import { TableSkeleton } from "./Skeletons";

export interface DataTableColumn<T extends object> {
  key: string;
  header: string;
  cell: (row: T) => ReactNode;
}

export interface DataTableProps<T extends object> {
  columns: DataTableColumn<T>[];
  rows: T[];
  emptyMessage: string;
  maxHeight?: string;
  isLoading?: boolean;
}

export function DataTable<T extends object>({
  columns,
  rows,
  emptyMessage,
  maxHeight = "calc(100vh - 22rem)",
  isLoading = false
}: DataTableProps<T>) {
  if (isLoading) {
    return <TableSkeleton rows={6} />;
  }

  if (rows.length === 0) {
    return (
      <EmptyState
        compact
        title="No Data Found"
        description={emptyMessage}
        action={<button className="btn btn-outline">Clear Filters</button>}
      />
    );
  }

  return (
    <div className="surface-card overflow-hidden rounded-md">
      <div className="overflow-auto" style={{ maxHeight }}>
        <table className="min-w-full divide-y divide-border text-sm">
          <thead className="sticky top-0 z-10 border-b border-border-strong bg-surface-strong text-secondary-foreground shadow-sm">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="type-micro-label px-3 py-2.5 text-left"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row, index) => (
              <tr
                key={index}
                className="text-card-foreground transition-colors duration-200 ease-out hover:bg-secondary/55"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-3 py-2.5 text-muted-foreground">
                    {column.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
