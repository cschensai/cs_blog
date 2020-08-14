## 命令行创建指定大小的文件

```nginx
// 创建10M的文件大小
dd if=/dev/zero of=test bs=1024 count=10240
```