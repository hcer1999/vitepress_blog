# GSAP中文文档 - timeline 方法 - 总进度（totalProgress）

## 总进度（totalProgress）

totalProgress 方法用于获取或设置时间轴的总进度，这是一个介于 0 和 1 之间的值，表示虚拟播放头的位置（**包括**重复次数和重复延迟），其中 0 表示开始，0.5 表示中间点，1 表示结束（完成）。如果时间轴定义了非零的 `repeat`，`progress()` 和 `totalProgress()` 将会不同，因为 `progress()` 不包括 `repeat` 或 `repeatDelay`，而 `totalProgress()` 包括。

### 方法签名

```plaintext
totalProgress(value: Number): self
```

获取或设置时间轴的总进度。

### 参数（Parameters）

- **value**: Number
  - 要设置的总进度值（介于 0 和 1 之间）。

### 返回值（Returns）

- self
  - 返回实例本身，便于链式调用。

### 详细信息（Details）

- 如果省略参数，`totalProgress()` 方法将返回当前值（getter）。
- 如果定义了参数，它将设置值（setter），并返回实例本身以便于链式调用。

例如，如果一个时间轴实例设置为重复一次，在第一个周期结束时，`totalProgress()` 仅为 0.5，而 `progress` 为 1。如果在整个动画过程中观察这两个属性，你会看到 `progress` 从 0 到 1 两次（每个周期一次），而 `totalProgress()` 仅从 0 到 1 一次。

### 示例代码（Example Code）

```javascript
// 获取总进度
var progress = tl.totalProgress()

// 将总进度设置为完成四分之一
tl.totalProgress(0.25)
```
