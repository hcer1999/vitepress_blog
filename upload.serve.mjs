import serverConfig from './server-config.mjs'
import scp2 from 'scp2'
import ssh2 from 'ssh2'
import fs from 'fs'
import ora from 'ora'

// 服务器配置信息
const server = {
  ...serverConfig,
  locaPath: './dist/' // 本地打包文件的位置
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
    if (!server.pathNmae) {
      console.log('连接已关闭')
      conn.end()
      return false
    }

    // 这里我拼接了放置服务器资源目录的位置 ，首选通过rm -rf删除了这个目录下的文件
    conn.exec('rm -rf /www/wwwroot/' + server.pathNmae + '/*', function (err, stream) {
      // stream.on('close', function (code, signal) {
      //   console.log('删除完毕');
      // })
      console.log('删除文件')
      setTimeout(() => {
        console.log('开始上传')
        spinner.start()
        client.scp(
          server.locaPath,
          {
            host: server.host,
            port: server.port,
            username: server.username,
            password: server.password,
            path: '/www/wwwroot/' + server.pathNmae
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
      }, 3000)
    })
  })
  .connect({
    host: server.host,
    port: server.port,
    username: server.username,
    password: server.password
    //privateKey: '' //使用 私钥密钥登录 目前测试服务器不需要用到
  })