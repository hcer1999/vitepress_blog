# GSAP中文文档 - CSS

GSAP (GreenSock Animation Platform) 能够动画化几乎所有与 CSS 相关的 DOM 元素属性。常见的动画属性包括变换、透明度和颜色。但实际上，GSAP 能够处理你提供的任何属性。虽然没有一个官方的属性列表（因为列表会太长），但**如果你有疑问 - 试试吧！**

## CSS 属性

GSAP 可以动画化任何可动画化的 CSS 属性，以及许多使用 CSS **官方不支持**动画化的属性。

#### 连字符 CSS 属性

::: tip 提示

需要注意的是，连字符名称会变成驼峰命名。所以不是 "font-size"，而是使用 "fontSize"。"background-color" 将成为 "backgroundColor"。

:::

```javascript
// 一些示例属性。
gsap.to(element, {
  backgroundColor: 'red', // background-color
  fontSize: 12, // font-size
  boxShadow: '0px 0px 20px 20px red', // 动画化复杂字符串
  borderRadius: '50% 50%',
  height: 'auto', // 在 auto 和 px 值之间动画化 🪄
})
```

### 非动画化属性...

如果你定义了一个非动画化属性 - 比如 `position: "absolute"` 或 `borderStyle: "solid"` - GSAP 会立即为你应用这个属性。这些非可 tween 属性将在 tween 开始时设置（除了 `display: "none"`，出于明显的原因，它将在 tween 结束时应用）。

::: details 什么是“非动画化属性”？

为了让一个属性可动画化，开始、结束和中间值必须有效。如果你在 `rotation: 0` 和 `rotation: 360` 之间动画化，中间有有效的数值。按照这个逻辑，你不能在两个不同的背景图像之间动画化，因为没有有效的 CSS 用于 **一点那个图像和一点点那个图像**。background-image 是一个二元属性，有或没有图像，没有中间动画化。

:::

::: tip 动画布局

一些其他“不可能的属性”是 **布局** 属性。这些对于普通 tween 来说太复杂了 - 但将由 GSAP 的 FLIP 插件 **神奇地** 处理。

:::

## 变换

GSAP 提供了内置的变换别名，这些别名跨浏览器友好，比动画化 transform 字符串更高效、更可靠。

```javascript
gsap.to(element, {
  // 写出 transform 字符串 🔥
  // transform: "translate(-50%,-50%)"
  xPercent: -50,
  yPercent: -50,
})
```

在常规 CSS 中，你列出变换的顺序很重要，但 GSAP 总是以相同的顺序应用它们以保持一致性：平移（`x`, `y`, `z`），然后是 `scale`，然后是 `rotationX`，然后是 `rotationY`，然后是 `skew`，然后是 `rotation`（与 `rotationZ` 相同）。

::: details 深入探究 — 为何使用快速变换？

当你以字符串形式定义变换，比如 `"transform: translateX(50px)"`，GSAP会将其应用到元素上，然后读取并解析浏览器创建的 `matrix()` 或 `matrix3d()`。这个过程是必要的，因为字符串可以包含任意数量或顺序的变换值，比如 `"translateX(50px) rotate(40deg) scale(0.5,0.5) translateY(100px) rotate(30deg)"`。这种方法涉及很多额外的工作。此外，根据 CSS 规范，操作顺序很重要，这可能会导致不熟悉 CSS 变换的人得到意外的结果。

当你使用简写属性定义，比如使用 `x:50` 而不是 `"transform: translateX(50px)"`，GSAP 可以直接处理那个单一值，无需额外计算。简而言之，使用 GSAP 进行变换可以提供性能提升，优化速度，并提供直观一致的操作顺序。

我们强烈建议使用GSAP内置的变换别名，除非你特别需要非标准的操作顺序，这种情况很少见。

:::

### 快速参考

以下是简短的变换和其他一些常用属性的列表。

| GSAP                          | 描述或等效 CSS                      |
| ----------------------------- | ----------------------------------- |
| x: 100                        | transform: translateX(100px)        |
| y: 100                        | transform: translateY(100px)        |
| xPercent: 50                  | transform: translateX(50%)          |
| yPercent: 50                  | transform: translateY(50%)          |
| scale: 2                      | transform: scale(2)                 |
| scaleX: 2                     | transform: scaleX(2)                |
| scaleY: 2                     | transform: scaleY(2)                |
| rotation: 90                  | transform: rotate(90deg)            |
| rotation: "1.25rad"           | 使用弧度 - 无 CSS 替代品            |
| skew: 30                      | transform: skew(30deg)              |
| skewX: 30                     | transform: skewX(30deg)             |
| skewY: "1.23rad"              | 使用弧度 - 无 CSS 替代品            |
| transformOrigin: "center 40%" | transform-origin: center 40%        |
| opacity: 0                    | 调整元素的透明度                    |
| autoAlpha: 0                  | 透明度的简写 & 可见性               |
| duration: 1                   | animation-duration: 1s              |
| repeat: -1                    | animation-iteration-count: infinite |
| repeat: 2                     | animation-iteration-count: 2        |
| delay: 2                      | animation-delay: 2                  |
| yoyo: true                    | animation-direction: alternate      |

::: details 关于变换的注意事项

- 要进行基于百分比的平移，使用 `xPercent` 和 `yPercent` 而不是通常基于像素的 `x` 或 `y`。这允许你将 px 单位和平百分比变换结合起来使用。
- 你可以使用`scale`作为一个快捷方式，来相同地控制scaleX和scaleY属性。
- 你可以定义相对值，比如 `rotation: "+=30"`。
- 你声明变换属性的顺序没有影响。
- GSAP 与浏览器中元素的渲染质量无关。有些浏览器似乎能很好地渲染变换后的元素，而有些则在抗锯齿处理上表现不佳。
- 基于百分比的 x/y 平移也适用于 SVG 元素。

:::

### 复杂字符串

GSAP 可以动画化复杂的值，如 `boxShadow: "0px 0px 20px 20px red"`, `borderRadius: "50% 50%"`, 和 `border: "5px solid rgb(0,255,0)"`。在必要时，它会尝试计算属性是否需要供应商前缀，并相应地应用它。

### 单位

GSAP 对单位有合理的默认值。如果你想设置 x 属性，你可以说 `x: 24` 而不是 x: "24px"，因为 GSAP 使用像素作为 x 的默认单位。如果你想指定一个特定的单位，你可以在末尾追加单位值，并用字符串包裹值。

```javascript
gsap.to(HTMLelement, {
  rotation: 360 // 默认 deg
  rotation: "1.25rad" // 使用弧度代替
  x: 24 // 使用 px
  x: "20vw" // 使用视口宽度代替
});
```

::: tip 提示

如果当前使用的测量单位与当前的一个不匹配，GSAP 会为你转换它们。例如，将元素的宽度从 "50%" 动画化到 "200px"。

:::

## 3D 变换

你可以在所有现代浏览器中动画化 3D 属性，如 `rotationX`, `rotationY`, `rotationZ`（与常规 `rotation` 相同）, `z`, `perspective`, 和 `transformPerspective`（查看 Can I Use 了解浏览器对 3D 变换的支持详情）。你可以直观地一起动画化 3D 变换属性和 2D 属性：

```javascript
gsap.to(element, {
  duration: 2,
  rotationX: 45,
  scaleX: 0.8,
  z: -300,
})
```

::: warning 警告

为了让你元素具有真正的 3D 视觉透视效果，你必须设置父元素的 perspective 属性，或者设置元素本身的 special `transformPerspective`

:::

`transformPerspective` 就像在 CSS `transform` 样式中直接添加 `perspective()`，比如：`transform: perspective(500px) rotateX(45deg)` 这只应用于特定元素。常见值范围从大约 200 到 1000，数字越低，透视失真越强。如果你想让一组元素共享一个共同的透视（相同的消失点），你应该在那些元素的父/容器上设置常规 `perspective` 属性。

```javascript
// 对父元素（容器）应用透视，使透视应用于所有子元素（通常是最好的）
gsap.set(container, { perspective: 500 });

// 或者使用 "transformPerspective" 应用单个元素的透视
gsap.set(element, { transformPerspective: 500 });

//sample css:
.myClass {
    transform: translate3d(10px, 0px, -200px) rotateY(45deg) scale(1.5, 1.5);
}

//对应的 GSAP 变换（2 秒内动画化）：
gsap.to(element, {
    duration: 2,
    scale: 1.5,
    rotationY: 45,
    x: 10,
    y: 0,
    z: -200
});

//sample CSS 使用 perspective():
.myClass {
    transform: perspective(500px) translateY(50px) rotate(120deg);
}

//对应的 GSAP 变换（设置，不动画化）：
gsap.set(element, {
    transformPerspective: 500,
    rotation: 120,
    y: 50
});
```

有关透视的更多信息，请查看[这篇文章](https://3dtransforms.desandro.com/perspective)。

::: details 关于3D变换的注意事项

1. 在不支持3D变换的浏览器中，这些变换将被忽略。例如，rotationX可能不起作用，但rotation会。可以参考caniuse网站查看支持3D变换的浏览器版本分布情况。

2. 所有变换都是缓存的，所以你可以在补间动画中只定义需要动画化的单独属性，而不必担心它们会丢失。你不需要在每个补间动画中定义所有的变换属性——只需定义你想要动画化的属性。你可以随时使用方法读取与变换相关的值（或任何属性）。如果你想清除这些值（包括应用于元素内联样式的变换），可以使用`clearProps: "transform"`。如果你想强制GSAP重新从CSS解析变换数据（而不是使用之前补间动画记录的数据），可以在配置对象中传递`parseTransform: true`。

3. GSAP与浏览器中元素的渲染质量无关。有些浏览器似乎能很好地渲染变换后的元素，而有些则在抗锯齿处理上表现不佳。

4. 基于百分比的x/y平移也适用于SVG元素。

5. 要了解更多关于CSS 3D变换的信息，可以参考这篇文章。

6. Opera mini不支持3D变换。

:::

### force3D

`force3D` 默认为 `"auto"` 模式，这意味着变换通过使用 `translate3d()` 而不是 `translate()` 自动优化以提高速度。这通常会导致浏览器将该元素放到自己的合成层上，使动画更新更高效。在 `"auto"` 模式下，GSAP 在 tween 完成时会自动切换回 2D（如果不需要 3D）以释放更多 GPU 内存。如果你想保持在 3D 模式，你可以设置 `force3D: true`。或者，尽可能保持在 2D 模式，设置 `force3D: false`。有关性能的更多详情，请参阅[《神话破除 CSS 动画 vs JavaScript》](https://css-tricks.com/myth-busting-css-animations-vs-javascript/)。

## transformOrigin

设置所有变换（2D 和/或 3D）发生的原点。默认情况下，它在元素的中心（`"50% 50%"`）。你可以使用关键词 `"top"`, `"left"`, `"right"`, 或 `"bottom"` 定义值，或者你可以使用百分比（右下角是 `"100% 100%"`）或像素。例如，如果你想让一个对象围绕其左上角旋转，你可以这样做：

```javascript
//围绕元素的左上角旋转
gsap.to(element, {
  duration: 2,
  rotation: 360,
  transformOrigin: 'left top',
})
```

第一个值对应于 x 轴，第二个值对应于 y 轴，所以如果你想让对象围绕从左边缘正好 50px 和从顶部 20px 的偏移点变换，你可以这样做：

```javascript
//围绕从左上角偏移 50px, 20px 的点旋转/缩放
gsap.to(element, {
  duration: 2,
  rotation: 270,
  scale: 0.5,
  transformOrigin: '50px 20px',
})
```

这也适用于 SVG 元素！

你可以定义一个 transformOrigin 作为 **3D 值** 通过添加第三个数字，比如要围绕 y 轴从 400px 距离的点旋转，你可以这样做：

```javascript
//围绕一个在 3D 空间中后退 400px 的点旋转，创造出有趣的效果：
gsap.to(element, {
  duration: 2,
  rotationY: 360,
  transformOrigin: '50% 50% -400px',
})
```

::: warning SVG

GSAP 确实使 `transformOrigin` 在 SVG 元素上跨浏览器一致工作。但请记住，SVG 元素根据规范并不官方支持 3D 变换。

:::

## SVG

### svgOrigin

**仅适用于 SVG 元素** 与 `transformOrigin` 完全相同，但它使用 SVG 的全局坐标空间而不是元素的局部坐标空间。这在例如你想让一堆 SVG 元素围绕一个共同点旋转时非常有用。你可以定义一个 `svgOrigin` 或一个 `transformOrigin`，不能同时定义两者（显而易见的原因）。所以如果你想旋转 `svgElement` 就好像它的原点在 SVG 画布的全局坐标 x: 250, y: 100，你可以这样做：`gsap.to(svgElement, {duration: 1, rotation: 270, svgOrigin: "250 100"})`。单位不是必需的。它还在 `data-svg-origin` 属性中记录了值，以便可以重新解析。`svgOrigin` 不支持基于百分比的值。

<iframe src="https://codepen.io/GreenSock/pen/ZYRqRx" width="100%" height="600" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true" ></iframe>

### smoothOrigin

**仅适用于 SVG 元素** 当改变 SVG 元素的 `transformOrigin`（或 `svgOrigin`）时，CSSPlugin 现在会自动记录/应用一些偏移量，以确保元素不会“跳跃”。你可以通过设置 `CSSPlugin.defaultSmoothOrigin = false` 来禁用此功能，或者你可以在每个 tween 基础上使用 `smoothOrigin: true` 或 `smoothOrigin: false` 控制。

::: details 深度解析 - 为什么使用简写变换？

在浏览器中（以及根据官方规范），变换和变换原点（transform-origins）的工作方式是，改变原点会导致元素以一种突兀的方式跳跃。例如，如果当变换原点在元素的左上角时，你旋转180度，它最终的位置会与围绕其右下角旋转相同角度时的位置大不相同。由于GSAP专注于为动画师解决实际问题（他们中的大多数人更喜欢平滑地改变变换原点），GSAP中的smoothOrigin特性解决了这个问题。这也意味着，如果你在像Adobe Flash这样的创作程序中创建SVG作品，可能不容易/明显地控制元素的原点在哪里，当你通过GSAP定义transformOrigin时，事情会“自然地工作”。目前，这个特性只适用于SVG元素，因为那里是它更常见的痛点。

简写变换的优势在于它们允许作者独立地指定简单变换，以一种映射到典型用户界面使用的方式，而不是必须记住`transform`中保持`transform()`、`rotate()`和`scale()`独立作用的顺序，并在屏幕坐标中执行。这意味着，无论你如何编写它们，这些新属性都会以直观的顺序应用，而不考虑你编写它们的顺序。此外，当你使用CSS转换或动画时，这种优势尤为明显，因为我们通常只想动画化变换的一个方面。使用简写属性，可以减少代码的重复，并且由于它们默认为`0`，可以完全省略起始属性，这为我们的动画提供了一个清晰、明确的定义。

:::

## 方向旋转

Tweens 旋转 CSS 属性在特定方向，可以是 **顺时针**（`"_cw"` 后缀），**逆时针**（`"_ccw"` 后缀），或 **最短方向**（`"_short"` 后缀），在这种情况下，插件为你选择方向，基于最短路径。例如，如果元素的旋转目前是 170 度，你想要 tween 它到 -170 度，一个正常的旋转 tween 将总共在逆时针方向上旅行 340 度，但如果你使用 \_short 后缀，它将在顺时针方向上旅行 20 度。示例：

```javascript
gsap.to(element, {
  duration: 2,
  rotation: '-170_short',
})

//甚至可以在 3D 旋转上使用它，并使用相对前缀：
gsap.to(element, {
  duration: 2,
  rotation: '-170_short',
  rotationX: '-=30_cw',
  rotationY: '1.5rad_ccw',
})
```

注意，值在引号内，因此是一个带有特定后缀指示方向的字符串（`_cw`, `_ccw`, 或 `_short`）。你也可以使用 `"+="` 或 `"-="` 前缀来表示相对值。方向旋转后缀在所有旋转属性（`rotation`, `rotationX`, 和 `rotationY`）中都受支持；你不需要使用 `directionalRotation` 作为属性名称。有一个 DirectionalRotationPlugin，你可以用它来动画化不是 DOM 元素的对象，但如果

你只是用 CSSPlugin 动画化 CSS 相关属性，就没有必要加载那个插件，因为它已经包含了 DirectionalRotationPlugin 的功能。在这里查看一个[交互式示例](http://codepen.io/GreenSock/pen/jiEyG)。

## autoAlpha

与 `opacity` 相同，除了当值达到 `0` 时，`visibility` 属性将被设置为 `hidden` 以提高浏览器渲染性能，并防止点击/与目标交互。当值不是 `0` 时，`visibility` 将被设置为 `inherit`。它不被设置为 `visible` 以尊重继承（想象父元素被隐藏 - 明确地将子元素设置为可见将导致它出现，这可能不是预期的）。为了方便，如果元素的 `visibility` 最初设置为 `hidden` 且 `opacity` 是 `1`，它将假设 `opacity` 也应该从 `0` 开始。这使得在你的页面上使事物不可见（设置你的 CSS `visibility: hidden`）然后当你想要的时候淡入它们变得简单。

```javascript
// 淡出并将 visibility 设置为 hidden
gsap.to(element, {
  duration: 2,
  autoAlpha: 0,
})

// 在 2 秒内淡回，并将 visibility 设置为 visible
gsap.to(element, { duration: 2, autoAlpha: 1, delay: 2 })
```

## CSS 变量

GSAP 可以在支持它们的浏览器中动画化 CSS 变量。

<iframe src="https://codepen.io/GreenSock/pen/MoeLdj" width="100%" height="400" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true" ></iframe>

### clearProps

你可以在 `clearProps` 中输入一个逗号分隔的属性名称列表，这些属性你希望在 tween 完成时从元素的 `style` 属性中清除（或使用 `"all"` 或 `true` 清除所有属性）。这在例如你有一个类（或一些其他选择器）应该在 tween 结束时应用某些样式到元素，否则会被 `element.style`-特定的数据覆盖的情况下很有用。通常你**不需要**包括供应商前缀。`clearProps` 还清除了受 GSAP 影响的 SVG 元素的 "transform" 属性，因为 GSAP 总是通过 transform **属性** 应用变换（像 x, y, rotation, scale 等）以避免浏览器错误/怪癖。清除任何与 transform 相关的属性（像 `x`, `y`, `scale`, `rotation` 等）将清除整个 `transform`，因为它们全部合并为一个 "transform" CSS 属性。

```javascript
// tweens 3 个属性，然后仅清除 "left" 和 "transform"（因为 "scale" 影响 "transform" css 属性。CSSPlugin 自动应用必要的供应商前缀）
gsap.from(element, {
  duration: 5,
  scale: 0,
  left: 200,
  backgroundColor: 'red',
  clearProps: 'scale,left', // 注意："scale"（或任何与 transform 相关的属性）清除所有变换
})
```

### autoRound

默认情况下，CSSPlugin 会在 tween（中间值）期间将像素值和 `zIndex` 四舍五入到最接近的整数，因为这可以提高浏览器性能，但如果你宁愿禁用这种行为，可以在 CSS 对象中传递 `autoRound: false`。你仍然可以使用 [SnapPlugin](#) 手动定义你想要四舍五入的属性。

如果你需要动画化数字属性（而不是 CSS 相关属性），你可以使用 [AttrPlugin](#)。要替换 DOM 元素中的文本，请使用 [TextPlugin](#)。

---

## 试试你学到的东西！

<iframe src="https://codepen.io/GreenSock/pen/BaGvbXb" width="100%" height="400" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true" ></iframe>

### 常见问题解答

::: details 我如何将这个包含在我的项目中？

只需加载 GSAP 的核心 - CSSPlugin 自动包含！
:::
::: details 我需要在 tweens 中使用 css: 包装器吗？

不需要。这在 GSAP 最初创建时是必需的，但由于动画化 DOM 元素的频率，GSAP 移除了动画化 CSS 属性的需要。
:::
