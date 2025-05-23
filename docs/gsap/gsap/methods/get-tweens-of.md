# GSAP中文文档 - gsap.getTweensOf()

## gsap.getTweensOf()

返回一个数组，包含特定目标（或目标组）的所有尚未被释放用于垃圾回收的补间动画（Tweens）。

#### 返回值:

- 包含特定目标的所有补间动画的数组。
- 如果补间动画已完成，通常会被自动释放，这时将不会被此函数找到。

#### 功能说明:

`gsap.getTweensOf()` 能够找到所有关联到指定目标且尚未完成的补间动画。例如，`gsap.getTweensOf(".myClass")` 将返回应用于 "myClass" 类的所有元素的所有补间动画的数组。您也可以直接传递实际的元素/目标/对象。

#### 示例代码:

```javascript
gsap.to(obj1, { x: 100 }) // 向 obj1 创建一个补间动画
gsap.to(obj2, { x: 100 }) // 向 obj2 创建一个补间动画
gsap.to([obj1, obj2], { opacity: 0 }) // 同时向 obj1 和 obj2 创建一个不透明度的补间动画

var a1 = gsap.getTweensOf(obj1) // 查找 obj1 的 2 个补间动画
var a2 = gsap.getTweensOf([obj1, obj2]) // 查找 obj1 和 obj2 的 3 个补间动画
```

#### 注意事项:

- 此方法仅能找到尚未被释放用于垃圾回收的补间动画。如果您创建了一个补间动画，让它完成后，之后再尝试使用 `getTweensOf()` 找到它，可能无法找到，因为它已经被引擎释放。
- GSAP 的一大优点是它为您省去了手动管理垃圾回收的工作。否则，您需要手动处理每个创建的补间动画，这会让事情变得更加繁琐。
