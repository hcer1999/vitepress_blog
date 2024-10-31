# 更新日志

### 2.0.8, 2016-04-22

##### Manager

- 添加了检查以确保所需的参数存在（[#908](https://github.com/hammerjs/hammer.js/issues/908), [085d3a8](https://github.com/hammerjs/hammer.js/commit/085d3a8)）
- 修复了销毁时恢复`Hammer.defaults.cssProps`的问题（[#904](https://github.com/hammerjs/hammer.js/issues/904), [7d0e60f](https://github.com/hammerjs/hammer.js/commit/7d0e60f)）

##### Input

- 修复了鼠标事件在鼠标触摸组合设备上的去重问题（[#917](https://github.com/hammerjs/hammer.js/issues/917), [#863](https://github.com/hammerjs/hammer.js/issues/863), [bfeb89a](https://github.com/hammerjs/hammer.js/commit/bfeb89a)）

##### Touch-action

- 添加了对特定`touch-action`值的支持映射（[#952](https://github.com/hammerjs/hammer.js/issues/952), [fbe9fd7](https://github.com/hammerjs/hammer.js/commit/fbe9fd7)）

### 2.0.6, 2015-12-23

- 添加了Assign方法并弃用了merge和extend（[#895](https://github.com/hammerjs/hammer.js/issues/895), [fc01eae](https://github.com/hammerjs/hammer.js/commit/fc01eae)）
- 如果window或self被定义，则将Hammer暴露在window或self上，以避免在存在AMD但未使用时出现问题（[356f795](https://github.com/hammerjs/hammer.js/commit/356f795)）
- 如果支持PointerEvent，则添加对PointerEvent的支持，而不是MSPointerEvent（[#754](https://github.com/hammerjs/hammer.js/issues/754), [439c7a6](https://github.com/hammerjs/hammer.js/commit/439c7a6)）
- 修复了moz前缀，前缀应该是Moz而不是moz（[3ea47f3](https://github.com/hammerjs/hammer.js/commit/3ea47f3)）
- 移除了不存在的识别器（[f1c2d3b](https://github.com/hammerjs/hammer.js/commit/f1c2d3b)）
- 修复了实例间配置泄露的问题（[189098f](https://github.com/hammerjs/hammer.js/commit/189098f)）
- 修复了手势配置中的间隙，并更新测试以匹配（[70c2902](https://github.com/hammerjs/hammer.js/commit/70c2902)）
- 修复了Manager的off方法（[#768](https://github.com/hammerjs/hammer.js/issues/768), [da49a27](https://github.com/hammerjs/hammer.js/commit/da49a27)）
- 添加了与requirejs优化器命名空间的兼容性（[70075f2](https://github.com/hammerjs/hammer.js/commit/70075f2)）
- 使touchaction测试可缩放（[50264a7](https://github.com/hammerjs/hammer.js/commit/50264a7)）
- 修复了`pan-x pan-y`情况下的默认阻止（[95eaafa](https://github.com/hammerjs/hammer.js/commit/95eaafa)）
- 修复了错误的触摸动作平移方向（[a81da57](https://github.com/hammerjs/hammer.js/commit/a81da57)）
- 修复了组合的pan-x pan-y解决为none的问题（[fdae07b](https://github.com/hammerjs/hammer.js/commit/fdae07b)）
- 修复了触摸动作识别器的反转触摸动作（[#728](https://github.com/hammerjs/hammer.js/issues/728), [605bd3b](https://github.com/hammerjs/hammer.js/commit/605bd3b)）
- 修复了对非标准触摸列表排序的依赖（[#610](https://github.com/hammerjs/hammer.js/issues/610), [#791](https://github.com/hammerjs/hammer.js/issues/791), [287720a](https://github.com/hammerjs/hammer.js/commit/287720a)）
- 修复了多点触控手势后不触发滑动的问题（[#640](https://github.com/hammerjs/hammer.js/issues/640), [711d8a1](https://github.com/hammerjs/hammer.js/commit/711d8a1)）
- 修复了滑动识别器使用整体手势方向和速度的问题（[963fe69](https://github.com/hammerjs/hammer.js/commit/963fe69)）
- 修复了getDirection返回反向方向的问题（[e40dcde](https://github.com/hammerjs/hammer.js/commit/e40dcde)）
- 修复了多点触控手势存在时检测轻触的问题（[c46cbba](https://github.com/hammerjs/hammer.js/commit/c46cbba)）
- 修复了错误的事件顺序（[#824](https://github.com/hammerjs/hammer.js/issues/824), [92f2d76](https://github.com/hammerjs/hammer.js/commit/92f2d76)）
- 修复了识别器实例间选项泄露的问题（[#813](https://github.com/hammerjs/hammer.js/issues/813), [af32c9b](https://github.com/hammerjs/hammer.js/commit/af32c9b)）
- 修复了元素没有style属性时的检测问题（[5ca6d8c](https://github.com/hammerjs/hammer.js/commit/5ca6d8c)）

### 2.0.4, 2014-09-28

- 修复了IE指针问题。[#665](https://github.com/hammerjs/hammer.js/issues/665)
- 修复了在不同元素上的多点触控问题。[#668](https://github.com/hammerjs/hammer.js/issues/668)
- 添加了实验性的单用户触摸输入处理器。这是为了在仅需要支持单个用户时提高性能/用户体验。计划在2.1版本中将其作为默认设置，并提供启用多用户处理器的设置选项。

### 2.0.3, 2014-09-10

- Manager.set的改进。
- 修复了Manager.options.recognizers中的requireFailure()调用。
- 使DIRECTION_ALL对于平移和滑动手势的阻塞性降低。
- 修复了Swipe识别器的阈值选项。
- 暴露了Input类。
- 添加了`inputClass`选项，用于设置使用的输入处理器。

### 2.0.2, 2014-07-26

- 改进了鼠标和指针事件输入，现在能够在窗口外移动。
- 将导出名称（`Hammer`）作为参数添加到包装器中。
- 添加了实验性的`inputTarget`选项，以更改接收事件的元素。
- 提高了仅有一个触摸激活时的性能。
- 修复了从单点触控到多点触控时的deltaXY跳跃问题。
- 改进了速度计算。

### 2.0.1, 2014-07-15

- 修复了在没有document.body可用时的问题。
- 为按压识别器添加了pressup事件。
- 移除了Object.create的替代方案。

### 2.0.0, 2014-07-11

- 库的全面重写。
