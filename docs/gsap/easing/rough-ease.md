# GSAP中文文档 - RoughEase

## RoughEase

::: details 快速开始

CDN 链接 :https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/EasePack.min.js

```javascript
gsap.registerPlugin(EasePack)
```

### 使用示例

```javascript
// we're starting at a scale of 1 and animating to 2, so pass those into config()...
gsap.to('#image', { duration: 1, scale: 2, ease: 'expoScale(1, 2)' })
```

:::

::: warning 不包含在核心库中
这个缓动效果位于 EasePack 文件中。要了解如何将其包含在您的项目中，请参见[安装页面](/gsap/start)。
:::

## 描述

大多数缓动方程在开始和结束值之间提供平滑、逐渐的过渡，但 `RoughEase` 提供了一种简单的方法来获得粗糙、锯齿状的效果，或者如果你喜欢，也可以获得均匀间隔的来回运动。`RoughEase` 在 EasePack 文件中。你可以使用以下任选属性配置 `RoughEase`：

## 配置对象

以下是关于 RoughEase 属性的描述，以Markdown表格格式呈现：

| 属性      | 描述                                                                                                                                                                                                                                                                          |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| clamp     | **布尔值** - 设置clamp为true将防止点超过结束值或低于起始值。例如，如果您正在从0到100补间x属性，如果clamp为true，RoughEase将强制所有随机点保持在0到100之间，但如果为false，则x可能在补间过程中的某个时刻跳到100以上或0以下（在这个例子中最终总是会在100结束）。默认值：false。 |
| points    | **数字** - 沿缓动绘制的点数，使其更频繁或不那么频繁地产生急动。默认值：20。                                                                                                                                                                                                   |
| randomize | **布尔值** - 默认情况下，点的放置将被随机化（创建粗糙度），但您可以设置randomize为false以使点均匀地在缓动上呈之字形。结合使用taper值可以创建出很好的效果。默认值：true。                                                                                                      |
| strength  | **数字** - 控制点偏离模板缓动的距离（一个小数字如0.1使其非常接近模板缓动，而一个较大的数字如5则会产生更大的变化）。默认值：1。                                                                                                                                                |
| taper     | **字符串**（"in" \| "out" \| "both" \| "none"）- 要使粗糙度的强度在结束或开始或两者都逐渐减弱，请分别使用"out"、"in"或"both"。默认值："none"。                                                                                                                                |
| template  | **字符串** - 用作模板的缓动，如一般指南。RoughEase将绘制偏离该模板的点。您可以使用此选项来影响RoughEase的总体形状。默认值："none"。                                                                                                                                           |

## 示例

```javascript
// 使用默认值
gsap.from(element, { duration: 1, opacity: 0, ease: 'rough' })

// 或自定义配置
gsap.to(element, {
  duration: 2,
  y: 300,
  ease: 'rough({strength: 3, points: 50, template: strong.inOut, taper: both, randomize: false})',
})
```
