## postMessage解决跨域、跨窗口消息传递

***如果需要在页面内嵌的iframe页面中传递数据到当前页面中，很可能涉及到跨域和跨窗口通信，这是浏览器的同源策略所不允许的。我们这里可以使用html5的<span style="background-color: yellow;">postMessage</span>进行通信，具体case如下：***
<hr/>

### postMessage接收两个参数

> 1.data:要传递的数据。<br/>
> 2.origin：字符串参数，指明目标窗口的源，协议+主机名+端口号[+URL]，URL会被忽略，所以可以不写，这个参数是为了安全考虑，postMessage()方法只会将message传递给指定窗口，当然如果愿意也可以将参数设置为"*"，这样可以传递给任意窗口，如果要指定和当前窗口同源的话设置为"/"。

### 如果是在ifame里向当前页面传递数据
```js
// iframe
window.parent && window.parent.postMessage('向当前页面中传递的数据', '*');

// 当前页面
window.addEvenetListener('message', (data) => {
	console.log(data); // 向当前页面中传递的数据
}, false); // 默认冒泡方式处理
```

### 如果是在当前页面向iframe中通信
```js
// 当前页面
window.frames[0].postMessage('向iframe中传递的数据', '*');

// iframe
window.addEventListener('message', (data) => {
  console.log(data); // 向iframe中传递的数据
}, false);
```