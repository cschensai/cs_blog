## JS之apply、call和bind
***Function对象的原型链方法中存在apply、call和bind方法，可以用来改变this指向和传递参数作用。***
<hr/>

### 语法
```js
// apply
fn.apply(thisObj, [param1, param2, ...]);
// call
fn.call(thisObj, param1, param2, ...);
// bind
fn.bind(thisObj, param1, param2, ...);
```

### 区别

#### 参数的区别
- call、bind第一个参数是this对象，第二个参数是以‘，’隔开的参数
- apply第一个参数是this对象，第二个参数是数组（<span style="background-color: yellow;">这是call和apply的唯一区别</span>）

#### 执行时区别
- apply、call都是改变this指向后，马上执行该函数
- bind改变this指向后，不会执行该函数，需要手动调用执行

#### 返回值的区别
- call、apply返回的都是fn函数的执行结果
- bind返回的是fn函数的拷贝，并指定了fn函数的this指向，保存了fn函数的参数

### call、apply和bind的核心理念和好处
> 核心理念：都是借用已经定义好的方法<br />好处：借用其他已经定义好的方法，改变数据的this指向，减少了重复代码，节省内存，避免了内存泄露。

### 应用场景
#### call、apply应用场景
- 判断数据类型
```js
// 使用Object.prototype.toString.apply/call进行类型精确判断
/*
	'[object String]'
  '[object Number]'
  '[object Boolean]'
  '[object Null]':
  '[object Undefined]'
  '[object Object]'
  '[object Array]'
  '[object Function]'
  '[object Date]'
  '[object RegExp]'
  '[object Map]'
  '[object Set]'
  '[object HTMLDivElement]' // document.querySelector('#app')
  '[object WeakMap]'
  '[object Window]' // Object.prototype.toString.call(window)
  '[object Error]' // new Error('1')
  '[object Arguments]'
*/
// ex如下
Object.prototype.toString.call('string'); // "[object String]"
```

- 继承
```js
// 父类构造函数
function Father (sex) {
  this.sex = sex;
}
Father.prototype.say =  function () {
  console.log('sex', this.sex);
}
// 子类构造函数
function Son (sex) {
  Father.call(this, sex); // 继承父类函数的属性和方法
}
// 继承父类构造函数的方法
Son.prototype = Object.create(Father.prototype);
// 指定原型的构造函数
Son.prototype.constructor = Son;

const son = new Son('男');
son.sex; // 男
son.say(); // sex 男
```

- 最大值、最小值
```js
// 使用apply可以不用将参数展开
const numArr = [4, 1, 6];
Math.max.apply(Math, numArr); // 6;
Math.min.call(Math, 1, 2); // 1
```

- 最大值、最小值
```js
// 使用apply可以不用将参数展开
const numArr = [4, 1, 6];
Math.max.apply(Math, numArr); // 6;
Math.min.call(Math, 1, 2); // 1
```

#### bind应用场景
- 解决回调函数this丢失的问题
> 在React的render函数中，回调函数的this不会自动绑定，需要使用箭头函数或者在构造函数中使用bind进行手动绑定

- 保存当前参数
```js
// 这里使用bind保存参数，每次将最新的i值传递进去，在闭包中保存起来。（因为bind会返回一个函数，该函数就是闭包）
for (var i = 0; i < 5; i++) {
  // 缓存参数
  setTimeout(function (i) {
    console.log('bind', i) // 依次输出：1 2 3 4 5
  }.bind(null, i), 1000);
}
```
