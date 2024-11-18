# GSAP中文文档 - timeline 方法 - 事件回调(eventCallback)

## 事件回调（eventCallback）

动画实例每个事件类型只能关联一个回调（一个 `onComplete`，一个 `onUpdate`，一个 `onStart` 等）。因此，设置新值将覆盖旧值。所有这些值也填充了最初传递给构造函数的 `vars` 对象（可以将其视为配置数据的存储位置）。

### 方法签名

```plaintext
eventCallback(type: String, callback: Function, params: Array): self
```

此方法既作为获取器也作为设置器。省略除第一个参数以外的所有参数返回当前值（获取器），而定义超过第一个参数的值设置该值（设置器）并返回实例本身以便于链式调用。

### 参数（Parameters）

- **type**: String
  - 事件类型，如 `onComplete`, `onUpdate`, `onStart` 等。
- **callback**: Function（可选）
  - 要关联的回调函数。
- **params**: Array（可选）
  - 传递给回调函数的参数数组。

### 返回值（Returns）

- self
  - 返回实例本身，便于链式调用。

## 详细信息（Details）

## 示例代码（Example Code）

```javascript
myAnimation
  .eventCallback('onComplete', completeHandler)
  .eventCallback('onUpdate', updateHandler, ['param1'])
  .play(1)
```
