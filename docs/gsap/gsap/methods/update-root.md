# gsap.updateRoot()

通常，GSAP 使用 `requestAnimationFrame` 循环在内部处理所有计时（如果 rAF 不可用，则回退到 setTimeout() ），但一些游戏开发人员请求一种手动更新根的方法（全局）时间线，这正是 gsap.updateRoot() 所允许的。这仅适用于高级用户。首先，您需要像这样取消 GSAP 的代码：

```js
//unhooks the GSAP ticker
gsap.ticker.remove(gsap.updateRoot)
```

然后您可以使用自己的自定义时间更新它，例如：

```js
//sets the root time to 20 seconds manually
gsap.updateRoot(20)
```
