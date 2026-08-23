import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // When running on Vercel we let Vercel handle the output format.
  // For Docker/self‑hosted builds we keep the standalone output.
  output: process.env.VERCEL ? undefined : "standalone",
};

export default nextConfig;
