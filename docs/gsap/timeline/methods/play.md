# GSAP中文文档 - timeline 方法 - 播放（play）

## 播放（play）

开始向前播放，可以选择性地从特定时间开始（默认情况下，播放从播放头当前所在位置开始）。这也确保实例既不暂停也不反向播放。

如果您定义了一个“从”时间（第一个参数，也可能是时间线实例的标签），播放头会立即移动到那里，如果在播放头原来的位置和新时间之间有任何事件/回调，它们将不会被触发，因为默认情况下 `suppressEvents`（第二个参数）是 `true`。想象一下，就像在唱片机上拿起唱针，移动到新位置后再放回唱片上。如果您不希望在最初的移动过程中抑制事件/回调，只需将 `suppressEvents` 参数设置为 `false`。

### 方法签名

```plaintext
play(from: Number | String, suppressEvents: Boolean): self
```

开始向前播放，可以选择性地从特定时间开始。

### 参数（Parameters）

- **from**: Number | String

  - 要开始播放的特定时间或标签。

- **suppressEvents**: Boolean（可选）
  - 默认值为 `true`。如果设置为 `false`，则在跳转过程中会触发事件/回调。

### 返回值（Returns）

- self
  - 返回实例本身，便于链式调用。

## 示例代码（Example Code）

```javascript
// 从播放头当前所在位置开始播放
tl.play()

// 从动画的确切2秒处开始播放
tl.play(2)

// 从动画的确切2秒处开始播放，但在最初的移动过程中不抑制事件
tl.play(2, false)
```

**注意：**如果时间线的 `timeScale` 在调用 `play()` 时正好为 0，它将被更改为 1（否则它不会播放）。如果您打算从 0 开始逐渐增加时间缩放，可以在调用 `play()` 之前将其设置为一个非常小的数字，如 `tl.timeScale(tl.timeScale() || 0.001).play()`，以避免它跳到 1。
