# config-env-webpack-plugin

Set different environment variables for different environments

## Getting Started

To begin, you'll need to install config-env-Webpack-plugin:

```js
$ npm install config-env-Webpack-plugin --save-dev
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

**package.json**
Set the environment variable under package.json. For example:
Plugin reads the Node ENV environment by default

```json
{
  "scripts": {
    "build:test": "cross-env  CONFIG_ENV=test  NODE_ENV=production  webpack ", //测试环境
    "build:prod": "cross-env  CONFIG_ENV=prod  NODE_ENV=production  webpack ", //生产环境
    "start": "cross-env NODE_ENV=development  webpack serve" //本地开发环境
  }
}
```

**project directory**

- .env.development, .env.test, .env.production：Set a variable。

.env.development, .env.test, .env.production file content:

- DOMAIN=www.example.com
- REACT_APP_FOO=DOMAIN/foo
- REACT_APP_BAR=DOMAIN/bar
