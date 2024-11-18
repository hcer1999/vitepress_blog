# GSAP中文文档 - timeline 方法 - 时间（time）

## 时间（time）

time 方法用于获取或设置播放头的本地位置（基本上是当前时间），不包括任何重复次数或重复延迟。如果时间轴有一个非零的 `repeat`，即使 `totalTime` 继续线性前进（或者如果 `yoyo` 是 `true`，`time` 在前进和后退之间交替），其时间在重复时会回到零。`time` 永远不会超过持续时间，而 `totalTime` 反映了包括任何重复和重复延迟在内的总时间。

### 方法签名

```plaintext
time(value: Number): self
```

获取或设置播放头的本地位置（当前时间）。

### 参数（Parameters）

- **value**: Number
  - 要设置的时间值（秒数）。

### 返回值（Returns）

- self
  - 返回实例本身，便于链式调用。

### 详细信息（Details）

- 如果省略参数，`time()` 方法将返回当前值（getter）。
- 如果定义了参数，它将设置值（setter），并返回实例本身以便于链式调用。

例如，如果一个时间轴实例的 `duration` 为 2，重复次数为 3，`totalTime` 将在时间轴的过程中从 0 变化到 8（播放一次然后重复 3 次，总共 4 个周期），而 `time` 将总共 4 次从 0 变化到 2。

### 示例代码（Example Code）

```javascript
// 获取当前时间
var currentTime = tl.time()

// 设置时间，跳转到新值，就像 seek() 一样
tl.time(2)
```
