import { Router } from "express";
import { getConfig, updateConfig } from "../services/config/config.service.js";

export const configRouter = Router();

configRouter.get("/", async (req, res) => {
  try {
    const config = await getConfig();
    res.json(config);
  } catch (error) {
    console.error("Error fetching config:", error);
    res.status(500).json({ error: "Failed to fetch configuration" });
  }
});

configRouter.put("/", async (req, res) => {
  try {
    const { critical, high, medium } = req.body;
    if (typeof critical !== "number" || typeof high !== "number" || typeof medium !== "number") {
      res.status(400).json({ error: "Invalid payload format" });
      return;
    }
    const updatedConfig = await updateConfig({ critical, high, medium });
    res.json(updatedConfig);
  } catch (error: any) {
    console.error("Error updating config:", error);
    res.status(400).json({ error: error.message || "Failed to update configuration" });
  }
});
