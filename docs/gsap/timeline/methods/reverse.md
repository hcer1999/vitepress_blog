# GSAP中文文档 - timeline 方法 - 反转（reverse）

## 反转（reverse）

reverse 方法用于反转动画的播放方向，包括缓动函数等所有方面。这将导致实例的 `time` 和 `totalTime` 向零移动。你可以选择性地定义一个特定的时间点来跳转并开始反转（默认情况下，它从播放头当前所在的位置开始反向播放）。调用 `reverse()` 还确保实例既不暂停也不反向。

### 方法签名

```plaintext
reverse(from: ?, suppressEvents: Boolean): self
```

反转动画的播放方向，包括缓动函数等所有方面。

### 参数（Parameters）

- **from**: ?

  - 可选参数，指定跳转到哪个特定时间点后再开始反转。默认情况下，它从播放头当前所在的位置开始反向播放。

- **suppressEvents**: Boolean
  - 默认值为 `true`。如果在移动播放头到新位置的过程中有事件/回调，它们将不会被触发，因为默认 `suppressEvents` 参数为 `true`。

### 返回值（Returns）

- self
  - 返回实例本身，便于链式调用。

### 详细信息（Details）

- 要跳转到动画的确切末尾并从那里开始反向播放，使用 `reverse(0)`。

- 要检查实例是否被反转，使用 `reversed()` 方法，例如 `if (myAnimation.reversed()) {...}`。

- 如果你定义了一个 "from" 时间（第一个参数，对于时间轴实例也可能是一个标签），播放头会立即移动到那里，如果在播放头原来的位置和新时间之间有任何事件/回调，它们将不会被触发，因为默认 `suppressEvents` 参数为 `true`。如果你不希望在最初的移动过程中抑制事件/回调，只需将 `suppressEvents` 参数设置为 `false`。

### 示例代码（Example Code）

```javascript
// 从播放头当前所在的位置开始反向播放：
tl.reverse()

// 从动画的确切2秒处开始反向播放：
tl.reverse(2)

// 从动画的确切2秒处开始反向播放，但在最初的移动过程中不抑制事件：
tl.reverse(2, false)

// 从动画的确切末尾开始反向播放：
tl.reverse(0)

// 从动画结束前1秒处开始反向播放：
tl.reverse(-1)

// 如果当前是正向播放，则切换为反向播放；如果是反向播放，则切换为正向播放：
if (tl.reversed()) {
  tl.play()
} else {
  tl.reverse()
}

// 使用 reversed() 方法切换方向（上述代码的更短版本）：
tl.reversed(!tl.reversed())
```
