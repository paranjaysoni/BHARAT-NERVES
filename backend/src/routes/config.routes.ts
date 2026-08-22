import { Router } from "express";
import { getConfig, updateConfig } from "../services/config/config.service.js";

export const configRouter = Router();

configRouter.get("/", async (req, res) => {
  try {
    const config = await getConfig();
    res.json({ thresholds: config });
  } catch (error) {
    console.error("Error fetching config:", error);
    res.status(500).json({ error: "INTERNAL_SERVER_ERROR", message: "Failed to fetch configuration" });
  }
});

configRouter.put("/", async (req, res) => {
  try {
    if (!req.body || !req.body.thresholds) {
      res.status(400).json({ error: "INVALID_REQUEST", message: "Missing thresholds object in request body." });
      return;
    }

    const { critical, high, medium } = req.body.thresholds;
    
    if (typeof critical !== "number" || typeof high !== "number" || typeof medium !== "number") {
      res.status(400).json({ error: "INVALID_CONFIGURATION", message: "All thresholds (critical, high, medium) must be provided as numbers." });
      return;
    }

    const updatedConfig = await updateConfig({ critical, high, medium });
    res.json({ thresholds: updatedConfig });
  } catch (error: any) {
    console.error("Error updating config:", error);
    
    if (error.message && error.message.includes("must be satisfied")) {
      res.status(400).json({ error: "INVALID_CONFIGURATION", message: error.message });
      return;
    }

    res.status(500).json({ error: "INTERNAL_SERVER_ERROR", message: "Failed to update configuration" });
  }
});
