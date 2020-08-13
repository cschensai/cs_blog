## JS之防抖和节流

### 防抖
```js
function debounce (fn, ms = 500) {
  let timer;
  return function () {
    // 用户每次点击输入时，清除上一个定时器
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, ms);
  }
}

// 测试
debounce(function() {
  console.log(111, ...arguments);
})(1, 2, 4)
```

### 节流
```js
function throttle (fn, ms = 500) {
  let isCanRunning = true;
  return function () {
    if (!isCanRunning) return false;
    setTimeout(() => {
      isCanRunning = false;
      fn.apply(this, arguments);
    }, ms);
  }
}

throttle(function() {
  // arguments: 类数组的实参对象
  console.log(111, Array.from(arguments));
})(1, 2, 3, 2)
```
