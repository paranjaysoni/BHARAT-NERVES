import { SectionCard, StatusBadge, RiskPill } from "@/components/shared";
import type { Report } from "@/types";
import { FileText, CheckCircle, Lightbulb, Calendar, User } from "lucide-react";

interface ReportPreviewProps {
  report: Report | null;
}

const statusVariant: Record<string, "success" | "warning" | "info" | "neutral"> = {
  published: "success",
  review: "warning",
  draft: "info",
  archived: "neutral"
};

export function ReportPreview({ report }: ReportPreviewProps) {
  if (!report) {
    return (
      <SectionCard title="Report Preview">
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <FileText className="h-10 w-10 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">
            Select a report from the table to preview its contents.
          </p>
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="Report Preview"
      action={
        <div className="flex items-center gap-2">
          <StatusBadge
            label={report.status.charAt(0).toUpperCase() + report.status.slice(1)}
            variant={statusVariant[report.status]}
            size="sm"
          />
          <RiskPill level={report.priority as "low" | "medium" | "high" | "critical"} />
        </div>
      }
    >
      <div className="space-y-5">
        <div>
          <h3 className="text-base font-bold text-foreground leading-tight">{report.title}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {report.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {report.createdDate}
            </span>
            <span className="rounded bg-muted px-2 py-0.5 font-mono">{report.version}</span>
            <span className="text-muted-foreground/70">·</span>
            <span>{report.category}</span>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <h4 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <FileText className="h-3.5 w-3.5" />
            Executive Summary
          </h4>
          <p className="text-sm text-foreground leading-relaxed">{report.executiveSummary}</p>
        </div>

        <div>
          <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <CheckCircle className="h-3.5 w-3.5" />
            Key Findings
          </h4>
          <ul className="space-y-2">
            {report.keyFindings.map((finding, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-info" />
                {finding}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Lightbulb className="h-3.5 w-3.5" />
            Recommendations
          </h4>
          <ul className="space-y-2">
            {report.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionCard>
  );
}
