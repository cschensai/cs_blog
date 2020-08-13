## JS同步和异步任务执行的顺序
> ###### js代码在js环境中分为同步和异步，由于js是单线程，同步代码会阻塞主线程的执行 ，造成页面空白。所以衍生出了异步代码、消息队列以及ES6的Promise引入的任务队列，都是解决同步阻塞的问题，而且他们都是需要在调用堆栈清空时才会执行。
> ###### 任务队列又分为两类：宏任务队列和微任务队列，在执行一个宏任务完成时，可能会执行一些微任务。在当前的宏任务中的微任务的队列未执行完时，是不能开始下一个宏任务的。这里的浏览器的事件循环机制是：
  - 选择一个宏任务，执行完毕后，下一步进入微任务队列
  - 选择一个微任务执行，执行完毕后，再选择下一个微任务，直到微任务队列清空，下一步
  - 更新UI渲染
###### 宏任务：script（全局任务）、setTimeout、setInterval、setImmediate、I/O、UI rendering
###### 微任务：Promise、process.nextTick、Object.observer、MutationObserver

### 模拟同步
> 按照调用堆栈的规则LIFO（后进先出）执行，都是宏任务，依次执行

```js
function syncFun1 () {
  console.log('syncFun1');
}
function syncFun () {
  console.log('nba');
  syncFun1();
  console.log('mba');
}
syncFun();
// nba  syncFun1  mba
```

### 模拟异步消息队列
> 这里的setTimeout会作为一个宏任务，等待之前的console宏任务执行完成后，再执行

```js
function syncFun1 () {
  console.log('cba');
}


function syncFun () {
  console.log('nba');
  setTimeout(syncFun1, 0);
  console.log('mba');
}
syncFun();
// nba   mba  cba
```
### 模拟异步消息队列和任务队列
> 这里的console作为一个宏任务，Promise作为一个微任务队列，会在第一个宏任务执行完成后，依次执行微任务队列中的任务。执行完成后，再去执行第二个宏任务setTimeout

```js
function syncFun1 () {
  console.log('cba');
}

function taskQueue () {
  new Promise((resolve, reject) => {
    resolve('promise task');
  }).then((result) => {
    console.log('result', result);
  }).catch((err) => {
    console.log('err', err);
  });
}

function syncFun () {
  console.log('nba');
  setTimeout(syncFun1, 0);
  taskQueue();
  console.log('mba');
}

syncFun();
// nba   mba  promise task  cba
```
