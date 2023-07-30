# vue-router 中的两种路由模式的区别

在 vue-router 中我们会去配置路由模式：

- hash(哈希)
- history(历史)

那么这两种模式有什么区别和优缺点呢，我们一起来探讨一下。

## hash 模式

### 简述

监听路由的变化：`onhashchange`事件,只有#后面的地址发生变化，可以在 window 对象上监听这个事件:

```js
window.onhashchange = function (event) {
  console.log(event.oldURL, event.newURL)
  let hash = loaction.hash //通过location对象来获取hash地址
  console.log(hash) // "#/notebooks/260827/list"  从#号开始
}
```

因为 hash 发生变化的 url 都会被浏览器记录下来，从而你会发现浏览器的前进后退都可以用。这样一来，尽管浏览器没有请求服务器，但是页面状态和 url 一一关联起来。

### 优点

- 后面 `hash` 值的变化，并**不会导致浏览器向服务器发出请求**，浏览器不发出请求，也就不会刷新页面。
- 不需要配置即可使用

### 缺点

- 在地址栏中会有一个#号，影响美观。

## history 模式

### 简述

随着`history api`的到来，前端路由开始进化了,前面的`hashchange`，你只能改变#后面的 url 片段，而`history api`则给了前端完全的自由。`history api`可以分为两大部分，切换和修改。

#### 切换历史状态

包括`back`,`forward`,`go`三个方法，对应浏览器的前进，后退，跳转操作。

在谷歌浏览器前进后退上长按鼠标，会出来所有当前窗口的历史记录，从而可以跳转(也许叫跳更合适)。

```go
history.go(-2);//后退两次
history.go(2);//前进两次
history.back(); //后退
hsitory.forward(); //前进
```

#### 修改历史状态

因为 HTML5 标准发布，多了两个 API，`pushState()` 和 `replaceState()。`通过这两个 API

（1）可以改变 url 地址且不会发送请求

（2）不仅可以读取历史记录栈，还可以对**浏览器历史记录栈进行修改**

这两个方法接收三个参数:`stateObj`,`title`,`url`：

```js
window.history.pushState(stateObject, title, URL)
window.history.replaceState(stateObject, title, URL)
```

除此之外，还有`popState()`.当浏览器跳转到新的状态时，将触发`popState`事件

### 优点

- 地址栏中的 url 比 hash 模式的要优雅

### 缺点

- 需要与后端进行相应的配置才能使用

## 区别

- `hash`模式下，你只能改变#后面的 url 片段。而`pushState`设置的新 URL 可以是与当前 URL 同源的任意 URL

- `history`模式则会将 URL 修改得就和正常请求后端的 URL 一样,如后端没有配置对应`/user/id`的路由处理，则会返回**404**错误

  当用户**刷新**页面之类的操作时，**浏览器会给服务器发送请求**，所以这个实现需要服务器的支持，需要把所有路由都重定向到根页面。如果服务器中没有相应的响应或者资源，会分分钟刷出一个**404**来。

希望本文所述对大家有所帮助。
