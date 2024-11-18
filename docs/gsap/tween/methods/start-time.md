# GSAP中文文档 - tween 方法 - 开始时间（startTime）

## 开始时间（startTime）

省略参数时返回当前值（获取器），而定义参数则设置该值（设置器），并返回实例本身以便于链式调用。

获取或设置动画在其父时间线上开始的时间（在定义的任何 `delay` 之后）。例如，如果一个补间恰好在其所在的时间线上的3秒处开始，那么该补间的 `startTime` 将是3。

如果父时间线的 `smoothChildTiming` 属性为 `true` 并且在运行时进行了依赖时间的更改，如调用 `reverse()` 或更改 `timeScale()` 等，`startTime` 可能会自动调整以使时间看起来无缝。有关更多详细信息，请参见时间线 `smoothChildTiming` 属性的文档。

此方法既作为获取器也作为设置器。省略参数时返回当前值（获取器），而定义参数则设置该值（设置器），并返回实例本身以便于链式调用。

### 参数（Parameters）

- **time**: Number（可选）
  - 设置动画开始的时间。

### 返回值（Returns）

- Number
  - 如果未提供参数，返回当前的开始时间。
- self
  - 如果提供了参数，返回实例本身以便于链式调用。

### 示例代码（Example Code）

```javascript
// 获取当前开始时间
var start = myAnimation.startTime()

// 设置开始时间为2秒
myAnimation.startTime(2)
```
