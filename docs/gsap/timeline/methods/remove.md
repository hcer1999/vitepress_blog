# GSAP中文文档 - timeline 方法 - 移除（remove）

## 移除（remove）

从时间线中移除补间、时间线、回调或标签（或它们的数组）。

### 方法签名

```plaintext
remove(value: [Tween | Timeline | Callback | Label]): self
```

从时间线中移除补间、时间线、回调或标签。

### 参数（Parameters）

- **value**: [Tween | Timeline | Callback | Label]
  - 要从时间线中移除的补间、时间线、回调或标签（或它们的数组）。

### 返回值（Returns）

- self
  - 返回实例本身，便于链式调用。

### 详细信息（Details）

从时间线中移除补间、时间线、回调或标签。

## 示例代码（Example Code）

```javascript
tl.remove(myTween)
tl.remove([myTween, mySubTimeline, 'myLabel'])
```
