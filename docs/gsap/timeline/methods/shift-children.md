# GSAP中文文档 - timeline 方法 - 移动子元素（shiftChildren）

## 移动子元素（shiftChildren）

shiftChildren 方法用于将时间轴的子元素的开始时间按指定的量进行移动，并且可以选择性地调整标签。

### 方法签名

```plaintext
shiftChildren(amount: Number, adjustLabels: Boolean, ignoreBeforeTime: Number): self
```

将时间轴的子元素的开始时间按指定的量进行移动，并且可以选择性地调整标签。

### 参数（Parameters）

- **amount**: Number

  - 移动每个子元素的秒数（或对于基于帧的时间轴，为帧数）。

- **adjustLabels**: Boolean

  - 默认值为 `false`。如果设置为 `true`，则所有标签的时机也将被相应调整。

- **ignoreBeforeTime**: Number
  - 默认值为 `0`。所有开始时间等于或晚于 `ignoreBeforeTime` 的子元素将受到移动的影响（默认为 0，意味着所有子元素都将受到影响）。这提供了一个简单的方法来将子元素插入到时间轴的某个特定位置，仅将该点之后的子元素向后推，为新元素腾出空间。

### 返回值（Returns）

- self
  - 返回实例本身，便于链式调用。

### 详细信息（Details）

通过指定的量移动时间轴子元素的 `startTime`，并且可以选择性地调整标签。当你想要在时间轴的开头添加子元素或将它们插入到某个特定位置时，这个功能非常有用，可以将现有元素向后移动，为新元素腾出空间。
