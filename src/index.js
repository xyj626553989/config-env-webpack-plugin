const fs = require("fs");
const qs = require("qs");
const { readFile } = require("fs").promises;
const { DefinePlugin } = require("webpack");
const { resolve } = require("path");
class ConfigEnvWebpackPlugin {
  constructor() {
    this.prefix = ".env";
  }
  apply(compiler) {
    compiler.hooks.watchRun.tapAsync("ConfigEnvWebpackPlugin", this._runCallback.bind(this));
    compiler.hooks.run.tapAsync("ConfigEnvWebpackPlugin", this._runCallback.bind(this));
  }
  async _runCallback(compiler, cb) {
    // 读取环境变量
    const CONFIG_ENV = process.env.CONFIG_ENV || process.env.NODE_ENV || compiler.options.mode;
    let defaultPath = getPath(this.prefix, compiler);
    let filePath = getPath(`${this.prefix}.${CONFIG_ENV}`, compiler);
    const defaultContent = getContent(defaultPath);
    const fileContent = getContent(filePath);
    const result = await Promise.all([defaultContent, fileContent]);
    const params = getParams(result);
    new DefinePlugin({
      "process.env": {
        ...params,
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        BABEL_ENV: JSON.stringify(process.env.BABEL_ENV)
      }
    }).apply(compiler);
    cb();
  }
}
//获取path
const getPath = (filename, compiler) => {
  let path = resolve(process.cwd(), filename);
  if (fs.existsSync(path)) {
    return path;
  }
  path = resolve(compiler.context, filename);
  if (fs.existsSync(path)) {
    return path;
  }
};
//读取内容
const getContent = async (path) => {
  if (path) {
    return readFile(path, {
      encoding: "utf-8"
    });
  }
};

const getParams = (results) => {
  let obj = {};
  results
    .filter((item) => item)
    .forEach((content) => {
      let splitParams = content.split("\r\n");
      splitParams
        .filter((item) => item)
        .map((item) => qs.parse(item))
        .reduce((memo, next) => {
          Object.keys(next).forEach((key) => {
            memo[key.trim()] = next[key] ? JSON.stringify(next[key].trim()) : "true";
          });
          return memo;
        }, obj);
    });
  return obj;
};
module.exports = ConfigEnvWebpackPlugin;
