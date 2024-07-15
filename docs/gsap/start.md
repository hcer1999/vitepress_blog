# GSAP中文文档

## 开始

**详细教程**

GSAP 是“与框架无关”的，这意味着它可以在 React、Webflow、Wordpress 或任何其他 JavaScript/Web 框架中使用。核心 GSAP 文件和所有插件都只是 **JavaScript 文件**。

下面的视频和安装助手都涵盖了加载文件的最常见方式。即通过 NPM、Yarn 和使用简单的 `<script>` 标签。选择你自己喜欢的方式，或者查看左侧子菜单中的安装指南，以获取特定框架或工具的指导。

## 获取文件

[GSAP（点击下载）](https://gsap.com/community/files/file/20-gsap-public-files/?do=download&csrfKey=363f7091946466d5947e6751b678f5cc)

zip 下载包中包含什么？

zip 文件包含以下目录：

- **/minified/** - 最简单的选项。通过脚本标签加载到网页中，具有普遍兼容性，高度压缩以实现最大加载速度。
- **/UMD/** - 未压缩的 minified 文件版本，以 UMD 格式（高度兼容）。通常这些用于旧版构建工具或调试（因为源代码是可读的）。
- **/ESM** - ES 模块文件，转译以与几乎所有现代构建工具兼容（没有花哨的 ES6 特性）。
- **/src/** - 原始源代码文件，是现代 ES6 模块。

## 安装

::: code-group

```bash [npm]
npm install gsap
```

```html [cdn]
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
```

```bash [yarn]
yarn add gsap
```

:::

#### 插件

- Flip (翻转)
- ScrollTrigger (滚动触发器)
- Observer (观察者)
- ScrollTo (滚动到)
- Draggable (拖拽)
- MotionPath (运动路径)
- Easel (Easel)
- Pixi (Pixi)
- Text (文本)

```javascript
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Observer } from 'gsap/Observer'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { Draggable } from 'gsap/Draggable'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { EaselPlugin } from 'gsap/EaselPlugin'
import { PixiPlugin } from 'gsap/PixiPlugin'
import { TextPlugin } from 'gsap/TextPlugin'
```

#### 缓动函数

- RoughEase (毛刺缓动)
- ExpoScaleEase (指数缩放缓动)
- SlowMo (慢动作缓动)
- CustomEase (自定义缓动)

```javascript
import { RoughEase, ExpoScaleEase, SlowMo } from 'gsap/EasePack'
```

#### React

- useGSAP

```javascript
import { useGSAP } from '@gsap/react'
```

### 常见问题解答

#### 我需要为每个插件调用 gsap.registerPlugin() 吗？

通常，是的。如果你通过 `<script>` 标签加载 GSAP（即不是构建工具），GSAP 将尝试自动注册插件，只要核心已经加载，但我们仍然建议注册插件，以便构建工具在树摇动期间不会丢弃它们。你可以一次性注册所有插件，像这样：

```javascript
gsap.registerPlugin(MotionPathPlugin, ScrollToPlugin, TextPlugin)
```

#### 多次注册插件是否有害？

不，完全没有问题。它既不会帮助任何东西，也不会造成伤害。

如果你使用模块环境并希望避免多次注册插件，你可以在 gsap.js 文件中导入 GSAP 和你需要的所有插件，然后从该文件中导入其他模块所需的内容。例如，使用 GSAP 核心和 DrawSVG 的 gsap.js 可能是：

```javascript
export * from 'gsap'
export * from 'gsap/DrawSVGPlugin'
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
gsap.registerPlugin(DrawSVGPlugin)
```

然后在另一个文件中：

```javascript
import { gsap, DrawSVGPlugin } from '../gsap.js'
```

#### 我遇到了 TypeScript 错误 - 怎么办？

首先，确保你使用的是官方 TypeScript 定义，这些定义可以在主 GitHub 存储库中找到。如果你继续遇到问题，请随时在我们的论坛上发帖或在 GSAP GitHub 存储库中创建新问题。如果你需要告诉编译器定义的位置，你可以这样做：

```javascript
{
  "compilerOptions": {
    ...
  },
  "files": [
    "node_modules/gsap/types/index.d.ts"
  ]
}
```

#### 如何使用构建工具加载非 ES 模块版本的 GSAP？

一些构建工具可能不理解 ES 模块，因此你可以使用 UMD（通用模块定义）格式。要做到这一点，只需点击上面的“NPM”，然后点击“UMD”，并复制生成的代码。例如：`import { gsap } from "gsap/dist/gsap";`（注意文件都在 `/dist/` 子目录中）

#### 为什么我的生产构建失败？（可能在 webpack、vue-cli 或 create-react-app 中）

现代构建工具通常使用一种称为树摇动的过程来移除未使用的代码。有时它们过于激进，由于你没有在你自己代码的任何地方引用它们，就会丢弃插件。为了防止这种情况，你必须使用 gsap.registerPlugin 显式注册插件：

```javascript
gsap.registerPlugin(MotionPathPlugin, ScrollToPlugin, TextPlugin)
```

#### 额外插件的 CDN 链接在哪里？

额外插件仅对 Club GSAP 成员可用，因此它们不在 CDN 上。你必须从你的账户仪表板中下载它们。

#### 我可以使用旧版本的 GSAP 吗？

当然可以！你可以通过访问 GitHub 发布页面来查看和下载 GSAP 的旧版本。不过，我们推荐使用最新版本。
