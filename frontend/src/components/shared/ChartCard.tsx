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
      <div className="flex min-h-56 items-center justify-center rounded-md border border-dashed border-border bg-background">
        {children}
      </div>
    </SectionCard>
  );
}
