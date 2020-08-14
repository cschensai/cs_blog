## 简单搭建前端脚手架

## 项目目录
![image.png](https://cs-static-assets.oss-cn-beijing.aliyuncs.com/dumi_blog/9.png)

### index.js
```js
#!/usr/bin/env node
const fs = require('fs'); // 读写文件
const program = require('commander'); // 命令行工具
const download = require('download-git-repo'); // 远程拉取仓库
const handlebars = require('handlebars'); // handlebar模版
const inquirer = require('inquirer'); // 命令行提示工具
const ora = require('ora'); // 交互icon（loading等）
const chalk = require('chalk'); // 彩色交互
const symbols = require('log-symbols'); // 日志
program.version('1.0.0', '-v, --version')
  .command('init <project-name>')
    .action((projectName) => {
        if(!fs.existsSync(projectName)){
            inquirer.prompt([
              {
                name: 'description',
                message: '请输入项目描述'
              },
              {
                name: 'author',
                message: '请输入作者名称'
              }
            ]).then((answers) => {
                const spinner = ora('正在下载模板...');
                spinner.start();
				        download('gitlab:http://gitlab.xxx.com:owner/项目名#分支', projectName, {clone: true}, (err) => {
                    if(err){
                        spinner.fail();
                        console.log(symbols.error, chalk.red(err));
                    }else{
                        spinner.succeed();
                        const fileName = `${projectName}/package.json`;
                        const meta = {
                            name: projectName,
                            description: answers.description,
                            author: answers.author
                        }
                        if(fs.existsSync(fileName)){
                            const content = fs.readFileSync(fileName).toString();
                            const result = handlebars.compile(content)(meta);
                            fs.writeFileSync(fileName, result);
                        }
                        console.log(symbols.success, chalk.green('项目初始化完成'));
                    }
                })
            })
        }else{
            // 错误提示项目已存在，避免覆盖原有项目
            console.log(symbols.error, chalk.red('项目已存在'));
        }
    })
program.parse(process.argv);
```

### package.json
> 在根项目下执行npm link即可全局使用cs-cli init命令，或者直接node ./index.js init
```js
{
  "dependencies": {
    "chalk": "^2.4.2",
    "commander": "^2.20.0",
    "download-git-repo": "^2.0.0",
    "handlebars": "^4.1.2",
    "inquirer": "^6.5.0",
    "log-symbols": "^3.0.0",
    "ora": "^3.4.0"
  },
  "name": "cs-cli",
  "version": "1.0.0",
  "main": "index.js",
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "bin": {
    "cs-cli": "index.js"
  },
  "keywords": [],
  "author": "cs",
  "license": "ISC",
  "description": ""
}
```
![image.png](https://cs-static-assets.oss-cn-beijing.aliyuncs.com/dumi_blog/10.png)
