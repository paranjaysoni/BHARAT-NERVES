export type ScenarioCategory =
  | "CYCLONE"
  | "PORT_SHUTDOWN"
  | "HIGHWAY_BLOCKAGE"
  | "WAREHOUSE_FIRE"
  | "MEDICAL_SHORTAGE"
  | "EARTHQUAKE"
  | "WILDFIRE"
  | "TRADE_DISRUPTION"
  | "SEA_BLOCKADE";

export type ScenarioSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface ScenarioImpacts {
  delayHours: number;
  economicLossCr: number;
  carbonIncreasePercent: number;
  populationAffected: number;
  resilienceBefore: number;
  resilienceAfter: number;
  recoveryDays: number;
}

export interface Scenario {
  id: string;
  name: string;
  category: ScenarioCategory;
  severity: ScenarioSeverity;
  region: string;
  country: string;
  description: string;
  affectedNodeIds: string[];
  affectedRouteIds: string[];
  blockedRouteIds: string[];
  expectedImpacts: ScenarioImpacts;
  tags: string[];
}

export interface InternationalScenario extends Scenario {
  globalRelevance: string;
  tradeImpactUsd: number;
  geopoliticalContext: string;
}
