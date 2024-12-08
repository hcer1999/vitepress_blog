# GSAP中文文档 - CustomEase

## CustomEase

CustomEase 插件让你摆脱了预设缓动函数的限制，允许你通过在缓动可视化工具中绘制或复制粘贴 SVG 路径来创建任何想象中的缓动曲线。没有限制，你可以使用任意数量的控制点。

::: details 快速开始

CDN地址：https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/CustomEase.min.js

```javascript
gsap.registerPlugin(CustomEase)
```

### 使用示例

```javascript
CustomEase.create(
  'hop',
  'M0,0 C0,0 0.056,0.442 0.175,0.442 0.294,0.442 0.332,0 0.332,0 0.332,0 0.414,1 0.671,1 0.991,1 1,0 1,0',
)

// 现在你可以在任何 tween 中通过 ID 引用这个缓动（作为一个字符串）：
gsap.to(element, { duration: 1, y: -100, ease: 'hop' })
```

:::

## 描述

CustomEase 让你自由地创建任何缓动曲线，通过简单地在缓动可视化工具中绘制它或复制/粘贴 SVG 路径。零限制。你可以使用任意数量的控制点。

**动画演示待补充....**

## 创建 Custom Ease

::: tip 如何使用这个缓动可视化工具：

- **添加点** - 在曲线上任意位置 ALT/OPTION-click
- **删除点** - 选择点后按键盘上的 DELETE 键
- **切换平滑/角点** - 在锚点上 ALT/OPTION-click。或者，ALT/OPTION-drag 控制手柄使其变成角点（非平滑点）。
- **选择多个点** - 按住 SHIFT 键的同时点击锚点。
- **撤销** - 按 CTRL-Z
- **禁用吸附** - 拖动时按住 SHIFT 键

你可以通过选择它们然后点击 "CustomEase" 来编辑任何其他缓动。

:::

## 复制/粘贴 SVG

在缓动可视化工具的 "custom" 模式下，你可以选择底部的紫色文本（CustomEase 数据字符串），全部选中后粘贴 SVG 路径（比如从 Adobe Illustrator 中复制的），然后点击其他地方，缓动可视化工具将获取第一个 `<path>` 并将其转换为正确的格式。

## 使用 cubic-bezier 值

CustomEase 也识别标准的 `cubic-bezier()` 字符串，包含四个数字，就像你在 [cubic-bezier.com](https://cubic-bezier.com/) 上得到的那样。例如，`".17,.67,.83,.67"`。可以直接粘贴到缓动可视化工具底部的橙色文本区域，或者直接传递到 `CustomEase.create()` 方法中，如 `CustomEase.create("easeName", ".17,.67,.83,.67");`。

## 代码

而不是在每个 tween 中使用长数据字符串，你只需 `create()` 一次 CustomEase（通常在你的页面/应用加载时）并给它一个容易记住的 ID（像 `"hop"` 或 `"wiggle"` 或任何你想要的），之后在任何 tween 中引用，如：

```javascript
// 定义你的 CustomEase 并给它一个 ID（在这种情况下是 "hop"）

CustomEase.create(
  'hop',
  'M0,0 C0,0 0.056,0.445 0.175,0.445 0.294,0.445 0.332,0 0.332,0 0.332,0 0.414,1 0.671,1 0.991,1 1,0 1,0',
)

// 现在你可以在任何 tween 中通过 ID 引用这个缓动（作为一个字符串）：
gsap.to(element, { duration: 1, y: -100, ease: 'hop' })
```

最初创建缓动确保了在动画期间的最大性能，因为内部计算所有点并优化数据以实现极快的运行时性能有一些开销。这只在创建时发生一次。

通常路径字符串使用归一化值（0-1），但你可以传递任何使用 cubic bezier 指令（"M", "C", "S", "L", 或 "Z" 命令）的 SVG 路径数据，它将在内部归一化。

## .getSVGData()

CustomEase 有一个 `getSVGData()` 方法，它计算 SVG `<path>` 数据字符串，用于以你定义的任何大小可视化任何缓动，如 `{width: 500, height: 400, x: 10, y: 50}`。你可以提供一个 CustomEase 或与之关联的 ID，甚至一个标准缓动如 `"power2"`。在 vars 对象中传入一个 `path`，它将为你填充其 `d` 属性，如：

```javascript
//create a CustomEase with an ID of "hop"
CustomEase.create(
  'hop',
  'M0,0 C0,0 0.056,0.445 0.175,0.445 0.294,0.445 0.332,0 0.332,0 0.332,0 0.414,1 0.671,1 0.991,1 1,0 1,0',
)

//draw the ease visually in the SVG that has an ID of "ease" at 500px by 400px:
CustomEase.getSVGData('hop', { width: 500, height: 400, path: '#ease' })
```

## 命名注意事项

通常不建议将你的缓动（你与之关联的字符串名称）命名为标准缓动之一，如 "expo" 或 "power1" 等，因为这将覆盖该标准缓动并将其替换为你的 CustomEase。

## 演示

- [CustomEase 演示](https://codepen.io/collection/AQKMdx)

## 视频

### 概述

<iframe src="https://youtu.be/A9ROywSFFiY" width="100%" height="500" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>

### 在项目中使用 CustomEase

<iframe src="https://youtu.be/rJRrUHds7fc" width="100%" height="500" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>

## 常见问题解答

::: details 如何将 CustomEase 包含在我的项目中？

查看安装页面了解所有选项（CDN、NPM、下载等），甚至有一个交互式助手提供必要的代码。非常简单。别忘了在你的项目中注册 CustomEase，如下：

```javascript
gsap.registerPlugin(CustomEase)
```

:::

::: details 这是否包含在 GSAP 核心中？

不，你必须单独加载/导入它。

:::

::: details 这只是针对 Club GSAP 成员的吗？

不，它对所有人免费可用！但是 Club GSAP 非常了不起...只是说说。
:::

::: details 在开发过程中它工作正常，但在生产构建中突然停止工作！我该怎么办？

你的构建工具可能在摇树时丢弃了插件，而你忘记注册 CustomEase（这可以保护它免受摇树的影响）。只需像这样注册插件：

```javascript
gsap.registerPlugin(CustomEase)
```

:::
::: details 多次注册插件是否不好？

不，这完全没问题。它不会帮助任何东西，也不会造成伤害。

:::
