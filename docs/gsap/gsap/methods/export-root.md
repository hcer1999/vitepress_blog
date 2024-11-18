# GSAP中文文档 - gsap.exportRoot()

## gsap.exportRoot()

`gsap.exportRoot()` 无缝地将所有的补间动画、时间轴以及 [可选地] 延迟调用从根时间轴传输到一个新的时间轴，以便您可以在似乎全局的基础上执行高级任务，而不会影响导出后创建的补间动画/时间轴。

例如，想象一个游戏使用 GSAP 进行所有动画制作，在游戏的某个时刻，您想让一切慢下来至停止（动画化 `timeScale`），同时动画化一个新的弹出窗口到适当的位置：

```javascript
var tl = gsap.exportRoot()
gsap.to(tl, { duration: 0.5, timeScale: 0 })
// 这个补间动画不受影响，因为它是在导出后创建的。
gsap.fromTo(myWindow, { scaleX: 0, scaleY: 0 }, { duration: 1, scaleX: 1, scaleY: 1 })
```

然后，当您准备好时，可以通过将 `timeScale` 动画化回 1 来重新动画化事物。或者，您可以使用 `exportRoot()` 收集所有动画并 `pause()` 它们，然后动画化弹出屏幕（或任何其他内容）。然后 `resume()` 该实例甚至 `reverse()`。

您可以根据需要多次使用 `exportRoot()`；它所做的只是将所有松散的补间动画、时间轴和 delayedCalls 包装到一个时间轴中，该时间轴本身被放置在根上，所以如果您再次 `exportRoot()`，那个时间轴将被包装到另一个中，以此类推。事物可以嵌套得尽可能深。

**注意：** 完成的补间动画和时间轴会从 globalTimeline 中移除（用于自动垃圾回收），所以如果您在某个特定补间动画完成后 `exportRoot()`，它将不会被包含在导出中。

`gsap.exportRoot()` 是一个强大的工具，它允许您将现有的 GSAP 动画导出到一个新的时间轴中，这样您就可以对它们进行集中的控制，如暂停、恢复或反向播放，而不会影响导出之后创建的任何动画。这对于执行复杂的动画序列或在游戏中创建慢动作效果等场景特别有用。
