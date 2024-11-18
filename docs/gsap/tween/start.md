# GSAP中文文档 - 补间动画（Tween）

Tween 是执行所有动画工作的实体 - 可以将其视为一个**高性能属性设置器**。您提供目标（您想要动画的对象）、持续时间以及您想要动画的任何属性，当其播放头移动到新位置时，它会计算出该点的属性值，并相应地应用它们。

**创建 Tween 的方法**（所有这些方法都返回一个 Tween 实例）：

- [gsap.to()](/gsap/gsap/methods/to)
- [gsap.from()](/gsap/gsap/methods/from)
- [gsap.fromTo()](/gsap/gsap/methods/from-to)

对于简单的动画，上述方法就足够了！例如：

```javascript
// 在 1 秒内旋转并移动具有 "box" 类的元素（"x" 是 translateX() 变换的快捷方式）。
gsap.to('.box', { rotation: 27, x: 100, duration: 1 })
```

<iframe src="https://codepen.io/GreenSock/pen/wvwEOZL" width="100%" height="400" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>

由于 GSAP 可以动画化任何对象的任何属性，您**不仅限于 CSS 属性或 DOM 对象**。尽情发挥。您可能会对 GSAP 能够动画化的事项数量以及它“就是能工作”感到惊讶。

您可以使用 `delay` 特殊属性进行基本的序列化，但 Timelines 使序列化和复杂的编排变得更加容易。Timeline 就像一个容器，可以容纳多个 Tween 实例（和/或其他 Timelines），您可以在时间上定位它们并将它们作为一个整体进行控制。有关详细信息，请参见 [Timeline 文档](#)。

要稍后控制 Tween 实例，请将其赋值给一个变量（GSAP 方便地面向对象）：

```javascript
let tween = gsap.to('.class', { rotation: 360, duration: 5, ease: 'elastic' })

// 现在我们可以控制它！
tween.pause()
tween.seek(2)
tween.progress(0.5)
tween.play()
```

<iframe src="https://codepen.io/GreenSock/pen/OJLgdyg" width="100%" height="400" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>

::: info

要简单地启动动画并让它们运行，无需使用变量。Tween 默认情况下会立即播放（尽管您可以设置 `delay` 或 `paused` 值），当它们完成后，它们会自动清理自己。随意调用 `gsap.to()`，不必担心清理。

:::

**参数**

1. **targets** - 您想要动画化属性的对象。这可以是像 `".class"`, `"#id"` 等选择器文本（GSAP 在内部使用 `document.querySelectorAll()`），也可以是元素的直接引用、通用对象，甚至是对象数组。
2. **vars** - 一个包含您想要动画化的所有属性/值的对象，以及任何特殊属性，如 `ease`, `duration`, `delay`, 或 `onComplete`（如下所列）。

## 特殊属性

| 属性                    | 描述                                                                                                                                                                                                                                                                                                            |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| callbackScope           | 用于所有回调（onStart, onUpdate, onComplete 等）的作用域。                                                                                                                                                                                                                                                      |
| data                    | 将任意数据分配给此属性（一个字符串，一个对象的引用，任何东西），它会附加到 tween 实例本身，以便您稍后可以像 `yourTween.data` 一样引用它。                                                                                                                                                                       |
| delay                   | 动画应该开始之前的延迟时间（以秒为单位）。                                                                                                                                                                                                                                                                      |
| duration                | 动画的持续时间（以秒为单位）。默认值：`0.5`。                                                                                                                                                                                                                                                                   |
| ease                    | 控制动画期间的变化率，赋予它特定的感觉。例如，`"elastic"` 或 `"strong.inOut"`。查看 [Ease Visualizer](#) 了解所有选项。`ease` 可以是一个字符串（最常见的）或是一个接受一个介于 0 和 1 之间的进度值并返回一个转换后的、标准化的值的函数。默认值：`"power1.out"`。                                                |
| id                      | 允许您（可选地）为您的 tween 实例分配一个唯一标识符，以便您稍后可以使用 `gsap.getById()` 找到它，并且它会在 GSDevTools 中以该 id 显示。                                                                                                                                                                         |
| immediateRender         | 通常，tween 会等到下一个更新周期（tick）才进行第一次渲染，除非您指定了延迟。设置 `immediateRender: true` 可以强制它在实例化时立即渲染。默认值：对于 to() tweens 是 `false`，对于 from() 和 fromTo() tweens 或任何具有 scrollTrigger 应用的 tweens 是 `true`。                                                   |
| inherit                 | 通常，tweens 会继承其父时间线的 `defaults` 对象（如果定义了的话），但您可以通过设置 `inherit: false` 在每个 tween 基础上禁用此行为。                                                                                                                                                                            |
| lazy                    | 当 tween 首次渲染并读取其起始值时，GSAP 会尝试将值的写入延迟到当前“tick”的最后，这可以提高性能，因为它避免了浏览器不喜欢的读写/读写布局破坏。要为特定 tween 禁用延迟渲染，请设置 `lazy: false`。在大多数情况下，没有必要设置 `lazy`。要了解更多信息，请观看此视频。默认值：`true`（零持续时间的 tweens 除外）。 |
| onComplete              | 当动画完成时调用的函数。                                                                                                                                                                                                                                                                                        |
| onCompleteParams        | 传递给 onComplete 函数的参数数组。例如，`gsap.to(".class", {x:100, onComplete:myFunction, onCompleteParams:["param1", "param2"]});`。                                                                                                                                                                           |
| onRepeat                | 每次动画进入新的迭代周期（重复）时调用的函数。显然，这只在您设置非零 `repeat` 时发生。                                                                                                                                                                                                                          |
| onRepeatParams          | 传递给 onRepeat 函数的参数数组。                                                                                                                                                                                                                                                                                |
| onReverseComplete       | 当动画从反向到达其开始时调用的函数（不包括重复）。                                                                                                                                                                                                                                                              |
| onReverseCompleteParams | 传递给 onReverseComplete 函数的参数数组。                                                                                                                                                                                                                                                                       |
| onStart                 | 当动画开始时调用的函数（当其时间从 0 变为其他值时，如果 tween 多次重启，这种情况可能会发生多次）。                                                                                                                                                                                                              |
| onStartParams           | 传递给 onStart 函数的参数数组。                                                                                                                                                                                                                                                                                 |
| onUpdate                | 每次动画更新时调用的函数（在移动其播放头的每个“tick”上）。                                                                                                                                                                                                                                                      |
| onUpdateParams          | 传递给 onUpdate 函数的参数数组。                                                                                                                                                                                                                                                                                |
| overwrite               | 如果为 `true`，则所有相同目标的 tweens 将立即被杀死，无论它们影响哪些属性。如果为 `"auto"`，则当 tween 第一次渲染时，它会寻找任何活动的动画中的冲突（影响相同目标的相同属性）并仅杀死其他 tweens 的**这些部分**。不冲突的部分保持不变。如果为 `false`，则不采用任何覆盖策略。默认值：`false`。                  |
| paused                  | 如果为 `true`，则动画将在创建后立即暂停。默认值：`false`。                                                                                                                                                                                                                                                      |
| repeat                  | 动画应该重复的次数。所以 `repeat: 1` 将播放总共两次迭代。默认值：`0`。`repeat: -1` 将无限重复。                                                                                                                                                                                                                 |
| repeatDelay             | 重复之间的等待时间（以秒为单位）。默认值：`0`。                                                                                                                                                                                                                                                                 |
| repeatRefresh           | 设置 `repeatRefresh: true` 会导致重复的 tween 在每次完整迭代（不包括 yoyo 的）时 `invalidate()` 并重新记录其起始/结束值。这在您使用动态值（相对的、随机的或基于函数的）时很有用。例如，`x: "random(-100, 100)"` 将在每次重复时获得一个新的随机 x 值。`duration`, `delay` 和 `stagger` 并不刷新。                |
| reversed                | 如果为 `true`，则动画将从其播放头反转开始，这意味着它将朝向其开始移动。由于播放头从 0 开始，因此反转的 tween 最初会**看起来**暂停，因为其播放头不能向后移动超过开始。                                                                                                                                           |
| runBackwards            | 如果为 `true`，则动画将反转其起始和结束值（这就是 from() tween 在内部做的），尽管 ease 不会被翻转。换句话说，您可以通过设置 `runBackwards: true` 将 `to()` tween 变成 `from()`。                                                                                                                                |
| stagger                 | 如果定义了多个目标，您可以通过设置像 `stagger: 0.1`（每个开始时间之间 0.1 秒）的值来轻松地错开开始时间。或者您可以使用 stagger 对象获得更高级的错开。更多信息，请参见 [stagger 文档](#)。                                                                                                                       |
| startAt                 | 为任何属性定义起始值（即使它们不进行动画化）。例如，`startAt: {x: -100, opacity: 0}`                                                                                                                                                                                                                            |

## 插件

插件为 GSAP 的核心添加了额外的功能。一些插件使得使用渲染库如 PIXI.js 或 EaselJS 更加容易，而其他插件则增加了如形变 SVG 形状、添加拖放功能等超能力。这使得 GSAP 核心保持相对小巧，并且只在需要时添加功能。[查看所有插件列表](#)。

## 基于函数的值

通过使用函数为任何值，您可以获得**非常动态的动画**，并且该函数将**在 tween 第一次渲染时**为每个目标调用一次，并且该函数返回的任何值将用作该值。这在应用条件逻辑或随机化事物时非常有用（尽管 GSAP 也有内置的随机化功能...向下滚动以获取更多信息）。

```javascript
gsap.to('.class', {
  x: 100, // 正常值
  y: function (index, target, targets) {
    // 基于函数的值
    return index * 50
  },
  duration: 1,
})
```

该函数传递三个参数：

1. index - 目标在数组中的索引。例如，如果有 3 个 `<div>` 元素具有 "box" 类，并且您 `gsap.to(".box", ...)`，则该函数将被调用 3 次（每个目标一次）；索引首先是 `0`，然后是 `1`，最后是 `2`。
2. target - 目标本身（本例中的 `<div>` 元素）
3. targets - 目标数组（与 `tween.targets()` 相同）

## 随机值

通过像 `"random(-100, 100)"` 这样的字符串定义随机值范围，或像 `"random([red, blue, green])"` 这样的字符串定义数组，GSAP 将为每个目标**相应地**替换一个随机值！这使得高级随机效果变得简单。您甚至可以有一个随机数字四舍五入到任何数字的最接近增量！例如：

```javascript
gsap.to('.class', {
  x: 'random(-100, 100, 5)', // 为每个目标选择一个介于 -100 和 100 之间的随机数字，四舍五入到最接近的 5！
})
```

或者使用数组样式的值，GSAP 将随机选择其中之一：

```javascript
gsap.to('.class', {
  x: 'random([0, 100, 200, 500])', // 随机选择一个值（0, 100, 200, 或 500）
})
```

还有一个 `gsap.utils.random()` 函数，如果您更喜欢直接使用。

## 相对值

使用 `"+="` 或 `"-="` 前缀来表示相对值。例如，`gsap.to(".class", {x:"-=20"});` 将使 `x` 动画比开始时**少** 20 像素。`{x:"+=20"}` 将**添加** 20。

## 交错

如果定义了多个目标，您可以通过设置像 `stagger: 0.1`（每个开始时间之间 0.1 秒）的值来轻松地错开（偏移）每个目标的开始时间。或者您可以使用 stagger 对象获得更高级的错开。更多信息，请参见 [stagger 文档](#)。

## 序列化

对于基本的序列化，您可以在每个 tween 上使用 `delay`（如 `gsap.to(".class", {delay: 0.5, duration: 1, x: 100})`），但我们**强烈**推荐使用 `Timeline` 进行所有但最简单的序列化任务，因为它提供了更大的灵活性，特别是当您在尝试时间控制时。它允许您一个接一个地追加 tweens，然后作为一个整体控制整个序列。您甚至可以让您想要的 tweens 重叠多少就重叠多少，尽可能深入地嵌套时间线，等等。

时间线还有方便的 to(), from(), 和 fromTo() 方法，所以您可以非常容易地将它们链接在一起并构建复杂的序列：

```javascript
let tl = gsap.timeline() // 创建时间线
tl.to('.class1', { x: 100 }) // 开始序列化
  .to('.class2', { y: 100, ease: 'elastic' })
  .to('.class3', { rotation: 180 })
```

## 关键帧

如果您发现自己一遍又一遍地动画化相同的目标，您绝对应该查看关键帧，这可以使您的代码更加简洁。它们还让您可以轻松地将动画从 CSS 动画移植过来。

了解更多关于 [关键帧](#) 的信息

## 注意事项 / 提示

- 您可以通过 `gsap.defaults({ease: ...})` 更改默认的 ease。默认值是 `"power1.out"`。
- 随时使用 `gsap.killTweensOf(yourObject)` 杀死特定对象的所有 tweens。您也可以使用选择器文本，如 `gsap.killTweensOf("#someID");`
- 如果您发现 GreenSock 工具有用，请考虑加入 [Club GSAP](#)，这不仅有助于维持持续开发，而且还让您获得仅限会员的额外插件、课程和其他福利。在俱乐部页面了解更多信息。

## 方法

| 方法                                                                             | 描述                                                                                                                                          |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| delay(value:Number) : [Number \| self]                                           | 获取或设置动画的初始延迟，即在动画开始前的时间长度（以秒为单位）。                                                                            |
| duration(value:Number) : [Number \| self]                                        | 获取或设置动画的持续时间，不包括任何重复或重复延迟。                                                                                          |
| endTime(includeRepeats:Boolean) : Number                                         | 返回动画将根据父时间线的本地时间完成的时间。                                                                                                  |
| eventCallback(type:String, callback:Function, params:Array) : [Function \| self] | 获取或设置事件回调，如 `"onComplete", "onUpdate", "onStart"` 或 `"onRepeat"` 以及应该传递给该回调的任何参数。                                 |
| globalTime(localTime:Number) : Number                                            | 将本地时间转换为 gsap.globalTimeline 上的对应时间（考虑所有嵌套、时间缩放等）。                                                               |
| invalidate() : self                                                              | [覆盖] 刷新任何内部记录的起始/结束值，如果您想重新启动动画而不想恢复到任何先前记录的起始值，这可能很有用。                                    |
| isActive() : Boolean                                                             | 指示动画是否当前处于活动状态（意味着虚拟播放头正在积极地移动跨这个实例的时间跨度，并且它没有暂停，也没有任何它的祖先时间线）。                |
| iteration() : [Number \| self]                                                   | 获取或设置 tween 的迭代（当前重复）次数。                                                                                                     |
| kill(target:Object, propertiesList:String) : self                                | 完全或部分杀死动画，取决于参数。要杀死意味着立即停止动画，将其从其父时间线中移除，并释放它以供垃圾收集。                                      |
| pause(atTime:Number, suppressEvents:Boolean) : self                              | 暂停实例，可选地跳转到特定时间。                                                                                                              |
| paused(value:Boolean) : [Boolean \| self]                                        | 获取或设置动画的暂停状态，这表明动画是否当前暂停。                                                                                            |
| play(from:Number, suppressEvents:Boolean) : self                                 | 开始向前播放，可选地从特定时间开始（默认情况下，播放从播放头当前所在位置开始）。                                                              |
| progress(value:Number, suppressEvents:Boolean) : [Number \| self]                | [覆盖] 获取或设置 tween 的进度，这是一个介于 0 和 1 之间的值，表示虚拟播放头的位置（不包括重复），其中 0 是在开始，0.5 是完成一半，1 是完成。 |
| repeat(value:Number) : [Number \| self]                                          | 获取或设置 tween 应该在其第一次迭代后重复的次数。                                                                                             |
| repeatDelay(value:Number) : [Number \| self]                                     | 获取或设置重复之间的时间长度（以秒为单位）。                                                                                                  |
| restart(includeDelay:Boolean, suppressEvents:Boolean) : self                     | 重新启动并从开始向前播放。                                                                                                                    |
| resume() : self                                                                  | 恢复播放，不改变方向（向前或向后）。                                                                                                          |
| reverse(from:\*, suppressEvents:Boolean) : self                                  | 反转播放，使所有动画方面向后，包括，例如，tween 的 ease。                                                                                     |
| reversed(value:Boolean) : [Boolean \| self]                                      | 获取或设置动画的反转状态，这表明动画是否应该向后播放。                                                                                        |
| revert() : Self                                                                  | 撤销动画并杀死它，将目标恢复到动画前的状态，包括移除动画添加的内联样式。                                                                      |
| seek(time:\*, suppressEvents:Boolean) : self                                     | 跳转到特定时间，不影响实例是否暂停或反转。                                                                                                    |
| startTime(value:Number) : [Number \| self]                                       | 获取或设置动画在父时间线上开始的时间（在定义的任何延迟之后）。                                                                                |
| targets() : Array                                                                |                                                                                                                                               |
| then(callback:Function) : Promise                                                | 返回一个承诺，以便您可以使用承诺来跟踪 tween 或时间线何时完成。                                                                               |
| time(value:Number, suppressEvents:Boolean) : [Number \| self]                    | [覆盖] 获取或设置播放头的本地位置（基本上是当前时间），不包括任何重复或重复延迟。                                                             |
| timeScale(value:Number) : [Number \| self]                                       | 用于缩放动画中的时间的因素，其中 1 = 正常速度（默认），0.5 = 半速，2 = 双倍速度等。                                                           |
| totalDuration(value:Number) : [Number \| self]                                   | [覆盖] 获取或设置 tween 的总持续时间（以秒为单位），包括任何重复或重复延迟。                                                                  |
| totalProgress(value:Number, suppressEvents:Boolean) : [Number \| self]           | [覆盖] 获取或设置 tween 的总进度，这是一个介于 0 和 1 之间的值，表示虚拟播放头的位置（包括重复），其中 0 是在开始，0.5 是完成一半，1 是完成。 |
| totalTime(time:Number, suppressEvents:Boolean) : [Number \| self]                | 获取或设置根据总持续时间的播放头位置，包括任何重复和重复延迟。                                                                                |
| yoyo(value:Boolean) : [Boolean \| self]                                          | 获取或设置 tween 的 yoyo 状态，其中 true 导致 tween 在每次重复时来回移动，交替向后和向前。                                                    |

## 属性

| 属性          | 描述                                                                                                                                                                                                                           |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| data          | 存储任何您想要的数据的地方（如果存在 `vars.data`，则最初由其填充）。                                                                                                                                                           |
| ratio         | **[只读]** Tween 的进度（一个介于 0 和 1 之间的值，其中 0.5 在中间）**之后**被 `ease` 运行。所以这个值可能超出 0-1 范围，像 `ease: "back"` 或 `ease: "elastic"` 的情况。它可以用作您自己的插值的乘数，如在 `onUpdate` 回调中。 |
| scrollTrigger | 一种方便的方式来访问与 tween 关联的 ScrollTrigger。这只在 tween 有 ScrollTrigger 时才能访问。                                                                                                                                  |
| vars          | 传递给构造函数的配置对象，其中包含您想要动画化的所有属性/值，以及任何可选的**特殊属性**，如 `onComplete`, `onUpdate` 等，如 `gsap.to(".class",{onComplete: func});`                                                            |
