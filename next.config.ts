import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
    deviceSizes: [768, 1280, 1920],
    imageSizes: [],

    minimumCacheTTL: 60 * 60 * 24 * 30,

    formats: ["image/webp", "image/avif"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.chmal.pl",
        port: "",
        pathname: "/chmal.pl/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
