import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionCard } from "@/components/shared";
import { controlRoomQuickActions } from "@/data";

export function QuickActions() {
  return (
    <SectionCard
      title="Quick Actions"
      description="Visual operator shortcuts. No backend action is triggered."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {controlRoomQuickActions.map((action) => (
          <Link
            key={action.id}
            href={action.href}
            className="group rounded-md border border-border bg-background p-4 transition-colors hover:bg-secondary"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {action.label}
                </p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {action.description}
                </p>
              </div>
              <ArrowRight
                className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </div>
          </Link>
        ))}
      </div>
    </SectionCard>
  );
}
