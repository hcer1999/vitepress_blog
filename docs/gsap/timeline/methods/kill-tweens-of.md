# GSAP中文文档 - timeline 方法 - 终止特定目标的补间（killTweensOf）

## 终止特定目标的补间（killTweensOf）

在该时间线内终止影响提供的 `targets` 的所有补间。您可以选择性地指定要终止的特定属性。

### 方法签名

```plaintext
killTweensOf(targets: Selector text | Array | Object, props: String, onlyActive: Boolean): Timeline
```

在该时间线内终止影响提供的 `targets` 的所有补间。

### 参数（Parameters）

- **targets**: Selector text | Array | Object

  - 要终止其补间的目标对象（或对象数组）。

- **props**: String（可选）

  - 要终止的属性名称列表，以逗号分隔。如果为 `null`，则所有属性都将被终止。

- **onlyActive**: Boolean（可选）
  - 如果为 `true`，则仅影响当前处于激活状态（进行中）的补间。

### 返回值（Returns）

- Timeline
  - 返回实例本身，便于链式调用。

### 详细信息（Details）

在该时间线内终止影响提供的 `targets` 的所有补间。您可以选择性地指定要终止的特定属性。例如：

## 示例代码（Example Code）

```javascript
// 终止所有影响类名为 "box" 的元素的补间
tl.killTweensOf('.box')

// 仅终止类名为 "box" 的元素的 "x" 和 "y" 属性的动画
tl.killTweensOf('.box', 'x,y')
```
