import { Router } from "express";
import { getConfig, updateConfig } from "../services/config/config.service.js";
import { sendError, sendSuccess } from "../utils/response.js";

export const configRouter = Router();

configRouter.get("/", async (req, res) => {
  try {
    const config = await getConfig();
    sendSuccess(res, { thresholds: config });
  } catch (error) {
    console.error("Error fetching config:", error);
    sendError(res, "INTERNAL_SERVER_ERROR", "Failed to fetch configuration", 500);
  }
});

configRouter.put("/", async (req, res) => {
  try {
    if (!req.body || !req.body.thresholds) {
      sendError(res, "INVALID_REQUEST", "Missing thresholds object in request body.", 400);
      return;
    }

    const { critical, high, medium } = req.body.thresholds;

    if (critical === undefined || high === undefined || medium === undefined) {
      sendError(res, "INVALID_REQUEST", "All thresholds (critical, high, medium) must be provided.", 400);
      return;
    }

    if (typeof critical !== "number" || typeof high !== "number" || typeof medium !== "number") {
      sendError(res, "INVALID_CONFIGURATION", "All thresholds (critical, high, medium) must be provided as numbers.", 400);
      return;
    }

    const updatedConfig = await updateConfig({ critical, high, medium });
    sendSuccess(res, { thresholds: updatedConfig });
  } catch (error) {
    const err = error as Error;
    console.error("Error updating config:", err);
    if (err.message && (err.message.includes("must be satisfied") || err.message.includes("Invalid configuration"))) {
      sendError(res, "INVALID_CONFIGURATION", err.message, 400);
    } else {
      sendError(res, "INTERNAL_SERVER_ERROR", "Failed to update configuration", 500);
    }
  }
});
