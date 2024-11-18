# GSAP中文文档 - gsap.effects()

一旦效果已经被注册，你可以直接在 `gsap.effects` 对象上访问它，如下所示：

```javascript
//假设已经注册了一个名为 "explode" 的效果

gsap.effects.explode('.box', {
  direction: 'up', //可以引用作者决定的任何属性 - 在这个例子中是 "direction"
  duration: 3,
})
```

或者，如果你在注册效果时设置了 `extendTimeline: true`，你甚至可以直接在时间轴上调用它，以便将效果的结果插入到该时间轴中（见下文）。效果使得任何人都可以轻松地编写自定义动画代码（封装在一个接受 `targets` 和 `config` 对象的函数中），然后将其与特定的 `name` 关联，以便随时使用新的 target 和配置调用。例如，也许我们想要能够使事物淡出（这相当愚蠢，因为它非常简单，但这里的目标是展示它如何工作）：

```javascript
//向 GSAP 注册效果:
gsap.registerEffect({
  name: 'fade',
  effect: (targets, config) => {
    return gsap.to(targets, { duration: config.duration, opacity: 0 })
  },
  defaults: { duration: 2 }, //默认值将应用于传递给效果的任何 "config" 对象
  extendTimeline: true, //现在你可以直接在任何 GSAP 时间轴上调用效果，以便立即将结果插入到你定义的位置（默认是按顺序放在最后）
})

//现在我们可以这样使用它:
gsap.effects.fade('.box')

//或者直接在时间轴上:
let tl = gsap.timeline()
tl.fade('.box', { duration: 3 }).fade('.box2', { duration: 1 }, '+=2').to('.box3', { x: 100 })
```

<html>
    <iframe src="https://codepen.io/GreenSock/pen/MWgmQmM" width="100%" height="500" frameborder="0" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen"></iframe>
</html>

```javascript
//带有 extendTimeline: true
var tl = gsap.timeline()
tl.yourEffect('.class', { configProp: 'value' }, '+=position')

//如果没有 extendTimeline: true，你必须这样做来将实例添加到时间轴:
tl.add(gsap.effects.yourEffect('.class', { configProp: 'value' }), '+=position')
```

所以如果你在序列中大量使用某个效果，它可以节省你很多打字的工作。**重要**：任何具有 `extendTimeline:true` 的效果 **必须** 返回一个可以插入时间轴的 GSAP 兼容动画（一个 Tween 或 Timeline 实例）。

效果也很容易在不同的项目和人员之间共享。要查看已经创建的效果，请查看 CodePen 集合。

这里有一个示例，展示了如何生成多个预制的淡出效果，以便它们可以稍后重用：

<html>
    <iframe src="https://codepen.io/GreenSock/pen/Rwajpyb" width="100%" height="500" frameborder="0" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen"></iframe>
</html>
