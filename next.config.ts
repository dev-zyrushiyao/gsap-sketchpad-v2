import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: "/gsap-sketchpad-v2",
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
