import type { ReactNode } from "react";
import { SectionCard } from "@/components/shared/SectionCard";

export interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function ChartCard({ title, description, children }: ChartCardProps) {
  return (
    <SectionCard title={title} description={description}>
      <div className="surface-inset flex min-h-48 items-center justify-center rounded-md border-dashed bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.08),transparent_18rem)]">
        {children}
      </div>
    </SectionCard>
  );
}
