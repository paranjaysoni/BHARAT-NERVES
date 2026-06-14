import app from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";

const server = app.listen(env.PORT, () => {
  logger.info(`Project Aegis backend running`, {
    port: env.PORT,
    env: env.NODE_ENV,
    health: `http://localhost:${env.PORT}/api/health`,
  });
});

// Graceful shutdown
function shutdown(signal: string) {
  logger.info(`Received ${signal} — shutting down gracefully`);
  server.close(() => {
    logger.info("Server closed");
    process.exit(0);
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
