# GSAP中文文档 - timeline 方法 - 持续时间(duration)

## 持续时间（duration）

获取时间线的持续时间，或者如果用作设置器，调整时间线的 `timeScale` 以适应指定的持续时间。

### 方法签名

```plaintext
duration( value: Number ): [Number | self]
```

[覆盖] 获取时间线的持续时间，或者如果用作设置器，调整时间线的 `timeScale` 以适应指定的持续时间。

### 参数（Parameters）

- **value**: Number（可选）
  - （默认值为 `NaN`）省略参数时返回当前值（获取器），而定义参数则设置该值（设置器）并返回实例本身以便于链式调用。

### 返回值（Returns）

- Number | self
  - 省略参数时返回当前值（获取器），定义参数时设置该值（设置器）并返回实例本身以便于链式调用。

### 详细信息（Details）

获取时间线的 `duration`，或者如果用作设置器，调整时间线的 `timeScale` 以适应指定的持续时间。`duration()` 与 `totalDuration()` 相同，除非时间线实例有一个非零的 `repeat`，在这种情况下 `totalDuration` 包括 `repeat` 和 `repeatDelays`，而 `duration` 不包括。

例如，如果一个时间线有一个 `duration` 为 2 和一个 `repeat` 为 3，它的 `totalDuration` 将是 8（一次标准播放加上 3 次重复等于 4 个总周期）。

由于时间线的 `duration` 由其内容决定，使用此方法作为设置器将简单地导致 `timeScale` 被调整以适应当前内容到指定的 `duration`，但 `duration` 值本身将保持不变。

例如，如果时间线中有 20 秒的补间，并且你执行 `myTimeline.duration(10)`，`timeScale` 将被更改为 2。如果你立即再次检查 `duration`，它仍然会返回 20，因为从技术上讲这就是所有子补间/时间线的持续时间，但由于 `timeScale` 的原因，播放速度将加倍。

此方法既作为获取器也作为设置器。省略参数时返回当前值（获取器），而定义参数则设置该值（设置器），并返回实例本身以便于链式调用，如 `myAnimation.duration(2).play(1);`

## 示例代码（Example Code）

```javascript
// 获取当前持续时间
var currentDuration = tl.duration()

// 调整 myAnimation 的 timeScale，使其在父时间线上正好持续 10 秒
tl.duration(10)
```
