import clsx from "clsx";

export type MapPlaceholderVariant = "default" | "corridor" | "risk";

export interface MapPlaceholderProps {
  title: string;
  description: string;
  variant?: MapPlaceholderVariant;
}

const variantClasses: Record<MapPlaceholderVariant, string> = {
  default: "from-secondary to-background",
  corridor: "from-info/20 to-background",
  risk: "from-warning/20 to-background"
};

export function MapPlaceholder({
  title,
  description,
  variant = "default"
}: MapPlaceholderProps) {
  return (
    <div
      className={clsx(
        "relative min-h-80 overflow-hidden rounded-lg border border-border bg-gradient-to-br p-6 text-card-foreground",
        variantClasses[variant]
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:32px_32px] opacity-30" />
      <div className="absolute left-10 top-12 h-3 w-3 rounded-full bg-primary" />
      <div className="absolute right-16 top-20 h-3 w-3 rounded-full bg-success" />
      <div className="absolute bottom-16 left-1/3 h-3 w-3 rounded-full bg-warning" />
      <div className="absolute bottom-12 right-1/4 h-3 w-3 rounded-full bg-info" />
      <div className="relative z-10 flex h-full min-h-72 flex-col justify-end">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Digital Twin Placeholder
        </p>
        <h3 className="mt-2 text-xl font-semibold text-foreground">{title}</h3>
        <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
