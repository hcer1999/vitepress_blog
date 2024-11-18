# GSAP中文文档 - tween 方法 - 播放（play）

## 播放（play）

开始向前播放，可以选择性地从特定时间开始（默认情况下，播放从播放头当前所在位置开始）。这也确保实例既不暂停也不反向播放。

如果您定义了一个“从”时间（第一个参数，也可能是时间线实例的标签），播放头会立即移动到那里，如果在播放头原来的位置和新时间之间有任何事件/回调，它们将不会被触发，因为默认情况下 `suppressEvents`（第二个参数）是 `true`。想象一下，就像在唱片机上拿起唱针，移动到新位置后再放回唱片上。如果您不希望在最初的移动过程中抑制事件/回调，只需将 `suppressEvents` 参数设置为 `false`。

### 参数（Parameters）

- **time**: Number 或 String
  - 可选参数，指定从动画的特定时间（以秒为单位）或时间线实例的标签开始播放。
- **suppressEvents**: Boolean
  - 可选参数，默认值为 `true`。如果设置为 `true`，则在跳转过程中不会触发任何事件/回调。

### 返回值（Returns）

- self（使链式调用更容易）

### 示例代码（Example Code）

```javascript
// 从播放头当前所在位置开始播放：
myAnimation.play()

// 从动画的确切2秒处开始播放：
myAnimation.play(2)

// 跳转到动画的确切2秒处并开始播放，但不抑制事件（即会触发旧的和新的播放头位置之间的任何回调）：
myAnimation.play(2, false)
```

:::warning 提示

如果补间的时间缩放（timeScale）在调用 `play()` 时正好为 0，它将被更改为 1（否则它不会播放）。如果您打算从 0 开始逐渐增加时间缩放，可以在调用 `play()` 之前将其设置为一个非常小的数字，如 `myAnimation.timeScale(myAnimation.timeScale() || 0.001).play()`，以避免它跳到 1。

:::
