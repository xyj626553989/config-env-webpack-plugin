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
const readFile = (compiler, path) => {
  if (fs.existsSync(path)) {
    return compiler.inputFileSystem.readFileSync(path, {
      encoding: "utf-8"
    });
  }
};

const formatParams = (content) => {
  if (!content) return {};
  let splitParams = content.split("\r\n");
  return splitParams
    .filter((item) => item)
    .map((item) => qs.parse(item))
    .reduce((memo, next) => {
      Object.keys(next).forEach((key) => {
        memo[key.trim()] = next[key] ? JSON.stringify(next[key].trim()) : "true";
      });
      return memo;
    }, {});
};
const runCallback = (compiler) => {
  const CONFIG_ENV = process.env.CONFIG_ENV || process.env.NODE_ENV;
  const defaultPath = resolve(process.cwd(), `.env`);
  const path = resolve(process.cwd(), `.env.${CONFIG_ENV}`);
  const defaultContent = readFile(compiler, defaultPath);
  const content = readFile(compiler, path);
  const params = formatParams(content);
  const defaultParams = formatParams(defaultContent);
  new DefinePlugin({
    "process.env": {
      ...defaultParams,
      ...params,
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  }).apply(compiler);
};
module.exports = ConfigEnvWebpackPlugin;
