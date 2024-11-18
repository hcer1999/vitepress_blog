# GSAP中文文档 - timeline 方法 - 恢复（resume）

## 恢复（resume）

resume 方法用于恢复时间轴的播放，不改变播放方向（正向或反向）。

### 方法签名

```plaintext
resume(): self
```

恢复时间轴的播放，不改变播放方向（正向或反向）。

### 返回值（Returns）

- self
  - 返回实例本身，便于链式调用。

### 详细信息（Details）

恢复时间轴的播放，不改变播放方向（正向或反向）。

**注意：** 如果在调用 resume() 时时间轴的 timeScale 正好为 0，它将被更改为 1（否则它不会播放）。如果你打算从 0 开始缓动它，可以在调用 resume() 之前将其设置为一个非常小的数字，例如 `tl.timeScale(tl.timeScale() || 0.001).resume()`，这样它就不会跳到 1。
