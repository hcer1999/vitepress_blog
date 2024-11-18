# GSAP中文文档 - tween 方法 - 终止动画（kill）

## 终止动画（kill）

根据参数的不同，完全或部分终止动画。简单地调用 `kill()`（省略参数）将立即停止动画，将其从父时间线中移除，清除所有属性补间，并释放它以便垃圾回收。

### 参数（Parameters）

- **targets**: Object 或 Array 或 Selector（可选）
  - 要终止动画的特定目标或目标数组。如果补间有多个目标，只影响指定的目标。
- **properties**: String（可选）
  - 要终止的动画的特定补间属性，以逗号分隔的属性名称列表。

### 返回值（Returns）

- self
  - 返回实例本身，便于链式调用。

### 详细信息（Details）

要终止与特定目标相关的动画的所有部分，请使用第一个参数。要终止动画的特定补间属性，请使用第二个参数。

### 示例代码（Example Code）

```javascript
// 终止与目标 "myObject" 相关的动画的所有部分（如果补间有多个目标，其他目标不受影响）：
animation.kill(myObject)

// 仅终止动画的 "x" 和 "y" 属性（所有目标）：
animation.kill(null, 'x,y')

// 仅终止目标 "myObject" 的动画的 "x" 和 "y" 属性：
animation.kill(myObject, 'x,y')

// 仅终止目标 "myObject1" 和 "myObject2" 的动画的 "opacity" 属性：
animation.kill([myObject1, myObject2], 'opacity') //也可以使用选择器文本，如 ".class1, .class2"
```

::: warning 警告
如果你想稍后再次使用动画，请不要使用 kill() - 如果你想重用它，可以使用 pause() 来代替。
:::
