# GSAP中文文档 - tween 方法 - 反向播放（reverse）

## 反向播放（reverse）

反向播放使得动画的所有方面都向后播放，包括补间的缓动（ease）。这将导致实例的 `time` 和 `totalTime` 向零移动。您可以选择性地定义一个特定的时间来跳转后再反向播放（默认情况下，它从播放头当前所在位置开始反向播放）。调用 `reverse()` 还确保实例既不暂停也不反向。

### 参数（Parameters）

- **from**: Number 或 String（可选）
  - 指定从动画的特定时间或时间线实例的标签开始反向播放。
- **suppressEvents**: Boolean（可选）
  - 默认值为 `true`。如果设置为 `true`，则在跳转过程中不会触发任何事件/回调。

### 返回值（Returns）

- self
  - 返回实例本身，便于链式调用。

### 详细信息（Details）

要跳转到动画的末尾并从那里开始反向播放，使用 0 作为 "from" 参数，如 `reverse(0)`。

要检查实例是否被反向播放，使用 `reversed()` 方法，如 `if (myAnimation.reversed()) {...}`。

### 示例代码（Example Code）

```javascript
// 从播放头当前所在位置开始反向播放：
myAnimation.reverse()

// 从动画的确切2秒处开始反向播放：
myAnimation.reverse(2)

// 从动画的确切2秒处反向播放，但在最初的移动过程中不抑制事件：
myAnimation.reverse(2, false)

// 从动画的末尾开始反向播放：
myAnimation.reverse(0)

// 从动画结束前1秒开始反向播放：
myAnimation.reverse(-1)

// 翻转方向（如果是向前播放，将变为向后播放，如果是向后播放，将变为向前播放）：
if (myAnimation.reversed()) {
  myAnimation.play()
} else {
  myAnimation.reverse()
}

// 使用 reversed() 方法翻转方向（上述代码的更短版本）：
myAnimation.reversed(!myAnimation.reversed())
```
