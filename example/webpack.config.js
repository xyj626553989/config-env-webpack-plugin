const { DefinePlugin } = require("webpack");
const ConfigEnvWebpackPlugin = require("../dist");

module.exports = {
  plugins: [
    new ConfigEnvWebpackPlugin(),
    new DefinePlugin({
      "process.env": {
        URL: "'......'",
        URL_OUTER: "'xxxx'"
      }
    })
  ]
};
