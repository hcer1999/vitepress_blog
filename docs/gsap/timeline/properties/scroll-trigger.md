# GSAP中文文档 - timeline 属性 - 滚动触发器（scrollTrigger）

## 滚动触发器（scrollTrigger）

一个方便的方式来访问与时间线相关联的 ScrollTrigger。这只在时间线有 ScrollTrigger 时才能访问。

## 详细信息（Details）

::: warning 警告

只有当时间线或补间有 ScrollTrigger 时，才会在其上添加 `scrollTrigger` 属性。

:::

有关更多详细信息，请参见 [ScrollTrigger 文档](#)。

```javascript
// 为时间线添加 ScrollTrigger
let tl = gsap.timeline({scrollTrigger: {start: "top center"...}});

// 访问 ScrollTrigger 以调用各种方法
tl.scrollTrigger.refresh();
// 或者
tl.scrollTrigger.kill();
```
