# Hammer.Pinch(options)

当两个或更多的指针向对方移动（放大）或远离对方（缩小）时，将识别Pinch手势。

| 选项      | 默认值 | 描述                       |
| --------- | ------ | -------------------------- |
| event     | pinch  | 事件名称。                 |
| pointers  | 2      | 需要的指针数量，至少为2。  |
| threshold | 0      | 识别前所需的最小缩放比例。 |

# 事件

- pinch（以及以下所有事件）
- pinchstart
- pinchmove
- pinchend
- pinchcancel
- pinchin
- pinchout

# 注意事项

此识别器默认是禁用的，因为它会使元素阻塞。您可以通过以下方式启用它：

```javascript
hammertime.get('pinch').set({ enable: true })
```
