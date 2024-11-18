# GSAP中文文档 - 数组结束插件（EndArray）

## 数组结束插件（EndArray）

::: info 什么是内部插件？

EndArrayPlugin是一个内部插件，它**自动包含在GSAP的核心中**，**不需要使用`gsap.registerPlugin()`来加载**。
你可以将内部插件视为GSAP的一部分。

:::

EndArray插件使你能够对一个数值数组进行补间动画，使其变为另一个数值数组，并且应用缓动效果。

```javascript
const arr = [1, 2, 3]

gsap.to(arr, {
  endArray: [5, 6, 7],
  onUpdate() {
    console.log(arr)
  },
})
```

如果你有两个长度不等的数组，只有两个数组中都存在的索引会被动画化。
