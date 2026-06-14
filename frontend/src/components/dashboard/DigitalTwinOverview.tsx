import { AegisMap } from "@/components/maps";

export function DigitalTwinOverview() {
  return (
    <section className="surface-card relative overflow-hidden rounded-md p-4 text-card-foreground">
      <div className="mb-3 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold uppercase tracking-wide text-foreground">
            India Digital Twin
          </h2>
          <p className="type-body mt-0.5">Live Network Overview</p>
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <LegendDot className="bg-[#16a34a]" label="Operational" />
          <LegendDot className="bg-[#facc15]" label="Warning" />
          <LegendDot className="bg-[#f97316]" label="At Risk" />
          <LegendDot className="bg-[#dc2626]" label="Disrupted" />
        </div>
      </div>

      <AegisMap
        title="National Infrastructure Network"
        description="OpenStreetMap digital twin with backend nodes and corridor routes."
        heightClassName="min-h-[520px]"
      />
    </section>
  );
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-full ${className}`} />
      {label}
    </span>
  );
}

