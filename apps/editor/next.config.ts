import type { NextConfig } from "next";

// Static SPA only -- auth and every Cascade write live in the Pages Function
// proxy (functions/api/[[route]].ts), never in Next server code. See
// project-management/editor-implementation-plan.md section 2/8 risk #2.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
