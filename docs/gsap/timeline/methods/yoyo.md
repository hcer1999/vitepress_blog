# GSAP中文文档 - timeline 方法 - 悠悠效果（yoyo）

## 悠悠效果（yoyo）

yoyo 方法用于获取或设置时间轴的 yoyo 状态，当设置为 true 时，时间轴在每次重复时会来回播放，即在正向和反向之间交替进行。

### 方法签名

```plaintext
yoyo(value: Boolean): [Boolean | self]
```

获取或设置时间轴的 yoyo 状态。

### 参数（Parameters）

- **value**: Boolean
  - 默认值为 `false`。省略参数时返回当前值（getter），定义参数时设置值（setter），并返回实例本身以便于链式调用。

### 返回值（Returns）

- [Boolean | self]
  - 省略参数时返回当前值（getter），定义参数时设置值（setter），并返回实例本身以便于链式调用。

### 详细信息（Details）

获取或设置时间轴的 `yoyo` 状态，当设置为 `true` 时，时间轴在每次重复时会来回播放，即在正向和反向之间交替进行。`yoyo` 与 `repeat` 属性一起工作，其中 `repeat` 控制时间轴重复的次数，而 `yoyo` 控制每次重复是否改变方向。因此，要使时间轴具有 yoyo 效果，你必须将其 `repeat` 设置为非零值。

Yoyo 效果不影响时间轴的 `reversed` 属性。例如，如果 `repeat` 是 2 且 `yoyo` 是 `false`，它将看起来像：开始 - 1 - 2 - 3 - 1 - 2 - 3 - 1 - 2 - 3 - 结束。但如果 `yoyo` 是 `true`，它将看起来像：开始 - 1 - 2 - 3 - 3 - 2 - 1 - 1 - 2 - 3 - 结束。

你可以通过在 `vars` 参数中传递 `yoyo: true` 来初始设置 `yoyo` 属性，如：`gsap.timeline({repeat: 1, yoyo: true});`

此方法既作为 getter 也作为 setter。省略参数时返回当前值（getter），定义参数时设置值（setter），并返回实例本身以便于链式调用，如 `myTimeline.yoyo(true).repeat(3).timeScale(2).play(0.5);`

### 示例代码（Example Code）

```javascript
// 获取当前 yoyo 状态
var yoyo = tl.yoyo()

// 将 yoyo 设置为 true
tl.yoyo(true)
```
