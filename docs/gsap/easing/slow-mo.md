# GSAP中文文档 - SlowMo

## SlowMo

::: details 快速开始

CDN 链接: https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/EasePack.min.js

```javascript
gsap.registerPlugin(EasePack)
```

#### 使用示例

```javascript
// 我们从缩放比例 1 开始，动画到 2，因此将这些值传入 config()...
gsap.to('#image', { duration: 1, scale: 2, ease: 'expoScale(1, 2)' })
```

:::

::: warning 不包含在核心库中

这个缓动效果在 EasePack 文件中。要了解如何将此包含在您的项目中，请查看[安装页面](/gsap/start)。

:::

### 描述

SlowMo 是一个可配置的缓动函数，产生慢动作效果，最初减速，然后在一定部分的缓动中线性移动（你可以选择），最后再次加速；它非常适合像将文本缩放至屏幕上，平滑移动足够长的时间供人们阅读，然后缩放离开屏幕这样的效果。

没有 SlowMo，动画师通常会尝试通过序列化 3 个 tweens 来获得相同的效果，一个带有 `.out` 缓动，然后另一个不带缓动（`ease: "none"`），最后是一个 `.in` 缓动。但问题是缓动之间没有平滑过渡，你会在连接处看到速度的突然变化。SlowMo 解决了这个问题，并让你完全控制两端的缓动强度以及中间线性运动的部分。

第一个参数 `linearRatio` 决定了缓动期间变化速率将线性（稳定速度）的比例。这应该是一个介于 0 和 1 之间的数字。例如，0.5 将是一半，所以缓动的前 25% 将是缓出（减速），然后 50% 将是线性的，最后的 25% 将是缓入（加速）。默认值是 0.7。

第二个参数 `power` 决定了两端缓动的强度。如果你定义了一个大于 1 的值，它实际上会反转中间的线性部分，这可以创造出有趣的效果。默认值是 0.7。

第三个参数 `yoyoMode` 提供了一种简单的方法来创建与正常 SlowMo tweens 同步的配套 tweens。例如，假设你有一个 SlowMo tween 正在将一些文本缩放到屏幕上，并在一段时间内线性移动，然后缩放离开，但你想在位置 tween 的开始和结束时调整文本的 alpha。通常，你需要创建 2 个单独的 alpha tweens，1 个用于开始时的淡入，1 个用于结束时的淡出，你需要手动计算它们的持续时间，以确保它们在线性运动开始前完成淡入，然后在线性运动结束时开始淡出。但为了使整个过程更简单，你只需要为 alpha 创建一个单独的 tween，并使用相同的持续时间，但 SlowMo 缓动的 `yoyoMode` 参数设置为 `true`。

### 示例代码

```javascript
// 使用默认的 SlowMo 缓动（linearRatio 为 0.7 和 power 为 0.7）
gsap.to(myText, { duration: 5, x: 600, ease: 'slow' })

// 这与上面的行具有完全相同的效果，但使用了不同的语法
gsap.to(myText, { duration: 5, x: 600, ease: 'slow(0.5, 0.8)' })

// 现在让我们创建一个与上述位置 tween 同步的不透明度 tween，在开始时淡入，在结束时淡出
gsap.from(myText, { duration: 5, opacity: 0, ease: 'slow(0.5, 0.8, true)' })
```
