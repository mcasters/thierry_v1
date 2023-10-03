/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.output.globalObject = `(typeof self !== 'undefined' ? self : this)`;

    return config;
  },
  reactStrictMode: true,
};
module.exports = nextConfig;
