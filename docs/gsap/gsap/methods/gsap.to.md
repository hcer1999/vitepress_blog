# gsap.to()

最常见的动画类型是 `to()` 补间，因为它允许您定义目标值（大多数人会考虑对某些值进行动画处理）：

```js
// 旋转并移动具有 "box" 类的元素
// ("x" 是 translateX() 变换的简写) 1 秒内完成动画
gsap.to('.box', { rotation: 27, x: 100, duration: 1 })
```

<iframe src="https://codepen.io/GreenSock/pen/wvwEOZL" width="100%" height="400" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>

GSAP 自动计算出当前值（您不需要定义起始值，但可以在 `fromTo()` 补间中定义）。由于 GSAP 可以为任何对象的任何属性设置动画，因此您不仅限于 CSS 属性或 DOM 对象。您可能会惊讶于有多少东西可以用 GSAP 制作动画并且它“正常工作”。

要稍后控制 Tween 实例，请将其分配给一个变量（GSAP 很方便地面向对象）：

```js
let tween = gsap.to(".class", {rotation: 360, duration: 5, ease: "elastic"});

// 现在我们可以控制它！
tween.pause();
tween.seek(2);
tween.progress(0.5);
tween.play();
...
```

<iframe src="https://codepen.io/GreenSock/pen/OJLgdyg" width="100%" height="300" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>

要简单地触发动画并让它们运行，不需要使用变量。默认情况下，补间会立即播放（尽管您可以设置 `delay` 或 `paused` 值），并且当它们完成时，它们会自动处理掉自己。您可以根据需要多次调用 `gsap.to()` ，而无需担心清理问题。

其他类型的补间：

- `from()` - 您定义“from”动画的起始值，GSAP 使用当前值作为目标（就像向后运行的补间动画）
- `fromTo()` - 您定义起始值和结束值。

## 参数

1. **目标** - 您想要为其属性设置动画的对象。这可以是选择器文本，如 ".class" 、 "#id" 等（GSAP 在内部使用 `document.querySelectorAll()` ），也可以是对元素、通用对象甚至是对象数组的直接引用。
2. **vars** - 包含要设置动画的所有属性/值的对象，以及任何特殊属性，例如 `ease` 、 `duration` 、 `delay` 或 `onComplete`。

## 特殊属性

将其中任何一个添加到您的 `vars` 对象中，以赋予您的动画特殊能力：

| 特殊属性                | 描述                                                                                         | 默认值                                                |
| ----------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| callbackScope           | 所有回调（如 `onStart`，`onUpdate`，`onComplete` 等）使用的作用域。                          | -                                                     |
| data                    | 分配任意数据到这个属性，它会被附加到补间动画实例本身，之后可以通过 `yourTween.data` 引用。   | -                                                     |
| delay                   | 动画开始之前的延迟量（以秒为单位）。                                                         | -                                                     |
| duration                | 动画的持续时间（以秒为单位）。                                                               | `0.5`                                                 |
| ease                    | 控制动画期间的速率变化，赋予它特定的感觉。例如，`"elastic"` 或 `"strong.inOut"`。            | `"power1.out"`                                        |
| id                      | 为您的补间动画实例分配一个唯一标识符，以便您可以使用 `gsap.getById()` 找到它。               | -                                                     |
| immediateRender         | 是否在实例化时立即渲染。如果为 `true`，则补间动画会立即渲染，即使设置了延迟。                | `false`（`to()`）<br>`true`（`from()` 和 `fromTo()`） |
| inherit                 | 是否从父时间轴的 `defaults` 对象继承。如果设置为 `false`，则禁用继承。                       | `true`                                                |
| lazy                    | 是否延迟值的写入以提高性能。如果为 `false`，则禁用延迟渲染。                                 | `true`（零持续时间的补间动画除外）                    |
| onComplete              | 动画完成时调用的函数。                                                                       | -                                                     |
| onCompleteParams        | 传递给 `onComplete` 函数的参数数组。                                                         | -                                                     |
| onInterrupt             | 动画被中断时调用的函数，比如在完成前被杀死。                                                 | -                                                     |
| onInterruptParams       | 传递给 `onInterrupt` 函数的参数数组。                                                        | -                                                     |
| onRepeat                | 每次动画进入新的迭代周期时调用的函数，仅当设置了非零的 `repeat` 时发生。                     | -                                                     |
| onRepeatParams          | 传递给 `onRepeat` 函数的参数数组。                                                           | -                                                     |
| onReverseComplete       | 动画从相反方向到达开头时调用的函数（不包括重复）。                                           | -                                                     |
| onReverseCompleteParams | 传递给 `onReverseComplete` 函数的参数数组。                                                  | -                                                     |
| onStart                 | 动画开始时调用的函数，如果补间动画多次重启，这种情况可能会发生多次。                         | -                                                     |
| onStartParams           | 传递给 `onStart` 函数的参数数组。                                                            | -                                                     |
| onUpdate                | 每次动画更新时调用的函数，在每个移动播放头的“tick”上。                                       | -                                                     |
| onUpdateParams          | 传递给 `onUpdate` 函数的参数数组。                                                           | -                                                     |
| overwrite               | 是否立即杀死同一目标的所有补间动画，或者在第一次渲染时寻找活动动画中的冲突并只杀死冲突部分。 | `false`                                               |
| paused                  | 是否在创建后立即暂停动画。                                                                   | `false`                                               |
| repeat                  | 动画应重复的次数，`repeat: 1` 将播放两次。使用 `-1` 进行无限重复。                           | `0`                                                   |
| repeatDelay             | 重复之间等待的时间量（以秒为单位）。                                                         | `0`                                                   |
| repeatRefresh           | 是否在每次完整迭代时刷新起始/结束值，对于使用动态值的情况很有用。                            | -                                                     |
| reversed                | 是否使动画从一开始就以播放头反向。                                                           | -                                                     |
| runBackwards            | 是否反转起始和结束值，相当于使 `to()` 补间动画变成 `from()`。                                | -                                                     |
| stagger                 | 如果定义了多个目标，可以设置开始时间的偏移，或者使用错开对象获得更高级的错开效果。           | -                                                     |
| startAt                 | 为任何属性定义起始值，即使它们没有动画化。                                                   | -                                                     |
| yoyo                    | 是否使动画在每次重复时以相反的方向运行，看起来来回移动。                                     | `false`                                               |
| yoyoEase                | 是否改变 yoyo 阶段的缓动，或者简单地反转补间动画的正常 `ease`。                              | `false`                                               |
| keyframes               | 使用关键帧数组来动画化目标到各种状态，每个关键帧都是一个 `vars` 对象，充当 `to()` 补间动画。 | -                                                     |

## 插件

插件为 GSAP 的核心添加了额外的功能。有些插件可以更轻松地使用 PIXI.js 或 EaselJS 等渲染库，而其他插件则添加超能力，例如变形 SVG 形状、添加拖放功能等。这使得 GSAP 核心保持相对较小，并且仅在以下情况下才允许添加功能：你需要它们。请在此处查看插件的完整列表。

## 基于功能的值

通过对任何值使用函数来获得令人难以置信的动态动画，并且在第一次补间渲染时，每个目标都会调用一次该函数，并且该函数返回的任何内容都将用作该值。这对于应用条件逻辑或随机化事物非常有用（尽管 GSAP 也内置了随机化功能......向下滚动即可查看）。

```js
gsap.to('.class', {
  x: 100, // 普通值
  y: function (index, target, targets) {
    // 基于函数的值
    return index * 50
  },
  duration: 1,
})
```

该函数传递三个参数：

1. **index** - 数组中目标的索引。例如，如果有 3 个 `<div>` 类为“.box”的元素，并且您 `gsap.to(".box", ...)` ，则该函数将被调用 3 次（每个目标一次）；索引首先是 0 ，然后是 1 ，最后是 2 。
2. **target** - 目标本身（本例中的 `<div>` 元素）
3. **targets** - 目标数组（与 `tween.targets()` 相同）

## 随机值

将随机值定义为字符串，例如表示范围的 `"random(-100, 100)"` 或表示数组的 `"random([red

, blue, green])"` ，GSAP 将为每个目标相应地交换随机值！这使得高级随机效应变得简单。您甚至可以将随机数四舍五入到任何数字最接近的增量！例如：

```js
gsap.to('.class', {
  // 为每个目标选择一个 -100 到 100 之间的随机数，四舍五入到最接近的 5！
  x: 'random(-100, 100, 5)',
})
```

或者使用类似数组的值，GSAP 将随机选择其中之一：

```js
gsap.to('.class', {
  x: 'random([0, 100, 200, 500])', // 随机选择其中一个值 (0, 100, 200, 或 500)
})
```

如果您愿意，还有一个 `gsap.utils.random()` 函数可以直接使用。

## 相对值

使用 "+=" 或 "-=" 前缀来指示相对值。例如， `gsap.to(".class", {x:"-=20"});` 将为 x 制作比补间开始时少 20 像素的动画。 `{x:"+=20"}` 将添加 20。要以相对方式使用变量，只需添加 "+=" 或 "-=" 前缀，例如 `{x: "+=" + yourVariable}` 。

## 交错

如果定义了多个目标，您可以通过设置像 `stagger: 0.1` 这样的值（每个开始时间之间间隔 0.1 秒）轻松地交错（偏移）每个目标的开始时间。或者您可以通过使用获得更高级的交错一个交错的物体。有关更多信息，请参阅[交错文档](https://greensock.com/docs/v3/Staggers)。

## 序列

对于基本排序，您可以在每个补间上使用 `delay` （例如 `gsap.to(".class", { delay: 0.5, duration: 1, x: 100})` ），但我们强烈建议使用[时间线](https://greensock.com/docs/v3/GSAP/Timeline)。

时间线还具有方便的 `to()`、`from()` 和 `fromTo()` 方法，因此您可以轻松地将它们链接在一起并构建复杂的序列：

```js
let tl = gsap.timeline() // 创建时间线
tl.to('.class1', { x: 100 }) // 开始排序
  .to('.class2', { y: 100, ease: 'elastic' })
  .to('.class3', { rotation: 180 })
```

## 关键帧

如果您发现自己一遍又一遍地对同一目标进行动画处理，那么您一定应该查看[关键帧](https://greensock.com/docs/v3/GSAP/Keyframes)，它可以使您的代码更加简洁。它们还可以让您轻松地从 CSS 动画移植动画。

了解更多关于[关键帧](https://greensock.com/docs/v3/GSAP/Keyframes)的信息。

## 回调

回调是在补间或时间轴中发生某些事件（例如开始、完成、重复、反向完成或更新时）后调用的函数。它们对于调试、保持项目的不同部分同步以及许多其他事情非常有用。
