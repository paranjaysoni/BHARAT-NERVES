import { apiPost } from "./client";
import type {
  AIParliamentSessionRequest,
  AIParliamentSession,
} from "@/types/ai-parliament.types";

export async function runParliamentSession(
  request: AIParliamentSessionRequest
): Promise<AIParliamentSession> {
  return apiPost<AIParliamentSessionRequest, AIParliamentSession>(
    "/api/ai-parliament/session",
    request
  );
}
