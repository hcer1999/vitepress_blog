# GSAP中文文档 - tween 方法 - 持续时间（duration）

## 持续时间（duration）

省略参数时返回当前值（获取器），而定义参数则设置该值（设置器），并返回实例本身以便于链式调用。

获取或设置动画的 `duration`，不包括任何 `repeat` 或 `repeatDelay`。例如，如果一个补间有一个 `duration` 为 2 和一个 `repeat` 为 3，它的 `totalDuration` 将是 8（一次标准播放加上 3 次重复等于 4 个总周期）。

此方法既作为获取器也作为设置器。省略参数时返回当前值（获取器），而定义参数则设置该值（设置器），并返回实例本身以便于链式调用，如 `myAnimation.duration(2).delay(0.5).play(1);`

### 参数（Parameters）

- **value**: Number（可选）
  - 设置动画的持续时间。

### 返回值（Returns）

- Number
  - 如果未提供参数，返回当前持续时间。
- self
  - 如果提供了参数，返回实例本身以便于链式调用。

### 示例代码（Example Code）

```javascript
var currentDuration = myAnimation.duration() // 获取当前持续时间
myAnimation.duration(2) // 设置持续时间为2秒
```
