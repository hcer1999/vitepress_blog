---
title: Runtime Config
description: Add client and server runtime configuration to your Next.js app.
---

# NextJS中文文档 - Runtime Configuration

> **Warning:**
>
> - **This feature is deprecated.** We recommend using [environment variables]() instead, which also can support reading runtime values.
> - You can run code on server startup using the [`register` function]().
> - This feature does not work with [Automatic Static Optimization](/nextjs-cn/pages/building-your-application/rendering/automatic-static-optimization), [Output File Tracing](/nextjs-cn/pages/api-reference/config/next-config-js/output#automatically-copying-traced-files), or [React Server Components](/nextjs-cn/app/building-your-application/rendering/server-components).

To add runtime configuration to your app, open `next.config.js` and add the `publicRuntimeConfig` and `serverRuntimeConfig` configs:

```js
module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
  },
}
```

Place any server-only runtime config under `serverRuntimeConfig`.

Anything accessible to both client and server-side code should be under `publicRuntimeConfig`.

> A page that relies on `publicRuntimeConfig` **must** use `getInitialProps` or `getServerSideProps` or your application must have a [Custom App](/nextjs-cn/pages/building-your-application/routing/custom-app) with `getInitialProps` to opt-out of [Automatic Static Optimization](/nextjs-cn/pages/building-your-application/rendering/automatic-static-optimization). Runtime configuration won't be available to any page (or component in a page) without being server-side rendered.

To get access to the runtime configs in your app use `next/config`, like so:

```jsx
import getConfig from 'next/config'
import Image from 'next/image'

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
// Will only be available on the server-side
console.log(serverRuntimeConfig.mySecret)
// Will be available on both server-side and client-side
console.log(publicRuntimeConfig.staticFolder)

function MyImage() {
  return (
    <div>
      <Image src={`${publicRuntimeConfig.staticFolder}/logo.png`} alt="logo" layout="fill" />
    </div>
  )
}

export default MyImage
```
