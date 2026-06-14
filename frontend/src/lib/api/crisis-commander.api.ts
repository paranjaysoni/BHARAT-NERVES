import { apiPost } from "./client";
import type {
  CrisisCommanderPlanRequest,
  CrisisCommanderPlan,
} from "@/types/crisis-commander.types";

export async function runCrisisCommanderPlan(
  request: CrisisCommanderPlanRequest
): Promise<CrisisCommanderPlan> {
  return apiPost<CrisisCommanderPlanRequest, CrisisCommanderPlan>(
    "/api/crisis-commander/plan",
    request
  );
}
