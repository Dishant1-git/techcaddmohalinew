import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // mysql2 loads its dialect/auth plugins at runtime; leaving it unbundled
  // keeps those dynamic requires working inside the route handlers.
  serverExternalPackages: ["mysql2"],
};

export default nextConfig;
