import type { Request, Response } from "express";
import { getAllAgents, getAgentById } from "../services/data/agents.service.js";
import { sendSuccess, sendError } from "../utils/response.js";

export function listAgents(_req: Request, res: Response): void {
  const agents = getAllAgents();
  sendSuccess(res, agents, `${agents.length} AI Parliament agents`);
}

export function getAgent(req: Request<{ id: string }>, res: Response): void {
  const agent = getAgentById(req.params.id);
  if (!agent) {
    sendError(res, "NOT_FOUND", `Agent not found: ${req.params.id}`, 404);
    return;
  }
  sendSuccess(res, agent);
}
