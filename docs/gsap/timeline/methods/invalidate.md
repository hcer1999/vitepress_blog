# GSAP中文文档 - timeline 方法 - 使无效（invalidate）

## 使无效（invalidate）

清除所有子补间的初始化数据（如记录的起始/结束值），这在您想要重新启动时间线而不恢复到任何先前记录的起始值时非常有用。当您对动画调用 `invalidate()` 时，它将在下一次渲染时重新初始化，并且它的 `vars` 对象将被重新解析。动画的定时（持续时间、开始时间、延迟）将不受影响。

### 方法签名

```plaintext
invalidate(): self
```

[覆盖] 清除任何内部记录的起始/结束值，这在您想要重新启动动画而不恢复到任何先前记录的起始值时非常有用。

### 返回值（Returns）

- self
  - 返回实例本身，便于链式调用。

### 详细信息（Details）

清除所有子补间的初始化数据（如记录的起始/结束值），这在例如您想要重新启动时间线而不恢复到任何先前记录的起始值时非常有用。当您对动画调用 `invalidate()` 时，它将在下一次渲染时重新初始化，并且它的 `vars` 对象将被重新解析。动画的定时（持续时间、开始时间、延迟）将不受影响。

例如，假设 `element.x` 是 0，然后您执行 `tl.to(element, {duration: 2, x: "+=100"})`。它将在 2 秒内从 0 动画到 100。如果您 `restart()` 那个补间，它将完全相同（从 0 动画到 100）。但是，假设在那个补间运行一次后，您想要清除内部记录的起始/结束值，以便 x 动画到比它现在的位置（在这个例子中是 100）多 100。如果我们现在对那个时间线（或补间）调用 `invalidate()`，它将在下一次渲染时重新解析起始/结束值，从而使它将 x 从 100 动画到 200。

当您使时间线无效时，它会自动使所有子元素无效。

注意：如果您只想在补间每次重复时无效，您可以使用补间的 `repeatRefresh: true` 特殊属性。

<iframe src="https://www.youtube.com/embed/p1MAs-P_APk?si=500" width="100%" height="500" frameborder="0" allowfullscreen></iframe>

## 示例代码（Example Code）

```javascript
// 使时间线及其所有子补间无效
tl.invalidate()
```

<iframe src="https://codepen.io/GreenSock/pen/ZEzajvN" width="100%" height="500" frameborder="0" allowfullscreen></iframe>
