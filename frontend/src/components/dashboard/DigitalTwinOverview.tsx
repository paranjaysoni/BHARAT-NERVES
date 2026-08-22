"use client";

import { AegisMap } from "@/components/maps";
import { useSimulationStore } from "@/hooks/use-simulation-store";

export function DigitalTwinOverview() {
  const store = useSimulationStore();
  const hasSimulation = store.phase !== "idle" && store.result !== null;
  const progress = store.playbackProgress;

  const affectedRouteIds = hasSimulation && store.result
    ? store.result.digitalTwin.affectedRouteIds
    : [];
    
  const affectedNodeIds = hasSimulation && store.result
    ? store.result.digitalTwin.affectedNodeIds
    : [];

  return (
    <section className="surface-card relative overflow-hidden rounded-md p-4 text-card-foreground">
      <div className="mb-3 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold uppercase tracking-wide text-foreground">
            {hasSimulation ? `${store.result?.scenario.scenarioName} Digital Twin` : "India Digital Twin"}
          </h2>
          <p className="type-body mt-0.5">{hasSimulation ? "Live Simulation Network Overlay" : "Static Network Overview"}</p>
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <LegendDot className="bg-[#16a34a]" label="Operational" />
          <LegendDot className="bg-[#facc15]" label="Warning" />
          <LegendDot className="bg-[#f97316]" label="At Risk" />
          <LegendDot className="bg-[#dc2626]" label="Disrupted" />
        </div>
      </div>

      <AegisMap
        title={hasSimulation ? "Simulated Network" : "National Infrastructure Network"}
        description={hasSimulation ? "Showing impacted routes and nodes for the running simulation." : "OpenStreetMap digital twin with backend nodes and corridor routes."}
        affectedNodeIds={affectedNodeIds}
        affectedRouteIds={affectedRouteIds}
        stormPath={store.result?.scenario.stormPath}
        playbackProgress={progress}
        playbackState={store.playbackState}
        playbackSpeed={store.playbackSpeed}
        impactScore={store.result?.impact.score.impactScore}
        heightClassName="h-[320px] sm:h-[420px] lg:h-[480px] xl:h-[520px]"
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

