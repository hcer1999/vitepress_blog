# gsap.registerEffect()

注册效果后，您可以直接在 gsap.effects 对象上访问它，如下所示：

```js
//assumes that an effect named "explode" has already been registered
gsap.effects.explode('.box', {
  direction: 'up', // reference any properties that the author decides - in this case "direction"
  duration: 3,
})
```

或者，如果您在注册效果时设置了 extendTimeline: true ，您甚至可以在时间轴上直接调用它，以便将效果的结果插入到该时间轴中（见下文）。效果使任何人都可以轻松编写封装在函数（接受 targets 和 config 对象）中的自定义动画代码，然后将其与特定的 name 关联以便可以随时使用新的目标和配置调用它。例如，也许我们希望能够让东西消失（这相当愚蠢，因为它太简单了，但这里的目标是展示它是如何工作的）：

```js
// register the effect with GSAP:
gsap.registerEffect({
  name: 'fade',
  effect: (targets, config) => {
    return gsap.to(targets, { duration: config.duration, opacity: 0 })
  },
  defaults: { duration: 2 }, //defaults get applied to any "config" object passed to the effect
  extendTimeline: true, //now you can call the effect directly on any GSAP timeline to have the result immediately inserted in the position you define (default is sequenced at the end)
})

// now we can use it like this:
gsap.effects.fade('.box')

// or directly on timelines:
let tl = gsap.timeline()
tl.fade('.box', { duration: 3 }).fade('.box2', { duration: 1 }, '+=2').to('.box3', { x: 100 })
```

GSAP 在这里提供 4 项关键服务：

- 它将“目标”解析为数组。因此，如果传入选择器文本，它将成为传递给效果函数的元素数组。
- 它每次都会将默认值应用于配置对象。无需添加一堆 if 语句或自己应用默认值。
- 如果您设置 extendTimeline: true ，效果的名称将作为方法添加到 GSAP 的时间轴原型中，这意味着您可以将该效果的实例直接插入到任何时间轴中，例如：

```js
//with extendTimeline: true
var tl = gsap.timeline()
tl.yourEffect('.class', { configProp: 'value' }, '+=position')

//without extendTimeline: true, you'd have to do this to add an instance to the timeline:
tl.add(gsap.effects.yourEffect('.class', { configProp: 'value' }), '+=position')
```

因此，如果您在序列中大量使用效果，它可以节省您大量的打字时间。重要提示：任何具有 extendTimeline:true 的效果都必须返回可插入到时间轴（补间或时间轴实例）中的 GSAP 兼容动画

- 它提供了一种注册/访问这些“效果”的集中方式。

效果也可以在不同的项目和人员之间轻松共享。要查看已创建的效果，请查看 CodePen 集合。
