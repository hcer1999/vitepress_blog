# GSAP中文文档 - tween 方法 - 时间缩放（timeScale）

## 时间缩放（timeScale）

省略参数时返回当前值（获取器），而定义参数则设置该值（设置器），并返回实例本身以便于链式调用。

用于缩放动画中的时间的因素，其中 1 = 正常速度（默认值），0.5 = 半速，2 = 双倍速度，-1 = 以正常速度反向播放等。例如，如果一个动画的 `duration` 是 2 但其 `timeScale` 是 0.5，它将需要 4 秒才能完成。如果您将该动画嵌套在 `timeScale` 也是 0.5 的时间线中，它将需要 8 秒才能完成。您甚至可以对 `timeScale` 进行补间，以逐渐减慢或加快速度。

此方法既作为获取器也作为设置器。省略参数时返回当前值（获取器），而定义参数则设置该值（设置器），并返回实例本身以便于链式调用，如 `myAnimation.timeScale(2).play(1);`

### 参数（Parameters）

- **value**: Number（可选）
  - 设置动画的时间缩放值。

### 返回值（Returns）

- Number
  - 如果未提供参数，返回当前时间缩放值。
- self
  - 如果提供了参数，返回实例本身以便于链式调用。

### 示例代码（Example Code）

```javascript
// 获取当前时间缩放值
var currentTimeScale = myAnimation.timeScale()

// 将时间缩放值设置为半速
myAnimation.timeScale(0.5)
```
