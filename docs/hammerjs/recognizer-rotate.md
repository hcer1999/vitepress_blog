# Hammer.Rotate(options)

当两个或更多的指针以圆形运动时，将识别Rotate手势。

| 选项      | 默认值 | 描述                       |
| --------- | ------ | -------------------------- |
| event     | rotate | 事件名称。                 |
| pointers  | 2      | 需要的指针数量，至少为2。  |
| threshold | 0      | 识别前所需的最小旋转角度。 |

# 事件

- rotate（以及以下所有事件）
- rotatestart
- rotatemove
- rotateend
- rotatecancel

# 注意事项

此识别器默认是禁用的，因为它会使元素阻塞。您可以通过以下方式启用它：

```javascript
hammertime.get('rotate').set({ enable: true })
```
