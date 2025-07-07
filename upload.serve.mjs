import serverConfig from './server-config.mjs'
import scp2 from 'scp2'
import ssh2 from 'ssh2'
import fs from 'fs'
import ora from 'ora'

// 服务器配置信息
const server = {
  ...serverConfig,
  localPath: './dist/' // 本地打包文件的位置
}

// 如果dist目录下没有robots.txt文件 那么就把根目录下的robots.txt文件复制到dist目录下
if (!fs.existsSync('./dist/robots.txt')) {
  fs.copyFileSync('./robots.txt', './dist/robots.txt')
}

const client = scp2
const spinner = ora('正在发布到服务器...')

const Client = ssh2.Client // 创建shell脚本
const conn = new Client()

console.log('正在建立连接')
conn
  .on('ready', function () {
    console.log('已连接')
    if (!server.pathName) {
      console.log('连接已关闭')
      conn.end()
      return false
    }

    // 直接开始上传，不删除任何文件
    console.log('开始上传')
    spinner.start()
    client.scp(
      server.localPath,
      {
        host: server.host,
        port: server.port,
        username: server.username,
        password: server.password,
        path: '/www/wwwroot/' + server.pathName
      },
      (err) => {
        spinner.stop()
        if (!err) {
          console.log('项目发布完毕')
        } else {
          console.log('err', err)
        }
        conn.end() // 结束命令
      }
    )
  })
  .connect({
    host: server.host,
    port: server.port,
    username: server.username,
    password: server.password
    //privateKey: '' //使用 私钥密钥登录 目前测试服务器不需要用到
  })
