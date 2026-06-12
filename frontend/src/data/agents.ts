import type { Agent } from "@/types";

export const agents: Agent[] = [
  {
    id: "agent-infrastructure-guardian",
    name: "Infrastructure Guardian",
    avatar: "IG",
    role: "Infrastructure Resilience",
    priority: "Protect critical nodes",
    description:
      "Evaluates ports, roads, power assets, and logistics hubs for operational continuity."
  },
  {
    id: "agent-environment-sentinel",
    name: "Environment Sentinel",
    avatar: "ES",
    role: "Environmental Risk",
    priority: "Reduce ecological impact",
    description:
      "Tracks carbon exposure, floodplain risk, and environmentally sensitive response choices."
  },
  {
    id: "agent-humanitarian-advocate",
    name: "Humanitarian Advocate",
    avatar: "HA",
    role: "Citizen Safety",
    priority: "Protect vulnerable populations",
    description:
      "Prioritizes hospitals, relief centers, evacuation access, and public safety outcomes."
  },
  {
    id: "agent-economic-strategist",
    name: "Economic Strategist",
    avatar: "EC",
    role: "Economic Continuity",
    priority: "Minimize trade losses",
    description:
      "Assesses trade disruption, port downtime, and economic recovery implications."
  },
  {
    id: "agent-logistics-optimizer",
    name: "Logistics Optimizer",
    avatar: "LO",
    role: "Supply Chain Routing",
    priority: "Maintain flow of goods",
    description:
      "Compares corridor alternatives and supply movement options during disruption."
  },
  {
    id: "agent-risk-analyst",
    name: "Risk Analyst",
    avatar: "RA",
    role: "Risk Intelligence",
    priority: "Surface compound risks",
    description:
      "Identifies cascading risks across infrastructure, health systems, and trade routes."
  },
  {
    id: "agent-tech-innovator",
    name: "Tech Innovator",
    avatar: "TI",
    role: "Digital Systems",
    priority: "Improve response tools",
    description:
      "Recommends data, automation, and platform improvements for faster decisions."
  },
  {
    id: "agent-policy-advisor",
    name: "Policy Advisor",
    avatar: "PA",
    role: "Governance",
    priority: "Align with policy",
    description:
      "Frames decisions around administrative feasibility, compliance, and public coordination."
  }
];
