import type { ResilienceImpact } from "../../types/impact-engine.types.js";

export function calculateResilienceImpact(before: number, after: number): ResilienceImpact {
  const improvement = after - before;

  return {
    before,
    after,
    improvement,
    status: improvement > 0 ? "RECOVERING" : improvement === 0 ? "STABLE" : "DEGRADED",
  };
}

