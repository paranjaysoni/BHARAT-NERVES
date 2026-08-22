"use client";

import type { ReactNode } from "react";
import { AlertTriangle, Boxes, Clock, Gauge, IndianRupee } from "lucide-react";
import { tradeKpis } from "@/data";
import type { SemanticStatus } from "@/types";
import { useSimulationStore } from "@/hooks/use-simulation-store";

const iconByKpiId: Record<string, ReactNode> = {
  "active-bottlenecks": <AlertTriangle className="h-4 w-4" aria-hidden="true" />,
  "supply-chain-stress": <Boxes className="h-4 w-4" aria-hidden="true" />,
  "trade-flow-index": <Gauge className="h-4 w-4" aria-hidden="true" />,
  "trade-volume": <IndianRupee className="h-4 w-4" aria-hidden="true" />,
  "transit-delay": <Clock className="h-4 w-4" aria-hidden="true" />
};

const statusTone: Record<SemanticStatus, string> = {
  danger: "border-danger/45 bg-danger/10 text-danger",
  info: "border-info/45 bg-info/10 text-info",
  neutral: "border-muted-foreground/30 bg-muted text-muted-foreground",
  success: "border-success/45 bg-success/10 text-success",
  warning: "border-warning/45 bg-warning/10 text-warning"
};

const sparkTone: Record<SemanticStatus, string> = {
  danger: "text-danger",
  info: "text-info",
  neutral: "text-muted-foreground",
  success: "text-success",
  warning: "text-warning"
};

const sparkPath: Record<string, string> = {
  "active-bottlenecks": "M2 28 L10 24 L18 26 L26 14 L34 20 L42 9 L50 18 L58 16 L66 23 L74 24",
  "supply-chain-stress": "M2 22 L10 19 L18 14 L26 17 L34 12 L42 25 L50 23 L58 20 L66 18 L74 11",
  "trade-flow-index": "M2 26 L10 25 L18 21 L26 22 L34 18 L42 15 L50 17 L58 9 L66 13 L74 7",
  "trade-volume": "M2 24 L10 21 L18 20 L26 14 L34 12 L42 18 L50 15 L58 13 L66 16 L74 12",
  "transit-delay": "M2 18 L10 16 L18 19 L26 15 L34 17 L42 14 L50 16 L58 13 L66 16 L74 18"
};

export function TradeKpiRow() {
  const store = useSimulationStore();
  const hasSimulation = store.phase !== "idle" && store.result !== null;

  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
      {tradeKpis.map((kpi) => {
        let liveValue = kpi.value;
        let liveStatus = kpi.status;
        let liveSubtitle = kpi.subtitle;

        if (hasSimulation && store.result) {
          if (kpi.id === "active-bottlenecks") {
            liveValue = String(store.result.dashboard.disruptedRoutes);
            liveStatus = store.result.dashboard.disruptedRoutes > 0 ? "danger" : "success";
            liveSubtitle = "Disrupted corridors";
          }
          if (kpi.id === "supply-chain-stress") {
            liveValue = store.result.impact.resources.logisticsStress;
            liveStatus = liveValue === "CRITICAL" ? "danger" : liveValue === "HIGH" ? "warning" : "success";
            liveSubtitle = "Logistics stress";
          }
          if (kpi.id === "transit-delay") {
            liveValue = `+${store.result.impact.delay.finalDelayHours} hrs`;
            liveStatus = store.result.impact.delay.finalDelayHours > 24 ? "danger" : "warning";
            liveSubtitle = "Average disruption";
          }
          if (kpi.id === "trade-volume") {
            liveValue = `₹${store.result.dashboard.economicExposureCr} Cr`;
            liveStatus = "danger";
            liveSubtitle = "Economic exposure";
          }
          // trade-flow-index remains mock because we don't simulate it
          if (kpi.id === "trade-flow-index") {
            liveSubtitle = "(Unmodeled metric)";
            liveStatus = "neutral";
          }
        }

        return (
          <article
            key={kpi.id}
            className="surface-card group relative overflow-hidden rounded-md p-4 transition duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_16px_32px_rgb(15_23_42/0.14)]"
          >
            <div
              className={`absolute inset-x-0 top-0 h-0.5 ${
                liveStatus === "success"
                  ? "bg-success"
                  : liveStatus === "warning"
                    ? "bg-warning"
                    : liveStatus === "danger"
                      ? "bg-danger"
                      : "bg-info"
              }`}
            />
            <div className="flex items-start justify-between gap-3">
              <div className={`rounded-md border p-2 ${statusTone[liveStatus]}`}>
                {iconByKpiId[kpi.id]}
              </div>
              <MiniSparkline
                path={sparkPath[kpi.id] ?? sparkPath["trade-flow-index"]}
                tone={sparkTone[liveStatus]}
              />
            </div>
            <div className="mt-3">
              <p className="type-micro-label">{kpi.title}</p>
              <p className="mt-1 text-2xl font-semibold leading-7 text-card-foreground">
                {liveValue}
              </p>
              <p className={`mt-2 text-xs font-medium ${sparkTone[liveStatus]}`}>
                {liveSubtitle}
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
}

function MiniSparkline({ path, tone }: { path: string; tone: string }) {
  return (
    <svg
      className={`mt-8 h-8 w-20 shrink-0 opacity-90 ${tone}`}
      viewBox="0 0 76 32"
      fill="none"
      aria-hidden="true"
    >
      <path d={path} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d={`${path} L74 32 L2 32 Z`} fill="currentColor" opacity="0.12" />
    </svg>
  );
}
