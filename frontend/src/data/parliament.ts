import type {
  AgentRecommendation,
  FinalRecommendation,
  ParliamentConsensus,
  ParliamentSession,
  ParliamentTimelineItem,
  StakeholderPriority
} from "@/types";

export const parliamentSession: ParliamentSession = {
  currentScenario: "Cyclone Landfall in Odisha Coast",
  sessionStatus: "Live",
  participatingAgents: 8,
  primaryDecisionQuestion:
    "Which routes and resources should be prioritized first?",
  expectedOutput: "Recovery recommendation for Crisis Commander",
  sessionId: "PARL-2024-11-28-001",
  startedAt: "11:35 AM",
  timeRemaining: "23m 45s",
  objectives: "Minimize loss of life, reduce economic impact, ensure supply chain continuity, and optimize resource allocation."
};

export const agentRecommendations: AgentRecommendation[] = [
  {
    agentId: "agent-infrastructure-guardian",
    recommendation:
      "Restore inland road redundancy and protect Paradip-Cuttack logistics continuity.",
    position: "Prioritize coastal evacuation",
    confidence: 87,
    conflictLevel: "moderate",
    status: "prepared"
  },
  {
    agentId: "agent-environment-sentinel",
    recommendation:
      "Prefer lower-emission inland routes unless critical medical urgency overrides.",
    position: "Protect wetlands & mangroves",
    confidence: 78,
    conflictLevel: "moderate",
    status: "reviewing"
  },
  {
    agentId: "agent-humanitarian-advocate",
    recommendation:
      "Prioritize hospitals and flood shelters before industrial cargo movement.",
    position: "Maximize shelter & medical aid",
    confidence: 92,
    conflictLevel: "low",
    status: "aligned"
  },
  {
    agentId: "agent-economic-strategist",
    recommendation:
      "Reduce trade loss by preserving Paradip-to-Bhubaneswar alternate corridor.",
    position: "Secure critical trade routes",
    confidence: 75,
    conflictLevel: "moderate",
    status: "prepared"
  },
  {
    agentId: "agent-logistics-optimizer",
    recommendation:
      "Route high-priority supplies through Bhubaneswar inland staging before coastal dispatch.",
    position: "Keep ports & corridors active",
    confidence: 82,
    conflictLevel: "low",
    status: "aligned"
  },
  {
    agentId: "agent-risk-analyst",
    recommendation:
      "Monitor cascading risk across port congestion, hospital demand, and road saturation.",
    position: "High risk in Paradip belt",
    confidence: 90,
    conflictLevel: "moderate",
    status: "prepared"
  },
  {
    agentId: "agent-tech-innovator",
    recommendation:
      "Deploy predictive route-status dashboards and automated alert triage for operators.",
    position: "Deploy drones & IoT sensors",
    confidence: 70,
    conflictLevel: "low",
    status: "reviewing"
  },
  {
    agentId: "agent-policy-advisor",
    recommendation:
      "Convert route priority into district-ready operating orders with clear escalation rules.",
    position: "Enforce disaster protocol",
    confidence: 80,
    conflictLevel: "low",
    status: "aligned"
  }
];

export const parliamentConsensus: ParliamentConsensus = {
  consensusScore: 72,
  decisionReadiness: "high",
  conflictLevel: "moderate",
  humanReviewNeeded: true,
  agreePercent: 72,
  partialPercent: 18,
  disagreePercent: 6,
  neutralPercent: 4,
  topAgreedPriority: "Evacuate high-risk coastal zones and pre-position medical & relief resources."
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
    id: "timeline-session-started",
    title: "Session Started",
    description: "Scenario briefed to all agents",
    timestamp: "11:35 AM",
    status: "success"
  },
  {
    id: "timeline-views-submitted",
    title: "Agents Submitted Initial Views",
    description: "All agents have shared their positions",
    timestamp: "11:36 AM",
    status: "success"
  },
  {
    id: "timeline-round1-complete",
    title: "Round 1 Deliberation Complete",
    description: "Majority alignment on evacuation plan",
    timestamp: "11:39 AM",
    status: "success"
  },
  {
    id: "timeline-consensus-building",
    title: "Consensus Building",
    description: "Working towards final agreement",
    timestamp: "11:41 AM",
    status: "warning"
  },
  {
    id: "timeline-final-decision",
    title: "Final Decision",
    description: "Implementation plan generation",
    timestamp: "Est. 12:06 PM",
    status: "neutral"
  }
];

export const finalRecommendation: FinalRecommendation = {
  proposedDecision:
    "Execute phased evacuation of coastal districts, pre-position medical teams in Paradip and Gopalpur, and secure critical trade corridors NH-16 and rail networks.",
  priorityAction:
    "Prioritize medical supply movement from Bhubaneswar Warehouse to Puri and Balasore hospitals using alternate inland route while delaying low-priority industrial cargo.",
  reasoning:
    "Agents converge on life safety, hospital continuity, and route redundancy as the highest-value response path during cyclone-linked corridor pressure.",
  expectedBenefit:
    "Protects critical care supply lanes, reduces cascading humanitarian risk, and preserves trade capacity for high-priority movements.",
  nextStep: "Send to Crisis Commander",
  href: "/crisis-commander",
  implementationPriorities: [
    { label: "Evacuation & Safety", level: "High", value: 95 },
    { label: "Medical & Relief", level: "High", value: 88 },
    { label: "Trade & Logistics", level: "Medium", value: 65 },
    { label: "Infrastructure Protection", level: "Medium", value: 60 }
  ]
};

export const keyDiscussionInsights = [
  {
    id: "insight-evacuation",
    text: "Strong agreement on evacuation priority for Puri, Kendrapara, Jagatsinghpur",
    type: "agree" as const
  },
  {
    id: "insight-allocation",
    text: "Debate on resource allocation between infrastructure vs relief operations",
    type: "debate" as const
  },
  {
    id: "insight-economic",
    text: "Economic impact concerns around port shutdown vs safety measures",
    type: "info" as const
  },
  {
    id: "insight-drones",
    text: "Consensus on deploying drones for real-time monitoring",
    type: "agree" as const
  }
];

export const parliamentMetrics = [
  { id: "metric-agents", label: "AI Agents", value: "8" },
  { id: "metric-factors", label: "Key Factors", value: "12" },
  { id: "metric-rounds", label: "Discussion Rounds", value: "5" },
  { id: "metric-response", label: "Avg Response Time", value: "3.2s" }
];
