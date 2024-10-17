/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [768, 1200],
  },
  experimental: {
    forceSwcTransforms: true,
  },
};
module.exports = nextConfig;
