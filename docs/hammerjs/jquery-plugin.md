# jQuery Plugin - Hammer.js

有一个小型的jQuery插件，它只是`Hammer()`类的一个小包装器。它还通过触发jQuery事件扩展了`Manager.emit`方法。

```javascript
$(element).hammer(options).bind('pan', myPanHandler)
```

Hammer实例存储在`$element.data("hammer")`中。

- 获取插件：[前往GitHub](https://github.com/hammerjs/jquery.hammer.js)
