import { runUnifiedSimulation } from "./services/simulation/simulation.service.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function runTest() {
  console.log("=== TEST 1: CRITICAL = 85 ===");
  await prisma.riskConfig.update({
    where: { id: "global" },
    data: { critical: 85, high: 60 }
  });
  
  let sim = await runUnifiedSimulation({ scenarioId: "odisha_cyclone" });
  console.log("Impact Score 1:", sim.impact.score.impactScore);
  console.log("Risk Level 1:", sim.impact.score.riskLevel);

  console.log("\n=== TEST 2: CRITICAL = 95 ===");
  await prisma.riskConfig.update({
    where: { id: "global" },
    data: { critical: 95, high: 60 }
  });
  
  sim = await runUnifiedSimulation({ scenarioId: "odisha_cyclone" });
  console.log("Impact Score 2:", sim.impact.score.impactScore);
  console.log("Risk Level 2:", sim.impact.score.riskLevel);

  // Restore back to original
  await prisma.riskConfig.update({
    where: { id: "global" },
    data: { critical: 85, high: 60 }
  });
  
  await prisma.$disconnect();
}

runTest().catch(console.error);
