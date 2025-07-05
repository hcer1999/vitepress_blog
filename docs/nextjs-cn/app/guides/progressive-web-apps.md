---
title: 如何使用 Next.js 构建渐进式 Web 应用（PWA）
nav_title: PWA
description: 学习如何使用 Next.js 构建渐进式 Web 应用（PWA）。
related:
  links:
    - app/api-reference/file-conventions/metadata/manifest
---

# NextJS中文文档 - Progressive Web Apps

渐进式 Web 应用（PWAs）结合了 Web 应用的覆盖范围和可访问性以及原生移动应用的功能和用户体验。使用 Next.js，你可以创建提供无缝、类应用体验的 PWA，适用于所有平台，无需多个代码库或应用商店审批。

PWA 允许你：

- 无需等待应用商店审批即可立即部署更新
- 使用单一代码库创建跨平台应用
- 提供类似原生的功能，如主屏幕安装和推送通知

## 使用 Next.js 创建 PWA

### 1. 创建 Web 应用清单

Next.js 提供了内置支持，使用 App Router 创建 [Web 应用清单](/nextjs-cn/app/api-reference/file-conventions/metadata/manifest)。你可以创建静态或动态清单文件：

例如，创建一个 `app/manifest.ts` 或 `app/manifest.json` 文件：

```tsx switcher
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Next.js PWA',
    short_name: 'NextPWA',
    description: 'A Progressive Web App built with Next.js',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
```

```jsx switcher
export default function manifest() {
  return {
    name: 'Next.js PWA',
    short_name: 'NextPWA',
    description: 'A Progressive Web App built with Next.js',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
```

此文件应包含有关应用名称、图标以及如何在用户设备上显示为图标的信息。这将允许用户在其主屏幕上安装你的 PWA，提供类似原生应用的体验。

你可以使用像 [favicon 生成器](https://realfavicongenerator.net/) 这样的工具来创建不同的图标集，并将生成的文件放在你的 `public/` 文件夹中。

### 2. 实现 Web 推送通知

Web 推送通知在所有现代浏览器中都得到支持，包括：

- 安装到主屏幕的应用程序的 iOS 16.4+
- macOS 13 或更高版本的 Safari 16
- 基于 Chromium 的浏览器
- Firefox

这使得 PWA 成为原生应用的可行替代方案。值得注意的是，你可以触发安装提示，而不需要离线支持。

Web 推送通知允许你重新吸引用户，即使他们没有主动使用你的应用。以下是在 Next.js 应用中实现它们的方法：

首先，让我们在 `app/page.tsx` 中创建主页面组件。我们将它分解成更小的部分以便更好地理解。首先，我们将添加一些我们需要的导入和实用程序。暂时不用担心引用的服务器操作还不存在：

```tsx switcher
'use client'

import { useState, useEffect } from 'react'
import { subscribeUser, unsubscribeUser, sendNotification } from './actions'

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
```

```jsx switcher
'use client'

import { useState, useEffect } from 'react'
import { subscribeUser, unsubscribeUser, sendNotification } from './actions'

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\\-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
```

现在，让我们添加一个组件来管理订阅、取消订阅和发送推送通知。

```tsx switcher
function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true)
      registerServiceWorker()
    }
  }, [])

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    })
    const sub = await registration.pushManager.getSubscription()
    setSubscription(sub)
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
    })
    setSubscription(sub)
    const serializedSub = JSON.parse(JSON.stringify(sub))
    await subscribeUser(serializedSub)
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe()
    setSubscription(null)
    await unsubscribeUser()
  }

  async function sendTestNotification() {
    if (subscription) {
      await sendNotification(message)
      setMessage('')
    }
  }

  if (!isSupported) {
    return <p>此浏览器不支持推送通知。</p>
  }

  return (
    <div>
      <h3>推送通知</h3>
      {subscription ? (
        <>
          <p>你已订阅推送通知。</p>
          <button onClick={unsubscribeFromPush}>取消订阅</button>
          <input
            type="text"
            placeholder="输入通知消息"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendTestNotification}>发送测试</button>
        </>
      ) : (
        <>
          <p>你尚未订阅推送通知。</p>
          <button onClick={subscribeToPush}>订阅</button>
        </>
      )}
    </div>
  )
}
```

```jsx switcher
function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    });
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });
    setSubscription(sub);
    await subscribeUser(sub);
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe();
    setSubscription(null);
    await unsubscribeUser();
  }

  async function sendTestNotification() {
    if (subscription) {
      await sendNotification(message);
      setMessage('');
    }
  }

  if (!isSupported) {
    return <p>此浏览器不支持推送通知。</p>;
  }

  return (
    <div>
      <h3>推送通知</h3>
      {subscription ? (
        <>
          <p>你已订阅推送通知。</p>
          <button onClick={unsubscribeFromPush}>取消订阅</button>
          <input
            type="text"
            placeholder="输入通知消息"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendTestNotification}>发送测试</button>
        </>
      ) : (
        <>
          <p>你尚未订阅推送通知。</p>
          <button onClick={subscribeToPush}>订阅</button>
        </>
      )}
    </div>
  );
}
```

最后，让我们创建一个组件，为 iOS 设备显示一条消息，指导用户将应用安装到主屏幕，并且仅在应用尚未安装时显示此消息。

```tsx switcher
function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream)

    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
  }, [])

  if (isStandalone) {
    return null // 如果已安装，不显示安装按钮
  }

  return (
    <div>
      <h3>安装应用</h3>
      <button>添加到主屏幕</button>
      {isIOS && (
        <p>
          要在 iOS 设备上安装此应用，请点击分享按钮
          <span role="img" aria-label="share icon">
            {' '}
            ⎋{' '}
          </span>
          然后点击"添加到主屏幕"
          <span role="img" aria-label="plus icon">
            {' '}
            ➕{' '}
          </span>。
        </p>
      )}
    </div>
  )
}

export default function Page() {
  return (
    <div>
      <PushNotificationManager />
      <InstallPrompt />
    </div>
  )
}
```

```jsx switcher
function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    );

    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
  }, []);

  if (isStandalone) {
    return null; // 如果已安装，不显示安装按钮
  }

  return (
    <div>
      <h3>安装应用</h3>
      <button>添加到主屏幕</button>
      {isIOS && (
        <p>
          要在 iOS 设备上安装此应用，请点击分享按钮
          <span role="img" aria-label="share icon">
            {' '}
            ⎋{' '}
          </span>
          然后点击"添加到主屏幕"
          <span role="img" aria-label="plus icon">
            {' '}
            ➕{' '}
          </span>
          。
        </p>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <div>
      <PushNotificationManager />
      <InstallPrompt />
    </div>
  );
}
```

现在，让我们创建这个文件调用的服务器操作。

### 3. 实现服务器操作

在 `app/actions.ts` 创建一个新文件来包含你的操作。这个文件将处理创建订阅、删除订阅和发送通知。

```tsx switcher
'use server'

import webpush from 'web-push'

webpush.setVapidDetails(
  '<mailto:your-email@example.com>',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
)

let subscription: PushSubscription | null = null

export async function subscribeUser(sub: PushSubscription) {
  subscription = sub
  // 在生产环境中，你会希望将订阅存储在数据库中
  // 例如：await db.subscriptions.create({ data: sub })
  return { success: true }
}

export async function unsubscribeUser() {
  subscription = null
  // 在生产环境中，你会希望从数据库中删除订阅
  // 例如：await db.subscriptions.delete({ where: { ... } })
  return { success: true }
}

export async function sendNotification(message: string) {
  if (!subscription) {
    throw new Error('没有可用的订阅')
  }

  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: '测试通知',
        body: message,
        icon: '/icon.png',
      }),
    )
    return { success: true }
  } catch (error) {
    console.error('发送推送通知时出错:', error)
    return { success: false, error: '发送通知失败' }
  }
}
```

```jsx switcher
'use server';

import webpush from 'web-push';

webpush.setVapidDetails(
  '<mailto:your-email@example.com>',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

let subscription= null;

export async function subscribeUser(sub) {
  subscription = sub;
  // 在生产环境中，你会希望将订阅存储在数据库中
  // 例如：await db.subscriptions.create({ data: sub })
  return { success: true };
}

export async function unsubscribeUser() {
  subscription = null;
  // 在生产环境中，你会希望从数据库中删除订阅
  // 例如：await db.subscriptions.delete({ where: { ... } })
  return { success: true };
}

export async function sendNotification(message) {
  if (!subscription) {
    throw new Error('没有可用的订阅');
  }

  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: '测试通知',
        body: message,
        icon: '/icon.png',
      })
    );
    return { success: true };
  } catch (error) {
    console.error('发送推送通知时出错:', error);
    return { success: false, error: '发送通知失败' };
  }
}
```

发送通知将由我们在第 5 步创建的服务工作线程处理。

在生产环境中，你会希望将订阅存储在数据库中，以便在服务器重启时保持持久性，并管理多个用户的订阅。

### 4. 生成 VAPID 密钥

要使用 Web Push API，你需要生成 [VAPID](https://vapidkeys.com/) 密钥。最简单的方法是直接使用 web-push CLI：

首先，全局安装 web-push：

```bash
npm install -g web-push
```

运行以下命令生成 VAPID 密钥：

```bash
web-push generate-vapid-keys
```

复制输出并将密钥粘贴到你的 `.env` 文件中：

```.env
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_public_key_here
VAPID_PRIVATE_KEY=your_private_key_here
```

### 5. 创建服务工作线程

在 `public/sw.js` 创建一个服务工作线程文件：

```js
self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: data.icon || '/icon.png',
      badge: '/badge.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '2',
      },
    }
    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})

self.addEventListener('notificationclick', function (event) {
  console.log('收到通知点击。')
  event.notification.close()
  event.waitUntil(clients.openWindow('<https://your-website.com>'))
})
```

这个服务工作线程支持自定义图像和通知。它处理传入的推送事件和通知点击。

- 你可以使用 `icon` 和 `badge` 属性为通知设置自定义图标。
- 可以调整 `vibrate` 模式以在支持的设备上创建自定义振动提醒。
- 可以使用 `data` 属性将额外数据附加到通知中。

记得彻底测试你的服务工作线程，以确保它在不同的设备和浏览器上按预期运行。此外，确保在 `notificationclick` 事件监听器中将 `'https://your-website.com'` 链接更新为你的应用程序的适当 URL。

### 6. 添加到主屏幕

第 2 步中定义的 `InstallPrompt` 组件显示了一条消息，指导 iOS 设备用户将应用安装到主屏幕。

要确保你的应用程序可以安装到移动主屏幕，你必须有：

1. 有效的 Web 应用清单（在第 1 步中创建）
2. 通过 HTTPS 提供的网站

当满足这些条件时，现代浏览器将自动向用户显示安装提示。你可以使用 [`beforeinstallprompt`](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeinstallprompt_event) 提供自定义安装按钮，但是，我们不建议这样做，因为它不是跨浏览器和平台的（在 Safari iOS 上不起作用）。

### 7. 本地测试

为了确保你可以在本地查看通知，请确保：

- 你正在[使用 HTTPS 本地运行](/nextjs-cn/app/api-reference/cli/next#using-https-during-development)
  - 使用 `next dev --experimental-https` 进行测试
- 你的浏览器（Chrome、Safari、Firefox）已启用通知
  - 在本地提示时，接受使用通知的权限
  - 确保通知不是全局禁用的（针对整个浏览器）
  - 如果你仍然看不到通知，请尝试使用另一个浏览器进行调试

### 8. 保护你的应用程序

安全性是任何 Web 应用程序的关键方面，特别是对于 PWA。Next.js 允许你使用 `next.config.js` 文件配置安全头信息。例如：

```js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ]
  },
}
```

让我们逐一了解这些选项：

1. 全局头信息（适用于所有路由）：
   1. `X-Content-Type-Options: nosniff`：防止 MIME 类型嗅探，降低恶意文件上传的风险。
   2. `X-Frame-Options: DENY`：通过防止你的网站被嵌入到 iframe 中来防止点击劫持攻击。
   3. `Referrer-Policy: strict-origin-when-cross-origin`：控制请求中包含多少引荐来源信息，平衡安全性和功能性。
2. 服务工作线程特定头信息：
   1. `Content-Type: application/javascript; charset=utf-8`：确保服务工作线程被正确解释为 JavaScript。
   2. `Cache-Control: no-cache, no-store, must-revalidate`：防止服务工作线程被缓存，确保用户始终获得最新版本。
   3. `Content-Security-Policy: default-src 'self'; script-src 'self'`：为服务工作线程实施严格的内容安全策略，只允许来自同一源的脚本。

了解更多关于使用 Next.js 定义[内容安全策略]()的信息。

## 下一步

1. **探索 PWA 功能**：PWA 可以利用各种 Web API 提供高级功能。考虑探索背景同步、周期性背景同步或文件系统访问 API 等功能来增强你的应用程序。要获取灵感和关于 PWA 功能的最新信息，你可以参考诸如 [PWA 现今能做什么](https://whatpwacando.today/) 之类的资源。
2. **静态导出**：如果你的应用程序不需要运行服务器，而是使用文件的静态导出，你可以更新 Next.js 配置以启用此更改。在 [Next.js 静态导出文档]中了解更多信息。但是，你需要从服务器操作转移到调用外部 API，以及将定义的头信息移动到你的代理。
3. **离线支持**：要提供离线功能，一种选择是使用 Next.js 的 [Serwist](https://github.com/serwist/serwist)。你可以在他们的[文档](https://github.com/serwist/serwist/tree/main/examples/next-basic)中找到如何将 Serwist 与 Next.js 集成的示例。**注意**：此插件目前需要 webpack 配置。
4. **安全考虑**：确保你的服务工作线程得到适当的安全保护。这包括使用 HTTPS、验证推送消息的来源以及实现适当的错误处理。
5. **用户体验**：考虑实现渐进增强技术，以确保即使用户的浏览器不支持某些 PWA 功能，你的应用也能正常工作。
