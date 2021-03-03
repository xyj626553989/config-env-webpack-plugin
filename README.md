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
CONFIG_ENV = XXX and the file is named .env.xxx

```json
{
  "scripts": {
    "build:test": "cross-env  CONFIG_ENV=test  NODE_ENV=production  webpack ",
    "build:prod": "cross-env  CONFIG_ENV=prod  NODE_ENV=production  webpack ",
    "build:xxx": "cross-env  CONFIG_ENV=xxx  NODE_ENV=production  webpack ",
    "start": "cross-env NODE_ENV=development  webpack serve"
  }
}
```

## **project directory**

You can set the public environment variable in the .env file because it will be read every time.

- |-- project
  - |-- .env -----------------------------content: COMMON_URL=www.default.com
  - |-- .env.development -----------------content: HTTP_URL=www.development.com
  - |-- .env.production ------------------content: HTTP_URL=www.production.com
  - |-- .env.test ------------------------content: HTTP_URL=www.test.com
  - |-- .env.xxx -------------------------content: HTTP_URL=www.xxx.com
  - |-- package.json
  - |-- public
    - | |-- index.html
  - |-- src
    - | |-- index.js

**use in your project**

```js
const httpUrl = process.env.HTTP_URL;
const commonUrl = process.env.COMMON_URL;
console.log(httpUrl);
console.log(commonUrl);
```
