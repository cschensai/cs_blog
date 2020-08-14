## 将毫秒格式化为时分秒

```js
// 将ms转换为时分秒
function formatMs (ms) {
  const parseFloatMs = parseFloat(ms);
  if (isNaN(parseFloatMs)) return '0s';
  // 将ms转换为秒数
  const formatSecond = parseInt(parseFloatMs / 1000);
  const seconds = formatSecond % 60;
  const minutes = parseInt(formatSecond / 60);
  const hours = parseInt(formatSecond / 3600);
  if (hours > 0) return `${hours}hour${minutes}min${seconds}s`;
  if (minutes > 0) return `${minutes}min${seconds}s`;
  else return `${seconds}s`;
}
```
