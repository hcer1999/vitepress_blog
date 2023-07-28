# HTTP 篇
<!-- 目录
[[toc]] -->
## 一. HTTP 状态码知道哪些？分别什么意思？

**1XX：信息状态码**

- `100 Continue` 继续，一般在发送 post 请求时，已发送了 http header 之后服务端将返回此信息吗，表示确认，之后再发送具体参数信息

**2XX：成功状态码**

- `200 OK` 正常返回信息
- `201 Created` 请求成功并且服务器创建了新的资源
- `202 Accepted` 服务器已接受请求，但尚未处理

**3XX：重定向**

- `301 Moved Permanently` 请求的网页已永久移动到新位置
- `302 Found` 临时重定向
- `303 See Other` 临时重定向，且总是使用 GET 请求新的 URL
- `304 Not Modified` 自从上次请求后，请求的网页未修改过

**4XX：客户端错误**

- `400 Bad Request` 服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求
- `401 Unauthorized` 请求未授权
- `403 Forbidden` 禁止访问
- `404 Not Found` 找不到任何与 URL 相匹配的资源

**5XX：服务器错误**

- `500 Internal Server Error` 最常见的服务器端错误
- `503 Service Unavailable` 服务器端暂时无法处理请求（可能是过载或维护）

## 二. HTTP 的几种请求方法用途

**GET 方法**

- 发送一个请求来取得服务器上的某一资源

**POST 方法**

- 向 `URL` 指定的资源提交数据或附加新的数据

**PUT 方法**

- 根 `POST` 方法很像，也是向服务器提交数据。但是他们的不同之处在于 `PUT` 指定了资源在服务器上的位置，而 `POST` 没有

**HEAD 方法**

- 只请求页面的首部

**DELETE 方法**

- 删除服务器上的某资源

**OPTIONS 方法**

- 它用于获取当前 `URL` 所支持的方法。如果请求成功，会有一个 `Allow` 的头包含类似`“GET,POST”`这样的信息

**TRACE 方法**

- `TRACE` 方法被用于激发一个远程的，应用层的请求消息回路

**CONNECT 方法**

- 把请求的连接转换到透明的 `TCP/IP` 通道

## 三. HTTP 缓存有哪几种

> 当客户端向服务器请求资源时，会先抵达浏览器缓存，如果浏览器有“要请求资源”的副本，就可以直接从浏览器缓存中提取而不是从原始服务器中提取这个资源。常见的 `http` 缓存只能缓存 `get` 请求响应的资源。

详情请看这篇文章：[缓存机制一二三](https://zhuanlan.zhihu.com/p/29750583)

## 四. GET 和 POST 的区别

- `GET`：一般用于信息获取，使用 `URL` 传递参数，传输过程是透明的，对所发送信息的数量也有限制，一般在 2000 个字符，有的浏览器是 8000 个字符

- `POST`：一般用于修改服务器上的资源，传输过程是加密的，传输的数据的长度现在 `GET` 要长

在以下情况中，请使用 `POST` 请求：

1. 无法使用缓存文件（更新服务器上的文件或数据库）
2. 向服务器发送大量数据（`POST` 没有数据量限制）
3. 发送包含未知字符的用户输入时，`POST` 比 `GET` 更稳定也更可靠

## 五. Cookie 与 LocalStorage 与 SessionStorage 与 Session

- **Cookie**

  - 特性

    - `Cookie` 非常小，它的大小限制为 `4KB` 左右
    - 主要用途是保存登录信息
    - 一般由服务器生成，可设置失效时间。如果在浏览器端生成 `Cookie`，默认是关闭浏览器后失效
    - 每次都会携带在 `HTTP` 头中，如果使用 `cookie` 保存过多数据会带来性能问题
    - 原生 `API` 不如 `storage` 友好，需要自己封装函数

  - API

    ```js
    document.cookie
    ```

- **localStorage 和 sessionStorage**

  - 共同点:

    - 存储大小均为 `5M` 左右
    - 都有同源策略限制
    - 仅在客户端中保存，不参与和服务器的通信

  - 不同点

    - **数据的存储时间**
      - `localStorage`: 存储的数据是永久性的，除非用户人为删除否则会一直存在。
      - `sessionStorage`: 与存储数据的脚本所在的标签页的有效期是相同的。一旦窗口或者标签页被关闭，那么所有通过 `sessionStorage` 存储的数据也会被删除。
    - **作用域**
      - `localStorage`: 在同一个浏览器内，同源文档之间共享 `localStorage` 数据，可以互相读取、覆盖。
      - `sessionStorage`: 与 `localStorage` 一样需要同一浏览器同源文档这一条件。不仅如此，`sessionStorage` 的作用域还被限定在了窗口中，也就是说，只有同一浏览器、同一窗口的同源文档才能共享数据。

  - **API**

    ```js
    //sessionStorage用法相同
    localStorage.setItem('name', 1) // 以"x"为名字存储一个数值
    localStorage.getItem('name') // 获取数值
    localStorage.key(i) // 获取第i对的名字
    localStorage.removeItem('name') // 获取该对的值
    localStorage.clear() // 全部删除
    ```
