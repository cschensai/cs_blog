## copy-webpack-plugin使用
```js
npm install copy-webpack-plugin -D

// 将env-config进行单独打包
const CopyPlugin = require('copy-webpack-plugin');

// 使用，单独打包到打包目录中
plugins: config.plugins.concat([
  new CopyPlugin([
    { from: '../build/env-config.js', to: 'env-config.js' },
    { from: '../build/sendBucSSOToken.html', to: 'sendBucSSOToken.html' },
  ]),
]),
```