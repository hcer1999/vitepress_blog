# GSAP中文文档 - tween 方法 - 继续播放（resume）

## 继续播放（resume）

继续播放而不改变方向（向前或反向）。

### 返回值（Returns）

- self
  - 为了更容易的链式调用。

### 详细信息（Details）

继续播放而不改变方向（向前或反向）。

**注意：**如果补间的时间缩放（timeScale）在调用 `resume()` 时正好为 0，它将被更改为 1（否则它不会播放）。如果您打算从 0 开始逐渐增加时间缩放，可以在调用 `resume()` 之前将其设置为一个非常小的数字，如 `myAnimation.timeScale(myAnimation.timeScale() || 0.001).resume()`，以避免它跳到 1。
