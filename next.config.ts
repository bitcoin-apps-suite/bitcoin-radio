import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['picsum.photos']
  },
  eslint: {
    // Allow build to continue even with warnings and errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allow build to continue even with type errors (not recommended for prod)
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
