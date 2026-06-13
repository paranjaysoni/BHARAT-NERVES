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
        "rounded-md border border-border bg-card p-4 text-card-foreground lg:p-5",
        className
      )}
    >
      {title || description || action ? (
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            {title ? <h3 className="text-base font-semibold">{title}</h3> : null}
            {description ? (
              <p className="mt-1 text-sm leading-5 text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      ) : null}
      <div className="text-sm leading-5 text-muted-foreground">{children}</div>
    </section>
  );
}
