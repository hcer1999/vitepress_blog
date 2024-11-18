# GSAP中文文档 - timeline 方法 - 时间缩放（timeScale）

## 时间缩放（timeScale）

timeScale 方法用于获取或设置动画的时间缩放因子，其中 1 表示正常速度（默认值），0.5 表示速度减半，2 表示速度加倍，-1 表示以正常速度反向播放等。例如，如果一个动画的 `duration` 是 2，但其 `timeScale` 是 0.5，那么它将需要 4 秒才能完成。如果你将该动画嵌套在一个 `timeScale` 也是 0.5 的时间轴中，它将需要 8 秒才能完成。你甚至可以对 `timeScale` 进行补间动画，以逐渐减慢或加快速度。

### 方法签名

```plaintext
timeScale(value: Number): self
```

获取或设置动画的时间缩放因子。

### 参数（Parameters）

- **value**: Number
  - 要设置的时间缩放因子。

### 返回值（Returns）

- self
  - 返回实例本身，便于链式调用。

### 详细信息（Details）

- 如果省略参数，`timeScale()` 方法将返回当前值（getter）。
- 如果定义了参数，它将设置值（setter），并返回实例本身以便于链式调用，如 `myAnimation.timeScale(2).play(1);`

### 示例代码（Example Code）

```javascript
// 获取当前时间缩放因子
var currentTimeScale = tl.timeScale()

// 将时间缩放因子设置为半速
tl.timeScale(0.5)
```
