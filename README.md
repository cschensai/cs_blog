# dumi 基于father、rollup和babel的组件打包脚手架

## 开启服务

Install dependencies,

```bash
$ npm i
```

启动服务器

```bash
$ npm start
```

部署文档

```bash
$ npm run docs:build

$ npm run deploy
```

构建应用包

```bash
$ npm run build

$ npm verison patch/minor/major

$ npm publish
```

```
> 需要10.13.0以上,添加到package.json会进行校验,这里暂时去掉
"gitHooks": {
  "pre-commit": "lint-staged"
},

> 该ui库支持按需导入
> .babelrc
{
  "plugins": [
    ["import", { "libraryName": "soldier-ui", "style": true }]
  ]
}
```
