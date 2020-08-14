## Wepy开发总结

### 小程序开发文档

#### 注意事项：
1. 小程序的头像、介绍每月仅可修改5次
2. 服务范围每月仅可修改1次
3. 小程序发布前，小程序名称仅可以修改2次



### 开发前准备



1．登录微信公众平台，进入用户身份-->开发者，进行开发者绑定



![image](https://cs-static-assets.oss-cn-beijing.aliyuncs.com/dumi_blog/11.png)



2．注册小程序账号，进入设置-->开发设置，获取申请到的AppID（记得保存下来，后面要使用），有域名和服务器可以顺带将域名在设置-->开发设置中进行配置



![image](https://cs-static-assets.oss-cn-beijing.aliyuncs.com/dumi_blog/12.png)



3．这里使用的是小程序的开发框架wepy，网址如下所示：（https://tencent.github.io/wepy/#/），参照文档命令进行项目脚手架的搭建，使用官网推荐的1.7.0之后的版本的命令



4．安装微信开发者工具，选择本地小程序项目打包生成的dist目录，将之前获取到的AppId账号输入，输入项目名称，进入微信demo页面



![image](https://cs-static-assets.oss-cn-beijing.aliyuncs.com/dumi_blog/13.png)



5．打开微信开发者工具，选择设置—>项目设置，下方的四个复选框全部不选！（否则在真机上调试偶尔会出错的）



![image](https://cs-static-assets.oss-cn-beijing.aliyuncs.com/dumi_blog/14.png)



6．使用自己熟悉的编辑器进行本地小程序项目的开发，这里使用的VSCode进行开发，将项目中的.wpy文件和vue关联，即可实现高亮语法



![image](https://cs-static-assets.oss-cn-beijing.aliyuncs.com/dumi_blog/15.png)



### 开发中注意事项和参考事例



1. app.wpy:文件负责部分全局样式的设置、tabBar配置、路径的配置以及用户信息的获取



2. pages/index.wpy：这里的pages目录是我们业务文件放置的入口



3. 目前我们只需根据场景往pages目录添加文件就可以了，记得开启令wepy build --watch 进行实时编译，有错误会在这里 面进行展示的



4. 这个框架是借鉴了vue的语法和功能特性，这里我们可以使用axios的请求方式



5. 我们在业务中对数据进行数据绑定之后，必须手动进行脏数据检查（详细了解请看下面链接：[https://tencent.github.io/wepy/document.html#/?id=wepy%E6%95%B0%E6%8D%AE%E7%BB%91%E5%AE%9A%E6%96%B9%E5%BC%8F](https://tencent.github.io/wepy/document.html#/?id=wepy数据绑定方式)）



6. 书写代码时可以参考该框架对原生小程序语法的改进，比如click事件、传递参数等，写法更简便了（参考官方文档写法）



7. 如果想在真机上实时预览，可以点击微信开发者工具的预览功能，手机扫描二维码即可，如果在真机上页面数据没有根据相应状态变化（请参照开发前准备的第5条，看看复选框是否勾上）



8. 使用wx.navigateTo()方法时，注意页面的层级最多5级



### 开发流程



1. 我们只需要在src-->pages文件下面对应的目录中填充业务



2. 对于用到的文件可以建一个公共存放的目录src-->images目录



3. 对于公共方法可以存放在src-->utils.js文件中



4. 公共组件放在src-->components文件中



5. 公共样式可以放在根目录下的etc文件中，直接通过@定义公用的样式变量名即可，在需要的文件中通过@import引入，直接使用



![image](https://cs-static-assets.oss-cn-beijing.aliyuncs.com/dumi_blog/16.png)



6. 因为项目中开启了ESlint检查，所以我们需要手动在.eslintrc.js文件的rules规则中关闭语句强制分号结束和将wx作为全局变量使用，否则文件给你一片红！



![image](https://cs-static-assets.oss-cn-beijing.aliyuncs.com/dumi_blog/17.png)



7. 开发业务进行叶面间参数传递时，获取参数需要在onLoad(param)函数中通过param获取，在其他生命周期中获取不到的



![image](https://cs-static-assets.oss-cn-beijing.aliyuncs.com/dumi_blog/18.png)



8. 其他方面可以参照wepy文档的写法，组件的使用参照小程序的组件即可，为了避免页面组件样式之间的冲突，最好在style标签中加上scoped属性，双保险。



9. 如果小程序的图标使用很多，可以引入iconfont字体图标库，使用在线资源，加载会更快一些，而且支持直接通过类名对图标修改大小和颜色。



### 发布前准备



1. 点击微信开发者工具的预览功能，手机扫描生成的二维码即可



2. 上传代码，填写相应的版本好和项目备注，进行上传，上传的文件大小不可超过1M，否则部分文件无法上传



![image](https://cs-static-assets.oss-cn-beijing.aliyuncs.com/dumi_blog/19.png)



3. 在小程序管理后台，开发管理可以看到开发版本中存在上传代码的说明，在里面可以选为体验版本，也可以直接审核



![image](https://cs-static-assets.oss-cn-beijing.aliyuncs.com/dumi_blog/20.png)



4. 审核通过后，手动点击发布进行发布上线



### 提交审核的注意事项



1. 小程序一定不能有bug，尽量在多机型上测试



2. 去掉项目中的console信息，否则影响审核



3. 配置功能页面一定写清楚，否则很可能审核不过



4. 对提交审核发布的小程序要做敏感词过滤（比如：秘密词语等）



5. 提交审核时间一般为1-4天，只有当前审核不通过得到反馈后，才能进行下一次重新提交审核



6. 多次提交审核不通过时，会影响后面审核的时间



### 运行项目



1. cnpm安装：



sudo npm install -g cnpm--registry=https://registry.npm.taobao.org



2. 代码clone下来，在开发者工具输入appId和选择dist目录



3. 在终端运行命令cnpm install



4. 运行wepy build –watch开启实时编译



5. node版本使用 6+，官方文档没要求



### Issues和注意事项



1. 组件名需要单数的单词命名或者拼接命名，否则写成复数命名文件提示加载不到



![image](https://cs-static-assets.oss-cn-beijing.aliyuncs.com/dumi_blog/21.png)



2. 微信小程序获取参数时,只能通过页面加载时onload（options）中的options拿到,在onShow（）中是拿不到的



3. 注意使用wepy的app文件、page文件、component组件的写法，并且在app.wpy文件中默认导出的类名要么不写，要么写Index其他的一律报错！其他.wpy文件类名可以根据业务场景进行命名



![image](https://cs-static-assets.oss-cn-beijing.aliyuncs.com/dumi_blog/22.png)

![image](https://cs-static-assets.oss-cn-beijing.aliyuncs.com/dumi_blog/23.png)

![image](https://cs-static-assets.oss-cn-beijing.aliyuncs.com/dumi_blog/24.png)



4. 在使用中进行传递参数时，如果是在repeat组件中传递index值，eslint会警告，所以可以使用小程序推荐的data-自定义方式去传递，通过e.target.dataset.参数名获取



![image](https://cs-static-assets.oss-cn-beijing.aliyuncs.com/dumi_blog/25.png)

![image](https://cs-static-assets.oss-cn-beijing.aliyuncs.com/dumi_blog/26.png)



\5. 我们进行跳转的时候统一以开头‘/’的绝对路径去跳转，否则在打包编译的时候可能会出错

6.对于在真实发布过程中，如果有坑在继续添加到该文档中