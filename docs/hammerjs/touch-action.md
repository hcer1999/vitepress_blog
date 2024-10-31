# Touch-action 属性

Chrome 35+、IE10+以及即将支持的Firefox浏览器支持`touch-action`属性。这个属性告诉浏览器如何处理元素上的触摸操作。它极大地改善了手势的检测和体验，因为它可以防止页面滚动而无需执行任何JavaScript代码，在某些情况下，仅靠JavaScript可能来不及。

Hammer在需要时使用JavaScript作为此属性的后备方案，因此它也能在不支持的浏览器上工作。尽管如此，在一些（不流行）的设备上，后备方案可能不如原生支持效果好。

默认情况下，它会根据识别器设置来设置一个值。您可以通过给管理器（Manager）设置`touchAction`选项来覆盖这个值。

当您将`touchAction`设置为`auto`时，它不会阻止任何默认行为，Hammer可能会因此出现问题。您需要手动调用`preventDefault`来解决这个问题。只有当您知道自己在做什么时，才应该使用这个设置。

[**查看touch-action测试。**](https://cdn.rawgit.com/hammerjs/hammer.js/master/tests/manual/touchaction.html)

### 每个手势的首选touch-action值

如果您确实想要设置自己的值，那么下面的表格应该能帮到您……

| 手势          | 最不限制的touch-action值 |
| ------------- | ------------------------ |
| press         | auto                     |
| tap           | auto                     |
| multitap      | manipulation             |
| 垂直平移/滑动 | pan-x                    |
| 水平平移/滑动 | pan-y                    |
| 旋转          | pan-x pan-y              |
| 捏合          | pan-x pan-y              |
