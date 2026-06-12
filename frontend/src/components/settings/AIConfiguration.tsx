import { SectionCard, StatusBadge } from "@/components/shared";
import { Brain, AlertCircle } from "lucide-react";

interface AIConfigurationProps {
  primaryModel: string;
  backupModel: string;
  agentCount: number;
  responseFormat: string;
  aiStatus: string;
  note: string;
}

export function AIConfiguration({
  primaryModel,
  backupModel,
  agentCount,
  responseFormat,
  aiStatus,
  note
}: AIConfigurationProps) {
  const rows = [
    { label: "Primary Model", value: primaryModel },
    { label: "Backup Model", value: backupModel },
    { label: "Agent Count", value: String(agentCount) },
    { label: "Response Format", value: responseFormat }
  ];

  return (
    <SectionCard title="AI Configuration" description="Agent model settings and operational mode">
      <div className="space-y-4">
        <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3">
          <Brain className="h-8 w-8 shrink-0 text-info" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">AI Platform</p>
            <p className="text-xs text-muted-foreground">Bharat Nerves Multi-Agent System</p>
          </div>
          <StatusBadge label={aiStatus} variant="warning" size="sm" />
        </div>

        <div className="divide-y divide-border rounded-lg border border-border overflow-hidden">
          {rows.map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between bg-card px-4 py-2.5">
              <span className="text-xs text-muted-foreground">{label}</span>
              <span className="text-sm font-medium text-foreground">{value}</span>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-2 rounded-lg border border-warning/30 bg-warning/5 p-3">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0 text-warning" />
          <p className="text-xs text-foreground leading-relaxed">{note}</p>
        </div>
      </div>
    </SectionCard>
  );
}
