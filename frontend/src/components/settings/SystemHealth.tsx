import { SectionCard, MetricCard } from "@/components/shared";
import type { SystemHealthItem } from "@/types/settings";

interface SystemHealthProps {
  items: SystemHealthItem[];
}

export function SystemHealth({ items }: SystemHealthProps) {
  return (
    <SectionCard title="System Health" description="Platform operational status indicators">
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <MetricCard
            key={item.id}
            title={item.label}
            value={item.value}
            subtitle={item.subtitle}
            status={item.status}
          />
        ))}
      </div>
    </SectionCard>
  );
}
