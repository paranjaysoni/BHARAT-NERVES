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
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Project Aegis
        </p>
        <h2 className="mt-1 text-2xl font-semibold tracking-normal text-foreground lg:text-[1.65rem]">
          {title}
        </h2>
        <p className="mt-1.5 max-w-3xl text-sm leading-5 text-muted-foreground">
          {description}
        </p>
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </div>
  );
}
