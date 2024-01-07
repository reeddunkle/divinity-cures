/* eslint-disable sort-keys */

const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");

const isDevMode = process.env.NODE_ENV === "development";

const withVanillaExtract = createVanillaExtractPlugin({});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "divinityoriginalsin2.wiki.fextralife.com",
      },
    ],
  },
};

module.exports = withVanillaExtract(nextConfig);
