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
        "surface-card rounded-md p-4 text-card-foreground lg:p-5",
        className
      )}
    >
      {title || description || action ? (
        <div className="mb-3 flex items-start justify-between gap-3 border-b border-border/70 pb-3">
          <div>
            {title ? <h3 className="type-section-title">{title}</h3> : null}
            {description ? (
              <p className="type-body mt-1">
                {description}
              </p>
            ) : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      ) : null}
      <div className="type-body">{children}</div>
    </section>
  );
}
