# gsap.isTweening()

`gsap.isTweening()` 函数报告一个特定对象是否正在被动画化。如果一个补间动画（tween）被暂停、已完成或尚未开始，则它不被认为是活动的。例如：

```javascript
if (!gsap.isTweening('#id')) {
  // 执行一些操作
}
```

在这个例子中，如果与 `#id` 选择器匹配的对象当前没有被动画化，则执行一些操作。目标可以是选择器文本或对象/元素。
