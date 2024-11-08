# gsap.set()

立即相应地设置目标的属性 - 本质上是一个具有更直观名称的零持续时间 to() 补间。因此以下几行会产生相同的结果：

```js
gsap.set('.class', { x: 100, y: 50, opacity: 0 })
gsap.to('.class', { duration: 0, x: 100, y: 50, opacity: 0 })
```

当然，您可以使用数组或选择器文本同时设置多个目标的属性，例如：

```js
gsap.set([obj1, obj2, obj3], { x: 100, y: 50, opacity: 0 })
```

如果您发现自己多次反复设置同一对象的相同属性（例如在指针移动事件中），请考虑使用 gsap.quickSetter()，因为它可以提供更好的性能。
