const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const nextConfig = withPWA({
  webpack5: true,
  pwa: {
    dest: "public",
    runtimeCaching,
  },
});

module.exports = nextConfig;
