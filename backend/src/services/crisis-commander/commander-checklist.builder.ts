import type { CommanderChecklistItem } from "../../types/crisis-commander.types.js";

export function buildCommanderChecklist(includeChecklist = true): CommanderChecklistItem[] {
  if (!includeChecklist) return [];

  return [
    "Confirm cyclone corridor status",
    "Activate alternate route",
    "Dispatch medical kits",
    "Deploy response teams",
    "Open shelters",
    "Notify district command centers",
    "Generate executive report",
  ].map((label) => ({
    label,
    status: "READY",
    required: true,
  }));
}

