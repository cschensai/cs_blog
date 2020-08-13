## JS之脚本下载文件

***下载文件可以直接通过a标签的href属性直接下载（window.location.href或者window.open也可以），也可以通过iframe的src属性下载。这里将Blob对象转换为文件流进行下载。如果要对大数据量或者需要分片下载、上传等操作，可以考虑Blob对象。同时Blob对象可以对下载过程进行额外操作（拦截等操作），这是a标签直接下载做不到的。***

### a标签下载
```js
// 这是传统的下载方式
const downloadFileA = document.createElement('a')
document.body.append(downloadFileA)
downloadFileA.href=`https://xxx`
downloadFileA.download = '下载文件.csv'
// 超链接 target="_blank" 要增加 rel="noopener noreferrer" 来堵住钓鱼安全漏洞。如果你在链接上使用 target="_blank"属性，并且不加上rel="noopener"属性，那么你就让用户暴露在一个非常简单的钓鱼攻击之下。(摘要)
downloadFileA.rel = 'noopener noreferrer'
downloadFileA.click()
document.body.removeChild(downloadFileA)
```
## 将文件转化为blob对象的二进制数据流下载
> Blob对象是一个不可变、原始数据的<i style="color: green;">类文件对象</i>。Blob 表示的不一定是JavaScript原生格式的数据。<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/File" target="_blank">File</a> 接口基于<i style="color: green;">Blob</i>，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。

### axios
```js
axios({
    method: 'get',
    url: `https:/xxx.com${url}`,
    // 必须显式指明响应类型是一个Blob对象，这样生成二进制的数据，才能通过window.URL.createObjectURL进行创建成功
    responseType: 'blob',
}).then((res) => {
    if (!res) {
        return
    }
    // 将lob对象转换为域名结合式的url
    let blobUrl = window.URL.createObjectURL(res.data)
    let link = document.createElement('a')
    document.body.appendChild(link)
    link.style.display = 'none'
    link.href = blobUrl
    // 设置a标签的下载属性，设置文件名及格式，后缀名最好让后端在数据格式中返回
    link.download = '下载文件.csv'
    // 自触发click事件
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(blobUrl);
})
```

### fetch
```js
// 下载服务器的MP3文件
export const downloadMp3 = (filePath) => {
  fetch(filePath).then(res => res.blob()).then(blob => {
    const a = document.createElement('a');
    document.body.appendChild(a)
    a.style.display = 'none'
    // 使用获取到的blob对象创建的url
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    // 指定下载的文件名
    a.download = '语音音频.mp3';
    a.click();
    document.body.removeChild(a)
    // 移除blob对象的url
    window.URL.revokeObjectURL(url);
  });
}
```