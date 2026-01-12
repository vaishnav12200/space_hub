import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',  // Enable static export for Firebase Hosting
  trailingSlash: true,  // Better compatibility with Firebase
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,  // Required for static export
  },
};

export default nextConfig;
