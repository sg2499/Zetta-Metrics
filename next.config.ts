import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // School Enrichment was renamed Krama; keep old links and search results working.
      { source: "/products/school-enrichment", destination: "/products/krama", permanent: true },
    ];
  },
  images: {
    // Next.js 16 requires every `quality` value used by <Image> to be
    // allowlisted here. 90 is used for product screenshots (fine UI text
    // needs to stay crisp); 100 for the footer wordmark.
    qualities: [75, 90, 100],
  },
};

export default nextConfig;
