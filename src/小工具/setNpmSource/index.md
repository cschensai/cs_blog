## 设置npm镜像源
**尽量不要使用cnpm，因为cnpm安装的模块路径比较奇怪，导致package有时不能被正常识别！**
<hr/>

```nginx
// 为npm设置镜像源
npm config set registry https://registry.npm.taobao.org --global

// 为yarn设置镜像源
yarn config set registry https://registry.npm.taobao.org --global
```