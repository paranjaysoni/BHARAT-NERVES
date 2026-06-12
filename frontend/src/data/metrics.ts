import type { Metric } from "@/types";

export const metrics: Metric[] = [
  {
    id: "metric-resilience-score",
    label: "Resilience Score",
    value: "78",
    unit: "/100",
    trend: "stable",
    description: "Composite readiness score for the Odisha Cyclone Corridor."
  },
  {
    id: "metric-economic-impact",
    label: "Economic Impact",
    value: "₹12.4 Cr",
    trend: "up",
    description: "Estimated economic exposure across active disruption scenarios."
  },
  {
    id: "metric-population-affected",
    label: "Population Affected",
    value: "1.24M",
    trend: "up",
    description: "People potentially affected by current corridor stress conditions."
  },
  {
    id: "metric-trade-disruption",
    label: "Trade Disruption",
    value: "₹5.7 Cr",
    trend: "up",
    description: "Estimated trade value delayed or diverted due to route stress."
  },
  {
    id: "metric-carbon-impact",
    label: "Carbon Impact",
    value: "8.7K",
    unit: "tCO2",
    trend: "up",
    description: "Estimated carbon impact from rerouting and delayed freight movement."
  },
  {
    id: "metric-supply-chain-health",
    label: "Supply Chain Health",
    value: "84%",
    trend: "stable",
    description: "Current aggregate health of monitored logistics operations."
  }
];
