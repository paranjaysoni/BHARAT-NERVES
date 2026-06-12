import { SectionCard, StatusBadge } from "@/components/shared";
import type { SecurityItem } from "@/types/settings";
import { ShieldAlert } from "lucide-react";

interface SecurityOverviewProps {
  items: SecurityItem[];
}

const statusVariant: Record<string, "success" | "warning" | "danger" | "neutral"> = {
  active: "success",
  partial: "warning",
  inactive: "neutral"
};

const statusLabel: Record<string, string> = {
  active: "Active",
  partial: "Partial",
  inactive: "Inactive"
};

export function SecurityOverview({ items }: SecurityOverviewProps) {
  return (
    <SectionCard title="Security Overview" description="Platform security configuration status">
      <div className="space-y-3">
        <div className="flex items-center gap-2 rounded-lg border border-warning/30 bg-warning/5 p-3">
          <ShieldAlert className="h-4 w-4 shrink-0 text-warning" />
          <p className="text-xs text-foreground">
            Demo environment. Security features are not configured for production use.
          </p>
        </div>

        <div className="divide-y divide-border rounded-lg border border-border overflow-hidden">
          {items.map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-3 bg-card px-4 py-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.value}</p>
              </div>
              <StatusBadge
                label={statusLabel[item.status]}
                variant={statusVariant[item.status]}
                size="sm"
              />
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
