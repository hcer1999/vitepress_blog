# gsap.from()

以下是对 `gsap.from()` 文档的完整解析和翻译：

### `gsap.from()` 返回：补间动画（Tween）

#### `from()` 和 `fromTo()`

快速概览，请查看 Snorkl.tv 的 "GSAP 3 Express" 课程中的视频 - 这是学习基础知识的最佳方式之一。

将 `gsap.from()` 想象成一种向后的补间动画，您可以定义动画的**起始**值，然后它将动画到当前状态，这非常适合用于屏幕上对象的动画，因为您可以设置它们最终看起来的样子，然后从其他地方**进入**动画。例如：

```javascript
// 将 ".class" 的透明度从 0 开始，y 位置从 100 开始（就像 transform: translateY(100px)）
// 动画到当前值（透明度为 1，y 位置为 0）。
gsap.from('.class', { opacity: 0, y: 100, duration: 1 })
```

<iframe src="https://codepen.io/GreenSock/pen/XWrGqvX" width="100%" height="500" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true"> </iframe>

由于 GSAP 可以动画化**任何**对象的**任何**属性，您**不**仅限于 CSS 属性或 DOM 对象。尽情发挥想象。您可能会对 GSAP 能够动画化多少事物并且“它就是可以工作”感到惊讶。

要稍后控制补间动画实例，请将其分配给变量（GSAP 方便地面向对象）：

```javascript
let tween = gsap.from('.class', {
  rotation: 360,
  duration: 5,
  ease: 'elastic',
})

// 现在我们可以控制它！
tween.pause()
tween.seek(2)
tween.progress(0.5)
tween.play()
```

要简单地启动动画并让它们运行，没有必要使用变量。补间动画默认会立即播放（尽管您可以设置 `delay` 或 `paused` 值），当它们完成时，它们会自动释放自己。随意调用 `gsap.from()`，不必担心清理。

然而，`from` 补间动画可能有点棘手。GSAP 中最常见的错误之一是误用它们。确保负责任地使用它们！

其他类型的补间动画：

- `to()` - 您定义要动画化到的**结束**值，GSAP 使用当前值作为起始值。
- `fromTo()` - 您定义**起始和结束**值。

### 参数

1. **targets** - 您想要动画化的属性的对象（们）。这可以是选择器文本，如 `".class"`, `"#id"` 等（GSAP 内部使用 `document.querySelectorAll()`）或者它可以直接是对元素、普通对象或甚至对象数组的直接引用。
2. **vars** - 一个对象，包含您想要动画化的所有属性/值，以及任何特殊属性，如 `ease`, `duration`, `delay` 或 `onComplete`（下面列出）。

### 特殊属性

将这些添加到您的 `vars` 对象中，以赋予您的动画特殊能力：

| 特殊属性                | 描述                                                                                         | 默认值                                                |
| ----------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| callbackScope           | 所有回调（如 onStart, onUpdate, onComplete 等）使用的作用域。                                | -                                                     |
| data                    | 分配任意数据到这个属性，它会被附加到补间动画实例本身，之后可以通过 `yourTween.data` 引用。   | -                                                     |
| delay                   | 动画开始之前的延迟量（以秒为单位）。                                                         | -                                                     |
| duration                | 动画的持续时间（以秒为单位）。                                                               | `0.5`                                                 |
| ease                    | 控制动画期间的速率变化，赋予它特定的感觉。例如，`"elastic"` 或 `"strong.inOut"`。            | `"power1.out"`                                        |
| id                      | 为您的补间动画实例分配一个唯一标识符，以便您可以使用 `gsap.getById()` 找到它。               | -                                                     |
| immediateRender         | 是否在实例化时立即渲染。如果为 `true`，则补间动画会立即渲染，即使设置了延迟。                | `false`（`to()`）<br>`true`（`from()` 和 `fromTo()`） |
| inherit                 | 是否从父时间轴的 `defaults` 对象继承。如果设置为 `false`，则禁用继承。                       | `true`                                                |
| lazy                    | 是否延迟值的写入以提高性能。如果为 `false`，则禁用延迟渲染。                                 | `true`（零持续时间的补间动画除外）                    |
| onComplete              | 动画完成时调用的函数。                                                                       | -                                                     |
| onCompleteParams        | 传递给 onComplete 函数的参数数组。                                                           | -                                                     |
| onInterrupt             | 动画被中断时调用的函数，比如在完成前被杀死。                                                 | -                                                     |
| onInterruptParams       | 传递给 onInterrupt 函数的参数数组。                                                          | -                                                     |
| onRepeat                | 每次动画进入新的迭代周期时调用的函数，仅当设置了非零的 `repeat` 时发生。                     | -                                                     |
| onRepeatParams          | 传递给 onRepeat 函数的参数数组。                                                             | -                                                     |
| onReverseComplete       | 动画从相反方向到达开头时调用的函数（不包括重复）。                                           | -                                                     |
| onReverseCompleteParams | 传递给 onReverseComplete 函数的参数数组。                                                    | -                                                     |
| onStart                 | 动画开始时调用的函数，如果补间动画多次重启，这种情况可能会发生多次。                         | -                                                     |
| onStartParams           | 传递给 onStart 函数的参数数组。                                                              | -                                                     |
| onUpdate                | 每次动画更新时调用的函数，在每个移动播放头的“tick”上。                                       | -                                                     |
| onUpdateParams          | 传递给 onUpdate 函数的参数数组。                                                             | -                                                     |
| overwrite               | 是否立即杀死同一目标的所有补间动画，或者在第一次渲染时寻找活动动画中的冲突并只杀死冲突部分。 | `false`                                               |
| paused                  | 是否在创建后立即暂停动画。                                                                   | `false`                                               |
| repeat                  | 动画应重复的次数，`repeat: 1` 将播放两次。使用 -1 进行无限重复。                             | `0`                                                   |
| repeatDelay             | 重复之间等待的时间量（以秒为单位）。                                                         | `0`                                                   |
| repeatRefresh           | 是否在每次完整迭代时刷新起始/结束值，对于使用动态值的情况很有用。                            | -                                                     |
| reversed                | 是否使动画从一开始就以播放头反向。                                                           | -                                                     |
| runBackwards            | 是否反转起始和结束值，相当于使 `to()` 补间动画变成 `from()`。                                | -                                                     |
| stagger                 | 如果定义了多个目标，可以设置开始时间的偏移，或者使用错开对象获得更高级的错开效果。           | -                                                     |
| startAt                 | 为任何属性定义起始值，即使它们没有动画化。                                                   | -                                                     |
| yoyo                    | 是否使动画在每次重复时以相反的方向运行，看起来来回移动。                                     | `false`                                               |
| yoyoEase                | 是否改变 yoyo 阶段的缓动，或者简单地反转补间动画的正常 `ease`。                              | `false`                                               |
| keyframes               | 使用关键帧数组来动画化目标到各种状态，每个关键帧都是一个 vars 对象，充当 `to()` 补间动画。   | -                                                     |

### 插件

插件为 GSAP 的核心增加了额外的功能。一些插件使使用渲染库（如 PIXI.js 或 EaselJS）变得更加容易，而其他插件增加了超级功能，如变形 SVG 形状，添加拖放功能等。这允许 GSAP 核心保持相对小巧，并让您只在需要时添加功能。在这里查看所有插件的完整列表。

### 基于函数的值

通过为任何值使用函数，并在补间动画第一次渲染时**每个目标**调用一次，返回的值将用作该值，从而获得难以置信的动态动画。这对于应用条件逻辑或随机化事物（尽管 GSAP 也有内置的随机化功能...向下滚动）非常有用。

```javascript
gsap.from('.class', {
  x: 100, // 普通值
  y: function (index, target, targets) {
    // 基于函数的值
    return index * 50
  },
  duration: 1,
})
```

该函数传递了三个参数：

1. index - 目标在数组中的索引。例如，如果有 3 个 `<div>` 元素具有 ".box" 类，并且您 `gsap.from(".box", ...)`，该函数将被调用 3 次（每个目标一次）；索引首先是 `0`，然后是 `1`，最后是 `2`。
2. target - 目标本身（在此示例中的 `<div>` 元素）。
3. targets - 目标数组（与 `tween.targets()` 相同）。

### 随机值

通过像 `"random(-100, 100)"` 这样的字符串定义随机值范围，或像 `"random([red, blue, green])"` 这样的数组，GSAP 将为**每个目标**相应地替换随机值！这使得高级随机化效果变得简单。您甚至可以设置随机数四舍五入到最接近的任何数字增量！例如：

```javascript
gsap.from('.class', {
  x: 'random(-100, 100, 5)', // 为每个目标在 -100 和 100 之间选择一个随机数，四舍五入到最接近的 5！
})
```

或者使用类似数组的值，GSAP 将随机选择其中之一：

```javascript
gsap.from('.class', {
  x: 'random([0, 100, 200, 500])', // 随机选择一个值（0、100、200 或 500）
})
```

还有一个 `gsap.utils.random()` 函数，如果您更喜欢，可以直接使用。

### 相对值

使用 `"+="` 或 `"-="` 前缀表示相对值。例如，`gsap.from(".class", {x: "-=20"});` 将使 `x` 比补间动画开始时少 20 像素动画。`{x: "+=20"}` 将**添加** 20。要在相对方式中使用变量，只需添加 `"+="` 或 `"-="` 前缀，如 `{x: "+=" + yourVariable}`。

### 错开

如果定义了多个目标，您可以通过设置一个值，如 `stagger: 0.1`（每个开始时间之间 0.1 秒的偏移）来轻松地错开每个目标的开始时间。或者您可以使用错开对象获得更高级的错开效果。有关更多信息，请查看错开文档。

### 序列化

对于基本序列化，您可以在每个补间动画上使用 `delay`（如 `gsap.from(".class", {` delay: 0.5, `duration: 1, x: 100})`），但我们**强烈**建议使用 `Timeline` 进行除最简单的序列化任务之外的所有任务，因为它为您提供了更大的灵活性，特别是当您在尝试控制时间时。它允许您一个接一个地追加补间动画，然后整体控制整个序列。您甚至可以让您想要的补间动画重叠，尽可能深入地嵌套时间轴，等等。

时间轴还有方便的 to(), from(), 和 fromTo() 方法，以便您可以非常容易地将它们链接在一起并构建复杂的序列：

```javascript
let tl = gsap.timeline() // 创建时间轴
tl.from('.class1', { x: 100 }) // 开始序列化
  .to('.class2', { y: 100, ease: 'elastic' })
  .to('.class3', { rotation: 180 })
```

::: tip
注意：默认情况下，在 `from()` 补间动画中，`immediateRender` 是 `true`，这意味着它们立即呈现起始状态，不管指定了任何延迟。您可以通过在 `vars` 参数中传递 `immediateRender: false` 来覆盖此行为，以便它将等待直到补间动画实际开始时才呈现（通常在插入到时间轴中时所需的行为）。因此，以下代码将立即将 `obj` 的 `opacity` 设置为 0，然后在 2 秒后，在 1.5 秒的过程中将透明度动画回到 1：
:::

```javascript
gsap.from(obj, { duration: 1.5, opacity: 0, delay: 2 })
```

### 回调

回调是在补间动画或时间轴中发生特定事件（如开始、完成、重复、反向完成或更新）后调用的函数。它们对于调试、保持项目的不同部分同步等非常有用。

回调和回调作用域

要了解更多关于 GSAP 的回调信息，请查看 Snorkl.tv 的 "GSAP 3 Express" 课程中的视频 - 这是学习 GSAP 3 基础知识的最佳方式之一。

希望这次的翻译和解释更加全面和准确。如果您还有其他问题或需要进一步的帮助，请告诉我。
