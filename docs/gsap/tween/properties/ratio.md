# GSAP中文文档 - tween 属性 - 比率（ratio）

## 比率（ratio）

**只读** Tween 的进度（一个介于 0 和 1 之间的值，其中 0.5 在中间）**经过** `ease` 函数处理后的结果。因此，这个值可能会超出 0-1 的范围，比如在 `ease: "back"` 或 `ease: "elastic"` 的情况下。它可以用作您自己的插值的乘数，比如在 `onUpdate` 回调中。

所以，如果您有一个一秒长的 tween，其 ease 设置为 `"power2.out"`，在 0.5 秒的标记处（进度也是一半），`tween.progress()` 会报告 0.5，而 `tween.ratio` 会报告 0.875。如下代码所示，`this.ratio` 总是等于您可以通过将 tween 的 `.progress()` 传递给 ease 函数获得的值。

```javascript
const easeFunc = gsap.parseEase('power2.out')
const tween = gsap.to({ foo: 0 }, { foo: 10, duration: 1, ease: 'power2.out' })
tween.pause(0.5) // 在这个一秒长的 tween 中暂停在 0.5 秒，也就是半路

console.log(tween.progress()) // 0.5
console.log(tween.ratio) // 0.875
console.log(easeFunc(tween.progress())) // 0.875
```
