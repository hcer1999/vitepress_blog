# GSAP中文文档 - timeline 方法 - 暂停状态（paused）

## 暂停状态（paused）

获取或设置动画的暂停状态，这表明动画当前是否处于暂停状态。这不考虑到祖先时间线。例如，一个未暂停的补间可能在其父时间线（或任何祖先时间线）被暂停时看起来是暂停的。暂停动画不会将其从父时间线中移除，但这会导致它不被计入父时间线的 `duration`/`totalDuration`。当动画完成时，它不会改变其暂停状态。

### 方法签名

```plaintext
paused(value: Boolean): [Boolean | self]
```

省略参数时返回当前值（获取器），而定义参数则设置该值（设置器），并返回实例本身以便于链式调用。

### 参数（Parameters）

- **value**: Boolean（可选）
  - 设置动画的暂停状态。

### 返回值（Returns）

- Boolean
  - 如果未提供参数，返回当前暂停状态。
- self
  - 如果提供了参数，返回实例本身以便于链式调用。

### 详细信息（Details）

在大多数情况下，使用 `pause()` 方法暂停动画，使用 `resume()` 恢复动画是最简单的。但要检查当前状态，您必须使用 `paused()` 方法。它也可以用于切换状态，例如 `myAnimation.paused( !myAnimation.paused() );`

您可以通过在 `vars` 参数中传递 `paused: true` 来初始设置 `paused` 状态。

## 示例代码（Example Code）

```javascript
// 获取当前暂停状态
var paused = tl.paused()

// 将暂停状态设置为 true（类似于 pause()）
tl.paused(true)

// 切换暂停状态
tl.paused(!tl.paused())
```
