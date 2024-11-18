# GSAP中文文档 - tween 方法 - 总持续时间（totalDuration）

## 总持续时间（totalDuration）

省略参数时返回当前值（获取器），而定义参数则设置该值（设置器），并返回实例本身以便于链式调用。

获取或设置包括任何重复或重复延迟在内的补间的总持续时间（以秒为单位）。相比之下，`duration` **不**包括重复和重复延迟。例如，如果补间有一个 `duration` 为 10，`repeat` 为 1 和 `repeatDelay` 为 2，那么 `totalDuration` 将是 22。

此方法既作为获取器也作为设置器。省略参数时返回当前值（获取器），而定义参数则设置该值（设置器），并返回实例本身以便于链式调用。

### 参数（Parameters）

- **value**: Number（可选）
  - 设置补间的总持续时间。

### 返回值（Returns）

- Number
  - 如果未提供参数，返回当前总持续时间。
- self
  - 如果提供了参数，返回实例本身以便于链式调用。

### 示例代码（Example Code）

```javascript
// 获取总持续时间
var total = myTween.totalDuration()

// 设置总持续时间为10秒
myTween.totalDuration(10)
```
