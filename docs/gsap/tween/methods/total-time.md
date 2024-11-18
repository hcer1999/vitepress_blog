# GSAP中文文档 - tween 方法 - 总时间（totalTime）

## 总时间（totalTime）

省略参数时返回当前值（获取器），而定义参数则设置该值（设置器），并返回实例本身以便于链式调用。

获取或设置播放头的位置，根据 `totalDuration` 计算，**包括任何重复和重复延迟**。例如，如果一个补间有一个 `duration` 为 2 和 `repeat` 为 3，`totalTime` 在补间的整个过程中将从 0 变化到 8（播放一次然后重复 3 次，总共 4 个周期），而 `time` 将总共 4 次从 0 变化到 2。如果您添加了一个 `repeatDelay` 为 1，那么 `totalTime` 在补间的整个过程中将从 0 变化到 11。

此方法既作为获取器也作为设置器。省略参数时返回当前值（获取器），而定义参数则设置该值（设置器），并返回实例本身以便于链式调用。

`totalTime` 永远不会超过 `totalDuration`，也不会小于 0（值将被适当裁剪）。负值将从动画的**末尾**解释。例如，-2 将是结束前 2 秒。如果动画的 `totalDuration` 是 6 并且您执行 `myAnimation.totalTime(-2)`，它将跳转到 `totalTime` 为 4。

### 参数（Parameters）

- **value**: Number（可选）
  - 设置补间的总时间。

### 返回值（Returns）

- Number
  - 如果未提供参数，返回当前总时间。
- self
  - 如果提供了参数，返回实例本身以便于链式调用。

### 示例代码（Example Code）

```javascript
// 获取总时间
var totalTime = myAnimation.totalTime()

// 设置总时间，跳转到新值，就像 seek() 一样
myAnimation.totalTime(2)
```
