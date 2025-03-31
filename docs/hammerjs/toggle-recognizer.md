# Hammer.js 中文文档 - 在运行时切换识别器

手势识别器可以根据其`enable`属性启用或禁用，该属性必须通过`set`方法调用或构造函数参数来设置。

```javascript
// 禁用tap手势
hammer.get('tap').set({ enable: false })

// 然后在需要的时候再次启用它
hammer.get('tap').set({ enable: true })
```

与其在应用程序中每次都切换`enable`属性，您可以将这个责任委托给一个自定义函数，该函数将与每个新的触摸事件一起检查，以决定事件是否可以被派发到识别器。这个特性提供了基于应用/UI逻辑构建复杂手势场景的支持。

```javascript
var view = View.extend({
  state: 'ACTIVE',
  score: 0,
  canRecognizeTap: function (recognizer, event) {
    return this.state !== 'INACTIVE' && this.score > 0
  },
})

var mc = new Hammer.Manager(viewElement, {})
var canEnable = function (rec, input) {
  return view.canRecognizeTap(rec, input)
}
mc.add(new Hammer.Tap({ enable: canEnable }))
```

`Manager.enable`选项也可以以这种方式工作。
