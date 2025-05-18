---
title: 如何使用和优化视频
nav_title: 视频
description: 在 Next.js 应用程序中优化视频的建议和最佳实践。
---

本页概述了如何在 Next.js 应用程序中使用视频，展示如何存储和显示视频文件而不影响性能。

## 使用 `<video>` 和 `<iframe>`

视频可以使用 HTML **`<video>`** 标签（用于直接视频文件）和 **`<iframe>`**（用于外部平台托管的视频）嵌入页面。

### `<video>`

HTML [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) 标签可以嵌入自托管或直接提供的视频内容，允许完全控制播放和外观。

```jsx filename="app/ui/video.jsx"
export function Video() {
  return (
    <video width="320" height="240" controls preload="none">
      <source src="/path/to/video.mp4" type="video/mp4" />
      <track src="/path/to/captions.vtt" kind="subtitles" srcLang="en" label="English" />
      您的浏览器不支持视频标签。
    </video>
  )
}
```

### 常用的 `<video>` 标签属性

| 属性          | 描述                                                                | 示例值                               |
| ------------- | ------------------------------------------------------------------- | ------------------------------------ |
| `src`         | 指定视频文件的源                                                    | `<video src="/path/to/video.mp4" />` |
| `width`       | 设置视频播放器的宽度                                                | `<video width="320" />`              |
| `height`      | 设置视频播放器的高度                                                | `<video height="240" />`             |
| `controls`    | 如果存在，则显示默认的播放控件                                      | `<video controls />`                 |
| `autoPlay`    | 页面加载时自动开始播放视频。注意：自动播放策略因浏览器而异          | `<video autoPlay />`                 |
| `loop`        | 循环播放视频                                                        | `<video loop />`                     |
| `muted`       | 默认静音。通常与 `autoPlay` 一起使用                                | `<video muted />`                    |
| `preload`     | 指定视频如何预加载。值：`none`、`metadata`、`auto`                  | `<video preload="none" />`           |
| `playsInline` | 在 iOS 设备上启用内联播放，通常在 iOS Safari 上需要自动播放才能工作 | `<video playsInline />`              |

> **注意**：使用 `autoPlay` 属性时，重要的是还要包含 `muted` 属性以确保视频在大多数浏览器中自动播放，以及 `playsInline` 属性以兼容 iOS 设备。

有关视频属性的完整列表，请参阅 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attributes)。

### 视频最佳实践

- **后备内容**：使用 `<video>` 标签时，在标签内包含后备内容，以供不支持视频播放的浏览器使用。
- **字幕或说明**：为聋人或听力障碍用户提供字幕或说明。在 `<video>` 元素中使用 [`<track>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track) 标签来指定字幕文件源。
- **无障碍控件**：推荐使用标准 HTML5 视频控件以支持键盘导航和屏幕阅读器。对于高级需求，考虑使用第三方播放器，如 [react-player](https://github.com/cookpete/react-player) 或 [video.js](https://videojs.com/)，它们提供无障碍控件和一致的浏览器体验。

### `<iframe>`

HTML `<iframe>` 标签允许你嵌入来自 YouTube 或 Vimeo 等外部平台的视频。

```jsx filename="app/page.jsx"
export default function Page() {
  return <iframe src="https://www.youtube.com/embed/19g66ezsKAg" allowFullScreen />
}
```

### 常用的 `<iframe>` 标签属性

| 属性              | 描述                               | 示例值                                 |
| ----------------- | ---------------------------------- | -------------------------------------- |
| `src`             | 要嵌入的页面的 URL                 | `<iframe src="https://example.com" />` |
| `width`           | 设置 iframe 的宽度                 | `<iframe width="500" />`               |
| `height`          | 设置 iframe 的高度                 | `<iframe height="300" />`              |
| `allowFullScreen` | 允许 iframe 内容以全屏模式显示     | `<iframe allowFullScreen />`           |
| `sandbox`         | 对 iframe 内容启用额外的限制       | `<iframe sandbox />`                   |
| `loading`         | 优化加载行为（例如，延迟加载）     | `<iframe loading="lazy" />`            |
| `title`           | 为 iframe 提供标题以支持无障碍访问 | `<iframe title="描述" />`              |

有关 iframe 属性的完整列表，请参阅 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attributes)。

### 选择视频嵌入方法

在 Next.js 应用程序中嵌入视频有两种方式：

- **自托管或直接视频文件**：使用 `<video>` 标签嵌入自托管视频，适用于需要详细控制播放器功能和外观的场景。这种在 Next.js 中的集成方法允许自定义和控制视频内容。
- **使用视频托管服务（YouTube、Vimeo 等）**：对于 YouTube 或 Vimeo 等视频托管服务，你将使用 `<iframe>` 标签嵌入它们的基于 iframe 的播放器。虽然这种方法限制了对播放器的一些控制，但它提供了这些平台提供的易用性和功能。

选择符合你的应用程序要求和你想要提供的用户体验的嵌入方法。

### 嵌入外部托管视频

要嵌入来自外部平台的视频，你可以使用 Next.js 来获取视频信息，并使用 React Suspense 来处理加载时的回退状态。

**1. 创建用于视频嵌入的服务器组件**

第一步是创建一个 [服务器组件](https://nextjs.org/docs/app/building-your-application/rendering/server-components)，用于生成适当的 iframe 来嵌入视频。该组件将获取视频的源 URL 并渲染 iframe。

```jsx filename="app/ui/video-component.jsx"
export default async function VideoComponent() {
  const src = await getVideoSrc()

  return <iframe src={src} allowFullScreen />
}
```

**2. 使用 React Suspense 流式传输视频组件**

创建用于嵌入视频的服务器组件后，下一步是使用 [React Suspense](https://react.dev/reference/react/Suspense) [流式传输](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)该组件。

```jsx filename="app/page.jsx"
import { Suspense } from 'react'
import VideoComponent from '../ui/VideoComponent.jsx'

export default function Page() {
  return (
    <section>
      <Suspense fallback={<p>正在加载视频...</p>}>
        <VideoComponent />
      </Suspense>
      {/* 页面的其他内容 */}
    </section>
  )
}
```

> **注意**：在嵌入外部平台的视频时，请考虑以下最佳实践：
>
> - 确保视频嵌入是响应式的。使用 CSS 使 iframe 或视频播放器适应不同的屏幕尺寸。
> - 根据网络条件实现[视频加载策略](https://yoast.com/site-speed-tips-for-faster-video/)，特别是对于数据流量有限的用户。

这种方法可以带来更好的用户体验，因为它不会阻塞页面，这意味着用户可以在视频组件流式传输时与页面进行交互。

为了提供更具吸引力和信息性的加载体验，考虑使用加载骨架作为回退 UI。因此，不是显示简单的加载消息，而是可以显示一个类似视频播放器的骨架，如下所示：

```jsx filename="app/page.jsx"
import { Suspense } from 'react'
import VideoComponent from '../ui/VideoComponent.jsx'
import VideoSkeleton from '../ui/VideoSkeleton.jsx'

export default function Page() {
  return (
    <section>
      <Suspense fallback={<VideoSkeleton />}>
        <VideoComponent />
      </Suspense>
      {/* 页面的其他内容 */}
    </section>
  )
}
```

## 自托管视频

自托管视频可能因以下几个原因而更可取：

- **完全控制和独立性**：自托管让你可以直接管理视频内容，从播放到外观，确保完全所有权和控制权，不受外部平台限制。
- **针对特定需求的定制**：适用于独特需求，如动态背景视频，它允许根据设计和功能需求进行定制。
- **性能和可扩展性考虑**：选择既高性能又可扩展的存储解决方案，以有效支持不断增长的流量和内容大小。
- **成本和集成**：平衡存储和带宽成本与轻松集成到 Next.js 框架和更广泛技术生态系统的需求。

### 使用 Vercel Blob 进行视频托管

[Vercel Blob](https://vercel.com/docs/storage/vercel-blob?utm_source=next-site&utm_medium=docs&utm_campaign=next-website) 提供了一种高效的视频托管方式，提供了一个可扩展的云存储解决方案，可以很好地与 Next.js 配合使用。以下是如何使用 Vercel Blob 托管视频：

**1. 将视频上传到 Vercel Blob**

在你的 Vercel 仪表板中，导航到"Storage"标签并选择你的 [Vercel Blob](https://vercel.com/docs/storage/vercel-blob?utm_source=next-site&utm_medium=docs&utm_campaign=next-website) 存储。在 Blob 表格的右上角，找到并点击"Upload"按钮。然后，选择你想要上传的视频文件。上传完成后，视频文件将出现在 Blob 表格中。

或者，你可以使用服务器操作上传视频。有关详细说明，请参阅 Vercel 文档中的[服务器端上传](https://vercel.com/docs/storage/vercel-blob/server-upload)。Vercel 还支持[客户端上传](https://vercel.com/docs/storage/vercel-blob/client-upload)。对于某些用例，这种方法可能更可取。

**2. 在 Next.js 中显示视频**

一旦视频上传并存储，你就可以在 Next.js 应用程序中显示它。以下是使用 `<video>` 标签和 React Suspense 实现这一点的示例：

```jsx filename="app/page.jsx"
import { Suspense } from 'react'
import { list } from '@vercel/blob'

export default function Page() {
  return (
    <Suspense fallback={<p>正在加载视频...</p>}>
      <VideoComponent fileName="my-video.mp4" />
    </Suspense>
  )
}

async function VideoComponent({ fileName }) {
  const { blobs } = await list({
    prefix: fileName,
    limit: 1,
  })
  const { url } = blobs[0]

  return (
    <video controls preload="none" aria-label="视频播放器">
      <source src={url} type="video/mp4" />
      您的浏览器不支持视频标签。
    </video>
  )
}
```

在这种方法中，页面使用视频的 `@vercel/blob` URL 通过 `VideoComponent` 来显示视频。使用 React Suspense 来显示回退内容，直到获取到视频 URL 且视频准备好显示。

### 为视频添加字幕

如果你有视频的字幕，你可以使用 `<video>` 标签内的 `<track>` 元素轻松添加它们。你可以以与视频文件类似的方式从 [Vercel Blob](https://vercel.com/docs/storage/vercel-blob?utm_source=next-site&utm_medium=docs&utm_campaign=next-website) 获取字幕文件。以下是如何更新 `<VideoComponent>` 以包含字幕。

```jsx filename="app/page.jsx"
async function VideoComponent({ fileName }) {
  const { blobs } = await list({
    prefix: fileName,
    limit: 2,
  })
  const { url } = blobs[0]
  const { url: captionsUrl } = blobs[1]

  return (
    <video controls preload="none" aria-label="视频播放器">
      <source src={url} type="video/mp4" />
      <track src={captionsUrl} kind="subtitles" srcLang="en" label="English" />
      您的浏览器不支持视频标签。
    </video>
  )
}
```

通过遵循这种方法，你可以有效地自托管视频并将其集成到你的 Next.js 应用程序中。

## 资源

要继续了解更多关于视频优化和最佳实践的信息，请参考以下资源：

- **了解视频格式和编解码器**：根据你的视频需求选择正确的格式和编解码器，如使用 MP4 实现兼容性或使用 WebM 进行网络优化。有关更多详细信息，请参阅 [Mozilla 的视频编解码器指南](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs)。
- **视频压缩**：使用 FFmpeg 等工具有效压缩视频，平衡质量和文件大小。在 [FFmpeg 的官方网站](https://www.ffmpeg.org/) 了解压缩技术。
- **分辨率和比特率调整**：根据观看平台调整[分辨率和比特率](https://www.dacast.com/blog/bitrate-vs-resolution/#:~:text=The%20two%20measure%20different%20aspects,yield%20different%20qualities%20of%20video)，为移动设备使用较低的设置。
- **内容分发网络（CDN）**：利用 CDN 提高视频传输速度并管理高流量。当使用某些存储解决方案（如 Vercel Blob）时，CDN 功能会自动为你处理。[了解更多](https://vercel.com/docs/edge-network/overview?utm_source=next-site&utm_medium=docs&utm_campaign=next-website)关于 CDN 及其优势。

探索这些视频流媒体平台，以将视频集成到你的 Next.js 项目中：

### 开源 `next-video` 组件

- 为 Next.js 提供 `<Video>` 组件，兼容各种托管服务，包括 [Vercel Blob](https://vercel.com/docs/storage/vercel-blob?utm_source=next-site&utm_medium=docs&utm_campaign=next-website)、S3、Backblaze 和 Mux。
- [详细文档](https://next-video.dev/docs)介绍如何将 `next-video.dev` 与不同托管服务一起使用。

### Cloudinary 集成

- 官方[文档和集成指南](https://next.cloudinary.dev/)介绍如何在 Next.js 中使用 Cloudinary。
- 包含 `<CldVideoPlayer>` 组件用于[即插即用的视频支持](https://next.cloudinary.dev/cldvideoplayer/basic-usage)。
- 查找将 Cloudinary 与 Next.js 集成的[示例](https://github.com/cloudinary-community/cloudinary-examples/?tab=readme-ov-file#nextjs)，包括[自适应比特率流](https://github.com/cloudinary-community/cloudinary-examples/tree/main/examples/nextjs-cldvideoplayer-abr)。
- 还提供其他 [Cloudinary 库](https://cloudinary.com/documentation)，包括 Node.js SDK。

### Mux 视频 API

- Mux 提供了一个[入门模板](https://github.com/muxinc/video-course-starter-kit)，用于使用 Mux 和 Next.js 创建视频课程。
- 了解 Mux 关于在 Next.js 应用程序中嵌入[高性能视频的建议](https://www.mux.com/for/nextjs)。
- 探索展示 Mux 与 Next.js 集成的[示例项目](https://with-mux-video.vercel.app/)。

### Fastly

- 了解更多关于将 Fastly 的[点播视频](https://www.fastly.com/products/streaming-media/video-on-demand)和流媒体解决方案集成到 Next.js 中的信息。

### ImageKit.io 集成

- 查看[官方快速入门指南](https://imagekit.io/docs/integration/nextjs)，了解如何将 ImageKit 与 Next.js 集成。
- 该集成提供了 `<IKVideo>` 组件，提供[无缝视频支持](https://imagekit.io/docs/integration/nextjs#rendering-videos)。
- 你还可以探索其他 [ImageKit 库](https://imagekit.io/docs)，如同样可用的 Node.js SDK。
