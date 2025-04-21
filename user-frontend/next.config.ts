import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"],
  },
  async redirects() {
    return [];
  },

  matcher: ["/v1/:path*"],
};

export default nextConfig;
