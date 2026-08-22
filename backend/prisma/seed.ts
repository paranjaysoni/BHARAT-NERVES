import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Database...");

  // 1. Seed Nodes
  const nodesPath = path.join(__dirname, "../src/data/nodes.json");
  if (fs.existsSync(nodesPath)) {
    const nodes = JSON.parse(fs.readFileSync(nodesPath, "utf-8"));
    for (const node of nodes) {
      await prisma.node.upsert({
        where: { id: node.id },
        update: {},
        create: {
          id: node.id,
          name: node.name,
          type: node.type,
          latitude: node.latitude,
          longitude: node.longitude,
          district: node.district,
          state: node.state,
          status: node.status,
          importance: node.importance,
          capacity: node.capacity,
          capacityUnit: node.capacityUnit,
          description: node.description,
          tags: node.tags,
        },
      });
    }
    console.log(`✅ Seeded ${nodes.length} nodes`);
  }

  // 2. Seed Routes
  const routesPath = path.join(__dirname, "../src/data/routes.json");
  if (fs.existsSync(routesPath)) {
    const routes = JSON.parse(fs.readFileSync(routesPath, "utf-8"));
    for (const route of routes) {
      await prisma.route.upsert({
        where: { id: route.id },
        update: {},
        create: {
          id: route.id,
          name: route.name,
          sourceNodeId: route.sourceNodeId,
          destinationNodeId: route.destinationNodeId,
          distanceKm: route.distanceKm,
          travelTimeMinutes: route.travelTimeMinutes,
          routeType: route.routeType,
          highway: route.highway || null,
          status: route.status,
          corridor: route.corridor,
          riskLevel: route.riskLevel,
          baselineCarbonKg: route.baselineCarbonKg,
          baselineCostInr: route.baselineCostInr,
          description: route.description,
        },
      });
    }
    console.log(`✅ Seeded ${routes.length} routes`);
  }

  // 3. Seed Scenarios
  const scenariosPath = path.join(__dirname, "../src/data/scenarios.json");
  if (fs.existsSync(scenariosPath)) {
    const scenarios = JSON.parse(fs.readFileSync(scenariosPath, "utf-8"));
    for (const s of scenarios) {
      await prisma.scenario.upsert({
        where: { id: s.id },
        update: {},
        create: {
          id: s.id,
          name: s.name,
          category: s.category,
          severity: s.severity,
          region: s.region,
          country: s.country,
          description: s.description,
          affectedNodeIds: s.affectedNodeIds || [],
          affectedRouteIds: s.affectedRouteIds || [],
          blockedRouteIds: s.blockedRouteIds || [],
          expectedDelayHours: s.expectedImpacts.delayHours,
          expectedEconomicLossCr: s.expectedImpacts.economicLossCr,
          expectedCarbonIncrease: s.expectedImpacts.carbonIncreasePercent,
          expectedPopAffected: s.expectedImpacts.populationAffected,
          expectedResilienceBefore: s.expectedImpacts.resilienceBefore,
          expectedResilienceAfter: s.expectedImpacts.resilienceAfter,
          expectedRecoveryDays: s.expectedImpacts.recoveryDays,
          tags: s.tags || [],
        },
      });
    }
    console.log(`✅ Seeded ${scenarios.length} scenarios`);
  }

  // 4. Seed International Scenarios
  const intlScenariosPath = path.join(__dirname, "../src/data/international-scenarios.json");
  if (fs.existsSync(intlScenariosPath)) {
    const intlScenarios = JSON.parse(fs.readFileSync(intlScenariosPath, "utf-8"));
    for (const s of intlScenarios) {
      await prisma.scenario.upsert({
        where: { id: s.id },
        update: {},
        create: {
          id: s.id,
          name: s.name,
          category: s.category,
          severity: s.severity,
          region: s.region,
          country: s.country,
          description: s.description,
          affectedNodeIds: s.affectedNodeIds || [],
          affectedRouteIds: s.affectedRouteIds || [],
          blockedRouteIds: s.blockedRouteIds || [],
          expectedDelayHours: s.expectedImpacts.delayHours,
          expectedEconomicLossCr: s.expectedImpacts.economicLossCr,
          expectedCarbonIncrease: s.expectedImpacts.carbonIncreasePercent,
          expectedPopAffected: s.expectedImpacts.populationAffected,
          expectedResilienceBefore: s.expectedImpacts.resilienceBefore,
          expectedResilienceAfter: s.expectedImpacts.resilienceAfter,
          expectedRecoveryDays: s.expectedImpacts.recoveryDays,
          tags: s.tags || [],
          globalRelevance: s.globalRelevance,
          tradeImpactUsd: s.tradeImpactUsd,
          geopoliticalContext: s.geopoliticalContext,
        },
      });
    }
    console.log(`✅ Seeded ${intlScenarios.length} international scenarios`);
  }

  // 5. Seed Risk Config
  await prisma.riskConfig.upsert({
    where: { id: "global" },
    update: {},
    create: {
      id: "global",
      critical: 85,
      high: 60,
      medium: 35,
    },
  });
  console.log(`✅ Seeded global risk configuration`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
