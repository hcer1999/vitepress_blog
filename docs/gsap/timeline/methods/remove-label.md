# GSAP中文文档 - timeline 方法 - 移除标签（removeLabel）

## 移除标签（removeLabel）

从时间线中移除标签，并返回该标签的时间。

### 方法签名

```plaintext
removeLabel(label: String): self
```

从时间线中移除标签，并返回该标签的时间。

### 参数（Parameters）

- **label**: String
  - 要移除的标签的名称。

### 返回值（Returns）

- self
  - 返回实例本身，便于链式调用。

### 详细信息（Details）

从时间线中移除标签。您也可以使用 `remove()` 方法来完成相同的任务。

## 示例代码（Example Code）

```javascript
tl.removeLabel('myLabel') // 返回标签的时间，例如 1.0
```
