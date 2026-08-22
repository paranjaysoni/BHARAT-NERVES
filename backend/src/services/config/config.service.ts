import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface RiskConfigInput {
  critical: number;
  high: number;
  medium: number;
}

export async function getConfig(): Promise<RiskConfigInput> {
  const config = await prisma.riskConfig.findUnique({
    where: { id: "global" },
  });

  if (!config) {
    return {
      critical: 85,
      high: 60,
      medium: 35,
    };
  }

  return {
    critical: config.critical,
    high: config.high,
    medium: config.medium,
  };
}

export async function updateConfig(input: RiskConfigInput): Promise<RiskConfigInput> {
  if (input.critical <= input.high || input.high <= input.medium) {
    throw new Error("Invalid configuration: critical > high > medium must be satisfied.");
  }

  const config = await prisma.riskConfig.upsert({
    where: { id: "global" },
    update: {
      critical: input.critical,
      high: input.high,
      medium: input.medium,
    },
    create: {
      id: "global",
      critical: input.critical,
      high: input.high,
      medium: input.medium,
    },
  });

  return {
    critical: config.critical,
    high: config.high,
    medium: config.medium,
  };
}
