import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
        pathname: "/**", // pozwala na wszystkie obrazki z tego hosta
      },
    ],
  },
};

export default nextConfig;
