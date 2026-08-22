import { runUnifiedSimulation } from "./services/simulation/simulation.service.js";
import { createAIParliamentSession } from "./services/ai-parliament/ai-parliament.service.js";
import { createCrisisCommanderPlan } from "./services/crisis-commander/crisis-commander.service.js";
import { getConfig } from "./services/config/config.service.js";
import assert from "assert";

async function runTests() {
  const config = await getConfig();
  console.log(`[TEST] Starting End-to-End Backend Verification...`);
  console.log(`[TEST] Env Risk Thresholds: CRITICAL=${config.critical}, HIGH=${config.high}`);

  try {
    // Test A - Simulation
    console.log(`\n[1/4] Running unified simulation for odisha_cyclone...`);
    const simulation = await runUnifiedSimulation({ scenarioId: "odisha_cyclone" });
    console.log(`  - Severity: ${simulation.scenario.severity}`);
    console.log(`  - Risk Score: ${simulation.impact.score.impactScore}`);
    console.log(`  - Risk Level: ${simulation.impact.score.riskLevel}`);
    console.log(`  - Blocked Routes: ${simulation.scenario.blockedRoutes.length}`);
    console.log(`  - Alternate Route Selected: ${simulation.routeRecovery.recoveryStatus}`);
    
    assert(simulation.scenario.severity === "CRITICAL", "Severity should be CRITICAL");
    assert(simulation.routeRecovery.recoveryStatus === "RECOVERED", "Route should be recovered via Dijkstra");

    // Test B - AI Parliament Context
    console.log(`\n[2/4] Running AI Parliament...`);
    const parliament = await createAIParliamentSession({
      scenarioId: "odisha_cyclone",
      simulationId: simulation.simulationId,
      simulationResult: simulation,
      includeFullMatrix: false
    });
    
    const economicAgent = parliament.agents.find(a => a.domain === "ECONOMIC");
    console.log(`  - Economic Agent Recommendation: ${economicAgent?.recommendation}`);
    assert(economicAgent?.recommendation.includes(simulation.impact.score.riskLevel), "AI Agent output must include the dynamic risk level from context");
    
    // Test C - Crisis Commander
    console.log(`\n[3/4] Running Crisis Commander...`);
    const commander = await createCrisisCommanderPlan({
      scenarioId: "odisha_cyclone",
      simulationId: simulation.simulationId,
      simulationResult: simulation,
      includeChecklist: true
    });
    
    console.log(`  - Executive Summary: ${commander.executiveSummary.summary}`);
    console.log(`  - Deployed Resources: ${commander.resourceDeployment.length}`);

    console.log(`\n[4/4] Validation SUCCESS. End-to-End flow verified.`);
    
  } catch (error) {
    console.error(`\n[TEST FAILED]`, error);
    process.exit(1);
  }
}

runTests();
