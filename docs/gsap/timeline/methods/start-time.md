# GSAP中文文档 - timeline 方法 - 开始时间（startTime）

## 开始时间（startTime）

startTime 方法用于获取或设置动画在其父时间轴上开始的时间（在定义的任何 `delay` 之后）。例如，如果一个补间动画恰好在其所放置的时间轴的3秒处开始，那么该补间动画的 `startTime` 将是3。

### 方法签名

```plaintext
startTime(value: Number): self
```

获取或设置动画在其父时间轴上的开始时间。

### 参数（Parameters）

- **value**: Number
  - 要设置的开始时间（秒数）。

### 返回值（Returns）

- self
  - 返回实例本身，便于链式调用。

### 详细信息（Details）

- 如果省略参数，`startTime()` 方法将返回当前的开始时间（getter）。
- 如果定义了参数，它将设置开始时间（setter），并返回实例本身以便于链式调用。

如果父时间轴的 `smoothChildTiming` 属性为 `true`，并且在运行时进行了依赖时间的更改（例如调用 `reverse()` 或更改 `timeScale()` 等），`startTime` 可能会自动调整，以使时间看起来无缝。有关更多详细信息，请参见时间轴的 `smoothChildTiming` 属性文档。

### 示例代码（Example Code）

```javascript
// 获取当前开始时间
var start = tl.startTime()

// 设置开始时间为2秒
tl.startTime(2)
```
