import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
module.exports = {
  experimental: {
    appDir: true,
    reactStrictMode: false, // Disables extra hydration checks (for debugging)
  },
};