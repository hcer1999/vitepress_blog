# GSAP中文文档 - Easing

::: warning 额外的俱乐部版缓动（Easing）

"slow"、"rough" 和 "expoScale" 缓动并不包含在核心库中 - 它们被打包在一个EasePack文件中，以最小化文件大小。"CustomEase"、"CustomBounce" 和 "CustomWiggle" 也是独立打包的（不在核心库中）。

查看[安装页面](/gsap/start)以获取详细信息。

:::

动画效果待补充....

::: tip 提示 - 默认缓动

GSAP使用默认的缓动效果为 "power1.out"。你可以通过为特定补间动画（tween）设置其`ease`属性为另一个（有效的）缓动值来覆盖这个默认值。你也可以使用[`gsap.defaults()`](/gsap/gsap/methods/defaults)来为GSAP设置不同的默认缓动效果。此外，你还可以为特定的[时间轴](/gsap/timeline/start)设置默认值。

```javascript
gsap.defaults({
  ease: 'power2.in',
  duration: 1,
})

gsap.timeline({ defaults: { ease: 'power2.in' } })
```

:::

## 如何使用缓动可视化工具

要使用缓动可视化工具，只需点击您想要使用的缓动名称。您也可以点击下划线的文本来更改缓动的值和类型。
使用左侧菜单中的导航链接，以获取有关复杂缓动的更多信息。

<iframe src="https://youtu.be/jfKf7EtMbxI" width="100%" height="400" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true" ></iframe>

非常感谢Carl提供这个视频。我们强烈推荐他们在[CreativeCodingClub.com](https://www.creativecodingclub.com/bundles/creative-coding-club?ref=44f484)提供的全面的GSAP培训。今天立即报名参加他们的[免费GSAP课程](https://www.creativecodingclub.com/courses/FreeGSAP3Express?ref=44f484)，发现用代码制作动画的乐趣。
