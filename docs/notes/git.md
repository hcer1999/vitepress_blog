# Git 使用教程

Git 是目前世界上最先进的分布式版本控制系统，几乎所有的公司都会使用 Git 工具来进行版本控制，Git 成为程序员必要学习的知识之一。你还在等什么，赶快跟我来看看吧~

## 安装 Git 工具

- 首先打开[Git 官网](https://git-scm.com/downloads)，下载对应操作系统的版本

  国内用户打开下载可能比较慢，请科学上网或者直接下载我上传的版本，可能版本不是最新的

  - [x86 位的电脑点我](https://lanzous.com/ibu2sta) `v2.7.1.2`
  - [x64 位的电脑点我 ](https://lanzous.com/ibu2tzc)`v2.25.0`

- 下载后进行默认安装即可，然后右键桌面，即可看到新增两个选项

  ![img](http://cdn.bingkele.cc/Fp_ks__5DoLpeBMq-lVsoGRQqVA-)

  - Git GUI Here 是图形化界面的 Git 工具
  - **Git Bash Here** 才是我们需要的命令行工具

- 我们打开**Git Bash Here**，就会打开一个类似`CMD`的命令行工具，到此，Git 工具的安装已完成。

  ![img](http://cdn.bingkele.cc/FtFcuNE-AWcEzqOOPx5BrMR0R0E0)

## 配置 Git 工具

接下来我们需要配置一下 Git 工具的信息

先打开**Git Bash Here**，然后需要配置这两个信息：

- 配置用户名

  ```powershell
  git config --global user.name "hcer1999"
  ```

- 配置邮箱

  ```powershell
  git config --global user.email "bingkelele007@163.com"
  ```

![](http://cdn.bingkele.cc/FqgXiK-fwwe6jLC3gQhnEJ8aD38j)

因为 Git 是分布式版本控制系统，所以需要填写用户名和邮箱作为一个标识。

## 使用 Git 工具

我们已经配置好信息了，可以正式开始使用 Git 工具了。

首先，我们需要管理某个项目，就需要在这个项目的根目录中初始化 Git 仓库。

### 初始化仓库

我们先在项目的根目录空白处右击，打开`Git Bash Here`，然后输入以下代码，即可初始化一个 Git 仓库。

```powershell
git init
```

![](http://cdn.bingkele.cc/Fs6SPLT-afpHhWXwOHdAiXYExpI8)

然后它会在当前目录下生成一个`.git`的隐藏文件夹(要打开显示隐藏文件夹才能看到)。

这个文件夹是 Git 来跟踪管理版本的，没事**千万不要乱改这个目录里的文件**，否则，会照成仓库损坏。

### 提交文件至仓库中

我们假如现在在这个仓库中写了一些代码，我新建一个文本文档并写入一堆 1 作为演示：

然后在 Git 命令行中，输入`git status`,可以查看当前仓库的状态。

![](http://cdn.bingkele.cc/Folgc4AuQ-_v7nRAQVO5vjRLRyFE)

然后，我们需要将他添加到**暂存区**，大家先不用管暂存区是什么东西，可以理解为中转站，文件必须先添加到暂存区才能再添加到**仓库区**。

需要将文件添加到暂存区，需要这个指令`git add 文件名`，如果需要一次性添加所有文件，则可以使用`git add .`，这个点代表当前目录下所有文件。

我们提交之后如果成功，则不会有任何提示。然后我们再次输入`git status`来查看当前仓库的状态。

![](http://cdn.bingkele.cc/Fs3uRlFptHvK-FDcLGLs1HEMZc8m)

最后，我们需要使用`git commit`来将暂存区的文件添加到仓库区。

::: warning 注意

每次`commit`需要带上`-m 注释`,例如`git commit -m '第一次提交'`，注释需要用双引号包起来。

:::

![img](http://cdn.bingkele.cc/FkQu4p8OIaKQBfC7RokR8_I_tU0C)

### 检测文件变更

如果我们对已经提交的文件进行修改，会怎么样？

我现在对`text.txt`，在最后添加一行 22222

然后使用`gita status`查看状态

![](http://cdn.bingkele.cc/Fv02E04geqWwAmx_w0JC3l0lorNg)

上面的命令告诉我们`text.txt`文件已被修改，但是未被提交。

::: warning 注意

Git 工具只能检测到文本的改动，例如网页文件各类重新代码文件等。但是不能检测到图片和视频文件的改动。

:::

我们可以使用`git diff`命令查看文件的改动，例如`git diff text.txt`

![](http://cdn.bingkele.cc/Fh_wuf1R_2BqLX7dq8u_TUt-qPdJ)

我们可以清晰的看到文件有哪些改动

修改后，我们可以再次提交文件

提交完成后，可以使用`git log`命令查看当前仓库的提交信息

![](http://cdn.bingkele.cc/FoY125n2iHBB487Hi2oRpSdPXvL5)

我们可以清晰的看到，每次提交的时间信息，提交的人的信息，以及我们的备注。

### 版本回退

我们学会了修改文件，现在我继续对`text.txt`文件进行修改，再新增一行 3333，并提交到仓库中

![](http://cdn.bingkele.cc/Fpk5-sf1wZ8FzZvh_bLa4omRvywl)

OK，现在我们已经有了三次提交了，但是如果我们感觉这段代码写的不好，想回退到第二次提交的状态该怎么操作呢？有如下两种命令：

```powershell
git reset --hard HEAD^
```

这个命令表示回退到上个版本，如果我们要回退到上上个版本只需要把`HEAD^`改成`HEAD^^`，以此类推。

但是，如果我们有 100 个版本，我们要回退到底 2 个版本，那我们岂不是要敲 90 多个^吗。

所以，我们可以使用以下简便命命令操作：

```powershell
git reset --hard 版本号
```

版本号我们通过`git log`命令可以看到每次提交的`commit`后面的那一大串字符串。

我们先看看当前`text.txt`的文件内容,可以使用 `cat text.txt`查看。

![](http://cdn.bingkele.cc/FmOy0MRo1Q9qzUGUOaKo3dSYeprI)

可以看到，现在是第三个版本，所以内容有里面有一堆 3。

我们使用第二种方法回退到上个版本

![](http://cdn.bingkele.cc/FpdRVzcuLU-308dozR659DY2uda6)

OK，我们现在成功回退到第 2 个版本了，我们再使用`cat`命令看看文件内容

![](http://cdn.bingkele.cc/FnNb98ATMs6C7WvbBHH7TunH6HYT)

可以看到，文件内容成功回退到第二次提交时的内容了

### 恢复版本

现在我们已经回退到第二个版本，那么如果我们需要再次回到第三个版本中，那该怎么操作呢？

我们当然也可以使用`git reset --hard 版本号`来恢复到第三个版本，**但是**，如果我们不知道第三个版本的版本号，恰巧 Git 窗口又是重新打开的，没有记录了，那怎么查看第三个版本的版本号呢？

我们可以使用`git reflog`命令查看所有历史记录的版本

![](http://cdn.bingkele.cc/FoJsRGQf-i4ZvqY15GtLlRhWlqVT)

OK，我们现在已经看到第三次提交的版本号了，我们直接复制出来使用`git reset --hard` 命令恢复即可。

![](http://cdn.bingkele.cc/FuXj6Y_5HJatc5FGg5yny_Z_hRv3)

我们可以看到文件的内容已经恢复成第三次提交时的内容了。

### 创建分支

我们在开发大型项目的时候，往往会多人协作，每个人负责不同的版块的开发，这个时候，我们就需要用到 Git 工具的创建分支功能了。

当我们没有创建分支的时候，默认是操作的主分支，即`master`分支。

创建分支使用`git checkout 分支名`命令

切换到某个分支可以用`git branch 分支名`命令

我们可以在创建分支之后直接切换到该分支，只需要在后面加上`-b`即可。首先，我们来创建一个`dev`分支

![](http://cdn.bingkele.cc/ForQ_O-o4swd9vEwDM_FzxTWQPZL)

我们可以看到，成功创建了一个`dev`的分支，并且已经切换到这个分支中。

**我们在分支中的操作不会影响到主分支中的文件**

### 合并分支

那我们在`dev`分支下创建一个`test.txt`，然后将此文件添加到仓库区中

![](http://cdn.bingkele.cc/FtgssA3ukbhO5ZTFukiqmnC4wErZ)

然后我们切换回主分支，使用`git checkout master`命令

再查看当前目录下的文件

![](http://cdn.bingkele.cc/FoImYi_vdXnwpZhSTJw6s2JWEkfu)

我们发现并没有刚才创建的`test.txt`文件，这是怎么回事呢？

我刚才说过，在分支下的操作并不会影响到主分支中的文件，这样就很方便我们进行多人协作开发。

好了，假如我们现在`dev`分支的功能已经开发完了，要怎么合并到主分支中呢？

我们先切换到 master 分支中，然后使用`git merge 要合并的分支名`来进行合并,例如：

![](http://cdn.bingkele.cc/FoLIcXa6vt4ggxzJbJ0MW8585eKF)

至此，已经成功将其他分支的内容合并到主分支中

总结一下关于分支的命令：

- 查看分支：git branch
- 创建分支：git branch name
- 切换分支：git checkout name
- 创建+切换分支：git checkout -b name
- 合并分支：git merge name
- 删除分支：git branch -d name

## 使用远程仓库

先打开[Github](https://github.com/)的官方网站，注册个账号

然后点击右上角的小加号然后选择`New repository`创建一个仓库

![](http://cdn.bingkele.cc/FjvZ38As-GS8v2-AVx69bysRtYub)

然后在页面中输入对应的信息

![](http://cdn.bingkele.cc/FvTlIlVJV2wMMLZMvTogpfICccAi)

如果你没勾选生成初始化`README`文档，俺么在仓库的页面中，我们可以看到这样的信息

![](http://cdn.bingkele.cc/FsX3vnm1EE0xz75uUhH9WLG-5BKM)

我们发现`git init` `git add` `git commit`这三个命令我们已经执行过了。

然后我们只要执行最后的两条命令即可将项目上传至`Github`上

直接复制下来，在 Git 窗口中粘贴执行

![](http://cdn.bingkele.cc/FokOoBV54c0-hAOfY4D7oPMdGbEp)

没有任何提示，这个时候我们输入`git remote -v`可以查看远程仓库的详细信息

![](http://cdn.bingkele.cc/FuoEuGoUkNu60mYO_KBYUq0KAyKR)

可以看到，有远程仓库的连接信息

这个时候，我们只需要执行最后一行命令即可将项目上传至远程仓库中

再次复制过来执行一下，会弹出两个消息框，需要输入`github`的账号密码

![](http://cdn.bingkele.cc/Fn8WhQ3ZxZVXXz4J8pFPY_E2SVMQ)

![](http://cdn.bingkele.cc/Fg8J7aoZG60XhQ-J5Os_6RUCgYFv)

输入完`github`的账号密码后，就会立即将项目中的文件上传至`github`

![](http://cdn.bingkele.cc/FizU_ktWjpkr5bn3LxHFE3W3vaNQ)

出现这样的提示，说明我们的项目上传成功了

我们回到`github`的仓库页面中，会发现我们项目里的文件出现在了页面中

![](http://cdn.bingkele.cc/FgdAfBD9BTrg04HYiglvt8iTD_wQ)

**OK 啦，这就是本篇的全部内容啦，感谢观看~**

**高级的操作以后再更新吧，学会这些你就已经可以满足日常开发的需求啦~**
