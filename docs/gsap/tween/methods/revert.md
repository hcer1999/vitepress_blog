# GSAP中文文档 - tween 方法 - 撤销（revert）

## 撤销（revert）

撤销动画并终止它，将目标恢复到动画前的状态，包括移除动画添加的内联样式。

### 返回值（Returns）

- Self
  - Tween本身，便于链式调用。

### 详细信息（Details）

撤销动画并终止它，将目标恢复到动画前的状态，包括移除动画添加的内联样式。

### 问题（The problem）

如果你想将一个元素恢复到**动画之前**的状态怎么办？你可能会想到使用 `animation.progress(0)`，对吧？《差不多》。考虑这个元素：

**完全没有内联样式**。不透明度是1（默认值），然后你执行这个操作：

```javascript
// 淡出
let tween = gsap.to('.box', { opacity: 0 })
```

现在让我们尝试恢复到原始状态：

```javascript
tween.progress(0).pause()
```

这确实将其设置回了GSAP从计算样式解析的起始值：

```html
<!-- 内联样式仍然存在 -->
<div class="box" style="opacity: 1"></div>
```

但这意味着**它仍然有内联样式**。通常这没关系，但也许一个媒体查询CSS规则将该元素的不透明度设置为0.5。哦！内联样式将覆盖类规则。因此，我们需要一种方法让补间/时间线跟踪原始内联样式并**移除**它添加的样式。这需要一个新的方法，因为 `progress(0)` 《应该》设置内联样式以确保状态是动画该点应有的状态。

### 解决方案：animation.revert()

GSAP 3.11为所有Tweens和Timelines添加了一个 `.revert()` 方法，所以它就像这样简单：

```javascript
animation.revert() // 移除动画添加的内联样式
```
