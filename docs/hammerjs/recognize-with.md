# Hammer.js 中文文档 - 同时识别

如果您想要同时识别两个手势，可以使用`recognizeWith()`方法。以下示例展示了如何将捏合（pinch）和旋转（rotate）识别器结合起来使用，这将提升可用性。

```javascript
var pinch = new Hammer.Pinch()
var rotate = new Hammer.Rotate()
pinch.recognizeWith(rotate)
```

现在Hammer能够同时运行捏合和旋转手势。您也可以在识别器实例上使用`dropRecognizeWith()`方法将它们分开。

[**查看示例实现。**](https://cdn.rawgit.com/hammerjs/hammer.js/master/tests/manual/visual.html)
