# gsap.getProperty()

返回属性的值，尽可能以数字形式（除非指定单位），如果属性不存在则返回 `null`。

#### 返回值:

- 如果可能，返回属性值的数字形式。
- 如果指定了单位，将单位添加到数字上，返回字符串形式。
- 如果属性不存在，返回 `null`。

#### 基本用法:

```javascript
gsap.getProperty('#id', 'x') // 返回数字，例如 20
gsap.getProperty('#id', 'x', 'px') // 返回字符串，例如 "20px"
gsap.getProperty('#id', 'backgroundColor') // 返回颜色值，例如 "rgb(255, 128, 0)"
```

#### 详细说明:

`getProperty()` 提供了一种简便的方式来获取任何属性的当前值。如果是 DOM 元素，您甚至可以让它转换为特定单位。对于 DOM 元素，它将按以下顺序检查属性（一旦找到就返回）：

1. 元素的内联 CSS
2. 元素的 `.getComputedStyle()` CSS
3. 元素自身的属性，如 `element.property`
4. 元素的属性，如 `element.getAttribute(property)`

如果省略单位参数，它将返回一个**数字**（至少对于简单值，`parseFloat()` 返回数字的情况）。例如，技术上是 "20px" 的 "top" 或 "left" 或 "x" 属性将返回 20（无单位后缀），因为在动画中经常需要处理数字。实际上，如果从 getProperty() 获取像 "20px" 这样的值，并手动将其包装在 `parseFloat()` 中，将会很烦人。但如果您想要包含单位，只需传入单位，如 `gsap.getProperty("#element", "x", "px")`，它将相应地返回字符串。

#### 示例:

```javascript
let w = gsap.getProperty('#id', 'width') // 可以使用选择器文本
let bgColor = gsap.getProperty(element, 'backgroundColor')
// 转换为特定单位，如 em
let emWidth = gsap.getProperty(element, 'width', 'em')
```

#### 可重用的 getter 函数:

如果您省略了 `property` 参数，`gsap.getProperty()` 将返回一个 getter 函数，您可以重用它来获取目标对象的属性：

```javascript
let getter = gsap.getProperty('#id')
var x = getter('x'),
  y = getter('y', 'em') // 以 em 为单位
```
