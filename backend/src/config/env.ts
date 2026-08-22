import dotenv from "dotenv";

dotenv.config();

function optional(key: string, fallback: string): string {
  return process.env[key] ?? fallback;
}

// FRONTEND_ORIGIN supports comma-separated list for multiple allowed origins.
// e.g. "https://aegis-bharat-nerves.vercel.app,http://localhost:3000"
function parseOrigins(raw: string): string | string[] {
  const origins = raw.split(",").map((s) => s.trim()).filter(Boolean);
  return origins.length === 1 ? origins[0]! : origins;
}

export const env = {
  PORT: parseInt(optional("PORT", "4000"), 10),
  NODE_ENV: optional("NODE_ENV", "development"),
  FRONTEND_ORIGIN: parseOrigins(
    optional("FRONTEND_ORIGIN", "http://localhost:3000")
  ),
} as const;

export type Env = typeof env;
