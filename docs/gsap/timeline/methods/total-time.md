# GSAP中文文档 - timeline 方法 - 总时间（totalTime）

## 总时间（totalTime）

totalTime 方法用于获取或设置播放头的位置，根据 `totalDuration` 计算，**包括任何重复次数和重复延迟**。例如，如果一个补间动画的 `duration` 是 2，`repeat` 是 3，`totalTime` 将在补间动画的过程中从 0 变化到 8（播放一次然后重复 3 次，总共 4 个周期），而 `time` 将总共 4 次从 0 变化到 2。如果你添加了一个 `repeatDelay` 的 1 秒延迟，那么 `totalTime` 将从 0 变化到 11。

### 方法签名

```plaintext
totalTime(value: Number): self
```

获取或设置播放头的位置，根据 `totalDuration` 计算。

### 参数（Parameters）

- **value**: Number
  - 要设置的总时间值（秒数）。

### 返回值（Returns）

- self
  - 返回实例本身，便于链式调用。

### 详细信息（Details）

- 如果省略参数，`totalTime()` 方法将返回当前值（getter）。
- 如果定义了参数，它将设置值（setter），并返回实例本身以便于链式调用。

`totalTime` 永远不会超过 `totalDuration`，也不会小于 0（值将被适当剪辑）。负值将从动画的**末尾**解释。例如，-2 将表示结束前 2 秒。如果动画的 `totalDuration` 是 6 秒，并且你执行 `tl.totalTime(-2)`，它将跳转到 `totalTime` 的 4 秒位置。

### 示例代码（Example Code）

```javascript
// 获取总时间
var totalTime = tl.totalTime()

// 设置总时间，跳转到新值，就像 seek() 一样
tl.totalTime(2)
```
