# GSAP中文文档 - gsap.ticker()

## gsap.ticker()

`gsap.ticker` 就像 GSAP 引擎的心跳一样 - 它在每个 `requestAnimationFrame` 事件上更新 `globalTimeline`，因此它与浏览器的渲染周期完美同步。您可以添加自己的监听器来在每次更新后运行自定义逻辑（对游戏开发者来说非常棒）。您可以添加任意数量的监听器。

### 基本示例

```javascript
// 添加监听器
gsap.ticker.add(myFunction)

function myFunction() {
  // 在核心引擎更新后的每个 tick 上执行
}

// 稍后移除监听器...
gsap.ticker.remove(myFunction)
```

### 回调参数

每个监听器函数都会接收以下参数：

1. **time**: _Number_ - 自 ticker 开始以来的总时间（以秒为单位）。ticker 的开始时间可能会因 `lagSmoothing` 被推后。
2. **deltaTime**: _Number_ - 自上一个 tick 以来经过的毫秒数。注意：您可以使用 `gsap.ticker.deltaRatio()` 来获取基于特定目标 FPS 的比率。
3. **frame**: _Number_ - 每个 tick 上递增的帧（tick）编号。

您的监听器函数可以像这样设置，以利用传递给它的参数：

```javascript
function myFunction(time, deltaTime, frame) {
  // 利用 time、deltaTime 和 frame
}
```

### .add() 高级选项

在 `gsap.ticker.add()` 中，您可以使用两个可选参数：

- **once**: _Boolean_ - 回调将只触发一次，然后自动被移除。
- **prioritize**: _Boolean_ - 回调将被添加到队列的顶部而不是底部，这意味着它会在当前队列中的任何监听器之前触发。如果您希望您的回调在 GSAP 的全局时间轴之前触发，这是非常完美的。

```javascript
// 在下一个 requestAnimationFrame 中调用 myCallback 一次，在全局时间轴更新之前。
gsap.ticker.add(myCallback, true, true)
```

_这些高级选项是在 GSAP 3.10.0 中添加的_

### 当标签页隐藏时的节流

当用户在浏览器中切换到不同的标签页时，ticker 的更新会显著减少，以节省电池电量和减少 CPU 负载（这是因为浏览器本身降低了 `requestAnimationFrame` 事件的调度）。通常 `requestAnimationFrame` 事件每秒发生大约 60 次，但这取决于浏览器，也取决于系统性能。一些现代设备以 120Hz（每秒 120 次）更新。如果不支持 `requestAnimationFrame`，则 ticker 自动回退到使用常规的 `setTimeout()` 循环。

### Ticker 属性

- **time**: _Number_ - 自 ticker 开始以来的总时间（以秒为单位）。ticker 的开始时间可能会因 `lagSmoothing` 被推后。
- **frame**: _Number_ - 每个 tick 上递增的帧（tick）编号。

### gsap.ticker.fps()

要将 ticker 限制在特定的帧率，您可以像这样使用 `fps()` 方法：

```javascript
// 将帧率限制为每秒 30 帧
gsap.ticker.fps(30)
```

由于不可能让浏览器加速原生的 `requestAnimationFrame` 事件（通常是每秒 60 帧），您不能像 `gsap.ticker.fps(100)` 那样做（嗯，您可以这样做，但它仍然以每秒大约 60 帧运行）。不过，您可以做 `gsap.ticker.fps(30)`，以便在必要时跳过节拍，以尽可能接近您设置的帧率（低于原生频率）。

### gsap.ticker.deltaRatio()（3.5.0 版本中添加）

`gsap.ticker.deltaRatio()` 方法返回自上一 tick 以来经过的时间作为基于特定目标 FPS 的比率。例如，如果您做 `gsap.ticker.deltaRatio(60)`，但实际上自上一 tick 以来经过的时间更像是以每秒 30 帧运行（也许事情变得拥堵了），它将返回 `2`，这样您就可以轻松设置动态调整帧率变化的循环，如下所示：

```javascript
gsap.ticker.add(function () {
  obj.x += 3 * gsap.ticker.deltaRatio(60) // 即使帧率波动，变化率也将始终保持一致
})
```

默认的 `fps` 参数是 60，所以除非您使用不同于 60fps 的其他值，否则您甚至不需要传递一个。例如，如果您希望基于每秒 30 帧运行的比率，您将做 `gsap.ticker.deltaRatio(30)`。

这里有一个 Blake Bowen 的演示。

### gsap.ticker.lagSmoothing()

`gsap.ticker.lagSmoothing()` 方法作为 GSAP 的延迟平滑的 getter 和 setter。

#### 当 CPU 拥堵并且呈现之间存在延迟时会发生什么？

例如，假设有一个应该立即开始的 2 秒补间动画，但 CPU 忙了整整一秒才能首次渲染该补间动画。大多数其他动画引擎（包括一些浏览器中的 CSS 动画）会将开始时间向前推以补偿，但这种方法有一个**主要**缺点：它牺牲了同步性，并且可能会破坏延迟，以至于当您尝试整齐地交错动画时，它们会成群/成组地出现。那不好。

GSAP 一直使用严格的时间模型，优先考虑完美的同步，这意味着在上面的例子中，补间动画将在最初的 1 秒延迟之后呈现为完成了一半。基本上，每个动画引擎都必须以某种方式支付延迟税 - 要么保持严格的时间和同步，要么四处滑动开始时间并失去同步。

`gsap.ticker.lagSmoothing()` 为您提供了两者的最佳选择，因为当 CPU 拥堵时，它在下一个 tick 上调整核心计时机制，这会影响**所有**动画，因此所有内容都保持**完美同步**。您可以设置阈值（以毫秒为单位），以便每当延迟**大于**该阈值时，引擎将调整内部时钟，使其表现得好像 `adjustedLag` 经过了。即使您在 `gsap` 上调用静态方法，这种调整也会影响 GSAP 中的所有内容（补间动画、`timeline` 和 `delayedCall`，因为它们都是由 GSAP 核心的单个计时机制驱动的）。

例如，如果 `threshold` 是 `500`，`adjustedLag` 是 `33`（这些是默认值），只有在两个 tick 之间超过 500ms 时，才会进行调整，在这种情况下，它将表现得好像只有 33ms 经过了。因此，如果 CPU 拥堵了整整 2 秒（天啊！），您的动画将在下一个渲染中移动 33ms 的时间，而不是跳跃整整 2 秒。**注意：** 这不影响设备的性能或真实帧率 - 这只影响 GSAP 在浏览器丢帧时的反应。

此功能**默认已激活**，使用 `threshold` 为 500ms 和 `adjustedLag` 为 33ms，但如果您想更改设置，可以这样做：

```javascript
// 当两个 tick 之间超过 1000ms 时进行补偿，然后让它表现得好像只有 16ms 经过了：
gsap.ticker.lagSmoothing(1000, 16)
```

### 为什么不将值设置得非常低，比如两个都设置为 10？

因为这样做不会留出太多的喘息空间，而且很自然地会让您的运动看起来像是在更慢地运行（因为从技术上讲，如果时间几乎在每次渲染时都被推前，它们确实在变慢）。还要注意，如果您有任何 `delayedCalls`，这些也会受到影响。这是一件好事 - 它确保您可以依赖它们与引擎的其余部分完全同步，但如果浏览器承受着巨大压力，并且每秒只渲染几个帧，那么看起来就好像时间真的在减慢，一个 2 秒的补间动画（或 `delayedCall`）实际上可能需要 8 秒才能完成。

在大多数现实世界的场景中，500 和 33 的默认值是理想的，因为它们可以防止浏览器/CPU 的重大中断，同时允许帧率的小幅度变化而不会不必要地减慢速度。

如果您想禁用延迟平滑，您可以简单地将其设置为 0，如 `gsap.ticker.lagSmoothing(0)`，这与将阈值设置为一个非常大的值以使其永远不会启动是一样的。
