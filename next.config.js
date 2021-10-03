const isValwal = process.env.TARGET === "valwal"
console.log(`isValwal: ${isValwal}`)

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  basePath: isValwal ? "/groombridge" : undefined,
  assetPrefix: isValwal ? "/groombridge/" : undefined,
})
