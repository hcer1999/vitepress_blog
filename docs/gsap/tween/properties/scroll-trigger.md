# GSAP中文文档 - tween 属性 - 滚动触发器（scrollTrigger）

## 滚动触发器（scrollTrigger）

::: info -

scrollTrigger: <Badge type="tip">ScrollTrigger</Badge> | <Badge type="tip">undefined</Badge>

:::
一个方便的方式来访问与 tween 关联的 ScrollTrigger 对象。这只在 tween 有 ScrollTrigger 时才能访问。

## 详细信息

::: warning 警告

只有当时间线或 tween **有** ScrollTrigger 时，才会向其添加 "scrollTrigger" 属性。

:::
更多详细信息，请参见 [ScrollTrigger 文档](#)

```javascript
// 为时间线添加 ScrollTrigger
let tl = gsap.to("#id", {scrollTrigger: {start: "top center"...}});

// 访问 ScrollTrigger 以调用各种方法
tl.scrollTrigger.refresh();
// 或
tl.scrollTrigger.kill();
```
