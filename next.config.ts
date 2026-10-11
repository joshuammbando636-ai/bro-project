import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site is three pages: Home, Services, Contact. Keep old links working.
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: true },
      { source: "/faq", destination: "/#faq", permanent: true },
      { source: "/gallery", destination: "/services#samples", permanent: true },
    ];
  },
};

export default nextConfig;
