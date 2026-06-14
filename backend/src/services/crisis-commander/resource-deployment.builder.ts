import { getAllResources } from "../data/resources.service.js";
import type { ResourceCategory } from "../../types/resource.types.js";
import type { ResourceDeploymentItem } from "../../types/crisis-commander.types.js";
import type { SimulationResult } from "../../types/simulation.types.js";

const deploymentCategories: ResourceCategory[] = [
  "MEDICAL",
  "TRANSPORT",
  "FOOD",
  "WATER",
  "FUEL",
  "RESCUE",
  "SHELTER",
];

export function buildResourceDeployment(simulation: SimulationResult): ResourceDeploymentItem[] {
  const assignedRegion = getAssignedRegion(simulation);
  const selected = getAllResources()
    .filter((resource) => deploymentCategories.includes(resource.category))
    .sort((a, b) => priorityRank(b.priority) - priorityRank(a.priority))
    .slice(0, 8);

  return selected.map((resource) => ({
    resourceId: resource.id,
    name: resource.name,
    quantity: resource.quantity,
    unit: resource.unit,
    assignedRegion,
    status: "ASSIGNED",
    priority: resource.priority,
  }));
}

function getAssignedRegion(simulation: SimulationResult): string {
  const districts = Array.from(new Set(simulation.scenario.affectedNodes.map((node) => node.district)));
  return districts.slice(0, 3).join(" / ") || simulation.scenario.region;
}

function priorityRank(priority: string): number {
  if (priority === "CRITICAL") return 4;
  if (priority === "HIGH") return 3;
  if (priority === "MEDIUM") return 2;
  return 1;
}

