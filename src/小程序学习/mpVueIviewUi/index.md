# Mpvue中怎么使用iView-weapp组件库

*在小程序中可选择的组件库，大多推荐的也就5-6种，前段时间本着贴合vue语法取开发自己的小程序，就选择了mpvue+iView-weapp。下面记录一下怎么引入...*

### 引入



![image](https://cs-static-assets.oss-cn-beijing.aliyuncs.com/dumi_blog/27.png)



> 将clone下来的dist文件引入到mpvue的static文件中，然后通过cnpm run build进行一次编译。



### 使用



![image](https://cs-static-assets.oss-cn-beijing.aliyuncs.com/dumi_blog/28.png)



> 在相应的文件中，新建main.json，在里面通过`usingComponents`配置项，进行自定义组件，然后就可以正常使用了。因为该组件库是通过小程序码进行预览的，所以在使用时，不像使用web组件name方便，不过已经很好了！