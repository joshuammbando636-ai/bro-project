import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pages: Home, Services, Blog, Contact. Keep old links working.
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: true },
      { source: "/faq", destination: "/#faq", permanent: true },
      { source: "/gallery", destination: "/services#samples", permanent: true },
    ];
  },
};

export default nextConfig;
