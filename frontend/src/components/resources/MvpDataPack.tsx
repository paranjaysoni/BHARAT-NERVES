import { PackageCheck } from "lucide-react";

import { SectionCard } from "@/components/shared";
import type { MvpDataPackItem } from "@/data";

interface MvpDataPackProps {
  items: MvpDataPackItem[];
}

export function MvpDataPack({ items }: MvpDataPackProps) {
  return (
    <SectionCard
      title="MVP Data Pack"
      description="Odisha Cyclone Corridor"
      action={<PackageCheck className="h-5 w-5 text-primary" aria-hidden="true" />}
    >
      <p className="mb-4 text-sm leading-6 text-muted-foreground">
        The current prototype is powered by a structured mock pack for judges,
        demos and teammate review.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-md border border-border bg-background p-3"
          >
            <p className="text-lg font-semibold text-foreground">{item.value}</p>
            <p className="text-xs text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
