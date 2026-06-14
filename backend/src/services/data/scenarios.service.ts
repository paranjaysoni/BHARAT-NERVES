import type { Scenario, InternationalScenario } from "../../types/scenario.types.js";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const scenariosData = require("../../data/scenarios.json") as Scenario[];
// eslint-disable-next-line @typescript-eslint/no-require-imports
const internationalData = require("../../data/international-scenarios.json") as InternationalScenario[];

export function getAllScenarios(): Scenario[] {
  return scenariosData;
}

export function getScenarioById(id: string): Scenario | null {
  return scenariosData.find((s) => s.id === id) ?? null;
}

export function getAllInternationalScenarios(): InternationalScenario[] {
  return internationalData;
}

export function getInternationalScenarioById(id: string): InternationalScenario | null {
  return internationalData.find((s) => s.id === id) ?? null;
}

export function getScenariosBySeverity(severity: Scenario["severity"]): Scenario[] {
  return scenariosData.filter((s) => s.severity === severity);
}
