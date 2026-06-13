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
  maxHeight?: string;
}

export function DataTable<T extends object>({
  columns,
  rows,
  emptyMessage,
  maxHeight = "calc(100vh - 22rem)"
}: DataTableProps<T>) {
  if (rows.length === 0) {
    return (
      <div className="surface-inset rounded-md border-dashed p-6 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </div>
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
                className="text-card-foreground transition-colors duration-150 hover:bg-secondary/55"
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
