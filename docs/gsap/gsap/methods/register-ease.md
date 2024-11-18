# GSAP中文文档 - gsap.registerEase()

## gsap.registerEase()

使用 gsap.registerEase() 向 GSAP 注册您自己的缓动函数，并为其指定一个可以在任何动画中引用的名称。这些缓动通常返回 0 到 1 之间的值，但也可能超出该范围（如 GSAP 的弹性缓动）。

例如：

```js
gsap.registerEase('myEaseName', function (progress) {
  return progress //linear
})

//now we can apply the ease in any tween like:
gsap.to('.class', { x: 100, ease: 'myEaseName' })
```
