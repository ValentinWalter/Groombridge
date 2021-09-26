const isProduction = process.env.NODE_ENV === "production"

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  basePath: isProduction ? "/groombridge" : undefined,
  assetPrefix: isProduction ? "/groombridge/" : undefined,
}
