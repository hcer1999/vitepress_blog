# GSAP中文文档 - tween 方法 - 全局时间（globalTime）

## 全局时间（globalTime）

将本地时间转换为对应的 `gsap.globalTimeline` 上的时间（考虑所有嵌套、时间缩放等）。

### 参数（Parameters）

- **localTime**: Number
  - 需要转换为全局时间的本地时间。

### 返回值（Returns）

- Number
  - `gsap.globalTimeline` 上对应的时间。

### 详细信息（Details）

将本地时间转换为对应的 `gsap.globalTimeline` 上的时间（考虑所有嵌套、时间缩放等）。例如，如果您有一个补间嵌套在另一个时间线中，而您想要将该补间的开始时间（0）转换为它在全局时间线上的位置，您可以使用 `tween.globalTime(0)`。

默认情况下，它使用补间的总时间，所以 `tween.globalTime()` 与 `tween.globalTime(tween.totalTime())` 是相同的。

### 示例代码（Example Code）

```javascript
// 将本地时间转换为全局时间
var globalTime = tween.globalTime(localTime)
```
