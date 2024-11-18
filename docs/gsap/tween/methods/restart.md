# GSAP中文文档 - tween 方法 - 重新开始（restart）

## 重新开始（restart）

### 参数（Parameters）

- **includeDelay**: Boolean

  - （默认值为 `false`）确定在重新开始时是否考虑延迟（如果有）。例如，如果一个补间有一个1秒的延迟，如 `gsap.to(obj, {duration: 2, x: 100, delay: 1});` 然后稍后调用 `restart()`，它将立即开始，但 `restart(true)` 将导致延迟被考虑，因此它将在1秒后才开始。

- **suppressEvents**: Boolean
  - （默认值为 `true`）如果为 `true`（默认值），当播放头移动到 `time` 参数定义的新位置时，不会触发任何事件或回调。

### 返回值（Returns）

- self
  - 返回实例本身，便于链式调用。

### 详细信息（Details）

重新开始并从开头向前播放。

### 示例代码（Example Code）

```javascript
// 重新开始，不包括任何已定义的延迟
myAnimation.restart()

// 重新开始，包括任何延迟，并在最初回到时间0时不抑制事件
myAnimation.restart(true, false)
```
