import type { NextConfig } from "next";

const nextConfig /* : NextConfig */ = {
  // devIndicators block removed as it's deprecated in Next.js 15.

  // Let's be very specific since the wildcard isn't working.
  // We'll include the wildcards AND the exact origin from the error log.
  allowedDevOrigins: [
    "https://d809ea24-46cb-4706-a2c8-64e24a4c5c50-00-7kuz7kupwc27.riker.replit.dev",
    "https://*.riker.replit.dev",
    "https://*.replit.dev",
    "https://*.repl.co",
  ],

  devIndicators: false,

  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        poll: 1000,
        aggregateTimeout: 300
      };
    }
    return config;
  },

  experimental: {
    optimizePackageImports: ["lucide-react"]
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" }
        ]
      }
    ];
  }
};

export default nextConfig as any;