# GSAP中文文档 - timeline 方法 - 从...到...（fromTo）

## 从...到...（fromTo）

向时间线的末尾添加 `.fromTo()` 补间 - 这是一个方便的方法，实现的效果与 `add( gsap.fromTo(...) )` 完全相同，但代码更少。

### 方法签名

```plaintext
fromTo(target: [Object | Array | String], fromVars: Object, toVars: Object, position: [Number | String]): self
```

向时间线的末尾添加 `.fromTo()` 补间。

### 参数（Parameters）

- **target**: [Object | Array | String]

  - 目标对象（或对象数组），其属性将受到影响。这也可以是 CSS 选择器文本，如 `"#feature"` 或 `"h2.author"`（GSAP 将选择器字符串传递给 `document.querySelectorAll()`）。

- **fromVars**: Object

  - 定义每个属性的起始值的对象，这些属性应该被动画化。不要在这里放置特殊属性，如持续时间、缓动、延迟等 - 那些应该放在 **toVars** 参数中。

- **toVars**: Object

  - 定义每个属性的结束值的对象，这些属性应该被动画化，以及任何特殊属性，如 `duration`, `onComplete`, `ease` 等。

- **position**: [Number | String]
  - （默认值为 `"+=0"`）控制时间线上的插入点（默认情况下，它是时间线的末尾）。详见下面的选项，或参考位置参数文章，其中包含交互式时间线可视化和视频。如果定义了一个尚不存在的标签，它将**自动被添加到时间线的末尾**。

### 返回值（Returns）

- self
  - 返回实例本身，便于链式调用。

### 详细信息（Details）

向时间线的末尾（或使用 `position` 参数在其他地方）添加 `gsap.fromTo()` 补间 - 这是一个方便的方法，实现的效果与 `add( gsap.fromTo(...) )` 完全相同，但代码更少。例如：

```javascript
var tl = gsap.timeline()

var tween = gsap.fromTo(element, { x: -100 }, { duration: 1, x: 100 })
tl.add(tween)

// 这行代码与前两行代码产生相同的结果（只是更短）
tl.fromTo(element, { x: -100 }, { duration: 1, x: 100 })
```

**查看 `gsap.fromTo()` 文档以了解 `fromTo()` 补间可用的所有详细信息和特殊属性。**

您可以将这些调用链式组合，并使用其他方便的方法如 `to()`, `call()`, `set()` 等，快速构建序列：

```javascript
//create a timeline that calls myFunction() when it completes
var tl = gsap.timeline({ onComplete: myFunction })

//now we'll use chaining, but break each step onto a different line for readability...

//tween element's x from -100 to 100
tl.fromTo(element, { x: -100 }, { duration: 1, x: 100 })

  //then tween element's y to 50
  .to(element, { duration: 1, y: 50 })

  //then set element's opacity to 0.5 immediately
  .set(element, { opacity: 0 })

  //then call otherFunction()
  .call(otherFunction)

  //finally tween the rotation of all elements with the class "myClass" to 45 and stagger the start times by 0.25 seconds
  .to('.myClass', { duration: 1.5, rotation: 45, stagger: 0.25 })
```

## 在时间线上定位动画

默认情况下，动画被添加到时间线的**末尾**，以便它们一个接一个地顺序播放，但您可以使用位置参数精确控制它们的位置。它通常在 **vars** 参数之后使用，并且具有以下灵活的语法选项：

- **绝对时间**（以秒为单位），从时间线的开始测量，作为一个**数字**，如 `3`

```javascript
// 从时间线的开始处精确插入3秒
tl.fromTo('.class', { x: 100 }, { x: 200 }, 3)
```

- **标签**，如 `"someLabel"`。如果标签不存在，它将被添加到时间线的末尾。

```javascript
// 在 "someLabel" 标签处插入
tl.fromTo('.class', { x: 100 }, { x: 200 }, 'someLabel')
```

- `"<"` 前一个动画的**开始**。将 `<` 视为指向前一个动画开始的指针。

```javascript
// 在前一个动画的开始处插入
tl.fromTo('.class', { x: 100 }, { x: 200 }, '<')
```

- `">"` 前一个动画的**结束**。将 `>` 视为指向前一个动画结束的指针。

```javascript
// 在前一个动画的结束处插入
tl.fromTo('.class', { x: 100 }, { x: 200 }, '>')
```

- 一个复杂的字符串，其中 `"+="` 和 `"-="` 前缀表示**相对**值。当一个数字跟随 `<` 或 `">"` 时，它被解释为相对的，所以 `"<2"` 与 `"<+=2"` 相同。示例：

  - `"+=1"` - 比时间线结束早1秒（创建间隙）
  - `"-=1"` - 比时间线结束晚1秒（重叠）
  - `"myLabel+=2"` - 比标签 `"myLabel"` 晚2秒
  - `"<+=3"` - 比前一个动画的开始晚3秒
  - `"<3"` - 与 `"<+=3"` 相同（见上文）（当跟随 `<` 或 `">"` 时，`"+="` 是隐含的）
  - `">-0.5"` - 比前一个动画的结束早0.5秒。就像说 "前一个动画的结束加上 -0.5"

- 一个基于**百分比**的复杂字符串。当紧跟 `"+="` 或 `"-="` 前缀时，百分比是基于**被插入动画**的总持续时间。当紧跟 `<` 或 `">"` 时，它是基于**前一个动画**的总持续时间。注意：总持续时间包括重复/悠悠。示例：

  - `"-=25%"` - 与时间线结束重叠，重叠部分为插入动画总持续时间的25%
  - `"+=50%"` - 超过时间线结束，超过部分为插入动画总持续时间的50%，创建间隙
  - `"<25%"` - 从前一个动画的开始25%处。与 `">-75%"` 相同，即从前一个动画的结束处负75%
  - `"<+=25%"` - 从前一个动画的开始处插入动画总持续时间的25%。与 `"<25%"` 不同，后者的百分比是基于前一个动画的总持续时间，而任何紧跟 `"+="` 或 `"-="` 的都基于插入动画的总持续时间。
  - `"myLabel+=30%"` - 从标签 `"myLabel"` 处插入动画总持续时间的30%

**基于百分比的值是在 GSAP 3.7.0 中添加的**

**“前一个动画”** 指的是最近插入的动画，而不一定是最接近时间线末尾的动画。

## 位置参数交互式演示

<iframe src="https://codepen.io/GreenSock/pen/PopXddg" width="100%" height="800" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>

务必阅读[位置参数](https://gsap.com/resources/position-parameter)，其中包含交互式时间线可视化和视频。

::: info 信息

默认情况下，`fromTo()` 补间中的 `immediateRender` 是 `true`，这意味着它们会立即渲染起始状态，而不管指定了任何延迟。您可以通过在 vars 参数中传递 `immediateRender: false` 来覆盖此行为，以便它将等待直到补
间实际开始才渲染。

:::
