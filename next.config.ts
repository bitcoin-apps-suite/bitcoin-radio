import type { NextConfig } from "next";

const FRAME_ANCESTORS =
  "frame-ancestors 'self' capacitor://localhost https://localhost https://web.bwalletx.com https://desktop.bwalletx.com";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
  },
  typescript: {
    // Pre-existing: the old studio code has type errors; kept until it is cleaned up.
    ignoreBuildErrors: true,
  },
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "Content-Security-Policy", value: FRAME_ANCESTORS }] }];
  },
};

export default nextConfig;
