const withPlugins = require('next-compose-plugins')
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const withBundleAnalyzer = require("@next/bundle-analyzer");


module.exports = withPlugins([
  [
    withPWA,
    {
      pwa: {
        dest: "public",
        disable: process.env.NODE_ENV === "development",
        runtimeCaching,
      },
    },
  ],
  [
    withBundleAnalyzer,
    {
      enabled: process.env.NODE_ENV === "development",
    },
  ],
]);
