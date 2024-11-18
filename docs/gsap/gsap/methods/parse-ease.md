# GSAP中文文档 - gsap.parseEase()

## gsap.parseEase()

将缓动字符串输入 `gsap.parseEase()`，它将返回相应的解析后的缓动函数。例如：

```javascript
// 简单缓动
let ease = gsap.parseEase('power1')

// 或者可配置的缓动：
let step = gsap.parseEase('steps(5)')
let elastic = gsap.parseEase('elastic(1.2, 0.5)')
```

如果已加载/注册 `CustomEase`，则您甚至可以传入 Cubic Bezier 值，它将返回相应的自定义缓动函数，如：

```javascript
// 如果已加载 CustomEase，GSAP 也可以解析 cubic bezier 值：
let ease = gsap.parseEase('.17,.67,.83,.67')
```

对于更复杂的用例，请参见[混合缓动辅助函数](https://gsap.com/docs/v3/HelperFunctions#blend-eases)。

`gsap.parseEase()` 函数提供了一种简便的方法来根据缓动字符串获取实际的缓动函数，这些函数可以直接用于 GSAP 动画中的 `ease` 属性。此功能特别有用于处理复杂的缓动效果，或者当您需要根据条件动态改变缓动效果时。
