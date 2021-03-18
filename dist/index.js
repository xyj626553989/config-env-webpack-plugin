"use strict";

const fs = require("fs");

const qs = require("qs");

const {
  readFileSync
} = require("fs");

const {
  DefinePlugin
} = require("webpack");

const {
  resolve
} = require("path");

class ConfigEnvWebpackPlugin {
  constructor() {
    this.prefix = ".env";
  }

  apply(compiler) {
    this._runCallback(compiler);
  }

  _runCallback(compiler) {
    const CONFIG_ENV = process.env.CONFIG_ENV || process.env.NODE_ENV || compiler.options.mode;
    let defaultPath = getPath(this.prefix, compiler);
    let filePath = getPath(`${this.prefix}.${CONFIG_ENV}`, compiler);
    const defaultContent = getContent(defaultPath);
    const fileContent = getContent(filePath);
    const result = [defaultContent, fileContent];
    const params = getParams(result);
    new DefinePlugin({
      "process.env": { ...params,
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        BABEL_ENV: JSON.stringify(process.env.BABEL_ENV)
      }
    }).apply(compiler);
  }

}

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

const getContent = path => {
  if (path) {
    return readFileSync(path, {
      encoding: "utf-8"
    });
  }
};

const getParams = results => {
  let obj = {};
  results.filter(item => item).forEach(content => {
    let splitParams = content.split(/[(\r\n)\r\n]+/);
    splitParams.filter(item => item).map(item => qs.parse(item)).reduce((memo, next) => {
      Object.keys(next).forEach(key => {
        memo[key.trim()] = next[key] ? JSON.stringify(next[key].trim()) : JSON.stringify("");
      });
      return memo;
    }, obj);
  });
  return obj;
};

module.exports = ConfigEnvWebpackPlugin;