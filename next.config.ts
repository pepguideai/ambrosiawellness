import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /journal renders on demand (it reads ?category=), so make sure the MDX
  // files it reads from disk ship with the serverless function on Vercel.
  outputFileTracingIncludes: {
    "/journal": ["./content/posts/**/*"],
    "/journal/*": ["./content/posts/**/*"],
  },
  images: {
    // Substack cover images
    remotePatterns: [
      { protocol: "https", hostname: "substackcdn.com" },
      { protocol: "https", hostname: "substack-post-media.s3.amazonaws.com" },
      { protocol: "https", hostname: "bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com" },
    ],
  },
};

export default nextConfig;
