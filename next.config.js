const isProduction = process.env.NODE_ENV === "production"

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  basePath: isProduction ? "/groombridge" : undefined,
  assetPrefix: isProduction ? "/groombridge/" : undefined,
})
