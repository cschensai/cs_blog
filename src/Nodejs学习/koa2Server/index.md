## Koa2-Server简洁开发模版

### Server文件目录结构：

- **database**：数据库相关配置和逻辑

  - **api**：具体API接口
  - **schema**：数据结构模型
  - **index.js**： 数据库连接逻辑

- **index.js**：新建Koa服务，进行数据库连接和初始化数据模型，通过路由注册API接口
- **package.json**：项目所依赖包集合
- **yarn.lock**：依赖package.json锁定指定的包版本



![image.png](https://cs-static-assets.oss-cn-beijing.aliyuncs.com/dumi_blog/7.png)



### Server目录下Index.js



```js
const Koa = require('koa')
// 新建Koa实例
const app = new Koa()
// 解决跨域
const cors = require('koa2-cors')
// 解析post请求body体
const bodyParser = require('koa-bodyparser')
const { connectDb, initSchema } = require('./database/index')

app.use(cors({
  credentials: true, // 解决跨域场景下传递cookie的问题
  origin: 'http://localhost:8000' // 前端服务域名
}))
// 注册bodyParser()
app.use(bodyParser())
// 连接数据库
connectDb()
// 初始化加载数据模型
initSchema()

// 使用koa-router映射API接口地址
const Router = require('koa-router')
const router = new Router()
// 子路由
const UserRouter = require('./database/api/user')
router.use('/user', UserRouter.routes())
app.use(router.routes()).use(router.allowedMethods())

// server port
app.listen(3333, () => {
  console.log('server is running %s', 3333)
})
```



### Server目录下package.json(具体包版本以安装时为准)

```js
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "glob": "^7.1.3",
    "koa": "^2.7.0",
    "koa-bodyparser": "^4.2.1",
    "koa-router": "^7.4.0",
    "koa2-cors": "^2.0.6",
    "mongoose": "^5.4.20"
  }
}
```



### Database下index.js



```js
const mongoose = require('mongoose')
const glob = require('glob')
const path  = require('path')
// 数据库本地地址，使用前需要本地开启数据库服务
const dbAddress = 'mongodb://localhost:27017/myDataBase'

let connectCount = 0
exports.connectDb = () => {
  function connect() { 
    mongoose.connect(dbAddress, {
      useNewUrlParser: true,
      useCreateIndex: true
    })
  }
  // 初始连接
  connect()
  // 数据库连接断开
  mongoose.connection.on('disconnected', () => {
    if (connectCount < 3) {
      connect()
      connectCount+=1
    } else {
      throw new Error('数据库disconnected')
    }
  })
  // 数据库连接错误
  mongoose.connection.on('error', () => {
    if (connectCount < 3) {
      connect()
      connectCount+=1
    } else {
      throw new Error('数据库error')
    }
  })
  // 数据库连接成功
  mongoose.connection.once('open', () => {
    console.log('数据库连接成功')
  })
}
// 加载schema目录下的数据模型
exports.initSchema = () => {
  glob.sync(path.resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}
```



### Database／Schema下user.js



```js
const mongoose = require('mongoose')
// 生命Schema
const Schema = mongoose.Schema
// 实例化并定义字段
const UserSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    default: 'boss'
  }
})
// 发布Schema
mongoose.model('UserSchema', UserSchema)
```



### Database／Api下user.js



```js
const mongoose = require('mongoose')
// 获取发布的Schema
const UserSchema = mongoose.model('UserSchema')
const Router = require('koa-router')
const UserRouter = new Router()
// 通过koa-router定义API接口及请求方式
UserRouter.post('/register', async ctx => {
  const { body } = ctx.request
  try {
    const res = await UserSchema.findOne({ userName: body.userName }).exec()
    if (res) {
      return ctx.body = {
        code: 500,
        msg: '用户名已经注册'
      }
    }
    const newUser = await new UserSchema(body).save()
    // 设置cookie
    ctx.cookies.set('userId', newUser._id, {
      path: '/',
      httpOnly: false,
      overwrite: false,
      maxAge: 10 * 60 * 1000 //ms
    })
    ctx.body = {
      code: 200,
      msg: '注册成功'
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      msg: '注册失败'
    }
  }
})

UserRouter.post('/login', async ctx => {
  try {
    const { body } = ctx.request
    const res = await UserSchema.findOne({userName: body.userName, password: body.password}, { password: 0 })
    if (!res) {
      return ctx.body = {
        code: 500,
        msg: '用户名或者密码不正确！'
      }
    }
    ctx.cookies.set('userId', res._id, {
      path: '/',
      httpOnly: false,
      overwrite: false,
      maxAge: 10 * 60 * 1000 //ms
    })
    ctx.body = {
      code: 200,
      msg: '登录成功',
      data: res
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      msg: '登录失败'
    }
  }
})

// 导出路由
module.exports = UserRouter
```



### 小结：

基础的完整目录和结构已经完成，然后运行以下步骤

- cd server && npm i／yarn
- nodemon index.js (没有nodemon可以安装一下，监听服务端文件变化，自动重启服务）