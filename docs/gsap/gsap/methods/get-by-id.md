# gsap.getById()

这个函数用于获取与给定 ID 相关联的补间动画（Tween）或时间轴（Timeline）。如果没有任何补间动画或时间轴具有该 ID，则返回 `undefined`。

#### 功能说明：

当创建一个补间动画或时间轴时，您可以为其分配一个 `id`，以便之后可以引用它。这在使用框架和构建工具（如 React）时非常有用，在这些工具中跟踪变量可能会很困难。

#### 示例代码：

```javascript
// 创建一个补间动画并为其分配一个 ID
gsap.to(obj, { id: 'myTween', duration: 1, x: 100 })

// 稍后，通过 ID 获取补间动画
let tween = gsap.getById('myTween') // 返回补间动画
tween.pause() // 可以控制该补间动画，例如暂停
```

#### 重要提示：

GSAP 会在动画完成后不久自动释放它们，以便进行垃圾回收，因此 `getById()` 只能找到处于活动状态或尚未开始的动画。否则，如果保留所有动画以备不时之需，调用 `getById()` 来查找它们，这可能会导致系统迅速堵塞并引起内存泄漏。如果您需要在动画完成后仍然保持对动画的引用，您应该使用变量，如下所示：

```javascript
let myTween = gsap.to(obj, { id: 'myTween', duration: 1, x: 100 })
// 这样即使动画完成，您也可以通过变量 myTween 引用它
```
