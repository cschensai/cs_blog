## webpack最简洁版配置模板

***当前的前端开发已经工程化、自动化、组件化和模块化，所以在开发工程项目时，需要结合webpack打包工具对项目进行一系列优化，也为了拥抱前端的三大框架，webpack的地位已经举足轻重了。下面是一个梳理版的最简洁的webpack开发模版。***
<hr/>

### 首先初始化一个项目
```nginx
mkdir webpack-demo && cd webpack-demo && npm init -y
```
### 安装webpack工程所需依赖
```nginx
// 当前安装的已经是webpack v4版本了，这里不建议全局安装，因为有可能会对本地项目造成影响，推荐在项目下本地安装
npm  i webpack webpack-cli -D
```

### 组织项目结构
> 在根项目下，新建index.html文件，并引入src下的index.js文件

![image.png](https://cdn.nlark.com/yuque/0/2019/png/144308/1561446977467-9651cc5c-22da-4ace-a7b0-1e0e7c4afaa0.png)

### 在package.json文件中修改脚本如下
```js
// 如果这里不设置webpack的mode，控制台会出现警告，不设置默认为production环境，打包的文件会进行压缩。这里设置为development环境，打包的文件不会进行压缩
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack --mode development"
  },
```

### 启动脚本进行打包
```nginx
// 执行以下命令会出现dist文件，这里没设置入口和出口文件，是因为webpack的默认入口文件是src下的index.js，出口文件为dist目录下的main.js
npm start
```
![image.png](https://cdn.nlark.com/yuque/0/2019/png/144308/1561447709446-529783c6-d4eb-48f6-940c-d839fcfaacb9.png)

### 使用配置文件进行打包
> 在根项目下新建webpack.config.js，设置入口和出口文件

```js
const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
}
```

### 使用htmlWebpack模板插件
```js
// 这里会在build文件里自动生成一个以根目录下的index.html为模板的html文件 
const HtmlWebpack = require('html-webpack-plugin');
module.exports = {
  ...
  plugins: [new HtmlWebpack({
    template: './index.html'
  })],
}
```

### 使用loader处理css文件
> 这里只是处理css文件，所以只依赖于style-loader和css-loader
- 在index.js文件中引入index.css
```js
import './index.css';
```
- css-loader：解析并变异@import和url，将css dom树转换为字符串
- style-loader：将转换后的字符串嵌入到style标签中
```js
module.exports = {
  ...
  // loader
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  }
}
```
![image.png](https://cdn.nlark.com/yuque/0/2019/png/144308/1561449327692-343f000d-40a2-4825-9346-45a6b605d06c.png?x-oss-process=image%2Fresize%2Cw_746)
