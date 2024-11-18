# GSAP中文文档 - timeline 方法 - 补间动画从...到...（tweenFromTo）

## 补间动画从...到...（tweenFromTo）

tweenFromTo 方法用于创建一个线性补间动画，该动画将播放头从特定的时间或标签擦除到另一个时间或标签，然后停止。

### 方法签名

```plaintext
tweenFromTo(fromPosition: [Number | Label], toPosition: [Number | Label], vars: Object): Tween
```

创建一个线性补间动画，该动画将播放头从特定的时间或标签擦除到另一个时间或标签。

### 参数（Parameters）

- **fromPosition**: [Number | Label]

  - 时间轴开始播放的起始时间（秒）或标签。

- **toPosition**: [Number | Label]

  - 时间轴结束播放的目标时间（秒）或标签。

- **vars**: Object
  - 默认值为 `null`。一个可选的 vars 对象，将被传递给 Tween 实例。这允许你定义 `onComplete`、`ease`、`delay` 或任何其他 Tween 特殊属性。

### 返回值（Returns）

- Tween
  - 处理时间轴在指定时间和标签之间补间的 Tween 实例。

### 详细信息（Details）

创建一个线性补间动画，该动画将播放头从特定的时间或标签擦除到另一个时间或标签，然后停止。如果你计划顺序播放多个播放头补间动画，使用 `tweenFromTo()` 比 `tweenTo()` 更好，因为它允许立即确定持续时间，确保后续追加到序列中的补间动画被适当地定位。例如，要使时间轴从标签 "myLabel1" 播放到 "myLabel2"，然后从 "myLabel2" 回到开始（0 时间），只需这样做：

```javascript
var master = gsap.timeline()
master.add(tl.tweenFromTo('myLabel1', 'myLabel2'))
master.add(tl.tweenFromTo('myLabel2', 0))
```

如果你想对补间动画进行高级控制，比如添加 `onComplete` 或更改 `ease` 或添加 `delay`，只需传入一个带有适当属性的 vars 对象。

例如，要从开始（0）补间到时间轴上的 5 秒位置，然后调用名为 `myFunction` 的函数并传入一个引用此时间轴的参数，并使用 `strong` 缓动，你会这样做：

```javascript
tl.tweenFromTo(0, 5, {
  onComplete: myFunction,
  onCompleteParams: [tl],
  ease: 'strong',
})
```

请记住，这个方法只是创建一个补间动画，补间你时间轴的 `time()`。所以你可以存储对该补间动画的引用，如果需要，可以随时 `kill()` 它。

还要注意，`tweenFromTo()` 不影响时间轴的 `reversed` 属性。所以如果你的时间轴正常定向（未反转），并且你补间到一个先于当前时间的时间或标签，它将看起来向后播放，但 `reversed` 属性不会更改为 true。

另外请注意，`tweenFromTo()` 在补间其 `time()` 之前会立即暂停时间轴，并且在补间完成后不会自动恢复。如果需要恢复播放，可以随时使用 onComplete 调用 `resume()` 方法。

像 GSAP 中所有从类型的方法一样，默认情况下 `immediateRender` 是 `true`，这意味着时间轴会立即跳转到 "from" 时间/标签，除非你设置 `immediateRender: false`（像 `.tweenFromTo(1, 5, {immediateRender: false})`）。
