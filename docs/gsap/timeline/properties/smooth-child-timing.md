# GSAP中文文档 - timeline 属性 - 平滑子补间（smoothChildTiming）

## 平滑子补间（smoothChildTiming）

控制子补间和时间线是否在属性动态更改时自动重新定位（更改它们的 `startTime`）以保持平滑播放。

## 详细信息（Details）

控制子补间和时间线是否在属性动态更改时自动重新定位（更改它们的 `startTime`）以保持平滑播放。

例如，想象时间线的播放头位于一个已完成75%的子补间上，该补间将 `obj.x` 从0移动到100，然后调用该补间的 `reverse()` 方法。如果 `smoothChildTiming` 设置为 `false`（默认值，除了根时间线外），补间将在原地翻转，保持其 `startTime` 一致。因此，时间线的播放头现在将在补间的25%完成点而不是75%。记住，时间线的播放头位置和方向不受子补间/时间线更改的影响。`obj.x` 将从75跳到25，但补间在时间线中的位置将保持一致。

然而，如果 `smoothChildTiming` 设置为 `true`，那么子补间的 `startTime` 将被调整，以便时间线的播放头与 `reverse()` 被调用之前立即的同一位置（75%完成）相交，从而使播放看起来完美平滑。`obj.x` 仍然是75，并且随着播放头的移动，它将继续从那里开始，但由于补间现在被反转了，`obj.x` 将向0而不是100移动。最终，这是一个在优先考虑平滑的即时播放（`true`）和子补间和时间线的一致位置（`false`）之间的决策。

一些可能影响 `startTime` 的属性/方法示例（当 `smoothChildTiming` 设置为 `true` 时）：`reversed`, `timeScale`, `progress`, `totalProgress`, `time`, `totalTime`, `delay`, `pause`, `resume`, `duration`, 和 `totalDuration`。

`gsap.globalTimeline` 的 `smoothChildTiming` 设置为 `true`。
