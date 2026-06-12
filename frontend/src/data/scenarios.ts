import type { Scenario } from "@/types";

export const scenarios: Scenario[] = [
  {
    id: "scenario-cyclone-landfall",
    title: "Cyclone Landfall",
    description:
      "Severe cyclone landfall near the Odisha coast with high wind exposure across coastal districts.",
    severity: "critical",
    affectedNodes: [
      "node-paradip-port",
      "node-puri-hub",
      "node-relief-bravo",
      "node-kendrapara-hub"
    ],
    impactSummary:
      "Port operations slow down, coastal relief demand rises, and Puri-Kendrapara routes require monitoring."
  },
  {
    id: "scenario-port-shutdown",
    title: "Port Shutdown",
    description:
      "Temporary shutdown at Paradip Port due to surge risk and berth safety restrictions.",
    severity: "high",
    affectedNodes: ["node-paradip-port", "node-cuttack-warehouse"],
    impactSummary:
      "Trade throughput shifts toward Dhamra and inland warehousing pressure increases near Cuttack."
  },
  {
    id: "scenario-highway-blockage",
    title: "Highway Blockage",
    description:
      "Partial blockage on a coastal highway segment after flooding and debris accumulation.",
    severity: "moderate",
    affectedNodes: [
      "node-khurda-road-junction",
      "node-puri-hub",
      "node-relief-bravo"
    ],
    impactSummary:
      "Relief movement toward Puri slows and alternate routes via Khurda require prioritization."
  },
  {
    id: "scenario-warehouse-fire",
    title: "Warehouse Fire",
    description:
      "Contained fire incident at a regional warehouse requiring inventory diversion and safety checks.",
    severity: "high",
    affectedNodes: ["node-cuttack-warehouse", "node-scb-medical-college"],
    impactSummary:
      "Emergency supplies are diverted to Bhubaneswar while Cuttack dispatch capacity is reduced."
  }
];
