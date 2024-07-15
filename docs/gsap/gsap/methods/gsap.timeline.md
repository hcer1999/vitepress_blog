# gsap.timeline()

时间轴是一种功能强大的排序工具，可充当补间和其他时间轴的容器，从而可以轻松地整体控制它们并精确管理它们的时间。如果没有时间轴，构建复杂的序列会更加麻烦，因为您需要为每个动画使用 delay 。例如：

```js
// WITHOUT Timelines (only using delays):
gsap.to('#id', { x: 100, duration: 1 })
gsap.to('#id', { y: 50, duration: 1, delay: 1 }) //wait 1 second
gsap.to('#id', { opacity: 0, duration: 1, delay: 2 }) //wait 2 seconds
```

如果您想让第一个动画更长怎么办？此后您需要调整每次延迟。如果您想 pause() 整个序列或 restart() 它或 reverse() 动态或重复两次怎么办？这可能会变得相当混乱，但 GSAP 的时间表使其变得异常简单：

```js
//WITH Timelines (cleaner, more versatile)
var tl = gsap.timeline({repeat: 2, repeatDelay: 1});
tl.to("#id", {x: 100, duration: 1});
tl.to("#id", {y: 50, duration: 1});
tl.to("#id", {opacity: 0, duration: 1});

// then we can control the whole thing easily...
tl.pause();
tl.resume();
tl.seek(1.5);
tl.reverse();
...
```

现在我们可以调整时间，而不必担心延迟的影响！增加第一个补间的持续时间，一切都会自动调整。

## 在时间轴中定位动画​

构建具有复杂时序的华丽动画的秘诀是了解许多不同时间轴方法中使用的位置参数。这一超级灵活的参数控制补间、标签、回调、暂停甚至嵌套时间线的放置。换句话说，它告诉时间轴确切的插入动画的位置。它通常出现在 vars 参数之后，并且有多种行为：

- 绝对时间，如 3 （数字）

```js
//insert exactly 3 seconds from the start of the timeline
tl.to('.class', { x: 100 }, 3)
```

- 相对时间，例如 "+=1" 或 "-=1" （相对于时间线末尾）

```js
//create a gap (insert 1 second after end of timeline)
tl.to('.class', { x: 100 }, '+=1')
//overlap end by 1 second
tl.to('.class', { y: 100 }, '-=1')
```

- 标签，例如 "someLabel"

```js
//insert at the "someLabel" label (if it doesn't exist yet, it gets added to the end of the timeline)
tl.to('.class', { x: 100 }, 'someLabel')
```

- 相对于标签，例如 "someLabel+=1"

```js
//insert 2 seconds after the "someLabel" label
tl.to('.class', { x: 100 }, 'someLabel+=2')
```

- 在最近添加的动画的开始处， "<"

```js
//insert at the START of the most recently added animation
tl.to('.class', { x: 100 }, '<')
```

- 在最近添加的动画的末尾， ">"

```js
//insert at the END of the most recently added animation
tl.to('.class', { x: 100 }, '>')
```

- 相对于最近添加的动画的开始，例如 "<1"

```js
//insert 1 second after the START of the most recently added animation
tl.to('.class', { x: 100 }, '<1')
//insert 2 seconds before the START of the most recently added animation (negative number)
tl.to('.class', { y: 100 }, '<-2')
```

- 相对于最近添加的动画的结尾，例如 ">1"

```js
//insert 1 second after the END of the most recently added animation
tl.to('.class', { x: 100, duration: 1 }, '>1')
//insert 2 seconds before the END of the most recently added animation (negative number)
tl.to('.class', { y: 100, duration: 1 }, '>-2')
```

提示：将 `"<"` 和 `">"` 视为指向最近添加的动画的开始或结束的指针。

## 特殊属性和回调​

将其中任何一个添加到您的 vars 对象中，以赋予您的动画特殊能力：

```js
gsap.timeline({
  onComplete: myFunction,
  repeat: 2,
  repeatDelay: 1,
  yoyo: true,
})
```

时间线的所有 `vars` 属性描述如下：

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

### 默认值​

时间线的 defaults 对象中的任何内容在创建时都会被其子动画继承，因此，如果您发现自己设置相同的 ease 或 duration （或任何值）一遍又一遍，这可以帮助您的代码更加简洁。例如：

```js
// WITHOUT defaults (long)
var tl = gsap.timeline()
tl.to('.class1', { rotation: -270, duration: 1, ease: 'elastic' })
  .to('.class2', { rotation: -360, duration: 1, ease: 'elastic' })
  .to('.class3', { rotation: -180, duration: 1, ease: 'elastic' })

//WITH defaults (shorter)
var tl = gsap.timeline({ defaults: { duration: 1, ease: 'elastic' } })
tl.to('.class1', { rotation: -270 }) //child tweens will inherit the duration and from the parent timeline!
  .to('.class2', { rotation: -360 })
  .to('.class3', { rotation: -180 })
```

您以这种方式设置的任何默认值都将被推送到每个子补间中 - 它不限于属性的某个子集。只要在子动画上声明属性，继承的默认值就很容易被覆盖。

### 嵌套​

根据需要将时间线嵌套在时间线内。这使您可以模块化代码并使其更易于维护。例如，您可以分段构建动画，并将它们缝合在主时间轴中，如下所示：

```js
function intro() {
  var tl = gsap.timeline()
  //...add animations here...
  return tl
}

function middle() {
  var tl = gsap.timeline()
  //...add animations here...
  return tl
}

function conclusion() {
  var tl = gsap.timeline()
  //...add animations here...
  return tl
}

// stitch them together in a master timeline...
var master = gsap.timeline()
master
  .add(intro())
  .add(middle(), '+=2') //with a gap of 2 seconds
  .add(conclusion(), '-=1') //overlap by 1 second
```

### 其他时间线功能​

使用其 timeScale() 方法加快或减慢整个时间线。您甚至可以对其进行补间以平滑地逐渐加速或减慢动画！

使用其 progress() 或 totalProgress() 方法获取或设置时间线的进度（totalProgress() 仅包括任何重复）。例如，要跳到中间点，请设置 myTimeline.progress(0.5); 。

补间 time() 、 totalTime() 、 progress() 或 totalProgress() 来快进或快退时间线。您甚至可以将滑块附加到其中之一，以使用户能够在时间轴中向前或向后拖动。

使用构造函数的 vars 、 onStart 、 onUpdate 、 onRepeat 和/或 onReverseComplete 回调/b5> 对象，如 var tl = gsap.timeline({onComplete: myFunction}); 。

使用 killTweensOf(target) 终止时间线内特定对象的补间，或者使用 getTweensOf() 获取对象的补间，或者使用 getChildren() .

将时间线设置为重复任意次数或无限期。您甚至可以在每个重复周期之间设置延迟和/或使重复周期悠悠，看起来每隔一个周期就会反转方向。

获取 currentLabel() 或使用 nextLabel() 和 previousLabel() 在时间线中的各个位置查找标签

#### 示例代码：

```js
// create the timeline that repeats 3 times
// with 1 second between each repeat and
// then call myFunction() when it completes
var tl = gsap.timeline({ repeat: 3, repeatDelay: 1, onComplete: myFunction })

// add a tween
tl.to('.class', { duration: 1, x: 200, y: 100 })

// add another tween 0.5 seconds after the end
// of the timeline (makes sequencing easy)
tl.to('#id', { duration: 0.8, opacity: 0 }, '+=0.5')

// reverse anytime
tl.reverse()

// Add a "spin" label 3-seconds into the timeline
tl.addLabel('spin', 3)

// insert a rotation tween at the "spin" label
// (you could also define the insertion point as the time instead of a label)
tl.to('.class', { duration: 2, rotation: '+=360' }, 'spin')

// go to the "spin" label and play the timeline from there
tl.play('spin')

// nest another timeline inside your timeline...
var nested = gsap.timeline()
nested.to('.class2', { duration: 1, x: 200 })
tl.add(nested, '+=3') //add nested timeline after a 3-second gap
```

## 时间表如何运作？ ​

每个动画（补间和时间轴）都放置在父时间轴上。从某种意义上说，它们都有自己的播放头（这就是它的“时间”所指的，或者“totalTime”，它是相同的，除了它包括重复和重复延迟），并且当父级的播放头移动到新位置时，它会更新子级的播放头' 也是（除非他们暂停了）。

当时间线在特定时间渲染时，它会循环遍历其子项并说“好吧，您应该像播放头位于 \_\_\_\_ 一样进行渲染”，如果该子项是带有子项的时间轴，它会对其子项执行相同的操作，就在下线。因此播放头通常保持同步。

当您取消暂停动画（ resume() 或 play() ）时，它本质上会拾取播放头并移动它，以便其内部播放头与父级播放头当时所在的位置同步，因此事情进展得很顺利。也就是说，除非时间线的 smoothChildTiming 是 false ，在这种情况下，子级不会移动 - 它的 startTime 将保持锁定在原来的位置。

因此，基本上，当 smoothChildTiming 为 true 时，引擎会动态重新排列内容，以确保播放头对齐，从而使播放感觉无缝且流畅。当您 reverse() 或更改 timeScale 等时，也会发生同样的事情 - 动画的 startTime 会自动变化。但有时您可能不想要这种行为 - 这时 smoothChildTiming: false 在父时间轴上很方便。

再举一个例子：假设您有一个 10 秒的补间，它位于根时间轴上，而您已进入该补间 2 秒。让我们假设它从根上的 0 处开始，以简化此操作，然后当它在 2 秒时，您执行 tween.seek(5) 。根的播放头不受影响 - 它会像往常一样继续运行，但为了使补间跳转到 5 秒并正确播放，补间的 startTime 更改为 -3。这样，补间的播放头和根播放头就可以完美对齐。

::: tip 注意
您可以通过 gsap.globalTimeline 访问 GSAP 的全局时间线，但要小心，因为例如，如果您暂停（）或 timeScale（） 它，这会影响一切，包括delayedCalls（）。您可以使用 gsap.exportRoot() 来基本上将根上的所有现有动画（可以选择排除elastedCalls）包装到新的 Timeline 实例中，从而将它们与您将来创建的动画隔离开来。例如，如果游戏中有一堆动画，然后用户单击按钮弹出一个模态窗口，该窗口应将所有游戏动画减慢至 1/10 速度...但您希望模态动画是全速的，这是 exportRoot() 的完美情况。
:::
