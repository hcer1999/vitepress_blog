# GSAP中文文档 - tween 方法 - 悠悠效果（yoyo）

## 悠悠效果（yoyo）

获取或设置补间的悠悠状态，其中 `true` 导致补间在每次重复时来回移动，交替向后和向前。

### 参数（Parameters）

- **value**: Boolean
  - （默认值为 `false`）省略参数时返回当前值（获取器），而定义参数则设置该值（设置器）并返回实例本身以便于链式调用。

### 返回值（Returns）

- Boolean 或 self
  - 省略参数时返回当前值（获取器），定义参数时设置该值（设置器）并返回实例本身以便于链式调用。

### 详细信息（Details）

获取或设置补间的 `yoyo` 状态，其中 `true` 导致补间在每次 `repeat` 时来回移动，交替向后和向前。`yoyo` 与 `repeat` 一起工作，`repeat` 控制补间重复的次数，`yoyo` 控制每次重复是否交替方向。因此，要使补间悠悠，您必须将其 `repeat` 设置为非零值。悠悠对补间的 `reversed` 属性没有影响。

例如，如果 `repeat` 是 2 且 `yoyo` 是 `false`，它看起来像：开始 - 1 - 2 - 3 - 1 - 2 - 3 - 1 - 2 - 3 - 结束。但如果 `yoyo` 是 `true`，它看起来像：开始 - 1 - 2 - 3 - 3 - 2 - 1 - 1 - 2 - 3 - 结束。

您可以通过在 `vars` 参数中传递 `yoyo: true` 来初始设置 `yoyo` 属性，如：`gsap.to(obj, {duration: 1, x: 100, repeat: 1, yoyo: true});`

此方法既作为获取器也作为设置器。省略参数时返回当前值（获取器），而定义参数则设置该值（设置器），并返回实例本身以便于链式调用，如 `myAnimation.yoyo(true).repeat(3).timeScale(2).play(0.5);`

### 示例代码（Example Code）

```javascript
// 获取当前悠悠状态
var yoyo = myAnimation.yoyo()

// 将悠悠设置为 true
myAnimation.yoyo(true)
```
