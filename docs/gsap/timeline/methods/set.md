# GSAP中文文档 - timeline 方法 - 设置（set）

## 设置（set）

set 方法用于在时间轴的末尾（或使用 `position` 参数在其他地方）添加一个零持续时间的补间，当虚拟播放头到达时间轴上的该位置时立即设置值。这是一个便捷方法，与 `add( gsap.to(target, {duration: 0, ...}) )` 完成相同的操作，但代码更少。

### 方法签名

```plaintext
set(target: [Object | Array | String], vars: Object, position: [Number | String]): self
```

在时间轴的末尾（或使用 `position` 参数在其他地方）添加一个 `gsap.set()`。

### 参数（Parameters）

- **target**: [Object | Array | String]

  - 目标对象（或对象数组），其属性将被设置。

- **vars**: Object

  - 一个对象，定义每个属性应该设置的值。例如，要将元素的 `left` 设置为 100，将元素的 `top` 设置为 200，可以这样做：`myTimeline.set(element, {left: 100, top: 200});`

- **position**: [Number | String]
  - 默认值为 `"+=0"`。控制时间轴中的插入点（默认情况下，它在时间轴的末尾）。如果定义了一个尚不存在的标签，它将**自动被添加到时间轴的末尾**。

### 返回值（Returns）

- self
  - 返回实例本身，便于链式调用。

### 详细信息（Details）

在时间轴的末尾（或使用 `position` 参数在其他地方）添加一个 `gsap.set()`。这是一个便捷方法，与 `add( gsap.set(...) )` 完成相同的操作，但代码更少。例如：

```javascript
var tl = gsap.timeline()

var setValues = gsap.set(element, { x: 100, opacity: 0.5 })
tl.add(setValues)

// 这行代码与前两行代码产生相同的结果（只是更短）
tl.set(element, { x: 100, opacity: 0.5 })
```

**查看 `gsap.set()` 文档以了解所有详细信息和 `set()` 可用的特殊属性。**

你可以将这些调用链式连接，并使用其他便捷方法如 `to()`, `call()`, `from()` 等，快速构建序列：

```javascript
//create a timeline that calls myFunction() when it completes
var tl = gsap.timeline({ onComplete: myFunction })

//now we'll use chaining, but break each step onto a different line for readability...

//tween element's x from -100
tl.from(element, { duration: 1, x: -100 })
  //then tween element's y to 50
  .to(element, { duration: 1, y: 50 })
  //then set element's opacity to 0.5 immediately
  .set(element, { opacity: 0 })
  //then call otherFunction()
  .call(otherFunction)
  //finally tween the rotation of all elements with the class "myClass" to 45 and stagger the start times by 0.25 seconds
  .to('.myClass', { duration: 1.5, rotation: 45, stagger: 0.25 })
```

## 在时间轴中定位 set()

默认情况下，set() 调用被添加到时间轴的**末尾**，但你可以使用方法参数来精确控制放置位置。它使用灵活的语法，具有以下选项：

- **绝对时间**（以秒为单位），从时间轴的开始测量，作为一个**数字**，如 `3`

```javascript
// insert exactly 3 seconds from the start of the timeline
tl.set('.class', { x: 100 }, 3)
```

- **标签**，如 `"someLabel"`。如果标签不存在，它将被添加到时间轴的末尾。

```javascript
// insert at the "someLabel" label
tl.set('.class', { x: 100 }, 'someLabel')
```

- `<` 表示前一个动画的**开始**。将 `<` 视为指向前一个动画开始的指针。

```javascript
// insert at the START of the previous animation
tl.set('.class', { x: 100 }, '<')
```

- `>` 表示前一个动画的**结束**。将 `>` 视为指向前一个动画结束的指针。

```javascript
// insert at the END of the previous animation
tl.set('.class', { x: 100 }, '>')
```

- 一个复杂的字符串，其中 `"+="` 和 `"-="` 前缀表示**相对**值。当一个数字跟随 `<` 或 `>` 时，它被解释为相对的，所以 `"<2"` 与 `"<+=2"` 相同。

  - `"+=1"` - 1秒后的时间轴末尾（创建一个间隔）
  - `"-=1"` - 1秒前的时间轴末尾（重叠）
  - `"myLabel+=2"` - 标签 `"myLabel"` 后2秒
  - `"<+=3"` - 前一个动画开始后3秒
  - `"<3"` - 与 `"<+=3"` 相同（见上文）（当跟随 `<` 或 `>` 时，`"+="` 被隐含）
  - `">-0.5"` - 前一个动画结束前0.5秒。就像说 "前一个动画的结束加上 -0.5"

- 一个基于**百分比**的复杂字符串。当紧跟 `"+="` 或 `"-="` 前缀时，百分比基于**被插入动画**的总持续时间。当紧跟 `<` 或 `>` 时，它基于**前一个动画**的总持续时间。注意：总持续时间包括重复/yoyos。

  - `"-=25%"` - 与时间轴末尾重叠25%的插入动画总持续时间
  - `"+=50%"` - 超出时间轴末尾50%的插入动画总持续时间，创建一个间隔
  - `"<25%"` - 前一个动画的25%（从其开始）。与 `">-75%"` 相同，即从前一个动画的**结束**负75%。
  - `"<+=25%"` - 插入动画总持续时间的25%过去前一个动画的开始。与 `"<25%"` 不同，其百分比基于**前一个动画**的总持续时间，而任何紧跟 `"+="` 或 `"-="` 的都基于**插入动画**的总持续时间。
  - `"myLabel+=30%"` - 标签 `"myLabel"` 后插入动画总持续时间的30%。

**百分比值是在 GSAP 3.7.0 中添加的**

**前一个动画指的是最近插入的动画，不一定是最接近时间轴末尾的动画。**

## 位置参数交互式演示

<iframe src="https://codepen.io/GreenSock/pen/PopXddg" width="100%" height="500"></iframe>

务必阅读[位置参数文章](https://gsap.com/resources/position-parameter)，包括交互式时间轴可视化和视频。

默认的 `immediateRender` 值为 `false`。有关 `immediateRender` 的更多信息，请参见[这篇文档](https://gsap.com/resources/immediaterender)。