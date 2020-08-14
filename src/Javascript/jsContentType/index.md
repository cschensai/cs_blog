## Content-Type的两种请求方式
**在封装请求库的过程中，我们会有两种请求内容的类型。一种是application/json，另一种是application/x-www-form-urlencoded。**
<hr/>

### 相应的POST请求的body体使用如下
#### application/x-www-form-urlencoded
```js
POST  HTTP/1.1
Host: www.demo.com
Cache-Control: no-cache
Postman-Token: 81d7b315-d4be-8ee8-1237-04f3976de032
Content-Type: application/x-www-form-urlencoded

key=value&testKey=testValue
```

### application/json
```js
POST  HTTP/1.1
Host: www.demo.com
Cache-Control: no-cache
Postman-Token: 81d7b315-d4be-8ee8-1237-04f3976de032
Content-Type: application/json

{key1: 'key1', key2: []}
```