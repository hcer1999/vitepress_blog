# GSAP中文文档 - gsap.killTweensOf()

## gsap.killTweensOf()

`gsap.killTweensOf()` 函数用于终止特定对象的所有补间动画（或特定补间属性），或终止对特定函数的延迟调用（delayedCalls）。以下是一些使用示例：

- 如果您想终止所有具有 "myClass" 类的元素的补间动画，您可以这样做：

```javascript
gsap.killTweensOf('.myClass')
```

- 要仅终止对象的特定补间属性，使用第二个参数。例如，如果您只想终止 `myObject` 的 `opacity` 和 `x` 属性的所有补间动画，您可以这样做：

```javascript
gsap.killTweensOf(myObject, 'opacity,x')
```

- 要终止所有的延迟调用（例如使用 `gsap.delayedCall(5, myFunction);` 创建的那些），您可以简单地调用 `gsap.killTweensOf(myFunction);`，因为延迟调用本质上是具有相同目标和 `onComplete` 方法（当然还有一个延迟）的补间动画。

- 您也可以传入一个定义选择器文本的字符串，如 `"#myID"` 来终止具有 "myID" ID的元素的补间动画，或者使用 `"*"` 来终止所有具有DOM目标的补间动画。您还可以传入目标数组。

`killTweensOf()` 也会影响尚未开始的补间动画。例如，如果 `myObject` 的补间动画有 5 秒的延迟，并且在创建补间动画后 2 秒调用 `gsap.killTweensOf(myObject)`，它仍将被终止，即使它尚未开始。
