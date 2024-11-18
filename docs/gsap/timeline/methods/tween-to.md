# GSAP中文文档 - timeline 方法 - 补间动画到...（tweenTo）

## 补间动画到...（tweenTo）

`tweenTo()` 方法用于在时间轴上创建一个补间动画，将播放头从当前位置移动到指定的时间或标签。

### 方法签名

```plaintext
tweenTo(position: Number, vars: Object): Tween
```

将时间轴的播放头从当前位置补间到指定的时间或标签。

### 参数（Parameters）

- **position**: Number

  - 目标时间（秒），时间轴应该移动到这个位置。

- **vars**: Object
  - 一个对象，包含补间动画的配置，如 `duration`、`ease`、`onComplete` 等。

### 返回值（Returns）

- Tween
  - 返回一个 Tween 实例，该实例处理时间轴的补间动画。

### 详细信息（Details）

`tweenTo()` 方法允许你定义补间动画的持续时间、缓动函数、回调函数等。这个方法非常有用，当你需要在时间轴的特定点插入补间动画，或者当你需要动态控制时间轴的播放头时。

### 示例代码（Example Code）

```javascript
// 创建一个时间轴
var tl = gsap.timeline()

// 将时间轴的播放头从当前位置补间到 5 秒的位置
tl.tweenTo(5, { duration: 2, ease: 'power.inOut' })

// 如果你想在补间动画完成后执行一个函数
tl.tweenTo(5, {
  duration: 2,
  ease: 'power.inOut',
  onComplete: function () {
    console.log('Tween complete!')
  },
})
```
