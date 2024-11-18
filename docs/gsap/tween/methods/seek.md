# GSAP中文文档 - tween 方法 - 跳转（seek）

## 跳转（seek）

跳转到特定时间，不影响实例是否暂停或反向播放。

如果在播放头原来的位置和新时间之间有任何事件/回调，它们将不会被触发，因为默认情况下 `suppressEvents`（第二个参数）是 `true`。想象一下，就像在唱片机上拿起唱针，移动到新位置后再放回唱片上。如果您不希望在最初的移动过程中抑制事件/回调，只需将 `suppressEvents` 参数设置为 `false`。

### 参数（Parameters）

- **time**: Number
  - 要跳转到的时间（以秒为单位）。
- **suppressEvents**: Boolean（可选）
  - 默认值为 `true`。如果设置为 `true`，则在跳转过程中不会触发任何事件/回调。

### 返回值（Returns）

- self
  - 返回实例本身，便于链式调用。

### 示例代码（Example Code）

```javascript
// 跳转到动画的确切2秒处
myAnimation.seek(2)

// 跳转到动画的确切2秒处，但在最初的移动过程中不抑制事件
myAnimation.seek(2, false)
```
