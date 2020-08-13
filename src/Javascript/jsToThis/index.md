## JS中处理this指向

### 自定义一个指向函数，作为测试使用
```js
// 这里因为是使用的arguments测试，所以不能使用箭头函数（因为箭头函数不存在this和arguments对象）
function arrLike () {
    // 返回arguments对象,代表实参
    return arguments;
}
```

### ES5方法和对象分离
```js
function Person (firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;

  this.fullName = function () {
    return `${this.firstName}-${this.lastName}`;
  }
}

const aget = new Person('我是', '小明');
console.log(aget.fullName()); // 我是-小明,这里的this指向aget实例

// 拆开之后就变成了方法和对象分离了，this对象和Persion不再有直接联系。
// 拆分：const temp = aget.fullName; exec(temp);
console.log(exec(aget.fullName)); // undefined-undefined // 这里的this指向global（window）对象
```

### ES5关闭上下文
```js
function Person (firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  // 静态关闭this指向（引入额外变量）
  const that = this;
  this.fullName = function () {
    return `${that.firstName}-${that.lastName}`;
  }
}

const aget = new Person('我是', '小明');
console.log(aget.fullName()); // 我是-小明
console.log(exec(aget.fullName)); // 我是-小明
```

### ES5箭头函数
```js
function Person (firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  // 在词法上改变this指向
  this.fullName =  () => {
    return `${this.firstName}-${this.lastName}`;
  }
}

const aget = new Person('我是', '小明');
console.log(aget.fullName()); // 我是-小明
console.log(exec(aget.fullName)); // 我是-小明
```

### ES6写法改造
```js
class Person {
  constructor (firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  fullName () {
    return `${this.firstName}-${this.lastName}`;
  }
}
const aget = new Person('我是', '小明');

console.log(aget.fullName()); // 我是-小明，this是aget实例
console.log(exec(aget.fullName)); //erorr，this为undefined，读取不到属性,这里和ES5的写法不同，ES5这里的this是global（window）对象
```

### ES6绑定上下文
```js
class Person {
  constructor (firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    // this绑定
    this.fullName = this.fullName.bind(this);
  }
  fullName () {
    return `${this.firstName}-${this.lastName}`;
  }
}

const aget = new Person('我是', '小明');

console.log(aget.fullName()); // 我是-小明
console.log(exec(aget.fullName)); // 我是-小明
```

### ES6胖箭头函数
```js
class Person {
  constructor (firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  fullName = ()=> {
    return `${this.firstName}-${this.lastName}`;
  }
}

const aget = new Person('我是', '小明');
console.log(aget.fullName()); // 我是-小明
console.log(exec(aget.fullName)); // 我是-小明
```