import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // disable ESLint during builds (Vercel/CI will skip lint checks)
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
