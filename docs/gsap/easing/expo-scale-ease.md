# GSAP中文文档 - ExpoScaleEase

## ExpoScaleEase

::: details 快速开始

CDN 链接： https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/EasePack.min.js

```javascript
gsap.registerPlugin(EasePack)
```

### 使用示例

```javascript
// 我们从缩放比例 1 开始，动画到 2，因此将这些值传入 config()...
gsap.to('#image', { duration: 1, scale: 2, ease: 'expoScale(1, 2)' })
```

:::

::: tip 不包含在核心库中

这个缓动效果包含在 EasePack 文件中。要了解如何将此包含在您的项目中，请查看[安装页面](/gsap/start)。

:::

## 描述

当你动画化一个对象的 `scale` 属性时，会发生一个有趣的现象，即使使用线性缓动，它也会使对象看起来改变了速度；`ExpoScaleEase` 通过相应地调整缓动曲线来补偿这种效果。这是实现丝滑缩放/缩放动画的秘密武器。

### 视频解释

<iframe src="https://youtu.be/rwdlO3uIlwk" frameborder="no" loading="lazy" width="100%" height="500" allowtransparency="true" allowfullscreen="true" ></iframe>

### 配置

为了让 ExpoScaleEase 创建正确的缓动曲线，你必须在字符串中传入**起始**和**结束**的缩放值，如下：

```javascript
// 我们从缩放比例 1 开始，动画到 2，因此将这些值传入 config()...
gsap.to('#image', { duration: 1, scale: 2, ease: 'expoScale(1, 2)' })
```

它还可以接受第三个参数，即你希望它弯曲的缓动（默认为 `"none"`）。例如，如果你想使用 `"power2.inOut"`，你的代码将如下所示：

```javascript
// 从 0.5 缩放到 3 使用 "power2.inOut" ...
gsap.fromTo(
  '#image',
  { scale: 0.5 },
  { duration: 1, scale: 3, ease: 'expoScale(0.5, 3, power2.inOut)' },
)
```

**注意：** 传入 `config()` 方法的缩放值**必须非零**，因为数学运算在 0 时无法工作。你可以使用像 0.01 这样的小值。使用像 0.00000001 这样的**极小**数字可能不理想，因为 tween 的很大一部分将用于穿过非常小的值。

### 简单演示

<iframe src="https://codepen.io/GreenSock/pen/RwwNmeb" frameborder="no" loading="lazy" width="100%" height="500" allowtransparency="true" allowfullscreen="true" ></iframe>

### 复杂演示

<iframe src="https://codepen.io/GreenSock/pen/qBBBxaL" frameborder="no" loading="lazy" width="100%" height="500" allowtransparency="true" allowfullscreen="true" ></iframe>
