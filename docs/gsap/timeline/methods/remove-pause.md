# GSAP中文文档 - timeline 方法 - 移除暂停（removePause）

## 移除暂停（removePause）

移除通过 `.addPause()` 方法添加到时间线上的暂停。

### 方法签名

```plaintext
removePause(position: [Number | Label]): self
```

移除通过 `.addPause()` 方法添加到时间线上的暂停。

### 参数（Parameters）

- **position**: [Number | Label]
  - 要移除暂停的时间（或标签）。

### 返回值（Returns）

- self
  - 返回实例本身，便于链式调用。

### 详细信息（Details）

从特定位置移除暂停，该暂停是通过 `addPause()` 添加到时间线上的。

## 示例代码（Example Code）

```javascript
var tl = gsap.timeline()
tl.to(obj, { duration: 1, x: 100 })

// 在时间线1秒处添加暂停
tl.addPause(1)

// 另一个动画
tl.to(obj, { duration: 1, opacity: 0 })

// 稍后移除暂停
tl.removePause(1)
```
