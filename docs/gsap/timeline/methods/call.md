# GSAP中文文档 - timeline 方法 - 调用(call)

## 调用（call）

向时间线的末尾（或使用 `position` 参数在其他地方）添加回调 - 这是一个方便的方法，实现的效果与 `add(gsap.delayedCall(...))` 完全相同，但代码更少。换句话说，以下两行代码产生相同的结果：

```javascript
function myFunction(param1, param2) {
  //...
}
tl.add(gsap.delayedCall(0, myFunction, ['param1', 'param2']))
tl.call(myFunction, ['param1', 'param2'])
```

这与在时间线上使用 `onComplete` 特殊属性不同，因为一旦你添加了回调，它就会保持在原位，而 `onComplete` 总是在时间线的末尾被调用。

### 方法签名

```plaintext
call(callback: Function, params: Array, position: [Number | String | Label]): self
```

向时间线的末尾（或使用 `position` 参数在其他地方）添加回调。

### 参数（Parameters）

- **callback**: Function

  - 要添加到时间线的回调函数。

- **params**: Array

  - 传递给回调函数的参数数组。

- **position**: [Number | String | Label]（可选）
  - 指定在时间线中插入回调的位置。

### 返回值（Returns）

- self
  - 返回实例本身，便于链式调用。

### 详细信息（Details）

例如，如果一个时间线包含一个1秒的补间，然后你 `call(myFunction)`，它会被放置在1秒的位置。然后如果你再添加一个1秒的补间，时间线的持续时间现在将是2秒，但 `myFunction` 回调仍然会在1秒的位置被调用。`onComplete` 会在末尾（2秒）被调用。

请记住，你可以将这些调用链式组合，并使用其他方便的方法如 `to()`, `fromTo()`, `set()` 等，快速构建序列：

```javascript
//create a timeline that calls myFunction() when it completes
var tl = gsap.timeline({ onComplete: myFunction })

//now we'll use chaining, but break each step onto a different line for readability...

//tween element's x to 100
tl.to(element, { duration: 1, x: 100 })
  //then call myCallback()
  .call(myCallback)
  //then set element.opacity to 0.5 immediately
  .set(element, { opacity: 0 })
  //then call otherFunction("param1", "param2")
  .call(otherFunction, ['param1', 'param2'])
  //finally tween the rotation of element1, element2, and element3 to 45 and stagger the start times by 0.25 seconds
  .to([element1, element2, element3], {
    duration: 1.5,
    rotation: 45,
    stagger: 0.25,
  })
```

默认情况下，调用被添加到时间线的**末尾**，但您可以使用位置参数精确控制它们的位置。它使用灵活的语法，具有以下选项：

- **绝对时间**（以秒为单位），从时间线的开始测量，作为一个**数字**，如 `3`

```javascript
// 从时间线的开始处精确插入3秒
tl.call(myFunction, ['param1', 'param2'], 3)
```

- **标签**，如 `"someLabel"`。如果标签不存在，它将被添加到时间线的末尾。

```javascript
// 在 "someLabel" 标签处插入
tl.call(myFunction, ['param1', 'param2'], 'someLabel')
```

- `"<"` 前一个动画的**开始**。将 `<` 视为指向前一个动画开始的指针。

```javascript
// 在前一个动画的开始处插入
tl.call(myFunction, ['param1', 'param2'], '<')
```

- `">"` 前一个动画的**结束**。将 `>` 视为指向前一个动画结束的指针。

```javascript
// 在前一个动画的结束处插入
tl.call(myFunction, ['param1', 'param2'], '>')
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

务必阅读我们的教程[《理解位置参数》](https://gsap.com/resources/position-parameter/) ，其中包含交互式时间线可视化和视频。
