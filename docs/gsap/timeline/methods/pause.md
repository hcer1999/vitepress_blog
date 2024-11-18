# GSAP中文文档 - timeline 方法 - 暂停（pause）

## 暂停（pause）

暂停动画，可以选择性地首先跳转到特定时间。

如果您定义了要跳转到的时间（第一个参数，也可能是时间线实例的标签），播放头会立即移动到那里并跳过播放头原来的位置和新时间之间的任何事件/回调（除非 `suppressEvents` 参数设置为 `false`）。想象一下，就像在唱片机上拿起唱针，移动到新位置后再放回唱片上。如果您希望在最初的移动过程中触发事件/回调，只需将 `suppressEvents` 参数设置为 `false`。

### 方法签名

```plaintext
pause(time: Number, suppressEvents: Boolean): self
```

暂停动画，可以选择性地跳转到特定时间。

### 参数（Parameters）

- **time**: Number（可选）

  - 要跳转到的时间（以秒为单位）或标签。

- **suppressEvents**: Boolean（可选）
  - 默认值为 `true`。如果设置为 `false`，则在跳转过程中会触发事件/回调。

### 返回值（Returns）

- self
  - 返回实例本身，便于链式调用。

## 示例代码（Example Code）

```javascript
// 在播放头当前位置暂停
tl.pause()

// 跳转到动画的确切2秒处然后暂停
tl.pause(2)

// 跳转到动画的确切2秒处暂停，但在最初的移动过程中不抑制事件
tl.pause(2, false)
```

注意，当动画（补间或时间线）嵌套在时间线内时，即使子动画被暂停，父时间线的播放头也会继续运行（[演示](https://codepen.io/GreenSock/pen/BaKogyg?editors=1000)）。在大多数情况下，您可能希望暂停父时间线。
