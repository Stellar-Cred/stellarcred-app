import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.stellar.org",
      },
      {
        protocol: "https",
        hostname: "*.stellar.expert",
      },
    ],
  },
};

export default nextConfig;
