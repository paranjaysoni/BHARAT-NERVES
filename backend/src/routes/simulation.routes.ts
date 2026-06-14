import { Router } from "express";
import { runSimulationController } from "../controllers/simulation.controller.js";

const router = Router();

router.post("/run", runSimulationController);

export default router;
