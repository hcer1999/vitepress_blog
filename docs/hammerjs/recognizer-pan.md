# Hammer.Pan(options)

当指针按下并允许在指定方向移动时，将识别Pan手势。

| 选项      | 默认值        | 描述                            |
| --------- | ------------- | ------------------------------- |
| event     | pan           | 事件名称。                      |
| pointers  | 1             | 需要的指针数量。0表示所有指针。 |
| threshold | 10            | 识别前所需的最小Pan距离。       |
| direction | DIRECTION_ALL | Pan的移动方向。                 |

# 事件

- pan（以及以下所有事件）
- panstart
- panmove
- panend
- pancancel
- panleft
- panright
- panup
- pandown

# 注意事项

当调用`Hammer()`创建一个简单实例时，Pan和Swipe识别器被配置为仅检测水平手势。
