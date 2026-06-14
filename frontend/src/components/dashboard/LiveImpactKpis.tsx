"use client";

import { ArrowUp, Building2, IndianRupee, Leaf, Target, Users } from "lucide-react";
import clsx from "clsx";
import { useSimulationStore } from "@/hooks/use-simulation-store";
import { safeNum } from "@/lib/api/client";

/**
 * Replaces the static KPI strip on Impact Dashboard when a simulation result
 * is available. Falls back to null so the static strip shows instead.
 */
export function LiveImpactKpis() {
  const store = useSimulationStore();

  if (store.phase !== "done" || !store.result) return null;

  const { impact, dashboard } = store.result;

  const economicLoss = safeNum(impact.economic?.lossAfterRecoveryCr);
  const carbonTons = safeNum(impact.carbon?.finalCarbonTons ?? dashboard.carbonImpactTons);
  const populationAffected = safeNum(impact.population?.affected ?? dashboard.populationAffected);
  const riskLevel = impact.score?.riskLevel ?? dashboard.riskLevel;

  const kpis = [
    {
      title: "Economic Impact",
      value: `₹ ${economicLoss.toFixed(1)} Cr`,
      trend: `Risk: ${riskLevel}`,
      icon: IndianRupee,
      tone: "info" as const
    },
    {
      title: "Population Affected",
      value: populationAffected.toLocaleString(),
      trend: `${dashboard.atRiskNodes} nodes at risk`,
      icon: Users,
      tone: "purple" as const
    },
    {
      title: "Infrastructure Damage",
      value: `${dashboard.disruptedRoutes} routes`,
      trend: "Routes disrupted",
      icon: Building2,
      tone: "warning" as const
    },
    {
      title: "Carbon Impact",
      value: `${carbonTons.toFixed(1)} t`,
      trend: `+${safeNum(impact.carbon?.carbonIncreasePercent ?? (carbonTons > 0 ? (carbonTons / (carbonTons + 1)) * 100 : 0)).toFixed(0)}% increase`,
      icon: Leaf,
      tone: "success" as const
    },
  ];

  const toneClasses = {
    info:    { icon: "border-primary/30 bg-primary/15 text-primary",   arrow: "text-primary"   },
    purple:  { icon: "border-violet-500/30 bg-violet-500/15 text-violet-300", arrow: "text-violet-400" },
    warning: { icon: "border-warning/30 bg-warning/15 text-warning",   arrow: "text-warning"   },
    success: { icon: "border-success/30 bg-success/15 text-success",   arrow: "text-success"   },
  };

  return (
    <div className="mb-3.5 space-y-2">
      <div className="flex items-center gap-2 text-xs text-success">
        <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
        <span className="font-semibold">Live data from simulation: {store.result.scenario.scenarioName}</span>
      </div>

      <section className="surface-card grid overflow-hidden rounded-md text-card-foreground lg:grid-cols-3 xl:grid-cols-[repeat(4,minmax(0,1fr))_216px]">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          const tone = toneClasses[kpi.tone];

          return (
            <article
              key={kpi.title}
              className={clsx("relative min-h-[104px] overflow-hidden border-border/70 px-4 py-3",
                index > 0 && "border-t lg:border-l lg:border-t-0")}
            >
              <div className="flex items-start gap-3">
                <div className={clsx("flex h-9 w-9 shrink-0 items-center justify-center rounded-md border", tone.icon)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs leading-4 text-muted-foreground">{kpi.title}</p>
                  <p className="mt-2 text-xl font-semibold leading-6 text-foreground">{kpi.value}</p>
                  <p className={clsx("mt-1 flex items-center gap-1 text-[0.7rem] leading-4", tone.arrow)}>
                    <ArrowUp className="h-3 w-3" />
                    {kpi.trend}
                  </p>
                </div>
              </div>
            </article>
          );
        })}

        {/* Resilience score cell */}
        <article className="min-h-[104px] border-t border-border/70 px-4 py-3 lg:border-l xl:border-t-0">
          <div className="mt-1 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-md border border-primary/25 bg-primary/15 text-primary">
              <Target className="h-7 w-7" />
            </div>
            <div>
              <p className="text-3xl font-semibold leading-8 text-foreground">{safeNum(impact.resilience?.after ?? dashboard.resilienceScore)}</p>
              <p className={clsx("mt-1 text-xs font-medium",
                riskLevel === "CRITICAL" ? "text-danger" :
                riskLevel === "HIGH" ? "text-warning" : "text-success")}>
                {riskLevel} Impact
              </p>
            </div>
          </div>
          <p className="mt-2 text-[0.68rem] text-muted-foreground">
            Recovery: {dashboard.recoveryTime}
          </p>
        </article>
      </section>
    </div>
  );
}
