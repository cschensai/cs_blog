## Socket.io和Socket.io-client开发
***关于实时聊天进行通信，这里选择使用服务端插件socket.io和客户端插件socket.io-client，分别在npm或者github中都可看到相关文档。下面是React+Koa的前后端方案示例***
<hr/>

### Koa服务端使用
```js
const Koa = require('koa')
const app = new Koa()
const server = require('http')(app.callback())
const io = require('socket.io')(server)
io.on('connection', socket => {
  // sock.io连接成功
  
	// socket:单线连接
  socket.emit('data', () => {
  	// 单线发送消息
  })
  socket.on('data', data => {
  	// 接收消息
  })
  socket.on('disconnect', () => {
  	// socket连接失败
  })
  io.emit('broadcast', () => {
  	// 全部进行广播，发送消息
  })
})
server.listen(3333, () => {
	console.log('sever is running %d', 3333)
})
```

### React客户端使用
```js
import React from 'react'
import io from 'socket.io-client'

// 指定连接服务器的地址
io('http://localhost:3333')

export default class ClientSocketIo extends React.Component {
	componentDidMount () {
    io.on('connection', socket => {
      // socket.io-client连接成功

      socket.on('data', data => {
        // 接收服务端回传的消息
      })
      socket.emit('data', () => {
        // 发送消息到服务端
      })
      socket.on('disconnect', () => {
        // socket连接失败
      })
    })
  }
  render () {
  	return null
  }
}
```