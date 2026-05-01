import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "ai.esmplus.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "icdopicpjpslxgsopbts.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
       {
         protocol: "https",
         hostname: "logo.clearbit.com",
       },
    ],
  },
};

export default nextConfig;