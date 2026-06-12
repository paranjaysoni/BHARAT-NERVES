export interface ScenarioSimulationImpact {
  scenarioId: string;
  status: string;
  affectedDistricts: string[];
  blockedRoutes: string[];
  highRiskNodes: string[];
  expectedStressIncrease: string;
  estimatedDelay: string;
  estimatedEconomicImpact: string;
  estimatedCarbonImpact: string;
  populationRisk: string;
  resilienceDrop: string;
  recommendedResponse: string;
}

export interface ScenarioTimelineStep {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: "success" | "warning" | "danger" | "info" | "neutral";
}

export const scenarioSimulationImpacts: ScenarioSimulationImpact[] = [
  {
    scenarioId: "scenario-cyclone-landfall",
    status: "Ready to preview",
    affectedDistricts: ["Jagatsinghpur", "Kendrapara", "Puri"],
    blockedRoutes: ["Paradip to Kendrapara", "Bhubaneswar to Puri"],
    highRiskNodes: ["Paradip Port", "Puri Hub", "Relief Center Bravo"],
    expectedStressIncrease: "+34%",
    estimatedDelay: "+6h 20m",
    estimatedEconomicImpact: "₹12.4 Cr",
    estimatedCarbonImpact: "8.7K tCO2",
    populationRisk: "1.24M",
    resilienceDrop: "-18 pts",
    recommendedResponse: "Crisis Commander"
  },
  {
    scenarioId: "scenario-port-shutdown",
    status: "Ready to preview",
    affectedDistricts: ["Jagatsinghpur", "Cuttack", "Bhadrak"],
    blockedRoutes: ["Paradip to Cuttack", "Dhamra to Paradip"],
    highRiskNodes: ["Paradip Port", "Cuttack Warehouse"],
    expectedStressIncrease: "+26%",
    estimatedDelay: "+4h 10m",
    estimatedEconomicImpact: "₹9.8 Cr",
    estimatedCarbonImpact: "5.3K tCO2",
    populationRisk: "420K",
    resilienceDrop: "-12 pts",
    recommendedResponse: "Trade Sentinel"
  },
  {
    scenarioId: "scenario-highway-blockage",
    status: "Ready to preview",
    affectedDistricts: ["Khordha", "Puri"],
    blockedRoutes: ["Khurda to Puri", "Bhubaneswar to Puri"],
    highRiskNodes: ["Khurda Road Junction", "Puri Hub"],
    expectedStressIncrease: "+21%",
    estimatedDelay: "+3h 45m",
    estimatedEconomicImpact: "₹4.6 Cr",
    estimatedCarbonImpact: "3.1K tCO2",
    populationRisk: "680K",
    resilienceDrop: "-9 pts",
    recommendedResponse: "Impact Dashboard"
  },
  {
    scenarioId: "scenario-warehouse-fire",
    status: "Ready to preview",
    affectedDistricts: ["Cuttack", "Khordha"],
    blockedRoutes: ["Cuttack to SCB", "Cuttack to Bhubaneswar"],
    highRiskNodes: ["Cuttack Warehouse", "SCB Medical College"],
    expectedStressIncrease: "+18%",
    estimatedDelay: "+2h 50m",
    estimatedEconomicImpact: "₹3.9 Cr",
    estimatedCarbonImpact: "2.4K tCO2",
    populationRisk: "310K",
    resilienceDrop: "-7 pts",
    recommendedResponse: "Crisis Commander"
  }
];

export const scenarioTimelineSteps: ScenarioTimelineStep[] = [
  {
    id: "timeline-scenario-selected",
    title: "Scenario selected",
    description: "Operator selects a predefined disruption scenario.",
    timestamp: "Step 01",
    status: "success"
  },
  {
    id: "timeline-risk-engine-trigger",
    title: "Risk engine receives trigger",
    description: "Future risk engine would receive the selected scenario context.",
    timestamp: "Step 02",
    status: "info"
  },
  {
    id: "timeline-digital-twin-routes",
    title: "Digital Twin marks affected routes",
    description: "Future map layer would highlight affected nodes and corridors.",
    timestamp: "Step 03",
    status: "warning"
  },
  {
    id: "timeline-trade-delay",
    title: "Trade Sentinel estimates delay",
    description: "Future trade intelligence would estimate logistics delay exposure.",
    timestamp: "Step 04",
    status: "warning"
  },
  {
    id: "timeline-commander-awaits",
    title: "Crisis Commander awaits activation",
    description: "Future command workflow would prepare response recommendations.",
    timestamp: "Step 05",
    status: "neutral"
  }
];
