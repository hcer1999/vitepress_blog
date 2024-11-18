# GSAP中文文档 - timeline 方法 - 总持续时间（totalDuration）

## 总持续时间（totalDuration）

totalDuration 方法用于获取或设置时间轴的总持续时间（以秒为单位），包括任何重复次数或重复延迟。与之相对的 `duration` 属性**不**包括重复次数和重复延迟。例如，如果一个补间动画的 `duration` 是 10，`repeat` 是 1，`repeatDelay` 是 2，那么 `totalDuration` 将是 22。

由于时间轴的持续时间由其内容决定，将此方法用作设置器将简单地调整 `timeScale` 以适应当前内容到指定的总持续时间，但 `totalDuration`（和 `duration`）值本身将保持不变。

### 方法签名

```plaintext
totalDuration(value: Number): self
```

获取或设置时间轴的总持续时间，包括任何重复次数或重复延迟。

### 参数（Parameters）

- **value**: Number
  - 要设置的总持续时间值（秒数）。

### 返回值（Returns）

- self
  - 返回实例本身，便于链式调用。

### 详细信息（Details）

- 如果省略参数，`totalDuration()` 方法将返回当前值（getter）。
- 如果定义了参数，它将设置值（setter），并返回实例本身以便于链式调用。

### 示例代码（Example Code）

```javascript
// 获取总持续时间
var total = tl.totalDuration()

// 调整时间轴的 timeScale，使其在父时间轴上恰好持续 10 秒
tl.totalDuration(10)
```
