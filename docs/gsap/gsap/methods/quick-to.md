# GSAP中文文档 - gsap.quickTo()

## gsap.quickTo()

如果您发现自己在相同的目标上多次调用 `gsap.to()` 来处理相同的数值属性，比如在 "mousemove" 事件中，您可以通过创建 `quickTo()` 函数来**提升性能**。将 `quickTo()` 视为一个优化过的函数，它与一个特定的数值属性绑定，直接将新数字传递给它，并**跳过**正常 `gsap.to()` 调用中的便利任务，比如：

- 单位转换和自动添加单位
- 相对值
- 基于函数的值
- `"random()"` 解析
- 插件解析 - 这只适用于目标的直接属性或与 CSS 相关的属性。例如，您不能使用 attr:{} 值或 morphSVG 等。
- 属性名称别名转换（"x" 可以用于变换，但 "translateX" 不行）

每次您向函数传递一个新数字时，它基本上会**重启**动画，将其重定向到那个新值。它返回重用的（Tween）实例。

可选的第三个参数是补间 `vars` 对象，您可以在其中指定与补间相关的设置，如 `duration`（持续时间）、`ease`（缓动）等。

## 示例

```javascript
let xTo = gsap.quickTo('#id', 'x', { duration: 0.4, ease: 'power3' }),
  yTo = gsap.quickTo('#id', 'y', { duration: 0.4, ease: 'power3' })

document.querySelector('#container').addEventListener('mousemove', (e) => {
  xTo(e.pageX)
  yTo(e.pageY)
})
```

## 结合实用方法创建超强大的函数!

由于它接受单个值，您可以在 `pipe()` 的末尾使用 quickTo，在其之前可以放置其他实用函数，这些函数对输入的数字执行有用的操作，如限制、捕捉或以某种方式净化值。例如：

```javascript
let xTo = gsap.utils.pipe(
  gsap.utils.clamp(0, 100),    // 确保数字在 0 到 100 之间
  gsap.utils.snap(5),          // 捕捉到 5 的最近增量
  gsap.quickTo("#id", "x", {duration: 0.8, ease: "power3"}) // 应用它到 #id 元素的 x 属性，每次更新时持续 0.8 秒，并使用 "power3" 缓动
);

// 然后在稍后...
xTo(150) // 将 #el 的变换动画为 translateX(100px)（限制在 100）
xTo(3)   // 将其动画为 5px（捕捉）
...
```

## 鼠标跟随演示

<iframe src="https://codepen.io/GreenSock/pen/xxpbORN" width="100%" height="500" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" allow="autoplay; fullscreen; payment"></iframe>

## 可选择性定义起始值

默认情况下，它将从补间当前进度内的**当前值**开始（实际上它不会检查目标的当前值……这里的想法是最大化性能）。但您可以通过将数值起始值作为第二个参数传入来覆盖此行为：

```javascript
let xTo = gsap.quickTo('#id', 'x', { duration: 0.8 })

xTo(100) // 从补间当前进度内的当前值动画到 100
xTo(100, 500) // 从 500 动画到 100
```

## 访问补间

如果您需要访问补间，比如暂停它，生成的函数具有 `.tween` 属性：

```javascript
let xTo = gsap.quickTo('#id', 'x', { duration: 0.8 })

xTo(100) // 动画到 100
xTo.tween.pause() // 暂停补间！
```

它是一个常规的 Tween 实例，因此您可以利用它的任何方法和属性，除了 `delay()`。
