import type { ReactNode } from "react";
import clsx from "clsx";

export interface SectionCardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}

export function SectionCard({
  title,
  description,
  children,
  className,
  action
}: SectionCardProps) {
  return (
    <section
      className={clsx(
        "rounded-lg border border-border bg-card p-6 text-card-foreground",
        className
      )}
    >
      {title || description || action ? (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title ? <h3 className="text-base font-semibold">{title}</h3> : null}
            {description ? (
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      ) : null}
      <div className="text-sm leading-6 text-muted-foreground">{children}</div>
    </section>
  );
}
