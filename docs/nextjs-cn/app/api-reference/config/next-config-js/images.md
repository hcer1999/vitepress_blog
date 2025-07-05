---
title: images
description: next/image 加载器的自定义配置
---

如果你想使用云服务提供商来优化图片，而不是使用 Next.js 内置的图像优化 API，你可以在 `next.config.js` 中进行以下配置：

```js
module.exports = {
  images: {
    loader: 'custom',
    loaderFile: './my/image/loader.js',
  },
}
```

这个 `loaderFile` 必须指向 Next.js 应用程序根目录相对路径的文件。该文件必须导出一个返回字符串的默认函数，例如：

<AppOnly>

```js
'use client'

export default function myImageLoader({ src, width, quality }) {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}
```

或者，你可以使用 [`loader` 属性](/nextjs-cn/app/api-reference/components/image#loader) 将函数传递给每个 `next/image` 实例。

> **须知**：自定义图像加载器文件[接受函数](/nextjs-cn/app/building-your-application/rendering/client-components)来序列化提供的函数。

要了解有关配置内置[图像优化 API](/nextjs-cn/app/api-reference/components/image)和[图像组件](/nextjs-cn/app/api-reference/components/image)行为的更多信息，请参阅[图像配置选项](/nextjs-cn/app/api-reference/components/image#configuration-options)了解可用选项。

</AppOnly>

<PagesOnly>

```js
export default function myImageLoader({ src, width, quality }) {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}
```

或者，你可以使用 [`loader` 属性](/nextjs-cn/pages/api-reference/components/image#loader) 将函数传递给每个 `next/image` 实例。

要了解有关配置内置[图像优化 API](/nextjs-cn/pages/api-reference/components/image)和[图像组件](/nextjs-cn/pages/api-reference/components/image)行为的更多信息，请参阅[图像配置选项](/nextjs-cn/pages/api-reference/components/image#configuration-options)了解可用选项。

</PagesOnly>

## 加载器配置示例

- [Akamai](#akamai)
- [AWS CloudFront](#aws-cloudfront)
- [Cloudinary](#cloudinary)
- [Cloudflare](#cloudflare)
- [Contentful](#contentful)
- [Fastly](#fastly)
- [Gumlet](#gumlet)
- [ImageEngine](#imageengine)
- [Imgix](#imgix)
- [PixelBin](#pixelbin)
- [Sanity](#sanity)
- [Sirv](#sirv)
- [Supabase](#supabase)
- [Thumbor](#thumbor)
- [Imagekit](#imagekitio)
- [Nitrogen AIO](#nitrogen-aio)

### Akamai

```js
// 文档: https://techdocs.akamai.com/ivm/reference/test-images-on-demand
export default function akamaiLoader({ src, width, quality }) {
  return `https://example.com/${src}?imwidth=${width}`
}
```

### AWS CloudFront

```js
// 文档: https://aws.amazon.com/developer/application-security-performance/articles/image-optimization
export default function cloudfrontLoader({ src, width, quality }) {
  const url = new URL(`https://example.com${src}`)
  url.searchParams.set('format', 'auto')
  url.searchParams.set('width', width.toString())
  url.searchParams.set('quality', (quality || 75).toString())
  return url.href
}
```

### Cloudinary

```js
// 演示: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
export default function cloudinaryLoader({ src, width, quality }) {
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`]
  return `https://example.com/${params.join(',')}${src}`
}
```

### Cloudflare

```js
// 文档: https://developers.cloudflare.com/images/transform-images
export default function cloudflareLoader({ src, width, quality }) {
  const params = [`width=${width}`, `quality=${quality || 75}`, 'format=auto']
  return `https://example.com/cdn-cgi/image/${params.join(',')}/${src}`
}
```

### Contentful

```js
// 文档: https://www.contentful.com/developers/docs/references/images-api/
export default function contentfulLoader({ src, width, quality }) {
  const url = new URL(`https://example.com${src}`)
  url.searchParams.set('fm', 'webp')
  url.searchParams.set('w', width.toString())
  url.searchParams.set('q', (quality || 75).toString())
  return url.href
}
```

### Fastly

```js
// 文档: https://developer.fastly.com/reference/io/
export default function fastlyLoader({ src, width, quality }) {
  const url = new URL(`https://example.com${src}`)
  url.searchParams.set('auto', 'webp')
  url.searchParams.set('width', width.toString())
  url.searchParams.set('quality', (quality || 75).toString())
  return url.href
}
```

### Gumlet

```js
// 文档: https://docs.gumlet.com/reference/image-transform-size
export default function gumletLoader({ src, width, quality }) {
  const url = new URL(`https://example.com${src}`)
  url.searchParams.set('format', 'auto')
  url.searchParams.set('w', width.toString())
  url.searchParams.set('q', (quality || 75).toString())
  return url.href
}
```

### ImageEngine

```js
// 文档: https://support.imageengine.io/hc/en-us/articles/Directives
export default function imageengineLoader({ src, width, quality }) {
  const compression = 100 - (quality || 50)
  const params = [`w_${width}`, `cmpr_${compression}`)]
  return `https://example.com${src}?imgeng=/${params.join('/')`
}
```

### Imgix

```js
// 演示: https://static.imgix.net/daisy.png?format=auto&fit=max&w=300
export default function imgixLoader({ src, width, quality }) {
  const url = new URL(`https://example.com${src}`)
  const params = url.searchParams
  params.set('auto', params.getAll('auto').join(',') || 'format')
  params.set('fit', params.get('fit') || 'max')
  params.set('w', params.get('w') || width.toString())
  params.set('q', (quality || 50).toString())
  return url.href
}
```

### PixelBin

```js
// 文档 (调整大小): https://www.pixelbin.io/docs/transformations/basic/resize/#width-w
// 文档 (优化): https://www.pixelbin.io/docs/optimizations/quality/#image-quality-when-delivering
// 文档 (自动格式交付): https://www.pixelbin.io/docs/optimizations/format/#automatic-format-selection-with-f_auto-url-parameter
export default function pixelBinLoader({ src, width, quality }) {
  const name = '<your-cloud-name>'
  const opt = `t.resize(w:${width})~t.compress(q:${quality || 75})`
  return `https://cdn.pixelbin.io/v2/${name}/${opt}/${src}?f_auto=true`
}
```

### Sanity

```js
// 文档: https://www.sanity.io/docs/image-urls
export default function sanityLoader({ src, width, quality }) {
  const prj = 'zp7mbokg'
  const dataset = 'production'
  const url = new URL(`https://cdn.sanity.io/images/${prj}/${dataset}${src}`)
  url.searchParams.set('auto', 'format')
  url.searchParams.set('fit', 'max')
  url.searchParams.set('w', width.toString())
  if (quality) {
    url.searchParams.set('q', quality.toString())
  }
  return url.href
}
```

### Sirv

```js
// Docs: https://sirv.com/help/articles/dynamic-imaging/
export default function sirvLoader({ src, width, quality }) {
  const url = new URL(`https://example.com${src}`)
  const params = url.searchParams
  params.set('format', params.getAll('format').join(',') || 'optimal')
  params.set('w', params.get('w') || width.toString())
  params.set('q', (quality || 85).toString())
  return url.href
}
```

### Supabase

```js
// Docs: https://supabase.com/docs/guides/storage/image-transformations#nextjs-loader
export default function supabaseLoader({ src, width, quality }) {
  const url = new URL(`https://example.com${src}`)
  url.searchParams.set('width', width.toString())
  url.searchParams.set('quality', (quality || 75).toString())
  return url.href
}
```

### Thumbor

```js
// Docs: https://thumbor.readthedocs.io/en/latest/
export default function thumborLoader({ src, width, quality }) {
  const params = [`${width}x0`, `filters:quality(${quality || 75})`]
  return `https://example.com${params.join('/')}${src}`
}
```

### ImageKit.io

```js
// Docs: https://imagekit.io/docs/image-transformation
export default function imageKitLoader({ src, width, quality }) {
  const params = [`w-${width}`, `q-${quality || 80}`]
  return `https://ik.imagekit.io/your_imagekit_id/${src}?tr=${params.join(',')}`
}
```

### Nitrogen AIO

```js
// Docs: https://docs.n7.io/aio/intergrations/
export default function aioLoader({ src, width, quality }) {
  const url = new URL(src, window.location.href)
  const params = url.searchParams
  const aioParams = params.getAll('aio')
  aioParams.push(`w-${width}`)
  if (quality) {
    aioParams.push(`q-${quality.toString()}`)
  }
  params.set('aio', aioParams.join(';'))
  return url.href
}
```
