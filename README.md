# config-env-webpack-plugin

Set different environment variables for different environments

## Getting Started

To begin, you'll need to install config-env-Webpack-plugin:

```js
$ npm install config-env-webpack-plugin --save-dev
```

Then add the plugin to your webpack config. For example:
**webpack.config.js**

```js
    const ConfigEnvWebpackPlugin = require("config-env-webpack-plugin");
    module.exports = {
        ...
        plugins:[
            new ConfigEnvWebpackPlugin()
        ]
    }
```

## **package.json**

Set the environment variable under package.json. For example:
Plugin reads the Node_ENV environment by default
CONFIG_ENV= XXX and the file is named.env.xxx

```json
{
  "scripts": {
    "build:test": "cross-env  CONFIG_ENV=test  NODE_ENV=production  webpack ", //测试环境
    "build:prod": "cross-env  CONFIG_ENV=prod  NODE_ENV=production  webpack ", //生产环境
    "start": "cross-env NODE_ENV=development  webpack serve" //本地开发环境
  }
}
```

## **project directory**

The .env file defines a common environment variable that will be read by all hit CONFIG_ENVs

- |-- project
  - |-- .env -----------------------------content: COMMON_URL=www.default.com
  - |-- .env.development -----------------content: HTTP_URL=www.development.com
  - |-- .env.production ------------------content: HTTP_URL=www.production.com
  - |-- .env.test ------------------------content: HTTP_URL=www.test.com
  - |-- package.json
  - |-- public
    - | |-- index.html
  - |-- src
    - | |-- index.js

**use in your project**

```js
const httpUrl = process.env.HTTP_URL;
const commonUrl = process.env.COMMON_URL;
```
