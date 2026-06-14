import type { HealthData } from "../types/api.js";

const SERVICE_NAME = "project-aegis-backend";
const VERSION = "1.0.0";

export function getHealthData(): HealthData {
  return {
    status: "ok",
    service: SERVICE_NAME,
    version: VERSION,
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
  };
}
