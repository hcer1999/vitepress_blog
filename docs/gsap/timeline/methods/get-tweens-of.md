# GSAP中文文档 - timeline 方法 - 获取特定目标的补间（getTweensOf）

## 获取特定目标的补间（getTweensOf）

返回在该时间线内特定对象的补间。

### 方法签名

```plaintext
getTweensOf(target: [Object | Selector text | Array], nested: Boolean): Array
```

返回在该时间线内特定对象的补间。

### 参数（Parameters）

- **target**: [Object | Selector text | Array]

  - 补间的目标对象。

- **nested**: Boolean
  - （默认值为 `true`）确定是否返回嵌套时间线中的补间。如果您只想要“顶级”补间和时间线，将此设置为 `false`。

### 返回值（Returns）

- Array
  - Tween 实例的数组。

### 详细信息（Details）

返回在该时间线内特定目标的补间。您可以传入多个目标的数组或选择器文本。

## 示例代码（Example Code）

```javascript
// 获取时间线中目标为 ".myClass" 的所有补间
tl.getTweensOf('.myClass')

// 获取时间线中目标为 myElem 的所有补间，包括嵌套时间线
tl.getTweensOf(myElem, true)
```
