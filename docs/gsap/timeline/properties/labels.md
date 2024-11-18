# GSAP中文文档 - timeline 属性 - 标签（labels）

## 标签（labels）

存储已添加到时间线上的任何标签。

## 详细信息（Details）

存储已添加到时间线上的任何标签。您可以使用 `timeline.labels` 获取包含所有标签的完整对象。例如：

```javascript
var tl = gsap.timeline()

tl.addLabel('myLabel', 3)
tl.addLabel('anotherLabel', 5)

// 现在标签对象有了这些标签和时间，如下：
console.log(tl.labels.myLabel) // 3
console.log(tl.labels.anotherLabel) // 5
```
