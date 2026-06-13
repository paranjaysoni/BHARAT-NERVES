import type { ReactNode } from "react";

export interface PageHeaderProps {
  title: string;
  description: string;
  actions?: ReactNode;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <p className="type-micro-label">
          Project Aegis
        </p>
        <h2 className="type-page-title mt-1">
          {title}
        </h2>
        <p className="type-body mt-1.5 max-w-3xl">
          {description}
        </p>
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </div>
  );
}
