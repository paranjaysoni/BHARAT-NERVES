"use client";

import { SectionCard, StatusBadge, RiskPill } from "@/components/shared";
import type { DataTableColumn } from "@/components/shared";
import type { Report } from "@/types";

const statusVariant: Record<string, "success" | "warning" | "info" | "neutral"> = {
  published: "success",
  review: "warning",
  draft: "info",
  archived: "neutral"
};

const columns: DataTableColumn<Report>[] = [
  {
    key: "title",
    header: "Report Name",
    cell: (row) => (
      <span className="font-medium text-foreground text-sm">{row.title}</span>
    )
  },
  {
    key: "category",
    header: "Category",
    cell: (row) => (
      <span className="text-xs text-muted-foreground">{row.category}</span>
    )
  },
  {
    key: "author",
    header: "Author",
    cell: (row) => (
      <span className="text-xs text-muted-foreground">{row.author}</span>
    )
  },
  {
    key: "createdDate",
    header: "Created",
    cell: (row) => (
      <span className="text-xs text-muted-foreground tabular-nums">{row.createdDate}</span>
    )
  },
  {
    key: "status",
    header: "Status",
    cell: (row) => (
      <StatusBadge
        label={row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        variant={statusVariant[row.status]}
        size="sm"
      />
    )
  },
  {
    key: "priority",
    header: "Priority",
    cell: (row) => (
      <RiskPill level={row.priority as "low" | "medium" | "high" | "critical"} />
    )
  },
  {
    key: "version",
    header: "Version",
    cell: (row) => (
      <span className="text-xs font-mono text-muted-foreground">{row.version}</span>
    )
  }
];

interface ReportsTableProps {
  reports: Report[];
  onSelectReport?: (report: Report) => void;
  selectedReportId?: string;
}

export function ReportsTable({ reports, onSelectReport, selectedReportId }: ReportsTableProps) {
  return (
    <SectionCard
      title="All Reports"
      description={`${reports.length} reports across all operational domains`}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reports.map((row) => (
              <tr
                key={row.id}
                onClick={() => onSelectReport?.(row)}
                className={[
                  "border-b border-border transition-colors",
                  onSelectReport ? "cursor-pointer hover:bg-muted/50" : "",
                  selectedReportId === row.id ? "bg-muted/70" : ""
                ].join(" ")}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-3 py-2.5 align-middle">
                    {col.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {reports.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No reports found.
          </div>
        )}
      </div>
    </SectionCard>
  );
}
