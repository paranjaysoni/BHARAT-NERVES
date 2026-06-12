export type ScenarioSeverity = "low" | "moderate" | "high" | "critical";

export interface Scenario {
  id: string;
  title: string;
  description: string;
  severity: ScenarioSeverity;
  affectedNodes: string[];
  impactSummary: string;
}
