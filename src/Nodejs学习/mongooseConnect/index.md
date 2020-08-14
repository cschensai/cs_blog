## Mongoose如何进行连表查询
**在日常使用Node开发过程中，会搭配mongoose操作数据库产生想要的数据。很多时候单表查询已经满足功能，这里记录一下连表查询的使用。**
<hr />

### 定义Schema
```js
const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
	bookId: {
  	type: String,
    unique: true,
    requireed: true,
  },
  bookName: String,
  userInfo: {
  	type: String,
    ref: 'UserSchema', // 关联User表查询
  }
})

const UserSchema = new mongoose.Schema({
	userId: {
  	type: String,
    unique: true,
    requireed: true,
  },
  userName: String,
});
```

### 关联表查询
```js
// 查询Book表，将相关的User信息查询出来
BookSchema.find().populate({
	path: 'userInfo',
  select: {
  	userName: 1, // 只查询出来userName
    _id: 0, // 默认会带出_id字段，这里设置为0，不显示_id
  }
}).exec();
```