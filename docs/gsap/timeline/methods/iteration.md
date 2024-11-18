# GSAP中文文档 - timeline 方法 - 迭代次数（iteration）

## 迭代次数（iteration）

获取或设置重复时间线的迭代次数。例如，第一次通过时迭代次数是 `1`，然后在第一次重复时，迭代次数是 `2`，接着是 `3`，以此类推。

设置迭代次数将导致时间线跳转到指定的迭代次数。例如，如果 `repeat` 是 4，并且播放头当前在第三次重复，`.iteration(2)` 将使时间线跳回到第二次迭代。

### 方法签名

```plaintext
iteration( value: Number ): [Number | self]
```

省略参数时返回当前值（获取器），而定义参数则设置该值（设置器），并返回实例本身以便于链式调用。

### 参数（Parameters）

- **value**: Number（可选）
  - 设置时间线的迭代次数。

### 返回值（Returns）

- Number
  - 如果未提供参数，返回当前迭代次数。
- self
  - 如果提供了参数，返回实例本身以便于链式调用。

## 示例代码（Example Code）

```javascript
// 获取当前迭代次数
var currentIteration = tl.iteration()

// 将迭代次数设置为第二次迭代
tl.iteration(2)
```
