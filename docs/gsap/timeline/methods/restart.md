# GSAP中文文档 - timeline 方法 - 重启（restart）

## 重启（restart）

restart 方法用于从时间轴的开始处重新开始播放。

### 方法签名

```plaintext
restart(includeDelay: Boolean, suppressEvents: Boolean): self
```

从时间轴的开始处重新开始播放。

### 参数（Parameters）

- **includeDelay**: Boolean

  - 默认值为 `false`。确定在重启时是否考虑任何已定义的延迟。

- **suppressEvents**: Boolean
  - 默认值为 `true`。如果为 `true`（默认值），在播放头移动到 `time` 参数定义的新位置时，不会触发任何事件或回调。

### 返回值（Returns）

- self
  - 返回实例本身，便于链式调用。

### 详细信息（Details）

从时间轴的开始处重新开始播放。

### 示例代码（Example Code）

```javascript
// 重启，不包括任何已定义的延迟
tl.restart()

// 重启，包括任何延迟，并且在最初回到时间0时不抑制事件
tl.restart(true, false)
```
