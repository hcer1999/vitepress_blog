# GSAP中文文档 - timeline 方法 - 全局时间（globalTime）

## 全局时间（globalTime）

将本地时间转换为 `gsap.globalTimeline` 上的对应时间（考虑所有嵌套、时间缩放等）。

### 方法签名

```plaintext
globalTime(localTime: Number): Number
```

将本地时间转换为 `gsap.globalTimeline` 上的对应时间。

### 参数（Parameters）

- **localTime**: Number
  - 需要转换为全局时间的本地时间。

### 返回值（Returns）

- Number
  - `gsap.globalTimeline` 上对应的时间。

### 详细信息（Details）

将本地时间转换为 `gsap.globalTimeline` 上的对应时间（考虑所有嵌套、时间缩放等）。例如，如果您有一个嵌套在另一个时间线中的时间线，并且您想要将它的开始时间（0）转换为它在全局时间线上的位置，您可以使用 `yourTimeline.globalTime(0)`。

默认情况下，它使用动画的 `totalTime`，所以 `yourTimeline.globalTime()` 与 `yourTimeline.globalTime(tween.totalTime())` 是相同的。
