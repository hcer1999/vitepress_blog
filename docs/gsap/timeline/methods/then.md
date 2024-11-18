# GSAP中文文档 - timeline 方法 - then

## then

then 方法返回一个 Promise 对象，允许你使用 Promise 来跟踪补间动画或时间轴何时完成。

### 方法签名

```plaintext
then(callback: Function): Promise
```

返回一个 Promise 对象，以便你可以使用 Promise 来跟踪补间动画或时间轴何时完成。

### 参数（Parameters）

- **callback**: Function
  - 你想要处理由时间轴生成的 Promise 的函数。

### 返回值（Returns）

- Promise
  - 返回一个 Promise 对象，当动画完成时，该 Promise 将被解决（resolved）。

### 详细信息（Details）

有些人更喜欢使用 Promise 而不是 `onComplete` 回调函数——then() 方法正是为此而设计的。它返回一个 Promise，当动画完成时，该 Promise 将被解决。

### 示例代码（Example Code）

```javascript
gsap.timeline().to(".class", { duration: 1, x: 100 }).then(yourFunction).then(...);
```
