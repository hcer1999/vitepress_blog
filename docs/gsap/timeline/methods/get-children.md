# GSAP中文文档 - timeline 方法 - 获取子元素（getChildren）

## 获取子元素（getChildren）

返回一个数组，包含此时间线中嵌套的所有补间和/或时间线，符合提供的 criteria。回调（延迟调用）被视为零持续时间的补间。

### 方法签名

```plaintext
getChildren(nested: Boolean, tweens: Boolean, timelines: Boolean, startTime: Number): Array
```

返回一个数组，包含此时间线中嵌套的所有补间和/或时间线。

### 参数（Parameters）

- **nested**: Boolean

  - 是否包括嵌套的时间线和补间。

- **tweens**: Boolean

  - 是否包括补间。

- **timelines**: Boolean

  - 是否包括时间线。

- **startTime**: Number（可选）
  - 起始时间，用于过滤在指定时间之后开始的补间和时间线。

### 返回值（Returns）

- Array
  - 包含匹配的补间和时间线的数组。

### 详细信息（Details）

例如：

```javascript
// 首先，设置一个主时间线和嵌套时间线：
var master = gsap.timeline({ defaults: { duration: 1 } }),
  nested = gsap.timeline()

// 在嵌套时间线中放入2个补间
nested.to('#e1', { duration: 1, x: 100 }).to('#e2', { duration: 2, y: 200 })

// 在主时间线中放入3个补间
master.to('#e3', { top: 200 }).to('#e4', { left: 100 }).to('#e5', { backgroundColor: 'red' })

// 嵌套时间线：
master.add(nested)

// 获取主时间线的直接子元素：
var children = master.getChildren(false, true, true)

console.log(children.length) // "3"（2个补间和1个时间线）

// 获取所有在0.5秒后发生的补间/时间线（包括嵌套的）：
children = master.getChildren(true, true, true, 0.5)

console.log(children.length) // "5"（4个补间和1个时间线）

// 只获取主时间线的补间（包括嵌套的补间）：
children = master.getChildren(true, true, false)

console.log(children.length) // "5"（5个补间）
```
