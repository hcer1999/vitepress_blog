# 时间线（Timeline）

时间线是一个强大的序列化工具，它作为补间和其他时间线的容器，使得控制它们作为一个整体变得简单，并精确管理它们的时间。没有时间线，构建复杂的序列会更加繁琐，因为您需要为每个动画使用 `delay`。例如：

### 无时间线（仅使用带有延迟的补间）

```javascript
gsap.to('#id', { x: 100, duration: 1 })
gsap.to('#id', { y: 50, duration: 1, delay: 1 }) // 等待1秒
gsap.to('#id', { opacity: 0, duration: 1, delay: 2 }) // 等待2秒
```

如果您想使第一个动画更长怎么办？您需要调整之后的所有延迟。如果您想要 `pause()` 整个序列或 `restart()` 它或 `reverse()` 它或在运行时重复它两次怎么办？这可能会变得相当混乱，但 GSAP 的时间线使其变得非常简单：

### 有时间线（更干净，更通用）

```javascript
var tl = gsap.timeline({ repeat: 2, repeatDelay: 1 });
tl.to("#id", { x: 100, duration: 1 });
tl.to("#id", { y: 50, duration: 1 });
tl.to("#id", { opacity: 0, duration: 1 });

// 然后我们可以轻松控制整个序列...
tl.pause();
tl.resume();
tl.seek(1.5);
tl.reverse();
...
```

现在我们可以调整时间，而不用担心延迟的连锁变化！增加第一个补间的持续时间，一切都会自动调整。

## 快速概览

快速了解 GSAP 时间线的概览，请查看 Snorkl.tv 提供的 "GSAP 3 Express" 课程中的视频 - 这是学习 GSAP 3 基础知识的最佳方式之一。

<iframe width="100%" height="500" src="https://www.youtube.com/embed/L2BsDjK03B4?si=BzOGkxIDU51mV9eG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## 在时间线上定位动画

默认情况下，动画被添加到时间线的 `末尾`，以便它们一个接一个地顺序播放，但您可以使用位置参数精确控制它们的位置。它通常在 `vars` 参数之后使用，并且具有以下灵活的语法选项：

- `绝对时间`（以秒为单位），从时间线的开始测量，作为一个 `数字`，如 `3`

```javascript
// 从时间线的开始正好插入3秒
tl.to('.class', { x: 100 }, 3)
```

- `标签`，如 `"someLabel"`。如果标签不存在，它将被添加到时间线的末尾。

```javascript
// 在 "someLabel" 标签处插入
tl.to('.class', { x: 100 }, 'someLabel')
```

- `"<"` 前一个动画的 `开始`。将 `<` 视为指向前一个动画开始的指针。

```javascript
// 在前一个动画的开始处插入
tl.to('.class', { x: 100 }, '<')
```

- `">"` 前一个动画的 `结束`。将 `>` 视为指向前一个动画结束的指针。

```javascript
// 在前一个动画的结束处插入
tl.to('.class', { x: 100 }, '>')
```

- 一个复杂的字符串，其中 `"+="` 和 `"-="` 前缀表示 `相对` 值。当一个数字跟随 `<` 或 `">"` 时，它被解释为相对的，所以 `"<2"` 与 `"<+=2"` 相同。示例：

  - `"+=1"` - 比时间线结束早1秒（创建间隙）
  - `"-=1"` - 比时间线结束晚1秒（重叠）
  - `"myLabel+=2"` - 比标签 `"myLabel"` 晚2秒
  - `"<+=3"` - 比前一个动画的开始晚3秒
  - `"<3"` - 与 `"<+=3"` 相同（见上文）（当跟随 `<` 或 `">"` 时，`"+="` 是隐含的）
  - `">-0.5"` - 比前一个动画的结束早0.5秒。就像说 "前一个动画的结束加上 -0.5"

- 一个基于 `百分比` 的复杂字符串。当紧跟 `"+="` 或 `"-="` 前缀时，百分比是基于 `被插入动画` 的总持续时间。当紧跟 `<` 或 `">"` 时，它是基于 `前一个动画` 的总持续时间。注意：总持续时间包括重复/悠悠。示例：

  - `"-=25%"` - 与时间线结束重叠，重叠部分为插入动画总持续时间的25%
  - `"+=50%"` - 超过时间线结束，超过部分为插入动画总持续时间的50%，创建间隙
  - `"<25%"` - 从前一个动画的开始25%处。与 `">-75%"` 相同，即从前一个动画的结束处负75%
  - `"<+=25%"` - 从前一个动画的开始处插入动画总持续时间的25%。与 `"<25%"` 不同，后者的百分比是基于前一个动画的总持续时间，而任何紧跟 `"+="` 或 `"-="` 的都基于插入动画的总持续时间。
  - `"myLabel+=30%"` - 从标签 `"myLabel"` 处插入动画总持续时间的30%

- 基于百分比的值是在 GSAP 3.7.0 中添加的

**“前一个动画”** 指的是最近插入的动画，而不一定是最接近时间线末尾的动画。

### 位置参数交互式演示

---

<iframe src="https://codepen.io/GreenSock/pen/PopXddg" width="100%" height="600" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>

## 特殊属性和回调

将这些添加到您的 vars 对象中，以给您的动画赋予特殊能力：

```javascript
gsap.timeline({
  onComplete: myFunction,
  repeat: 2,
  repeatDelay: 1,
  yoyo: true,
})
```

| 参数                    | 类型   | 描述                                                                                                                                                                                                                                                                                                                                                                                                                |
| ----------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| autoRemoveChildren      | 布尔值 | 如果设置为 `true`，则子补间/时间线完成后将自动被杀死/移除。这通常不是您想要的，因为它阻止了向后时间（比如如果您想 `reverse()` 或设置进度较低等）。然而，它可以提高速度和内存管理。根时间线使用 `autoRemoveChildren: true`。                                                                                                                                                                                         |
| callbackScope           | 对象   | 用于所有回调（`onStart`、`onUpdate`、`onComplete` 等）的作用域。作用域是回调内部 `this` 引用的对象。                                                                                                                                                                                                                                                                                                                |
| defaults                | 对象   | 一个简单的方式设置默认值，这些默认值会被子动画继承。详见 “defaults” 部分。                                                                                                                                                                                                                                                                                                                                          |
| delay                   | 数字   | 动画开始前的延迟时间，以秒为单位。                                                                                                                                                                                                                                                                                                                                                                                  |
| onComplete              | 函数   | 当动画完成时应该调用的函数。                                                                                                                                                                                                                                                                                                                                                                                        |
| onCompleteParams        | 数组   | 传递给 `onComplete` 函数的参数数组。例如，`gsap.timeline({onComplete: myFunction, onCompleteParams: ["param1", "param2"]});`。                                                                                                                                                                                                                                                                                      |
| onInterrupt             | 函数   | 当动画被中断时调用的函数。注意，如果动画正常完成，则不会触发此事件。                                                                                                                                                                                                                                                                                                                                                |
| onInterruptParams       | 数组   | 传递给 `onInterrupt` 函数的参数数组。例如，`gsap.to(".class", {x:100, onInterrupt:myFunction, onInterruptParams:["param1", "param2"]});`。                                                                                                                                                                                                                                                                          |
| onRepeat                | 函数   | 每次动画重复时应该调用的函数。                                                                                                                                                                                                                                                                                                                                                                                      |
| onRepeatParams          | 数组   | 传递给 `onRepeat` 函数的参数数组。例如，`gsap.timeline({onRepeat: myFunction, onRepeatParams: ["param1", "param2"]});`。                                                                                                                                                                                                                                                                                            |
| onReverseComplete       | 函数   | 当动画从反向到达开始时应该调用的函数。例如，如果调用了 `reverse()`，则补间会向开始移动，当其 `time` 达到 `0` 时，`onReverseComplete` 将被调用。如果动画被放置在一个时间线实例中，并且播放动画反向到达（或超过）开始，也会发生这种情况。                                                                                                                                                                             |
| onReverseCompleteParams | 数组   | 传递给 `onReverseComplete` 函数的参数数组。例如，`gsap.timeline({onReverseComplete: myFunction, onReverseCompleteParams: ["param1", "param2"]});`。                                                                                                                                                                                                                                                                 |
| onStart                 | 函数   | 当动画开始时（当其 `time` 从 `0` 变为其他值时）应该调用的函数。                                                                                                                                                                                                                                                                                                                                                     |
| onStartParams           | 数组   | 传递给 `onStart` 函数的参数数组。例如，`gsap.timeline({onStart: myFunction, onStartParams: ["param1", "param2"]});`。                                                                                                                                                                                                                                                                                               |
| onUpdate                | 函数   | 每次动画更新时（在动画活动期间的每帧）应该调用的函数。                                                                                                                                                                                                                                                                                                                                                              |
| onUpdateParams          | 数组   | 传递给 `onUpdate` 函数的参数数组。例如，`gsap.timeline({onUpdate: myFunction, onUpdateParams: ["param1", "param2"]});`。                                                                                                                                                                                                                                                                                            |
| paused                  | 布尔值 | 如果为 `true`，则动画将在创建后立即暂停。                                                                                                                                                                                                                                                                                                                                                                           |
| repeat                  | 数字   | 动画在第一次迭代后应重复的次数。例如，如果 `repeat` 是 `1`，则动画将总共播放两次（初始播放加上1次重复）。要无限重复，请使用 `-1`。`repeat` 应始终为整数。                                                                                                                                                                                                                                                           |
| repeatDelay             | 数字   | 重复之间的时间，以秒为单位。例如，如果 `repeat` 是 `2` 且 `repeatDelay` 是 `1`，则动画将首先播放，然后等待1秒再重复，然后再次播放，然后再等待1秒再进行最后一次重复。                                                                                                                                                                                                                                                |
| repeatRefresh           | 布尔值 | 设置 `repeatRefresh: true` 会导致重复时间线在每次完整迭代（不包括悠悠）时 `invalidate()` 其所有子补间，并在内部重新记录它们的起始/结束值。这在您使用动态值（相对的、随机的或基于函数的）时很有用。例如，`x: "random(-100, 100)"` 将在每次重复时获得一个新的随机 x 值。`duration`、`delay` 和 `stagger` 不会刷新。                                                                                                   |
| smoothChildTiming       | 布尔值 | 控制子动画是否自动重新定位（更改它们的 `startTime`）以在运行时更改属性时保持平滑播放。例如，想象时间线的播放头在一个孩子补间上，该补间完成了 75%，移动元素的左边从 0 到 100，然后调用该补间的 `reverse()` 方法。如果 `smoothChildTiming` 是 `false`（默认值，除了全局时间线外），补间将在原地翻转，保持其 `startTime` 一致。因此，时间线的播放头现在将在补间的 25% 完成点而不是 75%。详见 "时间线如何工作？" 部分。 |
| yoyo                    | 布尔值 | 如果为 `true`，则每隔一次重复周期将朝相反方向运行，使补间看起来来回移动（先前然后后）。这不会直接影响 `reversed` 属性。所以如果 `repeat` 是 `2` 且 `yoyo` 是 `false`，它看起来像：开始 - 1 - 2 - 3 - 1 - 2 - 3 - 1 - 2 - 3 - 结束。但如果 `yoyo` 是 `true`，它看起来像：开始 - 1 - 2 - 3 - 3 - 2 - 1 - 1 - 2 - 3 - 结束。                                                                                           |

## 设置默认值

在时间线的 `defaults` 对象中的任何内容都会被其子动画继承，当它们被创建时，所以如果您发现自己一次又一次地设置相同的 `ease` 或 `duration`（或任何值），这可以帮助使您的代码更简洁。例如：

```javascript
// 无默认值（长）
var tl = gsap.timeline()
tl.to('.class1', { rotation: -270, duration: 1, ease: 'elastic' })
  .to('.class2', { rotation: -360, duration: 1, ease: 'elastic' })
  .to('.class3', { rotation: -180, duration: 1, ease: 'elastic' })

// 有默认值（短）
var tl = gsap.timeline({ defaults: { duration: 1, ease: 'elastic' } })
tl.to('.class1', { rotation: -270 }) // 子补间将继承父时间线的持续时间和效果！
  .to('.class2', { rotation: -360 })
  .to('.class3', { rotation: -180 })
```

您以这种方式设置的任何默认值都会被推入每个子补间 - 它不仅限于某个特定的属性子集。继承的默认值随时可以被子动画上的属性声明覆盖。

## 嵌套

在时间线内嵌套时间线，深度不限。这使您可以模块化代码并使其更易于维护。例如，您可以按部分构建动画，并将它们缝合在主时间线中，如下所示：

```javascript
function intro() {
  var tl = gsap.timeline()
  //...在这里添加动画...
  return tl
}

function middle() {
  var tl = gsap.timeline()
  //...在这里添加动画...
  return tl
}

function conclusion() {
  var tl = gsap.timeline()
  //...在这里添加动画...
  return tl
}

// 将它们缝合在主时间线中...
var master = gsap.timeline()
master
  .add(intro())
  .add(middle(), '+=2') // 用2秒的间隔
  .add(conclusion(), '-=1') // 重叠1秒
```

## 其他时间线特性

- 使用其 `timeScale()` 方法加速或减慢整个时间线。您甚至可以对其进行补间，以平滑地逐渐加速或减慢动画！

- 使用其 `progress()` 或 `totalProgress()` 方法获取或设置时间线的进度（`totalProgress()` 只包括任何重复）。例如，要跳到半路，设置 `myTimeline.progress(0.5);`。

- 对 `time()`, `totalTime()`, `progress()`, 或 `totalProgress()` 进行补间，以快进或倒带时间线。您甚至可以将滑块附加到其中一个，使用户能够拖动向前或向后穿过时间线。

- 使用构造函数的 `vars` 对象添加 `onComplete`, `onStart`, `onUpdate`, `onRepeat` 和/或 `onReverseComplete` 回调，如 `var tl = gsap.timeline({onComplete: myFunction});`。

- 将时间线设置为重复任何次数或无限重复。您甚至可以设置每个重复周期之间的延迟，和/或使重复周期悠悠，看起来每隔一个周期就反转方向。

- 使用 `currentLabel()` 或使用 `nextLabel()` 和 `previousLabel()` 在时间线的各个位置找到标签。

**示例代码：**

```javascript
//create the timeline that repeats 3 times with 1 second between each repeat and then call myFunction() when it completes
var tl = gsap.timeline({ repeat: 3, repeatDelay: 1, onComplete: myFunction })

//add a tween
tl.to('.class', { duration: 1, x: 200, y: 100 })

//add another tween 0.5 seconds after the end of the timeline (makes sequencing easy)
tl.to('#id', { duration: 0.8, opacity: 0 }, '+=0.5')

//reverse anytime
tl.reverse()

//Add a "spin" label 3-seconds into the timeline
tl.addLabel('spin', 3)

//insert a rotation tween at the "spin" label (you could also define the insertion point as the time instead of a label)
tl.to('.class', { duration: 2, rotation: '+=360' }, 'spin')

//go to the "spin" label and play the timeline from there
tl.play('spin')

//nest another timeline inside your timeline...
var nested = gsap.timeline()
nested.to('.class2', { duration: 1, x: 200 })
tl.add(nested, '+=3') //add nested timeline after a 3-second gap
```

## 时间线如何工作？

每个动画（补间和时间线）都放置在父时间线上。从某种意义上说，它们都有自己的播放头（它的 "time" 指的就是这个，或者 "totalTime"，除了包括重复和重复延迟外，其他都是相同的），当父播放头移动到新位置时，它也会更新子播放头。当时间线在特定时间渲染时，它会循环遍历其子元素，并说 "好的，你应该渲染就像你的播放头在 \_\_\_\_" 如果那个子元素是一个有时间线和子元素的时间线，它也会对其子元素做同样的事情，一直这样下去。所以播放头通常保持同步。

当您取消暂停动画（`resume()` 或 `play()`）时，它本质上是拿起播放头并移动它，使其内部播放头与父播放头在那一刻的位置同步，从而使播放完美平滑。除非时间线的 `smoothChildTiming` 是 `false`，在这种情况下，那个子元素不会移动 - 其 `startTime` 将保持锁定在原来的位置。

所以基本上当 `smoothChildTiming` 是 `true` 时，引擎会实时重新排列事物，以确保播放头对齐，使播放感觉无缝和平滑。当您 `reverse()` 或更改 `timeScale` 等时，也会发生同样的事情 - 动画的 `startTime` 自动调整。但有时您可能不希望这种行为 - 那就是 `smoothChildTiming: false` 在父时间线上很有用的时候。

再多一个例子：假设您有一个 10 秒的补间，它正好坐在根时间线上，您已经进行了 2 秒的补间。假设它正好在根上从 0 开始，以使这个例子简单，当它在 2 秒时，您执行 `tween.seek(5)`。根的播放头不受影响 - 它继续像往常一样进行，但在为了让那个补间跳到 5 秒并适当播放，补间的 `startTime` 被更改为 -3。这样，补间的播放头和根播放头就完全对齐了。

## 注意事项

- 您可以通过 `gsap.globalTimeline` 访问 GSAP 的全局时间线，但要小心，因为如果，例如，您暂停它或调整它的时间缩放，那会影响一切，包括延迟调用。您可以使用 `gsap.exportRoot()` 代替，基本上将所有现有的根动画（可选地排除延迟调用）包装成一个新的时间线实例，将这些与您将来创建的动画隔离开来。例如，如果您在游戏进行中有很多动画，然后用户点击一个按钮弹出一个模态窗口，应该将所有游戏动画速度减慢到原来的 1/10...但您希望模态动画以全速运行，这是使用 `exportRoot()` 的完美案例。

## 属性

| 属性                                        | 描述                                                                                           |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `autoRemoveChildren` : Boolean              | 如果 `true`，则子补间和时间线完成后将自动被移除。                                              |
| `data` : \*                                 | 一个存储任何您想要的数据的地方（如果存在 `vars.data`，则最初由其填充）。                       |
| `labels` : Object                           | 存储已添加到时间线的任何标签。                                                                 |
| `parent` : Timeline                         | 动画所附加的父时间线。任何不在您创建的时间线中的东西，默认都放在 `gsap.globalTimeline` 上。    |
| `scrollTrigger`: ScrollTrigger \| undefined | 一个方便的方式来访问与时间线相关联的 ScrollTrigger。这只在时间线有 ScrollTrigger 时才能访问。  |
| `smoothChildTiming` : Boolean               | 控制子补间和时间线是否自动重新定位（更改它们的 `startTime`）以在运行时更改属性时保持平滑播放。 |
| `vars` : Object                             | 通过构造函数传递给原始时间线的配置对象，如 `gsap.timeline({onComplete: func});`                |

## 方法

| 方法名                                                                                                                     | 描述                                                                                                                                                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `add` (child:\[Tween \| Timeline \| Label \| Callback \| Array\], position:\[Number \| String \| Label\] ) : self          | \[覆盖\] 将补间、时间线、回调或标签（或它们的数组）添加到时间线中。                                                                                                                                                  |
| `addLabel` (label:String, position:\[Number \| String\] ) : self                                                           | 将标签添加到时间线中，便于标记重要的位置/时间。                                                                                                                                                                      |
| `addPause` (position:\[String \| Number \| Label\], callback:Function, params:Array ) : self                               | 在特定时间或标签处插入特殊回调，暂停时间线的播放。                                                                                                                                                                   |
| `call` ( callback:Function, params:Array, position:\* ) : self                                                             | 将回调添加到时间线的末尾（或使用 `position` 参数在其他地方） - 这是一个方便的方法，与 `add` (gsap.delayedCall(...) )` 完全相同，但代码更少。                                                                         |
| `clear` (labels:Boolean ) : self                                                                                           | 清空时间线中的所有补间、时间线和回调（以及可选的标签）。                                                                                                                                                             |
| `currentLabel` (value:String ) : \[String \| self\]                                                                        | 获取当前时间之前最近的标签，或跳转到提供的标签（行为取决于是否向方法传递参数）。                                                                                                                                     |
| `delay` (value:Number ) : \[Number \| self\]                                                                               | 获取或设置动画的初始 `delay`，这是动画开始之前的秒数。                                                                                                                                                               |
| `duration` (value:Number ) : \[Number \| self\]                                                                            | \[覆盖\] 获取时间线的持续时间，或者如果用作设置器，则调整时间线的时间缩放以适应指定的持续时间。                                                                                                                      |
| `endTime` (includeRepeats:Boolean ) : \[Number \| self\]                                                                   | 返回动画根据父时间线的本地时间将完成的时间。                                                                                                                                                                         |
| `eventCallback` (type:String, callback:Function, params:Array ) : \[Function \| self\]                                     | 获取或设置事件回调，如 `onComplete`, `onUpdate`, `onStart`, `onReverseComplete` 或 `onRepeat` 以及应该传递给该回调的任何参数。                                                                                       |
| `from` (target:\[ Object \| Array \| String \], vars:Object, position:\[ Number \| String \] ) : self                      | 将 `.from()` 补间添加到时间线的末尾（或使用 `position` 参数在其他地方） - 这是一个方便的方法，与 `add(gsap.from(...) )` 完全相同，但代码更少。                                                                       |
| `fromTo` (target:\[ Object \| Array \| String \], fromVars:Object, toVars:Object, position:\[ Number \| String \] ) : self | 将 `.fromTo()` 补间添加到时间线的末尾 - 这是一个方便的方法，与 `add(gsap.fromTo(...) )` 完全相同，但代码更少。                                                                                                       |
| `getById` (id:String ) : Animation                                                                                         |                                                                                                                                                                                                                      |
| `getChildren` (nested:Boolean, tweens:Boolean, timelines:Boolean, ignoreBeforeTime:Number ) : Array                        | 返回一个数组，包含此时间线中嵌套的所有补间和/或时间线。                                                                                                                                                              |
| `getTweensOf` (target:\[Object \| Selector text \| Array\], nested:Boolean ) : Array                                       | 返回特定对象在此时间线中的补间。                                                                                                                                                                                     |
| `globalTime` (localTime:Number ) : Number                                                                                  | 将本地时间转换为 `gsap.globalTimeline` 上的对应时间（考虑所有嵌套、时间缩放等）。                                                                                                                                    |
| `invalidate` () : self                                                                                                     | \[覆盖\] 清除任何内部记录的起始/结束值，这在您想要重新启动动画而不恢复到任何先前记录的起始值时非常有用。                                                                                                             |
| `isActive` () : Boolean                                                                                                    | 指示动画是否当前处于激活状态（即虚拟播放头正在积极地移动过该实例的时间跨度，并且它没有被暂停，它的任何祖先时间线也没有被暂停）。                                                                                     |
| `iteration` (value:Number ) : \[Number \| self\]                                                                           | 获取或设置时间线的迭代次数（当前重复）。                                                                                                                                                                             |
| `kill` () : Timeline                                                                                                       | 立即终止时间线并将其从父时间线中移除，停止其动画。                                                                                                                                                                   |
| `killTweensOf` (targets:Selector text \| Array \| Object, props:String, onlyActive:Boolean ) : Timeline                    | 杀死此时间线中影响提供的 `targets` 的所有补间。您可以选择性地指定要杀死的特定属性。                                                                                                                                  |
| `nextLabel` (time:Number ) : String                                                                                        | 返回从提供的 `time` 起时间线中的下一个标签。如果没有提供 `time`，则使用时间线的当前播放头时间。                                                                                                                      |
| `pause` (atTime:\*, suppressEvents:Boolean ) : self                                                                        | 暂停实例，可以选择性地跳转到特定时间。                                                                                                                                                                               |
| `paused` (value:Boolean ) : \[Boolean \| self\]                                                                            | 获取或设置动画的暂停状态，指示动画是否当前处于暂停状态。                                                                                                                                                             |
| `play` (from:\*, suppressEvents:Boolean ) : self                                                                           | 开始向前播放，可以选择性地从特定时间开始（默认情况下，播放从播放头当前所在位置开始）。                                                                                                                               |
| `previousLabel` (time:Number ) : String                                                                                    | 返回从提供的 `time` 起时间线中的上一个标签。如果没有提供 `time`，则使用时间线的当前播放头时间。                                                                                                                      |
| `progress` (value:Number, suppressEvents:Boolean ) : \[Number \| self\]                                                    | \[覆盖\] 获取或设置时间线的进度，这是一个介于 0 和 1 之间的值，表示虚拟播放头的位置（不包括重复），其中 0 是开始，0.5 是完成一半，1 是完成。                                                                         |
| `recent` () : \[Tween \| Timeline \| Callback\]                                                                            | 返回最近添加的子补间/时间线/回调，无论其在时间线中的位置如何。                                                                                                                                                       |
| `remove` (value:\[Tween \| Timeline \| Callback \| Label\] ) : self                                                        | 从时间线中移除补间、时间线、回调或标签（或它们的数组）。                                                                                                                                                             |
| `removeLabel` (label:String ) : self                                                                                       | 从时间线中移除标签，并返回该标签的时间。                                                                                                                                                                             |
| `removePause` (position:\[Number \| Label\] ) : self                                                                       | 移除通过其 `.addPause()` 方法添加到时间线的暂停。                                                                                                                                                                    |
| `repeat` (value:Number ) : \[Number \| self\]                                                                              | 获取或设置时间线在第一次迭代后应重复的次数。                                                                                                                                                                         |
| `repeatDelay` (value:Number ) : \[Number \| self\]                                                                         | 获取或设置重复之间的时间，以秒为单位。                                                                                                                                                                               |
| `restart` (includeDelay:Boolean, suppressEvents:Boolean ) : self                                                           | 重新开始并从开头向前播放。                                                                                                                                                                                           |
| `resume` () : self                                                                                                         | 恢复播放，不改变方向（向前或反向）。                                                                                                                                                                                 |
| `reverse` (from:\*, suppressEvents:Boolean ) : self                                                                        | 反向播放，使动画的所有方面都向后播放，包括例如补间的缓动。                                                                                                                                                           |
| `reversed` (value:Boolean ) : \[Boolean \| self\]                                                                          | 获取或设置动画的反向状态，指示动画是否应该反向播放。                                                                                                                                                                 |
| `revert` () : Self                                                                                                         | 撤销时间线并终止它，将目标恢复到动画前的状态，包括移除时间线添加的内联样式。                                                                                                                                         |
| `seek` (position:\*, suppressEvents:Boolean ) : self                                                                       | \[覆盖\] 跳转到特定时间（或标签），不影响实例是否暂停或反向播放。                                                                                                                                                    |
| `set` (target:\[ Object \| Array \| String \], vars:Object, position:\[ Number \| String \] ) : self                       | 将零持续时间的补间添加到时间线的末尾（或使用 `position` 参数在其他地方），当虚拟播放头到达时间线上的该位置时，立即设置值 - 这是一个方便的方法，与 `add(gsap.to(target, {duration: 0, ...}) )` 完全相同，但代码更少。 |
| \*\*shiftChildren(amount:Number, adjustLabels:Boolean, ignoreBeforeTime:Number ) : self                                    | 将时间线的孩子的 `startTime` 移动一定量，并可选地调整标签。                                                                                                                                                          |
| `startTime` (value:Number ) : \[Number \| self\]                                                                           | 获取或设置动画在其父时间线上开始的时间（在定义的任何延迟之后）。                                                                                                                                                     |
| `then` (callback:Function ) : Promise                                                                                      | 返回一个承诺，以便您可以使用承诺来跟踪补间或时间线何时完成。                                                                                                                                                         |
| `time` (value:Number, suppressEvents:Boolean ) : \[Number \| self\]                                                        | \[覆盖\] 获取或设置播放头的本地位置（基本上是当前时间），不包括任何重复或重复延迟。                                                                                                                                  |
| `timeScale` (value:Number ) : \[Number \| self\]                                                                           | 用于缩放动画中的时间的因素，其中 1 = 正常速度（默认值），0.5 = 半速，2 = 双倍速度等。                                                                                                                                |
| `to` (target:\[ Object \| Array \| String \], vars:Object, position:\[ Number \| String \] ) : self                        | 将 `gsap.to()` 补间添加到时间线的末尾（或使用 `position` 参数在其他地方） - 这是一个方便的方法，与 `add(gsap.to(...) )` 完全相同，但代码更少。                                                                       |
| `totalDuration` (value:Number ) : \[Number \| self\]                                                                       | 获取或设置包括任何重复或重复延迟在内的时间线的总持续时间（以秒为单位）。                                                                                                                                             |
| `totalProgress` (value:Number, suppressEvents:Boolean ) : \[Number \| self\]                                               | \[覆盖\] 获取或设置时间线的总进度，这是一个介于 0 和 1 之间的值，表示虚拟播放头的位置（包括重复），其中 0 是开始，0.5 是半路，1 是结束（完成）。                                                                     |
| `totalTime` (time:Number, suppressEvents:Boolean ) : \[Number \| self\]                                                    | 获取或设置根据 `totalDuration` 的播放头位置，包括任何重复和重复延迟。                                                                                                                                                |
| `tweenFromTo` (fromPosition:\[Number \| Label\], toPosition:\[Number \| Label\], vars:Object ) : Tween                     | 创建一个线性补间，从特定时间或标签到另一个时间或标签，并在到达后停止。                                                                                                                                               |
| `tweenTo` (position:\[Number \| Label\], vars:Object ) : Tween                                                             | 创建一个线性补间，到特定时间或标签，并在到达后停止。                                                                                                                                                                 |
| `yoyo` (value:Boolean ) : \[Boolean \| self\]                                                                              | 获取或设置时间线的悠悠状态，其中 true 导致时间线来回移动，每隔一次重复交替向后和向前。                                                                                                                               |
