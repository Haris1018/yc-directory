import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  dangerouslyAllowSVG:true,

  images: {
    domains: ["encrypted-tbn0.gstatic.com", "gstatic.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
    ],
  },

  devIndicators:{
    appIsrStatus:true,
    buildActivity:true,
    buildActivityPosition:"bottom-right",
  }

};

export default nextConfig;
