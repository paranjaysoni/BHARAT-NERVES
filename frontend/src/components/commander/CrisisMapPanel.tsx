"use client";

import { useSimulationStore } from "@/hooks/use-simulation-store";
import { AegisMap } from "@/components/maps";

export function CrisisMapPanel() {
  const store = useSimulationStore();

  const affectedNodeIds =
    store.phase === "done" && store.result
      ? store.result.digitalTwin.affectedNodeIds
      : [];

  const affectedRouteIds =
    store.phase === "done" && store.result
      ? [
          ...store.result.digitalTwin.affectedRouteIds,
          ...store.result.digitalTwin.blockedRouteIds,
        ]
      : [];

  return (
    <AegisMap
      title="Crisis Digital Twin"
      description={
        store.phase === "done" && store.result
          ? `Live overlay: ${store.result.scenario.scenarioName}`
          : "Real-time infrastructure and threat overlay"
      }
      affectedNodeIds={affectedNodeIds}
      affectedRouteIds={affectedRouteIds}
      heightClassName="h-[385px]"
      showRoutes
      showLegend
      showImpactLegend={store.phase === "done"}
      stats
    />
  );
}
