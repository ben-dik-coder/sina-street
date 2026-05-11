import type { NextConfig } from "next";

/**
 * `npm run dev` setter `NEXT_DEV_CACHE=1` → output i `.next-dev`
 * `next build` / `next start` uten den variabelen → `.next`
 * Da skriver ikke dev og build til samme mappe (færre ENOENT / 500).
 */
const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DEV_CACHE === "1" ? ".next-dev" : ".next",
  /** Skjul Next-indikator / mindre dev-UI — bedre for kundedemo også i dev */
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
