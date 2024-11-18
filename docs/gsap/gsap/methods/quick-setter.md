# GSAP中文文档 - gsap.quickSetter()

## gsap.quickSetter()

### `gsap.quickSetter()` 返回: 函数

#### 详情

如果您发现自己在相同的对象（或一组对象）上多次调用`gsap.set()`，比如在"mousemove"事件中，您可以通过创建一个quickSetter函数并使用它代替`gsap.set()`来**提升性能50% - 250%**。将quickSetter视为一个优化过的函数，它与特定目标（或一组目标的）属性绑定，可以直接将数据传递给它，并**跳过**正常`gsap.set()`调用中的便利任务，例如：

- 单位转换和自动添加单位（尽管您可以为quickSetter指定一个单位，该单位将始终附加到您输入的数字）
- 相对值
- 基于函数的值
- `"random()"` 解析
- 特定属性的特殊浏览器不一致性解决方案，如SVG元素上的transformOrigin（因此不建议为transformOrigin创建quickSetter）
- 属性名称别名转换（"x"可以用于变换，但"translateX"不行）

::: tip 提示
注意：不要害怕使用`gsap.set()`，因为在大多数情况下，您不会注意到通过切换到quickSetter而在现实世界中性能差异，并且`gsap.set()`提供了许多值得拥有的便利。但在GreenSock，我们是性能狂，所以我们想为性能关键情况下提供一种工具，用于超优化属性设置，在那里您有很多更新正在进行。
:::

#### 结合实用方法创建超强大的函数!

由于它接受单个值，您可以在`pipe()`之后将quickSetter放在末尾，与其他实用函数结合使用，这些函数对输入的数字执行有用的操作，如限制或捕捉或以某种方式净化值。例如：

```javascript
let xSetter = gsap.utils.pipe(
    gsap.utils.clamp(0, 100),    //确保数字在0到100之间
    gsap.utils.snap(5),          //捕捉到5的最近增量
    gsap.quickSetter("#id", "x", "px") //应用它到#id元素的x属性并附加一个"px"单位
);

//然后在稍后...
xSetter(150) //将#el的变换设置为translateX(100px)（限制在100）
xSetter(3)   //将其设置为5px（捕捉）
...
```

### 鼠标跟随器演示

<iframe src="https://codepen.io/GreenSock/pen/WNNNBpo" width="100%" height="500" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" allow="autoplay; fullscreen; payment"></iframe>

#### 如果您正在动画制作，请使用`gsap.quickTo()`

`gsap.quickSetter()`旨在立即设置值，但如果您更倾向于**动画**到新值，可以查看`gsap.quickTo()`方法。这里有一个使用该方法的鼠标跟随演示：

<iframe src="https://codepen.io/GreenSock/pen/xxpbORN" width="100%" height="500" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" allow="autoplay; fullscreen; payment"></iframe>

#### 多值技巧

您可以通过将quickSetter的`property`设置为**"css"**，然后以**对象**形式传入值，来获得CSSPlugin的好处（如相对值，`"random()"`解析等），并能够将**多个**属性应用于DOM元素：

```javascript
var boxSet = gsap.quickSetter('#box', 'css')
boxSet({ x: '+=100', y: 'random(-100, 100)' }) //有效!
```

这种技术也适用于属性（使用"attr"代替）：

```javascript
var circleSet = gsap.quickSetter('#circle', 'attr')
circleSet({ cx: '+=100', cy: 'random(-100, 100)' }) //有效!
```

但这种方法不会像使用特定属性如`gsap.quickSetter("#box", "x", "px")`那样提供同样的性能提升。不过，它仍然比标准的`gsap.set()`快。
