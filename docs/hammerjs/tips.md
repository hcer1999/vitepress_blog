# 技巧和提示

## 事件委托和DOM事件

Hammer能够通过设置`domEvents: true`选项触发DOM事件。这将使您的方法如`stopPropagation()`可以使用事件委托。Hammer不会解绑已绑定的事件。

## 尽量避免垂直平移/滑动

垂直平移用于滚动页面，一些（较旧的）浏览器不发送事件，因此Hammer无法识别这些手势。一个选择是提供一种替代方式来执行相同的操作。

## 在真实设备上测试

有时Hammer只需要一些微调，比如滑动速度或其他一些阈值。此外，为了在较慢的设备上获得更好的性能，您应该尽量保持您的回调函数尽可能简单。像JankFree.org这样的网站有关于如何提高性能的文章。

## 在Windows Phone上移除点击高亮

在Windows Phone上的IE10和IE11在您点击一个元素时有一个小的点击高亮。添加这个元标签可以移除这个高亮。

```html
<meta name="msapplication-tap-highlight" content="no" />
```

## 无法选中文本

Hammer设置了属性以改善桌面上的平移体验。通常，桌面浏览器会在您拖动页面时选择文本。`user-select` CSS属性禁用了这个功能。

如果您关心文本选择而不是桌面体验，您可以简单地从默认设置中移除这个选项。确保您在创建实例之前这样做。

```javascript
delete Hammer.defaults.cssProps.userSelect
```

## 在点击结束之后，也会触发点击事件

那个点击事件也被称为‘幽灵点击’。我创建了一个小型函数来阻止在touchend之后的点击。它深受Ryan Fioravanti这篇文章的启发。

- [https://gist.github.com/jtangelder/361052976f044200ea17](https://gist.github.com/jtangelder/361052976f044200ea17)
