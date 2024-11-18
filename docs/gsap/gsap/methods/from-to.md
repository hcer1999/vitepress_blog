# GSAP中文文档 - gsap.fromTo()

## gsap.fromTo()

### 返回: Tween

`gsap.fromTo()` 函数允许您定义动画的**起始和结束**值。这与 `from()` 和 `to()` 函数不同，后两者分别使用当前状态作为起始或结束状态。当您需要完全控制动画，尤其是与其他动画串联时，这种方式非常有用。

#### 示例代码：

```javascript
// 将 ".box" 的透明度从 0 变化到 0.5
gsap.fromTo('.box', { opacity: 0 }, { opacity: 0.5, duration: 1 })
```

GSAP 可以动画化**任何对象的任何属性**，因此您**不仅限于** CSS 属性或 DOM 对象。

#### 控制 Tween 实例：

```javascript
let tween = gsap.fromTo('.class', { opacity: 0 }, { opacity: 0.8, duration: 1, ease: 'elastic' })

// 现在我们可以控制它
tween.pause()
tween.seek(2)
tween.progress(0.5)
tween.play()
```

Tween 默认会立即播放（尽管您可以设置 `delay` 或 `paused` 值），并且在完成时自动清理自身。您可以随意调用 `gsap.fromTo()`，不必担心清理问题。

#### 其他类型的补间动画：

- `to()` - 您定义要动画化到的**结束**值，GSAP 使用当前值作为起始值。
- `from()` - 您定义要动画化的**起始**值，GSAP 使用当前值作为目的地。

#### 参数：

1. **targets** - 您想要动画化的属性的对象。可以是选择器文本如 `".class"`, `"#id"` 等，或直接是对元素、普通对象或对象数组的引用。
2. **fromVars** - 包含初始（起始）属性/值对的对象。您**不**在这里放置特殊属性，如持续时间、延迟等 - 那些放在 `toVars` 中。
3. **toVars** - 包含要动画化的目标属性/值的对象，以及任何特殊属性，如 `ease`, `duration`, `delay` 或 `onComplete`。

#### 特殊属性：

您可以将以下任何一个添加到您的 `vars` 对象中，以赋予您的动画特殊能力：

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

以下是对 `gsap.fromTo()` 文档中剩余部分的详细解析：

### 插件（Plugins）

插件为 GSAP 的核心功能提供了额外的能力。一些插件简化了与渲染库（如 PIXI.js 或 EaselJS）的协作，而其他插件则增加了如 SVG 形状变形、拖放功能等高级功能。这种方式允许 GSAP 核心保持相对较小的体积，并且只在需要时添加功能。您可以在官方文档中查看所有插件的完整列表。

### 基于函数的值（Function-based values）

通过为任何值使用函数，您可以创建极具动态的动画效果。该函数将在补间动画第一次渲染时针对**每个目标**调用一次，由该函数返回的值将被用作实际的动画值。这对于应用条件逻辑或随机化元素非常有用（尽管 GSAP 也有内置的随机化功能）。

```javascript
gsap.fromTo(
  '.class',
  {
    x: 100, // 普通值
    y: function (index, target, targets) {
      // 基于函数的值
      return index * 50
    },
  },
  {
    x: 50,
    y: 0,
    duration: 1,
  },
)
```

该函数接收三个参数：

- **index** - 在数组中目标的索引。
- **target** - 目标本身（示例中的 `<div>` 元素）。
- **targets** - 目标数组（与 `tween.targets()` 相同）。

### 随机值（Random values）

您可以像 `"random(-100, 100)"` 这样定义一个范围的随机值，或像 `"random([red, blue, green])"` 这样定义一个数组的随机值，GSAP 将为**每个目标**相应地替换随机值。这使得创建高级随机化效果变得简单。您甚至可以设置随机数四舍五入到最接近的任何数字增量。

```javascript
gsap.fromTo(
  '.class',
  {
    x: 'random(-100, 100, 5)', // 为每个目标在 -100 和 100 之间选择一个随机数，四舍五入到最接近的 5
  },
  {
    x: 50,
  },
)
```

或者使用类似数组的值，GSAP 将随机选择其中之一：

```javascript
gsap.fromTo(
  '.class',
  {
    x: 'random([0, 100, 200, 500])', // 随机选择一个值（0, 100, 200, 或 500）
  },
  {
    x: 150,
  },
)
```

如果更喜欢直接使用，您也可以使用 `gsap.utils.random()` 函数。

### 错开（Staggers）

如果定义了多个目标，您可以通过设置一个值，如 `stagger: 0.1`（每个开始时间之间 0.1 秒的偏移）来轻松地错开每个目标的开始时间。或者您可以使用错开对象获得更高级的错开效果。

### 序列化（Sequencing）

对于基本的序列化，您可以在每个补间动画上使用 `delay`，但我们强烈推荐使用 `Timeline` 进行所有但最简单的序列化任务，因为它提供了更大的灵活性，尤其是在处理时间时。它允许您一个接一个地追加补间动画，然后整体控制整个序列。您甚至可以让您想要的补间动画重叠，尽可能深入地嵌套时间轴，等等。

时间轴还有方便的 to(), from(), 和 fromTo() 方法，以便您可以非常容易地将它们链接在一起并构建复杂的序列：

```javascript
let tl = gsap.timeline() // 创建时间轴
tl.fromTo('.class1', { x: 50 }, { x: 100 }) // 开始序列化
  .to('.class2', { y: 100, ease: 'elastic' })
  .to('.class3', { rotation: 180 })
```

::: tip 提示
**注意**：默认情况下，在 `fromTo()` 补间动画中，`immediateRender` 是 `true`，这意味着它们会立即呈现起始状态，不管指定了任何延迟。您可以通过在 `vars` 参数中传递 `immediateRender: false` 来覆盖此行为，以便它将等待直到补间动画实际开始时才呈现。
:::

### 回调（Callbacks）

回调是在补间动画或时间轴中发生特定事件（如开始、完成、重复、反向完成或更新）后调用的函数。它们对于调试、保持项目的不同部分同步等非常有用。

希望这次的解析更加全面和准确。如果您还有其他问题或需要进一步的帮助，请告诉我。
