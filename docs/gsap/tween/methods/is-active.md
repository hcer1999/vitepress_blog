# GSAP中文文档 - tween 方法 - 激活状态（isActive）

## 激活状态（isActive）

返回动画是否当前处于激活状态（即虚拟播放头正在积极地移动过该实例的时间跨度，并且它没有被暂停，它的任何祖先时间线也没有被暂停）。

### 返回值（Returns）

- Boolean
  - 如果补间处于激活状态，则返回 `true`。否则返回 `false`。

### 详细信息（Details）

指示动画是否当前处于激活状态（即虚拟播放头正在积极地移动过该实例的时间跨度，并且它没有被暂停，它的任何祖先时间线也没有被暂停）。例如，如果一个补间正在中间补间，它是激活的，但在它完成后（或在它开始之前），它**不**是激活的。如果它被暂停，或者它被放置在一个被暂停的时间线内（或者它的任何祖先时间线被暂停），`isActive()` 将返回 `false`。如果播放头直接位于动画的开始时间上（即使它还没有完全渲染），这也被认为是“激活”。

您还可以检查 `timeline.progress()` 或 `timeline.totalProgress()`，但这些不考虑暂停状态或父时间线的播放头位置。

在下面的演示中，我们使用 `isActive()` 确保补间在激活时不能改变其方向。反复点击 **切换补间方向** 按钮，可以看到在盒子移动时点击被忽略。

<iframe src="https://codepen.io/GreenSock/pen/qBBYLqr" width="100%" height="400" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>

要获取所有激活的 GSAP 补间的数组，可以使用 `gsap.globalTimeline.getChildren().filter(tween => tween.isActive())`。
