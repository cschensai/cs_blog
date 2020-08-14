## 简洁CLI工具开发实践

### 1.最简单的命令行

- 首先我们新建一目录，然后执行`npm init`生成package.json文件
- 新建一bin目录并在目录下创建一个cs.js

```js
#! /usr/bin/env node
console.log("hello cs!");
```

- 执行`node cs.js`我们可以看到终端输出‘hi’，当然这是测试脚本，并不是真正的CLI
- 现在我们告诉npm可执行文件是哪个，在package.json里添加如下信息

```js
"bin": {
  "cs": "bin/cs.js"
}
```

- 现在我们执行`npm link`启用命令行（link之后是全局级别的命令行），现在再试试在终端直接输入cs命令，可以如愿见到结果(如果npm link没权限，可以使用***sudo npm link\***根级权限)



### 2.进阶版命令行工具（处理参数）

- 命令行参数可通过系统变量`process.argv`获取。 *process.argv返回一个数组 第一个是node，第二个是脚本文件，从第三个开始是真正的输入参数，*`process.argv[2]`开始得到才是真正的参数部分。
- 

```js
#! /usr/bin/env node
// 获取参数，是个数组，第一个是node，第二个是脚本文件，第三个之后才是输入的参数
const argvArr = process.argv;
console.log('arr', argvArr);
// 获取真正的参数
const params = process.argv.slice(2)
console.log(`参数是, ${params}!`)

// cs yy ==> 参数是, yy!
```

- [commander.js库](https://github.com/tj/commander.js)，对于参数处理，commander是一个轻巧的nodejs模块，提供了用户命令行输入和参数解析强大功能如：自记录代码、自动生成帮助、合并短参数（“ABC”==“-A-B-C”）、默认选项、强制选项、命令解析、提示符，在cs.js中加入以下代码
- 

```js
 const program = require('commander');
  program
    .version('0.0.1')
    .option('-p, --peppers', 'add peppers')
    .option('-P, --pineapple', 'Add pineapple')
    .option('-b, --bbq-sauce', 'Add bbq sauce')
    .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
    .parse(process.argv);

// console.log('you ordered a pizza with:');
if (program.peppers) console.log('  - peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbqSauce) console.log('  - bbq');
console.log('  - %s cheese', program.cheese);
```





### 3.实践-有道翻译命令行工具

- *这里直接贴代码，在代码中注释，在cs.js中加入以下代码*
- 

```js
#! /usr/bin/env node

// 使用cs fy 翻译
const program = require('commander');
const Table = require('cli-table2');
const superagent = require('superagent');
program
  .allowUnknownOption()
  .version('0.0.1')
  .usage('translator <cmd> [input]')

const API = 'http://fanyi.youdao.com/openapi.do?keyfrom=wangtuizhijia&key=1048394636&type=data&doctype=json&version=1.1';
program
  .command('fy')
  .description('输入翻译')
  .action(word => {
    if (!process.argv[3] || !word) { // 代表word没有
      console.log('请输入翻译关键词！ex: cs fy 沙雕');
      return false;
    }
    superagent.get(API)
    .query({q: word}).end((err, res) => {
      if (err) {
        console.log('excuse me, try again', err);
        return false;
      }
      const data = JSON.parse(res.text);
      const result = {};
      if (data.basic) {
        result[word] = data.basic.explains;
      } else if (data.translation) {
        result[word] = data.translation;
      } else {
        console.error('error');
      }
      const table = new Table();
      table.push(result);
      console.log(table.toString());
    })
  })
  if (!process.argv[2]) {
    program.help();
  }
  program.parse(process.argv);
```



- 结果展示

![image.png](https://cs-static-assets.oss-cn-beijing.aliyuncs.com/dumi_blog/8.png)



### 4.发布

- 单纯的发布包到npm非常简单，这里需要注意package.json里的name要在npm上保持唯一，否则可能会403。

```nginx
npm login / npm adduser

npm publish
```



- 修改内容之后，需要重新发布，要将package.json里的version进行修改，然后执行以下脚本

```nginx
npm publish
```



- 但是一个完善规范的发布流程不仅如此，还需要考虑版本号的规范([Semver](https://semver.org/))，commit message的规范，tag等一系列因素。如果手动来搞的话，是挺麻烦的。

```nginx
npm i relix -g
```



- 进入cli-demo文件夹，执行以下命令，会自动帮你生成新版本号，生成提交信息，打tag，推送提交和tag到github，发布npm包！[relix](https://github.com/PengJiyuan/relix)的详细用法请看relix文档。

```nginx
relix --patch
```
