# GSAP中文文档 - SteppedEase

## SteppedEase

::: tip

SteppedEase 包含在 GSAP 的核心库中

:::

### 描述

大多数缓动方程在开始和结束值之间提供平滑、逐渐的过渡，但 SteppedEase 提供了一种简单的方法来定义过渡应该采取的特定步数。

例如，如果 x 是 0，你想要在 2 秒内将其补间到 100，并且有 5 步（20, 40, 60, 80 和 100），你会这样做：

```javascript
gsap.to(obj, { duration: 2, x: 100, ease: 'steps(5)' })
```

**注意：** SteppedEase 针对 GreenSock Animation Platform 进行了优化，因此不打算与其他引擎一起使用。具体来说，它的缓动方程总是返回介于 0 和 1 之间的值。
