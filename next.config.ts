import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/*": ["./data/**/*"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "8mb",
    },
  },
  async redirects() {
    return [
      {
        source: "/case-studies",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/articles",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/articles/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
    ];
  },
  images: {
    ...(process.env.NODE_ENV === "development" ? { minimumCacheTTL: 0 } : {}),
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
