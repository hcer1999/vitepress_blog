# gsap.registerPlugin()

向 GSAP 核心注册插件可确保两者无缝协作，并防止构建工具/捆绑程序中的树抖动问题。您只需要在使用插件之前注册一次即可，例如：

```js
//list as many as you'd like
gsap.registerPlugin(MotionPathPlugin, TextPlugin)
```

多次注册同一个插件没有什么坏处（但也没有帮助）。

GSAP 插件的非 ES 模块版本（如 CDN 上的缩小文件）尝试在加载时自动注册，只要它们在核心 GSAP 引擎之后加载，通常在浏览器中效果很好，但它仍然是一个很好的选择习惯注册插件，因为在构建环境（浏览器之外）中，tree shake 可能会咬你。

请记住，这并不能替代加载或导入插件本身。在加载插件后使用此方法只是为了让 GSAP 的核心了解该插件并防止在使用构建工具时发生树抖动。

## 什么是插件？ ​

插件为 GSAP 的核心添加了额外的功能。有些插件可以更轻松地使用某些渲染库（例如 PIXI.js 或 EaselJS），而其他插件则添加了执行特殊操作的功能，例如变形 SVG、添加拖放功能等）。这使得 GSAP 核心保持相对较小，并允许您在需要时添加功能。