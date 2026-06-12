import type {
  ApprovalStatus,
  CommandTimelineItem,
  CommanderAction,
  CommanderChecklistItem,
  CrisisKpi,
  CrisisRiskItem,
  ExecutiveSummary,
  ExpectedOutcome,
  ResourceDeployment,
  SituationOverview
} from "@/types";

export const crisisKpis: CrisisKpi[] = [
  {
    id: "crisis-severity",
    title: "Crisis Severity",
    value: "High",
    subtitle: "Cyclone-linked corridor disruption",
    status: "danger"
  },
  {
    id: "decision-readiness",
    title: "Decision Readiness",
    value: "High",
    subtitle: "AI Parliament consensus prepared",
    status: "success"
  },
  {
    id: "population-risk",
    title: "Population Risk",
    value: "1.24M",
    subtitle: "Mock exposed population",
    status: "warning"
  },
  {
    id: "economic-exposure",
    title: "Economic Exposure",
    value: "₹12.4 Cr",
    subtitle: "Estimated scenario exposure",
    status: "warning"
  },
  {
    id: "recovery-confidence",
    title: "Recovery Confidence",
    value: "82%",
    subtitle: "Response plan readiness",
    status: "info"
  }
];

export const situationOverview: SituationOverview = {
  scenario: "Cyclone Landfall - Odisha Corridor",
  currentStatus: "High Risk",
  affectedRegions: ["Puri", "Balasore", "Bhubaneswar"],
  affectedNodes: [
    "Paradip Port",
    "Bhubaneswar Warehouse",
    "Medical Relief Corridor"
  ],
  expectedDuration: "48 Hours"
};

export const commanderActions: CommanderAction[] = [
  {
    id: "action-medical-supplies",
    priority: "Priority 1",
    action: "Deploy medical supplies to hospitals",
    owner: "Humanitarian Response Cell",
    resource: "Medical Supply Trucks",
    status: "prepared",
    expectedImpact: "Protect critical care continuity"
  },
  {
    id: "action-alternate-freight",
    priority: "Priority 2",
    action: "Activate alternate freight corridor",
    owner: "Logistics Command",
    resource: "Alternate Inland Route",
    status: "in-progress",
    expectedImpact: "Preserve high-priority freight movement"
  },
  {
    id: "action-delay-cargo",
    priority: "Priority 3",
    action: "Delay low-priority industrial cargo",
    owner: "Trade Sentinel Desk",
    resource: "Cargo Prioritization Queue",
    status: "prepared",
    expectedImpact: "Reduce congestion for relief movement"
  },
  {
    id: "action-relief-centers",
    priority: "Priority 4",
    action: "Prepare relief centers",
    owner: "District Relief Cell",
    resource: "Emergency Relief Kits",
    status: "pending",
    expectedImpact: "Increase shelter readiness"
  },
  {
    id: "action-monitor-routes",
    priority: "Priority 5",
    action: "Monitor coastal logistics routes",
    owner: "Infrastructure Watch",
    resource: "Route Status Desk",
    status: "prepared",
    expectedImpact: "Detect cascading transport risk"
  }
];

export const resourceDeployments: ResourceDeployment[] = [
  {
    id: "resource-medical-trucks",
    resource: "Medical Supply Trucks",
    availability: "18 available",
    assignedStatus: "Assigned",
    deploymentRegion: "Puri, Balasore",
    riskLevel: "high"
  },
  {
    id: "resource-relief-kits",
    resource: "Emergency Relief Kits",
    availability: "26.1K kits",
    assignedStatus: "Ready",
    deploymentRegion: "Puri shelters",
    riskLevel: "medium"
  },
  {
    id: "resource-fuel-reserves",
    resource: "Fuel Reserves",
    availability: "12.6M litres",
    assignedStatus: "Standby",
    deploymentRegion: "Bhubaneswar staging",
    riskLevel: "medium"
  },
  {
    id: "resource-response-teams",
    resource: "Mobile Response Teams",
    availability: "9 teams",
    assignedStatus: "Assigned",
    deploymentRegion: "Coastal corridor",
    riskLevel: "high"
  },
  {
    id: "resource-warehouse-capacity",
    resource: "Warehouse Capacity",
    availability: "72%",
    assignedStatus: "Reserved",
    deploymentRegion: "Bhubaneswar, Cuttack",
    riskLevel: "low"
  }
];

export const executiveSummary: ExecutiveSummary = {
  summary:
    "A severe cyclone scenario is expected to impact Odisha coastal logistics. Immediate medical prioritization and alternate freight routing are recommended to reduce population risk and economic disruption.",
  keyRecommendation:
    "Prioritize medical supply movement through Bhubaneswar inland staging while delaying low-priority industrial cargo.",
  estimatedBenefit:
    "Protects hospitals and relief centers, reduces logistics congestion, and preserves high-priority trade movement."
};

export const crisisRiskItems: CrisisRiskItem[] = [
  { id: "risk-logistics", label: "Logistics Risk", value: 78, riskLevel: "high" },
  { id: "risk-medical", label: "Medical Risk", value: 72, riskLevel: "high" },
  { id: "risk-trade", label: "Trade Risk", value: 64, riskLevel: "medium" },
  {
    id: "risk-infrastructure",
    label: "Infrastructure Risk",
    value: 69,
    riskLevel: "high"
  },
  {
    id: "risk-environmental",
    label: "Environmental Risk",
    value: 48,
    riskLevel: "medium"
  }
];

export const approvalStatus: ApprovalStatus = {
  decisionPrepared: "Decision Prepared",
  aiParliamentConsensus: "82%",
  executiveReview: "Pending",
  humanApproval: "Required",
  responseStatus: "Ready for Execution"
};

export const commandTimeline: CommandTimelineItem[] = [
  {
    id: "timeline-scenario-activated",
    title: "Scenario Activated",
    description: "Cyclone Landfall - Odisha Corridor command context opened.",
    timestamp: "08:00",
    status: "success"
  },
  {
    id: "timeline-trade-warning",
    title: "Trade Sentinel Warning Issued",
    description: "Port congestion and freight delay warnings escalated.",
    timestamp: "08:15",
    status: "warning"
  },
  {
    id: "timeline-parliament-consensus",
    title: "AI Parliament Consensus Generated",
    description: "Mock multi-agent recommendation prepared for commander review.",
    timestamp: "08:30",
    status: "info"
  },
  {
    id: "timeline-plan-prepared",
    title: "Response Plan Prepared",
    description: "Resource deployment and route priority plan assembled.",
    timestamp: "08:45",
    status: "success"
  },
  {
    id: "timeline-approval",
    title: "Awaiting Executive Approval",
    description: "Human approval required before execution.",
    timestamp: "09:00",
    status: "neutral"
  }
];

export const expectedOutcomes: ExpectedOutcome[] = [
  {
    id: "outcome-economic-loss",
    title: "Economic Loss Reduced",
    value: "₹4.8 Cr",
    subtitle: "Mock avoided exposure",
    status: "success"
  },
  {
    id: "outcome-population-protected",
    title: "Population Protected",
    value: "920K",
    subtitle: "Citizens prioritized by response plan",
    status: "success"
  },
  {
    id: "outcome-routes-preserved",
    title: "Supply Routes Preserved",
    value: "6",
    subtitle: "High-priority route links maintained",
    status: "info"
  },
  {
    id: "outcome-recovery-time",
    title: "Recovery Time Improved",
    value: "18 hrs",
    subtitle: "Estimated response acceleration",
    status: "info"
  },
  {
    id: "outcome-carbon-managed",
    title: "Carbon Impact Managed",
    value: "3.1K tCO2",
    subtitle: "Lower-emission alternate routing",
    status: "warning"
  }
];

export const commanderChecklist: CommanderChecklistItem[] = [
  {
    id: "check-medical-allocation",
    label: "Medical supply allocation complete",
    status: "complete"
  },
  {
    id: "check-route-identified",
    label: "Alternate route identified",
    status: "complete"
  },
  {
    id: "check-relief-centers",
    label: "Relief centers activated",
    status: "complete"
  },
  {
    id: "check-executive-approval",
    label: "Executive approval pending",
    status: "pending"
  },
  {
    id: "check-deployment-initiation",
    label: "Deployment initiation pending",
    status: "pending"
  }
];
