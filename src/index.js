const fs = require("fs");
const { DefinePlugin } = require("webpack");
const qs = require("qs");
const { resolve } = require("path");
class ConfigEnvWebpackPlugin {
  apply(compiler) {
    compiler.hooks.watchRun.tap("ConfigEnvWebpackPlugin", runCallback);
    compiler.hooks.run.tap("ConfigEnvWebpackPlugin", runCallback);
  }
}
const runCallback = (compiler) => {
  const CONFIG_ENV = process.env.CONFIG_ENV || process.env.NODE_ENV;
  const path = resolve(process.cwd(), `.env.${CONFIG_ENV}`);
  let isFind = fs.existsSync(path);
  if (!isFind) {
    throw new Error(`The ${path} file could not be found, you should create it in the same directory as package.json`);
  }
  const content = compiler.inputFileSystem.readFileSync(path, {
    encoding: "utf-8"
  });

  let splitParams = content.split("\r\n");
  const params = splitParams
    .filter((item) => item)
    .map((item) => qs.parse(item))
    .reduce((memo, next) => {
      Object.keys(next).forEach((key) => {
        memo[key.trim()] = next[key] ? JSON.stringify(next[key].trim()) : "true";
      });
      return memo;
    }, {});
  new DefinePlugin({
    "process.env": {
      ...params,
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  }).apply(compiler);
};
module.exports = ConfigEnvWebpackPlugin;
