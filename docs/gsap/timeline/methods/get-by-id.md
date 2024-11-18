# GSAP中文文档 - timeline 方法 - 通过ID获取（getById）

## 通过ID获取（getById）

搜索时间线并返回第一个与提供的ID匹配的子元素。当创建补间或时间线时，您可以为其分配一个 `id`，以便稍后可以使用该 `id` 找到它。这在使用像React这样的框架和构建工具时特别有用，因为跟踪变量可能会很困难。

### 方法签名

```plaintext
getById(id: String): [Tween | Timeline]
```

搜索时间线并返回第一个与提供的ID匹配的子元素。

### 参数（Parameters）

- **id**: String
  - 要搜索的补间或时间线的ID。

### 返回值（Returns）

- Tween | Timeline
  - 与提供的ID匹配的补间或时间线。

### 详细信息（Details）

例如：

```javascript
var tl = gsap.timeline()

// 在创建时给动画一个 "myTween" ID
tl.to(obj, { id: 'myTween', duration: 1, x: 100 })

// 稍后我们可以这样获取它
var myTween = tl.getById('myTween')
```
