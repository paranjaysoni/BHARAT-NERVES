import clsx from "clsx";
import { SectionCard } from "@/components/shared";
import { controlRoomActivityItems } from "@/data";
import type { ControlRoomActivityItem } from "@/data";

const statusTone: Record<ControlRoomActivityItem["status"], string> = {
  danger: "bg-danger",
  info: "bg-info",
  neutral: "bg-primary",
  success: "bg-success",
  warning: "bg-warning"
};

export function RecentActivity() {
  return (
    <SectionCard
      title="Live Operations Feed"
      description="Decision and monitoring events from the command loop."
      className="h-full"
    >
      <div className="max-h-[208px] space-y-2 overflow-auto pr-1">
        {controlRoomActivityItems.map((item) => (
          <article
            key={item.id}
            className="rounded-md border border-border bg-background/70 px-3 py-2 transition-colors hover:border-border-strong hover:bg-secondary/45"
          >
            <div className="flex items-start gap-3">
              <span
                className={clsx(
                  "mt-1 h-2 w-2 shrink-0 rounded-full",
                  statusTone[item.status]
                )}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  <time className="shrink-0 text-[0.68rem] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                    {item.timestamp}
                  </time>
                </div>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
