export type AgentDomain =
  | "INFRASTRUCTURE"
  | "ENVIRONMENT"
  | "HUMANITARIAN"
  | "ECONOMIC"
  | "LOGISTICS"
  | "RISK"
  | "TECHNOLOGY"
  | "POLICY";

export interface AIAgent {
  id: string;
  name: string;
  domain: AgentDomain;
  role: string;
  priority: string;
  description: string;
  decisionWeight: number;
  specializations: string[];
}
