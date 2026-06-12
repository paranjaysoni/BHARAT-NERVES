import type {
  AgentRecommendation,
  FinalRecommendation,
  ParliamentConsensus,
  ParliamentSession,
  ParliamentTimelineItem,
  StakeholderPriority
} from "@/types";

export const parliamentSession: ParliamentSession = {
  currentScenario: "Cyclone Landfall - Odisha Corridor",
  sessionStatus: "Prepared",
  participatingAgents: 8,
  primaryDecisionQuestion:
    "Which routes and resources should be prioritized first?",
  expectedOutput: "Recovery recommendation for Crisis Commander"
};

export const agentRecommendations: AgentRecommendation[] = [
  {
    agentId: "agent-infrastructure-guardian",
    recommendation:
      "Restore inland road redundancy and protect Paradip-Cuttack logistics continuity.",
    confidence: 84,
    conflictLevel: "moderate",
    status: "prepared"
  },
  {
    agentId: "agent-environment-sentinel",
    recommendation:
      "Prefer lower-emission inland routes unless critical medical urgency overrides.",
    confidence: 78,
    conflictLevel: "moderate",
    status: "reviewing"
  },
  {
    agentId: "agent-humanitarian-advocate",
    recommendation:
      "Prioritize hospitals and flood shelters before industrial cargo movement.",
    confidence: 92,
    conflictLevel: "low",
    status: "aligned"
  },
  {
    agentId: "agent-economic-strategist",
    recommendation:
      "Reduce trade loss by preserving Paradip-to-Bhubaneswar alternate corridor.",
    confidence: 81,
    conflictLevel: "moderate",
    status: "prepared"
  },
  {
    agentId: "agent-logistics-optimizer",
    recommendation:
      "Route high-priority supplies through Bhubaneswar inland staging before coastal dispatch.",
    confidence: 88,
    conflictLevel: "low",
    status: "aligned"
  },
  {
    agentId: "agent-risk-analyst",
    recommendation:
      "Monitor cascading risk across port congestion, hospital demand, and road saturation.",
    confidence: 86,
    conflictLevel: "moderate",
    status: "prepared"
  },
  {
    agentId: "agent-tech-innovator",
    recommendation:
      "Deploy predictive route-status dashboards and automated alert triage for operators.",
    confidence: 74,
    conflictLevel: "low",
    status: "reviewing"
  },
  {
    agentId: "agent-policy-advisor",
    recommendation:
      "Convert route priority into district-ready operating orders with clear escalation rules.",
    confidence: 83,
    conflictLevel: "low",
    status: "aligned"
  }
];

export const parliamentConsensus: ParliamentConsensus = {
  consensusScore: 82,
  decisionReadiness: "high",
  conflictLevel: "moderate",
  humanReviewNeeded: true
};

export const stakeholderPriorities: StakeholderPriority[] = [
  { id: "priority-life-safety", label: "Life Safety", value: 94 },
  { id: "priority-logistics-speed", label: "Logistics Speed", value: 86 },
  { id: "priority-economic-protection", label: "Economic Protection", value: 78 },
  { id: "priority-carbon-reduction", label: "Carbon Reduction", value: 61 },
  { id: "priority-infrastructure-recovery", label: "Infrastructure Recovery", value: 84 }
];

export const parliamentTimeline: ParliamentTimelineItem[] = [
  {
    id: "timeline-context-loaded",
    title: "Scenario context loaded",
    description: "Cyclone Landfall - Odisha Corridor context prepared for agent review.",
    timestamp: "Step 01",
    status: "success"
  },
  {
    id: "timeline-infra-blocked",
    title: "Infrastructure Guardian identifies blocked corridor",
    description: "Coastal access risk and inland redundancy requirements flagged.",
    timestamp: "Step 02",
    status: "warning"
  },
  {
    id: "timeline-humanitarian-priority",
    title: "Humanitarian Advocate escalates hospital priority",
    description: "Medical supply movement and shelter support elevated above cargo movement.",
    timestamp: "Step 03",
    status: "danger"
  },
  {
    id: "timeline-logistics-route",
    title: "Logistics Optimizer proposes alternate route",
    description: "Bhubaneswar inland staging route prepared for high-priority movement.",
    timestamp: "Step 04",
    status: "info"
  },
  {
    id: "timeline-economic-loss",
    title: "Economic Strategist estimates reduced loss",
    description: "Trade loss reduction improves when low-priority cargo is delayed.",
    timestamp: "Step 05",
    status: "info"
  },
  {
    id: "timeline-consensus-ready",
    title: "Consensus prepared for Crisis Commander",
    description: "Structured recommendation package is ready for human review.",
    timestamp: "Step 06",
    status: "success"
  }
];

export const finalRecommendation: FinalRecommendation = {
  priorityAction:
    "Prioritize medical supply movement from Bhubaneswar Warehouse to Puri and Balasore hospitals using alternate inland route while delaying low-priority industrial cargo.",
  reasoning:
    "Agents converge on life safety, hospital continuity, and route redundancy as the highest-value response path during cyclone-linked corridor pressure.",
  expectedBenefit:
    "Protects critical care supply lanes, reduces cascading humanitarian risk, and preserves trade capacity for high-priority movements.",
  nextStep: "Send to Crisis Commander",
  href: "/crisis-commander"
};
