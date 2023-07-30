# NPM 实用命令总结

如果你日常工作中有使用 NPM ，我相信你会喜欢这些使用技巧的。

## 创建项目

- 创建项目，需要输入信息

  ```shell
  npm init
  ```

- 以默认信息创建项目

  ```shell
  npm init -y
  ```

## 安装模块

```shell
npm install

# 简写
npm i
```

### 一次性安装多个模块

```shell
npm i gulp-pug gulp-debug gulp-sass

#如果安装的所有模块的前缀是相同的
npm i gulp{-debug,-sass,-pug}
```

### 安装模块至生产环境

```shell
npm i gulp --save-prod

#简写
npm i gulp -P
```

### 安装模块至开发环境

```shell
npm i gulp --save-dev

#简写
npm i gulp -D
```

### 安装指定版本

```shell
npm i vue@2.5.15
```

### 不写入 package.json 安装

```shell
npm i vue --no-save
```

## 获取安装包信息

```shell
npm view xxx

#简写
npm v xxx
```

![img](http://cdn.bingkele.cc/FkClKu4ThNgUnr3VqT23LpskEuVJ)

### 查看安装包最近的版本信息

```shell
npm v vue version
```

### 获取安装包完整的版本信息列表

```shell
npm v vue versions
```

![img](http://cdn.bingkele.cc/Fgru2h9bgWr27vEnygxt8welsjRQ)

## 搜索安装包

```shell
npm search gulp debug

#简写
npm s gulp debug
```

![img](http://cdn.bingkele.cc/FsoQSkNhXZtrP7IuI2DeGAMqjTHW)

注意：此命令本人自测在淘宝镜像下无法使用，请切换回默认镜像。

## 卸载包

```shell
npm uninstall vue

#或者
npm rm vue
npm un vue
npm r vue
```

这个命令会删除`node_modules`文件夹及`package.json`中对应的包。

### 在保留 package.json 信息

```shell
npm rm vue --no-save
```

## 依赖枚举

```shell
npm ls
```

此命令会将本机所有的项目安装的所有依赖列举出来

### 查看当前项目的依赖列表

```shell
npm ls --depth=0
```

### 查看全局安装的依赖

```shell
npm ls -g -depth 0
```

### 过期依赖枚举

```shell
npm outdate
```

![img](http://cdn.bingkele.cc/FjL0wBEwEE8s1OOz5Ak-AqZsYfPg)

## 执行脚本

### 查看可执行的脚本

```shell
npm run
```

![img](http://cdn.bingkele.cc/FgoywDPFD8l7Xd6Bpt4UuDawk5Ej)

然后根据 package.json 中的配置来执行，比如：

```shell
npm run serve
```

## 安装 Github Repo 上的包

```shell
npm i https://github.com/sindresorhus/gulp-debug
```

### 忽略域名安装

```shell
npm i sindresorhus/gulp-debug
```

## 打开安装包的 Github 主页

```shell
npm repo create-react-app
```

## **列出所有 NPM 环境的可用变量**

```shell
npm run env | grep npm_
```

![img](http://cdn.bingkele.cc/FvBvQnN9FnzqeKVV8UPbihnFjs0x)

OK 啦~今天的分享就到这。

> [参考链接](https://mp.weixin.qq.com/s/mW2taibuBDXJP9jQk4E1kA)
