# GSAP中文文档 - tween 方法 - 总进度（totalProgress）

## 总进度（totalProgress）

省略参数时返回当前值（获取器），而定义参数则设置该值（设置器），并返回实例本身以便于链式调用。

获取或设置补间的总进度，这是一个介于0和1之间的值，表示虚拟播放头的位置（**包括重复**），其中0是开始，0.5是完成一半，1是完成。

### 参数（Parameters）

- **value**: Number（可选）
  - 设置补间的总进度值，范围在0到1之间。

### 返回值（Returns）

- Number
  - 如果未提供参数，返回当前总进度值。
- self
  - 如果提供了参数，返回实例本身以便于链式调用。

### 示例代码（Example Code）

```javascript
// 获取当前总进度
var progress = myTween.totalProgress()

// 将总进度设置为完成四分之一
myTween.totalProgress(0.25)
```
