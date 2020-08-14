## webpack-bundle-analyzer使用

```js
npm install webpack-bundle-analyzer -D

// 构建分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

plugins: config.plugins.concat([
  new BundleAnalyzerPlugin({
    analyzerMode: 'disabled',
    generateStatsFile: false, // false不生成stats.json文件
    statsOptions: { source: false },
  }),
]),
  
  
  // 如果需要看打包后的分析报告，需要将generateStatsFile的值设置为true即可（当前默认给false），然后运行tnpm run bundle-analyse即可查看分析报告
  new BundleAnalyzerPlugin({
    ...
    generateStatsFile: false,
    ...
  }),
  
  
  // package.json dist/stats.json:一般是在dist下，可根据不同的路径进行配置不同的命令
  // 运行build打包目录之后，再执行该脚本，因为stats.json依赖于打包目录
  "bundle-analyse": "webpack-bundle-analyzer --port 8888 dist/stats.json",
  
```