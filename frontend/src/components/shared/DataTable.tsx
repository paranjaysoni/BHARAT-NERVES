import type { ReactNode } from "react";

export interface DataTableColumn<T extends object> {
  key: string;
  header: string;
  cell: (row: T) => ReactNode;
}

export interface DataTableProps<T extends object> {
  columns: DataTableColumn<T>[];
  rows: T[];
  emptyMessage: string;
}

export function DataTable<T extends object>({
  columns,
  rows,
  emptyMessage
}: DataTableProps<T>) {
  if (rows.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-border bg-background p-6 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border text-sm">
          <thead className="bg-secondary text-secondary-foreground">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-4 py-3 text-left font-medium"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row, index) => (
              <tr key={index} className="text-card-foreground">
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 text-muted-foreground">
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
