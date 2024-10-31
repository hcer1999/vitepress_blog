# Hammer.Swipe(options)

当指针快速移动（速度足够）且在允许的方向上移动了足够的距离时，将识别Swipe手势。

| 选项      | 默认值        | 描述                                    |
| --------- | ------------- | --------------------------------------- |
| event     | swipe         | 事件名称。                              |
| pointers  | 1             | 需要的指针数量。                        |
| threshold | 10            | 识别前所需的最小距离。                  |
| direction | DIRECTION_ALL | 允许的Swipe方向。                       |
| velocity  | 0.3           | 识别前所需的最小速度，单位为像素/毫秒。 |

# 事件

- swipe（以及以下所有事件）
- swipeleft
- swiperight
- swipeup
- swipedown

# 注意事项

当调用`Hammer()`创建一个简单实例时，Pan和Swipe识别器被配置为仅检测水平手势。
