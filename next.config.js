/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Code splitting & optimization
  swcMinify: true,
  experimental: {
    optimizePackageImports: [
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-tabs",
      "@lucide/lab",
      "lucide-react",
      "recharts",
      "date-fns",
      "antd"
    ]
  },

  // Optimize for performance
  compress: true,
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
