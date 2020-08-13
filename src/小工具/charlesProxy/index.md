## Charles进行代理数据

***使用Charles进行数据代理，可以避免本地mock数据，批量使用线上数据，提高开发效率。***<br/>
***下载charles地址：<a href="https://www.charlesproxy.com/" target="_blank">charls官方地址</a>***<br/>
***破解charles：<a href="https://www.zzzmode.com/mytools/charles/" target="_blank">破解地址</a>***<br/>
***安装证书，选择始终信任即可，具体教程网上搜索，如果电脑上已经有代理工具，需要先关闭掉，因为翻墙软件会将数据包越过Charles，使其抓不到包***

### 在线上代理本地数据（这中情况很少用）
- 在Tools->mapRemote进行配置，上面是线上的接口地址，下面是本地的接口地址
- 配置好之后，记得Proxy->macOS Proxy勾选上
- 然后访问线上的地址，如果本地是请求的mock的数据，则会在线上看到

![image.png](https://cdn.nlark.com/yuque/0/2019/png/144308/1562319325660-882bd185-2058-4257-95f8-a258111a4b2f.png?x-oss-process=image%2Fresize%2Cw_746)

### 在本地代理线上数据
- 在Tools->mapRemote进行配置，上面是本地的接口地址，下面是线上的接口地址
- 配置好之后，记得Proxy->macOS Proxy勾选上
- 因为charls是抓取不到localhost或者127.0.0.1的数据包，所以这里需要使用别名代替localhost
- 可以将本地的host设置为localhost.charlesproxy.com，来作为localhost的别名，这个别名使用大部分情况，也有可能服务端同学已经配好了本地localhost的域名，那就使用他们的那个即可
- 然后访问本地localhost.charlesproxy.com:5000，则会拉取到线上的数据

![image.png](https://cdn.nlark.com/yuque/0/2019/png/144308/1562319596315-51fe5ea9-d4ae-44fb-9557-c1d299356dd5.png?x-oss-process=image%2Fresize%2Cw_746)

### 代理线上静态资源，在本地进行调试
***<span style="background-color: yellow">case：在本地没有问题，在线上出现样式问题</span>***
- 上面是线上的静态资源地址
- 下面是本地的地址
- 访问线上地址，即可在线上环境调试本地代码，和第一种配置方式一样，只不过这里的是静态资源的地址
![image.png](https://cdn.nlark.com/yuque/0/2019/png/144308/1562320715336-9be4e53b-63b1-4d1e-bf1f-b0151504bdb3.png?x-oss-process=image%2Fresize%2Cw_746)