# GSAP中文文档 - 属性插件（Attributes）

## 属性插件（Attributes）

::: info 什么是内部插件？

GSAP使用一个名为AttrPlugin的内部插件来对属性进行动画处理，这个插件**自动包含在GSAP的核心中**，**不需要使用`gsap.registerPlugin()`来加载**。你可以将内部插件视为GSAP的一部分。
:::

GSAP允许你轻松地对DOM元素的任何数值属性进行补间动画。例如，假设你的DOM元素如下所示：

```javascript
gsap.to('#rect', {
  duration: 1,
  // x在这里指的是x属性
  attr: { x: 100, y: 50, width: 100, height: 100 },
  ease: 'none',
  x: 200, // 动画translateX()变换
})
```

你可以同时对无限数量的属性进行补间动画。只需在`attr:{}`对象内使用相关的属性名即可。GSAP将保留后缀，如"%"，这意味着你可以对像`<rect width="50%"...>`这样的值进行补间动画。

**注意：你不能对属性进行单位转换（如px到%）**

::: warning 动画CSS

不要尝试在attr对象内对与CSS相关的属性进行动画处理。GSAP在内部对CSS的处理方式不同。在上面的例子中，`attr:{}`对象外的`x`将动画化CSS变换，而attr对象内的`x`将动画化底层几何形状——矩形元素的x坐标。

:::
