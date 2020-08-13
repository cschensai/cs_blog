## JS闭包
> 闭包：在自己的作用域中引用了外层作用域变量的函数。
> 这里有两个关键词：1.外层作用域变量   2.函数

### 简单闭包
```js
// 日常开发中最常见的闭包case
let variable = 1;
function fn(){
    console.log(variable);
}
fn();  // 1
```

### 闭包的局限
```js
// 这是全局作用域, 相对于两个函数作用域来说是全局作用域就是外层作用域
// 在外层作用域中定义一个变量
let outerVariable = 1;

function fn(){
    // 这里面是函数作用域, 相对说也是内层作用域
    // 在内层作用域内定义一个变量
    let innerVariable = 2;

    // 在内层作用域内访问外层作用域中的变量 outerVariable
    console.log(outerVariable); // 1
}

fn(); // 调用函数, 输出 1, 说明在函数(内层)作用域里可以访问到全局(外层)作用域里的变量

// 在外层作用域里尝试访问内层作用域的变量
console.log(innerVariable); // ReferenceError: innerVariable is not defined
// 报了引用错误, 说明外层作用域中没有 innerVariable 这个变量, 也就是说明外层无法访问到内层作用域中定义的变量。
```

### 通过闭包实例，访问引用的外层作用域变量
```js
function outer(){
  let outerVariable = 0;
  let inner = function(){
    console.log('outerVariable === ', outerVariable);
  }

  return inner;
}
  
let closure = outer(); // 调用 outer 函数, 得到 inner 函数, 也就是得到了一个闭包实例

// 运行这个闭包, 在这个闭包里仍然可以访问它引用的外层作用域里的变量 outerVariable
closure(); // outerVariable ===  0
```

### 闭包实例的环境互相独立
```js
function outer(){
    let outerVariable = 0;

    let inner = function(){
        outerVariable ++; // 增加的代码, 在输出 outerVariable 之前, 先让他自增 1
        console.log('outerVariable === ', outerVariable);
    }
    return inner;
}

let closure1 = outer(); // 修改的代码, 实例化一个闭包并命名为 closure1
let closure2 = outer(); // 修改的代码, 再实例化第二个闭包并命名为 closure2

// 增加的代码, 调用三次 closure1, 观察 closure1 引用的变量 outerVariable 的变化
closure1();  // outerVariable ===  1
closure1();  // outerVariable ===  2
closure1();  // outerVariable ===  3

// 增加的代码, 调用一次 closure2, 观察 closure2 引用的变量 outerVariable 的值
closure2();  // outerVariable ===  1
/* 发现闭包 closure2 引用的 outerVariable 值没有受到闭包 closure1 的影响*/
```

### 经典闭包，考查闭包实例环境的独立性
```js
function Person(){
    let age = 24;

    this.getAge = function(){
        return age;  // 引用了外层的变量
    }

    this.grow = function(){
        age ++;  // 引用了外层的变量
    }
}

let xm = new Person(); // 实例化小明 xm 
// 无法通过 xm.age 来访问 xm 的年龄;

// 获取 xm 的年龄
let ageThisYear = xm.getAge();
console.log('小明今年的年龄是 ' + ageThisYear); // 小明今年的年龄是 24

// 过了一年, xm 涨了一岁
xm.grow();

// 获取小明过年之后的年龄
let ageNextYear = xm.getAge();
console.log('小明明年的年龄是', ageNextYear); // 小明今年的年龄是 24
```