# 大厂面试题（持续更新）

希望能够帮助大家提升自己的能力，在面试的时候能够游刃有余，轻松拿到高薪offer。

## JS基础核心-API实现原理

### 数组基本类型去重

```js
const a = { test: 1 }
const oldArr = [
  1,
  1,
  'true',
  'true',
  true,
  true,
  15,
  15,
  false,
  false,
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  'NaN',
  'NaN',
  0,
  0,
  'a',
  'a',
  {},
  {},
  a,
  a,
]
```

::: details 查看答案

::: code-group

```js [Set]
function unique(arr) {
  return Array.from(new Set(arr))
}
// 基本类型 推荐采用这种方式 简单明了
console.log('es6 set', unique(oldArr))
// [1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {}, {}]
```

```js [includes]
function unique3(arr) {
  if (!Array.isArray(arr)) return
  const array = []
  for (let i = 0; i < arr.length; i++) {
    if (!array.includes(arr[i])) {
      array.push(arr[i])
    }
  }
  return array
}
// NaN识别出来了，对象也没去重，正解
console.log('includes', unique3(oldArr))
// [1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {}, {}, { test: 1 }]
```

```js [indexOf]
function unique2(arr) {
  if (!Array.isArray(arr)) return
  const array = []
  for (let i = 0; i < arr.length; i++) {
    if (array.indexOf(arr[i]) === -1) {
      array.push(arr[i])
    }
  }
  return array
}
// 缺点：无法识别NaN
console.log('indexOf', unique2(oldArr))
// // [1, "true", true, 15, false, undefined, null, NaN, NaN, "NaN", 0, "a", {}, {}, { test: 1 }]
```

:::

### 数组的对象key值相同的去重

```js
// 对数组对象元素的键值进行去重
const oldArr = [
  { id: 'Koro1', artist: '第一个相同key值元素' },
  { id: 'Koro1', artist: '第2个相同key值元素' },
  { id: '威廉古堡', artist: '两个对象一模一样' },
  { id: '威廉古堡', artist: '两个对象一模一样' },
  { artist: '两个对象一模一样', id: '威廉古堡' }, // 顺序不一样
  { id: '以父之名', artist: '周杰伦1' },
  { artist: '周杰伦2', id: '以父之名' },
  { id: '七里香', artist: '周杰伦' },
]
```

::: details 查看答案

::: code-group

```js [基本方法]
function unique(arr, key) {
  const result = {} // 数组元素对象的key值相同 则覆盖对象
  const finalResult = [] // 去重后的数组
  // 遍历数组 去重对象相同键值
  arr.forEach((item) => {
    result[item[key]] = item // id(或者其他已知键名)为键名 相同键名覆盖 后出现的覆盖前面的
  })
  // 获取对象key值的数组对象元素
  for (const keyName in result) {
    finalResult.push(result[keyName])
  }
  return finalResult // 返回去重数组
}
// 对id值相同的对象进行去重
console.log('后面key值相同的元素覆盖前面的', unique(oldArr, 'id'))
```

```js [覆盖后面的]
// 数组对象元素 前面的覆盖后面的
function unique2(arr, key) {
  const result = {}
  const finalResult = []
  arr.forEach((item) => {
    // 只保存第一次出现的数组元素
    if (result[item[key]] === undefined) {
      result[item[key]] = item
    }
  })
  for (const keyName in result) {
    finalResult.push(result[keyName])
  }
  return finalResult
}

console.log('前面的元素覆盖后面的', unique2(oldArr, 'id'))
```

```js [JSON.stringify]
// JSON.stringify将对象字符串化 来去重
function unique3(arr) {
  const hash = {}
  arr.forEach((item) => {
    hash[JSON.stringify(item)] = item
  })
  // 遍历对象 取出元素
  arr = Object.keys(hash).map((key) => JSON.parse(key))
  return arr
}

console.log('简单对象元素 转字符来比对', unique3(oldArr))
// 问题: 对象顺序不一样 JSON.stringify字符串化值不同 也不能比对出来
// { id: "威廉古堡", artist: "两个对象一模一样" },
// { id: "威廉古堡", artist: "两个对象一模一样" },
// { artist: "两个对象一模一样", id: "威廉古堡" }, // 顺序不一样
```

:::

### 加强版防抖节流

::: details 查看答案
::: code-group

```js [防抖]
/**
 * @description: 防抖函数：函数被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时
 * @param {Function} fn 要执行的函数
 * @param {Number} wait  wait毫秒后执行回调
 * @param {*} ...params1 传递给fn的参数
 */
function debounce(fn, wait, ...params1) {
  // params1 = 初始化debounce时的参数
  let timer = null
  return function (...params2) {
    // params2 = 调用函数时的参数
    if (timer) {
      // 如果有一个函数在等待执行 清除定时器，已执行过了 也可以重新计时
      clearTimeout(timer)
      timer = null // 上次是否执行不重要 清空timer 直接重启定时器
    }
    // 设定时器/重置定时器
    timer = setTimeout(() => {
      // wait时间后 执行回调 期间再触发debounce 需要重新等待
      fn.apply(this, [...params1, ...params2]) // apply绑定当前执行作用域
    }, wait)
  }
}

// 调用
// 要防抖的函数
let actionFn = (...params) => {
  console.log('回调', params)
}
const cb = debounce(actionFn, 500, 'actionFn参数1', '参数2')
setInterval(cb, 1000) // 第一次在1500ms后触发，之后每1000ms触发一次
setInterval(debounce(actionFn, 2000), 1000) // 还没执行就一直重复触发,不会执行
```

```js [节流]
/**
 * @description: 节流函数：规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行
 * @param {Function} fn 要执行的函数
 * @param {Number} gapTime  单位时间
 * @param {*} ...arr 传递给fn的参数
 */
function throttle(fn, gapTime, ...arr) {
  let last = 0 // 上次执行时间 第一次马上执行
  return function (...params2) {
    let nowTime = Date.now() // 当前时间
    // 当前时间-上次执行的时间是否超过间隔时间 就执行回调
    if (nowTime - last > gapTime) {
      // apply 参数是 Array
      fn.apply(this, [...arr, ...params2])
      last = nowTime // 重置上次执行时间为当前时间 方便下次执行
    }
  }
}
// 调用
setInterval(throttle(actionFn, 1000, 'actionFn参数1', '参数2'), 10)
// 每隔10毫秒都会触发一次throttle，每隔一秒触发一次actionFn回调(1秒内再次触发被丢弃)
```

:::

### 节流函数最后一次调用必须执行

::: details 查看答案

```js
/**
 * @description: 节流函数的最后一次触发必须调用
 * @param {Function} fn 要执行的函数
 * @param {Number} gapTime  单位时间
 * @param {*} ...arr 传递给fn的参数
 */
function throttleLastRun(fn, gapTime, ...arr) {
  let last = 0 // 上次执行时间 第一次马上执行
  let timeout
  return function (...params2) {
    let nowTime = Date.now() // 当前时间
    // 当前时间-上次执行的时间是否超过间隔时间 就执行回调
    let params = [...arr, ...params2]
    if (nowTime - last > gapTime) {
      clearTimeout(timeout) // 清除最后一次
      fn.apply(this, params) // ...arr为fn的参数
      last = nowTime // 重置上次执行时间为当前时间 方便下次执行
    } else {
      clearTimeout(timeout) // 清除上一个最后一次，改为这次为最后一次
      // 最后一次必须执行 在下一次执行之前未被执行 则执行最后一次
      timeout = setTimeout(() => {
        timeout = null
        fn.apply(this, params)
      }, gapTime)
    }
  }
}

// 要防抖的函数
let actionFn = function (a, b) {
  console.log('回调', a, b)
}
setInterval(throttleLastRun(actionFn, 1000, 'actionFn参数1', '参数2'), 500)
```

:::

### 深拷贝(正则、时间类型处理、循环引用问题解决)

::: details 查看答案

```js
// 深拷贝
// 1. 正则、时间类型处理
// 2. 函数等正常值 返回
// 3. 解决循环引用的问题

function deepClone(obj, hash = new WeakMap()) {
  if (obj == null) return obj
  if (obj instanceof RegExp) return new RegExp(obj) // 处理正则类型数据
  if (obj instanceof Date) return new Date(obj) // 处理时间类型数据
  if (typeof obj !== 'object') return obj // 返回函数等正常值
  if (hash.has(obj)) return hash.get(obj) //  查询循环引用
  const copy = new obj.constructor() //  根据constructor实例化数组、对象
  hash.set(obj, copy) // 设置hash值 用于查询循环引用
  for (const key in obj) {
    // 循环对象属性 原型链的值 不拷贝
    if (obj.hasOwnProperty(key)) {
      //  循环递归拷贝
      copy[key] = deepClone(obj[key], hash)
    }
  }
  return copy
}
```

:::

### 继承

::: details 查看答案

```js
// ES5寄生组合继承实现：
// 父类被继承的对象
function supFather(name) {
  this.name = name
  this.colors = ['red', 'blue', 'green'] // 复杂类型
}
supFather.prototype.sayName = function (age) {
  console.log(this.name, 'age')
}

// 子类
function Sub(name, age) {
  //  借用父类的方法：修改它的this指向,赋值父类的构造函数里面方法、属性到子类上
  supFather.call(this, name)
  this.age = age
}
//  重写子类的prototype，修正constructor指向
function inheritPrototype(sonFn, fatherFn) {
  sonFn.prototype = Object.create(fatherFn.prototype) // 浅拷贝父类原型上的属性和方法
  sonFn.prototype.constructor = sonFn // 修正constructor指向到继承的那个函数上
}
//
inheritPrototype(Sub, supFather)
// 子类的prototype属性要写在后面 否则会被覆盖
Sub.prototype.sayAge = function () {
  console.log(this.age, 'foo')
}

// 实例化子类，可以在实例上找到属性、方法
const instance1 = new Sub('OBKoro1', 24)
const instance2 = new Sub('小明', 18)
instance1.colors.push('black')
console.log(instance1) // {"name":"OBKoro1","colors":["red","blue","green","black"],"age":24}
console.log(instance2) // {"name":"小明","colors":["red","blue","green"],"age":18}

// 使用ES5实现ES6 extends的例子
//  其实就是上面ES5的寄生组合式继承的那个例子
function Parent(name) {
  this.name = name
}
Parent.sayHello = function () {
  console.log('hello')
}
Parent.prototype.sayName = function () {
  console.log(`my name is ${this.name}`)
  return this.name
}

function Child(name, age) {
  Parent.call(this, name) //  相当于调用super
  this.age = age
}
//  继承原型
function _inherits(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype)
  Child.prototype.constructor = Child
  Child.__proto__ = Parent
}
_inherits(Child, Parent)

Child.prototype.sayAge = function () {
  console.log(`my age is ${this.age}`)
  return this.age
}
// 测试
const parent = new Parent('Parent')
const child = new Child('Child', 18)
console.log('parent: ', parent) // parent:  Parent {name: "Parent"}
Parent.sayHello() // hello
parent.sayName() // my name is Parent
console.log('child: ', child) // child:  Child {name: "Child", age: 18}
Child.sayHello() // hello
child.sayName() // my name is Child
child.sayAge() // my age is 18
```

:::

### instanceOf实现原理

作用：一个对象是否在另一个对象的原型链上

思路：左边变量的原型链上有右边变量的原型，说明左边对象是继承右边对象的。

::: details 查看答案

```js
function instanceOf(left, right) {
  let leftValue = left.__proto__
  const rightValue = right.prototype
  while (true) {
    if (leftValue === null) {
      return false // 左边变量的原型链上没找到
    }
    if (leftValue === rightValue) {
      return true // 右边变量的原型在左边变量的原型链上
    }
    leftValue = leftValue.__proto__ // 找下层原型
  }
}
```

:::

### new实现原理

思路：执行函数，挂载原型、判断返回值

::: details 查看答案

```js
function myNew(fn, ...params) {
  // 第一个参数为要new的构造函数 其他的为该构造函数的参数
  //  挂载原型 执行结果
  const target = {} // 挂载原型的对象
  target._proto_ = fn.prototype // 原型连接,target是fn的实例
  const res = fn.apply(target, params) // 执行函数 将this指向构造函数的实例
  //  判断返回值
  const type = typeof res // 结果的类型
  if (res && (type === 'object' || type === 'function')) {
    return res // 构造函数返回其他对象、或者函数 就返回res
  }
  return target // 否则就返回函数的实例
}
```

:::

### Object.assgin的模拟实现

思路：遍历对象，将属性赋值给目标对象

1. 遍历对象
2. 判断属性是否可枚举
3. 判断属性是否可写
4. 赋值属性
5. 循环遍历
6. 返回目标对象

::: details 查看答案

```js
/**
 * description: Object.assign的模拟实现
 * param target [type] 合并的源对象
 * param mergeObjArr [array] 要合并的对象的数组
 * return [Object] 合并后的对象
 */
Object.myAssign = function (target, ...mergeObjArr) {
  target = Object(target) // 普通类型包装成对象 比如字符串 数字等
  for (let i = 0; i < mergeObjArr.length; i++) {
    // 过滤掉要合并的对象为null和undefined的情况
    if (mergeObjArr[i] !== null || mergeObjArr[i] !== undefined) {
      // 遍历要合并对象的属性
      for (let key in mergeObjArr[i]) {
        // in运算符会查找原型对象上的可枚举属性，所以需要通过Object.prototype.hasOwnProperty方法过滤掉对象原型对象上的属性
        if (mergeObjArr[i].hasOwnProperty(key)) {
          target[key] = mergeObjArr[i][key]
        }
      }
    }
  }
  return target
}

// 示例代码
const proto = { p: 'proto' }
const obj1 = { a: 'aa' }
const obj2 = { b: 'bb' }
// 以proto对象为新对象的__proto__
const obj3 = Object.create(proto, {
  c: {
    value: 'cc',
    enumerable: true,
  },
})
console.log(obj3) // {c: 'cc'}
// 输出obj3的构造函数的原型对象
console.log(obj3.__proto__) // {p: 'proto'}

// 说明不会合并原型链(__proto__) 上面的属性
const t1 = Object.myAssign({}, obj1, obj2)
console.log(t1) // {a: "aa", b: "bb"}
// 过滤合并对象为null、undefined的情况
const t2 = Object.myAssign({}, obj1, null, obj2, undefined)
console.log(t2) // {a: "aa", b: "bb"}
// 合并属性
const t3 = Object.myAssign({}, obj1, obj2, obj3)
console.log(t3) // {a: "aa", b: "bb", c: "cc"}
```

:::

### 数组方法splice forEach filter map reduce some every 实现原理

::: details 查看答案
::: code-group

```js [splice]
Array.prototype.mySplice = function (start, deleteCount, ...addList) {
  if (start < 0) {
    if (Math.abs(start) > this.length) {
      start = 0
    } else {
      start += this.length
    }
  }

  if (typeof deleteCount === 'undefined') {
    deleteCount = this.length - start
  }
  // 删除
  const removeList = this.slice(start, start + deleteCount)
  const right = this.slice(start + deleteCount)
  // 添加
  let addIndex = start
  addList.concat(right).forEach((item) => {
    this[addIndex] = item
    addIndex++
  })
  this.length = addIndex

  return removeList
}
```

```js [forEach]
Array.prototype.myForEach = function (fn, thisArgs) {
  if (typeof fn !== 'function') throw 'Error in params'
  const len = this.length // 在遍历的开始就确定遍历次数 对元素增删改查不会影响遍历次数
  //  遍历使用回调 传递参数
  for (let i = 0; i < len; i++) {
    fn.call(thisArgs, this[i], i, this)
  }
}

// 使用
const oldArr = [1, 2, 3, 4, 5]

oldArr.myForEach((item, index, arr) => {
  console.log('myForEach', item, index, arr)
})
```

```js [filter]
Array.prototype.myFilter = function (callBack) {
  const newArr = []
  // 1. 循环
  for (let i = 0; i < this.length; i++) {
    const item = this[i]
    // 2. 执行回调 满足条件 添加它
    if (callBack(item, i)) {
      newArr.push(item)
    }
  }
  return newArr // 3. 返回新数组
}

// 使用
const oldFilterArr = [1, 2, 3, 4, 5]

const filterNewArr = oldFilterArr.myFilter((item) => item <= 3) // 过滤3以及3以下

console.log('filter 重写', filterNewArr)
```

```js [map]
Array.prototype.myMap = function (callBack) {
  const newArr = []
  // 1. 循环
  for (let i = 0; i < this.length; i++) {
    // 2. 执行回调 添加回调的返回值
    const newItem = callBack(this[i], i)
    newArr.push(newItem)
  }
  return newArr // 3. 返回新数组
}

const oldMapArr = [1, 2, 3, 4, 5]

const newMapArr = oldMapArr.myMap((item) => `${item}元素处理`)

console.log('map 重写', newMapArr)
```

```js [reduce]
Array.prototype.myReduce = function (callBack, pre) {
  // 1. 循环
  for (let i = 0; i < this.length; i++) {
    if (pre !== undefined) {
      // 2. 传入已有的pre 与 当前循环值 赋值到pre上
      pre = callBack(pre, this[i], i, this)
    } else {
      // 3. 如果没传入pre 将数组当前项当做pre传入 并增加指针
      pre = callBack(this[i], this[i + 1], i, this)
      i++
    }
  }
  return pre // 4. 返回pre
}

const oldReduce = [1, 2, 3, 4, 5]

const reduceRes = oldReduce.myReduce((prev, curr, index) => prev + curr, 0)

console.log('reduce 重写', reduceRes)
```

```js [some]
Array.prototype.mySome = function (callBack) {
  for (let i = 0; i < this.length; i++) {
    if (callBack(this[i])) {
      return true // 有一个元素符合要求 即成
    }
  }
  return false
}

const oldSome = [1, 2, 3, 4, 5]
// 如果有一个值大于4 则返回true
const someIsTrue = oldSome.mySome((item) => item > 4)

console.log('some 重写', someIsTrue)
```

```js [every]
Array.prototype.myEvery = function (callBack) {
  for (let i = 0; i < this.length; i++) {
    if (!callBack(this[i])) {
      return false // 有一个元素错误即失败
    }
  }
  return true
}

const everyArr = [1, 2, 3, 4, 5]

const everyIsTrue = everyArr.myEvery((item) => item > 0)

console.log('every 重写', everyIsTrue)
```

:::

### reduce组合函数、reduce多维数组展开

::: details 查看答案

```js
// reduce的实现原理
Array.prototype.reduce1 = function (cb, prev) {
  for (let i = 0; i < this.length; i++) {
    if (prev === undefined) {
      // 一开始没传值 使用第一个元素当prev 将下一个元素当成curr
      prev = cb(this[i], this[i + 1], i + 1, this)
      i++ // 增加指针
    } else {
      prev = cb(prev, this[i], i, this) // 返回值储存在prev 在下一次循环中传进去
    }
  }
  return prev // 返回结果
}

// 用法
const res = [1, 2, 3, 4, 5].reduce1((prev, curr, index, arr) => prev + curr)

// 多维数组展开
const flatFnn = (arr) =>
  arr.reduce(
    (prev, curr) => (Array.isArray(curr) ? prev.concat(flatFnn(curr)) : prev.concat(curr)),
    [],
  )

let oldArr = [1, [2, [3, [4, [5]]]]]
let newArr = flatFnn(oldArr)
console.log('newArr', newArr)

// 从前包裹后面的函数执行 使用闭包缓存函数执行
const compose = (...fns) => {
  // 返回一个 前面的函数包裹后面的函数执行
  return fns.reduce((a, b) => {
    // 返回一个函数 存储参数
    return (...args) => a(b(...args))
  })
}

const fn1 = function (a, b) {
  return a + b
}

const fn2 = function (str) {
  return `${str}第二个函数处理`
}

const fn3 = function (str) {
  return `${str}第三个函数处理`
}
const final = compose(fn3, fn2, fn1) // 接受函数 从后往前冲
const res2 = final('a', 'b') // 依次执行 返回结果
console.log('res', res2) // ab第二个函数处理第三个函数处理
```

:::

### 排序

#### 冒泡排序

大的值好像气泡慢慢升至表面

思路: 双重遍历，相邻比较，前面的比后面的大就交换位置。

::: details 查看答案

```js
function modifiedBubbleSort(arr) {
  const { length } = arr
  for (let i = 0; i < length; i++) {
    // 每个元素跟其他元素比较 双重遍历
    const num = length - 1 - i //  减去上面已经冒泡 排序好的值 提高性能
    for (let j = 0; j < num; j++) {
      //  比较不同值，交换位置
      if (arr[j] > arr[j + 1]) {
        ;[arr[j + 1], arr[j]] = [arr[j], arr[j + 1]] // 交换位置
      }
    }
  }
  return arr
}
// 使用
const oldArr = [3, 4, 5, 1, 2, 7, 8]

modifiedBubbleSort(oldArr)
console.log('排序结果', oldArr)
```

:::

#### 插入排序

思路: 每次排一个元素，新元素往前比较

比前一个小的，前一个往后移一位，依次排好所有元素。

::: details 查看答案

```js
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i // 当前已排序好的位置 让后面的值跟前面的比较
    let temp = arr[i] // 要插入的值
    //  筛选条件
    while (j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1] // 把前面不符合条件的值往后移
      j-- // 并且更新索引
    }
    // 遍历结束前面的值都比插入值大
    arr[j] = temp
  }
  return arr
}

// 使用
const oldArr = [3, 4, 5, 1, 2, 7, 8]

insertionSort(oldArr)
console.log('排序结果', oldArr)
```

:::

#### 快速排序

思路: 随机选一个值，比它小的放左边，比它大的放右边，然后递归左右。

::: details 查看答案

```js
function quickSort(arr) {
    if (arr.length <= 1) return arr
    const pivotIndex = Math.floor(arr.length / 2)
    const pivot = arr.splice(pivotIndex, 1)[0]
    const left = []
    const right = []

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
        left.push(arr[i])
        } else {
        right.push(arr[i])
        }
    }
    return [...quickSort(left), pivot, ...quickSort(right)]
```

:::

### 实现bind函数

思路:

1. 拷贝源函数
2. 通过变量储存源函数
3. 使用Object.create复制源函数的prototype给fToBind
4. 返回拷贝的函数
5. 调用拷贝的函数：
6. new调用判断：通过instanceof判断函数是否通过new调用，来决定绑定的context
7. 绑定this+传递参数
8. 返回源函数的执行结果

::: details 查看答案

```js
Function.prototype.myBind = function (target, ...params) {
  const thisFn = this // 存储源函数以及上方的params(函数参数)
  // 对返回的函数 secondParams 二次传参
  const fToBind = function (...secondParams) {
    //  确定context 上下文
    const isNew = this instanceof fToBind // this是否是fToBind的实例 也就是返回的fToBind是否通过new调用
    const context = isNew ? this : Object(target) // new调用就绑定到this上,否则就绑定到传入的target上
    //  绑定this的指向并传递参数,返回执行结果
    return thisFn.call(context, ...params, ...secondParams)
  }
  //  复制源函数的prototype给fToBind 一些情况下函数没有prototype，比如箭头函数
  if (thisFn.prototype) {
    fToBind.prototype = Object.create(thisFn.prototype)
  }
  return fToBind // 返回拷贝的函数
}
```

:::

### 实现call、apply方法

思路: 1. 拷贝源函数 2. 通过变量储存源函数 3. 绑定this 4. 绑定参数 5. 返回源函数的执行结果

call和apply类似，区别在于call是传参，apply是传数组

::: details 查看答案
::: code-group

```js [call]
Function.prototype.myCall = function (context, ...paramsArr) {
  //  确定this执行
  if (context === null || context === undefined) {
    // 指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中为window)
    context = window
  } else {
    context = Object(context) // 值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的实例对象
  }
  //  临时储存函数
  const specialPrototype = Symbol('特殊属性Symbol')
  context[specialPrototype] = this
  const result = context[specialPrototype](...paramsArr) //  通过隐式绑定执行函数并传递参数 绑定this
  delete context[specialPrototype] // 删除上下文对象的属性
  return result // 返回函数执行结果
}
```

```js [apply]
//  只改变传参
Function.prototype.myApply = function (context, params) {
  //  确定this执行
  if (context === null || context === undefined) {
    // 指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中为window)
    context = window
  } else {
    context = Object(context) // 值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的实例对象
  }
  // 校验参数
  const paramsArr = Array.isArray(params) ? params : [params]
  //  临时储存函数
  const specialPrototype = Symbol('特殊属性Symbol')
  context[specialPrototype] = this
  const result = context[specialPrototype](...paramsArr) //  通过隐式绑定执行函数并传递参数 绑定this
  delete context[specialPrototype] // 删除上下文对象的属性
  return result // 返回函数执行结果
}
```

:::

### 函数柯里化

思路: 比较函数参数，不足返回函数等待接收参数，够了就执行

::: details 查看答案

```js
function curry(fn, ...args) {
  //  比较参数数量
  if (args.length < fn.length) {
    //  返回函数 等待接收参数
    return function (...args2) {
      return curry(fn, ...args, ...args2)
    }
  }
  //  函数参数够了 执行该函数返回结果
  return fn.apply(this, args)
}

// 使用
function sum(a, b, c, d) {
  return a + b + c + d
}
const curriedSum = curry(sum, 1) // 保存函数和参数
const res = curriedSum(2) // 保存第2个参数与sum函数
const res2 = res(3) // 保存第3个参数
// 传进第四个参数 参数足够了 执行函数 返回执行结果 不能再传递参数了
const res3 = res2(4)
console.log('res', curriedSum, res, res2, res3)
```

:::

### 完整实现promise

::: details 查看答案

```js
class Promise {
  constructor(executor) {
    this.status = 'pending' // 初始状态
    this.value = null // 成功时的值
    this.error = null // 失败时的错误
    this.successCallbacks = [] // 存储成功回调
    this.failureCallbacks = [] // 存储失败回调

    const resolve = (value) => this.resolvePromise(value)
    const reject = (error) => this.rejectPromise(error)

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  // 解决Promise
  resolvePromise(value) {
    if (this.status !== 'pending') return
    this.status = 'fulfilled'
    this.value = value

    this.successCallbacks.forEach((callback) => callback(value))
  }

  // 拒绝Promise
  rejectPromise(error) {
    if (this.status !== 'pending') return
    this.status = 'rejected'
    this.error = error

    this.failureCallbacks.forEach((callback) => callback(error))
  }

  // then方法
  then(onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
      this.successCallbacks.push((value) => {
        try {
          const result = onFulfilled(value)
          if (result instanceof Promise) result.then(resolve, reject)
          else resolve(result)
        } catch (error) {
          reject(error)
        }
      })

      this.failureCallbacks.push((error) => {
        try {
          const result = onRejected(error)
          if (result instanceof Promise) result.then(resolve, reject)
          else resolve(result)
        } catch (error) {
          reject(error)
        }
      })

      if (this.status === 'fulfilled') this.resolvePromise(this.value)
      if (this.status === 'rejected') this.rejectPromise(this.error)
    })
  }

  // catch方法
  catch(onRejected) {
    return this.then(null, onRejected)
  }

  // finally方法
  finally(onFinally) {
    return this.then(
      (value) => Promise.resolve(onFinally()).then(() => value),
      (error) =>
        Promise.resolve(onFinally()).then(() => {
          throw error
        }),
    )
  }

  // all方法
  static all(promises) {
    return new Promise((resolve, reject) => {
      let resolvedCount = 0
      const results = []

      promises.forEach((promise, index) => {
        promise.then(
          (value) => {
            results[index] = value
            if (++resolvedCount === promises.length) resolve(results)
          },
          (error) => reject(error),
        )
      })
    })
  }

  // race方法
  static race(promises) {
    return new Promise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(resolve, reject)
      })
    })
  }
}

// 注意：这个实现没有包含所有的细节和优化，例如错误传播和处理微任务，仅作为基础示例
```

:::

### await实现原理

::: details 查看答案

1. 基本概念
   await 是 `JavaScript` 中的一个关键字，用于在 `async` 函数内部“等待”一个 `Promise` 的解决。它为编写异步代码提供了更简洁、更同步化的语法。

2. 语法与限制
   使用场景：`await` 必须用在 `async` 函数内部。尝试在非 `async` 函数中使用会引发语法错误。
   等待对象：`await` 后面可以跟任何表达式，但最常见的是跟一个 `Promise`。如果跟的是非 `Promise` 对象，该对象会被隐式转换为 `Promise`（使用 `Promise.resolve()`）。
3. 执行流程
   暂停执行：当执行到 `await` 表达式时，当前 `async` 函数的执行会被暂停，控制权返回到调用者。
   等待结果：`await` 会等待其后的 `Promise` 完成（`resolve` 或 `reject`）。如果 `Promise` 被解决（`resolve`），则 `await` 表达式的值就是 `Promise` 的解决值；如果 `Promise` 被拒绝（`reject`），则 await 会抛出一个错误，这错误可以被 `try...catch` 捕获。
   继续执行：一旦 `Promise` 完成，`async` 函数会从 `await` 处继续执行，此时 `await` 表达式的值已经可用。
4. 返回值与异常处理
   返回值：`await` 表达式的值是 `Promise` 解决的值，这意味着你可以直接使用这个值进行后续操作，而不需要通过 `.then()`。
   异常处理：如果 `Promise` 被拒绝，`await` 会抛出一个异常。这可以通过 `try...catch` 来捕获并处理，就像处理同步代码中的错误一样。
5. 异步堆栈跟踪
   当 `await` 后的 `Promise` 被拒绝，引发的错误会保留当前的调用堆栈信息，这对于调试异步代码非常有帮助。

6. 非阻塞特性
   虽然 `await` 会使当前 `async` 函数暂停，但这并不意味着它会阻塞其他 `JavaScript` 代码的执行。`JavaScript` 引擎会继续执行事件循环中的其他任务，因此 `await` 提供了一种非阻塞的等待方式。

实现原理简述
在引擎层面，`async` 函数会被编译为一个状态机，管理函数的暂停和恢复执行。`await` 操作符背后是一系列复杂的机制，包括生成器（`Generators`）、迭代器（`Iterators`）以及内部的 `Promise` 处理逻辑，确保了异步操作的正确调度和结果传递，同时保持了代码的可读性和简洁性。

:::

## 大厂实战场景代码题

### 实现一个简单的模板引擎（用replace 和不用 replace）<Badge type="tip" text="蚂蚁金服-保险部门" />

```js
function template(str) {}

// 不用replace
// function template(str) {

// }

const tpl = template('<p>hey there {{ name }} {{ name }}</p>')
const res = tpl({ name: 'Neo' })

console.log('template', res)
```

::: details 查看答案

```js
// 用replace
function template(str) {
  return function (obj) {
    for (let key in obj) {
      let reg = new RegExp(`{{\\s*${key}\\s*}}`, 'g')
      str = str.replace(reg, obj[key])
    }
    return str
  }
}

// Vue的方式：拼字符串 使用 new Function + with 模板引擎编译
// 匹配 截取字符串 装进数组里面
function template(str) {
  return function (obj) {
    let arr = []
    let reg = new RegExp(`{{\\s*(.+?)\\s*}}`)
    // 匹配{{}} 添加字符到arr中
    while (str.length) {
      let res = reg.exec(str)
      if (res) {
        let noMatch = str.slice(0, res.index)
        str = str.slice(res.index)
        // 前面没匹配的部分
        arr.push(`_s('${noMatch}')`)
        // 匹配到{{ key }} 获取key
        arr.push(`_getValue('${res[1]}')`)
        str = str.slice(res[0].length)
      } else {
        // 没有匹配了
        arr.push(`_s('${str}')`)
        str = ''
      }
    }
    // 获取obj的值
    obj._getValue = function (key) {
      return this[key]
    }
    // 字符串化
    obj._s = function (val) {
      if (typeof val === 'object') return JSON.stringify(val)
      return val
    }
    // arr: ['<p>hey there ', 'name', ' ', 'name', '</p>']
    let code = arr.join('+')
    let render = new Function(`with(this){return _s(${code})}`)
    // 绑定this指向 并执行
    let template = render.call(obj)
    return template
  }
}

var tpl = template('<p>hey there {{ name }} {{ name }}</p>')
let res = tpl({ name: 'Neo' })

console.log('template', res)
```

:::

### 对象扁平化 <Badge type="tip" text="阿里" />

```js
/**
 * 对象扁平化
 * 说明：请实现 flatten(input) 函数，input 为一个 javascript 对象（Object 或者 Array），返回值为扁平化后的结果。
 * 示例：
 *   var input = {
 *     a: 1,
 *     b: [ 1, 2, { c: true }, [ 3 ] ],
 *     d: { e: 2, f: 3 },
 *     g: null,
 *   }
 *   var output = flatten(input);
 *   output如下
 *   {
 *     "a": 1,
 *     "b[0]": 1,
 *     "b[1]": 2,
 *     "b[2].c": true,
 *     "b[3][0]": 3,
 *     "d.e": 2,
 *     "d.f": 3,
 *     // "g": null,  值为null或者undefined，丢弃
 *  }
 */

const input = {
  a: 1,
  b: [1, 2, { c: true }, [3]],
  d: { e: 2, f: 3 },
  g: null,
}
const flattenRes = flattenObj(input)
console.log('flattenRes', flattenRes)
// 对象扁平化

function flattenObj(obj) {}
```

::: details 查看答案

```js
function flattenObj(obj) {
  let res = {}
  // 对一个对象扁平化
  const help = (target, oldKey) => {
    for (let key in target) {
      let newKey // 判断老的key
      if (oldKey) {
        // 递归有老key 则组合起来
        if (Array.isArray(target)) {
          // 数组变为 老key[0]
          newKey = `${oldKey}[${key}]`
        } else {
          // 对象： 老key.a
          newKey = `${oldKey}.${key}`
        }
      } else {
        // 初始化情况下
        if (Array.isArray(target)) {
          // 数组变为 [0] [1]
          newKey = `[${key}]`
        } else {
          // 对象变为 'a' 'b'
          newKey = key
        }
      }
      if (
        Object.prototype.toString.call(target[key]) === '[object Object]' ||
        Array.isArray(target[key])
      ) {
        // 递归数组和对象 传进组织好的老key
        help(target[key], newKey)
      } else if (target[key] !== null && target[key] !== undefined) {
        // 递归出口 常规数据 直接赋值
        res[newKey] = target[key]
      }
    }
  }
  help(obj, '')
  return res
}
```

:::

### 根据表达式计算字母数 <Badge type="tip" text="阿里-leetcode困难题" />

```js
/**
 * 根据表达式计算字母数
 * 说明：
 *   给定一个描述字母数量的表达式，计算表达式里的每个字母实际数量
 *   表达式格式：
 *     字母紧跟表示次数的数字，如 A2B3
 *     括号可将表达式局部分组后跟上数字，(A2)2B
 *     数字为1时可缺省，如 AB3。
 * 示例：
 *   countOfLetters('A2B3'); // { A: 2, B: 3 }
 *   countOfLetters('A(A3B)2'); // { A: 7, B: 2 }
 *   countOfLetters('C4(A(A3B)2)2'); // { A: 14, B: 4, C: 4 }
 */

// leetcode 困难题

function countOfAtoms(formula) {}

console.log(countOfAtoms('A2B3')) // { A: 2, B: 3 }
console.log(countOfAtoms('A(A3B)2')) // { A: 7, B: 2 }
console.log(countOfAtoms('C4(A(A3B)2)2')) // { A: 14, B: 4, C: 4 }
```

::: details 查看答案

```js
// 栈+哈希表
function countOfAtoms(formula) {
  let i = 0
  const n = formula.length

  const stack = [new Map()] // 初始化压入一个空栈
  while (i < n) {
    const ch = formula[i]
    // 解析一串连续的字母
    function parseAtom() {
      const sb = []
      sb.push(formula[i++]) // 扫描首字母
      // 扫描首字母后的小写字母
      while (i < n && formula[i] >= 'a' && formula[i] <= 'z') {
        sb.push(formula[i++])
      }
      return sb.join('')
    }
    // 解析数字
    const parseNum = () => {
      // 到末尾了 || 不是数字，视作 1
      if (i === n || isNaN(Number(formula[i]))) {
        return 1
      }
      // 获取数字
      let num = 0
      while (i < n && !isNaN(Number(formula[i]))) {
        const base = num * 10 // 如果是多位数字 则扩大十倍
        const now = Number(formula[i]) // 当前数字
        num = base + now // 扫描数字
        i++
      }
      return num
    }

    if (ch === '(') {
      i++
      // 增加括号层级
      stack.unshift(new Map()) // 将一个空的哈希表压入栈中，准备统计括号内的原子数量
    } else if (ch === ')') {
      i++
      const num = parseNum() // 括号右侧数字
      // 减少括号层级
      const popMap = stack.shift() // 弹出括号内的原子数量
      const topMap = stack[0]
      // 栈中的数量与初始化的栈进行合并字母数量
      for (const [atom, count] of popMap.entries()) {
        let beforeNum = topMap.get(atom) || 0 // 初始化栈中之前的数量
        let nowNum = count * num // 栈中的数量 乘以倍数
        topMap.set(atom, nowNum + beforeNum) // 将括号内的原子数量乘上 num，加到上一层的原子数量中
      }
    } else {
      const atom = parseAtom() // 解析完字母
      const num = parseNum() // 字母后面是否跟着数字
      // 将最外面层级 合并到第一个栈中
      const topMap = stack[0]
      topMap.set(atom, (topMap.get(atom) || 0) + num)
    }
  }
  // 最后都合并到第一个栈中
  let map = stack.pop()
  return Object.fromEntries(map.entries()) // map转对象
}
```

:::

### 异步任务，控制并发数目 <Badge type="tip" text="快手二面" />

思路：

- 任务数量通过size来控制

- 添加Promise异步任务，任务数量没达到max并发数 则直接执行异步

- 重要: Promise异步任务结束后 减少size 直接从任务池中取出一个新任务来执行

::: details 查看答案

```js
class TaskConcurrent {
  constructor(size) {
    this.max = size
    this.size = 0 // 并发数量控制
    this.taskQueue = [] // 任务队列
  }

  // 生成异步任务对象
  taskFactory(fn, params, resolve, reject) {
    return {
      fn, // 异步任务
      params, // 函数参数
      resolve, // 异步完成
      reject, // 异步错误
    }
  }

  // 添加任务
  addTask(fn, ...params) {
    return new Promise((resolve, reject) => {
      const taskObj = this.taskFactory(fn, params, resolve, reject)
      // 添加到栈尾
      this.taskQueue.push(taskObj)
      if (this.size !== this.max) {
        this.queueOutTask()
      }
    })
  }

  // 从栈中取出任务
  queueOutTask() {
    // 任务池 没有任务了
    if (this.taskQueue.length === 0) {
      return
    }
    // 开始异步任务 增加当前同时并发的任务数量
    this.size++
    const { resolve, fn, params, reject } = this.taskQueue.shift() // 先进先出
    const taskPromise = this.runTask(fn, params, reject)
    // 返回一个promise promise resolve出一个promise 会自动链式调用
    resolve(taskPromise)
  }

  // 执行任务
  runTask(fn, params, reject) {
    // 执行任务 如果返回值不是异步 包装返回值成异步
    const taskPromise = Promise.resolve(fn(...params))
    taskPromise
      .then((res) => {
        console.log('异步结束', res)
        this.pullTask() // 取出新的回调
      })
      .catch((err) => {
        this.pullTask() // 取出新的回调
        reject(err) // 异步失败
      })
    return taskPromise
  }

  // 异步结束 添加新的异步任务
  pullTask() {
    // 上一个任务有结果了 开放一个并发名额出来
    this.size--
    // 从任务池中取出任务 自动执行异步任务
    this.queueOutTask()
  }
}

// 调用addTask一个一个添加异步任务
const task = (timeout) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(timeout) // 返回值
    }, timeout),
  )

// 模拟异步任务1
// const taskList = [5000, 3000, 1000, 10300, 8000, 2000, 4000, 5000]
// async function startNoConcurrentControl() {
//   // 初始化并发池
//   const cc = new TaskConcurrent(2)
//   console.time('异步执行时间')
//   // 添加所有异步任务
//   const resArr = await Promise.all(taskList.map((item) => cc.addTask(task, item)))
//   console.log('异步任务返回值', resArr)
//   console.timeEnd('异步执行时间')
// }
// startNoConcurrentControl()

// 模拟异步2 循环添加异步任务
function start() {
  const taskConcurrent2Instance = new TaskConcurrent(2)
  let count = 10
  // 组织参数
  while (count--) {
    const p = taskConcurrent2Instance.addTask(task, count * 1000)
    p.then((res) => {
      console.log('p', res)
    })
  }
}
start()
```

:::

### 实战event-loop任务优先级

掌握这些任务的优先级：setTimeout、promise.nextTick、setImmediate、promise

以下代码的执行结果？

```js
setImmediate(() => {
  console.log(1)
}, 0)
setTimeout(() => {
  console.log(2)
}, 0)
new Promise((resolve) => {
  console.log(3)
  resolve()
  console.log(4)
}).then(() => {
  console.log(5)
})
async function test() {
  const a = await 9
  console.log(a)
  const b = await new Promise((resolve) => {
    resolve(10)
  })
  console.log(b)
}
test()
console.log(6)
process.nextTick(() => {
  console.log(7)
})
console.log(8)
```

::: details 查看答案
答案：3 4 6 8 7 5 2 1

微任务：nextTick比then优先级高 宏任务：setTimeout优先级比setImmediate高

process.nextTick > promise.then > setTimeout > setImmediate

注意await也是promise 但是需要一个个promise添加进去 所以同一个await里面的promise的顺序可能被其他的promise插队

解析：https://www.jianshu.com/p/a39d3e878d06
:::

### 实现一个event类(订阅发布) 含有on off once emit方法

:::details 查看答案

```js
// 订阅发布
class Event {
  constructor() {
    this.events = {}
  }

  // 订阅
  on(type, fn) {
    // 参数检测
    if (!(fn instanceof Function)) {
      throw '回调必须是函数'
    }
    // 初始化容器
    if (!this.events[type]) {
      this.events[type] = []
    }
    // 添加监听
    if (!this.events[type].includes(fn)) {
      this.events[type].push(fn)
    }
  }

  /**
   * description: 事件触发 通知所有订阅者
   * param type [type] 事件类型
   * param eventData [type] 事件信息 订阅者的数据
   * param _this [type] 订阅者的this挂载
   * return [type]
   */
  emit(type, eventData, _this) {
    if (!this.events[type]) {
      throw '该事件未监听'
    }
    this.events[type].forEach((item) => {
      item.call(_this, eventData)
    })
  }

  // 取消订阅
  off(type, fn) {
    // 没有函数就清空
    if (!fn) {
      this.events[type] = []
      return
    }
    // 使用filter 不使用splice 因为splice删除当前元素会影响当前emit遍历 导致事件触发不完整
    this.events[type] = this.events[type].filter((item) => item !== fn)
  }

  // 订阅一次
  once(type, fn) {
    const self = this
    // 重写函数
    const reWriteFn = function (eventData) {
      fn.call(this, eventData)
      self.off(type, reWriteFn) // 执行后卸载
    }
    // 传入
    this.on(type, reWriteFn)
  }
}

// 测试代码
const e = new Event()
// 订阅
e.on('click', (msg) => {
  console.log(1, msg, this)
})
function testOff(msg) {
  console.log(2, msg, this)
}
e.on('click', testOff)
function fn3(msg) {
  console.log(3, msg, this)
}
// 订阅一次
e.once('click', fn3)
function fn4(msg) {
  console.log(4, msg, this)
}
e.once('click', fn4)
console.log(e)
// 通知事件更新
const obj = {
  a: '传入的this对象',
}
e.emit('click', '事件数据', obj)
console.log(e)
e.off('click', testOff)
console.log('off取消订阅', e)
```

:::

## 算法题

### 删除字符串中出现次数最少的字符后的字符串

```js
function handle(str) {}
```

::: details 查看答案

```js
/**
 * @description:
 * 1. 思路通过对象的key设置数量
 * 2. 获取对象中最小的值
 * 3. 循环字符串，对比最小值与当前字符不相等
 * 4. 可以输出。
 * @param {type} str
 * @return {type} res
 */
function handle(str) {
  let obj = {}
  let res = ''
  for (let i = 0; i < str.length; i++) {
    if (obj[str[i]]) obj[str[i]]++
    else obj[str[i]] = 1
  }
  let min = Math.min(...Object.values(obj))
  for (let i = 0; i < str.length; i++) {
    if (obj[str[i]] !== min) res += str[i]
  }
  return res
}
```

:::

### 动态规划

#### 编辑距离 <Badge type="tip" text="困难" />

```js
const minDistance = (word1, word2) => {}

console.log(minDistance('horse', 'ros')) // 3

// word1 = "horse", word2 = "ros"
// 3
```

::: details 查看答案

```js
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
const minDistance = (word1, word2) => {
  const dp = new Array(word1.length + 1) // 共有word1.length + 1行
  for (let i = 0; i < dp.length; i++) {
    dp[i] = new Array(word2.length + 1).fill(0) // 共有 word2.length +1 列
  }

  // 初始化数组，word1前i个字符最少需要i次操作，比如i次删除变成word2
  for (let i = 1; i <= word1.length; i++) {
    dp[i][0] = i
  }

  // 初始化数组，word2前j个字符最少需要j次操作，比如j次插入变成word1
  for (let j = 1; j <= word2.length; j++) {
    dp[0][j] = j
  }

  // 循环word1和word2
  for (let i = 1; i <= word1.length; i++) {
    for (let j = 1; j <= word2.length; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        // 如果word1[i-1] === word2[j-1], 说明需要新增的字符相等，说明最后一个字符不用操作， 直接复用上一个字符的结果
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        // dp[i-1][j] + 1：对应删除
        // dp[i][j-1] + 1：对应新增
        // dp[i-1][j-1] + 1：对应替换操作
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
      }
    }
  }

  return dp[word1.length][word2.length]
}
```

:::

#### 最长回文子串

- 中心扩散法
- 两种情况
- 一种是回文子串长度为奇数（如aba，中心是b）
- 另一种回文子串长度为偶数（如abba，中心是b，b）

::: details 查看答案
::: code-group

```js [循环遍历字符串]
// 循环遍历字符串 对取到的每个值 都假设他可能成为最后的中心进行判断
/**
 * @param {string} s
 * @return {string}
 */
let longestPalindrome = function (s) {
  if (s.length < 2) {
    return s
  }
  let res = ''
  for (let i = 0; i < s.length; i++) {
    // 回文子串长度是奇数
    helper(i, i)
    // 回文子串长度是偶数
    helper(i, i + 1)
  }

  function helper(m, n) {
    // 从中心 扩散寻找相同字符
    // 相同的代表符合，继续扩散 查找相同的。
    while (m >= 0 && n < s.length && s[m] === s[n]) {
      m--
      n++
    }
    // 注意此处m,n的值循环完后  是恰好不满足循环条件的时刻
    // 此时m到n的距离为n-m+1，但是mn两个边界不能取 所以应该取m+1到n-1的区间  长度是n-m-1
    if (n - m - 1 > res.length) {
      // slice也要取[m+1,n-1]这个区间
      res = s.slice(m + 1, n)
    }
  }
  return res
}
```

```js [动态规划]
let longestPalindrome = function (s) {
  if (!s || s.length === 0) return ''
  let res = s[0]

  const dp = []

  // 倒着遍历简化操作， 这么做的原因是dp[i][..]依赖于dp[i + 1][..]
  for (let i = s.length - 1; i >= 0; i--) {
    dp[i] = []
    for (let j = i; j < s.length; j++) {
      // specail case就是一个字符（轴对称点是本身），或者两个字符（轴对称点是介于两者之间的虚拟点）
      if (j - i === 0) dp[i][j] = true
      // specail case 1
      else if (j - i === 1 && s[i] === s[j]) dp[i][j] = true
      // specail case 2
      else if (s[i] === s[j] && dp[i + 1][j - 1]) {
        // 这两个字符相等 并且轴对称
        // state transition
        dp[i][j] = true // 当前循环为回文 状态切成轴对称
      }

      if (dp[i][j] && j - i + 1 > res.length) {
        // update res
        res = s.slice(i, j + 1)
      }
    }
  }

  return res
}
```

:::

#### 括号生成

:::details 查看答案

```js
/**
 * @param {number} n
 * @return {string[]}
 */
//  树思想 回溯
let generateParenthesis = function (n) {
  let left = n // 左右分支的数量
  let right = n // 左右分支的数量
  let res = []
  if (n === 0) {
    return res
  }
  dfs('', left, right)
  function dfs(preStr, left, right) {
    // 当没有括号时 即回溯终止
    if (left === 0 && right === 0) {
      res.push(preStr)
      return
    }
    // 当成一颗深度为2n的树来做 每个括号在这棵树内都会都用到
    // 剪枝: 左括号可以使用的个数严格大于右括号可以使用的个数时 左侧已经准备使用该括号了
    if (left > right) {
      return
    }
    // 一次添加左侧一次添加右侧 回溯 凑成括号
    if (left > 0) {
      dfs(`${preStr}(`, left - 1, right)
    }
    if (right > 0) {
      dfs(`${preStr})`, left, right - 1)
    }
  }
  return res
}
```

:::

#### 买卖股票的最佳时机

::: details 查看答案
::: code-group

```js [动态规划1]
/**
 * 动态规划
 * @param {number[]} prices
 * @return {number}
 */
let maxProfit = function (prices) {
  let min = prices[0]
  const dp = [0]
  for (let i = 1; i < prices.length; i++) {
    min = Math.min(min, prices[i]) // 更新目前的最小股票
    dp[i] = Math.max(dp[i - 1], prices[i] - min) // 之前的最大价值与当天对比，更新最多获得多少钱
  }
  return dp[prices.length - 1]
}
```

```js [动态规划2]
/**
 * 设置一个最大利润, 不断更新最大利润
 * 动态规划
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let max = 0
  let start = prices[0] // 股票最小值
  for (let i = 1; i < prices.length; i++) {
    const end = prices[i] // 当天价格
    let count = end - start // 利润
    max = Math.max(count, max) // 利润比较大 则更新利润
    start = Math.min(start, end) // 更新股票最小值 保证最低买入 最低买入 不等于卖出
  }
  return max
}
```

:::

#### 爬楼梯

::: details 查看答案
::: code-group

```js [方法1]
/**
 * @param {number} n
 * @return {number}
 */
let climbStairs = function (n) {
  let dp = [0, 1, 2] // 初始0 1 2 个台阶没有规律
  // 从第三个开始有规律
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
}
```

```js [动态规划]
// 动态规划 变量交换
let climbStairs = function (n) {
  let pre = 0
  let next = 1 // 初始值
  // 每次循环算出 当次循环的值
  for (let i = 0; i < n; i++) {
    ;[next, pre] = [next + pre, next]
  }
  return next
}
```

```js [递归]
// 递归
const climbStairs = function (n) {
  function item(n) {
    // 递归退出条件
    if (n === 1) return 1
    if (n === 2) return 2
    return item(n - 1) + item(n - 2) // 将递归到1个楼梯和两个楼梯 最后反推到n个楼梯
  }
  return item(n)
}
```

:::

### 贪心

贪心算法是解决最优化问题的一种策略，它选择局部最优解，然后逐步构建全局最优解。
贪心算法的优点是简单，容易理解，缺点是可能无法找到全局最优解，并且可能存在局部最优解，但无法找到全局最优解的情况。
贪心算法的步骤如下：

1. 确定问题：确定问题的要求和限制。
2. 确定解空间：确定解空间的定义和范围。
3. 确定搜索策略：确定搜索策略，如深度优先搜索、广度优先搜索、回溯搜索等。
4. 确定搜索条件：确定搜索条件，如搜索深度、搜索宽度、搜索次数等。
5. 确定搜索算法：确定搜索算法，如递归、循环等。
6. 确定搜索结果：确定搜索结果，如搜索到的解、搜索到的路径、搜索到的路径长度等。

#### 跳跃游戏

::: details 查看答案
::: code-group

```js [贪心]
let canJump = function (nums) {
  let max = 0
  for (let i = 0; i < nums.length; i++) {
    if (i > max) return false // 最远距离不能到达当前位置
    max = Math.max(max, i + nums[i]) //  更新最远距离
    if (max >= nums.length - 1) return true // 大于等于最远位置 即成功
  }
}
```

```js [其他]
var canJump = function (nums) {
  let canJumpMax = 0 // 新的最远距离 当前遍历
  let last_canJumpMax = 0 // 当前最远距离
  let len = nums.length
  for (let i = 0; i < len; i++) {
    // 获取新的最远距离 以备到达最远距离后更新
    canJumpMax = Math.max(canJumpMax, i + nums[i])
    if (last_canJumpMax === i) {
      // 到达当前最远距离
      // 更新能到达的最远距离
      last_canJumpMax = canJumpMax
    } else if (last_canJumpMax < i) {
      // 超出能到达的最远距离 false
      return false
    }
  }
  return true
}
```

:::

#### 跳跃游戏 II

::: details 查看答案
::: code-group

```js [贪心]
// 贪心 找边界
function jump(nums) {
  let step = 0 // 步数
  let end = 0 // 边界 当次跳越最远位置  到达边界 + 1 必须要多跳一次
  let maxPosition = 0 // 当前这次能跳多远
  for (let i = 0; i < nums.length - 1; i++) {
    // i === 当前跳跃所处位置 nums[i] + i 这次位置能跳多远
    // maxPosition 当前这次能跳多远
    // 如果nums[i]+i比较大 则更新最远距离 但是边界不变
    // 更新最远距离
    maxPosition = Math.max(maxPosition, nums[i] + i)
    // 遇到边界 增加跳跃 更新边界为当前跳跃的最远距离
    if (i === end) {
      end = maxPosition // 更新边界
      step++ // 更新步数 第一次就+1了 后续结尾不用加
    }
  }
  return step
}
```

```js [动态规划]
function jump(nums) {
  let dp = [0] // 第一步是0
  let n = nums.length
  let maxPosition = 0 // 当前最远距离
  let maxPositionPre = 0 // 上次最远距离
  for (let i = 0; i < n; i++) {
    if (nums[i] + i > maxPosition) {
      maxPositionPre = maxPosition // 更新上次最远距离
      maxPosition = nums[i] + i // 当前最远距离
      // 从上次最远距离+1步开始跳
      for (let j = maxPositionPre + 1; j <= maxPosition; j++) {
        dp[j] = dp[i] + 1 // 每步都比上次最远距离大一步
        if (j === n - 1) return dp[j] // 遇到终点
      }
    }
  }
  return dp[n - 1] // 终点
}
```

```js [其他]
function jump(nums) {
  let num = nums[0] // 初始能跳的步数
  if (nums.length === 1) return 0
  let total = 0 // 总共跳几次
  let everOne = [num] // 每次经过的地方
  function jumpOne(newNums, oneNum) {
    let maxNum = 0 // 最远能跳多远
    let maxIndex = oneNum // 最大值
    if (oneNum + 1 >= newNums.length) {
      // 步数已经足够到达最后一个位置
      maxIndex = newNums.length - 1
    } else {
      // 每个点都跳一遍
      for (let i = 1; i <= oneNum; i++) {
        // 当前已跳步数大于 之前缓存的最大步数 即为最优解
        if (i + newNums[i] >= maxNum) {
          maxNum = newNums[i] + i // 最远能跳多远
          maxIndex = i // 最远跳的目标位置
        }
      }
    }
    total++ // 当前跳跃次数
    everOne.push(newNums[maxIndex]) // 每次到达的位置
    if (maxIndex !== newNums.length - 1) {
      newNums.splice(0, maxIndex) // 清除已跳的元素
      jumpOne(newNums, newNums[0])
    }
  }
  jumpOne(nums, num)
  return total
}
```

:::

## 场景设计

### 虚拟列表原理

当需要展示大量数据时，传统的列表渲染方式会导致性能问题，因为它需要同时渲染所有的数据项，无论它们是否可见。虚拟列表（Virtual List）通过只渲染可见区域内的数据项来解决这个问题，从而提高性能。

**虚拟列表的原理：**

1. **确定可见区域：** 首先确定列表容器的高度以及可见区域的起始和结束位置。
2. **计算可见数据项：** 根据可见区域的位置和每个数据项的高度，计算出当前可见的数据项范围。
3. **渲染可见数据项：** 只渲染可见数据项，不渲染不可见的数据项，从而减少渲染的数量。

**实现思路：**

1. **计算可见区域：** 监听列表容器的滚动事件，根据滚动位置和容器高度计算可见区域的起始和结束位置。
2. **计算可见数据项：** 根据可见区域的起始和结束位置以及每个数据项的高度，计算出当前可见的数据项范围。
3. **渲染可见数据项：** 根据计算出的可见数据项范围，只渲染这些数据项。

**示例代码（伪代码）：**

HTML结构

```html
<div class="list-container" style="height: 500px; overflow-y: auto;">
  <div class="virtual-list" style="height: 10000px;">
    <!-- 这里是虚拟列表的内容，高度为所有数据项高度之和 -->
  </div>
</div>
```

JavaScript实现

```javascript
const listContainer = document.querySelector('.list-container')
const virtualList = document.querySelector('.virtual-list')

listContainer.addEventListener('scroll', function () {
  const containerHeight = listContainer.clientHeight
  const scrollPosition = listContainer.scrollTop
  const totalHeight = virtualList.clientHeight

  const startIndex = Math.floor(scrollPosition / itemHeight)
  const endIndex = Math.min(Math.ceil((scrollPosition + containerHeight) / itemHeight), totalItems)

  // 渲染可见数据项
  renderItems(startIndex, endIndex)
})

function renderItems(startIndex, endIndex) {
  for (let i = startIndex; i < endIndex; i++) {
    // 根据索引渲染数据项
  }
}
```

这只是一个简单的示例，实际实现中需要考虑更多细节，如数据项的高度可能不一致、滚动性能优化等。

### 前端接口防刷策略

前端接口防刷是为了防止恶意用户通过自动化工具频繁请求接口，从而造成服务器压力过大或者影响正常用户的访问体验。以下是一些常见的前端接口防刷策略：

1. **限制请求频率：** 设置一个最大请求频率，例如每秒钟最多允许发起多少次请求，超过这个频率的请求被拒绝。可以通过在前端代码中使用计时器控制请求发送的频率。

2. **验证码验证：** 对于一些敏感操作或者频繁请求的接口，可以要求用户输入验证码才能继续操作，这样可以有效防止自动化工具的攻击。

3. **用户行为分析：** 分析用户的行为模式，如果发现某个用户的请求模式异常，可以暂时限制其访问或者要求进行人机验证。

4. **IP限制：** 对于同一个IP地址，限制其单位时间内的请求次数，避免同一IP地址过多请求接口。

5. **接口访问权限控制：** 对于一些敏感接口，可以设置访问权限，只允许特定用户或者特定条件下的用户访问。

6. **使用Token验证：** 使用Token来验证用户的身份和权限，对于非法或者过期的Token拒绝访问。

7. **持久化存储请求记录：** 对于频繁请求的接口，可以将请求记录持久化存储，对于超过一定频率的请求进行阻止。

8. **利用CDN缓存：** 使用CDN缓存可以减轻服务器的压力，提高接口的访问速度。

这些策略可以单独使用，也可以结合使用，根据实际情况选择合适的策略来保护接口免受恶意攻击。
