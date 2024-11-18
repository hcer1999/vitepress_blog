# GSAP中文文档 - timeline 方法 - 跳转（seek）

## 跳转（seek）

seek 方法用于跳转到时间轴的特定时间（或标签），不影响实例是否暂停或反转。

### 方法签名

```plaintext
seek(position: Number | String, suppressEvents: Boolean): self
```

跳转到时间轴的特定时间（或标签），不影响实例是否暂停或反转。

### 参数（Parameters）

- **position**: Number | String

  - 要跳转的时间（以秒为单位）或标签。

- **suppressEvents**: Boolean
  - 默认值为 `true`。如果在移动播放头到新位置的过程中有事件/回调，它们将不会被触发，因为默认 `suppressEvents` 参数为 `true`。如果你不希望在最初的移动过程中抑制事件/回调，只需将 `suppressEvents` 参数设置为 `false`。

### 返回值（Returns）

- self
  - 返回实例本身，便于链式调用。

### 详细信息（Details）

跳转到时间轴的特定时间（或标签），不影响实例是否暂停或反转。

### 示例代码（Example Code）

```javascript
// 跳转到恰好2秒的位置
tl.seek(2)

// 跳转到恰好2秒的位置，但在最初的移动过程中不抑制事件
tl.seek(2, false)

// 跳转到 "myLabel" 标签的位置
tl.seek('myLabel')
```
