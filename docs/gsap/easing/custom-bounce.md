# GSAP中文文档 - CustomBounce

## CustomBounce <Badge text="会员特权"/>

CustomBounce 是一个 GSAP 高级会员插件，它允许你创建自定义的弹跳（bounce）缓动效果，并且可以同步地进行挤压和拉伸（squash and stretch）效果。

::: details 快速开始

CustomBounce 是 GSAP 会员的特权，立即加入或使用以下试用链接免费试用。它在本地主机、Codepen、CodeSandbox 和 Stackblitz 上均可使用。

https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/CustomBounce.min.js

```javascript
gsap.registerPlugin(CustomEase, CustomBounce)
```

### 使用示例

```javascript
//Create a custom bounce ease:
CustomBounce.create('myBounce', {
  strength: 0.6,
  squash: 3,
  squashID: 'myBounce-squash',
})

//do the bounce by affecting the "y" property.
gsap.from('.class', { duration: 2, y: -200, ease: 'myBounce' })

//and do the squash/stretch at the same time:
gsap.to('.class', {
  duration: 2,
  scaleX: 1.4,
  scaleY: 0.6,
  ease: 'myBounce-squash',
  transformOrigin: 'center bottom',
})
```

:::

<iframe src="https://codepen.io/GreenSock/pen/pRowwX" width="100%" height="700px"></iframe>

## 描述

GSAP 总是有经过验证的 `"bounce"` 缓动，但是没有内置的方式来自定义它有多“弹”，也不能轻松地在弹跳过程中获得同步的挤压和拉伸效果，因为：

- “弹跳”缓动需要在弹跳点暂时粘在地上，同时发生挤压。`"bounce"` 不提供这种自定义。
- 没有办法创建相应的 scaleX/scaleY 缓动来同步挤压/拉伸。[CustomEase](/gsap/easing/custom-ease) 现在解决了这个问题，但手动绘制那个缓动，使所有点正确对齐以匹配弹跳仍然非常困难。

使用 CustomBounce，你可以设置一些参数，它将为你创建 **两个** CustomEases（一个用于弹跳，另一个 **可选** 用于挤压/拉伸）。可以将 CustomBounce 视为一个包装器，根据你传入的变量在内部创建 CustomEase。

CustomBounce 扩展了 [CustomEase](/gsap/easing/custom-ease)（你必须在项目中包含它），它允许你设置弹跳和（可选的）挤压和拉伸。

<iframe src="https://youtu.be/iO8J_CiH1fk" width="100%" height="600px"></iframe>

## 选项

| 属性       | 描述                                                                                                                                                                 |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| strength   | 数字 - 一个介于0和1之间的数值，决定缓动的“弹性”大小，0.9会比0.3有更多的弹跳。默认值：0.7。                                                                           |
| endAtStart | 布尔值 - 如果为true，缓动将结束在其起始位置，允许你获得像物体坐在地面上，跳到空中，然后弹回并停止的效果。默认值：false。                                             |
| squash     | 数字 - 控制压缩应该持续多长时间（弹跳之间的间隔，当它看起来“卡住”时）。通常2是一个好数字，但4（作为一个例子）会使得压缩相对于缓动的其他部分持续更长时间。默认值：0。 |
| squashID   | 字符串 - 应该分配给压缩缓动的ID。默认是弹跳缓动的ID加上“-squash”后缀。例如，CustomBounce.create("hop", {strength: 0.6, squash: 2}) 默认的压缩缓动ID为 "hop-squash"。 |

如何使弹跳和挤压拉伸一起工作？你会使用两个 tween；一个用于位置（`y`），另一个用于 `scaleX` 和 `scaleY`，两者同时运行：

```javascript
gsap.registerPlugin(CustomEase, CustomBounce) // 注册

//Create a custom bounce ease:
CustomBounce.create('myBounce', {
  strength: 0.6,
  squash: 3,
  squashID: 'myBounce-squash',
})

//do the bounce by affecting the "y" property.
gsap.from('.class', { duration: 2, y: -200, ease: 'myBounce' })

//and do the squash/stretch at the same time:
gsap.to('.class', {
  duration: 2,
  scaleX: 1.4,
  scaleY: 0.6,
  ease: 'myBounce-squash',
  transformOrigin: 'center bottom',
})
```

## .getSVGData()

CustomBounce 还共享 CustomEase 的方法，该方法计算 SVG `<path>` 数据字符串，用于以你定义的任何大小可视化任何缓动，如 `{width: 500, height: 400, x: 10, y: 50}`。你可以提供一个 CustomEase 或与之关联的 ID，甚至一个标准缓动如 `Power2.easeOut`。在 vars 对象中传入一个 `path`，它将为你填充其 `d` 属性，如：

```javascript
//create a CustomEase with an ID of "hop"
CustomBounce.create('myBounce', {
  strength: 0.6,
  squash: 3,
  squashID: 'myBounce-squash',
})

//draw the ease visually in the SVG that has an ID of "ease" at 500px by 400px:
CustomEase.getSVGData('myBounce', { width: 500, height: 400, path: '#ease' })
```

## 字符串格式

你还可以使用 GSAP 的简化字符串格式化来表示缓动，如：

```javascript
ease: 'bounce(0.5)' //<-- 简单！
ease: 'bounce({strength:0.5, endAtStart:true})' //高级
```

## 演示

[CustomBounce 演示](https://codepen.io/collection/DqaLzb)
