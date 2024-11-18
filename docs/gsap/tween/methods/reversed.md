# GSAP中文文档 - tween 方法 - 反向状态（reversed）

## 反向状态（reversed）

省略参数时返回当前值（获取器），而定义参数则设置该值（设置器），并返回实例本身以便于链式调用。

获取或设置动画的反向状态，这表明动画是否应该反向播放。这个值不受 `yoyo` 重复的影响，也不考虑祖先时间线的反向状态。例如，如果其父时间线（或任何祖先时间线）被反向，一个实际上没有被反向的补间可能看起来是反向的。

此方法既作为获取器也作为设置器。省略参数时返回当前值（获取器），而定义参数则设置该值（设置器），并返回实例本身以便于链式调用。

### 参数（Parameters）

- **value**: Boolean（可选）
  - 设置动画的反向状态。

### 返回值（Returns）

- Boolean
  - 如果未提供参数，返回当前的反向状态。
- self
  - 如果提供了参数，返回实例本身以便于链式调用。

### 示例代码（Example Code）

```javascript
// 获取当前方向
var rev = myAnimation.reversed()

// 将方向设置为反向
myAnimation.reversed(true)

// 切换方向
myAnimation.reversed(!myAnimation.reversed())
```
