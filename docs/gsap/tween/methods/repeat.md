# GSAP中文文档 - tween 方法 - 重复（repeat）

## 重复（repeat）

省略参数时返回当前值（获取器），而定义参数则设置该值（设置器），并返回实例本身以便于链式调用。

获取或设置补间在第一次迭代后应重复的次数。例如，如果 `repeat` 设置为 1，补间将总共播放两次（初始播放加上 1 次重复）。要无限重复，使用 -1。`repeat` 应始终为整数。

要使重复在正向和反向之间交替，将 `yoyo` 设置为 `true`。要在重复之间添加时间间隔，使用 `repeatDelay`。您可以通过 `vars` 参数设置初始重复值，如：`gsap.to(obj, {duration: 1, x: 100, repeat: 2});`

此方法既作为获取器也作为设置器。省略参数时返回当前值（获取器），而定义参数则设置该值（设置器），并返回实例本身以便于链式调用，如 `myTween.repeat(2).yoyo(true).play();`

### 参数（Parameters）

- **value**: Number
  - 可选参数，设置补间重复的次数。

### 返回值（Returns）

- Number
  - 如果未提供参数，返回当前重复次数。
- self
  - 如果提供了参数，返回实例本身以便于链式调用。

### 示例代码（Example Code）

```javascript
// 获取当前重复次数
var repeatCount = myTween.repeat()

// 设置重复次数为 2
myTween.repeat(2)
```
