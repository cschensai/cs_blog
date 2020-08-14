## Mpvue引入fontAwesome图标库

```
npm i font-awesome –save
// main.js里 添加 
import ‘font-awesome/css/font-awesome.min.css’
```



> 此时 使用的话 报错
>
> VM23297:2 Failed to load local font resource /static/fonts/fontawesome-webfont.woff2-do-not-use-local-path-./static/css/app.wxss&4&7
>
> the server responded with a status of 404 (HTTP/1.1 404 Not Found)



![image](https://cs-static-assets.oss-cn-beijing.aliyuncs.com/dumi_blog/29.png)



> 解决方法 在 build文件夹里 修改 webpack.base.conf.js 文件
>
> 如下：
>
> 重点是去除limit限制



![image](https://cs-static-assets.oss-cn-beijing.aliyuncs.com/dumi_blog/30.png)