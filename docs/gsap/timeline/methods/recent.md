# GSAP中文文档 - timeline 方法 - 最近的（recent）

## 最近的（recent）

返回最近添加的子补间/时间线/回调，无论其在时间线中的位置。

### 方法签名

```plaintext
recent(): [Tween | Timeline | Callback]
```

返回最近添加的子补间、时间线或回调，无论其在时间线中的位置。

## 详细信息（Details）

返回最近添加的子补间、时间线或回调，无论其在时间线中的位置。

## 示例代码（Example Code）

```javascript
var tl = gsap.timeline()

// 非常长的补间
tl.to(e1, { duration: 999, x: 100, repeat: 5 })

// 在时间线开始处0.5秒插入这个补间
tl.to(e2, { duration: 1, y: 200 }, 0.5)

// 在最近添加的 e2 补间后3秒插入新的补间
tl.to(e3, { duration: 1, scaleX: 2 }, tl.recent().endTime() + 3)
```
