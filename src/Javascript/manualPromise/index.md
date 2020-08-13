### 手写简洁版本的Promise实现
```js
function Promise(exec) {
  // 成功时的值
  this.value = undefined;
  // 失败时的原因
  this.errReason = undefined;
  // then中的成功函数数组
  this.resolveFn = [];
  // then中的失败函数数组
  this.rejectFn = [];
  // 过程状态pending
  this.status = 'pending';
  // resolved状态函数
  const resolve = (value) => {
    if (this.status === 'pending') {
      // 赋值
      this.value = value;
      // 状态更改
      this.status = 'resolved';
      // 为了响应下面then函数中pending时机的函数数组
      this.resolveFn.forEach(fn => fn());
    }
  }
  // rejected状态函数
  const reject = (err) => {
    if (this.status === 'pending') {
      // 赋值
      this.errReason = err;
      // 状态更改
      this.status = 'rejected';
      // 为了响应下面then函数中pending时机的函数数组
      this.rejectFn.forEach(fn => fn());
    }
  }

  // 异常捕获
  try {
    exec(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

// 在原型上添加then函数
Promise.prototype.then = function (onFulfilled, onRejected) { // 这里不能使用箭头函数，因为this作用域会改变为{}
  if (this.status === 'resolved') {
    onFulfilled(this.value);
  }
  if (this.status === 'rejected') {
    onRejected(this.errReason);
  }
  if (this.status === 'pending') {
    this.resolveFn.push(() => {
      onFulfilled(this.value);
    });
    this.rejectFn.push(() => {
      onRejected(this.value);
    })
  }
}


// 测试
new Promise((resolve, reject) => {
  resolve('resolve');
}).then((data) => {
  console.log(222, data);
})
```