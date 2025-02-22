import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: `${process.env.AWS_BUCKET_NAME}.s3.sa-east-1.amazonaws.com`,
      },
      {
        hostname: `${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com`,
      },
    ],
  },
};

export default nextConfig;
