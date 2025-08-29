import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false, // 👈 disables the "flashy" loading bar in devś
  
  // Configure for Replit environment to allow cross-origin requests
  allowedDevOrigins: ['*'],
  
  // Ensure the dev server binds to all interfaces
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
