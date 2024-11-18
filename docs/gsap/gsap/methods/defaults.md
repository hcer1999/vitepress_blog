# GSAP中文文档 - gsap.defaults()

## gsap.defaults()

gsap.defaults() 允许您设置应该由 所有 补间动画继承的属性（除非被设置了 inherit:false 的补间动画覆盖）。那些不是特定于补间动画的通用配置设置（如单位、自动休眠和强制3D）应该使用 gsap.config() 来设置。

例如，如果您想要改变所有补间动画的默认缓动函数和持续时间，您可以这样做：

```javascript
// 设置所有补间动画的默认持续时间为 1 秒，并使用 "power1.inOut" 作为默认缓动函数
gsap.defaults({
  duration: 1,
  ease: 'power1.inOut',
})
```
