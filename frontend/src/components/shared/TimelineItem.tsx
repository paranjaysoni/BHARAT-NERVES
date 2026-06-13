import clsx from "clsx";

export type TimelineStatus = "success" | "warning" | "danger" | "info" | "neutral";

export interface TimelineItemProps {
  title: string;
  description: string;
  timestamp: string;
  status?: TimelineStatus;
}

const statusClasses: Record<TimelineStatus, string> = {
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
  neutral: "bg-primary"
};

export function TimelineItem({
  title,
  description,
  timestamp,
  status = "neutral"
}: TimelineItemProps) {
  return (
    <article className="relative pl-5">
      <span
        className={clsx(
          "absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full",
          statusClasses[status]
        )}
      />
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <time className="text-xs text-muted-foreground">{timestamp}</time>
        </div>
        <p className="mt-1 text-sm leading-5 text-muted-foreground">
          {description}
        </p>
      </div>
    </article>
  );
}
