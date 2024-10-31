# 触摸模拟器 - Hammer.js

Hammer提供了一个调试工具，可以在浏览器中模拟触摸支持。它触发符合W3C规范的DOM触摸事件。当按下`shift`键时，您还可以使用多点触摸事件，如捏合和旋转。您也可以在不使用Hammer.js的其他项目中使用此工具。

# 如何使用

包含JavaScript文件，并在任何其他处理触摸输入的库之前调用`TouchEmulator()`函数。它将设置一些伪造属性来欺骗一些库的触摸检测，并在鼠标目标上触发`touchstart`、`touchmove`和`touchend`事件。

```html
<script src="touch-emulator.js"></script>
<script>
  TouchEmulator()
</script>
```

```javascript
function log(ev) {
  console.log(ev)
}

document.body.addEventListener('touchstart', log, false)
document.body.addEventListener('touchmove', log, false)
document.body.addEventListener('touchend', log, false)
```

该脚本还包括`document.createTouch`和`document.createTouchList`的polyfills。

# 工作原理

它监听`mousedown`、`mousemove`和`mouseup`事件，并将它们转换为触摸事件。如果鼠标事件的`shiftKey`属性为`true`，则启用多点触摸。

该脚本还阻止页面上的以下鼠标事件：`mousedown`、`mouseenter`、`mouseleave`、`mousemove`、`mouseout`、`mouseover`和`mouseup`。

# Web平台测试

该脚本已通过w3c web平台测试，并通过了所有测试，除了以下测试：

- _assert_true: event is a TouchEvent event expected true got false_
  - 我们触发的事件类型为`Event`
- _assert_equals: touch list is of type TouchList expected “[object TouchList]” but got “[object Array]”_
  - 我们返回的触摸列表是一个数组而不是`TouchList`对象
- _assert_equals: touch is of type Touch expected “[object Touch]” but got “[object Object]”_

# 书签工具

```javascript
javascript: !(function (a) {
  var b = a.createElement('script')
  ;(b.onload = function () {
    TouchEmulator()
  }),
    (b.src = '//cdn.rawgit.com/hammerjs/touchemulator/0.0.2/touch-emulator.js'),
    a.body.appendChild(b)
})(document)
```

从仓库下载脚本，或运行`bower install hammer-touchemulator`。

- [GitHub.com/hammerjs/touchemulator](https://github.com/hammerjs/touchemulator)
- [Hammer.js示例](https://hammerjs.github.io/touchemulator/)
- [Leaflet Maps示例](https://hammerjs.github.io/touchemulator/)
