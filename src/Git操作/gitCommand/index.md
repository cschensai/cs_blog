## Git命令记录
***Git命令是一种免费开源的分布式版本控制系统，是团队中常用的一种开发方式。以下是一些工作中常用的命令。***
<hr />

### 安装Git
```nginx
// 绑定用户名和邮箱
git congig --global user.name 'name'
git config --global user.email 'email'

// 查看用户名和邮箱
git config user.name
git config user.email
```

### 提交到远程库
> - git init .初始化，表示把这个文件变成Git可以管理的仓库。初始化后打开隐藏的文件可以看到有一个.git文件。
> - git remote add origin https://github.com/name/name_cangku.git 表示把你本地的仓库与GitHub上的远程仓库连接起来。只需要连接一次，以后提交的时候就可以不用谢这条命令了。name是你的github名字，name_cangku是你的仓库名。注意不要把后面的.git给漏掉了。因为我前面就是这么走过来的，绕了很多弯路。至于如何在GitHub上新建仓库，网上有很多教程，这里不再赘述了。
> - git add . 后面的一个点表示把这个文件全部提交到暂存区。
> - git add ./readme.md/ 表示把这个文件下面的readme.md文件提交到暂存区。
> - git commit -m "你要评论一点什么东西" git commit的意思是把暂存区的全部文件提交到本地仓库。-m后接评论。
> - git push -u origin master 把本地仓库提交到远程仓库。(最后一步)在你的远程仓库上刷新一下就可以看到你提交的文件了。
> - 最后提到的是，在git commit -m ""之前，可以重复git add到暂存区。但是git commit会把你之前存放在暂存区的全部文件一次性全部提交到本地仓库。

### 版本回溯和前进
```nginx
// 查看版本号
git log
// 回溯版本,成功后，可以在git log中看到commitid之后提交的版本号都不见了
git reset --hard 'commitid'

// 如果回溯失误，想要前进,则需要先查看历史版本号(包含已丢失的版本号)
git reflog

// 前进到对应版本
git reset --hard 'commitid'
```

### 合并分支
```nginx
// 合并指定的commit
git log
git cherry-pick 'commitid'

// 合并某个分支上的某些commit，'依赖的commitId':合并该id之前提交的commitId， -i:interaction（交互）
git rebase -i '依赖的commitId'
```

### 分支
#### 创建分支
```nginx
// 创建分支
git branch '分支'
// 切换分支
git checkout '分支'
// 创建分支,并快速切换到当前分支(上面的快捷方式)
git checkout -b '分支'
```

#### 删除分支
```nginx
// -d:没有没合并的分支可能会删除失败
git branch -d '分支'
// -D:强制删除，丢弃没合并的分支
git branch -D '分支'
```
#### 合并分支
```nginx
// 合并分支到当前分支
git merge '要合并的分支'
```

### Bug修改策略
> 日常开发中可能需要中途修改bug，则可以将当前的修改进行暂存、压栈，从而回到上一远程版本时的干净代码模式。
```nginx
// 将修改代码进行暂存,回到上一拉取远程版本时的代码
git stash
// 新建修改bug分支
git checkout -b '修改bug分支'
// 解决完成之后，切换到原来的分支，恢复stash暂存项
git stash apply
// 查看stash暂存项
git stash list
// 清除stash暂存项
git stash clear === git stash drop

// (快捷方式)，恢复暂存项并清除暂存项
git stash pop
```
### 标签
```nginx
// 添加标签
git tag 'tag-v1'
// 查看标签
git tag
// 删除本地标签
git tag -d 'tag-v1'

// 本地标签推送到远程
git push origin 'tag-v1'
// 本地所有标签一次性全部推送到远程
git push origin --tags
// 删除远程标签
git push origin :'origin/tag-v1'
```

### 小结
```nginx
git config --global user.name "你的名字" 让你全部的Git仓库绑定你的名字
git config --global user.email "你的邮箱" 让你全部的Git仓库绑定你的邮箱
git init 初始化你的仓库
git add . 把工作区的文件全部提交到暂存区
git add ./<file>/ 把工作区的<file>文件提交到暂存区
git commit -m "xxx" 把暂存区的所有文件提交到仓库区，暂存区空空荡荡
git remote add origin https://github.com/name/name_cangku.git 把本地仓库与远程仓库连接起来
git push -u origin master 把仓库区的主分支master提交到远程仓库里
git push -u origin <其他分支> 把其他分支提交到远程仓库
git status查看当前仓库的状态
git diff 查看文件修改的具体内容
git log 显示从最近到最远的提交历史
git clone + 仓库地址下载克隆文件
git reset --hard + 版本号 回溯版本，版本号在commit的时候与master跟随在一起
git reflog 显示命令历史
git checkout -- <file> 撤销命令，用版本库里的文件替换掉工作区的文件。我觉得就像是Git世界的ctrl + z
git rm 删除版本库的文件
git branch 查看当前所有分支
git branch <分支名字> 创建分支
git checkout <分支名字> 切换到分支
git merge <分支名字> 合并分支
git branch -d <分支名字> 删除分支,有可能会删除失败，因为Git会保护没有被合并的分支
git branch -D + <分支名字> 强行删除，丢弃没被合并的分支
git log --graph 查看分支合并图
git merge --no-ff <分支名字> 合并分支的时候禁用Fast forward模式,因为这个模式会丢失分支历史信息
git stash 当有其他任务插进来时，把当前工作现场“存储”起来,以后恢复后继续工作
git stash list 查看你刚刚“存放”起来的工作去哪里了
git stash apply 恢复却不删除stash内容
git stash drop 删除stash内容
git stash pop 恢复的同时把stash内容也删了
git remote 查看远程库的信息，会显示origin，远程仓库默认名称为origin
git remote -v 显示更详细的信息
git pull 把最新的提交从远程仓库中抓取下来，在本地合并,和git push相反
git rebase 把分叉的提交历史“整理”成一条直线，看上去更直观
git tag 查看所有标签，可以知道历史版本的tag
git tag <name> 打标签，默认为HEAD。比如git tag v1.0
git tag <tagName> <版本号> 把版本号打上标签，版本号就是commit时，跟在旁边的一串字母数字
git show <tagName> 查看标签信息
git tag -a <tagName> -m "<说明>" 创建带说明的标签。 -a指定标签名，-m指定说明文字
git tag -d <tagName> 删除标签
git push origin <tagname> 推送某个标签到远程
git push origin --tags 一次性推送全部尚未推送到远程的本地标签
git push origin :refs/tags/<tagname> 删除远程标签<tagname>
git config --global color.ui true 让Git显示颜色，会让命令输出看起来更醒目
git add -f <file> 强制提交已忽略的的文件
git check-ignore -v <file> 检查为什么Git会忽略该文件
```

