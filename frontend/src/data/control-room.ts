export type HealthRiskLevel = "low" | "medium" | "high" | "critical";

export interface ControlRoomHealthItem {
  id: string;
  label: string;
  value: number;
  riskLevel: HealthRiskLevel;
  description: string;
}

export interface ControlRoomQuickAction {
  id: string;
  label: string;
  description: string;
  href: string;
}

export interface ControlRoomActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: "success" | "warning" | "danger" | "info" | "neutral";
}

export const controlRoomHealthItems: ControlRoomHealthItem[] = [
  {
    id: "health-logistics-stress",
    label: "Logistics Stress",
    value: 68,
    riskLevel: "high",
    description: "Port staging and coastal freight routes need close monitoring."
  },
  {
    id: "health-medical-stress",
    label: "Medical Stress",
    value: 42,
    riskLevel: "medium",
    description: "Hospital capacity is stable with watch status near Cuttack."
  },
  {
    id: "health-trade-stress",
    label: "Trade Stress",
    value: 61,
    riskLevel: "high",
    description: "Paradip delays are increasing trade exposure."
  },
  {
    id: "health-carbon-stress",
    label: "Carbon Stress",
    value: 36,
    riskLevel: "medium",
    description: "Rerouting is raising corridor emissions moderately."
  },
  {
    id: "health-infrastructure-risk",
    label: "Infrastructure Risk",
    value: 54,
    riskLevel: "medium",
    description: "Coastal assets remain functional with watch-level exposure."
  }
];

export const controlRoomQuickActions: ControlRoomQuickAction[] = [
  {
    id: "action-open-scenario-simulator",
    label: "Open Scenario Simulator",
    description: "Compare disruption scenarios against current corridor posture.",
    href: "/scenario-simulator"
  },
  {
    id: "action-review-trade-sentinel",
    label: "Review Trade Sentinel",
    description: "Inspect trade and route stress signals.",
    href: "/trade-sentinel"
  },
  {
    id: "action-view-crisis-commander",
    label: "View Crisis Commander",
    description: "Prepare response options for operator review.",
    href: "/crisis-commander"
  },
  {
    id: "action-generate-report",
    label: "Generate Report",
    description: "Open report workspace for executive-ready summaries.",
    href: "/reports"
  }
];

export const controlRoomActivityItems: ControlRoomActivityItem[] = [
  {
    id: "activity-risk-scan-completed",
    title: "Risk scan completed",
    description: "Latest resilience scan finished for Odisha Cyclone Corridor.",
    timestamp: "11:42 AM",
    status: "success"
  },
  {
    id: "activity-corridor-health-updated",
    title: "Corridor health updated",
    description: "Node and route status refreshed for coastal districts.",
    timestamp: "11:28 AM",
    status: "info"
  },
  {
    id: "activity-trade-delay-warning",
    title: "Trade Sentinel issued delay warning",
    description: "Paradip outbound cargo movement marked as delayed.",
    timestamp: "11:15 AM",
    status: "warning"
  },
  {
    id: "activity-ai-parliament-prepared",
    title: "AI Parliament session prepared",
    description: "Policy, logistics, and humanitarian perspectives queued.",
    timestamp: "10:55 AM",
    status: "neutral"
  }
];

export const controlRoomFeaturedNodeIds = [
  "node-paradip-port",
  "node-bhubaneswar-warehouse",
  "node-cuttack-warehouse",
  "node-aiims-bhubaneswar",
  "node-puri-hub",
  "node-relief-bravo"
];
