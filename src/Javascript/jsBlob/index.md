## 读取Blob文件内容

```js
const fileReader = new FileReader();
// blob：不是blob的话，要转换为Blob对象或者File对象，File是Blob对象的子类，拥有Blob对象的属性和方法
fileReader.readAsText(blobFile);
fileReader.onload = (e) => {
    const fileContent = e.target.result; // 读取到的文件内容
}
```