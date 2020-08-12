import { defineConfig } from 'dumi';

export default defineConfig({
  mode: 'doc', // 文档模式（默认值） site: 站点模式
  title: '前端diaos',
  description: '像士兵一样坚毅的diaos',
  logo: 'https://img.51miz.com/Element/00/85/46/32/234a3332_E854632_321ed6a8.png',
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
