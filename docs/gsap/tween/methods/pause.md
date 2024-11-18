# GSAP中文文档 - tween 方法 - 暂停（pause）

## 暂停（pause）

暂停实例，可以选择性地跳转到特定时间。

如果您定义了要跳转到的时间（第一个参数，也可能是时间线实例的标签），播放头会立即移动到那里，如果在播放头原来的位置和新时间之间有任何事件/回调，它们将不会被触发，因为默认情况下 `suppressEvents`（第二个参数）是 `true`。想象一下，就像在唱片机上拿起唱针，移动到新位置后再放回唱片上。如果您不希望在最初的移动过程中抑制事件/回调，只需将 `suppressEvents` 参数设置为 `false`。

### 参数（Parameters）

- **time**: Number 或 String
  - 可选参数，指定跳转到动画的特定时间（以秒为单位）或时间线实例的标签。
- **suppressEvents**: Boolean
  - 可选参数，默认值为 `true`。如果设置为 `true`，则在跳转过程中不会触发任何事件/回调。

### 返回值（Returns）

- self（使链式调用更容易）

### 示例代码（Example Code）

```javascript
// 在播放头当前位置暂停：
myAnimation.pause()

// 跳转到动画的确切2秒处然后暂停：
myAnimation.pause(2)

// 跳转到动画的确切2秒处暂停，但在最初的移动过程中不抑制事件：
myAnimation.pause(2, false)
```
