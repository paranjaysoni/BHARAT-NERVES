import { Router } from "express";
import {
  runInternationalScenarioController,
  runScenarioController,
} from "../controllers/scenario-engine.controller.js";

const router = Router();

router.post("/international/:id/run", runInternationalScenarioController);
router.post("/:id/run", runScenarioController);

export default router;
