以下是Hammer.js API文档的内容，我将保持原格式并提供详细解析：

## General API

- Hammer
- Hammer.defaults
- Hammer.Manager
- Hammer.Recognizer
- Hammer.input event
- Event object
- Constants
- Utils

### Hammer

创建一个带有默认识别器集的管理器实例，并返回该管理器实例。默认集包含`tap`、`doubletap`、`pan`、`swipe`、`press`、`pinch`和`rotate`识别器实例。

您应该只在默认设置满意的情况下，或者已经设置了自定义初始设置的情况下使用此方法。

#### Constructor(HTMLElement, [options])

仅需元素和选项。这些选项将与`Hammer.defaults`合并。同时，`Hammer.defaults.preset`中定义的识别器集也将被添加。

如果传入一个空的`recognizer`选项，则不会添加任何初始识别器。

```javascript
var myElement = document.getElementById('hitarea')
var mc = new Hammer(myElement)
```

### Hammer.defaults

创建实例时的默认值，将与您的选项合并。

- **touchAction: ‘compute’**  
  接受`compute`、`auto`、`pan-y`、`pan-x`和`none`值。默认选项将根据您的识别器为您选择正确的值。

- **domEvents: false**  
  让Hammer也触发DOM事件。这会稍微慢一些，默认情况下是禁用的。如果您想使用事件委托，建议将其设置为`true`。

- **enable: true**  
  接受一个布尔值，或一个返回布尔值的函数。

- **cssProps: {….}**  
  一组CSS属性，这些属性可以改善输入事件的处理。详细信息请查看JSDoc。

- **preset: [….]**  
  调用`Hammer()`时，默认的识别器设置。创建新的管理器时，这些将被跳过。

### Hammer.Manager

管理器是您元素的所有识别器实例的容器。它为您设置输入事件侦听器，并在元素上为您设置`touch-action`属性。

#### Constructor(HTMLElement, [options])

仅需元素和选项。这些选项将与`Hammer.defaults`合并。

```javascript
var mc = new Hammer.Manager(myElement)
```

您可以使用`recognizers`选项设置初始识别器集。数组应该像这样构建：

```javascript
var mc = new Hammer.Manager(myElement, {
  recognizers: [
    // RecognizerClass, [options], [recognizeWith, ...], [requireFailure, ...]
    [Hammer.Rotate],
    [Hammer.Pinch, { enable: false }, ['rotate']],
    [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }],
  ],
})
```

#### set(options)

更改管理器实例上的选项。推荐使用此方法，因为它会在需要时更新`touchAction`值。

```javascript
mc.set({ enable: true })
```

#### get(string), add(Recognizer) and remove(Recognizer)

向管理器添加一个新的`Recognizer`实例。添加的顺序也是识别器执行的顺序。就像`get`方法一样，它返回添加的`Recognizer`实例。

`get`和`remove`方法接受事件名称（来自识别器）或识别器实例作为参数。

添加和移除也接受识别器数组。

```javascript
// 都返回myPinchRecognizer实例
mc.get('pinch')
mc.get(myPinchRecognizer)
```

```javascript
mc.add(myPinchRecognizer) // 返回识别器
mc.add([mySecondRecognizer, myThirdRecognizer])
```

```javascript
mc.remove(myPinchRecognizer)
mc.remove('rotate')
mc.remove([myPinchRecognizer, 'rotate'])
```

#### on(events, handler) and .off(events, [handler])

监听添加的识别器触发的事件，或移除绑定的事件。接受多个用空格分隔的事件。

```javascript
mc.on('pinch', function (ev) {
  console.log(ev.scale)
})
```

#### stop([force])

停止识别当前输入会话。如果强制停止，识别器循环会立即停止。

#### destroy()

取消所有事件和输入事件的绑定，使管理器不可用。它不会取消任何dom事件侦听器的绑定。

### Hammer.Recognizer

每个识别器都从这个类扩展而来。所有识别器还有`enable`选项，这是一个布尔值或一个动态启用/禁用识别器的回调函数。

#### Constructor([options])

仅需设置选项。

```javascript
var pinch = new Hammer.Pinch()
mc.add(pinch) // 添加到管理器实例
```

#### set(options)

更改识别器实例上的选项。推荐使用此方法，因为它会在需要时更新`touchAction`值。

#### recognizeWith(otherRecognizer) and dropRecognizeWith(otherRecognizer)

与给定的其他识别器同时运行识别器，双向进行。这适用于将平移与结束时的滑动组合，或者在捏合的同时旋转目标。断开连接只会移除识别器上的链接，而不是其他识别器上的。两个方法都接受识别器数组。

如果识别器已添加到管理器中，则这些方法也接受其他识别器的事件名称作为字符串。

#### requireFailure(otherRecognizer) and dropRequireFailure(otherRecognizer)

仅当其他识别器失败时运行识别器。断开连接只会移除识别器上的链接，而不是其他识别器上的。两个方法都接受识别器数组。

如果识别器已添加到管理器中，则这些方法也接受其他识别器的事件名称作为字符串。

### Hammer.input event

Hammer触发一个“秘密”事件`hammer.input`。它在接收到每个输入时被触发，使您能够处理原始输入。小而强大的功能。

```javascript
hammertime.on('hammer.input', function (ev) {
  console.log(ev.pointers)
})
```

### Event object

Hammer触发的所有事件都会接收一个包含以下属性的事件对象。

| Name            | Value                                                          |
| --------------- | -------------------------------------------------------------- |
| type            | 事件名称，例如`panstart`。                                     |
| deltaX          | X轴上的移动。                                                  |
| deltaY          | Y轴上的移动。                                                  |
| deltaTime       | 自第一个输入以来的总时间（毫秒）。                             |
| distance        | 移动的距离。                                                   |
| angle           | 移动的角度。                                                   |
| velocityX       | X轴上的速度，单位为px/ms。                                     |
| velocityY       | Y轴上的速度，单位为px/ms                                       |
| velocity        | 最高的速度X/Y值。                                              |
| direction       | 移动的方向。匹配`DIRECTION`常量。                              |
| offsetDirection | 从起始点移动的方向。匹配`DIRECTION`常量。                      |
| scale           | 多点触控时的缩放。单点触控时为1。                              |
| rotation        | 多点触控时的旋转（度）。单点触控时为0。                        |
| center          | 多点触控的中心位置，或只是单个指针。                           |
| srcEvent        | 源事件对象，类型为`TouchEvent`、`MouseEvent`或`PointerEvent`。 |
| target          | 接收事件的目标。                                               |
| pointerType     | 主要指针类型，可能是`touch`、`mouse`、`pen`或`kinect`。        |
| eventType       | 事件类型，匹配`INPUT`常量。                                    |
| isFirst         | 第一次输入时为`true`。                                         |
| isFinal         | 最终（最后一次）输入时为`true`。                               |
| pointers        | 包含所有指针的数组，包括结束的指针（`touchend`、`mouseup`）。  |
| changedPointers | 包含所有新/移动/丢失的指针的数组。                             |
| preventDefault  | `srcEvent.preventDefault()`方法的引用。仅限专家使用！          |

### Constants

所有常量都在`Hammer`对象中定义。由于它们是二进制标志，您可以在它们上使用位运算符。MDN有一些关于这方面的优秀文档。

#### Directions

用于设置识别器的方向，以及读取事件的值。

| Name                 | Value |
| -------------------- | ----- |
| DIRECTION_NONE       | 1     |
| DIRECTION_LEFT       | 2     |
| DIRECTION_RIGHT      | 4     |
| DIRECTION_UP         | 8     |
| DIRECTION_DOWN       | 16    |
| DIRECTION_HORIZONTAL | 6     |
| DIRECTION_VERTICAL   | 24    |
| DIRECTION_ALL        | 30    |

#### Input Events

Hammer将所有类型的输入（mousedown、mousemove、touchmove、pointercancel）映射到这些常量。

| Name         | Value |
| ------------ | ----- |
| INPUT_START  | 1     |
| INPUT_MOVE   | 2     |
| INPUT_END    | 4     |
| INPUT_CANCEL | 8     |

#### Recognizer States

识别器内部使用这些状态来定义其状态。

| Name             | Value       |
| ---------------- | ----------- |
| STATE_POSSIBLE   | 1           |
| STATE_BEGAN      | 2           |
| STATE_CHANGED    | 4           |
| STATE_ENDED      | 8           |
| STATE_RECOGNIZED | STATE_ENDED |
| STATE_CANCELLED  | 16          |
| STATE_FAILED     | 32          |

### Utils

#### Hammer.on(element, types, handler)

`addEventListener`的包装器，接受多个事件类型。

```javascript
Hammer.on(window, 'load resize scroll', function (ev) {
  console.log(ev.type)
})
```

#### Hammer.off(element, types, handler)

像`Hammer.on`一样，这是`removeEventListener`的包装器，接受多个事件类型。

#### Hammer.each(obj, handler)

遍历数组或对象的自有属性。

```javascript
Hammer.each([10, 20, 30, 40], function (item, index, src) {})
Hammer.each({ a: 10, b: 20, c: 30 }, function (item, key, src) {})
```

#### Hammer.merge(obj1, obj2)

将obj2的属性合并到obj1中。属性不会被覆盖。

```javascript
var options = {
  b: false,
}

var defaults = {
  a: true,
  b: true,
  c: [1, 2, 3],
}
Hammer.merge(options, defaults)

// options.a == true
// options.b == false
// options.c == [1,2,3]
```

#### Hammer.extend(obj1, obj2)

将obj2的属性扩展到obj1中。属性将被覆盖。

```javascript
var obj1 = {
  a: true,
  b: false,
  c: [1, 2, 3],
}

var obj2 = {
  b: true,
  c: [4, 5, 6],
}
Hammer.extend(obj1, obj2)

// obj1.a == true
// obj1.b == true
// obj1.c == [4,5,6]
```

#### Hammer.inherit(child, base, [properties])

简单的类继承。

```javascript
function Animal(name) {
  this.name = name
}

function Dog() {
  Animal.apply(this, arguments)
}

Hammer.inherit(Dog, Animal, {
  bark: function () {
    alert(this.name)
  },
})

var dog = new Dog('Spaikie')
dog.bark()
```

#### Hammer.bindFn(fn, scope)

`Function.bind`的简单替代方案。

```javascript
function myFunction(ev) {
  console.log(this === myContext) // is true
}

var myContext = {
  a: true,
  b: false,
}

window.addEventListener('load', Hammer.bindFn(myFunction, myContext), false)
```

#### Hammer.prefixed(obj, name)

从浏览器获取（带前缀的）属性。

```javascript
Hammer.prefixed(document.body.style, 'userSelect')
// returns "webkitUserSelect" on Chrome 35
```
