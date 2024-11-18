# GSAP中文文档 - tween 方法 - then

## then

返回一个承诺（Promise），以便您可以使用承诺来跟踪补间或时间线何时完成。

### 参数（Parameters）

- **callback**: Function
  - 您希望处理由补间生成的承诺的函数。

### 返回值（Returns）

- Promise
  - 返回一个承诺，当动画完成时，该承诺将被解决。

### 详细信息（Details）

有些人更喜欢使用 Promise 而不是 `onComplete` 回调函数——`then()` 正是为此而设计的。它返回一个 `Promise`，当动画完成时，该 `Promise` 将被解决。

### 示例代码（Example Code）

```javascript
gsap.to(".class", {duration: 1, x: 100}).then(yourFunction).then(...);
```
