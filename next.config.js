const withCSS = require("@zeit/next-css");
const withOffline = require("next-offline");

const nextConfig = {
  target: "serverless"
};

module.exports = withOffline(withCSS(nextConfig));
