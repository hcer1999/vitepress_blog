# GSAP中文文档 - timeline 方法 - 重复（repeat）

## 重复（repeat）

repeat 方法用于获取或设置时间轴在首次迭代后应重复的次数。

### 方法签名

```plaintext
repeat(value: Integer): self
```

获取或设置时间轴在首次迭代后应重复的次数。

### 参数（Parameters）

- **value**: Integer
  - 要设置的时间轴重复次数。如果设置为 `-1`，则时间轴将无限重复。

### 返回值（Returns）

- self
  - 返回实例本身，便于链式调用。

### 详细信息（Details）

省略参数时，`repeat()` 方法将返回当前的重复次数（getter）。如果提供了参数，则设置时间轴的重复次数（setter），并返回实例本身以便于链式调用。

例如，如果 `repeat` 设置为 `1`，则时间轴将总共播放两次（初始播放加上1次重复）。要使重复在正向和反向之间交替，可以将 `yoyo` 参数设置为 `true`。要在重复之间添加时间间隔，可以使用 `repeatDelay` 参数。

### 示例代码（Example Code）

```javascript
// 获取当前重复值
var repeatValue = tl.repeat()

// 将时间轴的重复次数设置为2
tl.repeat(2)

// 设置时间轴无限重复，并使动画在正向和反向之间交替
tl.repeat(-1).yoyo(true)
```
