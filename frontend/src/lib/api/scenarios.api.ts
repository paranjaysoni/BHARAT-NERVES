import { apiGet } from "./client";

export interface BackendScenario {
  id: string;
  name: string;
  category: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  region: string;
  country: string;
  description: string;
  affectedNodeIds: string[];
  affectedRouteIds: string[];
  blockedRouteIds: string[];
  expectedImpacts: {
    delayHours: number;
    economicLossCr: number;
    carbonIncreasePercent: number;
    populationAffected: number;
    resilienceBefore: number;
    resilienceAfter: number;
    recoveryDays: number;
  };
  tags: string[];
}

export async function getScenarios(): Promise<BackendScenario[]> {
  return apiGet<BackendScenario[]>("/api/scenarios");
}
