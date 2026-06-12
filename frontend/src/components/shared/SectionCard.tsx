import type { ReactNode } from "react";

type SectionCardProps = {
  title?: string;
  children: ReactNode;
};

export function SectionCard({ title, children }: SectionCardProps) {
  return (
    <section className="rounded-lg border border-border bg-card p-6 text-card-foreground">
      {title ? <h3 className="mb-3 text-base font-semibold">{title}</h3> : null}
      <div className="text-sm leading-6 text-muted-foreground">{children}</div>
    </section>
  );
}
