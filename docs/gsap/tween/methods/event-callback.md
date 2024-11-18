# GSAP中文文档 - tween 方法 - 事件回调（eventCallback）

## 事件回调（eventCallback）

为 GSAP 动画设置或获取特定事件类型的回调函数。

### 参数（Parameters）

- **type**: String
  - 指定事件类型，如 `'onComplete'`, `'onUpdate'`, `'onStart'` 等。
- **callback**: Function（可选）
  - 要设置的回调函数。
- **params**: Array（可选）
  - 传递给回调函数的参数数组。

### 返回值（Returns）

- Function 或 self
  - 如果只提供了第一个参数，返回当前的回调函数（获取器）。
  - 如果提供了额外的参数，设置回调函数并返回实例本身以便于链式调用（设置器）。

### 详细信息（Details）

此方法既作为获取器也作为设置器。省略除第一个参数以外的所有参数返回当前值（获取器），而定义超过第一个参数的值设置该值（设置器），并返回实例本身以便于链式调用，如下所示：

### 示例代码（Example Code）

```javascript
myAnimation
  .eventCallback('onComplete', completeHandler)
  .eventCallback('onUpdate', updateHandler, ['param1'])
  .play(1)
```
