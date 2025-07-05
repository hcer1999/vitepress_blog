---
title: 文档贡献指南
nav_title: 贡献指南
description: 了解如何为 Next.js 文档做出贡献
---

欢迎来到 Next.js 文档贡献指南！我们很高兴您能来到这里。

本页提供了如何编辑 Next.js 文档的指导。我们的目标是确保社区中的每个人都能够为我们的文档做出贡献并改进它。

## 为什么要贡献？

开源工作永远不会完成，文档也是如此。为文档做贡献是初学者参与开源的好方式，也是有经验的开发者在与社区分享知识的同时阐明更复杂主题的方式。

通过为 Next.js 文档做出贡献，您正在帮助我们为所有开发者构建一个更强大的学习资源。无论您是发现了一个拼写错误、一个令人困惑的部分，还是意识到缺少某个特定主题，您的贡献都是受欢迎和被感谢的。

## 如何贡献

文档内容可以在 [Next.js 仓库](https://github.com/vercel/next.js/tree/canary/docs) 中找到。要做出贡献，您可以直接在 GitHub 上编辑文件，或者克隆仓库并在本地编辑文件。

### GitHub 工作流程

如果您是 GitHub 新手，我们建议阅读 [GitHub 开源指南](https://opensource.guide/how-to-contribute/#opening-a-pull-request) 来了解如何复刻仓库、创建分支和提交拉取请求。

> **须知**：底层文档代码位于一个与 Next.js 公共仓库同步的私有代码库中。这意味着您无法在本地预览文档。但是，在合并拉取请求后，您将在 [nextjs.org](https://nextjs.org/docs) 上看到您的更改。

### 编写 MDX

文档是用 [MDX](https://mdxjs.com/) 编写的，这是一种支持 JSX 语法的 markdown 格式。这使我们能够在文档中嵌入 React 组件。有关 markdown 语法的快速概述，请参阅 [GitHub Markdown 指南](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)。

### VSCode

#### 在本地预览更改

VSCode 有一个内置的 markdown 预览器，您可以用它来在本地查看您的编辑。要为 MDX 文件启用预览器，您需要在用户设置中添加一个配置选项。

打开命令面板（Mac 上为 `⌘ + ⇧ + P` 或 Windows 上为 `Ctrl + Shift + P`）并搜索 `Preferences: Open User Settings (JSON)`。

然后，将以下行添加到您的 `settings.json` 文件中：

```json
{
  "files.associations": {
    "*.mdx": "markdown"
  }
}
```

接下来，再次打开命令面板，并搜索 `Markdown: Preview File` 或 `Markdown: Open Preview to the Side`。这将打开一个预览窗口，您可以在其中看到格式化后的更改。

#### 扩展

我们还推荐 VSCode 用户使用以下扩展：

- [MDX](https://marketplace.visualstudio.com/items?itemName=unifiedjs.vscode-mdx)：MDX 的智能感知和语法高亮。
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)：保存时格式化 MDX 文件。

### 审核流程

一旦您提交了您的贡献，Next.js 或开发者体验团队将审核您的更改，提供反馈，并在准备就绪时合并拉取请求。

如果您有任何问题或需要进一步帮助，请在您的 PR 评论中告诉我们。感谢您为 Next.js 文档做出贡献并成为我们社区的一部分！

> **提示：** 在提交 PR 之前运行 `pnpm prettier-fix` 来运行 Prettier。

## 文件结构

文档使用**文件系统路由**。[`/docs`](https://github.com/vercel/next.js/tree/canary/docs) 内的每个文件夹和文件代表一个路由段。这些段用于生成 URL 路径、导航和面包屑。

文件结构反映了您在网站上看到的导航，默认情况下，导航项按字母顺序排序。但是，我们可以通过在文件夹或文件名前加上两位数字（``）来更改项目的顺序。

例如，在[函数 API 参考](/nextjs-cn/app/api-reference/functions/index)中，页面按字母顺序排序，因为这使开发者更容易找到特定函数：

```txt
functions
├── after.mdx
├── cacheLife.mdx
├── cacheTag.mdx
└── ...
```

但是，在[路由部分](/nextjs-cn/app/building-your-application/routing/index)中，文件以两位数字为前缀，按照开发者应该学习这些概念的顺序排序：

```txt
routing
├── defining-routes.mdx
├── pages.mdx
├── layouts-and-templates.mdx
└── ...
```

要快速找到一个页面，您可以在 VSCode 上使用 `⌘ + P`（Mac）或 `Ctrl + P`（Windows）打开搜索栏。然后，输入您要查找的页面的 slug。例如 `defining-routes`

> **为什么不使用清单？**
>
> 我们考虑过使用清单文件（另一种生成文档导航的流行方式），但我们发现清单很快就会与文件不同步。文件系统路由迫使我们思考文档的结构，并且感觉与 Next.js 更加原生。

## 元数据

每个页面在文件顶部都有一个由三个破折号分隔的元数据块。

### 必填字段

以下字段是**必需的**：

| 字段          | 描述                                                          |
| ------------- | ------------------------------------------------------------- |
| `title`       | 页面的 `<h1>` 标题，用于 SEO 和 OG 图像。                     |
| `description` | 页面的描述，用于 `<meta name="description">` 标签，用于 SEO。 |

```yaml
---
title: Page Title
description: Page Description
---
```

最好将页面标题限制为 3 个单词（例如 Optimizing Images）和描述限制为 2 个句子（例如 Learn how to optimize images in Next.js）。

### 可选字段

以下字段是**可选的**：

| 字段        | 描述                                                                                            |
| ----------- | ----------------------------------------------------------------------------------------------- |
| `nav_title` | 覆盖导航中页面的标题。当页面的标题太长而无法适应时，这很有用。如果未提供，则使用 `title` 字段。 |
| `source`    | 将内容拉入共享页面。参见[共享页面](#shared-pages)。                                             |
| `related`   | 文档底部的相关页面列表。这些将自动转换为卡片。参见[相关链接](#related-links)。                  |
| `version`   | 开发阶段。例如 `experimental`、`legacy`、`unstable`、`RC`                                       |

```yaml
---
nav_title: Nav Item Title
source: app/building-your-application/optimizing/images
related:
  description: See the image component API reference.
  links:
    - app/api-reference/components/image
version: experimental
---
```

## `App` 和 `Pages` 文档

由于 **App Router** 和 **Pages Router** 中的大多数功能完全不同，它们各自的文档保存在不同的部分（`app` 和 `pages`）。但是，有一些功能在它们之间是共享的。

### 共享页面

为了避免内容重复并避免内容不同步的风险，我们使用 `source` 字段将内容从一个页面拉入另一个页面。例如，`<Link>` 组件在 **App** 和 **Pages** 中的行为*大部分*相同。我们可以将内容从 `app/.../link.mdx` 拉入 `pages/.../link.mdx`，而不是复制内容：

```mdx
---
title: <Link>
description: API reference for the <Link> component.
---

This API reference will help you understand how to use the props
and configuration options available for the Link Component.
```

```mdx
---
title: <Link>
description: API reference for the <Link> component.
source: app/api-reference/components/link
---

{/* DO NOT EDIT THIS PAGE. */}
{/* The content of this page is pulled from the source above. */}
```

因此，我们可以在一个地方编辑内容，并在两个部分中都反映出来。

### 共享内容

在共享页面中，有时可能有一些内容是 **App Router** 或 **Pages Router** 特定的。例如，`<Link>` 组件有一个 `shallow` 属性，它只在 **Pages** 中可用，而在 **App** 中不可用。

为了确保内容只在正确的路由器中显示，我们可以将内容块包装在 `<AppOnly>` 或 `<PagesOnly>` 组件中：

```mdx
This content is shared between App and Pages.

<PagesOnly>

This content will only be shown on the Pages docs.

</PagesOnly>

This content is shared between App and Pages.
```

您可能会将这些组件用于示例和代码块。

## 代码块

代码块应包含一个可以复制和粘贴的最小工作示例。这意味着代码应该能够运行，而无需任何额外的配置。

例如，如果您要展示如何使用 `<Link>` 组件，您应该包括 `import` 语句和 `<Link>` 组件本身。

```tsx
import Link from 'next/link'

export default function Page() {
  return <Link href="/about">About</Link>
}
```

在提交代码之前，请务必在本地运行示例。这将确保代码是最新的且能正常工作。

### 语言和文件名

代码块应该有一个包含语言和 `filename` 的头部。添加 `filename` 属性以呈现一个特殊的终端图标，帮助用户了解在哪里输入命令。例如：

```bash
npx create-next-app
```

文档中的大多数示例都是用 `tsx` 和 `jsx` 编写的，少数是用 `bash` 编写的。但是，您可以使用任何支持的语言，这里是[完整列表](https://github.com/shikijs/shiki/blob/main/docs/languages.md#all-languages)。

在编写 JavaScript 代码块时，我们使用以下语言和扩展名组合。

|                                 | 语言   | 扩展名 |
| ------------------------------- | ------ | ------ |
| 带有 JSX 代码的 JavaScript 文件 | ```jsx | .js    |
| 不带 JSX 的 JavaScript 文件     | ```js  | .js    |
| 带有 JSX 的 TypeScript 文件     | ```tsx | .tsx   |
| 不带 JSX 的 TypeScript 文件     | ```ts  | .ts    |

> **须知**:
>
> - 确保在 JavaScript 文件中使用 **JSX** 代码时使用 **`js`** 扩展名。
> - 例如，```jsx

### TS 和 JS 切换器

添加语言切换器以在 TypeScript 和 JavaScript 之间切换。代码块应该首先是 TypeScript，然后提供 JavaScript 版本以适应用户。

目前，我们将 TS 和 JS 示例一个接一个地编写，并用 `switcher` 属性链接它们：

````mdx
```tsx switcher

```
````

```jsx switcher

```

````

> **须知**：我们计划在未来自动将 TypeScript 片段编译为 JavaScript。同时，您可以使用 [transform.tools](https://transform.tools/typescript-to-javascript)。

### 行高亮

代码行可以被高亮显示。当您想要引起对代码特定部分的注意时，这很有用。您可以通过向 `highlight` 属性传递一个数字来高亮显示行。

**单行：** `highlight={1}`

```tsx {1}
import Link from 'next/link'

export default function Page() {
  return <Link href="/about">About</Link>
}
````

**多行：** `highlight={1,3}`

```tsx highlight={1,3}
import Link from 'next/link'

export default function Page() {
  return <Link href="/about">About</Link>
}
```

**行范围：** `highlight={5}`

```tsx highlight={5}
import Link from 'next/link'

export default function Page() {
  return <Link href="/about">About</Link>
}
```

## 图标

文档中可以使用以下图标：

```mdx
<Check size={18} />
<Cross size={18} />
```

**输出：**

<Check size={18} />
<Cross size={18} />

我们在文档中不使用表情符号。

## 注释

对于重要但不关键的信息，使用注释。注释是添加信息而不分散用户对主要内容注意力的好方法。

```mdx
> **须知**：这是一个单行注释。

> **须知**：
>
> - 我们也使用这种格式来编写多行注释。
> - 有时会有多个值得了解或记住的项目。
```

**输出：**

> **须知**：这是一个单行注释。

> **须知**：
>
> - 我们也使用这种格式来编写多行注释。
> - 有时会有多个值得了解或记住的项目。

## 相关链接

相关链接通过添加到逻辑下一步的链接来引导用户的学习旅程。

- 链接将显示在页面主要内容下方的卡片中。
- 对于有子页面的页面，将自动生成链接。

使用页面元数据中的 `related` 字段创建相关链接。

```yaml
---
related:
  description: 了解如何快速开始构建您的第一个应用程序。
  links:
    - app/building-your-application/routing/defining-routes
    - app/building-your-application/data-fetching
    - app/api-reference/file-conventions/page
---
```

### 嵌套字段

| 字段          | 是否必需？ | 描述                                                                                                                          |
| ------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `title`       | 可选       | 卡片列表的标题。默认为**下一步**。                                                                                            |
| `description` | 可选       | 卡片列表的描述。                                                                                                              |
| `links`       | 必需       | 指向其他文档页面的链接列表。每个列表项应该是一个相对 URL 路径（没有前导斜杠），例如 `app/api-reference/file-conventions/page` |

## 图表

图表是解释复杂概念的好方法。我们使用 [Figma](https://www.figma.com/) 创建图表，遵循 Vercel 的设计指南。

图表目前存放在我们私有 Next.js 网站的 `/public` 文件夹中。如果您想更新或添加图表，请在 [GitHub issue](https://github.com/vercel/next.js/issues/new?assignees=&labels=template%3A+documentation&projects=&template=4.docs_request.yml&title=Docs%3A+) 中提出您的想法。

## 自定义组件和 HTML

这些是文档可用的 React 组件：`<Image />` (next/image)、`<PagesOnly />`、`<AppOnly />`、`<Cross />` 和 `<Check />`。除了 `<details>` 标签外，我们不允许在文档中使用原始 HTML。

如果您有新组件的想法，请开一个 [GitHub issue](https://github.com/vercel/next.js/issues/new/choose)。

## 风格指南

本节包含针对技术写作新手的文档编写指南。

### 页面模板

虽然我们没有严格的页面模板，但文档中有一些重复出现的页面部分：

- **概述：** 页面的第一段应该告诉用户该功能是什么以及它的用途。然后是最小工作示例或其 API 参考。
- **约定：** 如果该功能有约定，应该在这里解释。
- **示例**：展示该功能如何用于不同的用例。
- **API 表格**：API 页面应该在页面顶部有一个概述表，带有跳转到各部分的链接（如果可能的话）。
- **下一步（相关链接）**：添加相关页面的链接，引导用户的学习旅程。

根据需要添加这些部分。

### 页面类型

文档页面还分为两类：概念性和参考性。

- **概念性**页面用于解释概念或功能。它们通常比参考页面更长，包含更多信息。在 Next.js 文档中，概念性页面位于**构建您的应用程序**部分。
- **参考性**页面用于解释特定 API。它们通常更短且更有针对性。在 Next.js 文档中，参考页面位于 **API 参考**部分。

> **须知**：根据您贡献的页面，您可能需要遵循不同的语气和风格。例如，概念性页面更具指导性，使用"你"来称呼用户。参考页面更技术性，使用更多命令性词汇如"创建、更新、接受"，并倾向于省略"你"这个词。

### 语气

以下是在文档中保持一致风格和语气的一些指南：

- 编写清晰、简洁的句子。避免离题。
  - 如果您发现自己使用了很多逗号，考虑将句子分成多个句子或使用列表。
  - 用更简单的词替换复杂的词。例如，使用"使用"而不是"利用"。
- 注意使用"这个"一词。它可能含糊不清且令人困惑，如果不清楚，不要害怕重复句子的主题。
  - 例如，使用"Next.js 使用 React"而不是"Next.js 使用这个"。
- 使用主动语态而不是被动语态。主动句子更容易阅读。
  - 例如，使用"Next.js 使用 React"而不是"React 被 Next.js 使用"。如果您发现自己使用"被"和"由"等词，您可能在使用被动语态。
- 避免使用"简单"、"快速"、"简单"、"只需"等词。这是主观的，可能会让用户感到气馁。
- 避免使用"不要"、"不能"、"不会"等否定词。这可能会让读者感到气馁。
  - 例如，使用"您可以使用 `Link` 组件在页面之间创建链接"而不是"不要使用 `<a>` 标签在页面之间创建链接"。
- 使用第二人称（你/您的）。这更个人化且吸引人。
- 使用性别中立的语言。在指代受众时使用"开发者"、"用户"或"读者"。
- 如果添加代码示例，确保它们格式正确且能正常工作。

虽然这些指南并不详尽，但它们应该能帮助您入门。如果您想更深入地了解技术写作，请查看 [Google 技术写作课程](https://developers.google.com/tech-writing/overview)。

---

感谢您为文档做出贡献，并成为 Next.js 社区的一部分！
