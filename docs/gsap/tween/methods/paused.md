# GSAP中文文档 - tween 方法 - 暂停状态（paused）

## 暂停状态（paused）

省略参数时返回当前值（获取器），而定义参数则设置该值（设置器），并返回实例本身以便于链式调用。

获取或设置动画的暂停状态，这表明动画是否当前处于暂停状态。这不考虑到祖先时间线。例如，如果其父时间线（或任何祖先时间线）被暂停，一个实际上没有被暂停的补间可能看起来是暂停的。暂停动画不会将其从父时间线中移除，但这会导致它不被计入父时间线的 `duration`/`totalDuration`。当动画完成时，它不会改变其暂停状态。

在大多数情况下，使用 `pause()` 方法来暂停动画，使用 `resume()` 来恢复动画是最简单的。但要检查当前状态，您必须使用 `paused()` 方法。它也可以像 `myAnimation.paused( !myAnimation.paused() );` 这样用于切换。

您可以通过在 `vars` 参数中传递 `paused: true` 来初始设置 `paused` 状态。

此方法既作为获取器也作为设置器。省略参数时返回当前值（获取器），而定义参数则设置该值（设置器）并返回实例本身以便于链式调用，如 `myAnimation.paused(true).delay(2).timeScale(0.5);`

### 参数（Parameters）

- **value**: Boolean
  - 可选参数，设置动画的暂停状态。

### 返回值（Returns）

- self（使链式调用更容易）

### 示例代码（Example Code）

```javascript
// 获取当前暂停状态
var paused = myAnimation.paused()

// 将暂停状态设置为 true（类似于调用 pause()）
myAnimation.paused(true)

// 切换暂停状态
myAnimation.paused(!myAnimation.paused())
```
