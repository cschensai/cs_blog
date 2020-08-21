## React-antd-mobile Grid组件异常问题解决方案

> 使用antd-mobile组件的Grid组件的跑马灯展示效果时，初始加载时高度撑不开。官方给出的解决方案为：手动延迟派发一个resize事件。

```js
// 解决方案，在componentDidMount时进行一次事件派发
componentDidMount () {
  this.eventTimer = setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 0);
}
componentWillUnmount () {
  // 清除延时器任务
  clearTimeout(this.eventTimer);
}
```