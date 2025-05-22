---
title: Image
description: 使用内置的 `next/image` 组件在 Next.js 应用程序中优化图像。
---

{/_ The content of this doc is shared between the app and pages router. You can use the `<PagesOnly>Content</PagesOnly>` component to add content that is specific to the Pages Router. Any shared content should not be wrapped in a component. _/}

Next.js Image 组件扩展了 HTML `<img>` 元素，实现自动图像优化。

```jsx filename="app/page.js"
import Image from 'next/image'

export default function Page() {
  return <Image src="/profile.png" width={500} height={500} alt="作者的照片" />
}
```

<PagesOnly>

> **须知**: 如果您使用的 Next.js 版本低于 13，您应该参考 [next/legacy/image](/docs/pages/api-reference/components/image-legacy) 文档，因为该组件已被重命名。

</PagesOnly>

## 参考

### 属性

以下属性可用：

<div style={{ overflowX: 'auto', width: '100%' }}>
| 属性                                      | 示例                                   | 类型            | 状态       |
| ----------------------------------------- | -------------------------------------- | --------------- | ---------- |
| [`src`](#src)                             | `src="/profile.png"`                   | String          | 必填       |
| [`alt`](#alt)                             | `alt="作者的照片"`                     | String          | 必填       |
| [`width`](#width-and-height)              | `width={500}`                          | Integer (px)    | -          |
| [`height`](#width-and-height)             | `height={500}`                         | Integer (px)    | -          |
| [`fill`](#fill)                           | `fill={true}`                          | Boolean         | -          |
| [`loader`](#loader)                       | `loader={imageLoader}`                 | Function        | -          |
| [`sizes`](#sizes)                         | `sizes="(max-width: 768px) 100vw, 33vw"` | String        | -          |
| [`quality`](#quality)                     | `quality={80}`                         | Integer (1-100) | -          |
| [`priority`](#priority)                   | `priority={true}`                      | Boolean         | -          |
| [`placeholder`](#placeholder)             | `placeholder="blur"`                   | String          | -          |
| [`style`](#style)                         | `style={{objectFit: "contain"}}`       | Object          | -          |
| [`onLoadingComplete`](#onloadingcomplete) | `onLoadingComplete={img => done())}`   | Function        | 已弃用     |
| [`onLoad`](#onload)                       | `onLoad={event => done())}`            | Function        | -          |
| [`onError`](#onerror)                     | `onError(event => fail()}`             | Function        | -          |
| [`loading`](#loading)                     | `loading="lazy"`                       | String          | -          |
| [`blurDataURL`](#blurdataurl)             | `blurDataURL="data:image/jpeg..."`     | String          | -          |
| [`overrideSrc`](#overridesrc)             | `overrideSrc="/seo.png"`               | String          | -          |
</div>

#### `src`

图像源。可以是以下之一：

内部路径字符串。

```jsx
<Image src="/profile.png" />
```

绝对外部 URL（必须使用 [remotePatterns](#remotepatterns) 配置）。

```jsx
<Image src="https://example.com/profile.png" />
```

静态导入。

```jsx
import profile from './profile.png'

export default function Page() {
  return <Image src={profile} />
}
```

#### `alt`

`alt` 属性用于向屏幕阅读器和搜索引擎描述图像。它也是在图像被禁用或加载过程中出现错误时的后备文本。

它应该包含可以替代图像的文本，[不改变页面的含义](https://html.spec.whatwg.org/multipage/images.html#general-guidelines)。它不是用来补充图像的，不应重复图像上方或下方标题中已提供的信息。

如果图像是[纯装饰性的](https://html.spec.whatwg.org/multipage/images.html#a-purely-decorative-image-that-doesn't-add-any-information)或[不面向用户](https://html.spec.whatwg.org/multipage/images.html#an-image-not-intended-for-the-user)，`alt` 属性应该是空字符串（`alt=""`）。

> 了解更多关于[图像无障碍指南](https://html.spec.whatwg.org/multipage/images.html#alt)。

#### `width` 和 `height`

`width` 和 `height` 属性表示像素为单位的图像[固有](https://developer.mozilla.org/zh-CN/docs/Glossary/Intrinsic_Size)大小。这个属性用于推断正确的**纵横比**，以便浏览器为图像预留空间并避免加载过程中的布局偏移。它不决定图像的*渲染大小*，渲染大小由 CSS 控制。

```jsx
<Image src="/profile.png" width={500} height={500} />
```

除非有以下情况，否则您**必须**同时设置 `width` 和 `height` 属性：

- 图像被[静态导入](/docs/app/getting-started/images#local-images)
- 图像使用 [`fill` 属性](#fill)

如果高度和宽度未知，我们建议使用 [`fill` 属性](#fill)。

#### `fill`

一个布尔值，使图像扩展到父元素的大小。

```js
<Image src="/profile.png" fill={true} />
```

**定位**:

- 父元素**必须**指定 `position: "relative"`, `"fixed"`, `"absolute"`。
- 默认情况下，`<img>` 元素使用 `position: "absolute"`。

**对象适配**:

如果没有对图像应用样式，图像将拉伸以适应容器。您可以使用 `objectFit` 来控制裁剪和缩放。

- `"contain"`：图像将按比例缩小以适应容器并保持宽高比。
- `"cover"`：图像将填充容器并被裁剪。

> 了解更多关于 [`position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position) 和 [`object-fit`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit)。

#### `loader`

用于生成图像 URL 的自定义函数。函数接收以下参数，并返回图像的 URL 字符串：

- [`src`](#src)
- [`width`](#width-and-height)
- [`quality`](#quality)

<AppOnly>

```js
'use client'

import Image from 'next/image'

const imageLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}

export default function Page() {
  return <Image loader={imageLoader} src="me.png" alt="作者的照片" width={500} height={500} />
}
```

> **须知**：使用 `onLoad` 等接受函数的属性时，需要使用 [客户端组件](https://react.dev/reference/rsc/use-client) 来序列化提供的函数。

</AppOnly>

<PagesOnly>

```js
import Image from 'next/image'

const imageLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}

export default function Page() {
  return <Image loader={imageLoader} src="me.png" alt="作者的照片" width={500} height={500} />
}
```

</PagesOnly>

另外，您也可以在 `next.config.js` 中使用 [loaderFile](#loaderfile) 配置来配置应用程序中每个 `next/image` 实例，而无需传递属性。

#### `sizes`

定义图像在不同断点下的大小。用于浏览器从生成的 `srcset` 中选择最合适的大小。

```jsx
import Image from 'next/image'

export default function Page() {
  return (
    <div className="grid-element">
      <Image
        fill
        src="/example.png"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}
```

在以下情况下应该使用 `sizes`：

- 图像使用 [`fill`](#fill) 属性
- 使用 CSS 使图像响应式

如果缺少 `sizes`，浏览器会假设图像宽度与视口一样宽（`100vw`）。这可能导致下载不必要的大图像。

此外，`sizes` 影响 `srcset` 的生成：

- 如果缺少 `sizes`，会提供小于 640px 到 2048px（增量为 2x）的像素密度描述符 `1x`、`2x`。
- 如果提供了 `sizes`，会生成宽度描述符，范围从 640px 到 5120px，覆盖多种屏幕宽度。

如果您已经知道图像将要渲染的确切尺寸，使用示例：

```jsx
import Image from 'next/image'

export default function Page() {
  return (
    <div className="grid-element">
      <Image
        src="/photo.png"
        width={800}
        height={600}
        sizes="(max-width: 768px) 100vw, 33vw"
        alt="图像描述"
      />
    </div>
  )
}
```

上面的例子告诉浏览器：

- 在视口宽度小于等于 768px 时，图像宽度为 100vw。
- 其他情况下，图像宽度为 33vw。
- 根据真实的图像大小，浏览器会选择最接近 `800px` 或 `600px` 的图像。

**了解更多**：

- [`sizes` MDN 文档](https://developer.mozilla.org/docs/Web/HTML/Element/img#sizes)
- [`srcset` 和 `sizes` 如何工作](https://web.dev/articles/responsive-images#sizes)

#### `quality`

优化图像的质量，范围从 `1` 到 `100`，其中 `100` 是最佳质量，因此文件最大。默认值为 `75`。

```jsx
import Image from 'next/image'

export default function Page() {
  return <Image src="/image.png" alt="图像描述" width={500} height={500} quality={80} />
}
```

如果你在 `next.config.js` 中配置了 [qualities](#qualities)，该值必须匹配允许的条目之一。

> **须知**：如果原始图像质量已经很低，设置高质量值会增加文件大小，但不会改善外观。

#### `style`

通过传递样式对象来设置图像元素的内联样式。

```jsx
import Image from 'next/image'

export default function Page() {
  return (
    <Image
      src="/image.png"
      alt="图像描述"
      width={500}
      height={500}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  )
}
```

> **须知**：如果你使用 `style` 属性设置自定义宽度，确保也设置 `height: 'auto'` 以保持图像的宽高比。

#### `priority`

当设置为 `true` 时，图像将被视为高优先级并且会[预加载](/docs/app/api-reference/components/image#preloading)。使用 `priority` 的图像不会有懒加载效果，会立即加载。

只应该对视口中明显可见的图像使用 `priority`，通常是页面折叠上方的 LCP 元素。

```jsx
import Image from 'next/image'

export default function Page() {
  return <Image src="/image.png" alt="图像描述" width={500} height={500} priority />
}
```

> **须知**：如果使用多个图像作为重要图像，例如使用 `fill` 和 `priority`，且没有设置尺寸，它们的大小将会比使用带有特定宽度和高度的 `priority` 图像大。

#### `loading`

Controls when the image should start loading.

```jsx
// Defaults to lazy
<Image loading="lazy" />
```

- `lazy`: Defer loading the image until it reaches a calculated distance from the viewport.
- `eager`: Load the image immediately, regardless of its position in the page.

Use `eager` only when you want to ensure the image is loaded immediately.

> Learn more about the [`loading` attribute](https://developer.mozilla.org/docs/Web/HTML/Element/img#loading).

#### `placeholder`

用于在图像加载时显示的占位符。可能的值有：

- `blur`：默认为空白空间，但你可以提供 [`blurDataURL`](#blurdataurl) 属性来提供模糊的占位符效果。当你一起使用 `placeholder="blur"` 和 [`blurDataURL`](#blurdataurl) 属性时，图像加载时会使用模糊的数据 URL 作为占位符。

  如果 `src` 是一个静态导入的图像，并且导入的图像是 .jpg、.png、.webp 或 .avif 格式，那么 `blurDataURL` 将自动生成。

  对于动态图像，你必须提供 [`blurDataURL`](#blurdataurl) 属性。
  可以使用 [Plaiceholder](https://github.com/joe-bell/plaiceholder) 等工具生成模糊的数据 URL。

- `empty`：默认占位符，显示空白空间

你也可以创建自定义占位符并在使用 `fill` 时设置 CSS 的 `background-color` 属性。

```jsx
import Image from 'next/image'
import logo from './logo.png'

export default function Page() {
  return (
    <div className="grid-element">
      <Image
        src={logo}
        alt="图像描述"
        placeholder="blur"
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </div>
  )
}
```

#### `blurDataURL`

A [Data URL](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) to
be used as a placeholder image before the image successfully loads. Can be automatically set or used with the [`placeholder="blur"`](#placeholder) property.

```jsx
<Image placeholder="blur" blurDataURL="..." />
```

The image is automatically enlarged and blurred, so a very small image (10px or less) is recommended.

**Automatic**

If `src` is a static import of a `jpg`, `png`, `webp`, or `avif` file, `blurDataURL` is added automatically—unless the image is animated.

**Manually set**

If the image is dynamic or remote, you must provide `blurDataURL` yourself. To generate one, you can use:

- [A online tool like png-pixel.com](https://png-pixel.com)
- [A library like Plaiceholder](https://github.com/joe-bell/plaiceholder)

A large blurDataURL may hurt performance. Keep it small and simple.

**Examples:**

- [Default `blurDataURL` prop](https://image-component.nextjs.gallery/placeholder)
- [Color effect with `blurDataURL` prop](https://image-component.nextjs.gallery/color)

#### `onLoad`

A callback function that is invoked once the image is completely loaded and the [placeholder](#placeholder) has been removed.

```jsx
<Image onLoad={(e) => console.log(e.target.naturalWidth)} />
```

The callback function will be called with one argument, the event which has a `target` that references the underlying `<img>` element.

<AppOnly>

> **Good to know**: Using props like `onLoad`, which accept a function, requires using [Client Components](https://react.dev/reference/rsc/use-client) to serialize the provided function.

</AppOnly>

#### `onError`

A callback function that is invoked if the image fails to load.

```jsx
<Image onError={(e) => console.error(e.target.id)} />
```

<AppOnly>

> **Good to know**: Using props like `onError`, which accept a function, requires using [Client Components](https://react.dev/reference/rsc/use-client) to serialize the provided function.

</AppOnly>

#### `unoptimized`

A boolean that indicates if the image should be optimized. This is useful for images that do not benefit from optimization such as small images (less than 1KB), vector images (SVG), or animated images (GIF).

```js
import Image from 'next/image'

const UnoptimizedImage = (props) => {
  // Default is false
  return <Image {...props} unoptimized />
}
```

- `true`: The source image will be served as-is from the `src` instead of changing quality, size, or format.
- `false`: The source image will be optimized.

Since Next.js 12.3.0, this prop can be assigned to all images by updating `next.config.js` with the following configuration:

```js filename="next.config.js"
module.exports = {
  images: {
    unoptimized: true,
  },
}
```

#### `overrideSrc`

When providing the `src` prop to the `<Image>` component, both the `srcset` and `src` attributes are generated automatically for the resulting `<img>`.

```jsx filename="input.js"
<Image src="/profile.jpg" />
```

```html filename="output.html"
<img
  srcset="/_next/image?url=%2Fme.jpg&w=640&q=75 1x, /_next/image?url=%2Fme.jpg&w=828&q=75 2x"
  src="/_next/image?url=%2Fme.jpg&w=828&q=75"
/>
```

In some cases, it is not desirable to have the `src` attribute generated and you may wish to override it using the `overrideSrc` prop.

For example, when upgrading an existing website from `<img>` to `<Image>`, you may wish to maintain the same `src` attribute for SEO purposes such as image ranking or avoiding recrawl.

```jsx filename="input.js"
<Image src="/profile.jpg" overrideSrc="/override.jpg" />
```

```html filename="output.html"
<img
  srcset="/_next/image?url=%2Fme.jpg&w=640&q=75 1x, /_next/image?url=%2Fme.jpg&w=828&q=75 2x"
  src="/override.jpg"
/>
```

#### `decoding`

A hint to the browser indicating if it should wait for the image to be decoded before presenting other content updates or not.

```jsx
// Default is async
<Image decoding="async" />
```

- `async`: Asynchronously decode the image and allow other content to be rendered before it completes.
- `sync`: Synchronously decode the image for atomic presentation with other content.
- `auto`: No preference. The browser chooses the best approach.

> Learn more about the [`decoding` attribute](https://developer.mozilla.org/docs/Web/HTML/Element/img#decoding).

### Other Props

Other properties on the `<Image />` component will be passed to the underlying `img` element with the exception of the following:

- `srcSet`: Use [Device Sizes](#devicesizes) instead.

### Deprecated props

#### `onLoadingComplete`

已弃用，请使用 [`onLoad`](#onload) 代替。

#### `onLoad`

当图像被完全加载和解码时调用的回调函数。

```jsx
import Image from 'next/image'

export default function Page() {
  return (
    <Image
      alt="图像描述"
      onLoad={(event) => {
        // 使用自然宽度和高度
        const { naturalWidth, naturalHeight } = event.currentTarget
      }}
      src="/image.png"
      width={700}
      height={450}
    />
  )
}
```

#### `onError`

当图像加载失败时调用的回调函数。

```jsx
import Image from 'next/image'

export default function Page() {
  return (
    <Image
      alt="图像描述"
      onError={(event) => {
        // 处理图像加载错误
      }}
      src="/image.png"
      width={700}
      height={450}
    />
  )
}
```

#### `loading`

> 不建议修改这个属性，因为 Next.js 会自动选择最佳的 `loading` 设置。默认值为 `lazy`，对于使用 `priority` 的图像则为 `eager`。

用于控制图像的加载行为，有两个可能的值：

- `lazy`：延迟加载图像，直到它接近视口。
- `eager`：立即加载图像。

了解更多关于 [`loading` 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#loading)。

#### `blurDataURL`

一个 [Data URL](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) 作为图像加载时的占位符图像，与 [`placeholder="blur"`](#placeholder) 一起使用时生效。

在视图中以不同大小渲染模糊的图像，以通过占位符颜色和元素转换从纯色平滑过渡到图像。

必须是 base64 编码的 [Data URL](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)。它会被解码和调整大小以匹配图像的尺寸，因此通常可以非常小，建议长度小于 10KB，避免额外的内存使用。

```jsx
import Image from 'next/image'

export default function Page() {
  return (
    <div className="grid-element">
      <Image
        src="/image.png"
        alt="图像描述"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        width={700}
        height={475}
      />
    </div>
  )
}
```

你可以使用 [Plaiceholder](https://github.com/joe-bell/plaiceholder) 等工具生成 `blurDataURL` 值。

#### `overrideSrc`

可选属性，设置覆盖主图像 src 的值。

```jsx
export function MySmallImage({ src, ...props }) {
  // 优先渲染适合 SEO 的小图像版本，但在后台加载高清版本
  // 例如 Twitter 卡片，它只能显示每张图像第一帧
  return <Image {...props} src={src} overrideSrc={`${src}&preview=1&size=500`} loading="eager" />
}
```

## Advanced

以下配置项可以在 `next.config.js` 中设置，以便在整个应用程序中配置 Image 组件的行为。

### 远程模式

为了保护你的应用程序免受恶意用户的攻击，必须为外部图像提供配置。这是为了确保 Next.js 图像优化 API 只能用于优化保存在托管 Next.js 应用程序的相同服务器上的图像，或者优化来自授权来源的图像。

在 `next.config.js` 文件中添加 `remotePatterns` 以指定允许哪些外部 URL 用于第 [`src`](#src) 参数中的图像元素。

```js filename="next.config.js"
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/account123/**',
      },
    ],
  },
}
```

> **注意**：上述示例只有与 `https://example.com/account123/...` 模式匹配的 URL 才允许被使用。更宽松的设置是仅提供 `protocol` 和 `hostname`，让 `pathname` 为空，这将允许任何路径。

下面是 `remotePatterns` 配置的完整内容，可用于限制外部 URL：

- `protocol`：允许的协议：`http` 或 `https`。
- `hostname`：允许的主机名。
- `port`：允许的端口。
- `pathname`：允许的路径模式。必须以 `/` 开头。
  - 使用 `/**` 允许任何路径。
  - 使用 `/foo/**` 允许任何以 `/foo/` 开头的路径。
  - 使用 `/foo/bar` 只允许确切的 `/foo/bar` 路径。
  - 默认情况下要求路径和参数精确匹配。

> **须知**：在 Next.js 13.4.0 及之后，不再支持 [`domains`](https://nextjs.org/docs/pages/api-reference/components/image)，因为它缺乏与 `remotePatterns` 相同的安全约束。我们强烈建议使用 [`remotePatterns`](#remotepatterns) 代替，它更安全。

### 加载器

如果你想要使用云提供商优化图像，而不是使用 Next.js 内置的图像优化 API，你可以在 `next.config.js` 中配置 `loader` 和 `loaderFile`。

以下 `loader` 字符串值可使用：

- `'default'`：使用 Next.js 的内置图像优化 API
- `'imgix'`：使用 [Imgix](https://imgix.com)
- `'cloudinary'`：使用 [Cloudinary](https://cloudinary.com)
- `'akamai'`：使用 [Akamai](https://akamai.com) 图像优化 API
- `'custom'`：使用自定义 loader 实现

如果你需要指定自定义 loader，你可以使用 `loaderFile` 配置项，它接收一个文件路径，该文件导出一个返回字符串的 `load` 函数。

例如：

```js filename="next.config.js"
module.exports = {
  images: {
    loader: 'custom',
    loaderFile: './my/image/loader.js',
  },
}
```

```js filename="./my/image/loader.js"
export default function myImageLoader({ src, width, quality }) {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}
```

使用 loader 时，总是检查 `width`、`quality` 和其他支持的参数是否正确传递。例如，你可能想要改变 `quality` 参数来匹配你的自定义 API。

### 设备尺寸

如果你知道用户的设备宽度，你可以在 `next.config.js` 中设置 `deviceSizes` 属性。这些宽度会与 [`sizes`](#sizes) 属性一起使用，以确定最佳的图像尺寸。

如果没有提供 `sizes` 属性，则会使用 [`layout='responsive'` 或 `layout='fill'`](#layout) 以确定所需的图像宽度。

如果 `deviceSizes` 和 `imageSizes` 数组的长度大于 25，则 Image 优化的开发构建将会失败。

### 图像尺寸

你可以在 `next.config.js` 中设置 `imageSizes` 属性。当 [`sizes`](#sizes) 属性用于描述小于最小设备宽度的图像宽度时，这些宽度会与 [`deviceSizes`](#device-sizes) 结合使用。

如果没有提供 `sizes` 属性，则会使用 [`layout='fixed'` 或 `layout='intrinsic'`](#layout) 以确定所需的图像宽度。

使用 [`width`](#width) 属性的图像将使用 `deviceSizes` 和 `imageSizes` 的结合来查找最接近的匹配。

### 接受的格式

默认的 [接受](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept) 头将包括：`image/webp`。

您可以通过设置 `next.config.js` 中的 `formats` 数组来配置接受的优化格式：

```js filename="next.config.js"
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}
```

目前支持的格式有 `image/avif` 和 `image/webp`。默认值为 `['image/webp']`。

如果提供了 `image/avif`，它将首先被尝试，因为它比 `image/webp` 的压缩效果更好。如果浏览器不支持 AVIF，则 `image/webp` 是下一个选择。

### 视口尺寸

您可能需要明确定义给定应用程序的最大视口宽度，这不仅可以用于确保 [`srcset`](#srcset) 格式不会超过这些尺寸，还可以用于确保您的布局不会发生溢出。

以下配置会将最大宽度限制为 1920px，避免超宽视口加载不必要大的图像：

```js filename="next.config.js"
module.exports = {
  images: {
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
  },
}
```

## Version History

| Version    | Changes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `v15.3.0`  | `remotePatterns` added support for array of `URL` objects.                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `v15.0.0`  | `contentDispositionType` configuration default changed to `attachment`.                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `v14.2.23` | `qualities` configuration added.                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `v14.2.15` | `decoding` prop added and `localPatterns` configuration added.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `v14.2.14` | `remotePatterns.search` prop added.                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `v14.2.0`  | `overrideSrc` prop added.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `v14.1.0`  | `getImageProps()` is stable.                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `v14.0.0`  | `onLoadingComplete` prop and `domains` config deprecated.                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `v13.4.14` | `placeholder` prop support for `data:/image...`                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `v13.2.0`  | `contentDispositionType` configuration added.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `v13.0.6`  | `ref` prop added.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `v13.0.0`  | The `next/image` import was renamed to `next/legacy/image`. The `next/future/image` import was renamed to `next/image`. A [codemod is available](/docs/app/guides/upgrading/codemods#next-image-to-legacy-image) to safely and automatically rename your imports. `<span>` wrapper removed. `layout`, `objectFit`, `objectPosition`, `lazyBoundary`, `lazyRoot` props removed. `alt` is required. `onLoadingComplete` receives reference to `img` element. Built-in loader config removed. |
| `v12.3.0`  | `remotePatterns` and `unoptimized` configuration is stable.                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `v12.2.0`  | Experimental `remotePatterns` and experimental `unoptimized` configuration added. `layout="raw"` removed.                                                                                                                                                                                                                                                                                                                                                                                  |
| `v12.1.1`  | `style` prop added. Experimental support for `layout="raw"` added.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `v12.1.0`  | `dangerouslyAllowSVG` and `contentSecurityPolicy` configuration added.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `v12.0.9`  | `lazyRoot` prop added.                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `v12.0.0`  | `formats` configuration added.<br/>AVIF support added.<br/>Wrapper `<div>` changed to `<span>`.                                                                                                                                                                                                                                                                                                                                                                                            |
| `v11.1.0`  | `onLoadingComplete` and `lazyBoundary` props added.                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `v11.0.0`  | `src` prop support for static import.<br/>`placeholder` prop added.<br/>`blurDataURL` prop added.                                                                                                                                                                                                                                                                                                                                                                                          |
| `v10.0.5`  | `loader` prop added.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `v10.0.1`  | `layout` prop added.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `v10.0.0`  | `next/image` introduced.                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

### 预加载

图像在视口中变得可见之前的懒加载是由 [浏览器的原生懒加载](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading#images_and_iframes) 完成的。

当图像被认为是 [LCP（最大内容绘制）元素](https://web.dev/articles/lcp#what_elements_are_considered) 时，可以通过设置 [`priority`](#priority) 属性为 `true` 来预加载。这会移除懒加载，并主动预加载图像，而无需将图像直接放在页面顶部（在折叠上方）。

LCP 元素通常是页面视口中可见的最大图像或文本块。当你运行 `next dev` 时，如果 LCP 元素是一个未被优先处理的 `<Image>`，你会在控制台中看到警告。

如果你有图像使用了 `priority`，你可以通过 `fetchPriority` 属性进一步优化：

```
priority={true} fetchPriority="high"
```

这会进一步优先加载图像，按照设计适用于页面上唯一的主要 LCP 图像，比如英雄图像，而不适用于页面上的多个图像。

### 指定尺寸

图像最需要的一项功能是避免 [累积布局偏移](https://web.dev/articles/cls)，在图像加载时防止页面跳动。为了避免这种情况，你必须按照以下任一方式指定图像的大小：

- 通过像 [`width`](#width) 和 [`height`](#height) 一样的静态导入
- 明确指定 [`width`](#width) 和 [`height`](#height) 属性
- 通过在其容器上使用 `style={{ position: "relative" }}` 隐式声明，并使用 [`fill`](#fill) 属性

带有尺寸的图像不会影响已经在页面上设置的样式。正确设置图像尺寸的规则如下：

1. **如果你知道图像的所需尺寸，明确提供 `width` 和 `height`**
2. **如果你不知道所需的尺寸，不要尝试猜测**
   - 使用 [`fill`](#fill)，设置父元素的 `position: "relative"` 和所需的样式，例如 `object-fit: "cover"` 或 `object-fit: "contain"`
3. **如果你知道图像宽高比但不知道确切尺寸**
   - 考虑使用 CSS 纵横比框，或
   - 使用 [`fill`](#fill) 与 [`sizes`](#sizes) 一起

如果静态导入一个图像，那个[图像的导入](/docs/app/api-reference/components/image#local-images)包含了所需的 `height` 和 `width` 属性。

```jsx
import Image from 'next/image'
import profilePic from './assets/me.png'

export default function Page() {
  return <Image src={profilePic} alt="图像描述" />
}
```

### 父容器的样式

如果你使用 `fill`，父元素必须设置 `position: relative`（如果父元素是根标记）或者 `position: absolute`（如果父元素是嵌套标记）。

如果你使用 `fill`，父元素必须分配 `display: block`，这是默认的 `<div>` 标记样式。

### 使用多个提供者

你可以使用不同的 [loader](#loader) 配置不同图像。以下是如何在你的应用中同时使用 Next.js 内置 Image 优化 API 和覆盖 `next/image` 组件的 loader 属性：

```jsx
import Image from 'next/image'
import ProfilePic from './profile-pic.jpg'

const nextImageLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}

export default function Page() {
  return (
    <div>
      <h1>我的主页</h1>
      <Image src={ProfilePic} alt="图像描述" />
      <Image loader={nextImageLoader} src="me.png" alt="图像描述" width={500} height={500} />
    </div>
  )
}
```

## 其他属性

除了我们已经讨论过的属性之外，`next/image` 组件会将任何剩余属性传递给底层的图像元素，包括：

- [`loading`](https://developer.mozilla.org/docs/Web/HTML/Element/img#loading)
- [`decoding`](https://developer.mozilla.org/docs/Web/HTML/Element/img#decoding)
- [`srcset`](https://developer.mozilla.org/docs/Web/HTML/Element/img#srcset)
- [`sizes`](https://developer.mozilla.org/docs/Web/HTML/Element/img#sizes)
- [`title`](https://developer.mozilla.org/docs/Web/HTML/Element/img#title)
- [`referrerPolicy`](https://developer.mozilla.org/docs/Web/HTML/Element/img#referrerpolicy)
- [`fetchPriority`](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/fetchPriority)
- `data-*`, `aria-*`, `role`
