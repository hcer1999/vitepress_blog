# Hammer.js 入门

Hammer 是一个开源库，可以识别触摸、鼠标和指针事件的手势。
它没有任何依赖项，而且体积小巧，只有 **7.34 kB 压缩后 + gzip**!

- [压缩后的代码 (v2.0.8)](https://hammerjs.github.io/dist/hammer.min.js)
- [未压缩的代码 (v2.0.8)](https://hammerjs.github.io/dist/hammer.js)
- [更新日志](/hammerjs/changelog)
- [在GitHub上浏览源代码](https://github.com/hammerjs/hammer.js/tree/master/)
- 寻找1.1版本？[您可以在这里找到](https://github.com/hammerjs/hammer.js/tree/1.1.x)。

---

# 通过包管理器安装

::: code-group

```bash [npm]
npm install hammerjs
```

```bash [yarn]
yarn add hammerjs
```

```bash [pnpm]
pnpm install hammerjs
```

:::

# 使用方法

使用起来非常简单，只需包含库并创建一个新的实例。

```javascript
import Hammer from 'hammerjs'
var hammertime = new Hammer(myElement, myOptions)
hammertime.on('pan', function (ev) {
  console.log(ev)
})
```

默认情况下，它添加了一组 `tap`、`doubletap`、`press`、水平 `pan` 和 `swipe`，以及多点触控的 `pinch` 和 `rotate` 识别器。`pinch` 和 `rotate` 识别器默认是禁用的，因为它们会使元素阻塞，但您可以通过调用以下代码来启用它们：

```javascript
hammertime.get('pinch').set({ enable: true })
hammertime.get('rotate').set({ enable: true })
```

启用 `pan` 和 `swipe` 识别器的垂直或所有方向：

```javascript
hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL })
hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL })
```

还推荐使用视口元标签，它通过禁用双击/捏合缩放，将更多的控制权交还给网页。支持 touch-action 属性的较新浏览器不需要这个。

```html
<meta
  name="viewport"
  content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1"
/>
```

## 更多控制

您可以为实例设置自己的识别器集合。这需要更多的代码，但它可以让您更精确地控制正在识别的手势。

```javascript
var mc = new Hammer.Manager(myElement, myOptions)

mc.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }))
mc.add(new Hammer.Tap({ event: 'quadrupletap', taps: 4 }))

mc.on('pan', handlePan)
mc.on('quadrupletap', handleTaps)
```

上面的示例创建了一个包含 `pan` 和 `quadrupletap` 手势的实例。您创建的识别器实例将按照它们添加的顺序执行，并且一次只能识别一个。

有关 `recognizeWith` 和 `requireFailure` 的更多详情，请查看相关页面。

# 维护模式

Hammer.js 及其相关库完全由志愿者贡献者开发，但目前处于低维护模式。
