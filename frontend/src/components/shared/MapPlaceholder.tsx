import clsx from "clsx";

export type MapPlaceholderVariant = "default" | "corridor" | "risk";

export interface MapPlaceholderProps {
  title: string;
  description: string;
  variant?: MapPlaceholderVariant;
}

const variantClasses: Record<MapPlaceholderVariant, string> = {
  default: "from-surface-strong via-card to-background",
  corridor: "from-info/15 via-card to-background",
  risk: "from-warning/15 via-card to-background"
};

export function MapPlaceholder({
  title,
  description,
  variant = "default"
}: MapPlaceholderProps) {
  return (
    <div
      className={clsx(
        "surface-card relative min-h-64 overflow-hidden rounded-md bg-gradient-to-br p-4 text-card-foreground lg:p-5",
        variantClasses[variant]
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:32px_32px] opacity-35" />
      <div className="absolute left-10 top-12 h-3 w-3 rounded-full border border-primary/30 bg-primary shadow-[0_0_0_5px_hsl(var(--primary)/0.12)]" />
      <div className="absolute right-16 top-20 h-3 w-3 rounded-full border border-success/30 bg-success shadow-[0_0_0_5px_hsl(var(--success)/0.12)]" />
      <div className="absolute bottom-16 left-1/3 h-3 w-3 rounded-full border border-warning/30 bg-warning shadow-[0_0_0_5px_hsl(var(--warning)/0.12)]" />
      <div className="absolute bottom-12 right-1/4 h-3 w-3 rounded-full border border-info/30 bg-info shadow-[0_0_0_5px_hsl(var(--info)/0.12)]" />
      <div className="relative z-10 flex h-full min-h-56 flex-col justify-end">
        <p className="type-micro-label">
          Digital Twin Placeholder
        </p>
        <h3 className="mt-1.5 text-lg font-semibold leading-6 text-foreground">{title}</h3>
        <p className="type-body mt-1.5 max-w-lg">
          {description}
        </p>
      </div>
    </div>
  );
}
