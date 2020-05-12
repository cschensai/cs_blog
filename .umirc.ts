import { defineConfig } from 'dumi';

export default defineConfig({
  mode: 'doc', // 文档模式（默认值） site: 站点模式
  title: 'solider-ui',
  description: '像战士一样坚毅的PC组件库',
  // more config: https://d.umijs.org/config
  base: '/soldier-ui/', // 访问路线/soldier-ui/为前缀
  publicPath: '/soldier-ui/', // 引入资源，以'/soldier-ui/‘开头，且必须以/结尾
  // 按需加载
  extraBabelPlugins: [
    ['babel-plugin-import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }],
  ],
});
