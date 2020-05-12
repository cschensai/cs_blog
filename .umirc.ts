import { defineConfig } from 'dumi';

export default defineConfig({
  mode: 'doc', // 文档模式（默认值） site: 站点模式
  title: 'solider-ui',
  description: '像战士一样坚毅的PC组件库',
  // more config: https://d.umijs.org/config
  base: '/soldier-ui/',
  publicPath: '/soldier-ui/', //  必须以/结尾
});
