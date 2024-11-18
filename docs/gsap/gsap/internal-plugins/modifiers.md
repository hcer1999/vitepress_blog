# GSAP中文文档 - 修饰符插件（Modifiers）

## 修饰符插件（Modifiers）

::: info 什么是内部插件？

ModifiersPlugin是一个内部插件，它**自动包含在GSAP的核心中**，**不需要使用gsap.registerPlugin()来加载**。

你可以将内部插件视为GSAP的一部分。

:::

## 描述

你可以为几乎所有属性定义一个“修饰符”函数。这个修饰符拦截GSAP在每次更新（“tick”）时通常会应用的值，将其作为第一个参数传递给你的函数，并允许你运行自定义逻辑，返回一个新值，GSAP随后将应用这个值。这对于像吸附、限制、包装或其他动态效果的任务非常完美。

## value, target

修饰符函数传递两个参数：

1. `value` (_number_ | _string_) - 来自常规补间的即将被应用的值。这通常是数字，但可能是基于属性需求的字符串。例如，如果你正在动画化`x`属性，它将是一个数字，但如果动画化`left`属性，它可能是`"212px"`，或者对于`boxShadow`属性，它可能是`"10px 5px 10px rgb(255,0,0)"`。

2. `target` (_object_) - 目标本身。

例如，根据另一个对象的`y`改变一个对象的`x`，或根据移动方向改变`rotation`。以下是一些示例，可以帮助你熟悉语法。

## 吸附旋转

下面的补间动画使旋转360度，但修饰符函数强制值跳至最近的45度增量。注意修饰符函数如何获取被修改属性的值，在这种情况下是一个`rotation`数字。

<iframe src="https://codepen.io/GreenSock/pen/BzJxBB" width="100%" height="400" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>

## 使用模数限制

下面的补间动画使`x`动画到500，但修饰符函数强制值包装，使其始终在0和100之间。

<iframe src="https://codepen.io/GreenSock/pen/MeQmaG" width="100%" height="400" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>

使用GSAP的[wrap工具函数](<https://gsap.com/docs/v3/GSAP/UtilityMethods/wrap()>)，实现相同的效果：

<iframe src="https://codepen.io/GreenSock/pen/WNeWZWb/5364a46c2767c6258132f7805ea0035e" width="100%" height="400" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>

## 走马灯包装

你是否曾经构建过走马灯并为使其无缝循环而苦恼？也许复制了每个资产或编写了一些代码，当它到达末端时将每个项目移回开始。使用ModifiersPlugin，你可以用一个`.to()`和一个`stagger`得到一个无缝重复的走马灯！下面的示例将每个盒子补间到相对`x`位置`"+=500"`。点击“显示溢出”按钮，看看每个盒子在超过500时如何被重置为`x: 0`。

<iframe src="https://codepen.io/GreenSock/pen/QEdpLe" width="100%" height="400" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>

## 高级演示

我们只是触及了ModifiersPlugin能做什么的表面。我们的版主[Blake Bowen](https://gsap.com/community/profile/21420-osublake/)一直在测试这个插件，并有一个[令人印象深刻的演示集合](https://codepen.io/collection/AWxOyk/)，肯定会激发你的灵感。

## 注意事项：

- 要修改CSS变换的`scale`，请使用`scaleX`和`scaleY`（因为它是这些的快捷方式）。并使用`rotation`，而不是`rotationZ`。

- RoundPropsPlugin和SnapPlugin在内部与ModifiersPlugin使用相同的机制（为了最大化效率，最小化内存，并保持kb下降）。将`roundProps`补间视为仅创建一个修饰符的快捷方式，该修饰符应用`Math.round()`，因此你不能在同一个属性上同时进行`roundProps`和修饰符。不过，通过在修饰符函数内执行`Math.round()`，很容易获得该功能。

## 常见问题解答：

::: details 我如何将这个插件包含在我的项目中？

只需加载GSAP的核心 - ModifiersPlugin自动包含！

:::

::: details 我需要注册ModifiersPlugin吗？

不需要。ModifiersPlugin和其他核心插件内置于核心中，不需要注册。

:::
