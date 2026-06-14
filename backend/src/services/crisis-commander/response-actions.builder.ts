import type { ResponseAction } from "../../types/crisis-commander.types.js";
import type { SimulationResult } from "../../types/simulation.types.js";

export function buildResponseActions(simulation: SimulationResult): ResponseAction[] {
  const recovered = simulation.routeRecovery.recoveryStatus === "RECOVERED";

  return [
    {
      id: "action_1",
      title: "Activate alternate inland route",
      priority: recovered ? "CRITICAL" : "HIGH",
      owner: "Logistics Command",
      status: "READY",
      expectedImpact: "Maintains medical and relief movement despite blocked coastal routes.",
    },
    {
      id: "action_2",
      title: "Prioritize medical supply corridor",
      priority: "CRITICAL",
      owner: "Health Operations Cell",
      status: "READY",
      expectedImpact: "Keeps AIIMS and SCB medical supply continuity protected.",
    },
    {
      id: "action_3",
      title: "Deploy NDRF / ODRAF response teams",
      priority: "HIGH",
      owner: "Response Command",
      status: "READY",
      expectedImpact: "Improves rescue coverage and first-response capacity in exposed districts.",
    },
    {
      id: "action_4",
      title: "Open coastal shelters",
      priority: "HIGH",
      owner: "District Administration",
      status: "READY",
      expectedImpact: "Reduces shelter overload and protects vulnerable coastal populations.",
    },
    {
      id: "action_5",
      title: "Stage fuel reserves near Cuttack",
      priority: "HIGH",
      owner: "Fuel Logistics Cell",
      status: "READY",
      expectedImpact: "Protects generator, ambulance, and response fleet continuity.",
    },
    {
      id: "action_6",
      title: "Delay low-priority industrial cargo",
      priority: "MEDIUM",
      owner: "Trade Coordination Cell",
      status: "READY",
      expectedImpact: "Frees corridor capacity for relief, medical, and fuel movement.",
    },
    {
      id: "action_7",
      title: "Monitor Paradip and Kendrapara route exposure",
      priority: "HIGH",
      owner: "Digital Twin Monitoring Cell",
      status: "READY",
      expectedImpact: "Improves detection of cascading route and port disruptions.",
    },
  ];
}

