import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // disable ESLint during builds (Vercel/CI will skip lint checks)
    ignoreDuringBuilds: true
  },
  typescript: {
    tsconfigPath: "./tsconfig.json"
  },
  // Skip static prerendering for protected routes that require runtime auth
  staticPageGenerationTimeout: 120,
  experimental: {
    isrMemoryCacheSize: 0 // Disable ISR caching if needed
  }
};

export default nextConfig;
