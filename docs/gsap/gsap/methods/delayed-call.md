# GSAP中文文档 - gsap.delayedCall()

## gsap.delayedCall()

`gsap.delayedCall()` 提供了一个简单的方式来在设定的时间后调用一个函数，它与整个渲染循环完全同步（与 `setTimeout()` 不同，后者可能在浏览器屏幕刷新周期之外触发）。您还可以选择传递任意数量的参数给函数。

```javascript
// 在 1 秒后调用 myFunction() 并传递 2 个参数:
gsap.delayedCall(1, myFunction, ['param1', 'param2'])

function myFunction(param1, param2) {
  // 执行操作
}
```

### 取消/杀死一个延迟调用

保存对它的引用，并在需要时调用它的 `.kill()` 方法：

如果您不想保留对它的引用，您可以使用 `gsap.killTweensOf()` 方法，因为 `delayedCall()` 仅仅是一个带有 `onComplete` 的补间动画，函数本身是补间动画的“目标”：

```javascript
// 创建延迟调用并保存引用
var delayedCall = gsap.delayedCall(1, myFunction, ['param1', 'param2'])

// 在需要时取消延迟调用
delayedCall.kill()
```

或者，如果您没有保留引用，可以这样做：

```javascript
// 假设 myFunction 是您的函数
gsap.killTweensOf(myFunction)
```

通过 `gsap.delayedCall()`，您可以确保延迟函数的调用与浏览器的屏幕刷新周期同步，这在执行精确的动画时非常有用。它提供了比传统的 `setTimeout()` 更可靠的解决方案，因为后者可能受到浏览器的最小时间间隔限制，或者在浏览器的刷新周期之外执行。
