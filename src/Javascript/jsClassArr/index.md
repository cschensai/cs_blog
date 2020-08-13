## JS处理类数组
> 这里转换的原理是将具有可迭代性（具有length属性）的对象转换为数组

### 测试函数
```js
// 这里因为是使用的arguments测试，所以不能使用箭头函数（因为箭头函数不存在this和arguments对象）
function arrLike () {
    // 返回arguments对象,代表实参
    return arguments;
}
```

### Array.from
```js
const arr = Array.from(arrLike(1, 2));
console.log(arr); // [1, 2]
```

### Array.prototype.slice.call(arrLike)
```js
const arr = Array.prototype.slice.call(arrLike(1, 2));
console.log(arr); // [1, 2]
```

### ES6的展开
```js
console.log([...arrLike(1, 2)]); // [1, 2]
```