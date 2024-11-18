# GSAP中文文档 - tween 方法 - 延迟（delay）

## 延迟（delay）

省略参数时返回当前值（获取器），而定义参数则设置该值（设置器），并返回实例本身以便于链式调用。

获取或设置动画的初始 `delay`，这是动画开始之前的秒数。补间的起始值在 `delay` 过期后才会被记录（除非在 `from()` 补间中默认立即渲染，除非在 `vars` 参数中设置了 `immediateRender: false`）。动画的 `delay` 不受其 `timeScale` 的影响，因此，例如，如果你将 `timeScale` 从 `1` 改为 `10`，它不会导致延迟增加十倍。

此方法既作为获取器也作为设置器。省略参数时返回当前值（获取器），而定义参数则设置该值（设置器），并返回实例本身以便于链式调用，如 `myAnimation.delay(2).timeScale(0.5).restart(true);`

## 参数（Parameters）

- **value**: Number（可选）
  - 设置动画的延迟时间。

## 返回值（Returns）

- Number
  - 如果未提供参数，返回当前延迟时间。
- self
  - 如果提供了参数，返回实例本身以便于链式调用。

## 示例代码（Example Code）

```javascript
var currentDelay = myAnimation.delay() // 获取当前延迟
myAnimation.delay(2) // 设置延迟为2秒
```
