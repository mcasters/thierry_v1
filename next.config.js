/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (webpackConfig) => {
    webpackConfig.output.globalObject = `(typeof self !== 'undefined' ? self : this)`;

    return webpackConfig;
  },
  reactStrictMode: true,
};
module.exports = nextConfig;
