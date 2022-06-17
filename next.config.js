const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const nextConfig = withPWA({
  webpack5: true,
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    runtimeCaching,
  },
});

module.exports = nextConfig;
