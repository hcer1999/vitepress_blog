# GSAP中文文档 - gsap.globalTimeline()

`gsap.globalTimeline` 是 GSAP 中的根时间轴实例，它控制着 GSAP 中的所有动画，这使得它成为一次性影响所有动画的强大方式。然而，请注意，`gsap.delayedCalls()` 在技术上也是补间动画，所以如果你对全局时间轴执行 `pause()` 或 `timeScale()` 操作，它也会影响 `delayedCalls()`。如果你想排除这些补间动画，可以查看 `gsap.exportRoot()`。

以下是一些操作全局时间轴的示例代码：

```javascript
// 将全局时间轴的播放速度设置为正常速度的一半
gsap.globalTimeline.timeScale(0.5)

// 将全局时间轴的播放速度设置为正常速度的两倍
gsap.globalTimeline.timeScale(2)

// 获取当前全局时间轴的时间速率
var currentTimeScale = gsap.globalTimeline.timeScale()
```

这段代码展示了如何使用 `gsap.globalTimeline` 来控制 GSAP 中所有动画的播放速度。通过修改全局时间轴的时间速率，你可以一次性地加快或减慢所有动画的播放速度。

此外，`gsap.globalTimeline` 还提供其他控制方法，例如：

- `gsap.globalTimeline.pause()` - 暂停全局时间轴，影响所有动画。
- `gsap.globalTimeline.play()` - 继续播放全局时间轴，影响所有动画。
- `gsap.globalTimeline.paused()` - 如果全局时间轴已暂停，则返回 `true`；如果正在播放，则返回 `false`。

这些方法允许你以编程方式控制 GSAP 动画的全局播放状态。

::: tip
请注意，由于全局时间轴用于运行所有其他的补间动画和时间轴，因此 gsap.globalTimeline.isActive() 将始终返回 true，无论当前是否有任何补间动画或时间轴处于激活状态。
:::

::: tip
换句话说，全局时间轴始终处于活跃状态，因为它负责管理 GSAP 中的所有动画。即使当前没有正在播放的动画，全局时间轴仍然存在并准备运行新的动画。这个特性确保了全局时间轴始终可用于控制新的或现有的动画，无论它们何时开始或结束。
:::
