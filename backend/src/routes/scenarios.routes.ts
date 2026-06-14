import { Router } from "express";
import {
  listScenarios,
  getScenario,
  listInternationalScenarios,
  getInternationalScenario,
} from "../controllers/scenarios.controller.js";

const router = Router();

// Local scenarios — order matters: /international must be before /:id
router.get("/international", listInternationalScenarios);
router.get("/international/:id", getInternationalScenario);
router.get("/", listScenarios);
router.get("/:id", getScenario);

export default router;
