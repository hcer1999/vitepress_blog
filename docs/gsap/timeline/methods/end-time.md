# GSAP中文文档 - timeline 方法 - 结束时间(endTime)

## 结束时间（endTime）

根据其父时间线计算时间线结束的时间。

返回动画根据父时间线的本地时间将完成的时间。这个时间会考虑 `timeScale`。例如：

### 方法签名

```plaintext
endTime(): Number
```

返回动画根据父时间线的本地时间将完成的时间。

## 返回值（Returns）

- Number
  - 动画在父时间线上的结束时间。

## 详细信息（Details）

## 示例代码（Example Code）

```javascript
var tl = gsap.timeline()

// 创建一个1秒的补间
var tween = gsap.to(e, { duration: 1, x: 100 })

// 在时间线0.5秒处插入补间
tl.add(tween, 0.5)

console.log(tween.endTime()) // 1.5

// 将补间的速度加倍，因此它将在正常时间的一半内完成
tween.timeScale(2)

console.log(tween.endTime()) // 1
```
