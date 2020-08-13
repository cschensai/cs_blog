## 对异步函数封装异常处理函数
***想使得程序更加健壮，需要对请求函数进行异常捕获，对每个函数添加try...catch对于体量大的项目，工作量相对也大。这里通过数组解构方式，记性统一处理返回结果和异常结果。***
<hr/>

### 封装
```js
async function tryCatch (fn) {
  try {
    const res = await fn();
    return [null, res];
  } catch (error) {
    return [error, null];
  }
}
```

### 调用
```js
(async () => {
  const [err, res] = await tryCatch(异步函数);
  if (err) {
    return '错误处理';
  }
  return '正常结果';
})();
```