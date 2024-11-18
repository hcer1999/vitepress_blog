# GSAP中文文档 - timeline 方法 - 进度（progress）

## 进度（progress）

获取或设置时间线的进度，这是一个介于0和1之间的值，表示虚拟播放头的位置（不包括重复），其中0是开始，0.5是完成一半，1是完成。如果时间线定义了一个非零的 `repeat`，则进度和 `totalProgress` 将会不同，因为 `progress` 不包括任何重复或重复延迟，而 `totalProgress` 包括。例如，如果一个时间线实例设置为重复一次，在第一个周期结束时 `totalProgress` 只会是0.5，而 `progress` 会是1。如果您在整个动画过程中观察这两个属性，您会看到进度从0到1两次（每个周期一次），而 `totalProgress` 从0到1一次。

此方法既作为获取器也作为设置器。省略参数时返回当前值（获取器），而定义参数则设置该值（设置器），并返回实例本身以便于链式调用，如 `tl.progress(0.5).play();`

### 方法签名

```plaintext
progress(value: Number): [Number | self]
```

省略参数时返回当前值（获取器），而定义参数则设置该值（设置器），并返回实例本身以便于链式调用。

### 参数（Parameters）

- **value**: Number（可选）
  - 设置时间线的进度值，范围在0到1之间。

### 返回值（Returns）

- Number
  - 如果未提供参数，返回当前进度值。
- self
  - 如果提供了参数，返回实例本身以便于链式调用。

## 示例代码（Example Code）

```javascript
// 获取当前进度
var progress = tl.progress()

// 将进度设置为完成四分之一
tl.progress(0.25)
```
