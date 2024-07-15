# gsap.matchMedia()

返回类型：MatchMedia

`gsap.matchMedia()` 允许您将设置代码放入一个函数中，该函数仅在特定的媒体查询匹配时执行，并且当不再匹配时，该函数执行期间创建的所有 GSAP 动画和 ScrollTriggers 将**自动撤销**！它是实现响应式、可访问动画和 ScrollTriggers 的理想选择。为移动设备/桌面或 `prefers-reduced-motion` 可访问性进行自定义非常简单。

每个媒体查询字符串与您传递给浏览器原生 `window.matchMedia()` 的完全相同。

#### 基本语法

```javascript
// 创建
let mm = gsap.matchMedia();

// 添加媒体查询。当匹配时，关联的函数将运行
mm.add("(min-width: 800px)", () => {
  // 仅在视口宽度至少为 800px 时运行此设置代码
  gsap.to(...);
  gsap.from(...);
  ScrollTrigger.create(...);

  return () => { // 可选
    // 自定义清理代码（在停止匹配时运行）
  };
});

// 稍后，如果我们需要撤销所有动画/ScrollTriggers...
mm.revert();
```

我们创建一个 `mm` 变量用于 MatchMedia，以便我们可以向该对象添加任意数量的媒体查询。这样，我们就可以在单个对象上调用 `revert()`，以立即撤销在任何关联 MatchMedia 函数中创建的所有动画/ScrollTriggers。

当匹配时，函数将被调用。因此，如果用户多次调整浏览器大小，越过断点并返回，该函数将被多次调用。

#### .add() 参数

1. **query/conditions** - 媒体查询字符串，如 `"(min-width: 800px)"` **或** 条件对象，您可以指定任意数量的查询字符串；您将能够检查每个查询字符串的匹配状态（布尔值）。有关条件语法的详细信息，请参见下文。
2. **handler function** - 匹配时调用的函数。在此函数执行期间创建的所有 GSAP 动画和 ScrollTriggers 将被收集在上下文中，以便在 MatchMedia 被撤销时可以撤销它们（例如，当条件停止匹配时）。
3. **scope** _[可选]_ - 所有 GSAP 相关的选择器文本在处理函数内的调用将限定在此元素或 React Ref 或 Angular ElementRef。想象一下，这就像是在此元素上调用 `querySelectorAll()`，因此只有它的后代才能被选择。有关详细信息，请参见下文。

结构如下：

```javascript
mm.add("(min-width: 800px)", () => {...}, myElementOrRef);
```

#### 简单的桌面/移动示例

```javascript
let mm = gsap.matchMedia()

mm.add('(min-width: 800px)', () => {
  // 桌面设置代码在这里...
})

mm.add('(max-width: 799px)', () => {
  // 移动设置代码在这里...
})
```

#### 条件语法

如果您针对各种媒体查询的设置代码大部分相同，但有几个关键值不同怎么办？如果您分别 `add()` 每个媒体查询，可能会导致大量的**冗余代码**。使用条件语法！在第一个参数中，不要使用字符串，而使用**具有任意命名条件的对象**，然后函数将在**任何**条件匹配时被调用，并且您可以将每个条件作为布尔值（匹配或不匹配）进行检查。条件对象可能如下所示：

```javascript
{
  isDesktop: "(min-width: 800px)",
  isMobile: "(max-width: 799px)",
  reduceMotion: "(prefers-reduced-motion: reduce)"
}
```

您可以随意命名条件。

下面我们将在 800px 宽度处设置断点，并尊重用户的 `prefers-reduced-motion` 偏好，利用相同的设置代码，并在必要时使用条件逻辑：

```javascript
let mm = gsap.matchMedia(),
  breakPoint = 800

mm.add(
  {
    // 设置任意数量的任意命名条件。下面的函数将在任何条件匹配时调用。
    isDesktop: `(min-width: ${breakPoint}px)`,
    isMobile: `(max-width: ${breakPoint - 1}px)`,
    reduceMotion: '(prefers-reduced-motion: reduce)',
  },
  (context) => {
    // context.conditions 为上面定义的每个条件都有一个布尔属性，指示它是否匹配。
    let { isDesktop, isMobile, reduceMotion } = context.conditions

    gsap.to('.box', {
      rotation: isDesktop ? 360 : 180, // 如果是桌面环境，则旋转更多
      duration: reduceMotion ? 0 : 2, // 如果 prefer reduced motion，则跳到结尾
    })

    return () => {
      // 可选返回一个清理函数，当所有条件不再匹配时将被调用（在匹配之后）。
      // 它将自动调用 context.revert() - 这里不要这么做。只在这里放置自定义清理代码。
    }
  },
)
```

简洁明了！🎉

它将在**任何**条件切换时撤销并再次运行处理函数（当然，如果没有任何条件匹配，它不会再次运行）。例如，如果您有三个条件，其中两个匹配，它将运行。然后，如果一个匹配的查询**停止**匹配（切换到 `false`），它将撤销并使用更新的条件值再次运行该函数。

注意，上下文作为唯一的参数创建并传入。如果您需要稍后创建事件处理程序或执行其他代码，这可能很有用，以便在调用 MatchMedia 上的 `revert()` 时创建的动画/ScrollTriggers 应该被撤销。

### 使用条件语法的演示

<iframe src="https://codepen.io/GreenSock/pen/KKoMpMv" width="100%" height="500" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" allow="autoplay; fullscreen; payment"></iframe>

### 交互性和清理

在执行函数时创建的 GSAP 动画和 ScrollTriggers 会被记录在上下文中，但是如果您设置了事件侦听器，例如 "click" 事件，它们将在 MatchMedia 函数执行完毕后的某个时间运行，怎么办？您可以将一个命名函数添加到上下文对象本身，以便当它运行时，该函数中创建的任何动画/ScrollTriggers 将被收集到上下文中，如下所示：

```javascript
let mm = gsap.matchMedia()

mm.add('(min-width: 800px)', (context) => {
  context.add('onClick', () => {
    gsap.to('.box', { rotation: 360 }) // 现在它被记录在上下文中
  })

  myButton.addEventListener('click', context.onClick)

  return () => {
    // 确保在清理函数中清理事件侦听器！
    myButton.removeEventListener('click', context.onClick)
  }
})
```

### 限定选择器文本

您可以选择性地传递一个元素或 React Ref 或 Angular ElementRef 作为第三个参数，然后提供的所有选择器文本将被限定到那个特定的元素/引用（就像在该元素/引用上调用 `querySelectorAll()`）。

```javascript
let mm = gsap.matchMedia();

mm.add("(min-width: 800px)", () => {
  gsap.to(".box", {...}) // 普通的选择器文本，自动限定到 myRefOrElement
}, myRefOrElement); // 限定！！！
```

`scope` 可以是选择器文本本身，如 `".myClass"`，或一个元素，React Ref 或 Angular ElementRef。

当您创建 MatchMedia 时，可以设置一个**默认作用域**，将其作为唯一参数传递：

```javascript
let mm = gsap.matchMedia(myRefOrElement);

mm.add("(min-width: 800px)", () => {
  // 选择器文本限定到 myRefOrElement
  gsap.to(".class", {...});
});

mm.add("(max-width: 799px)", () => {
  // 选择器文本限定到 myOtherElement
  gsap.to(".class", {...});
}, myOtherElement); // 覆盖默认作用域！！！
```

### 刷新所有匹配项

使用 `gsap.matchMediaRefresh()` 可以立即撤销所有活动/匹配的 MatchMedia 对象，然后运行当前匹配的任何对象。如果您需要适应切换减少运动偏好的 UI 复选框，这可能非常有用。

### 可访问动画与 prefers-reduced-motion

我们都喜欢这里的动画，但它可能会让一些患有前庭障碍的用户感到恶心。尊重他们的偏好，提供最小的动画或根本没有动画，这一点非常重要。我们可以为此利用 prefers reduced motion 媒体查询。

### 简单示例

<iframe src="https://codepen.io/GreenSock/pen/qBoRdqp" width="100%" height="500" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" allow="autoplay; fullscreen; payment"></iframe>

### 复选框切换

<iframe src="https://codepen.io/GreenSock/pen/RwMQwpR" width="100%" height="500" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" allow="autoplay; fullscreen; payment"></iframe>

更多信息请参见这篇 [CSS tricks](https://css-tricks.com/empathetic-animation/) 文章。

### 我需要使用 gsap.context() 吗？

不需要！内部地，gsap.matchMedia() 创建了一个 gsap.context()，所以同时使用两者将是多余的，也完全没有必要。把 gsap.matchMedia() 想象成一个围绕 gsap.context() 的专门包装器。所以当您调用 gsap.matchMedia() 对象上的 `revert()` 时，它与在 gsap.context() 上调用它是一样的。

### 示例

[查看 CodePen 集合](https://codepen.io/collection/vBebgJ)。

### 移动设备似乎不起作用？

尝试在 `<head></head>` 中添加以下内容：

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

gsap.matchMedia() 在 GSAP **3.11.0** 中添加。
