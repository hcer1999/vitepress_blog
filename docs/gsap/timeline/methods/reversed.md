# GSAP中文文档 - timeline 方法 - 反转（reversed）

## 反转（reversed）

reversed 方法用于获取或设置动画的反转状态，指示动画是否应该反向播放。这个值不受 `yoyo` 重复的影响，也不考虑祖先时间轴的反转状态。例如，即使一个补间动画本身没有被反转，如果其父时间轴（或任何祖先时间轴）被反转了，它也可能看起来是反向播放的。

### 方法签名

```plaintext
reversed(value: Boolean): self
```

获取或设置动画的反转状态。

### 参数（Parameters）

- **value**: Boolean
  - 要设置的反转状态。如果为 `true`，则动画将反向播放。

### 返回值（Returns）

- self
  - 返回实例本身，便于链式调用。

### 详细信息（Details）

此方法既作为 getter 也作为 setter。省略参数时返回当前值（getter），定义参数时设置值（setter），并返回实例本身以便于链式调用。

### 示例代码（Example Code）

```javascript
// 获取当前的播放方向
var isReversed = tl.reversed()

// 将播放方向设置为反向
tl.reversed(true)

// 切换播放方向
tl.reversed(!tl.reversed())
```
