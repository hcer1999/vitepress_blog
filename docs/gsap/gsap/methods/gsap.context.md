# gsap.context()

::: tip
如果您正在使用 React，我们已经引入了一个钩子，它抽象了 `gsap.context()` 并为您处理动画清理工作！

请前往 [React 指南](https://gsap.com/resources/React/)。
:::

`gsap.context()` 提供了两个关键好处：

- **收集所有在提供的函数中创建的 GSAP 动画和 ScrollTriggers**，这样您可以轻松地一次性 `revert()` 或 `kill()` **全部** 它们。不需要保留许多变量、数组等。这在 React 模块或任何需要通过将元素恢复到原始状态来进行 "清理" 的地方特别有用。
- **[可选地]** **将所有选择器文本限定到特定的元素或引用**。这可以大大简化您的代码，并避免在 React/Angular 中创建许多引用。在提供的函数内任何与 GSAP 相关的选择器文本将只适用于元素/引用的后代。

假设您有一个 **大型** GSAP 代码块，它创建了许多不同的动画，您需要能够一次性 `revert()` 它们...

```javascript
let ctx = gsap.context(() => {
  gsap.to(...);
  gsap.from(...);
  gsap.timeline().to(...).to(...);
  ...
});

// 然后在稍后...
ctx.revert(); // BOOM! 在该函数中创建的每个 GSAP 动画都得到了还原!
```

### 限定选择器文本

您可以可选地传递一个元素或 React 引用或 Angular ElementRef，然后提供的所有选择器文本将被限定到那个特定的元素/引用，这可以大大简化您的代码。不再需要为每个要动画化的元素创建引用！

```javascript
let ctx = gsap.context(() => {

  gsap.to(".box", {...}) // 正常的选择器文本，自动限定到 myRefOrElement
  gsap.from(".circle", {...});

}, myRefOrElement); // 限定!!!
```

`scope` 可以是选择器文本本身，如 ".myClass"，或一个元素，React 引用或 Angular ElementRef。

### 添加到上下文

也许您需要设置事件处理程序（如鼠标点击），这些处理程序创建了应该也被收集到上下文中的新动画，但显然这些事件会在上下文的函数已经执行后发生。没问题！您可以将 **您自己的方法** 添加到上下文对象，以便当它们运行时，它们将自动将任何结果 GSAP 动画/ScrollTriggers 添加到上下文中：

```javascript
let ctx = gsap.context((self) => {

  // 使用任何任意字符串作为名称；它将被添加到上下文对象中，所以在这种情况下，您可以稍后调用 ctx.onClick()...

  self.add("onClick", (e) => {
    gsap.to(...); // <-- 被添加到上下文中!
  });

}, myRefOrElement);

// 现在上下文有一个 onClick() 方法我们可以利用，该函数中的任何动画将被添加到上下文中
myButton.addEventListener("click", (e) => ctx.onClick(e));

```

或者，您可以直接添加内容到上下文 **立即** 像这样（函数作为第一个参数）：

```javascript
// 创建上下文
let ctx = gsap.context(() => {...});

// 然后在稍后，添加到它：
ctx.add(() => {
  gsap.to(...); // 现在所有这些被添加到上下文中。
  gsap.from(...);
});

```

### 清理函数

您可以可选地返回一个 "清理函数"，如果/当上下文被还原时应该被调用。这可以包含您自己的自定义清理代码：

```javascript
let ctx = gsap.context(() => {
  ...
  return () => {
    // 我的自定义清理代码。当触发 ctx.revert() 时调用。
  };
});

```

您也可以在任何 `.add()` 函数中返回清理函数；它们将在上下文的 `revert()` 被调用时全部被调用。

在非常罕见的情况下，您可能希望在函数内创建某些 GSAP 动画和/或 ScrollTriggers，并且应该从上下文中 **排除**（当上下文被还原/杀死时不还原/杀死），在这种情况下，您可以使用 `ignore()` 如下所示：

```javascript
let ctx = gsap.context((self) => {
  gsap.to(...); // <-- 当调用 ctx.revert() 时将被还原
  self.ignore(() => {
    gsap.to(...); // <-- 当调用 ctx.revert() 时将不被还原。被忽略，没有记录在上下文中。
  });
});

```

### 技巧 & 注意事项

- 当在上下文上调用 `revert()` 时，对于它包含的动画/ScrollTriggers 是 **永久性** 的。它们被还原和杀死，上下文清除自身，使事物符合垃圾回收的条件。但更多的动画仍然可以在那之后添加，并且可以在同一个上下文上再次调用 revert() 来还原/杀死那些。
- 上下文不打算用作控制动画的方式。Timelines 是为此而设计的。上下文仅仅是用于还原/杀死，并且 **[可选地]** 为选择器文本定义范围。
- 上下文对象本身传递给函数，所以您可以轻松引用它，如 `gsap.context((self) => { ... self.add(...); });`
- `gsap.context()` 在 **3.11.0** 版本中添加

希望这次的翻译和解释更加全面和准确。如果您还有其他问题或需要进一步的帮助，请告诉我。
