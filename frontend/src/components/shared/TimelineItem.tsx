import clsx from "clsx";

export type TimelineStatus = "success" | "warning" | "danger" | "info" | "neutral";

export interface TimelineItemProps {
  title: string;
  description: string;
  timestamp: string;
  status?: TimelineStatus;
}

const statusClasses: Record<TimelineStatus, string> = {
  success: "border-success/25 bg-success/10 text-success",
  warning: "border-warning/30 bg-warning/10 text-warning",
  danger: "border-danger/25 bg-danger/10 text-danger",
  info: "border-info/25 bg-info/10 text-info",
  neutral: "border-primary/25 bg-primary/10 text-primary"
};

export function TimelineItem({
  title,
  description,
  timestamp,
  status = "neutral"
}: TimelineItemProps) {
  return (
    <article className="relative pl-6">
      <span
        className={clsx(
          "absolute left-0 top-1 flex h-3 w-3 rounded-full border shadow-sm before:absolute before:left-1/2 before:top-3 before:h-[calc(100%+1.5rem)] before:w-px before:-translate-x-1/2 before:bg-border",
          statusClasses[status]
        )}
      />
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="type-card-title">{title}</h3>
          <time className="type-caption">{timestamp}</time>
        </div>
        <p className="type-body mt-1">
          {description}
        </p>
      </div>
    </article>
  );
}
