## 1. common.js和es6中模块引入的区别？

**参考答案：**

CommonJS 和 ES6 模块系统在语法和行为上有显著的区别：

一、CommonJS

CommonJS 是一种模块系统，主要用于 Node.js 环境。它使用 `require` 函数来引入模块，并使用 `module.exports` 来导出模块。

语法

- **导出模块**：

```javascript
// moduleA.js
const name = 'John'
module.exports = name

// 或者导出一个对象
const person = { name: 'John', age: 30 }
module.exports = person
```

- **引入模块**：

```javascript
// main.js
const name = require('./moduleA')
console.log(name) // 'John'

// 引入对象
const person = require('./moduleA')
console.log(person.name) // 'John'
console.log(person.age) // 30
```

特点

1. **动态引入**： `require` 可以在函数体内、条件语句中动态引入模块。 &#x20;

```javascript
if (condition) {
  const moduleA = require('./moduleA')
}
```

- **同步加载**： `require` 是同步的，模块在执行 `require` 时会立即加载并返回结果。

- **导出的是值的拷贝**： 但对于对象和数组等引用类型，修改引用类型的属性会在所有引用中反映出来。

```javascript
const obj = require('./moduleA')
obj.newProp = 'new'
console.log(require('./moduleA').newProp) // 'new'
```

二、ES6 模块

ES6 模块系统是 ECMAScript 标准的一部分，使用 `import` 和 `export` 语法来定义模块，广泛用于现代前端开发以及一些支持 ES6 的服务器环境。 &#x20;

语法

1. **导出模块**：

```javascript
// moduleA.js
export const name = 'John'

// 导出默认值
const person = { name: 'John', age: 30 }
export default person
```

- **引入模块**：

```javascript
// main.js
import { name } from './moduleA'
console.log(name) // 'John'

// 引入默认导出
import person from './moduleA'
console.log(person.name) // 'John'
console.log(person.age) // 30
```

特点

1. **静态引入**： `import` 必须在文件的顶部声明，不能在函数体内或条件语句中使用。这使得 ES6 模块可以在编译时确定依赖关系和优化。

```javascript
// 错误的用法
if (condition) {
  import { name } from './moduleA'
}
```

- **异步加载**： 浏览器中的 ES6 模块是异步加载的，这意味着它们不会阻塞页面的其他加载过程。

- **导出的是值的引用**： 导出值的引用意味着当导出模块中的值发生变化时，所有引用该值的地方都会反映出这些变化。

```javascript
// moduleA.js
export let count = 1
setTimeout(() => {
  count += 1
}, 1000)

// main.js
import { count } from './moduleA'
setTimeout(() => {
  console.log(count)
}, 2000) // 2
```

兼容性和转换

- **CommonJS 和 ES6 模块的互操作性**： 在 Node.js 环境中，可以使用工具如 Babel 或 Webpack 将 ES6 模块转换为 CommonJS 模块，从而实现兼容性。

- **双向兼容**： 使用工具链（如 Babel、Webpack）可以同时支持 CommonJS 和 ES6 模块语法，并在构建过程中根据目标环境进行转换。

总结

- **语法区别**： CommonJS 使用 `require` 和 `module.exports`，而 ES6 模块使用 `import` 和 `export`。

- **加载方式**： CommonJS 是同步加载，ES6 模块是静态分析和异步加载。

- **使用场景**： CommonJS 主要用于 Node.js 环境，而 ES6 模块是 ECMAScript 标准的一部分，更适合现代前端开发。

选择使用哪种模块系统取决于项目需求和运行环境。对于现代前端开发，推荐使用 ES6 模块。对于 Node.js 项目，传统上使用 CommonJS，但也可以逐渐迁移到 ES6 模块。

---

## 2. 为什么Node在使用es module时必须加上文件扩展名?

**参考答案：**

这个事情分两部分说。

第一个问题是，我们需要用代码内容以外的信息（比如文件扩展名来确定一段代码是否是es module。

这件事情的根子是在TC39，在设计es module时就无法从语法上严格区分一段代码到底是es module还是传统的script（注意 commonjs 本质上仍然是传统script）。

有人可能会问，难道不是有`import`、`export`语句就是es module啊？ 从开发者的理解上来说，确实是这样。但问题是，没有`import`、`export`语句也不代表就不是es module。

曾经node社区在TC39的代表提出提案来通过语法区分。可能的方案有几种：

1. 类似`"use strict"`，我们可以通过引入`"use module"`指令来解决。
   【优点：容易理解，也很容易实现，没有额外的解析成本；缺点：对于大多数已经有`export`语句的模块来说，有点脱裤子放屁。】

2. 通过`export`语句是否存在来分辨，对于本身不需要`export`的模块，开发者通过加入`export {}`（这是语法上允许的export语句，虽然啥都不导出）来标记其为es module。
   【优点：对于大多数模块来说不需要额外标记；缺点：由于`export`语句并不必然在代码头部，所以解析器需要预扫描`export`语句，决定是否是es module。】

3. 引入某种新的语法来标记。
   【优缺点：类似1】

但是这些方案在TC39讨论时都没法通过。并且可以判断，将来也不可能再引入。

> <span style="color: rgb(36,91,219); background-color: inherit">PS：提醒，TypeScript就是使用 方案2 来确定是否是es module的。】</span>

因为不能通过代码内容本身来判断是否是es module，那就需要某种外部信息。

对于Web平台来说，是通过`<script type=module>`来标明的（也延伸到其他标签，比如需要单独的`<link rel=modulepreload>`；也延伸到其他API，如`new Worker(path, {type: 'module'})`需要额外参数标明是es module）。

对于node.js这样的命令行来说，就要通过文件扩展名（`.mjs`）来标明，或者通过`package.json`文件中的`"type": "module"`字段来标明。

---

第二个问题是，我们需要用完整的路径（包含文件扩展名）来导入，即`import "./my-module.mjs"`而不是`import "./my-module"`。

Node.js下的commonjs模块的resolve规则是按照服务器端脚本系统来设计的，它基于一个假设，即文件系统访问的成本是很小的（不过马后炮来说，今天的大型应用里，大量细碎小模块的resolve成本常常已经不能忽略），因此只要用起来方便，resolve规则复杂一点是ok的。

所以node.js的模块解析机制有复杂的fallback机制。比如对于`require('./my-module')` ，会先寻找该脚本同目录的`my-module`（不带有扩展名）文件，如果找不到则寻找`my-module.js`文件，如果再找不到则寻找`my-module/index.js`文件。

但如此的fallback如果无脑照搬到浏览器端，就会是多次的network roundtrip，这成本肯定是不能接受的。因此在浏览器端，`import`语句中引用的模块，就是一个标准的url，在没有其他额外处理（服务器端根据请求的url返回对应的文件，是可做类似node.js的fallback机制的）的情况下，通常也会包含完整的文件扩展名。

当年node.js加入commonjs模块时，它并不需要考虑和浏览器的一致性。即使后来前端的构建打包工具或一些前端加载器、框架等支持了commonjs模块，也是反过来去兼容node.js的。但今天node.js要加入es module，就需要考虑和浏览器的一致性。

最后，浏览器端import模块要注意的不仅是扩展名，还包括不能直接使用「裸名字」，即不能直接`import "my-module"`。如果要使用的话，需要通过import maps来预先定义。Node.js下虽然可以像`require`那样直接用`import "my-module"`，但也加入了类似import maps的机制。

【补充】

之前遗漏了一个重要差异，对于`import "./file.js"`，Web平台总是将`file.js`作为es module进行解析的，而node.js则总是依据前述外部信息对`file.js`进行解析。如后缀名为`.js`即默认按照commonjs进行解析，除非`package.json`中设定了`"type": "module"`。（node.js中commonjs模块如何当成一个es module使用，是另一个大问题，此处不赘述。）

理论上说，`file.js`不包含`export`、`import`等只允许在es module中出现的语句，也不包含一些在es module中被禁用的特性，则`file.js`既可以按照es module解析，也可以按照传统script解析。Web平台就是如此，这就要求确定一个脚本资源时（比如缓存时），不是url唯一的，而是还需要纳入解析目标（parse goal）。（当然，本来就不是url唯一，需要考虑mime type的，但es module也仍然使用`text/javascript`的mime type。）

而node.js因为要考虑既有的commonjs资产，就决定要同时支持es module和commonjs，因此对于`import "./file.js"`就不可能总是按照es module解析。另一方面node.js的模块缓存一直以来也是基于url唯一的（文件系统没有mime type）。

---

## 3. 浏览器和 Node 中的事件循环有什么区别？

**参考答案：**

浏览器

关于微任务和宏任务在浏览器的执行顺序是这样的：

- 执行一只task（宏任务）

- 执行完micro-task队列 （微任务）

如此循环往复下去

常见的 task（宏任务） 比如：setTimeout、setInterval、script（整体代码）、 I/O 操作、UI 渲染等。 常见的 micro-task 比如: new Promise().then(回调)、MutationObserver(html5新特性) 等。

Node

Node的事件循环是libuv实现的，引用一张官网的图：

![](<images/8. Node.js（27题）-image-13.png>)

大体的task（宏任务）执行顺序是这样的：

- timers定时器：本阶段执行已经安排的 setTimeout() 和 setInterval() 的回调函数。

- pending callbacks待定回调：执行延迟到下一个循环迭代的 I/O 回调。

- idle, prepare：仅系统内部使用。

- poll 轮询：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，它们由计时器和

- setImmediate() 排定的之外），其余情况 node 将在此处阻塞。

- check 检测：setImmediate() 回调函数在这里执行。

- close callbacks 关闭的回调函数：一些准备关闭的回调函数，如：socket.on('close', ...)。

微任务和宏任务在Node的执行顺序

Node 10以前：

- 执行完一个阶段的所有任务

- 执行完nextTick队列里面的内容

- 然后执行完微任务队列的内容

Node 11以后： 和浏览器的行为统一了，都是每执行一个宏任务就执行完微任务队列。

---

## 4. Node性能如何进行监控以及优化？

**参考答案：**

一、 是什么

`Node`作为一门服务端语言，性能方面尤为重要，其衡量指标一般有如下：

- CPU

- 内存

- I/O

- 网络

CPU

主要分成了两部分：

- CPU负载：在某个时间段内，占用以及等待CPU的进程总数

- CPU使用率：CPU时间占用状况，等于 1 - 空闲CPU时间(idle time) / CPU总时间

这两个指标都是用来评估系统当前CPU的繁忙程度的量化指标

`Node`应用一般不会消耗很多的`CPU`，如果`CPU`占用率高，则表明应用存在很多同步操作，导致异步任务回调被阻塞

内存指标

内存是一个非常容易量化的指标。 内存占用率是评判一个系统的内存瓶颈的常见指标。 对于Node来说，内部内存堆栈的使用状态也是一个可以量化的指标

```javascript
// /app/lib/memory.js
const os = require('os')
// 获取当前Node内存堆栈情况
const { rss, heapUsed, heapTotal } = process.memoryUsage()
// 获取系统空闲内存
const sysFree = os.freemem()
// 获取系统总内存
const sysTotal = os.totalmem()

module.exports = {
  memory: () => {
    return {
      sys: 1 - sysFree / sysTotal, // 系统内存占用率
      heap: heapUsed / headTotal, // Node堆内存占用率
      node: rss / sysTotal, // Node占用系统内存的比例
    }
  },
}
```

- rss：表示node进程占用的内存总量。

- heapTotal：表示堆内存的总量。

- heapUsed：实际堆内存的使用量。

- external ：外部程序的内存使用量，包含Node核心的C++程序的内存使用量

在`Node`中，一个进程的最大内存容量为1.5GB。因此我们需要减少内存泄露

磁盘 I/O

硬盘的` IO` 开销是非常昂贵的，硬盘 IO 花费的 CPU 时钟周期是内存的 164000 倍

内存 `IO `比磁盘` IO` 快非常多，所以使用内存缓存数据是有效的优化方法。常用的工具如 `redis`、`memcached `等

并不是所有数据都需要缓存，访问频率高，生成代价比较高的才考虑是否缓存，也就是说影响你性能瓶颈的考虑去缓存，并且而且缓存还有缓存雪崩、缓存穿透等问题要解决

如何监控

关于性能方面的监控，一般情况都需要借助工具来实现

这里采用`Easy-Monitor 2.0`，其是轻量级的 `Node.js` 项目内核性能监控 + 分析工具，在默认模式下，只需要在项目入口文件 `require` 一次，无需改动任何业务代码即可开启内核级别的性能监控分析

使用方法如下：

在你的项目入口文件中按照如下方式引入，当然请传入你的项目名称：

```javascript
const easyMonitor = require('easy-monitor')
easyMonitor('你的项目名称')
```

打开你的浏览器，访问 `http://localhost:12333` ，即可看到进程界面

关于定制化开发、通用配置项以及如何动态更新配置项详见官方文档

如何优化

关于`Node`的性能优化的方式有：

- 使用最新版本Node.js

- 正确使用流 Stream

- 代码层面优化

- 内存管理优化

使用最新版本Node.js

每个版本的性能提升主要来自于两个方面：

- V8 的版本更新

- Node.js 内部代码的更新优化

正确使用流 Stream

在`Node`中，很多对象都实现了流，对于一个大文件可以通过流的形式发送，不需要将其完全读入内存

```javascript
const http = require('http')
const fs = require('fs')

// bad
http.createServer(function (req, res) {
  fs.readFile(__dirname + '/data.txt', function (err, data) {
    res.end(data)
  })
})

// good
http.createServer(function (req, res) {
  const stream = fs.createReadStream(__dirname + '/data.txt')
  stream.pipe(res)
})
```

代码层面优化

合并查询，将多次查询合并一次，减少数据库的查询次数

```javascript
// bad
for user_id in userIds
     let account = user_account.findOne(user_id)

// good
const user_account_map = {}   // 注意这个对象将会消耗大量内存。
user_account.find(user_id in user_ids).forEach(account){
    user_account_map[account.user_id] =  account
}
for user_id in userIds
    var account = user_account_map[user_id]
```

内存管理优化

在 V8 中，主要将内存分为新生代和老生代两代：

- 新生代：对象的存活时间较短。新生对象或只经过一次垃圾回收的对象

- 老生代：对象存活时间较长。经历过一次或多次垃圾回收的对象

若新生代内存空间不够，直接分配到老生代

通过减少内存占用，可以提高服务器的性能。如果有内存泄露，也会导致大量的对象存储到老生代中，服务器性能会大大降低

如下面情况：

```javascript
const buffer = fs.readFileSync(__dirname + '/source/index.htm')

app.use(
  mount('/', async (ctx) => {
    ctx.status = 200
    ctx.type = 'html'
    ctx.body = buffer
    leak.push(fs.readFileSync(__dirname + '/source/index.htm'))
  }),
)

const leak = []
```

`leak`的内存非常大，造成内存泄露，应当避免这样的操作，通过减少内存使用，是提高服务性能的手段之一

而节省内存最好的方式是使用池，其将频用、可复用对象存储起来，减少创建和销毁操作

例如有个图片请求接口，每次请求，都需要用到类。若每次都需要重新new这些类，并不是很合适，在大量请求时，频繁创建和销毁这些类，造成内存抖动

使用对象池的机制，对这种频繁需要创建和销毁的对象保存在一个对象池中。每次用到该对象时，就取对象池空闲的对象，并对它进行初始化操作，从而提高框架的性能。

---

## 5. 如果让你来设计一个分页功能, 你会怎么设计? 前后端如何交互?

**参考答案：**

一、是什么

在我们做数据查询的时候，如果数据量很大，比如几万条数据，放在一个页面显示的话显然不友好，这时候就需要采用分页显示的形式，如每次只显示10条数据

![](<images/8. Node.js（27题）-image-7.png>)

要实现分页功能，实际上就是从结果集中显示第110条记录作为第1页，显示第1120条记录作为第2页，以此类推

因此，分页实际上就是从结果集中截取出第M\~N条记录

二、如何实现

前端实现分页功能，需要后端返回必要的数据，如总的页数，总的数据量，当前页，当前的数据

```javascript
{
 "totalCount": 1836,   // 总的条数
 "totalPages": 92,  // 总页数
 "currentPage": 1   // 当前页数
 "data": [     // 当前页的数据
   {
 ...
   }
]
```

后端采用`mysql`作为数据的持久性存储

前端向后端发送目标的页码`page`以及每页显示数据的数量`pageSize`，默认情况每次取10条数据，则每一条数据的起始位置`start`为：

```javascript
const start = (page - 1) * pageSize
```

当确定了`limit`和`start`的值后，就能够确定`SQL`语句：

```javascript
const sql = `SELECT * FROM record limit ${pageSize} OFFSET ${start};`
```

`上述SQL`语句表达的意思为：截取从`start`到`start`+`pageSize`之间（左闭右开）的数据

关于查询数据总数的`SQL`语句为，`record`为表名：

```javascript
SELECT COUNT(*) FROM record
```

因此后端的处理逻辑为：

- 获取用户参数页码数page和每页显示的数目 pageSize ，其中page 是必须传递的参数，pageSize为可选参数，默认为10

- 编写 SQL 语句，利用 limit 和 OFFSET 关键字进行分页查询

- 查询数据库，返回总数据量、总页数、当前页、当前页数据给前端

代码如下所示：

```javascript
router.all('/api', function (req, res, next) {
  var param = ''
  // 获取参数
  if (req.method == 'POST') {
    param = req.body
  } else {
    param = req.query || req.params
  }
  if (param.page == '' || param.page == null || param.page == undefined) {
    res.end(JSON.stringify({ msg: '请传入参数page', status: '102' }))
    return
  }
  const pageSize = param.pageSize || 10
  const start = (param.page - 1) * pageSize
  const sql = `SELECT * FROM record limit ${pageSize} OFFSET ${start};`
  pool.getConnection(function (err, connection) {
    if (err) throw err
    connection.query(sql, function (err, results) {
      connection.release()
      if (err) {
        throw err
      } else {
        // 计算总页数
        var allCount = results[0][0]['COUNT(*)']
        var allPage = parseInt(allCount) / 20
        var pageStr = allPage.toString()
        // 不能被整除
        if (pageStr.indexOf('.') > 0) {
          allPage = parseInt(pageStr.split('.')[0]) + 1
        }
        var list = results[1]
        res.end(
          JSON.stringify({
            msg: '操作成功',
            status: '200',
            totalPages: allPage,
            currentPage: param.page,
            totalCount: allCount,
            data: list,
          }),
        )
      }
    })
  })
})
```

三、总结

通过上面的分析，可以看到分页查询的关键在于，要首先确定每页显示的数量`pageSize`，然后根据当前页的索引`pageIndex`（从1开始），确定`LIMIT`和`OFFSET`应该设定的值：

- LIMIT 总是设定为 pageSize

- OFFSET 计算公式为 pageSize \* (pageIndex - 1)

确定了这两个值，就能查询出第 `N`页的数据

---

## 6. 如何实现文件上传？说说你的思路

**参考答案：**

一、是什么

---

文件上传在日常开发中应用很广泛，我们发微博、发微信朋友圈都会用到了图片上传功能

因为浏览器限制，浏览器不能直接操作文件系统的，需要通过浏览器所暴露出来的统一接口，由用户主动授权发起来访问文件动作，然后读取文件内容进指定内存里，最后执行提交请求操作，将内存里的文件内容数据上传到服务端，服务端解析前端传来的数据信息后存入文件里

对于文件上传，我们需要设置请求头为`content-type:multipart/form-data`

> <span style="color: rgb(36,91,219); background-color: inherit">multipart互联网上的混合资源，就是资源由多种元素组成，form-data表示可以使用HTML Forms 和 POST 方法上传文件</span>

结构如下：

```javascript
POST /t2/upload.do HTTP/1.1
User-Agent: SOHUWapRebot
Accept-Language: zh-cn,zh;q=0.5
Accept-Charset: GBK,utf-8;q=0.7,*;q=0.7
Connection: keep-alive
Content-Length: 60408
Content-Type:multipart/form-data; boundary=ZnGpDtePMx0KrHh_G0X99Yef9r8JZsRJSXC
Host: w.sohu.com

--ZnGpDtePMx0KrHh_G0X99Yef9r8JZsRJSXC
Content-Disposition: form-data; name="city"

Santa colo
--ZnGpDtePMx0KrHh_G0X99Yef9r8JZsRJSXC
Content-Disposition: form-data;name="desc"
Content-Type: text/plain; charset=UTF-8
Content-Transfer-Encoding: 8bit

...
--ZnGpDtePMx0KrHh_G0X99Yef9r8JZsRJSXC
Content-Disposition: form-data;name="pic"; filename="photo.jpg"
Content-Type: application/octet-stream
Content-Transfer-Encoding: binary

... binary data of the jpg ...
--ZnGpDtePMx0KrHh_G0X99Yef9r8JZsRJSXC--
```

`boundary`表示分隔符，如果要上传多个表单项，就要使用`boundary`分割，每个表单项由`———XXX`开始，以`———XXX`结尾

而`xxx`是即时生成的字符串，用以确保整个分隔符不会在文件或表单项的内容中出现

每个表单项必须包含一个 `Content-Disposition` 头，其他的头信息则为可选项， 比如 `Content-Type`

`Content-Disposition` 包含了 `type `和 一个名字为`name`的 `parameter`，`type` 是 `form-data`，`name `参数的值则为表单控件（也即 field）的名字，如果是文件，那么还有一个 `filename `参数，值就是文件名

```javascript
Content-Disposition: form-data; name="user"; filename="logo.png"
```

至于使用`multipart/form-data`，是因为文件是以二进制的形式存在，其作用是专门用于传输大型二进制数据，效率高

**二、如何实现**

关于文件的上传的上传，我们可以分成两步骤：

- 文件的上传

- 文件的解析

文件上传

传统前端文件上传的表单结构如下

```javascript
<form action="http://localhost:8080/api/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="file" id="file" value="" multiple="multiple" />
  <input type="submit" value="提交" />
</form>
```

`action` 就是我们的提交到的接口，`enctype="multipart/form-data"` 就是指定上传文件格式，`input` 的 `name` 属性一定要等于`file`

文件解析

在服务器中，这里采用`koa2`中间件的形式解析上传的文件数据，分别有下面两种形式：

- koa-body

- koa-multer

koa-body

安装依赖

```javascript
npm install koa-body
```

引入`koa-body`中间件

```javascript
const koaBody = require('koa-body')
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
    },
  }),
)
```

获取上传的文件

```javascript
const file = ctx.request.files.file // 获取上传文件
```

获取文件数据后，可以通过`fs`模块将文件保存到指定目录

```javascript
router.post('/uploadfile', async (ctx, next) => {
  // 上传单个文件
  const file = ctx.request.files.file // 获取上传文件
  // 创建可读流
  const reader = fs.createReadStream(file.path)
  let filePath = path.join(__dirname, 'public/upload/') + `/${file.name}`
  // 创建可写流
  const upStream = fs.createWriteStream(filePath)
  // 可读流通过管道写入可写流
  reader.pipe(upStream)
  return (ctx.body = '上传成功！')
})
```

koa-multer

安装依赖：

```javascript
npm install koa-multer
```

使用 `multer` 中间件实现文件上传

```javascript
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({ storage })
const fileRouter = new Router()
fileRouter.post('/upload', upload.single('file'), (ctx, next) => {
  console.log(ctx.req.file) // 获取文件
})

app.use(fileRouter.routes())
```

---

## 7. 如何实现jwt鉴权机制？说说你的思路

一、是什么

JWT（JSON Web Token），本质就是一个字符串书写规范，如下图，作用是用来在用户和服务器之间传递安全可靠的信息

![](<images/8. Node.js（27题）-image-9.png>)

在目前前后端分离的开发过程中，使用`token`鉴权机制用于身份验证是最常见的方案，流程如下：

- 服务器当验证用户账号和密码正确的时候，给用户颁发一个令牌，这个令牌作为后续用户访问一些接口的凭证

- 后续访问会根据这个令牌判断用户这时候有权限进行访问

`Token`，分成了三部分，头部（Header）、载荷（Payload）、签名（Signature），并以`.`进行拼接。其中头部和载荷都是以`JSON`格式存放数据，只是进行了编码

![](<images/8. Node.js（27题）-image-11.png>)

header

每个JWT都会带有头部信息，这里主要声明使用的算法。声明算法的字段名为`alg`，同时还有一个`typ`的字段，默认`JWT`即可。以下示例中算法为HS256

```javascript
{  "alg": "HS256",  "typ": "JWT" }
```

因为JWT是字符串，所以我们还需要对以上内容进行Base64编码，编码后字符串如下：

```javascript
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

payload

载荷即消息体，这里会存放实际的内容，也就是`Token`的数据声明，例如用户的`id`和`name`，默认情况下也会携带令牌的签发时间`iat`，通过还可以设置过期时间，如下：

```javascript
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

同样进行Base64编码后，字符串如下：

```javascript
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ
```

Signature

签名是对头部和载荷内容进行签名，一般情况，设置一个`secretKey`，对前两个的结果进行`HMACSHA25`算法，公式如下：

```javascript
Signature = HMACSHA256(base64Url(header)+.+base64Url(payload),secretKey)
```

二、如何实现

`Token`的使用分成了两部分：

- 生成token：登录成功的时候，颁发token

- 验证token：访问某些资源或者接口时，验证token

生成 token

借助第三方库`jsonwebtoken`，通过`jsonwebtoken` 的 `sign` 方法生成一个 `token`：

- 第一个参数指的是 Payload

- 第二个是秘钥，服务端特有

- 第三个参数是 option，可以定义 token 过期时间

```javascript
const crypto = require('crypto'),
  jwt = require('jsonwebtoken')
// TODO:使用数据库
// 这里应该是用数据库存储，这里只是演示用
let userList = []

class UserController {
  // 用户登录
  static async login(ctx) {
    const data = ctx.request.body
    if (!data.name || !data.password) {
      return (ctx.body = {
        code: '000002',
        message: '参数不合法',
      })
    }
    const result = userList.find(
      (item) =>
        item.name === data.name &&
        item.password === crypto.createHash('md5').update(data.password).digest('hex'),
    )
    if (result) {
      // 生成token
      const token = jwt.sign(
        {
          name: result.name,
        },
        'test_token', // secret
        { expiresIn: 60 * 60 }, // 过期时间：60 * 60 s
      )
      return (ctx.body = {
        code: '0',
        message: '登录成功',
        data: {
          token,
        },
      })
    } else {
      return (ctx.body = {
        code: '000002',
        message: '用户名或密码错误',
      })
    }
  }
}

module.exports = UserController
```

在前端接收到`token`后，一般情况会通过`localStorage`进行缓存，然后将`token`放到`HTTP `请求头`Authorization` 中，关于`Authorization` 的设置，前面要加上 Bearer ，注意后面带有空格

```javascript
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  config.headers.common['Authorization'] = 'Bearer ' + token // 留意这里的 Authorization
  return config
})
```

校验token

使用 `koa-jwt` 中间件进行验证，方式比较简单

```javascript
/ 注意：放在路由前面
app.use(koajwt({
  secret: 'test_token'
}).unless({ // 配置白名单
  path: [/\/api\/register/, /\/api\/login/]
}))
```

- secret 必须和 sign 时候保持一致

- 可以通过 unless 配置接口白名单，也就是哪些 URL 可以不用经过校验，像登陆/注册都可以不用校验

- 校验的中间件需要放在需要校验的路由前面，无法对前面的 URL 进行校验

获取`token`用户的信息方法如下：

```javascript
router.get('/api/userInfo',async (ctx,next) =>{    const authorization =  ctx.header.authorization // 获取jwt    const token = authorization.replace('Beraer ','')    const result = jwt.verify(token,'test_token')    ctx.body = result
```

注意：上述的`HMA256`加密算法为单秘钥的形式，一旦泄露后果非常的危险

在分布式系统中，每个子系统都要获取到秘钥，那么这个子系统根据该秘钥可以发布和验证令牌，但有些服务器只需要验证令牌

这时候可以采用非对称加密，利用私钥发布令牌，公钥验证令牌，加密算法可以选择`RS256`

三、优缺点

优点：

- json具有通用性，所以可以跨语言

- 组成简单，字节占用小，便于传输

- 服务端无需保存会话信息，很容易进行水平扩展

- 一处生成，多处使用，可以在分布式系统中，解决单点登录问题

- 可防护CSRF攻击

缺点：

- payload部分仅仅是进行简单编码，所以只能用于存储逻辑必需的非敏感信息

- 需要保护好加密密钥，一旦泄露后果不堪设想

- 为避免token被劫持，最好使用https协议

---

## 8. 说说对中间件概念的理解，如何封装 node 中间件？

**参考答案：**

一、是什么

中间件（Middleware）是介于应用系统和系统软件之间的一类软件，它使用系统软件所提供的基础服务（功能），衔接网络上应用系统的各个部分或不同的应用，能够达到资源共享、功能共享的目的

在`NodeJS`中，中间件主要是指封装`http`请求细节处理的方法

例如在`express`、`koa`等`web`框架中，中间件的本质为一个回调函数，参数包含请求对象、响应对象和执行下一个中间件的函数

![](<images/8. Node.js（27题）-image-10.png>)

在这些中间件函数中，我们可以执行业务逻辑代码，修改请求和响应对象、返回响应数据等操作

二、封装

`koa`是基于`NodeJS`当前比较流行的`web`框架，本身支持的功能并不多，功能都可以通过中间件拓展实现。通过添加不同的中间件，实现不同的需求，从而构建一个 `Koa` 应用

`Koa` 中间件采用的是洋葱圈模型，每次执行下一个中间件传入两个参数：

- ctx ：封装了request 和 response 的变量

- next ：进入下一个要执行的中间件的函数

![](<images/8. Node.js（27题）-image-12.png>)

下面就针对`koa`进行中间件的封装：

`Koa `的中间件就是函数，可以是` async` 函数，或是普通函数

```javascript
// async 函数
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 普通函数
app.use((ctx, next) => {
  const start = Date.now()
  return next().then(() => {
    const ms = Date.now() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })
})
```

下面则通过中间件封装`http`请求过程中几个常用的功能：

token校验

```javascript
module.exports = (options) => async (ctx, next) {
  try {
    // 获取 token
    const token = ctx.header.authorization
    if (token) {
      try {
          // verify 函数验证 token，并获取用户相关信息
          await verify(token)
      } catch (err) {
        console.log(err)
      }
    }
    // 进入下一个中间件
    await next()
  } catch (err) {
    console.log(err)
  }
}
```

日志模块

```javascript
const fs = require('fs')
module.exports = (options) => async (ctx, next) => {
  const startTime = Date.now()
  const requestTime = new Date()
  await next()
  const ms = Date.now() - startTime
  let logout = `${ctx.request.ip} -- ${requestTime} -- ${ctx.method} -- ${ctx.url} -- ${ms}ms`
  // 输出日志文件
  fs.appendFileSync('./log.txt', logout + '\n')
}
```

`Koa`存在很多第三方的中间件，如`koa-bodyparser`、`koa-static`等

下面再来看看它们的大体的简单实现：

koa-bodyparser

`koa-bodyparser` 中间件是将我们的 `post` 请求和表单提交的查询字符串转换成对象，并挂在 `ctx.request.body` 上，方便我们在其他中间件或接口处取值

```javascript
// 文件：my-koa-bodyparser.js
const querystring = require('querystring')

module.exports = function bodyParser() {
  return async (ctx, next) => {
    await new Promise((resolve, reject) => {
      // 存储数据的数组
      let dataArr = []

      // 接收数据
      ctx.req.on('data', (data) => dataArr.push(data))

      // 整合数据并使用 Promise 成功
      ctx.req.on('end', () => {
        // 获取请求数据的类型 json 或表单
        let contentType = ctx.get('Content-Type')

        // 获取数据 Buffer 格式
        let data = Buffer.concat(dataArr).toString()

        if (contentType === 'application/x-www-form-urlencoded') {
          // 如果是表单提交，则将查询字符串转换成对象赋值给 ctx.request.body
          ctx.request.body = querystring.parse(data)
        } else if (contentType === 'applaction/json') {
          // 如果是 json，则将字符串格式的对象转换成对象赋值给 ctx.request.body
          ctx.request.body = JSON.parse(data)
        }

        // 执行成功的回调
        resolve()
      })
    })

    // 继续向下执行
    await next()
  }
}
```

koa-static

`koa-static` 中间件的作用是在服务器接到请求时，帮我们处理静态文件

```javascript
const fs = require('fs')
const path = require('path')
const mime = require('mime')
const { promisify } = require('util')

// 将 stat 和 access 转换成 Promise
const stat = promisify(fs.stat)
const access = promisify(fs.access)

module.exports = function (dir) {
  return async (ctx, next) => {
    // 将访问的路由处理成绝对路径，这里要使用 join 因为有可能是 /
    let realPath = path.join(dir, ctx.path)

    try {
      // 获取 stat 对象
      let statObj = await stat(realPath)

      // 如果是文件，则设置文件类型并直接响应内容，否则当作文件夹寻找 index.html
      if (statObj.isFile()) {
        ctx.set('Content-Type', `${mime.getType()};charset=utf8`)
        ctx.body = fs.createReadStream(realPath)
      } else {
        let filename = path.join(realPath, 'index.html')

        // 如果不存在该文件则执行 catch 中的 next 交给其他中间件处理
        await access(filename)

        // 存在设置文件类型并响应内容
        ctx.set('Content-Type', 'text/html;charset=utf8')
        ctx.body = fs.createReadStream(filename)
      }
    } catch (e) {
      await next()
    }
  }
}
```

三、总结

在实现中间件时候，单个中间件应该足够简单，职责单一，中间件的代码编写应该高效，必要的时候通过缓存重复获取数据

`koa`本身比较简洁，但是通过中间件的机制能够实现各种所需要的功能，使得`web`应用具备良好的可拓展性和组合性

通过将公共逻辑的处理编写在中间件中，可以不用在每一个接口回调中做相同的代码编写，减少了冗杂代码，过程就如装饰者模式

---

## 9. 说说 Node 文件查找的优先级以及 Require 方法的文件查找策略?

**参考答案：**

一、模块规范

`NodeJS`对`CommonJS`进行了支持和实现，让我们在开发`node`的过程中可以方便的进行模块化开发：

- 在Node中每一个js文件都是一个单独的模块

- 模块中包括CommonJS规范的核心变量：exports、module.exports、require

- 通过上述变量进行模块化开发

而模块化的核心是导出与导入，在`Node`中通过`exports`与`module.exports`负责对模块中的内容进行导出，通过`require`函数导入其他模块（自定义模块、系统模块、第三方库模块）中的内容

二、查找策略

`require`方法接收一下几种参数的传递：

- 原生模块：http、fs、path等

- 相对路径的文件模块：./mod或../mod

- 绝对路径的文件模块：/pathtomodule/mod

- 目录作为模块：./dirname

- 非原生模块的文件模块：mod

`require`参数较为简单，但是内部的加载却是十分复杂的，其加载优先级也各自不同，如下图：

![](<images/8. Node.js（27题）-image-5.png>)

从上图可以看见，文件模块存在缓存区，寻找模块路径的时候都会优先从缓存中加载已经存在的模块

原生模块

而像原生模块这些，通过`require `方法在解析文件名之后，优先检查模块是否在原生模块列表中，如果在则从原生模块中加载

绝对路径、相对路径

如果`require`绝对路径的文件，则直接查找对应的路径，速度最快

相对路径的模块则相对于当前调用`require`的文件去查找

如果按确切的文件名没有找到模块，则 `NodeJs` 会尝试带上 `.js`、`.json `或 `.node `拓展名再加载

目录作为模块

默认情况是根据根目录中`package.json`文件的`main`来指定目录模块，如：

```javascript
{ "name" : "some-library",
  "main" : "main.js" }
```

如果这是在`./some-library node_modules`目录中，则 `require('./some-library')` 会试图加载 `./some-library/main.js`

如果目录里没有 `package.json`文件，或者 `main`入口不存在或无法解析，则会试图加载目录下的 `index.js` 或 `index.node` 文件

非原生模块

在每个文件中都存在`module.paths`，表示模块的搜索路径，`require`就是根据其来寻找文件

在`window`下输出如下：

```javascript
;['c:\\nodejs\\node_modules', 'c:\\node_modules']
```

可以看出`module path`的生成规则为：从当前文件目录开始查找`node_modules`目录；然后依次进入父目录，查找父目录下的`node_modules`目录，依次迭代，直到根目录下的`node_modules`目录

当都找不到的时候，则会从系统`NODE_PATH`环境变量查找

举个例子：

如果在`/home/ry/projects/foo.js`文件里调用了 `require('bar.js')`，则 Node.js 会按以下顺序查找：

- /home/ry/projects/node_modules/bar.js

- /home/ry/node_modules/bar.js

- /home/node_modules/bar.js

- /node_modules/bar.js

这使得程序本地化它们的依赖，避免它们产生冲突

三、总结

通过上面模块的文件查找策略之后，总结下文件查找的优先级：

- 缓存的模块优先级最高

- 如果是内置模块，则直接返回，优先级仅次缓存的模块

- 如果是绝对路径 / 开头，则从根目录找

- 如果是相对路径 ./开头，则从当前require文件相对位置找

- 如果文件没有携带后缀，先从js、json、node按顺序查找

- 如果是目录，则根据 package.json的main属性值决定目录下入口文件，默认情况为 index.js

- 如果文件为第三方模块，则会引入 node_modules 文件，如果不在当前仓库文件中，则自动从上级递归查找，直到根目录

---

## 10. 说说对Nodejs中的事件循环机制理解?

**参考答案：**

一、是什么

在<span style="color: rgb(36,91,219); background-color: inherit">浏览器事件循环</span>中，我们了解到`javascript`在浏览器中的事件循环机制，其是根据`HTML5`定义的规范来实现

而在`NodeJS`中，事件循环是基于`libuv`实现，`libuv`是一个多平台的专注于异步IO的库，如下图最右侧所示：

![](<images/8. Node.js（27题）-image-8.png>)

上图`EVENT_QUEUE` 给人看起来只有一个队列，但`EventLoop`存在6个阶段，每个阶段都有对应的一个先进先出的回调队列

二、流程

---

上节讲到事件循环分成了六个阶段，对应如下：

![](<images/8. Node.js（27题）-image-3.png>)

- timers阶段：这个阶段执行timer（setTimeout、setInterval）的回调

- 定时器检测阶段(timers)：本阶段执行 timer 的回调，即 setTimeout、setInterval 里面的回调函数

- I/O事件回调阶段(I/O callbacks)：执行延迟到下一个循环迭代的 I/O 回调，即上一轮循环中未被执行的一些I/O回调

- 闲置阶段(idle, prepare)：仅系统内部使用

- 轮询阶段(poll)：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和 setImmediate() 调度的之外），其余情况 node 将在适当的时候在此阻塞

- 检查阶段(check)：setImmediate() 回调函数在这里执行

- 关闭事件回调阶段(close callback)：一些关闭的回调函数，如：socket.on('close', ...)

每个阶段对应一个队列，当事件循环进入某个阶段时, 将会在该阶段内执行回调，直到队列耗尽或者回调的最大数量已执行, 那么将进入下一个处理阶段

除了上述6个阶段，还存在`process.nextTick`，其不属于事件循环的任何一个阶段，它属于该阶段与下阶段之间的过渡, 即本阶段执行结束, 进入下一个阶段前, 所要执行的回调，类似插队

流程图如下所示：

![](<images/8. Node.js（27题）-image-6.png>)

在`Node`中，同样存在宏任务和微任务，与浏览器中的事件循环相似

微任务对应有：

- next tick queue：process.nextTick

- other queue：Promise的then回调、queueMicrotask

宏任务对应有：

- timer queue：setTimeout、setInterval

- poll queue：IO事件

- check queue：setImmediate

- close queue：close事件

其执行顺序为：

- next tick microtask queue

- other microtask queue

- timer queue

- poll queue

- check queue

- close queue

三、题目

---

通过上面的学习，下面开始看看题目

```javascript
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}

async function async2() {
  console.log('async2')
}

console.log('script start')

setTimeout(function () {
  console.log('setTimeout0')
}, 0)

setTimeout(function () {
  console.log('setTimeout2')
}, 300)

setImmediate(() => console.log('setImmediate'))

process.nextTick(() => console.log('nextTick1'))

async1()

process.nextTick(() => console.log('nextTick2'))

new Promise(function (resolve) {
  console.log('promise1')
  resolve()
  console.log('promise2')
}).then(function () {
  console.log('promise3')
})

console.log('script end')
```

分析过程：

- 先找到同步任务，输出script start

- 遇到第一个 setTimeout，将里面的回调函数放到 timer 队列中

- 遇到第二个 setTimeout，300ms后将里面的回调函数放到 timer 队列中

- 遇到第一个setImmediate，将里面的回调函数放到 check 队列中

- 遇到第一个 nextTick，将其里面的回调函数放到本轮同步任务执行完毕后执行

- 执行 async1函数，输出 async1 start

- 执行 async2 函数，输出 async2，async2 后面的输出 async1 end进入微任务，等待下一轮的事件循环

- 遇到第二个，将其里面的回调函数放到本轮同步任务执行完毕后执行

- 遇到 new Promise，执行里面的立即执行函数，输出 promise1、promise2

- then里面的回调函数进入微任务队列

- 遇到同步任务，输出 script end

- 执行下一轮回到函数，先依次输出 nextTick 的函数，分别是 nextTick1、nextTick2

- 然后执行微任务队列，依次输出 async1 end、promise3

- 执行timer 队列，依次输出 setTimeout0

- 接着执行 check 队列，依次输出 setImmediate

- 300ms后，timer 队列存在任务，执行输出 setTimeout2

执行结果如下：

![](<images/8. Node.js（27题）-1719974994942.png>)

最后有一道是关于`setTimeout`与`setImmediate`的输出顺序

```javascript
setTimeout(() => {
  console.log('setTimeout')
}, 0)

setImmediate(() => {
  console.log('setImmediate')
})
```

输出情况如下：

```javascript
情况一：
setTimeout
setImmediate

情况二：
setImmediate
setTimeout
```

分析下流程：

- 外层同步代码一次性全部执行完，遇到异步API就塞到对应的阶段

- 遇到`setTimeout`，虽然设置的是0毫秒触发，但实际上会被强制改成1ms，时间到了然后塞入`times`阶段

- 遇到`setImmediate`塞入`check`阶段

- 同步代码执行完毕，进入Event Loop

- 先进入`times`阶段，检查当前时间过去了1毫秒没有，如果过了1毫秒，满足`setTimeout`条件，执行回调，如果没过1毫秒，跳过

- 跳过空的阶段，进入check阶段，执行`setImmediate`回调

这里的关键在于这1ms，如果同步代码执行时间较长，进入`Event Loop`的时候1毫秒已经过了，`setTimeout`先执行，如果1毫秒还没到，就先执行了`setImmediate`

---

## 11. 说说Node中的EventEmitter? 如何实现一个EventEmitter?

**参考答案：**

一、是什么

我们了解到，`Node `采用了事件驱动机制，而`EventEmitter `就是`Node`实现事件驱动的基础

在`EventEmitter`的基础上，`Node `几乎所有的模块都继承了这个类，这些模块拥有了自己的事件，可以绑定／触发监听器，实现了异步操作

`Node.js` 里面的许多对象都会分发事件，比如 fs.readStream 对象会在文件被打开的时候触发一个事件

这些产生事件的对象都是 events.EventEmitter 的实例，这些对象有一个 eventEmitter.on() 函数，用于将一个或多个函数绑定到命名事件上

二、使用方法

`Node `的`events`模块只提供了一个`EventEmitter`类，这个类实现了`Node`异步事件驱动架构的基本模式——观察者模式

在这种模式中，被观察者(主体)维护着一组其他对象派来(注册)的观察者，有新的对象对主体感兴趣就注册观察者，不感兴趣就取消订阅，主体有更新的话就依次通知观察者们

基本代码如下所示：

```javascript
const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter()

function callback() {
  console.log('触发了event事件！')
}
myEmitter.on('event', callback)
myEmitter.emit('event')
myEmitter.removeListener('event', callback)
```

通过实例对象的`on`方法注册一个名为`event`的事件，通过`emit`方法触发该事件，而`removeListener`用于取消事件的监听

关于其常见的方法如下：

- emitter.addListener/on(eventName, listener) ：添加类型为 eventName 的监听事件到事件数组尾部

- emitter.prependListener(eventName, listener)：添加类型为 eventName 的监听事件到事件数组头部

- emitter.emit(eventName\[, ...args])：触发类型为 eventName 的监听事件

- emitter.removeListener/off(eventName, listener)：移除类型为 eventName 的监听事件

- emitter.once(eventName, listener)：添加类型为 eventName 的监听事件，以后只能执行一次并删除

- emitter.removeAllListeners(\[eventName])： 移除全部类型为 eventName 的监听事件

三、实现过程

通过上面的方法了解，`EventEmitter`是一个构造函数，内部存在一个包含所有事件的对象

```javascript
class EventEmitter {
  constructor() {
    this.events = {}
  }
}
```

其中`events`存放的监听事件的函数的结构如下：

```javascript
{
  "event1": [f1,f2,f3]，
  "event2": [f4,f5]，
  ...
}
```

然后开始一步步实现实例方法，首先是`emit`，第一个参数为事件的类型，第二个参数开始为触发事件函数的参数，实现如下：

```javascript
emit(type, ...args) {
    this.events[type].forEach((item) => {
        Reflect.apply(item, this, args);
    });
}
```

当实现了`emit`方法之后，然后实现`on`、`addListener`、`prependListener`这三个实例方法，都是添加事件监听触发函数，实现也是大同小异

```javascript
on(type, handler) {
    if (!this.events[type]) {
        this.events[type] = [];
    }
    this.events[type].push(handler);
}

addListener(type,handler){
    this.on(type,handler)
}

prependListener(type, handler) {
    if (!this.events[type]) {
        this.events[type] = [];
    }
    this.events[type].unshift(handler);
}
```

紧接着就是实现事件监听的方法`removeListener/on`

```javascript
removeListener(type, handler) {
    if (!this.events[type]) {
        return;
    }
    this.events[type] = this.events[type].filter(item => item !== handler);
}

off(type,handler){
    this.removeListener(type,handler)
}
```

最后再来实现`once`方法， 再传入事件监听处理函数的时候进行封装，利用闭包的特性维护当前状态，通过`fired`属性值判断事件函数是否执行过

```javascript
once(type, handler) {
    this.on(type, this._onceWrap(type, handler, this));
  }

  _onceWrap(type, handler, target) {
    const state = { fired: false, handler, type , target};
    const wrapFn = this._onceWrapper.bind(state);
    state.wrapFn = wrapFn;
    return wrapFn;
  }

  _onceWrapper(...args) {
    if (!this.fired) {
      this.fired = true;
      Reflect.apply(this.handler, this.target, args);
      this.target.off(this.type, this.wrapFn);
    }
 }
```

完整代码如下：

```javascript
class EventEmitter {
  constructor() {
    this.events = {}
  }

  on(type, handler) {
    if (!this.events[type]) {
      this.events[type] = []
    }
    this.events[type].push(handler)
  }

  addListener(type, handler) {
    this.on(type, handler)
  }

  prependListener(type, handler) {
    if (!this.events[type]) {
      this.events[type] = []
    }
    this.events[type].unshift(handler)
  }

  removeListener(type, handler) {
    if (!this.events[type]) {
      return
    }
    this.events[type] = this.events[type].filter((item) => item !== handler)
  }

  off(type, handler) {
    this.removeListener(type, handler)
  }

  emit(type, ...args) {
    this.events[type].forEach((item) => {
      Reflect.apply(item, this, args)
    })
  }

  once(type, handler) {
    this.on(type, this._onceWrap(type, handler, this))
  }

  _onceWrap(type, handler, target) {
    const state = { fired: false, handler, type, target }
    const wrapFn = this._onceWrapper.bind(state)
    state.wrapFn = wrapFn
    return wrapFn
  }

  _onceWrapper(...args) {
    if (!this.fired) {
      this.fired = true
      Reflect.apply(this.handler, this.target, args)
      this.target.off(this.type, this.wrapFn)
    }
  }
}
```

---

## 12. 说说对 Node 中的 Stream 的理解？应用场景？

一、是什么

流（Stream），是一个数据传输手段，是端到端信息交换的一种方式，而且是有顺序的,是逐块读取数据、处理内容，用于顺序读取输入或写入输出

`Node.js`中很多对象都实现了流，总之它是会冒数据（以 `Buffer` 为单位）

它的独特之处在于，它不像传统的程序那样一次将一个文件读入内存，而是逐块读取数据、处理其内容，而不是将其全部保存在内存中

流可以分成三部分：`source`、`dest`、`pipe`

在`source`和`dest`之间有一个连接的管道`pipe`,它的基本语法是`source.pipe(dest)`，`source`和`dest`就是通过pipe连接，让数据从`source`流向了`dest`，如下图所示：

![](<images/8. Node.js（27题）-image-4.png>)

二、种类

在`NodeJS`，几乎所有的地方都使用到了流的概念，分成四个种类：

- 可写流：可写入数据的流。例如 fs.createWriteStream() 可以使用流将数据写入文件

- 可读流： 可读取数据的流。例如fs.createReadStream() 可以从文件读取内容

- 双工流： 既可读又可写的流。例如 net.Socket

- 转换流： 可以在数据写入和读取时修改或转换数据的流。例如，在文件压缩操作中，可以向文件写入压缩数据，并从文件中读取解压数据

在`NodeJS`中`HTTP`服务器模块中，`request` 是可读流，`response` 是可写流。还有`fs` 模块，能同时处理可读和可写文件流

可读流和可写流都是单向的，比较容易理解，而另外两个是双向的

双工流

之前了解过`websocket`通信，是一个全双工通信，发送方和接受方都是各自独立的方法，发送和接收都没有任何关系

如下图所示：

![](<images/8. Node.js（27题）-image-1.png>)

基本代码如下：

```javascript
const { Duplex } = require('stream')

const myDuplex = new Duplex({
  read(size) {
    // ...
  },
  write(chunk, encoding, callback) {
    // ...
  },
})
```

双工流

双工流的演示图如下所示：

![](<images/8. Node.js（27题）-image.png>)

除了上述压缩包的例子，还比如一个 `babel`，把`es6`转换为，我们在左边写入 `es6`，从右边读取 `es5`

基本代码如下所示：

```javascript
const { Transform } = require('stream')

const myTransform = new Transform({
  transform(chunk, encoding, callback) {
    // ...
  },
})
```

三、应用场景

`stream`的应用场景主要就是处理`IO`操作，而`http`请求和文件操作都属于`IO`操作

思想一下，如果一次`IO`操作过大，硬件的开销就过大，而将此次大的`IO`操作进行分段操作，让数据像水管一样流动，直到流动完成

常见的场景有：

- get请求返回文件给客户端

- 文件操作

- 一些打包工具的底层操作

get请求返回文件给客户端

使用`stream`流返回文件，`res`也是一个`stream`对象，通过`pipe`管道将文件数据返回

```javascript
const server = http.createServer(function (req, res) {
  const method = req.method // 获取请求方法
  if (method === 'GET') {
    // get 请求
    const fileName = path.resolve(__dirname, 'data.txt')
    let stream = fs.createReadStream(fileName)
    stream.pipe(res) // 将 res 作为 stream 的 dest
  }
})
server.listen(8000)
```

文件操作

创建一个可读数据流`readStream`，一个可写数据流`writeStream`，通过`pipe`管道把数据流转过去

```javascript
const fs = require('fs')
const path = require('path')

// 两个文件名
const fileName1 = path.resolve(__dirname, 'data.txt')
const fileName2 = path.resolve(__dirname, 'data-bak.txt')
// 读取文件的 stream 对象
const readStream = fs.createReadStream(fileName1)
// 写入文件的 stream 对象
const writeStream = fs.createWriteStream(fileName2)
// 通过 pipe执行拷贝，数据流转
readStream.pipe(writeStream)
// 数据读取完成监听，即拷贝完成
readStream.on('end', function () {
  console.log('拷贝完成')
})
```

一些打包工具的底层操作

目前一些比较火的前端打包构建工具，都是通过`node.js`编写的，打包和构建的过程肯定是文件频繁操作的过程，离不开`stream`，如`gulp`

---

## 13. 说说对 Node 中的 Buffer 的理解？应用场景？

**参考答案：**

一、是什么

在`Node`应用中，需要处理网络协议、操作数据库、处理图片、接收上传文件等，在网络流和文件的操作中，要处理大量二进制数据，而`Buffer`就是在内存中开辟一片区域（初次初始化为8KB），用来存放二进制数据

在上述操作中都会存在数据流动，每个数据流动的过程中，都会有一个最小或最大数据量

如果数据到达的速度比进程消耗的速度快，那么少数早到达的数据会处于等待区等候被处理。反之，如果数据到达的速度比进程消耗的数据慢，那么早先到达的数据需要等待一定量的数据到达之后才能被处理

这里的等待区就指的缓冲区（Buffer），它是计算机中的一个小物理单位，通常位于计算机的 `RAM` 中

简单来讲，`Nodejs`不能控制数据传输的速度和到达时间，只能决定何时发送数据，如果还没到发送时间，则将数据放在`Buffer`中，即在`RAM`中，直至将它们发送完毕

上面讲到了`Buffer`是用来存储二进制数据，其的形式可以理解成一个数组，数组中的每一项，都可以保存8位二进制：`00000000`，也就是一个字节

例如：

```javascript
const buffer = Buffer.from('why')
```

其存储过程如下图所示：

![](<images/8. Node.js（27题）-image-2.png>)

二、使用方法

`Buffer` 类在全局作用域中，无须`require`导入

创建`Buffer`的方法有很多种，我们讲讲下面的两种常见的形式：

- Buffer.from()

- Buffer.alloc()

Buffer.from()

```javascript
const b1 = Buffer.from('10')
const b2 = Buffer.from('10', 'utf8')
const b3 = Buffer.from([10])
const b4 = Buffer.from(b3)

console.log(b1, b2, b3, b4) // <Buffer 31 30> <Buffer 31 30> <Buffer 0a> <Buffer 0a>
```

Buffer.alloc()

```javascript
const bAlloc1 = Buffer.alloc(10) // 创建一个大小为 10 个字节的缓冲区
const bAlloc2 = Buffer.alloc(10, 1) // 建一个长度为 10 的 Buffer,其中全部填充了值为 `1` 的字节
console.log(bAlloc1) // <Buffer 00 00 00 00 00 00 00 00 00 00>
console.log(bAlloc2) // <Buffer 01 01 01 01 01 01 01 01 01 01>
```

在上面创建`buffer`后，则能够`toString`的形式进行交互，默认情况下采取`utf8`字符编码形式，如下

```javascript
const buffer = Buffer.from('你好')
console.log(buffer)
// <Buffer e4 bd a0 e5 a5 bd>
const str = buffer.toString()
console.log(str)
// 你好
```

如果编码与解码不是相同的格式则会出现乱码的情况，如下：

```javascript
const buffer = Buffer.from('你好', 'utf-8 ')
console.log(buffer)
// <Buffer e4 bd a0 e5 a5 bd>
const str = buffer.toString('ascii')
console.log(str)
// d= e%=
```

当设定的范围导致字符串被截断的时候，也会存在乱码情况，如下：

```javascript
const buf = Buffer.from('Node.js 技术栈', 'UTF-8')

console.log(buf) // <Buffer 4e 6f 64 65 2e 6a 73 20 e6 8a 80 e6 9c af e6 a0 88>
console.log(buf.length) // 17

console.log(buf.toString('UTF-8', 0, 9)) // Node.js �
console.log(buf.toString('UTF-8', 0, 11)) // Node.js 技
```

所支持的字符集有如下：

- ascii：仅支持 7 位 ASCII 数据，如果设置去掉高位的话，这种编码是非常快的

- utf8：多字节编码的 Unicode 字符，许多网页和其他文档格式都使用 UTF-8

- utf16le：2 或 4 个字节，小字节序编码的 Unicode 字符，支持代理对（U+10000至 U+10FFFF）

- ucs2，utf16le 的别名

- base64：Base64 编码

- latin：一种把 Buffer 编码成一字节编码的字符串的方式

- binary：latin1 的别名，

- hex：将每个字节编码为两个十六进制字符

三、应用场景

`Buffer`的应用场景常常与流的概念联系在一起，例如有如下：

- I/O操作

- 加密解密

- zlib.js

I/O操作

通过流的形式，将一个文件的内容读取到另外一个文件

```javascript
const fs = require('fs')

const inputStream = fs.createReadStream('input.txt') // 创建可读流
const outputStream = fs.createWriteStream('output.txt') // 创建可写流

inputStream.pipe(outputStream) // 管道读写
```

加解密

在一些加解密算法中会遇到使用 `Buffer`，例如 `crypto.createCipheriv` 的第二个参数 `key` 为 `string` 或 `Buffer` 类型

zlib.js

`zlib.js` 为 `Node.js` 的核心库之一，其利用了缓冲区（`Buffer`）的功能来操作二进制数据流，提供了压缩或解压功能

---

## 14. 说说对 Node 中的 fs模块的理解? 有哪些常用方法

**参考答案：**

一、是什么

fs（filesystem），该模块提供本地文件的读写能力，基本上是`POSIX`文件操作命令的简单包装

可以说，所有与文件的操作都是通过`fs`核心模块实现

导入模块如下：

```javascript
const fs = require('fs')
```

这个模块对所有文件系统操作提供异步（不具有`sync` 后缀）和同步（具有 `sync` 后缀）两种操作方式，而供开发者选择

二、文件知识

在计算机中有关于文件的知识：

- 权限位 mode

- 标识位 flag

- 文件描述为 fd

权限位 mode

![](<images/8. Node.js（27题）-image-16.png>)

针对文件所有者、文件所属组、其他用户进行权限分配，其中类型又分成读、写和执行，具备权限位4、2、1，不具备权限为0

如在`linux`查看文件权限位：

```javascript
drwxr-xr-x 1 PandaShen 197121 0 Jun 28 14:41 core
-rw-r--r-- 1 PandaShen 197121 293 Jun 23 17:44 index.md
```

在开头前十位中，`d`为文件夹，`-`为文件，后九位就代表当前用户、用户所属组和其他用户的权限位，按每三位划分，分别代表读（r）、写（w）和执行（x），- 代表没有当前位对应的权限

标识位

标识位代表着对文件的操作方式，如可读、可写、即可读又可写等等，如下表所示：

![](<images/8. Node.js（27题）-image-17.png>)

文件描述为 fd

操作系统会为每个打开的文件分配一个名为文件描述符的数值标识，文件操作使用这些文件描述符来识别与追踪每个特定的文件

`Window `系统使用了一个不同但概念类似的机制来追踪资源，为方便用户，`NodeJS `抽象了不同操作系统间的差异，为所有打开的文件分配了数值的文件描述符

在 `NodeJS `中，每操作一个文件，文件描述符是递增的，文件描述符一般从 `3` 开始，因为前面有 `0`、`1`、`2`三个比较特殊的描述符，分别代表 `process.stdin`（标准输入）、`process.stdout`（标准输出）和 `process.stderr`（错误输出）

三、方法

下面针对`fs`模块常用的方法进行展开：

- 文件读取

- 文件写入

- 文件追加写入

- 文件拷贝

- 创建目录

文件读取

fs.readFileSync

同步读取，参数如下：

- 第一个参数为读取文件的路径或文件描述符

- 第二个参数为 options，默认值为 null，其中有 encoding（编码，默认为 null）和 flag（标识位，默认为 r），也可直接传入 encoding

结果为返回文件的内容

```javascript
const fs = require('fs')

let buf = fs.readFileSync('1.txt')
let data = fs.readFileSync('1.txt', 'utf8')

console.log(buf) // <Buffer 48 65 6c 6c 6f>
console.log(data) // Hello
```

fs.readFile

异步读取方法 `readFile` 与 `readFileSync` 的前两个参数相同，最后一个参数为回调函数，函数内有两个参数 `err`（错误）和 `data`（数据），该方法没有返回值，回调函数在读取文件成功后执行

```javascript
const fs = require('fs')

fs.readFile('1.txt', 'utf8', (err, data) => {
  if (!err) {
    console.log(data) // Hello
  }
})
```

文件写入

writeFileSync

同步写入，有三个参数：

- 第一个参数为写入文件的路径或文件描述符

- 第二个参数为写入的数据，类型为 String 或 Buffer

- 第三个参数为 options，默认值为 null，其中有 encoding（编码，默认为 utf8）、 flag（标识位，默认为 w）和 mode（权限位，默认为 0o666），也可直接传入 encoding

```javascript
const fs = require('fs')

fs.writeFileSync('2.txt', 'Hello world')
let data = fs.readFileSync('2.txt', 'utf8')

console.log(data) // Hello world
```

writeFile

异步写入，`writeFile` 与 `writeFileSync` 的前三个参数相同，最后一个参数为回调函数，函数内有一个参数 `err`（错误），回调函数在文件写入数据成功后执行

```javascript
const fs = require('fs')

fs.writeFile('2.txt', 'Hello world', (err) => {
  if (!err) {
    fs.readFile('2.txt', 'utf8', (err, data) => {
      console.log(data) // Hello world
    })
  }
})
```

文件追加写入

appendFileSync

参数如下：

- 第一个参数为写入文件的路径或文件描述符

- 第二个参数为写入的数据，类型为 String 或 Buffer

- 第三个参数为 options，默认值为 null，其中有 encoding（编码，默认为 utf8）、 flag（标识位，默认为 a）和 mode（权限位，默认为 0o666），也可直接传入 encoding

```javascript
const fs = require('fs')

fs.appendFileSync('3.txt', ' world')
let data = fs.readFileSync('3.txt', 'utf8')
```

appendFile

异步追加写入方法 `appendFile` 与 `appendFileSync` 的前三个参数相同，最后一个参数为回调函数，函数内有一个参数 `err`（错误），回调函数在文件追加写入数据成功后执行

```javascript
const fs = require('fs')

fs.appendFile('3.txt', ' world', (err) => {
  if (!err) {
    fs.readFile('3.txt', 'utf8', (err, data) => {
      console.log(data) // Hello world
    })
  }
})
```

文件拷贝

copyFileSync

同步拷贝

```javascript
const fs = require('fs')

fs.copyFileSync('3.txt', '4.txt')
let data = fs.readFileSync('4.txt', 'utf8')

console.log(data) // Hello world
```

copyFile

异步拷贝

```javascript
const fs = require('fs')

fs.copyFile('3.txt', '4.txt', () => {
  fs.readFile('4.txt', 'utf8', (err, data) => {
    console.log(data) // Hello world
  })
})
```

创建目录

mkdirSync

同步创建，参数为一个目录的路径，没有返回值，在创建目录的过程中，必须保证传入的路径前面的文件目录都存在，否则会抛出异常

```javascript
// 假设已经有了 a 文件夹和 a 下的 b 文件夹
fs.mkdirSync('a/b/c')
```

mkdir

异步创建，第二个参数为回调函数

```javascript
fs.mkdir('a/b/c', (err) => {
  if (!err) console.log('创建成功')
})
```

---

## 15. 说说对 Node 中的 process 的理解？有哪些常用方法？

**参考答案：**

一、是什么

`process` 对象是一个全局变量，提供了有关当前 `Node.js `进程的信息并对其进行控制，作为一个全局变量

我们都知道，进程计算机系统进行资源分配和调度的基本单位，是操作系统结构的基础，是线程的容器

当我们启动一个`js`文件，实际就是开启了一个服务进程，每个进程都拥有自己的独立空间地址、数据栈，像另一个进程无法访问当前进程的变量、数据结构，只有数据通信后，进程之间才可以数据共享

由于`JavaScript`是一个单线程语言，所以通过`node xxx`启动一个文件后，只有一条主线程

二、属性与方法

关于`process`常见的属性有如下：

- process.env：环境变量，例如通过 \`process.env.NODE_ENV 获取不同环境项目配置信息

- process.nextTick：这个在谈及 `EventLoop` 时经常为会提到

- process.pid：获取当前进程id

- process.ppid：当前进程对应的父进程

- process.cwd()：获取当前进程工作目录，

- process.platform：获取当前进程运行的操作系统平台

- process.uptime()：当前进程已运行时间，例如：pm2 守护进程的 uptime 值

- 进程事件： process.on(‘uncaughtException’,cb) 捕获异常信息、 process.on(‘exit’,cb）进程推出监听

- 三个标准流： process.stdout 标准输出、 process.stdin 标准输入、 process.stderr 标准错误输出

- process.title 指定进程名称，有的时候需要给进程指定一个名称

下面再稍微介绍下某些方法的使用：

process.cwd()

返回当前 `Node `进程执行的目录

一个` Node` 模块 `A` 通过 NPM 发布，项目 `B` 中使用了模块 `A`。在 `A` 中需要操作 `B` 项目下的文件时，就可以用 `process.cwd()` 来获取 `B` 项目的路径

process.argv

在终端通过 Node 执行命令的时候，通过 `process.argv` 可以获取传入的命令行参数，返回值是一个数组：

- 0: Node 路径（一般用不到，直接忽略）

- 1: 被执行的 JS 文件路径（一般用不到，直接忽略）

- 2\~n: 真实传入命令的参数

所以，我们只要从 `process.argv[2]` 开始获取就好了

```javascript
const args = process.argv.slice(2)
```

process.env

返回一个对象，存储当前环境相关的所有信息，一般很少直接用到。

一般我们会在 `process.env` 上挂载一些变量标识当前的环境。比如最常见的用 `process.env.NODE_ENV` 区分 `development` 和 `production`

在 `vue-cli` 的源码中也经常会看到 `process.env.VUE_CLI_DEBUG` 标识当前是不是 `DEBUG` 模式

process.nextTick()

我们知道`NodeJs`是基于事件轮询，在这个过程中，同一时间只会处理一件事情

在这种处理模式下，`process.nextTick()`就是定义出一个动作，并且让这个动作在下一个事件轮询的时间点上执行

例如下面例子将一个`foo`函数在下一个时间点调用

```javascript
function foo() {
  console.error('foo')
}

process.nextTick(foo)
console.error('bar')
```

输出结果为`bar`、`foo`

虽然下述方式也能实现同样效果：

```javascript
setTimeout(foo, 0)
console.log('bar')
```

两者区别在于：

- process.nextTick()会在这一次event loop的call stack清空后（下一次event loop开始前）再调用callback

- setTimeout()是并不知道什么时候call stack清空的，所以何时调用callback函数是不确定的

---

## 16. Node. js 有哪些全局对象？

**参考答案：**

一、是什么

在浏览器 `JavaScript` 中，通常` window` 是全局对象， 而 `Nodejs `中的全局对象是 `global`

在`NodeJS`里，是不可能在最外层定义一个变量，因为所有的用户代码都是当前模块的，只在当前模块里可用，但可以通过`exports`对象的使用将其传递给模块外部

所以，在`NodeJS`中，用`var`声明的变量并不属于全局的变量，只在当前模块生效

像上述的`global`全局对象则在全局作用域中，任何全局变量、函数、对象都是该对象的一个属性值

二、有哪些

将全局对象分成两类：

- 真正的全局对象

- 模块级别的全局变量

真正的全局对象

下面给出一些常见的全局对象：

- Class:Buffer

- process

- console

- clearInterval、setInterval

- clearTimeout、setTimeout

- global

Class:Buffer

可以处理二进制以及非`Unicode`编码的数据

在`Buffer`类实例化中存储了原始数据。`Buffer`类似于一个整数数组，在V8堆原始存储空间给它分配了内存

一旦创建了`Buffer`实例，则无法改变大小

process

进程对象，提供有关当前过程的信息和控制

包括在执行`node`程序的过程中，如果需要传递参数，我们想要获取这个参数需要在`process`内置对象中

启动进程：

```javascript
 node index.js 参数1 参数2 参数3
```

index.js文件如下：

```javascript
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`)
})
```

输出如下：

```javascript
/usr/local/bin/node
/Users/mjr/work/node/process-args.js
参数1
参数2
参数3
```

除此之外，还包括一些其他信息如版本、操作系统等

![](<images/8. Node.js（27题）-image-18.png>)

console

用来打印`stdout`和`stderr`

最常用的输入内容的方式：console.log

```javascript
console.log('hello')
```

清空控制台：console.clear

```javascript
console.clear
```

打印函数的调用栈：console.trace

```javascript
function test() {
  demo()
}

function demo() {
  foo()
}

function foo() {
  console.trace()
}

test()
```

![](<images/8. Node.js（27题）-image-14.png>)

clearInterval、setInterval

设置定时器与清除定时器

```javascript
setInterval(callback, delay[, ...args])
```

`callback`每`delay`毫秒重复执行一次

`clearInterval`则为对应发取消定时器的方法

clearTimeout、setTimeout

设置延时器与清除延时器

```javascript
setTimeout(callback,delay[,...args])
```

`callback`在`delay`毫秒后执行一次

`clearTimeout`则为对应取消延时器的方法

global

全局命名空间对象，前面讲到的`process`、`console`、`setTimeout`等都有放到`global`中

```javascript
console.log(process === global.process) // true
```

模块级别的全局对象

这些全局对象是模块中的变量，只是每个模块都有，看起来就像全局变量，像在命令交互中是不可以使用，包括：

- \_\_dirname

- \_\_filename

- exports

- module

- require

\_\_dirname

获取当前文件所在的路径，不包括后面的文件名

从 `/Users/mjr` 运行 `node example.js`：

```javascript
console.log(__dirname) // 打印: /Users/mjr
```

\_\_filename

获取当前文件所在的路径和文件名称，包括后面的文件名称

从 `/Users/mjr` 运行 `node example.js`：

```javascript
console.log(__filename) // 打印: /Users/mjr/example.js
```

exports

`module.exports` 用于指定一个模块所导出的内容，即可以通过 `require()` 访问的内容

```javascript
exports.name = name
exports.age = age
exports.sayHello = sayHello
```

module

对当前模块的引用，通过`module.exports` 用于指定一个模块所导出的内容，即可以通过 `require()` 访问的内容

require

用于引入模块、 `JSON`、或本地文件。 可以从 `node_modules` 引入模块。

可以使用相对路径引入本地模块或`JSON`文件，路径会根据`__dirname`定义的目录名或当前工作目录进行处理

---

## 17. 说说你对Node.js 的理解？优缺点？应用场景？

**参考答案：**

一、是什么

`Node.js` 是一个开源与跨平台的 `JavaScript` 运行时环境

在浏览器外运行 V8 JavaScript 引擎（Google Chrome 的内核），利用事件驱动、非阻塞和异步输入输出模型等技术提高性能

可以理解为 `Node.js` 就是一个服务器端的、非阻塞式I/O的、事件驱动的`JavaScript`运行环境

非阻塞异步

`Nodejs`采用了非阻塞型`I/O`机制，在做`I/O`操作的时候不会造成任何的阻塞，当完成之后，以时间的形式通知执行操作

例如在执行了访问数据库的代码之后，将立即转而执行其后面的代码，把数据库返回结果的处理代码放在回调函数中，从而提高了程序的执行效率

事件驱动

事件驱动就是当进来一个新的请求的时，请求将会被压入一个事件队列中，然后通过一个循环来检测队列中的事件状态变化，如果检测到有状态变化的事件，那么就执行该事件对应的处理代码，一般都是回调函数

比如读取一个文件，文件读取完毕后，就会触发对应的状态，然后通过对应的回调函数来进行处理

![](<images/8. Node.js（27题）-image-15.png>)

二、优缺点

优点：

- 处理高并发场景性能更佳

- 适合I/O密集型应用，指的是应用在运行极限时，CPU占用率仍然比较低，大部分时间是在做 I/O硬盘内存读写操作

因为`Nodejs`是单线程，带来的缺点有：

- 不适合CPU密集型应用

- 只支持单核CPU，不能充分利用CPU

- 可靠性低，一旦代码某个环节崩溃，整个系统都崩溃

三、应用场景

借助`Nodejs`的特点和弊端，其应用场景分类如下：

- 善于`I/O`，不善于计算。因为Nodejs是一个单线程，如果计算（同步）太多，则会阻塞这个线程

- 大量并发的I/O，应用程序内部并不需要进行非常复杂的处理

- 与 websocket 配合，开发长连接的实时交互应用程序

具体场景可以表现为如下：

- 第一大类：用户表单收集系统、后台管理系统、实时交互系统、考试系统、联网软件、高并发量的web应用程序

- 第二大类：基于web、canvas等多人联网游戏

- 第三大类：基于web的多人实时聊天客户端、聊天室、图文直播

- 第四大类：单页面浏览器应用程序

- 第五大类：操作数据库、为前端和移动端提供基于`json`的API

其实，`Nodejs`能实现几乎一切的应用，只考虑适不适合使用它

---

## 18. body-parser 这个中间件是做什么用的？

**参考答案：**

`body-parser` 是一个 Node.js 中间件，用于解析 HTTP 请求中的请求体（RequestBody），并将其转换为 JSON 格式或其他格式的数据对象。它可以帮助开发者方便地从 POST、PUT、DELETE 等请求中获取请求体数据，并进行相应的处理。

具体来说，`body-parser` 支持以下几种请求体数据格式：

1. JSON 格式：通过 `json()` 方法解析 JSON 格式的请求体数据，并将其转换为 JavaScript 对象。

2. URL 编码格式：通过 `urlencoded()` 方法解析 URL 编码格式的请求体数据，并将其转换为 JavaScript 对象。

3. 多部分数据格式：通过 `multipart()` 方法解析多部分数据格式的请求体数据，并将其转换为 JavaScript 对象。

下面是一个简单的使用 `body-parser` 解析请求体数据的示例代码：

```javascript
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// 解析 URL 编码格式的请求体数据
app.use(bodyParser.urlencoded({ extended: false }))

// 解析 JSON 格式的请求体数据
app.use(bodyParser.json())

// 处理 POST 请求
app.post('/api/login', (req, res) => {
  const { username, password } = req.body
  console.log(`username: ${username}`)
  console.log(`password: ${password}`)
  res.send('Login Success!')
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
```

上面使用 `body-parser` 中间件分别解析了 URL 编码格式和 JSON 格式的请求体数据，并通过 `req.body` 获取请求体数据对象。在 POST 请求的处理函数中，打印了用户输入的用户名和密码，并返回了一个登录成功的响应消息。

在使用 `body-parser` 中间件时，需要根据实际情况选择合适的解析方法，并注意配置参数，以防止出现安全漏洞和错误数据。同时，在处理 HTTP 请求时，需要对请求体数据进行有效性验证和安全性检查，以保证数据的可靠性和完整性。

---

## 19. Koa 中，如果一个中间件没有调用 await next()，后续的中间件还会执行吗？

**参考答案：**

如果一个中间件没有调用 `await next()`，那么后续的中间件将不会执行。

这是因为当一个中间件函数执行完成并且没有调用 `await next()` 时，它不会将控制权交给下一个中间件，而是直接返回或抛出异常。

在 `Koa` 中，中间件函数通常会使用 `await next()` 语句来调用下一个中间件函数，并等待下一个中间件执行完毕并返回结果后再执行自己的逻辑。如果一个中间件没有调用 `await next()`，那么下一个中间件就不会被执行，当前中间件也不能得到后续中间件的处理结果，从而可能导致请求无法得到正确的响应或者程序出现错误。

因此，在编写中间件函数时，需要确保在遇到需要交给下一个中间件处理的情况下，要及时调用 `await next()` 来将控制权转交给下一个中间件，以保证整个请求处理流程的正常进行。

例如，一个检测用户权限的 middleware 可以决定是否继续处理请求，还是直接返回403错误：

```javascript
app.use(async (ctx, next) => {
  if (await checkUserPermission(ctx)) {
    await next()
  } else {
    ctx.response.status = 403
  }
})
```

---

## 20. 在没有async await 的时候，koa是怎么实现的洋葱模型?

**参考答案：**

洋葱模型是一种中间件设计模式，它通过将请求传递给一系列中间件来处理HTTP请求，并在响应返回时再按照相反的顺序执行它们以处理响应。

在没有 `async/await` 的情况下，Koa 可以使用 ES6 中引入的生成器函数（generator functions）来实现洋葱模型。

具体地说，每个中间件都是一个生成器函数，它接收两个参数：ctx和next。ctx是请求上下文对象，包含有关当前请求的所有信息，例如请求头、请求主体等。next是一个指向下一个中间件的函数，当调用next时，它将控制权传递给下一个中间件。

下面是一个简单的 Koa 中间件示例代码：

```javascript
const Koa = require('koa')
const app = new Koa()

app.use(function* (next) {
  console.log('1. Enter middleware 1')
  yield next
  console.log('5. Exit middleware 1')
})

app.use(function* (next) {
  console.log('2. Enter middleware 2')
  yield next
  console.log('4. Exit middleware 2')
})

app.use(function* (next) {
  console.log('3. Enter middleware 3')
  this.body = 'Hello, world!'
})

app.listen(3000)
console.log('Server running on http://localhost:3000')
```

在上述代码中，使用 `function*()` 定义了三个 Generator 函数分别作为三个中间件，通过 `yield next` 实现了中间件之间的顺序调用。运行该程序后，输出结果如下：

![](<images/8. Node.js（27题）-1719978989903.png>)

从输出结果可以看出，Koa 依次执行了三个中间件函数，并按照洋葱模型的顺序依次进入和退出了各个中间件函数。这种方式虽然不如 async/await 方便可读，但仍然可以简洁有效地实现洋葱模型。

需要注意的是，在上述代码中使用的 `yield next` 语句依赖于 `co` 库的支持，因此需要在程序中安装并引入 `co` 库。同时，需要注意遵循 Generator 函数相关规范和编写良好的中间件函数，以保证程序正确和稳定运行。

---

## 21. koa 框架中，该怎么处理中间件的异常？

**参考答案：**

Koa 中间件的异常处理是通过 `try...catch` 语句和错误处理中间件实现的。当某个中间件函数抛出了异常时，Koa 会自动将控制权交给下一个错误处理中间件，如果没有错误处理中间件，则返回默认的 500 错误响应。

下面是一个简单的 Koa 错误处理中间件示例代码：

```javascript
const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = {
      message: err.message,
      error: err.stack,
    }
  }
})

app.use(async (ctx, next) => {
  if (Math.random() < 0.5) {
    throw new Error('Oops! Something went wrong.')
  } else {
    ctx.body = {
      message: 'Hello, world!',
    }
  }
})

app.listen(3000)
console.log('Server running on http://localhost:3000')
```

在上述代码中，通过 `try...catch` 捕获了第二个中间件函数中可能抛出的异常，并使用第一个中间件作为错误处理中间件进行处理。当出现异常时，第一个中间件会将错误状态码和错误信息添加到上下文对象的响应头中，并返回一个错误对象。如果没有出现异常，则执行下一个中间件函数并返回正常的响应结果。

在编写 Koa 中间件时，需要遵循良好的异常处理方式，不要在中间件函数中直接抛出异常，而应该将异常对象包装成 `Error` 对象并返回。并且，在继承洋葱模型时，需要注意错误处理中间件的顺序和位置，以保证程序的稳定运行。

---

## 22. Node.js 如何调试？

**参考答案：**

Node.js 提供了多种调试方式，以下是常用的几种：

1. 使用 `console.log()` 输出调试信息：在代码中使用 `console.log()` 输出一些变量和状态信息，以便在运行时跟踪代码执行流程。这种方式简单易用，但需要手动添加和删除调试代码，不适合调试复杂程序和性能瓶颈。

2. 使用 Node.js 自带的调试器：Node.js 自带了一个内置的调试器，可以通过命令行参数 `--inspect` 或者 `--inspect-brk` 来启动。然后在 Chrome 浏览器中打开 `chrome://inspect` 页面，即可连接到 Node.js 调试器，并可以进行断点调试、查看变量和堆栈信息等操作。这种方式需要安装相应的 IDE 或者编辑器插件，并且需要一定的配置和调试经验。

3. 使用第三方调试工具：除了 Node.js 自带的调试器外，还有一些第三方调试工具，例如 node-inspector、ndb、WebStorm、VS Code 等，它们提供了更加强大和友好的调试功能，例如调试控制台、堆栈跟踪、性能分析等。

---

## 23. 说说你对 koa 洋葱模型的理解

**参考答案：**

Koa 框架是一个 Node.js 的 Web 应用程序框架，它通过中间件（`Middleware`）机制实现了业务逻辑的分层和复用。Koa 中使用的中间件机制被称为洋葱模型（`Onion Model`），其核心思想是将 HTTP 请求和响应对象依次传递给各个中间件函数，形成一条类似于洋葱的管道，最终返回响应结果。

具体来说，Koa 洋葱模型的处理流程可以大致分为四个阶段：

1. 请求阶段：从外到内依次执行请求相关的中间件，例如解析请求体、设置响应头等操作。

2. 业务阶段：执行业务逻辑相关的中间件，例如处理授权、验证身份、路由分发等操作。

3. 响应阶段：从内到外依次执行响应相关的中间件，例如格式化响应数据、设置响应头等操作。

4. 错误处理阶段：如果在前面的中间件过程中出现了错误，则会跳过后续中间件并交给错误处理中间件来处理异常情况。

在这个过程中，每个中间件都可以根据需要对请求和响应对象进行修改、扩展、封装等操作，并将控制权传递给下一个中间件，形成了一条流水线式的处理模式。这种设计可以大大提高代码的复用和可读性，同时也方便了对程序行为进行监控、调试和优化。

总之，Koa 洋葱模型是一种基于中间件机制的 Web 应用程序开发方法，它通过将请求和响应对象依次传递给各个中间件函数，实现了业务逻辑的分层和复用，并且具有灵活、可扩展和高效的特点。

---

## 24. pm2守护进程的原理是什么?

**参考答案：**

PM2 是一个用于管理 Node.js 进程的工具，它可以在后台启动、守护和监控多个 Node.js 应用程序。PM2 的守护进程原理主要包括以下几个方面：

1. 启动应用：当用户使用 PM2 启动应用时，PM2 会创建一个子进程，并将应用程序作为子进程来启动。同时，PM2 会记录该应用程序的相关信息，如 PID（进程 ID）、状态、日志等，并且会将这些信息保存到 PM2 的数据库中。

2. 监控应用：一旦应用程序被启动，PM2 就会监控它的运行情况。如果应用程序意外退出或发生异常，PM2 将会自动重启应用程序。同时，PM2 会定期检查应用程序的资源占用情况，并且可以根据需要调整进程数、CPU 使用率等参数。

3. 守护进程：为了确保 PM2 能够长时间稳定运行，PM2 本身也需要一个守护进程来监控其运行情况。该守护进程会定期检查 PM2 的健康状态，并且在 PM2 出现异常情况时进行相应的处理，例如重启进程、发送警告通知等。

4. 日志管理：PM2 还提供了丰富的日志管理功能，可以将应用程序的日志导出到文件或远程服务器，并且支持实时查看、过滤等操作。这些日志信息对于排查问题、分析业务数据等都非常有用。

综上所述，PM2 的守护进程原理主要是将应用程序作为子进程启动，并在后台监控其运行情况。同时，PM2 本身也会被一个守护进程来监控和管理，以确保整个系统的稳定性和可靠性。

---

## 25. koa和express有哪些不同？

**参考答案：**

框架介绍

express框架是一个基于 Node.js 平台的极简、灵活的 web 应用开发框架，主要基于 Connect 中间件，并且自身封装了路由、视图处理等功能。

koa是 Express 原班人马基于 ES6 新特性重新开发的框架，主要基于 co 中间件，框架自身不包含任何中间件，很多功能需要借助第三方中间件解决，但是由于其基于 ES6 generator 特性的异步流程控制，解决了 "callback hell" 和麻烦的错误处理问题。

相同点

两个框架都对http进行了封装。相关的api都差不多，同一批人所写。

不同点

express内置了许多中间件可供使用，而koa没有。

express包含路由，视图渲染等特性，而koa只有http模块。

express的中间件模型为线型，而koa的中间件模型为U型，也可称为洋葱模型构造中间件。

express通过回调实现异步函数，在多个回调、多个中间件中写起来容易逻辑混乱。

```javascript
// express写法
app.get('/test', function (req, res) {
  fs.readFile('/file1', function (err, data) {
    if (err) {
      res.status(500).send('read file1 error')
    }
    fs.readFile('/file2', function (err, data) {
      if (err) {
        res.status(500).send('read file2 error')
      }
      res.type('text/plain')
      res.send(data)
    })
  })
})
```

koa通过generator 和 async/await 使用同步的写法来处理异步，明显好于 callback 和 promise。

```javascript
app.use(async (ctx, next) => {
  await next()
  var data = await doReadFile()
  ctx.response.type = 'text/plain'
  ctx.response.body = data
})
```

总结

**Express**

优点：线性逻辑，通过中间件形式把业务逻辑细分、简化，一个请求进来经过一系列中间件处理后再响应给用户，清晰明了。

缺点：基于 callback 组合业务逻辑，业务逻辑复杂时嵌套过多，异常捕获困难。

**Koa**

优点：首先，借助 co 和 generator，很好地解决了异步流程控制和异常捕获问题。其次，Koa 把 Express 中内置的 router、view 等功能都移除了，使得框架本身更轻量。

缺点：社区相对较小。

---

## 26. 两个 Node.js 进程如何通信？

**参考答案：**

两个 Node.js 进程之间如何进行通信呢？这里要分两种场景：

1. 不同电脑上的两个 Node.js 进程间通信

2. 同一台电脑上两个 Node.js 进程间通信

对于第一种场景，通常使用 TCP 或 HTTP 进行通信，而对于第二种场景，又分为两种子场景：

1. Node.js 进程和自己创建的 Node.js 子进程通信

2. Node.js 进程和另外不相关的 Node.js 进程通信

前者可以使用内置的 IPC 通信通道，后者可以使用自定义管道，接下来进行详细介绍：

不同电脑上的两个 Node.js 进程间通信

要想进行通信，首先得搞清楚如何标识网络中的进程？网络层的 ip 地址可以唯一标识网络中的主机，而传输层的协议和端口可以唯一标识主机中的应用程序（进程），这样利用三元组（ip 地址，协议，端口）就可以标识网络的进程了。

使用 TCP 套接字

TCP 套接字（socket）是一种基于 TCP/IP 协议的通信方式，可以让通过网络连接的计算机上的进程进行通信。一个作为 server 另一个作为 client，server.js 代码如下：

```javascript
const net = require('net')
const server = net.createServer((socket) => {
  console.log('socket connected')
  socket.on('close', () => console.log('socket disconnected'))
  socket.on('error', (err) => console.error(err.message))
  socket.on('data', (data) => {
    console.log(`receive: ${data}`)
    socket.write(data)
    console.log(`send: ${data}`)
  })
})
server.listen(8888)
```

client.js 代码：

```javascript
const net = require('net')
const client = net.connect(8888, '192.168.10.105')

client.on('connect', () => console.log('connected.'))
client.on('data', (data) => console.log(`receive: ${data}`))
client.on('end', () => console.log('disconnected.'))
client.on('error', (err) => console.error(err.message))

setInterval(() => {
  const msg = 'hello'
  console.log(`send: ${msg}`)
  client.write(msg)
}, 3000)
```

运行效果：

```javascript
$ node server.js
client connected
receive: hello
send: hello

$ node client.js
connect to server
send: hello
receive: hello
```

使用 HTTP 协议

因为 HTTP 协议也是基于 TCP 的，所以从通信角度看，这种方式本质上并无区别，只是封装了上层协议。server.js 代码为：

```javascript
const http = require('http')
http.createServer((req, res) => res.end(req.url)).listen(8888)
```

client.js 代码：

```javascript
const http = require('http')
const options = {
  hostname: '192.168.10.105',
  port: 8888,
  path: '/hello',
  method: 'GET',
}
const req = http.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`)
  res.on('data', (d) => process.stdout.write(d))
})
req.on('error', (error) => console.error(error))
req.end()
```

运行效果：

```javascript
$ node server.js
url /hello

$ node client.js
statusCode: 200
hello
```

同一台电脑上两个 Node.js 进程间通信

虽然网络 socket 也可用于同一台主机的进程间通讯（通过 loopback 地址 127.0.0.1），但是这种方式需要经过网络协议栈、需要打包拆包、计算校验和、维护序号和应答等，就是为网络通讯设计的，而同一台电脑上的两个进程可以有更高效的通信方式，即 IPC（Inter-Process Communication），在 unix 上具体的实现方式为 unix domain socket，这是服务器端和客户端之间通过本地打开的套接字文件进行通信的一种方法，与 TCP 通信不同，通信时指定本地文件，因此不进行域解析和外部通信，所以比 TCP 快，在同一台主机的传输速度是 TCP 的两倍。

使用内置 IPC 通道

如果是跟自己创建的子进程通信，是非常方便的，child_process模块中的 fork 方法自带通信机制，无需关注底层细节，例如父进程 parent.js 代码：

```javascript
const fork = require('child_process').fork
const path = require('path')
const child = fork(path.resolve('child.js'), [], { stdio: 'inherit' })
child.on('message', (message) => {
  console.log('message from child:', message)
  child.send('hi')
})
```

子进程 child.js 代码：

```javascript
process.on('message', (message) => {
  console.log('message from parent:', message)
})

if (process.send) {
  setInterval(() => process.send('hello'), 3000)
}
```

运行效果如下：

```javascript
$ node parent.js
message from child: hello
message from parent: hi
message from child: hello
message from parent: hi
```

使用自定义管道

如果是两个独立的 Node.js 进程，如何建立通信通道呢？在 Windows 上可以使用命名管道（Named PIPE），在 unix 上可以使用 unix domain socket，也是一个作为 server，另外一个作为 client，其中 server.js 代码如下：

```javascript
const net = require('net')
const fs = require('fs')

const pipeFile = process.platform === 'win32' ? '\\\\.\\pipe\\mypip' : '/tmp/unix.sock'

const server = net.createServer((connection) => {
  console.log('socket connected.')
  connection.on('close', () => console.log('disconnected.'))
  connection.on('data', (data) => {
    console.log(`receive: ${data}`)
    connection.write(data)
    console.log(`send: ${data}`)
  })
  connection.on('error', (err) => console.error(err.message))
})

try {
  fs.unlinkSync(pipeFile)
} catch (error) {}

server.listen(pipeFile)
```

client.js 代码如下：

```javascript
const net = require('net')

const pipeFile = process.platform === 'win32' ? '\\\\.\\pipe\\mypip' : '/tmp/unix.sock'

const client = net.connect(pipeFile)
client.on('connect', () => console.log('connected.'))
client.on('data', (data) => console.log(`receive: ${data}`))
client.on('end', () => console.log('disconnected.'))
client.on('error', (err) => console.error(err.message))

setInterval(() => {
  const msg = 'hello'
  console.log(`send: ${msg}`)
  client.write(msg)
}, 3000)
```

运行效果：

```javascript
$ node server.js
socket connected.
receive: hello
send: hello

$ node client.js
connected.
send: hello
receive: hello
```

---

## 27. npm 是什么？

**参考答案：**

npm是Node.js的包管理工具，它的诞生也极大的促进了前端的发展，在现代前端开发中都离不开npm的身影。

常见的使用场景有以下几种：

- 允许用户从NPM服务器下载别人编写的第三方包到本地使用。

- 允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。

- 允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。
