---
title: Custom App
description: Control page initialization and add a layout that persists for all pages by overriding the default App component used by Next.js.
---

Next.js uses the `App` component to initialize pages. You can override it and control the page initialization and:

- Create a shared layout between page changes
- Inject additional data into pages
- [Add global CSS](/docs/nextjs-cn/app/getting-started/css)

## Usage

To override the default `App`, create the file `pages/_app` as shown below:

```tsx switcher
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
```

```jsx switcher
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

The `Component` prop is the active `page`, so whenever you navigate between routes, `Component` will change to the new `page`. Therefore, any props you send to `Component` will be received by the `page`.

`pageProps` is an object with the initial props that were preloaded for your page by one of our [data fetching methods](/docs/nextjs-cn/pages/building-your-application/data-fetching), otherwise it's an empty object.

> **Good to know**:
>
> - If your app is running and you added a custom `App`, you'll need to restart the development server. Only required if `pages/_app.js` didn't exist before.
> - `App` does not support Next.js [Data Fetching methods](/docs/nextjs-cn/pages/building-your-application/data-fetching) like [`getStaticProps`](/docs/nextjs-cn/pages/building-your-application/data-fetching/get-static-props) or [`getServerSideProps`](/docs/nextjs-cn/pages/building-your-application/data-fetching/get-server-side-props).

## `getInitialProps` with `App`

Using [`getInitialProps`](/docs/nextjs-cn/pages/api-reference/functions/get-initial-props) in `App` will disable [Automatic Static Optimization](/docs/nextjs-cn/pages/building-your-application/rendering/automatic-static-optimization) for pages without [`getStaticProps`](/docs/nextjs-cn/pages/building-your-application/data-fetching/get-static-props).

**We do not recommend using this pattern.** Instead, consider [incrementally adopting](/docs/nextjs-cn/app/guides/migrating/app-router-migration) the App Router, which allows you to more easily fetch data for [pages and layouts](/docs/nextjs-cn/app/building-your-application/routing/index/layouts-and-templates).

```tsx switcher
import App, { AppContext, AppInitialProps, AppProps } from 'next/app'

type AppOwnProps = { example: string }

export default function MyApp({ Component, pageProps, example }: AppProps & AppOwnProps) {
  return (
    <>
      <p>Data: {example}</p>
      <Component {...pageProps} />
    </>
  )
}

MyApp.getInitialProps = async (context: AppContext): Promise<AppOwnProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context)

  return { ...ctx, example: 'data' }
}
```

```jsx switcher
import App from 'next/app'

export default function MyApp({ Component, pageProps, example }) {
  return (
    <>
      <p>Data: {example}</p>
      <Component {...pageProps} />
    </>
  )
}

MyApp.getInitialProps = async (context) => {
  const ctx = await App.getInitialProps(context)

  return { ...ctx, example: 'data' }
}
```
