# GSAP中文文档 - CustomWiggle

## CustomWiggle <Badge text="会员特权"/>

::: details 快速开始

CustomWiggle 是 GSAP 俱乐部的特权功能，立即加入或使用此试用链接免费试用。它在本地主机、Codepen、CodeSandbox 和 Stackblitz 上均可使用。

CDN链接：https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/CustomWiggle.min.js

```javascript
gsap.registerPlugin(CustomEase, CustomWiggle)
```

### 使用示例：

```javascript
// 创建一个默认类型为 "easeOut"，有6次振荡的抖动效果
CustomWiggle.create('myWiggle', { wiggles: 6 })

// 现在在缓动中使用它。"rotation" 将旋转到 30 度，然后以相同的幅度反向抖动，最终回到起始位置。
gsap.to('.class', { duration: 2, rotation: 30, ease: 'myWiggle' })
```

:::

## 描述

CustomWiggle 是 GSAP 中的一个插件，它继承自 CustomEase，因此在使用 CustomWiggle 时，也需要在你的项目中包含 CustomEase。CustomWiggle 允许你设置抖动的量（wiggle amount）和类型（type）。

## 动画演示

CustomWiggle Types

<iframe src="https://codepen.io/GreenSock/pen/oNvQeMM" frameborder="no" loading="lazy" width="100%" height="500" allowtransparency="true" allowfullscreen="true" ></iframe>

## 配置对象

| 属性          | 描述                                                                                                                                                                                                                                                                               |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| wiggles       | **整数** - 来回振荡的次数。默认值：10。                                                                                                                                                                                                                                            |
| type          | **字符串** - 抖动的类型（或风格）。可选值："easeOut"、"easeInOut"、"anticipate"、"uniform"、"random"。默认值："easeOut"。（参见上面的演示）。                                                                                                                                      |
| amplitudeEase | **缓动函数** - 提供对振幅（在缓动可视化工具中为y轴）形状的高级控制。你定义一个缓动函数来控制振幅从1向0在补间过程中的进展。定义amplitudeEase（或timingEase）将覆盖"type"（将5个"类型"视为amplitudeEase和timingEase组合的便捷预设）。参见示例CodePen进行操作和可视化了解其工作原理。 |
| timingEase    | **缓动函数** - 提供对波形如何随时间绘制的高级控制（在缓动可视化工具中为x轴）。定义timingEase（或amplitudeEase）将覆盖"type"（将5个"类型"视为amplitudeEase和timingEase组合的便捷预设）。参见示例CodePen进行操作和可视化了解其工作原理。                                             |

如何控制抖动的强度（或者它移动的距离）？只需设置补间动画属性值本身即可。例如，一个旋转到30度（rotation:30）的抖动会比旋转到10度（rotation:10）的抖动更强。请记住，缓动只控制向您为补间中的每个属性提供的值的移动比例。

## 示例代码

```javascript
gsap.registerPlugin(CustomEase, CustomWiggle) // 注册

// 创建一个有6个振荡的摆动（默认类型："easeOut"）
CustomWiggle.create('myWiggle', { wiggles: 6 })

// 现在在缓动中使用它。"rotation" 将摆动到 30 然后以相同的幅度反向摆动，最终回到起始位置。
gsap.to('.class', { duration: 2, rotation: 30, ease: 'myWiggle' })

// 创建一个10次摆动的预备动作缓动：
CustomWiggle.create('funWiggle', { wiggles: 10, type: 'anticipate' })
gsap.to('.class', { duration: 2, rotation: 30, ease: 'funWiggle' })

// 或者，确保 CustomWiggle 已加载并使用 GSAP 的字符串缓动格式
ease: 'wiggle(15)' //<-- 简单!
ease: 'wiggle({type:anticipate, wiggles:8})' //高级
```

摆动不仅仅适用于 "rotation"；你可以将它用于任何属性。例如，你可以通过在 "x" 和 "y" 上使用仅两个随机化的摆动 tween 来创建一个群体效果，如[这里所示](https://codepen.io/GreenSock/pen/wzkBYZ)。

## 示例合集

- [CustomWiggle demos](https://codepen.io/collection/AxZmqK)
