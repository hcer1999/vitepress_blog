# Hammer.js 中文文档 - 要求其他识别器失败

使用`requireFailure()`方法，您可以让一个识别器在另一个识别器失败之前不进行识别。这在您想要嵌套两个手势时非常有用，比如水平平移（pan-horizontal）和垂直平移（pan-vertical）。您可以使用`dropRequireFailure()`方法移除这种依赖。

```javascript
var horizontal = new Hammer.Pan({
  event: 'panh',
  direction: Hammer.DIRECTION_HORIZONTAL,
})
var vertical = new Hammer.Pan({
  event: 'panv',
  direction: Hammer.DIRECTION_VERTICAL,
})
vertical.requireFailure(horizontal)
```

[**查看示例实现。**](https://cdn.rawgit.com/hammerjs/hammer.js/master/tests/manual/nested.html)

## 使用requireFailure识别多次轻触

由于可以同时识别多个手势，并且一个手势可以根据其他手势的失败来识别，因此可以很容易地通过这种方式识别同一元素上的多次轻触：

```javascript
var hammer = new Hammer(el, {})

var singleTap = new Hammer.Tap({ event: 'singletap' })
var doubleTap = new Hammer.Tap({ event: 'doubletap', taps: 2 })
var tripleTap = new Hammer.Tap({ event: 'tripletap', taps: 3 })

hammer.add([tripleTap, doubleTap, singleTap])

tripleTap.recognizeWith([doubleTap, singleTap])
doubleTap.recognizeWith(singleTap)

doubleTap.requireFailure(tripleTap)
singleTap.requireFailure([tripleTap, doubleTap])
```

当一个轻触手势需要另一个手势失败才能被识别时，它的识别器会等待一个短暂的时间来检查其他手势是否失败。在这种情况下，您不应该假设它的轻触手势事件会立即被触发。
