import { getAllResources } from "../data/resources.service.js";
import type { ResourceCategory } from "../../types/resource.types.js";
import type {
  ResourceStressImpact,
  ResourceStressLevel,
} from "../../types/impact-engine.types.js";
import type { Scenario } from "../../types/scenario.types.js";

export function calculateResourceStress(scenario: Scenario): ResourceStressImpact {
  const affectedNodeIds = new Set(scenario.affectedNodeIds);
  const affectedResources = getAllResources().filter((resource) =>
    affectedNodeIds.has(resource.locationNodeId)
  );

  return {
    medicalStress: getStressForCategories(affectedResources, ["MEDICAL"], scenario),
    fuelStress: getStressForCategories(affectedResources, ["FUEL"], scenario),
    shelterStress: getStressForCategories(affectedResources, ["SHELTER", "FOOD", "WATER"], scenario),
    logisticsStress: getStressForCategories(
      affectedResources,
      ["TRANSPORT", "FUEL", "COMMUNICATION"],
      scenario
    ),
  };
}

function getStressForCategories(
  resources: ReturnType<typeof getAllResources>,
  categories: ResourceCategory[],
  scenario: Scenario
): ResourceStressLevel {
  const matching = resources.filter((resource) => categories.includes(resource.category));
  const criticalCount = matching.filter((resource) =>
    resource.status === "CRITICAL" || resource.priority === "CRITICAL"
  ).length;
  const limitedCount = matching.filter((resource) =>
    resource.status === "LIMITED" || resource.status === "DEPLOYED"
  ).length;

  if (scenario.severity === "CRITICAL" && (criticalCount > 0 || matching.length === 0)) {
    return "HIGH";
  }
  if (criticalCount > 1 || limitedCount > 1) return "HIGH";
  if (criticalCount > 0 || limitedCount > 0 || scenario.severity === "HIGH") return "MEDIUM";
  return "LOW";
}

