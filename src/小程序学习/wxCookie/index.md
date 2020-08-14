## 微信小程序请求时cookie处理

***微信小程序的`wx.request()`方法默认不会传递cookie，所以需要我们在登录之后将服务端的cookie取回进行存储。***
<hr/>


```js
wx.setStorage({
    key: 'cookie',
    data: result.header["Set-Cookie"], // 从返回数据的响应头中取cookie
    success: (result)=>{
        wx.navigateTo({
            url: '/pages/article/main'
        })
    }
})
```



> 进行cookie数据的传递，可以在`wx.request()`的`header`字段中添加`cookie`属性即可，因为它不像web请求库自动会带上，所以需要手动添加上



```js
wx.getStorage({
        key: 'cookie',
        success: (cookie)=>{
          wx.request({
            url: requestUrl.getArticle,
            data: {},
            header: {
              'content-type':'application/json',
              'cookie': cookie.data // 设置cookie
            },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result)=>{
              // ...
            },
            fail: () => {
              // ...
            },
          })
        }
      })
```