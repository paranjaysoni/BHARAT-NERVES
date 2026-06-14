import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { requestLogger } from "./middleware/request-logger.middleware.js";
import { notFound } from "./middleware/not-found.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";
import aiParliamentRouter from "./routes/ai-parliament.routes.js";
import crisisCommanderRouter from "./routes/crisis-commander.routes.js";
import healthRouter from "./routes/health.routes.js";
import impactEngineRouter from "./routes/impact-engine.routes.js";
import nodesRouter from "./routes/nodes.routes.js";
import routeGraphRouter from "./routes/route-graph.routes.js";
import routesRouter from "./routes/routes.routes.js";
import scenarioEngineRouter from "./routes/scenario-engine.routes.js";
import scenariosRouter from "./routes/scenarios.routes.js";
import simulationRouter from "./routes/simulation.routes.js";
import resourcesRouter from "./routes/resources.routes.js";
import agentsRouter from "./routes/agents.routes.js";

const app = express();

// ── Core middleware ──────────────────────────────────────────────────────────
app.use(cors({ origin: env.FRONTEND_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(requestLogger);

// ── Routes ───────────────────────────────────────────────────────────────────
// Simple deployment probe
function probeHandler(_req: Request, res: Response, _next: NextFunction): unknown {
  return res.json({ status: "ok" });
}
app.get("/health", probeHandler);

// API v1
app.use("/api/ai-parliament", aiParliamentRouter);
app.use("/api/crisis-commander", crisisCommanderRouter);
app.use("/api/health", healthRouter);
app.use("/api/impact", impactEngineRouter);
app.use("/api/nodes", nodesRouter);
app.use("/api/route-graph", routeGraphRouter);
app.use("/api/routes", routesRouter);
app.use("/api/scenarios", scenarioEngineRouter);
app.use("/api/scenarios", scenariosRouter);
app.use("/api/simulations", simulationRouter);
app.use("/api/resources", resourcesRouter);
app.use("/api/agents", agentsRouter);

// ── Error handling ───────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

export default app;
