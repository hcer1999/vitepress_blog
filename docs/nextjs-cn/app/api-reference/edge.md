---
title: Edge 运行时
description: Edge 运行时的 API 参考。
---

Next.js 提供了两种服务器运行时环境，你可以在应用程序中使用：

- **Node.js 运行时**（默认），可以访问所有 Node.js API，用于渲染你的应用程序。
- **Edge 运行时**，包含更有限的 [API 集合](#参考)，用于 [Middleware](/nextjs-cn/app/api-reference/file-conventions/middleware)。

## 注意事项/nextjs-cn/

- Edge 运行时不支持所有 Node.js API。某些包可能无法按预期工作。
- Edge 运行时不支持增量静态再生成 (ISR)。
- 根据你的部署适配器，两种运行时都可以支持[流式传输](/nextjs-cn/app/building-your-application/routing/loading-ui-and-streaming)。

## 参考/nextjs-cn/

Edge 运行时支持以下 API：

### 网络 API

| API                                                                             | 描述                 |
| ------------------------------------------------------------------------------- | -------------------- |
| [`Blob`](https://developer.mozilla.org/docs/Web/API/Blob)                       | 表示一个二进制大对象 |
| [`fetch`](https://developer.mozilla.org/docs/Web/API/Fetch_API)                 | 获取资源             |
| [`FetchEvent`](https://developer.mozilla.org/docs/Web/API/FetchEvent)           | 表示一个 fetch 事件  |
| [`File`](https://developer.mozilla.org/docs/Web/API/File)                       | 表示一个文件         |
| [`FormData`](https://developer.mozilla.org/docs/Web/API/FormData)               | 表示表单数据         |
| [`Headers`](https://developer.mozilla.org/docs/Web/API/Headers)                 | 表示 HTTP 头部       |
| [`Request`](https://developer.mozilla.org/docs/Web/API/Request)                 | 表示 HTTP 请求       |
| [`Response`](https://developer.mozilla.org/docs/Web/API/Response)               | 表示 HTTP 响应       |
| [`URLSearchParams`](https://developer.mozilla.org/docs/Web/API/URLSearchParams) | 表示 URL 搜索参数    |
| [`WebSocket`](https://developer.mozilla.org/docs/Web/API/WebSocket)             | 表示 WebSocket 连接  |

### 编码 API

| API                                                                                 | 描述                       |
| ----------------------------------------------------------------------------------- | -------------------------- |
| [`atob`](https://developer.mozilla.org/en-US/docs/Web/API/atob)                     | 解码 base-64 编码的字符串  |
| [`btoa`](https://developer.mozilla.org/en-US/docs/Web/API/btoa)                     | 将字符串编码为 base-64     |
| [`TextDecoder`](https://developer.mozilla.org/docs/Web/API/TextDecoder)             | 将 Uint8Array 解码为字符串 |
| [`TextDecoderStream`](https://developer.mozilla.org/docs/Web/API/TextDecoderStream) | 流式解码器                 |
| [`TextEncoder`](https://developer.mozilla.org/docs/Web/API/TextEncoder)             | 将字符串编码为 Uint8Array  |
| [`TextEncoderStream`](https://developer.mozilla.org/docs/Web/API/TextEncoderStream) | 流式编码器                 |

### 流 API

| API                                                                                                     | 描述               |
| ------------------------------------------------------------------------------------------------------- | ------------------ |
| [`ReadableStream`](https://developer.mozilla.org/docs/Web/API/ReadableStream)                           | 表示可读流         |
| [`ReadableStreamBYOBReader`](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBReader)       | 表示可读流的读取器 |
| [`ReadableStreamDefaultReader`](https://developer.mozilla.org/docs/Web/API/ReadableStreamDefaultReader) | 表示可读流的读取器 |
| [`TransformStream`](https://developer.mozilla.org/docs/Web/API/TransformStream)                         | 表示转换流         |
| [`WritableStream`](https://developer.mozilla.org/docs/Web/API/WritableStream)                           | 表示可写流         |
| [`WritableStreamDefaultWriter`](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultWriter) | 表示可写流的写入器 |

### 加密 API

| API                                                                       | 描述                                               |
| ------------------------------------------------------------------------- | -------------------------------------------------- |
| [`crypto`](https://developer.mozilla.org/docs/Web/API/Window/crypto)      | 提供对平台加密功能的访问                           |
| [`CryptoKey`](https://developer.mozilla.org/docs/Web/API/CryptoKey)       | 表示加密密钥                                       |
| [`SubtleCrypto`](https://developer.mozilla.org/docs/Web/API/SubtleCrypto) | 提供对常见加密原语的访问，如哈希、签名、加密或解密 |

### Web 标准 API

| API                                                                                                                   | 描述                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| [`AbortController`](https://developer.mozilla.org/docs/Web/API/AbortController)                                       | 允许你根据需要中止一个或多个 DOM 请求                                                                          |
| [`Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)                           | 表示值的数组                                                                                                   |
| [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)               | 表示通用的、固定长度的原始二进制数据缓冲区                                                                     |
| [`Atomics`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Atomics)                       | 提供作为静态方法的原子操作                                                                                     |
| [`BigInt`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/BigInt)                         | 表示任意精度的整数                                                                                             |
| [`BigInt64Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/BigInt64Array)           | 表示 64 位有符号整数的类型化数组                                                                               |
| [`BigUint64Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/BigUint64Array)         | 表示 64 位无符号整数的类型化数组                                                                               |
| [`Boolean`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)                       | 表示逻辑实体，可以有两个值：`true` 和 `false`                                                                  |
| [`clearInterval`](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval)                 | 取消先前通过调用 `setInterval()` 建立的定时、重复的操作                                                        |
| [`clearTimeout`](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/clearTimeout)                   | 取消先前通过调用 `setTimeout()` 建立的定时、重复的操作                                                         |
| [`console`](https://developer.mozilla.org/docs/Web/API/Console)                                                       | 提供对浏览器调试控制台的访问                                                                                   |
| [`DataView`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView)                     | 表示 `ArrayBuffer` 的通用视图                                                                                  |
| [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)                             | 以平台独立的格式表示单个时间点                                                                                 |
| [`decodeURI`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/decodeURI)                   | 解码先前由 `encodeURI` 或类似例程创建的统一资源标识符 (URI)                                                    |
| [`decodeURIComponent`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent) | 解码先前由 `encodeURIComponent` 或类似例程创建的统一资源标识符 (URI) 组件                                      |
| [`DOMException`](https://developer.mozilla.org/docs/Web/API/DOMException)                                             | 表示 DOM 中发生的错误                                                                                          |
| [`encodeURI`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)                   | 通过将每个特定字符实例替换为一个、两个、三个或四个表示字符 UTF-8 编码的转义序列来编码统一资源标识符 (URI)      |
| [`encodeURIComponent`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) | 通过将每个特定字符实例替换为一个、两个、三个或四个表示字符 UTF-8 编码的转义序列来编码统一资源标识符 (URI) 组件 |
| [`Error`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error)                           | 表示尝试执行语句或访问属性时出现的错误                                                                         |
| [`EvalError`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/EvalError)                   | 表示关于全局函数 `eval()` 发生的错误                                                                           |
| [`Float32Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Float32Array)             | 表示 32 位浮点数的类型化数组                                                                                   |
| [`Float64Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Float64Array)             | 表示 64 位浮点数的类型化数组                                                                                   |
| [`Function`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function)                     | 表示函数                                                                                                       |
| [`Infinity`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Infinity)                     | 表示数学无穷大值                                                                                               |
| [`Int8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Int8Array)                   | 表示 8 位有符号整数的类型化数组                                                                                |
| [`Int16Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Int16Array)                 | 表示 16 位有符号整数的类型化数组                                                                               |
| [`Int32Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Int32Array)                 | 表示 32 位有符号整数的类型化数组                                                                               |
| [`Intl`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl)                             | 提供对国际化和本地化功能的访问                                                                                 |
| [`isFinite`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/isFinite)                     | 确定值是否为有限数                                                                                             |
| [`isNaN`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/isNaN)                           | 确定值是否为 `NaN`                                                                                             |
| [`JSON`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/JSON)                             | 提供将 JavaScript 值转换为 JSON 格式并从 JSON 格式转换回来的功能                                               |
| [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)                               | 表示值的集合，其中每个值只能出现一次                                                                           |
| [`Math`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Math)                             | 提供对数学函数和常量的访问                                                                                     |
| [`Number`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)                         | 表示数值                                                                                                       |
| [`Object`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)                         | 表示作为所有 JavaScript 对象基础的对象                                                                         |
| [`parseFloat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/parseFloat)                 | 解析字符串参数并返回浮点数                                                                                     |
| [`parseInt`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/parseInt)                     | 解析字符串参数并返回指定基数的整数                                                                             |
| [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)                       | 表示异步操作的最终完成（或失败）及其结果值                                                                     |
| [`Proxy`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Proxy)                           | 表示用于定义基本操作（如属性查找、赋值、枚举、函数调用等）自定义行为的对象                                     |
| [`queueMicrotask`](https://developer.mozilla.org/docs/Web/API/queueMicrotask)                                         | 将微任务排队执行                                                                                               |
| [`RangeError`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError)                 | 表示值不在允许值的集合或范围内时的错误                                                                         |
| [`ReferenceError`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError)         | 表示引用不存在的变量时的错误                                                                                   |
| [`Reflect`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Reflect)                       | 提供用于可拦截的 JavaScript 操作的方法                                                                         |
| [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)                         | 表示正则表达式，允许你匹配字符组合                                                                             |
| [`Set`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)                               | 表示值的集合，其中每个值只能出现一次                                                                           |
| [`setInterval`](https://developer.mozilla.org/docs/Web/API/setInterval)                                               | 重复调用函数，每次调用之间有固定的时间延迟                                                                     |
| [`setTimeout`](https://developer.mozilla.org/docs/Web/API/setTimeout)                                                 | 在指定的毫秒数后调用函数或评估表达式                                                                           |
| [`SharedArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer)   | 表示通用的、固定长度的原始二进制数据缓冲区                                                                     |
| [`String`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)                         | 表示字符序列                                                                                                   |
| [`structuredClone`](https://developer.mozilla.org/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)            | 创建值的深拷贝                                                                                                 |
| [`Symbol`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Symbol)                         | 表示唯一且不可变的数据类型，用作对象属性的键                                                                   |
| [`SyntaxError`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError)               | 表示尝试解析语法无效的代码时的错误                                                                             |
| [`TypeError`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypeError)                   | 表示值不是预期类型时的错误                                                                                     |
| [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)                 | 表示 8 位无符号整数的类型化数组                                                                                |
| [`Uint8ClampedArray`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray)   | 表示被限制在 255 范围内的 8 位无符号整数的类型化数组                                                           |
| [`Uint32Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array)               | 表示 32 位无符号整数的类型化数组                                                                               |
| [`URIError`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/URIError)                     | 表示全局 URI 处理函数被错误使用时的错误                                                                        |
| [`URL`](https://developer.mozilla.org/docs/Web/API/URL)                                                               | 表示提供用于创建对象 URL 的静态方法的对象                                                                      |
| [`URLPattern`](https://developer.mozilla.org/docs/Web/API/URLPattern)                                                 | 表示 URL 模式                                                                                                  |
| [`URLSearchParams`](https://developer.mozilla.org/docs/Web/API/URLSearchParams)                                       | 表示键/值对的集合                                                                                              |
| [`WeakMap`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)                       | 表示键/值对的集合，其中键被弱引用                                                                              |
| [`WeakSet`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)                       | 表示对象的集合，其中每个对象只能出现一次                                                                       |
| [`WebAssembly`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly)               | 提供对 WebAssembly 的访问                                                                                      |

### Next.js 特定的 Polyfills

- [`AsyncLocalStorage`](https://nodejs.org/api/async_context.html#class-asynclocalstorage)

### 环境变量

你可以使用 `process.env` 在 `next dev` 和 `next build` 中访问[环境变量]()。

### 不支持的 API/nextjs-cn/

Edge 运行时有一些限制，包括：

- 原生 Node.js API **不受支持**。例如，你不能读取或写入文件系统。
- 可以使用 `node_modules`，只要它们实现 ES 模块并且不使用原生 Node.js API。
- 直接调用 `require` **不允许**。请改用 ES 模块。

以下 JavaScript 语言功能被禁用，**将无法工作：**

| API                                                                                                                             | 描述                                    |
| ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| [`eval`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/eval)                                       | 评估表示为字符串的 JavaScript 代码      |
| [`new Function(evalString)`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function)               | 用提供的代码作为参数创建新函数          |
| [`WebAssembly.compile`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/compile)         | 从缓冲区源编译 WebAssembly 模块         |
| [`WebAssembly.instantiate`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/instantiate) | 从缓冲区源编译并实例化 WebAssembly 模块 |

在极少数情况下，你的代码可能包含（或导入）一些*运行时无法访问*且无法通过摇树优化删除的动态代码评估语句。
你可以通过 Middleware 配置放宽检查，允许特定文件：

```javascript
export const config = {
  unstable_allowDynamic: [
    // 允许单个文件
    '/lib/utilities.js',
    // 使用 glob 模式允许 function-bind 第三方模块中的任何内容
    '**/node_modules/function-bind/**',
  ],
}
```

`unstable_allowDynamic` 是一个 [glob](https://github.com/micromatch/micromatch#matching-features) 模式或 glob 模式数组，忽略特定文件的动态代码评估。glob 模式相对于你的应用程序根文件夹。

请注意，如果这些语句在 Edge 上执行，_它们将抛出并导致运行时错误_。
