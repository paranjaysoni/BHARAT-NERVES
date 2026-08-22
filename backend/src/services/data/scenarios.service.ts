import { PrismaClient } from "@prisma/client";
import type { Scenario, InternationalScenario } from "../../types/scenario.types.js";

const prisma = new PrismaClient();

function mapPrismaScenarioToType(prismaScenario: any): any {
  if (!prismaScenario) return null;
  return {
    ...prismaScenario,
    expectedImpacts: {
      delayHours: prismaScenario.expectedDelayHours,
      economicLossCr: prismaScenario.expectedEconomicLossCr,
      carbonIncreasePercent: prismaScenario.expectedCarbonIncrease,
      populationAffected: prismaScenario.expectedPopAffected,
      resilienceBefore: prismaScenario.expectedResilienceBefore,
      resilienceAfter: prismaScenario.expectedResilienceAfter,
      recoveryDays: prismaScenario.expectedRecoveryDays,
    },
  };
}

export async function getAllScenarios(): Promise<Scenario[]> {
  const scenarios = await prisma.scenario.findMany({
    where: { globalRelevance: null },
  });
  return scenarios.map(mapPrismaScenarioToType);
}

export async function getScenarioById(id: string): Promise<Scenario | null> {
  const scenario = await prisma.scenario.findUnique({
    where: { id },
  });
  if (!scenario || scenario.globalRelevance !== null) return null;
  return mapPrismaScenarioToType(scenario);
}

export async function getAllInternationalScenarios(): Promise<InternationalScenario[]> {
  const scenarios = await prisma.scenario.findMany({
    where: { globalRelevance: { not: null } },
  });
  return scenarios.map(mapPrismaScenarioToType);
}

export async function getInternationalScenarioById(id: string): Promise<InternationalScenario | null> {
  const scenario = await prisma.scenario.findUnique({
    where: { id },
  });
  if (!scenario || scenario.globalRelevance === null) return null;
  return mapPrismaScenarioToType(scenario);
}

export async function getScenariosBySeverity(severity: Scenario["severity"]): Promise<Scenario[]> {
  const scenarios = await prisma.scenario.findMany({
    where: { severity, globalRelevance: null },
  });
  return scenarios.map(mapPrismaScenarioToType);
}
