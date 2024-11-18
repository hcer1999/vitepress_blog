# GSAP中文文档 - tween 方法 - 重复延迟（repeatDelay）

## 重复延迟（repeatDelay）

省略参数时返回当前值（获取器），而定义参数则设置该值（设置器），并返回实例本身以便于链式调用。

获取或设置补间重复之间的时间（以秒为单位）。例如，如果 `repeat` 是 2 且 `repeatDelay` 是 1，补间将首先播放，然后等待 1 秒后重复，再次播放后，再等待 1 秒后进行最后一次重复。您可以通过 `vars` 参数设置初始 `repeatDelay` 值，如：`gsap.to(obj, {duration: 1, x: 100, repeat: 2, repeatDelay: 1});`

此方法既作为获取器也作为设置器。省略参数时返回当前值（获取器），而定义参数则设置该值（设置器），并返回实例本身以便于链式调用，如 `myTween.repeat(2).yoyo(true).repeatDelay(0.5).play();`

### 参数（Parameters）

- **value**: Number
  - 可选参数，设置补间重复之间的延迟时间（以秒为单位）。

### 返回值（Returns）

- Number
  - 如果未提供参数，返回当前的重复延迟值。
- self
  - 如果提供了参数，返回实例本身以便于链式调用。

### 示例代码（Example Code）

```javascript
// 获取当前重复延迟值
var currentRepeatDelay = myTween.repeatDelay()

// 设置重复延迟为 2 秒
myTween.repeatDelay(2)
```
