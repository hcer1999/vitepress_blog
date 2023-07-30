# 手撕 bind、call、apply

## 引言

在面试中，面试官总让人手撕代码，工作了几年，精通各种技术，结果连最基础的如何实现 apply、call、bind 都被问得哑口无言，实在难以面对江东父老。

今天咱们就来**深入**学习一下`appl`、`call`、`bind`，以及实现原理。

在开始正篇之前，我需要你花一分钟时间，问自己两个问题

1. 你是否不折不扣的理解了`javascript`中关于`this`的指向
2. 是否熟悉`ES6`，本文中不会用那些老掉牙的代码（并不代表你不需要了解，比如`eval`执行字符串代码）

## 正文

### Call

#### 介绍

OK，我们首先来定义一个对象

```javascript
const obj = {
  name: '冰可乐',
  say(prefix, age) {
    console.log(`${prefix},my name is ${this.name},i am ${age} year old`)
  },
}
```

上面我们定义了一个`obj`对象，对象中有`name`属性和`say`方法，我们调用一下这个`say`方法。

```javascript
obj.say('hello', 17) // 'hello,my name is 冰可乐,i am 17 year old'
```

没有什么问题，正常输出了。

那么，如果还有一个对象 A，也像实现上述对象的 say 方法怎么办？

1. 把 say 方法复制到对象 A 中。
2. 能不能借用一下上面对象的 say 方法？

第一种方法显然太 LOW，那么我们试试第二种方法。

大家都知道在 JS 中关于 this 指向的问题，如果我们能让对象 A 的 this 指向对象 obj 不就可以了嘛？

这个时候就可以使用到 call 方法啦~

其实 call 函数的真正作用为**改变函数的作用域**，顺便提一下，不管是 call,还是 apply 都是**冒用借充函数**，我们记住这个名称。

```javascript
const obj = {
  name: '冰可乐',
  say(prefix, age) {
    console.log(`${prefix},my name is ${this.name},i am ${age} year old`)
  },
}

const A = {
  name: '小王',
}

obj.say.call(A, 'hello', 3) // 'hello,my name is 小王,i am 3 year old'
```

在上述代码中，可以总结出来以下两点

- A 中确实没有再次定义一个重复的方法，并且 say 方法中的 this 指向确实指向了 A
- call 方法，可以接受任意多个参数，但是要求，第一个参数必须是待被指向的对象（A），剩下的参数，都传入借过来使用的函数`say`中

我们现在已经知道了 call 的功能，那么我们就开始来模仿实现以上两点，但模仿前，又有两个前置条件需了解。

- 不管是引用数据类型还是基本数据类型，它们的方法，都是定义在原型对象上面的
- 方法中的 this 指向谁调用这个方法

#### 开撕

先写个雏形，该自定义 call 方法接受 N 个参数，其中第一个参数是即将借用这个函数的对象，剩下的参数用 rest 参数表示，这就模仿出了上面的第二点的前半部分

```javascript
Function.prototype.myCall = function (target, ...args) {}
```

我们都知道一个普通函数中的 this 是指向调用这个函数的对象的，那么我们想让上方 say 方法中的 this 指向调用该方法的对象，该怎么做呢？很简单，我在你这个对象上添加一个方法，当我们调用这个对象上的这个方法时，方法中的 this 自然就指向该对象喽

```javascript
Function.prototype.myCall = function (target, ...args) {
  const symbolKey = Symbol()
  target[symbolKey] = this
}
```

这里我们做了两件事，首先就是给传入的第一个对象，添加了一个 key，这里用 symbolKey 而不随便定义另外一个 key 名是因为，我随便写一个名字，可能 target 对象上面正好有呢？

其次，我们为这个属性，赋了一个值 this，而这个 this 就正是借过来使用的函数，这样我们执行该函数时，其中的 this，自然而然的就指向了 target。到这里，已经模仿出了上面的第一点

但是 javascript 要求，当我们 target 传入的是一个非真值的对象时，target 指向 window，这很好办

```javascript
Function.prototype.myCall = function (target, ...args) {
  target = target || window
  const symbolKey = Symbol()
  target[symbolKey] = this
}
```

我们已经给 target 对象上添加了方法，但是什么时候调用呢？调用的时候传入什么参数呢？

```javascript
Function.prototype.myCall = function (target, ...args) {
  target = target || window
  const symbolKey = Symbol()
  target[symbolKey] = this
  const res = target[symbolKey](...args) // args本身是rest参数，搭配的变量是一个数组，数组解构后就可以一个个传入函数中
  delete target[symbolKey] // 执行完借用的函数后，删除掉，留着过年吗？
  return res
}
```

到这里，我们已经完全实现了上面提出的两点需要模仿实现的点，但是我们的目的是把别的方法，拿过来用用，用完了之后，肯定还是要删掉的。并且如果函数具备返回值的话，我们还是需要将返回值进行返回的。

### Apply

#### 介绍

理解了 call 的实现，apply 就很好理解了，因为本质上它们只是在使用方式上有区别而已。

call 调用时，从第二个参数开始，是一个个传递进去的，

apply 调用的时候，第二个参数是个数组而已。

#### 开撕

```javascript
Function.prototype.myApply = function (target, args) {
  // 区别就是这里第二个参数直接就是个数组
  target = target || window
  const symbolKey = Symbol()
  target[symbolKey] = this
  const res = target[symbolKey](...args) // args本身是个数组，所以我们需要解构后一个个传入函数中
  delete target[symbolKey] // 执行完借用的函数后，删除掉，留着过年吗？
  return res
}
```

### Bind

#### 介绍

对 bind 不了解的，可以先看看这篇文章：[传送门](http://blog.bingkele.cc/index.php/archives/10/)

我先写一个基础版的 Bind 实现

```javascript
const mbs = {
  name: '冰可乐',
  say() {
    console.log(`my name is ${this.name}`)
  },
}

mbs.say() // 'my name is 冰可乐'

const B = {
  name: '小王',
}

const sayB = mbs.say.bind(B)

sayB() // 'my name is 小王'
```

总结一下

- bind 本身是个方法，返回值也是个方法，一般调用 bind 方法的也是个方法...别懵
- 接受的第一个参数是一个对象，哪个方法调用 bind 方法，那么这个方法中的 this，就是指向这个对象

#### 开撕

先写个基础架子，完成上面的第一个要素。读到这里，默认上文中的表述你都理解了，如果你感到懵逼，请从头再看一遍～

```javascript
Function.prototype.myBind = function (target) {
  target = target || {} // 处理边界条件
  return function () {} // 返回一个函数
}
```

想要完成上面提到的第二个要素，还是和实现 apply 与 call 那样，给该 target 添加一个方法，这样方法中的 this，就是指向该 target

```javascript
Function.prototype.myBind = function (target) {
  target = target || {} // 处理边界条件
  const symbolKey = Symbol()
  target[symbolKey] = this
  return function () {
    // 返回一个函数
    target[symbolKey]()
    delete target[symbolKey]
  }
}
```

到这里，已经完成了 bind 的大部分逻辑，但是在执行 bind 的时候，是可以传入参数的，稍微改下上面的例子

```javascript
const mbs = {
  name: '冰可乐',
  say(prefix, age) {
    console.log(`${prefix},my name is ${this.name},i am ${age} year old`)
  },
}

mbs.say('hello', 12) // 'hello,my name is 冰可乐,i am 12 year old'

const B = {
  name: '小王',
}

const sayB = mbs.say.bind(B, 'hello')

sayB(3) // 'hello,my name is 小王,i am 3 year old''
```

这里，我们发现一个有意思的地方，不管是 bind 中传递的参数，还是调用 bind 的返回函数时传入的参数，都老老实实的传递到 say 方法中，其实很容易实现啦～

```javascript
Function.prototype.myBind = function (target, ...outArgs) {
  target = target || {} // 处理边界条件
  const symbolKey = Symbol()
  target[symbolKey] = this
  return function (...innerArgs) {
    // 返回一个函数
    const res = target[symbolKey](...outArgs, ...innerArgs) // outArgs和innerArgs都是一个数组，解构后传入函数
    // delete target[symbolKey] 这里千万不能销毁绑定的函数，否则第二次调用的时候，就会出现问题。
    return res
  }
}
```

到这里，关于三者，我们都已经可以信手拈来了。但是说实话，在面试那种紧张的情况下，我可能还是手撕不出来。但是当我被要求被手撕之前，我一定会先问一问可爱的面试官：“我可不可以先写下它们的基础用法，这样我才能照着葫芦画出瓢”。我想，没有一个面试官，会拒绝这样一个合理的要求吧。

> 原文地址：https://juejin.cn/post/7128233572380442660
