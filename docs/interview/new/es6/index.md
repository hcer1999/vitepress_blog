## 1. common.js和es6中模块引入的区别？

**参考答案：**

CommonJS 和 ES6 模块系统在语法和行为上有显著的区别：

CommonJS &#x20;

CommonJS 是一种模块系统，主要用于 Node.js 环境。它使用 `require` 函数来引入模块，并使用 `module.exports` 来导出模块。

语法

- 导出模块：

```javascript
// moduleA.js
const name = 'John'
module.exports = name

// 或者导出一个对象
const person = { name: 'John', age: 30 }
module.exports = person
```

- 引入模块：

```javascript
// main.js
const name = require('./moduleA')
console.log(name) // 'John'

// 引入对象
const person = require('./moduleA')
console.log(person.name) // 'John'
console.log(person.age) // 30
```

特点

1. 动态引入： `require` 可以在函数体内、条件语句中动态引入模块。

```javascript
if (condition) {
  const moduleA = require('./moduleA')
}
```

2.同步加载： `require` 是同步的，模块在执行 `require` 时会立即加载并返回结果。

3. 导出的是值的拷贝： 但对于对象和数组等引用类型，修改引用类型的属性会在所有引用中反映出来。

```javascript
const obj = require('./moduleA')
obj.newProp = 'new'
console.log(require('./moduleA').newProp) // 'new'
```

ES6 模块

ES6 模块系统是 ECMAScript 标准的一部分，使用 `import` 和 `export` 语法来定义模块，广泛用于现代前端开发以及一些支持 ES6 的服务器环境。

语法

- 导出模块：

```javascript
// moduleA.js
export const name = 'John'

// 导出默认值
const person = { name: 'John', age: 30 }
export default person
```

引入模块:

```javascript
// main.js
import { name } from './moduleA'
console.log(name) // 'John'

// 引入默认导出
import person from './moduleA'
console.log(person.name) // 'John'
console.log(person.age) // 30
```

特点

1. 静态引入： `import` 必须在文件的顶部声明，不能在函数体内或条件语句中使用。这使得 ES6 模块可以在编译时确定依赖关系和优化。

```javascript
// 错误的用法
if (condition) {
  import { name } from './moduleA'
}
```

- 异步加载： 浏览器中的 ES6 模块是异步加载的，这意味着它们不会阻塞页面的其他加载过程。

- 导出的是值的引用： 导出值的引用意味着当导出模块中的值发生变化时，所有引用该值的地方都会反映出这些变化。

```javascript
// moduleA.js
export let count = 1
setTimeout(() => {
  count += 1
}, 1000)

// main.js
import { count } from './moduleA'
setTimeout(() => {
  console.log(count)
}, 2000) // 2
```

兼容性和转换

- CommonJS 和 ES6 模块的互操作性： 在 Node.js 环境中，可以使用工具如 Babel 或 Webpack 将 ES6 模块转换为 CommonJS 模块，从而实现兼容性。

- 双向兼容： 使用工具链（如 Babel、Webpack）可以同时支持 CommonJS 和 ES6 模块语法，并在构建过程中根据目标环境进行转换。

总结

- 语法区别： CommonJS 使用 `require` 和 `module.exports`，而 ES6 模块使用 `import` 和 `export`。

- 加载方式： CommonJS 是同步加载，ES6 模块是静态分析和异步加载。

- 使用场景： CommonJS 主要用于 Node.js 环境，而 ES6 模块是 ECMAScript 标准的一部分，更适合现代前端开发。

选择使用哪种模块系统取决于项目需求和运行环境。对于现代前端开发，推荐使用 ES6 模块。对于 Node.js 项目，传统上使用 CommonJS，但也可以逐渐迁移到 ES6 模块。

---

## 2. Map 和 Set 的用法以及区别

**参考答案：**

首先了解一下 Map

Map 是一组键值对的结构，和 JSON 对象类似。

(1) Map数据结构如下

这里我们可以看到的是Map的数据结构是一个键值对的结构

![](<images/13. ES6（32题）-image-7.png>)

(2) key 不仅可以是字符串还可以是对象

```plaintext
var obj ={name:"小如",age:9}
let map = new Map()
map.set(obj,"111")
```

打印结果如下

![](<images/13. ES6（32题）-image-3.png>)

(3) Map常用语法如下

```plaintext
//初始化
Map
需要一个二维数组(请看 Map 数据结构)，或者直接初始化一个空
Map

let map = new Map();
//添加key和value值
map.set('Amy','女')
map.set('liuQi','男')
//是否存在key，存在返回true,反之为false
map.has('Amy') //true
map.has('amy') //false
//根据key获取value
map.get('Amy') //女
//删除 key为Amy的value
map.delete('Amy')
map.get('Amy') //undefined  删除成功
```

(4) 一个key只能对应一个value，多次对一个key放入value，后面的值会把前面的值覆盖掉

```plaintext
var map =new Map
map.set('Amy',"女")
map.set('Amy',"男")
console.log(map)
```

打印结果如下

![](<images/13. ES6（32题）-image-1.png>)

再来了解一下 Set

Set 对象类似于数组，且成员的值都是唯一的

(1) 打印出的数据结构如下

这里打印出来是一个对象

![](<images/13. ES6（32题）-image-6.png>)

(2)最常用来去重使用，去重方法有很多但是都没有它运行的快。

```plaintext
var arr=[1,3,4,2,5,1,4]
// 这里原本是一个对象用了es6的语法 转化成了数组，就是转化数组之前已经过滤掉了重复的元素了
var arr2=[...new Set(arr)] //[1,3,4,2,5]
```

(3) Set常用语法如下

```plaintext
//初始化一个Set ，需要一个Array数组，要么空Set
var set = new Set([1,2,3,5,6])
console.log(set)  // {1, 2, 3, 5, 6}
//添加元素到Set中
set.add(7) //{1, 2, 3, 5, 6, 7}
//删除Set中的元素
set.delete(3) // {1, 2, 5, 6, 7}
//检测是否含有此元素，有为true，没有则为false
set.has(2) //true
```

总结Map和Set的区别

(1) 这两种方法具有极快的查找速度;那么下面我们来对比一下Map，Set，Array 的执行时间

```plaintext
//首先初始化数据
var lng=100
var arr =new Array(lng).fill(2)
var set =new Set(arr)
let map =new Map()
for(var i=0;i<lng;i++){
arr[i]=i
map.set(i,arr[i])
}
// Array
console.time()
for(var j=0;j<lng;j++){
arr.includes(j)
}
console.timeEnd()  //default: 0.01220703125 ms
// Set
console.time()
for(var j=0;j<lng;j++){
set.has(j)
}
console.timeEnd()  // default: 0.005859375 ms
// Map
console.time()
for(var j=0;j<lng;j++){
map.has(j)
}
console.timeEnd()
// default: 0.007080078125 ms
```

通过以上几种方法我们可以看到，Set执行时间最短，那么查找速度最快，当然了Set 和 Map的查找速度都很快想差不大，所以说这两种方法具有极快的查找速度。

(2) 初始化需要的值不一样，Map需要的是一个二维数组，而Set 需要的是一维 Array 数组

(3) Map 和 Set 都不允许键重复

(4) Map的键是不能修改，但是键对应的值是可以修改的；Set不能通过迭代器来改变Set的值，因为Set的值就是键。

(5) Map 是键值对的存在，值也不作为健；而 Set 没有 value 只有 key，value 就是 key；

---

## 3. es5 中的类和es6中的class有什么区别？

**参考答案：**

在es5中主要是通过构造函数方式和原型方式来定义一个类，在es6中我们可以通过class来定义类。

一、class类必须new调用，不能直接执行。

![](<images/13. ES6（32题）-image.png>)

class类执行的话会报错，而es5中的类和普通函数并没有本质区别，执行肯定是ok的。

二、class类不存在变量提升

![](<images/13. ES6（32题）-image-5.png>)

![](<images/13. ES6（32题）-image-2.png>)

图2报错，说明class方式没有把类的定义提升到顶部。

三、class类无法遍历它实例原型链上的属性和方法

```javascript
function Foo(color) {
  this.color = color
}
Foo.prototype.like = function () {
  console.log(`like${this.color}`)
}
let foo = new Foo()

for (let key in foo) {
  // 原型上的like也被打印出来了
  console.log(key) // color、like
}
```

```javascript
class Foo {
  constructor(color) {
    this.color = color
  }
  like() {
    console.log(`like${this.color}`)
  }
}
let foo = new Foo('red')

for (let key in foo) {
  // 只打印一个color,没有打印原型链上的like
  console.log(key) // color
}
```

四、new.target属性

es6为new命令引入了一个new.target属性，它会返回new命令作用于的那个构造函数。如果不是通过new调用或Reflect.construct()调用的，new.target会返回undefined

```javascript
function Person(name) {
  if (new.target === Person) {
    this.name = name
  } else {
    throw new Error('必须使用 new 命令生成实例')
  }
}

let obj = {}
Person.call(obj, 'red') // 此时使用非new的调用方式就会报错
```

五、class类有static静态方法

static静态方法只能通过类调用，不会出现在实例上；另外如果静态方法包含 this 关键字，这个 this 指的是类，而不是实例。static声明的静态属性和方法都不可以被子类继承。

```javascript
class Foo {
  static bar() {
    this.baz() // 此处的this指向类
  }
  static baz() {
    console.log('hello') // 不会出现在实例中
  }
  baz() {
    console.log('world')
  }
}

Foo.bar() // hello
```

---

## 4. 你是怎么理解ES6中 Decorator 的？使用场景有哪些？

**参考答案：**

一、介绍

Decorator，即装饰器，从名字上很容易让我们联想到装饰者模式

简单来讲，装饰者模式就是一种在不改变原类和使用继承的情况下，动态地扩展对象功能的设计理论。

`ES6`中`Decorator`功能亦如此，其本质也不是什么高大上的结构，就是一个普通的函数，用于扩展类属性和类方法

这里定义一个士兵，这时候他什么装备都没有

```javascript
class soldier {}
```

定义一个得到 AK 装备的函数，即装饰器

```javascript
function strong(target) {
  target.AK = true
}
```

使用该装饰器对士兵进行增强

```javascript
@strong
class soldier {}
```

这时候士兵就有武器了

```javascript
soldier.AK // true
```

上述代码虽然简单，但也能够清晰看到了使用`Decorator`两大优点：

- 代码可读性变强了，装饰器命名相当于一个注释

- 在不改变原有代码情况下，对原来功能进行扩展

二、用法

`Docorator`修饰对象为下面两种：

- 类的装饰

- 类属性的装饰

类的装饰

当对类本身进行装饰的时候，能够接受一个参数，即类本身

将装饰器行为进行分解，大家能够有个更深入的了解

```javascript
@decorator
class A {}

// 等同于

class A {}
A = decorator(A) || A
```

下面`@testable`就是一个装饰器，`target`就是传入的类，即`MyTestableClass`，实现了为类添加静态属性

```javascript
@testable
class MyTestableClass {
  // ...
}

function testable(target) {
  target.isTestable = true
}

MyTestableClass.isTestable // true
```

如果想要传递参数，可以在装饰器外层再封装一层函数

```javascript
function testable(isTestable) {
  return function (target) {
    target.isTestable = isTestable
  }
}

@testable(true)
class MyTestableClass {}
MyTestableClass.isTestable // true

@testable(false)
class MyClass {}
MyClass.isTestable // false
```

类属性的装饰

当对类属性进行装饰的时候，能够接受三个参数：

- 类的原型对象

- 需要装饰的属性名

- 装饰属性名的描述对象

首先定义一个`readonly`装饰器

```javascript
function readonly(target, name, descriptor) {
  descriptor.writable = false // 将可写属性设为false
  return descriptor
}
```

使用`readonly`装饰类的`name`方法

```javascript
class Person {
  @readonly
  name() {
    return `${this.first} ${this.last}`
  }
}
```

相当于以下调用

```javascript
readonly(Person.prototype, 'name', descriptor)
```

如果一个方法有多个装饰器，就像洋葱一样，先从外到内进入，再由内到外执行

```javascript
function dec(id) {
  console.log('evaluated', id)
  return (target, property, descriptor) => console.log('executed', id)
}

class Example {
  @dec(1)
  @dec(2)
  method() {}
}
// evaluated 1
// evaluated 2
// executed 2
// executed 1
```

外层装饰器`@dec(1)`先进入，但是内层装饰器`@dec(2)`先执行

注意

装饰器不能用于修饰函数，因为函数存在变量声明情况

```javascript
var counter = 0;

var add = function () {
  counter++;
};

@add
function foo() {
}
```

编译阶段，变成下面

```javascript
var counter;
var add;

@add
function foo() {
}

counter = 0;

add = function () {
  counter++;
};
```

意图是执行后`counter`等于 1，但是实际上结果是`counter`等于 0

三、使用场景

基于`Decorator`强大的作用，我们能够完成各种场景的需求，下面简单列举几种：

使用`react-redux`的时候，如果写成下面这种形式，既不雅观也很麻烦

```javascript
class MyReactComponent extends React.Component {}

export default connect(mapStateToProps, mapDispatchToProps)(MyReactComponent)
```

通过装饰器就变得简洁多了

```javascript
@connect(mapStateToProps, mapDispatchToProps)
export default class MyReactComponent extends React.Component {}
```

将`mixins`，也可以写成装饰器，让使用更为简洁了

```javascript
function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list)
  }
}

// 使用
const Foo = {
  foo() {
    console.log('foo')
  },
}

@mixins(Foo)
class MyClass {}

let obj = new MyClass()
obj.foo() // "foo"
```

下面再讲讲`core-decorators.js`几个常见的装饰器

@antobind

`autobind`装饰器使得方法中的`this`对象，绑定原始对象

```javascript
import { autobind } from 'core-decorators'

class Person {
  @autobind
  getPerson() {
    return this
  }
}

let person = new Person()
let getPerson = person.getPerson

getPerson() === person
// true
```

@readonly

`readonly`装饰器使得属性或方法不可写

```javascript
import { readonly } from 'core-decorators'

class Meal {
  @readonly
  entree = 'steak'
}

var dinner = new Meal()
dinner.entree = 'salmon'
// Cannot assign to read only property 'entree' of [object Object]
```

@deprecate

`deprecate`或`deprecated`装饰器在控制台显示一条警告，表示该方法将废除

```javascript
import { deprecate } from 'core-decorators'

class Person {
  @deprecate
  facepalm() {}

  @deprecate('功能废除了')
  facepalmHard() {}
}

let person = new Person()

person.facepalm()
// DEPRECATION Person#facepalm: This function will be removed in future versions.

person.facepalmHard()
// DEPRECATION Person#facepalmHard: 功能废除了
```

---

## 5. 你是怎么理解ES6中Module的？使用场景有哪些？

**参考答案：**

一、介绍

模块，（Module），是能够单独命名并独立地完成一定功能的程序语句的集合（即程序代码和数据结构的集合体）。

两个基本的特征：外部特征和内部特征

- 外部特征是指模块跟外部环境联系的接口（即其他模块或程序调用该模块的方式，包括有输入输出参数、引用的全局变量）和模块的功能

- 内部特征是指模块的内部环境具有的特点（即该模块的局部数据和程序代码）

为什么需要模块化

- 代码抽象

- 代码封装

- 代码复用

- 依赖管理

如果没有模块化，我们代码会怎样？

- 变量和方法不容易维护，容易污染全局作用域

- 加载资源的方式通过script标签从上到下。

- 依赖的环境主观逻辑偏重，代码较多就会比较复杂。

- 大型项目资源难以维护，特别是多人合作的情况下，资源的引入会让人奔溃

因此，需要一种将`JavaScript`程序模块化的机制，如

- CommonJs (典型代表：node.js早期)

- AMD (典型代表：require.js)

- CMD (典型代表：sea.js)

AMD

`Asynchronous ModuleDefinition`（AMD），异步模块定义，采用异步方式加载模块。所有依赖模块的语句，都定义在一个回调函数中，等到模块加载完成之后，这个回调函数才会运行

代表库为`require.js`

```javascript
/** main.js 入口文件/主模块 **/
// 首先用config()指定各模块路径和引用名
require.config({
  baseUrl: 'js/lib',
  paths: {
    jquery: 'jquery.min', //实际路径为js/lib/jquery.min.js
    underscore: 'underscore.min',
  },
})
// 执行基本操作
require(['jquery', 'underscore'], function ($, _) {
  // some code here
})
```

CommonJs

`CommonJS` 是一套 `Javascript` 模块规范，用于服务端

```javascript
// a.js
module.exports = { foo, bar }

// b.js
const { foo, bar } = require('./a.js')
```

其有如下特点：

- 所有代码都运行在模块作用域，不会污染全局作用域

- 模块是同步加载的，即只有加载完成，才能执行后面的操作

- 模块在首次执行后就会缓存，再次加载只返回缓存结果，如果想要再次执行，可清除缓存

- `require`返回的值是被输出的值的拷贝，模块内部的变化也不会影响这个值

既然存在了`AMD`以及`CommonJs`机制，`ES6`的`Module`又有什么不一样？

ES6 在语言标准的层面上，实现了`Module`，即模块功能，完全可以取代 `CommonJS `和 `AMD `规范，成为浏览器和服务器通用的模块解决方案

`CommonJS` 和` AMD` 模块，都只能在运行时确定这些东西。比如，`CommonJS `模块就是对象，输入时必须查找对象属性

```javascript
// CommonJS模块
let { stat, exists, readfile } = require('fs')

// 等同于
let _fs = require('fs')
let stat = _fs.stat
let exists = _fs.exists
let readfile = _fs.readfile
```

`ES6`设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量

```javascript
// ES6模块
import { stat, exists, readFile } from 'fs'
```

上述代码，只加载3个方法，其他方法不加载，即 `ES6` 可以在编译时就完成模块加载

由于编译加载，使得静态分析成为可能。包括现在流行的`typeScript`也是依靠静态分析实现功能

二、使用

`ES6`模块内部自动采用了严格模式，这里就不展开严格模式的限制，毕竟这是`ES5`之前就已经规定好

模块功能主要由两个命令构成：

- `export`：用于规定模块的对外接口

- `import`：用于输入其他模块提供的功能

export

一个模块就是一个独立的文件，该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用`export`关键字输出该变量

```javascript
// profile.js
export var firstName = 'Michael'
export var lastName = 'Jackson'
export var year = 1958

或
// 建议使用下面写法，这样能瞬间确定输出了哪些变量
var firstName = 'Michael'
var lastName = 'Jackson'
var year = 1958

export { firstName, lastName, year }
```

输出函数或类

```javascript
export function multiply(x, y) {
  return x * y
}
```

通过`as`可以进行输出变量的重命名

```javascript
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
```

import

使用`export`命令定义了模块的对外接口以后，其他 JS 文件就可以通过`import`命令加载这个模块

```javascript
// main.js
import { firstName, lastName, year } from './profile.js'

function setName(element) {
  element.textContent = firstName + ' ' + lastName
}
```

同样如果想要输入变量起别名，通过`as`关键字

```javascript
import { lastName as surname } from './profile.js'
```

当加载整个模块的时候，需要用到星号`*`

```javascript
// circle.js
export function area(radius) {
  return Math.PI * radius * radius
}

export function circumference(radius) {
  return 2 * Math.PI * radius
}

// main.js
import * as circle from './circle'
console.log(circle) // {area:area,circumference:circumference}
```

输入的变量都是只读的，不允许修改，但是如果是对象，允许修改属性

```javascript
import { a } from './xxx.js'

a.foo = 'hello' // 合法操作
a = {} // Syntax Error : 'a' is read-only;
```

不过建议即使能修改，但我们不建议。因为修改之后，我们很难差错

`import`后面我们常接着`from`关键字，`from`指定模块文件的位置，可以是相对路径，也可以是绝对路径

```javascript
import { a } from './a'
```

如果只有一个模块名，需要有配置文件，告诉引擎模块的位置

```javascript
import { myMethod } from 'util'
```

在编译阶段，`import`会提升到整个模块的头部，首先执行

```javascript
foo()

import { foo } from 'my_module'
```

多次重复执行同样的导入，只会执行一次

```javascript
import 'lodash'
import 'lodash'
```

上面的情况，大家都能看到用户在导入模块的时候，需要知道加载的变量名和函数，否则无法加载

如果不需要知道变量名或函数就完成加载，就要用到`export default`命令，为模块指定默认输出

```javascript
// export-default.js
export default function () {
  console.log('foo')
}
```

加载该模块的时候，`import`命令可以为该函数指定任意名字

```javascript
// import-default.js
import customName from './export-default'
customName() // 'foo'
```

动态加载

允许您仅在需要时动态加载模块，而不必预先加载所有模块，这存在明显的性能优势

这个新功能允许您将`import()`作为函数调用，将其作为参数传递给模块的路径。 它返回一个 `promise`，它用一个模块对象来实现，让你可以访问该对象的导出

```javascript
import('/modules/myModule.mjs').then((module) => {
  // Do something with the module.
})
```

复合写法

如果在一个模块之中，先输入后输出同一个模块，`import`语句可以与`export`语句写在一起

```javascript
export { foo, bar } from 'my_module'

// 可以简单理解为
import { foo, bar } from 'my_module'
export { foo, bar }
```

同理能够搭配`as`、`*`搭配使用

三、使用场景

如今，`ES6`模块化已经深入我们日常项目开发中，像`vue`、`react`项目搭建项目，组件化开发处处可见，其也是依赖模块化实现

`vue`组件

```javascript
<template>
  <div class="App">
      组件化开发 ---- 模块化
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>
```

`react`组件

```javascript
function App() {
  return <div className="App">组件化开发 ---- 模块化</div>
}

export default App
```

包括完成一些复杂应用的时候，我们也可以拆分成各个模块

---

## 6. 你是怎么理解ES6中Proxy的？使用场景有哪些?

**参考答案：**

一、介绍

定义： 用于定义基本操作的自定义行为

本质： 修改的是程序默认形为，就形同于在编程语言层面上做修改，属于元编程`(meta programming)`

元编程（Metaprogramming，又译超编程，是指某类计算机程序的编写，这类计算机程序编写或者操纵其它程序（或者自身）作为它们的数据，或者在运行时完成部分本应在编译时完成的工作

一段代码来理解

```javascript
#!/bin/bash
# metaprogram
echo '#!/bin/bash' >program
for ((I=1; I<=1024; I++)) do
    echo "echo $I" >>program
done
chmod +x program
```

这段程序每执行一次能帮我们生成一个名为`program`的文件，文件内容为1024行`echo`，如果我们手动来写1024行代码，效率显然低效

- 元编程优点：与手工编写全部代码相比，程序员可以获得更高的工作效率，或者给与程序更大的灵活度去处理新的情形而无需重新编译

`Proxy` 亦是如此，用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）

二、用法

`Proxy`为 构造函数，用来生成 `Proxy `实例

```javascript
var proxy = new Proxy(target, handler)
```

**参数**

`target`表示所要拦截的目标对象（任何类型的对象，包括原生数组，函数，甚至另一个代理））

`handler`通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 `p` 的行为

**handler解析**

关于`handler`拦截属性，有如下：

- get(target,propKey,receiver)：拦截对象属性的读取

- set(target,propKey,value,receiver)：拦截对象属性的设置

- has(target,propKey)：拦截`propKey in proxy`的操作，返回一个布尔值

- deleteProperty(target,propKey)：拦截`delete proxy[propKey]`的操作，返回一个布尔值

- ownKeys(target)：拦截`Object.keys(proxy)`、`for...in`等循环，返回一个数组

- getOwnPropertyDescriptor(target, propKey)：拦截`Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象

- defineProperty(target, propKey, propDesc)：拦截`Object.defineProperty(proxy, propKey, propDesc）`，返回一个布尔值

- preventExtensions(target)：拦截`Object.preventExtensions(proxy)`，返回一个布尔值

- getPrototypeOf(target)：拦截`Object.getPrototypeOf(proxy)`，返回一个对象

- isExtensible(target)：拦截`Object.isExtensible(proxy)`，返回一个布尔值

- setPrototypeOf(target, proto)：拦截`Object.setPrototypeOf(proxy, proto)`，返回一个布尔值

- apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作

- construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作

**Reflect**

若需要在`Proxy`内部调用对象的默认行为，建议使用`Reflect`，其是`ES6`中操作对象而提供的新 `API`

基本特点：

- 只要`Proxy`对象具有的代理方法，`Reflect`对象全部具有，以静态方法的形式存在

- 修改某些`Object`方法的返回结果，让其变得更合理（定义不存在属性行为的时候不报错而是返回`false`）

- 让`Object`操作都变成函数行为

下面我们介绍`proxy`几种用法：

**get()**

`get`接受三个参数，依次为目标对象、属性名和 `proxy` 实例本身，最后一个参数可选

```javascript
var person = {
  name: '张三',
}

var proxy = new Proxy(person, {
  get: function (target, propKey) {
    return Reflect.get(target, propKey)
  },
})

proxy.name // "张三"
```

`get`能够对数组增删改查进行拦截，下面是试下你数组读取负数的索引

```javascript
function createArray(...elements) {
  let handler = {
    get(target, propKey, receiver) {
      let index = Number(propKey)
      if (index < 0) {
        propKey = String(target.length + index)
      }
      return Reflect.get(target, propKey, receiver)
    },
  }

  let target = []
  target.push(...elements)
  return new Proxy(target, handler)
}

let arr = createArray('a', 'b', 'c')
arr[-1] // c
```

注意：如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则会报错

```javascript
const target = Object.defineProperties(
  {},
  {
    foo: {
      value: 123,
      writable: false,
      configurable: false,
    },
  },
)

const handler = {
  get(target, propKey) {
    return 'abc'
  },
}

const proxy = new Proxy(target, handler)

proxy.foo
// TypeError: Invariant check failed
```

**set()**

`set`方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 `Proxy` 实例本身

假定`Person`对象有一个`age`属性，该属性应该是一个不大于 200 的整数，那么可以使用`Proxy`保证`age`的属性值符合要求

```javascript
let validator = {
  set: function (obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer')
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid')
      }
    }

    // 对于满足条件的 age 属性以及其他属性，直接保存
    obj[prop] = value
  },
}

let person = new Proxy({}, validator)

person.age = 100

person.age // 100
person.age = 'young' // 报错
person.age = 300 // 报错
```

如果目标对象自身的某个属性，不可写且不可配置，那么`set`方法将不起作用

```javascript
const obj = {}
Object.defineProperty(obj, 'foo', {
  value: 'bar',
  writable: false,
})

const handler = {
  set: function (obj, prop, value, receiver) {
    obj[prop] = 'baz'
  },
}

const proxy = new Proxy(obj, handler)
proxy.foo = 'baz'
proxy.foo // "bar"
```

注意，严格模式下，`set`代理如果没有返回`true`，就会报错

```javascript
'use strict'
const handler = {
  set: function (obj, prop, value, receiver) {
    obj[prop] = receiver
    // 无论有没有下面这一行，都会报错
    return false
  },
}
const proxy = new Proxy({}, handler)
proxy.foo = 'bar'
// TypeError: 'set' on proxy: trap returned falsish for property 'foo'
```

**deleteProperty()**

`deleteProperty`方法用于拦截`delete`操作，如果这个方法抛出错误或者返回`false`，当前属性就无法被`delete`命令删除

```javascript
var handler = {
  deleteProperty(target, key) {
    invariant(key, 'delete')
    Reflect.deleteProperty(target, key)
    return true
  },
}
function invariant(key, action) {
  if (key[0] === '_') {
    throw new Error(`无法删除私有属性`)
  }
}

var target = { _prop: 'foo' }
var proxy = new Proxy(target, handler)
delete proxy._prop
// Error: 无法删除私有属性
```

注意，目标对象自身的不可配置（configurable）的属性，不能被`deleteProperty`方法删除，否则报错

**取消代理**

```plaintext
Proxy.revocable(target, handler);
```

**三、使用场景**

`Proxy`其功能非常类似于设计模式中的代理模式，常用功能如下：

- 拦截和监视外部对对象的访问

- 降低函数或类的复杂度

- 在复杂操作前对操作进行校验或对所需资源进行管理

使用 `Proxy` 保障数据类型的准确性

```javascript
let numericDataStore = { count: 0, amount: 1234, total: 14 }
numericDataStore = new Proxy(numericDataStore, {
  set(target, key, value, proxy) {
    if (typeof value !== 'number') {
      throw Error('属性只能是number类型')
    }
    return Reflect.set(target, key, value, proxy)
  },
})

numericDataStore.count = 'foo'
// Error: 属性只能是number类型

numericDataStore.count = 333
// 赋值成功
```

声明了一个私有的 `apiKey`，便于 `api` 这个对象内部的方法调用，但不希望从外部也能够访问 `api._apiKey`

```javascript
let api = {
  _apiKey: '123abc456def',
  getUsers: function () {},
  getUser: function (userId) {},
  setUser: function (userId, config) {},
}
const RESTRICTED = ['_apiKey']
api = new Proxy(api, {
  get(target, key, proxy) {
    if (RESTRICTED.indexOf(key) > -1) {
      throw Error(`${key} 不可访问.`)
    }
    return Reflect.get(target, key, proxy)
  },
  set(target, key, value, proxy) {
    if (RESTRICTED.indexOf(key) > -1) {
      throw Error(`${key} 不可修改`)
    }
    return Reflect.get(target, key, value, proxy)
  },
})

console.log(api._apiKey)
api._apiKey = '987654321'
// 上述都抛出错误
```

还能通过使用`Proxy`实现观察者模式

观察者模式（Observer mode）指的是函数自动观察数据对象，一旦对象有变化，函数就会自动执行

`observable`函数返回一个原始对象的 `Proxy` 代理，拦截赋值操作，触发充当观察者的各个函数

```javascript
const queuedObservers = new Set()

const observe = (fn) => queuedObservers.add(fn)
const observable = (obj) => new Proxy(obj, { set })

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver)
  queuedObservers.forEach((observer) => observer())
  return result
}
```

观察者函数都放进`Set`集合，当修改`obj`的值，在会`set`函数中拦截，自动执行`Set`所有的观察者

---

## 7. 怎么理解ES6中 Generator的？使用场景有哪些？

**参考答案：**

**一、介绍**

Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同

回顾下上文提到的解决异步的手段：

- 回调函数

- promise

那么，上文我们提到`promsie`已经是一种比较流行的解决异步方案，那么为什么还出现`Generator`？甚至`async/await`呢？

该问题我们留在后面再进行分析，下面先认识下`Generator`

**Generator函数**

执行 `Generator` 函数会返回一个遍历器对象，可以依次遍历 `Generator` 函数内部的每一个状态

形式上，`Generator `函数是一个普通函数，但是有两个特征：

- `function`关键字与函数名之间有一个星号

- 函数体内部使用`yield`表达式，定义不同的内部状态

```javascript
function* helloWorldGenerator() {
  yield 'hello'
  yield 'world'
  return 'ending'
}
```

**二、使用**

`Generator` 函数会返回一个遍历器对象，即具有`Symbol.iterator`属性，并且返回给自己

```javascript
function* gen() {
  // some code
}

var g = gen()

g[Symbol.iterator]() === g
// true
```

通过`yield`关键字可以暂停`generator`函数返回的遍历器对象的状态

```javascript
function* helloWorldGenerator() {
  yield 'hello'
  yield 'world'
  return 'ending'
}
var hw = helloWorldGenerator()
```

上述存在三个状态：`hello`、`world`、`return`

通过`next`方法才会遍历到下一个内部状态，其运行逻辑如下：

- 遇到`yield`表达式，就暂停执行后面的操作，并将紧跟在`yield`后面的那个表达式的值，作为返回的对象的`value`属性值。

- 下一次调用`next`方法时，再继续往下执行，直到遇到下一个`yield`表达式

- 如果没有再遇到新的`yield`表达式，就一直运行到函数结束，直到`return`语句为止，并将`return`语句后面的表达式的值，作为返回的对象的`value`属性值。

- 如果该函数没有`return`语句，则返回的对象的`value`属性值为`undefined`

```javascript
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```

`done`用来判断是否存在下个状态，`value`对应状态值

`yield`表达式本身没有返回值，或者说总是返回`undefined`

通过调用`next`方法可以带一个参数，该参数就会被当作上一个`yield`表达式的返回值

```javascript
function* foo(x) {
  var y = 2 * (yield x + 1)
  var z = yield y / 3
  return x + y + z
}

var a = foo(5)
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5)
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
```

正因为`Generator `函数返回`Iterator`对象，因此我们还可以通过`for...of`进行遍历

```javascript
function* foo() {
  yield 1
  yield 2
  yield 3
  yield 4
  yield 5
  return 6
}

for (let v of foo()) {
  console.log(v)
}
// 1 2 3 4 5
```

原生对象没有遍历接口，通过`Generator `函数为它加上这个接口，就能使用`for...of`进行遍历了

```javascript
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj)

  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]]
  }
}

let jane = { first: 'Jane', last: 'Doe' }

for (let [key, value] of objectEntries(jane)) {
  console.log(`${key}: ${value}`)
}
// first: Jane
// last: Doe
```

**三、异步解决方案**

回顾之前展开异步解决的方案：

- 回调函数

- Promise 对象

- generator 函数

- async/await

这里通过文件读取案例，将几种解决异步的方案进行一个比较：

**回调函数**

所谓回调函数，就是把任务的第二段单独写在一个函数里面，等到重新执行这个任务的时候，再调用这个函数

```javascript
fs.readFile('/etc/fstab', function (err, data) {
  if (err) throw err
  console.log(data)
  fs.readFile('/etc/shells', function (err, data) {
    if (err) throw err
    console.log(data)
  })
})
```

`readFile`函数的第三个参数，就是回调函数，等到操作系统返回了`/etc/passwd`这个文件以后，回调函数才会执行

**Promise**

`Promise`就是为了解决回调地狱而产生的，将回调函数的嵌套，改成链式调用

```javascript
const fs = require('fs')

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function (error, data) {
      if (error) return reject(error)
      resolve(data)
    })
  })
}

readFile('/etc/fstab')
  .then((data) => {
    console.log(data)
    return readFile('/etc/shells')
  })
  .then((data) => {
    console.log(data)
  })
```

这种链式操作形式，使异步任务的两段执行更清楚了，但是也存在了很明显的问题，代码变得冗杂了，语义化并不强

**generator**

`yield`表达式可以暂停函数执行，`next`方法用于恢复函数执行，这使得`Generator`函数非常适合将异步任务同步化

```javascript
const gen = function* () {
  const f1 = yield readFile('/etc/fstab')
  const f2 = yield readFile('/etc/shells')
  console.log(f1.toString())
  console.log(f2.toString())
}
```

**async/await**

将上面`Generator`函数改成`async/await`形式，更为简洁，语义化更强了

```javascript
const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab')
  const f2 = await readFile('/etc/shells')
  console.log(f1.toString())
  console.log(f2.toString())
}
```

**区别：**

通过上述代码进行分析，将`promise`、`Generator`、`async/await`进行比较：

- `promise`和`async/await`是专门用于处理异步操作的

- `Generator`并不是为异步而设计出来的，它还有其他功能（对象迭代、控制输出、部署`Interator`接口...）

- `promise`编写代码相比`Generator`、`async`更为复杂化，且可读性也稍差

- `Generator`、`async`需要与`promise`对象搭配处理异步情况

- `async`实质是`Generator`的语法糖，相当于会自动执行`Generator`函数

- `async`使用上更为简洁，将异步代码以同步的形式进行编写，是处理异步编程的最终方案

**四、使用场景**

`Generator`是异步解决的一种方案，最大特点则是将异步操作同步化表达出来

```javascript
function* loadUI() {
  showLoadingScreen()
  yield loadUIDataAsynchronously()
  hideLoadingScreen()
}
var loader = loadUI()
// 加载UI
loader.next()

// 卸载UI
loader.next()
```

包括`redux-saga `中间件也充分利用了`Generator`特性

```javascript
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from '...'

function* fetchUser(action) {
  try {
    const user = yield call(Api.fetchUser, action.payload.userId)
    yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

function* mySaga() {
  yield takeEvery('USER_FETCH_REQUESTED', fetchUser)
}

function* mySaga() {
  yield takeLatest('USER_FETCH_REQUESTED', fetchUser)
}

export default mySaga
```

还能利用`Generator`函数，在对象上实现`Iterator`接口

```javascript
function* iterEntries(obj) {
  let keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    yield [key, obj[key]]
  }
}

let myObj = { foo: 3, bar: 7 }

for (let [key, value] of iterEntries(myObj)) {
  console.log(key, value)
}

// foo 3
// bar 7
```

---

## 8. 你是怎么理解ES6中 Promise的？使用场景有哪些？

**参考答案：**

**一、介绍**

`Promise `，译为承诺，是异步编程的一种解决方案，比传统的解决方案（回调函数）更加合理和更加强大

在以往我们如果处理多层异步操作，我们往往会像下面那样编写我们的代码

```javascript
doSomething(function (result) {
  doSomethingElse(
    result,
    function (newResult) {
      doThirdThing(
        newResult,
        function (finalResult) {
          console.log('得到最终结果: ' + finalResult)
        },
        failureCallback,
      )
    },
    failureCallback,
  )
}, failureCallback)
```

阅读上面代码，是不是很难受，上述形成了经典的回调地狱

现在通过`Promise`的改写上面的代码

```javascript
doSomething()
  .then(function (result) {
    return doSomethingElse(result)
  })
  .then(function (newResult) {
    return doThirdThing(newResult)
  })
  .then(function (finalResult) {
    console.log('得到最终结果: ' + finalResult)
  })
  .catch(failureCallback)
```

瞬间感受到`promise`解决异步操作的优点：

- 链式操作减低了编码难度

- 代码可读性明显增强

下面我们正式来认识`promise`：

**状态**

`promise`对象仅有三种状态

- `pending`（进行中）

- `fulfilled`（已成功）

- `rejected`（已失败）

**特点**

- 对象的状态不受外界影响，只有异步操作的结果，可以决定当前是哪一种状态

- 一旦状态改变（从`pending`变为`fulfilled`和从`pending`变为`rejected`），就不会再变，任何时候都可以得到这个结果

**流程**

认真阅读下图，我们能够轻松了解`promise`整个流程

![](<images/13. ES6（32题）-image-4.png>)

**二、用法**

`Promise`对象是一个构造函数，用来生成`Promise`实例

```javascript
const promise = new Promise(function (resolve, reject) {})
```

`Promise`构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`

- `resolve`函数的作用是，将`Promise`对象的状态从“未完成”变为“成功”

- `reject`函数的作用是，将`Promise`对象的状态从“未完成”变为“失败”

**实例方法**

`Promise`构建出来的实例存在以下方法：

- then()

- then()

- catch()

- finally()

**then()**

`then`是实例状态发生改变时的回调函数，第一个参数是`resolved`状态的回调函数，第二个参数是`rejected`状态的回调函数

`then`方法返回的是一个新的`Promise`实例，也就是`promise`能链式书写的原因

```javascript
getJSON('/posts.json')
  .then(function (json) {
    return json.post
  })
  .then(function (post) {
    // ...
  })
```

**catch**

`catch()`方法是`.then(null, rejection)`或`.then(undefined, rejection)`的别名，用于指定发生错误时的回调函数

```javascript
getJSON('/posts.json')
  .then(function (posts) {
    // ...
  })
  .catch(function (error) {
    // 处理 getJSON 和 前一个回调函数运行时发生的错误
    console.log('发生错误！', error)
  })
```

`Promise `对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止

```javascript
getJSON('/post/1.json')
  .then(function (post) {
    return getJSON(post.commentURL)
  })
  .then(function (comments) {
    // some code
  })
  .catch(function (error) {
    // 处理前面三个Promise产生的错误
  })
```

一般来说，使用`catch`方法代替`then()`第二个参数

`Promise `对象抛出的错误不会传递到外层代码，即不会有任何反应

```javascript
const someAsyncThing = function () {
  return new Promise(function (resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2)
  })
}
```

浏览器运行到这一行，会打印出错误提示`ReferenceError: x is not defined`，但是不会退出进程

`catch()`方法之中，还能再抛出错误，通过后面`catch`方法捕获到

**finally()**

`finally()`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作

```javascript
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

**构造函数方法**

`Promise`构造函数存在以下方法：

- all()

- race()

- allSettled()

- resolve()

- reject()

- try()

**all()**

`Promise.all()`方法用于将多个 `Promise `实例，包装成一个新的 `Promise `实例

```javascript
const p = Promise.all([p1, p2, p3])
```

接受一个数组（迭代对象）作为参数，数组成员都应为`Promise`实例

实例`p`的状态由`p1`、`p2`、`p3`决定，分为两种：

- 只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数

- 只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数

注意，如果作为参数的 `Promise` 实例，自己定义了`catch`方法，那么它一旦被`rejected`，并不会触发`Promise.all()`的`catch`方法

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve('hello')
})
  .then((result) => result)
  .catch((e) => e)

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了')
})
  .then((result) => result)
  .catch((e) => e)

Promise.all([p1, p2])
  .then((result) => console.log(result))
  .catch((e) => console.log(e))
// ["hello", Error: 报错了]
```

如果`p2`没有自己的`catch`方法，就会调用`Promise.all()`的`catch`方法

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve('hello')
}).then((result) => result)

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了')
}).then((result) => result)

Promise.all([p1, p2])
  .then((result) => console.log(result))
  .catch((e) => console.log(e))
// Error: 报错了
```

**race()**

`Promise.race()`方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例

```javascript
const p = Promise.race([p1, p2, p3])
```

只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变

率先改变的 Promise 实例的返回值则传递给`p`的回调函数

```javascript
const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  }),
])

p.then(console.log).catch(console.error)
```

**allSettled()**

`Promise.allSettled()`方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例

只有等到所有这些参数实例都返回结果，不管是`fulfilled`还是`rejected`，包装实例才会结束

```javascript
const promises = [fetch('/api-1'), fetch('/api-2'), fetch('/api-3')]

await Promise.allSettled(promises)
removeLoadingIndicator()
```

**resolve()**

将现有对象转为 `Promise `对象

```javascript
Promise.resolve('foo')
// 等价于
new Promise((resolve) => resolve('foo'))
```

参数可以分成四种情况，分别如下：

- 参数是一个 Promise 实例，`promise.resolve`将不做任何修改、原封不动地返回这个实例

- 参数是一个`thenable`对象，`promise.resolve`会将这个对象转为 `Promise `对象，然后就立即执行`thenable`对象的`then()`方法

- 参数不是具有`then()`方法的对象，或根本就不是对象，`Promise.resolve()`会返回一个新的 Promise 对象，状态为`resolved`

- 没有参数时，直接返回一个`resolved`状态的 Promise 对象

**reject()**

`Promise.reject(reason)`方法也会返回一个新的 Promise 实例，该实例的状态为`rejected`

```javascript
const p = Promise.reject('出错了')
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
})
// 出错了
```

`Promise.reject()`方法的参数，会原封不动地变成后续方法的参数

```javascript
Promise.reject('出错了').catch((e) => {
  console.log(e === '出错了')
})
// true
```

**三、使用场景**

将图片的加载写成一个`Promise`，一旦加载完成，`Promise`的状态就发生变化

```javascript
const preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
    const image = new Image()
    image.onload = resolve
    image.onerror = reject
    image.src = path
  })
}
```

通过链式操作，将多个渲染数据分别给个`then`，让其各司其职。或当下个异步请求依赖上个请求结果的时候，我们也能够通过链式操作友好解决问题

```javascript
// 各司其职
getInfo()
  .then((res) => {
    let { bannerList } = res
    //渲染轮播图
    console.log(bannerList)
    return res
  })
  .then((res) => {
    let { storeList } = res
    //渲染店铺列表
    console.log(storeList)
    return res
  })
  .then((res) => {
    let { categoryList } = res
    console.log(categoryList)
    //渲染分类列表
    return res
  })
```

通过`all()`实现多个请求合并在一起，汇总所有请求结果，只需设置一个`loading`即可

```javascript
function initLoad() {
  // loading.show() //加载loading
  Promise.all([getBannerList(), getStoreList(), getCategoryList()])
    .then((res) => {
      console.log(res)
      loading.hide() //关闭loading
    })
    .catch((err) => {
      console.log(err)
      loading.hide() //关闭loading
    })
}
//数据初始化
initLoad()
```

通过`race`可以设置图片请求超时

```javascript
//请求某个图片资源
function requestImg() {
  var p = new Promise(function (resolve, reject) {
    var img = new Image()
    img.onload = function () {
      resolve(img)
    }
    //img.src = "https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg"; 正确的
    img.src = 'https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg1'
  })
  return p
}

//延时函数，用于给请求计时
function timeout() {
  var p = new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject('图片请求超时')
    }, 5000)
  })
  return p
}

Promise.race([requestImg(), timeout()])
  .then(function (results) {
    console.log(results)
  })
  .catch(function (reason) {
    console.log(reason)
  })
```

---

## 9. ES6中新增的Set、Map两种数据结构怎么理解?

**参考答案：**

如果要用一句来描述，我们可以说

`Set`是一种叫做集合的数据结构，`Map`是一种叫做字典的数据结构

什么是集合？什么又是字典？

- 集合
  是由一堆无序的、相关联的，且不重复的内存结构【数学中称为元素】组成的组合

- 字典
  是一些元素的集合。每个元素有一个称作key 的域，不同元素的key 各不相同

区别？

- 共同点：集合、字典都可以存储不重复的值

- 不同点：集合是以\[值，值]的形式存储元素，字典是以\[键，值]的形式存储

**一、Set**

`Set`是`es6`新增的数据结构，类似于数组，但是成员的值都是唯一的，没有重复的值，我们一般称为集合

`Set`本身是一个构造函数，用来生成 Set 数据结构

```javascript
const s = new Set()
```

**增删改查**

`Set`的实例关于增删改查的方法：

- add()

- delete()

- has()

- clear()

**add()**

添加某个值，返回 `Set` 结构本身

当添加实例中已经存在的元素，`set`不会进行处理添加

```javascript
s.add(1).add(2).add(2) // 2只被添加了一次
```

**delete()**

删除某个值，返回一个布尔值，表示删除是否成功

```javascript
s.delete(1)
```

**has()**

返回一个布尔值，判断该值是否为`Set`的成员

```javascript
s.has(2)
```

**clear()**

清除所有成员，没有返回值

```javascript
s.clear()
```

**遍历**

`Set`实例遍历的方法有如下：

关于遍历的方法，有如下：

- keys()：返回键名的遍历器

- values()：返回键值的遍历器

- entries()：返回键值对的遍历器

- forEach()：使用回调函数遍历每个成员

`Set`的遍历顺序就是插入顺序

`keys`方法、`values`方法、`entries`方法返回的都是遍历器对象

```javascript
let set = new Set(['red', 'green', 'blue'])

for (let item of set.keys()) {
  console.log(item)
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item)
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item)
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

`forEach()`用于对每个成员执行某种操作，没有返回值，键值、键名都相等，同样的`forEach`方法有第二个参数，用于绑定处理函数的`this`

```javascript
let set = new Set([1, 4, 9])
set.forEach((value, key) => console.log(key + ' : ' + value))
// 1 : 1
// 4 : 4
// 9 : 9
```

扩展运算符和` Set` 结构相结合实现数组或字符串去重

```javascript
// 数组
let arr = [3, 5, 2, 2, 5, 5]
let unique = [...new Set(arr)] // [3, 5, 2]

// 字符串
let str = '352255'
let unique = [...new Set(str)].join('') // "352"
```

实现并集、交集、和差集

```javascript
let a = new Set([1, 2, 3])
let b = new Set([4, 3, 2])

// 并集
let union = new Set([...a, ...b])
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter((x) => b.has(x)))
// set {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a].filter((x) => !b.has(x)))
// Set {1}
```

**二、Map**

`Map`类型是键值对的有序列表，而键和值都可以是任意类型

`Map`本身是一个构造函数，用来生成 `Map` 数据结构

```javascript
const m = new Map()
```

**增删改查**

`Map` 结构的实例针对增删改查有以下属性和操作方法：

- size 属性

- set()

- get()

- has()

- delete()

- clear()

**size**

`size`属性返回 Map 结构的成员总数。

```javascript
const map = new Map()
map.set('foo', true)
map.set('bar', false)

map.size // 2
```

**set()**

设置键名`key`对应的键值为`value`，然后返回整个 Map 结构

如果`key`已经有值，则键值会被更新，否则就新生成该键

同时返回的是当前`Map`对象，可采用链式写法

```javascript
const m = new Map()

m.set('edition', 6) // 键是字符串
m.set(262, 'standard') // 键是数值
m.set(undefined, 'nah') // 键是 undefined
m.set(1, 'a').set(2, 'b').set(3, 'c') // 链式操作
```

**get()**

`get`方法读取`key`对应的键值，如果找不到`key`，返回`undefined`

```javascript
const m = new Map()

const hello = function () {
  console.log('hello')
}
m.set(hello, 'Hello ES6!') // 键是函数

m.get(hello) // Hello ES6!
```

**has()**

`has`方法返回一个布尔值，表示某个键是否在当前 Map 对象之中

```javascript
const m = new Map()

m.set('edition', 6)
m.set(262, 'standard')
m.set(undefined, 'nah')

m.has('edition') // true
m.has('years') // false
m.has(262) // true
m.has(undefined) // true
```

**delete()**

`delete`方法删除某个键，返回`true`。如果删除失败，返回`false`

```javascript
const m = new Map()
m.set(undefined, 'nah')
m.has(undefined) // true

m.delete(undefined)
m.has(undefined) // false
```

**clear()**

`clear`方法清除所有成员，没有返回值

```javascript
let map = new Map()
map.set('foo', true)
map.set('bar', false)

map.size // 2
map.clear()
map.size // 0
```

**遍历**

`Map `结构原生提供三个遍历器生成函数和一个遍历方法：

- keys()：返回键名的遍历器

- values()：返回键值的遍历器

- entries()：返回所有成员的遍历器

- forEach()：遍历 Map 的所有成员

遍历顺序就是插入顺序

```javascript
const map = new Map([
  ['F', 'no'],
  ['T', 'yes'],
])

for (let key of map.keys()) {
  console.log(key)
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value)
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1])
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value)
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value)
}
// "F" "no"
// "T" "yes"

map.forEach(function (value, key, map) {
  console.log('Key: %s, Value: %s', key, value)
})
```

**三、WeakSet 和 WeakMap**

**WeakSet**

创建`WeakSet`实例

```javascript
const ws = new WeakSet()
```

`WeakSet `可以接受一个具有 `Iterable `接口的对象作为参数

```javascript
const a = [
  [1, 2],
  [3, 4],
]
const ws = new WeakSet(a)
// WeakSet {[1, 2], [3, 4]}
```

在`API`中`WeakSet`与`Set`有两个区别：

- 没有遍历操作的`API`

- 没有`size`属性

`WeakSet`只能成员只能是引用类型，而不能是其他类型的值

```javascript
let ws = new WeakSet()

// 成员不是引用类型
let weakSet = new WeakSet([2, 3])
console.log(weakSet) // 报错

// 成员为引用类型
let obj1 = { name: 1 }
let obj2 = { name: 1 }
let ws = new WeakSet([obj1, obj2])
console.log(ws) //WeakSet {{…}, {…}}
```

`WeakSet `里面的引用只要在外部消失，它在 `WeakSet `里面的引用就会自动消失

**WeakMap**

`WeakMap`结构与`Map`结构类似，也是用于生成键值对的集合

在`API`中`WeakMap`与`Map`有两个区别：

- 没有遍历操作的`API`

- 没有`clear`清空方法

```javascript
// WeakMap 可以使用 set 方法添加成员
const wm1 = new WeakMap()
const key = { foo: 1 }
wm1.set(key, 2)
wm1.get(key) // 2

// WeakMap 也可以接受一个数组，
// 作为构造函数的参数
const k1 = [1, 2, 3]
const k2 = [4, 5, 6]
const wm2 = new WeakMap([
  [k1, 'foo'],
  [k2, 'bar'],
])
wm2.get(k2) // "bar"
```

`WeakMap`只接受对象作为键名（`null`除外），不接受其他类型的值作为键名

```javascript
const map = new WeakMap()
map.set(1, 2)
// TypeError: 1 is not an object!
map.set(Symbol(), 2)
// TypeError: Invalid value used as weak map key
map.set(null, 2)
// TypeError: Invalid value used as weak map key
```

`WeakMap`的键名所指向的对象，一旦不再需要，里面的键名对象和所对应的键值对会自动消失，不用手动删除引用

举个场景例子：

在网页的 DOM 元素上添加数据，就可以使用`WeakMap`结构，当该 DOM 元素被清除，其所对应的`WeakMap`记录就会自动被移除

```javascript
const wm = new WeakMap()

const element = document.getElementById('example')

wm.set(element, 'some information')
wm.get(element) // "some information"
```

注意：`WeakMap` 弱引用的只是键名，而不是键值。键值依然是正常引用

下面代码中，键值`obj`会在`WeakMap`产生新的引用，当你修改`obj`不会影响到内部

```javascript
const wm = new WeakMap()
let key = {}
let obj = { foo: 1 }

wm.set(key, obj)
obj = null
wm.get(key)
// Object {foo: 1}
```

---

## 10. ES6中函数新增了哪些扩展?

**参考答案：**

**一、参数**

`ES6`允许为函数的参数设置默认值

```javascript
function log(x, y = 'World') {
  console.log(x, y)
}

console.log('Hello') // Hello World
console.log('Hello', 'China') // Hello China
console.log('Hello', '') // Hello
```

函数的形参是默认声明的，不能使用`let`或`const`再次声明

```javascript
function foo(x = 5) {
  let x = 1 // error
  const x = 2 // error
}
```

参数默认值可以与解构赋值的默认值结合起来使用

```javascript
function foo({ x, y = 5 }) {
  console.log(x, y)
}

foo({}) // undefined 5
foo({ x: 1 }) // 1 5
foo({ x: 1, y: 2 }) // 1 2
foo() // TypeError: Cannot read property 'x' of undefined
```

上面的`foo`函数，当参数为对象的时候才能进行解构，如果没有提供参数的时候，变量`x`和`y`就不会生成，从而报错，这里设置默认值避免

```javascript
function foo({ x, y = 5 } = {}) {
  console.log(x, y)
}

foo() // undefined 5
```

参数默认值应该是函数的尾参数，如果不是非尾部的参数设置默认值，实际上这个参数是没发省略的

```javascript
function f(x = 1, y) {
  return [x, y];
}

f() // [1, undefined]
f(2) // [2, undefined]
f(, 1) // 报错
f(undefined, 1) // [1, 1]
```

**二、属性**

**函数的length属性**

`length`将返回没有指定默认值的参数个数

```javascript
;(function (a) {})
  .length(
    // 1
    function (a = 5) {},
  )
  .length(
    // 0
    function (a, b, c = 5) {},
  ).length // 2
```

`rest` 参数也不会计入`length`属性

```javascript
;(function (...args) {}).length // 0
```

如果设置了默认值的参数不是尾参数，那么`length`属性也不再计入后面的参数了

```javascript
;(function (a = 0, b, c) {}).length(
  // 0
  function (a, b = 1, c) {},
).length // 1
```

**name属性**

返回该函数的函数名

```javascript
var f = function () {}

// ES5
f.name // ""

// ES6
f.name // "f"
```

如果将一个具名函数赋值给一个变量，则 `name`属性都返回这个具名函数原本的名字

```javascript
const bar = function baz() {}
bar.name // "baz"
```

`Function`构造函数返回的函数实例，`name`属性的值为`anonymous`

```javascript
new Function().name // "anonymous"
```

`bind`返回的函数，`name`属性值会加上`bound`前缀

```javascript
function foo() {}
foo
  .bind({})
  .name(
    // "bound foo"

    function () {},
  )
  .bind({}).name // "bound "
```

**三、作用域**

一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域

等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的

下面例子中，`y=x`会形成一个单独作用域，`x`没有被定义，所以指向全局变量`x`

```javascript
let x = 1

function f(y = x) {
  // 等同于 let y = x
  let x = 2
  console.log(y)
}

f() // 1
```

**四、严格模式**

只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错

```javascript
// 报错
function doSomething(a, b = a) {
  'use strict';
  // code
}

// 报错
const doSomething = function ({a, b}) {
  'use strict';
  // code
};

// 报错
const doSomething = (...a) => {
  'use strict';
  // code
};

const obj = {
  // 报错
  doSomething({a, b}) {
    'use strict';
    // code
  }
};
```

**五、箭头函数**

使用“箭头”（`=>`）定义函数

```javascript
var f = (v) => v

// 等同于
var f = function (v) {
  return v
}
```

如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分

```javascript
var f = () => 5
// 等同于
var f = function () {
  return 5
}

var sum = (num1, num2) => num1 + num2
// 等同于
var sum = function (num1, num2) {
  return num1 + num2
}
```

如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用`return`语句返回

```javascript
var sum = (num1, num2) => {
  return num1 + num2
}
```

如果返回对象，需要加括号将对象包裹

```javascript
let getTempItem = (id) => ({ id: id, name: 'Temp' })
```

注意点：

- 函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象

- 不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误

- 不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 `rest` 参数代替

- 不可以使用`yield`命令，因此箭头函数不能用作 Generator 函数

---

## 11. ES6中对象新增了哪些扩展?

**参考答案：**

**一、属性的简写**

ES6中，当对象键名与对应值名相等的时候，可以进行简写

```javascript
const baz = { foo: foo }

// 等同于
const baz = { foo }
```

方法也能够进行简写

```javascript
const o = {
  method() {
    return 'Hello!'
  },
}

// 等同于

const o = {
  method: function () {
    return 'Hello!'
  },
}
```

在函数内作为返回值，也会变得方便很多

```javascript
function getPoint() {
  const x = 1
  const y = 10
  return { x, y }
}

getPoint()
// {x:1, y:10}
```

注意：简写的对象方法不能用作构造函数，否则会报错

```javascript
const obj = {
  f() {
    this.foo = 'bar'
  },
}

new obj.f() // 报错
```

**二、属性名表达式**

ES6 允许字面量定义对象时，将表达式放在括号内

```javascript
let lastWord = 'last word'

const a = {
  'first word': 'hello',
  [lastWord]: 'world',
}

a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"
```

表达式还可以用于定义方法名

```javascript
let obj = {
  ['h' + 'ello']() {
    return 'hi'
  },
}

obj.hello() // hi
```

注意，属性名表达式与简洁表示法，不能同时使用，会报错

```javascript
// 报错
const foo = 'bar';
const bar = 'abc';
const baz = { [foo] };

// 正确
const foo = 'bar';
const baz = { [foo]: 'abc'};
```

注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串`[object Object]`

```javascript
const keyA = { a: 1 }
const keyB = { b: 2 }

const myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB',
}

myObject // Object {[object Object]: "valueB"}
```

**三、super关键字**

`this`关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字`super`，指向当前对象的原型对象

```javascript
const proto = {
  foo: 'hello',
}

const obj = {
  foo: 'world',
  find() {
    return super.foo
  },
}

Object.setPrototypeOf(obj, proto) // 为obj设置原型对象
obj.find() // "hello"
```

**四、扩展运算符的应用**

在解构赋值中，未被读取的可遍历的属性，分配到指定的对象上面

```javascript
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 }
x // 1
y // 2
z // { a: 3, b: 4 }
```

注意：解构赋值必须是最后一个参数，否则会报错

解构赋值是浅拷贝

```javascript
let obj = { a: { b: 1 } }
let { ...x } = obj
obj.a.b = 2 // 修改obj里面a属性中键值
x.a.b // 2，影响到了结构出来x的值
```

对象的扩展运算符等同于使用`Object.assign()`方法

**五、属性的遍历**

ES6 一共有 5 种方法可以遍历对象的属性。

- for...in：循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）

- Object.keys(obj)：返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名

- Object.getOwnPropertyNames(obj)：回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名

- Object.getOwnPropertySymbols(obj)：返回一个数组，包含对象自身的所有 Symbol 属性的键名

- Reflect.ownKeys(obj)：返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举

上述遍历，都遵守同样的属性遍历的次序规则：

- 首先遍历所有数值键，按照数值升序排列

- 其次遍历所有字符串键，按照加入时间升序排列

- 最后遍历所有 Symbol 键，按照加入时间升序排

```javascript
Reflect.ownKeys({ [Symbol()]: 0, b: 0, 10: 0, 2: 0, a: 0 })
// ['2', '10', 'b', 'a', Symbol()]
```

**六、对象新增的方法**

关于对象新增的方法，分别有以下：

- Object.is()

- Object.assign()

- Object.getOwnPropertyDescriptors()

- Object.setPrototypeOf()，Object.getPrototypeOf()

- Object.keys()，Object.values()，Object.entries()

- Object.fromEntries()

**Object.is()**

严格判断两个值是否相等，与严格比较运算符（===）的行为基本一致，不同之处只有两个：一是`+0`不等于`-0`，二是`NaN`等于自身

```javascript
;+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

**Object.assign()**

`Object.assign()`方法用于对象的合并，将源对象`source`的所有可枚举属性，复制到目标对象`target`

`Object.assign()`方法的第一个参数是目标对象，后面的参数都是源对象

```javascript
const target = { a: 1, b: 1 }

const source1 = { b: 2, c: 2 }
const source2 = { c: 3 }

Object.assign(target, source1, source2)
target // {a:1, b:2, c:3}
```

注意：`Object.assign()`方法是浅拷贝，遇到同名属性会进行替换

**Object.getOwnPropertyDescriptors()**

返回指定对象所有自身属性（非继承属性）的描述对象

```javascript
const obj = {
  foo: 123,
  get bar() {
    return 'abc'
  },
}

Object.getOwnPropertyDescriptors(obj)
// { foo:
//    { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   bar:
//    { get: [Function: get bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true } }
```

**Object.setPrototypeOf()**

`Object.setPrototypeOf`方法用来设置一个对象的原型对象

```javascript
Object.setPrototypeOf(object, prototype)

// 用法
const o = Object.setPrototypeOf({}, null)
```

**Object.getPrototypeOf()**

用于读取一个对象的原型对象

```javascript
Object.getPrototypeOf(obj)
```

**Object.keys()**

返回自身的（不含继承的）所有可遍历（enumerable）属性的键名的数组

```javascript
var obj = { foo: 'bar', baz: 42 }
Object.keys(obj)
// ["foo", "baz"]
```

**Object.values()**

返回自身的（不含继承的）所有可遍历（enumerable）属性的键对应值的数组

```javascript
const obj = { foo: 'bar', baz: 42 }
Object.values(obj)
// ["bar", 42]
```

**Object.entries()**

返回一个对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对的数组

```javascript
const obj = { foo: 'bar', baz: 42 }
Object.entries(obj)
// [ ["foo", "bar"], ["baz", 42] ]
```

**Object.fromEntries()**

用于将一个键值对数组转为对象

```javascript
Object.fromEntries([
  ['foo', 'bar'],
  ['baz', 42],
])
// { foo: "bar", baz: 42 }
```

---

## 12. ES6中数组新增了哪些扩展?

**参考答案：**

以下是一些 ES6 中数组新增的扩展：

1. 扩展运算符（Spread operator）：使用 `...` 语法可以将一个数组展开成多个独立的元素，或者将多个元素合并为一个数组。

2. Array.from()：通过类似数组的对象或可迭代对象创建一个新的数组。

3. Array.of()：创建一个由传入参数组成的新数组。

4. find() 和 findIndex()：用于在数组中查找满足指定条件的第一个元素及其索引。

5. includes()：检查数组是否包含指定的元素，并返回布尔值。

6. fill()：使用指定的值填充数组的所有元素。

7. flat() 和 flatMap()：用于将嵌套的数组展平，减少维度。

8. map()、filter()、reduce()、forEach() 等方法的回调函数支持箭头函数语法。

9. entries()、keys() 和 values()：用于遍历数组的键值对、键和值。

10. 数组解构赋值：可以通过解构赋值从数组中提取值并赋给变量。

11. 数组的扩展属性：`Array.prototype.length` 可以被修改，`Array.prototype[@@toStringTag]` 返回 `"Array"`。

---

## 13. JavaScript中的简单数据类型有哪些？

**参考答案：**

JavaScript 中的简单数据类型包括以下几种：

- 字符串（String）：用于表示文本数据，用引号（单引号或双引号）包裹起来，例如："Hello, World!"。

- 数字（Number）：用于表示数值数据，包括整数和浮点数（带小数点的数），例如：42、3.14。

- 布尔值（Boolean）：用于表示逻辑值，只有两个可能的取值：true（真）和false（假）。

- undefined：表示未定义的值，通常表示未声明的变量或缺少返回值的函数。

- null：表示空值，用于显式地表示变量或对象没有值。

- Symbol（符号）：表示唯一的标识符，用于对象属性的键。

- BigInt：用于表示任意精度的整数。BigInt 是一种简单数据类型，在 ECMAScript 2020 中引入。

这些简单数据类型在 JavaScript 中是不可变的，也就是说，它们的值在创建后不能被修改。当你对一个简单数据类型的值进行操作时，实际上是创建了一个新的值。

---

## 14. var、let、const之间有什么区别？

**参考答案：**

**一、var**

在ES5中，顶层对象的属性和全局变量是等价的，用`var`声明的变量既是全局变量，也是顶层变量

注意：顶层对象，在浏览器环境指的是`window`对象，在 `Node` 指的是`global`对象

```javascript
var a = 10
console.log(window.a) // 10
```

使用`var`声明的变量存在变量提升的情况

```javascript
console.log(a) // undefined
var a = 20
```

在编译阶段，编译器会将其变成以下执行

```javascript
var a
console.log(a)
a = 20
```

使用`var`，我们能够对一个变量进行多次声明，后面声明的变量会覆盖前面的变量声明

```javascript
var a = 20
var a = 30
console.log(a) // 30
```

在函数中使用使用`var`声明变量时候，该变量是局部的

```javascript
var a = 20
function change() {
  var a = 30
}
change()
console.log(a) // 20
```

而如果在函数内不使用`var`，该变量是全局的

```javascript
var a = 20
function change() {
  a = 30
}
change()
console.log(a) // 30
```

**二、let**

`let`是`ES6`新增的命令，用来声明变量

用法类似于`var`，但是所声明的变量，只在`let`命令所在的代码块内有效

```javascript
{
  let a = 20
}
console.log(a) // ReferenceError: a is not defined.
```

不存在变量提升

```javascript
console.log(a) // 报错ReferenceError
let a = 2
```

这表示在声明它之前，变量`a`是不存在的，这时如果用到它，就会抛出一个错误

只要块级作用域内存在`let`命令，这个区域就不再受外部影响

```javascript
var a = 123
if (true) {
  a = 'abc' // ReferenceError
  let a
}
```

使用`let`声明变量前，该变量都不可用，也就是大家常说的“暂时性死区”

最后，`let`不允许在相同作用域中重复声明

```javascript
let a = 20
let a = 30
// Uncaught SyntaxError: Identifier 'a' has already been declared
```

注意的是相同作用域，下面这种情况是不会报错的

```javascript
let a = 20
{
  let a = 30
}
```

因此，我们不能在函数内部重新声明参数

```javascript
function func(arg) {
  let arg
}
func()
// Uncaught SyntaxError: Identifier 'arg' has already been declared
```

**三、const**

`const`声明一个只读的常量，一旦声明，常量的值就不能改变

```javascript
const a = 1
a = 3
// TypeError: Assignment to constant variable.
```

这意味着，`const`一旦声明变量，就必须立即初始化，不能留到以后赋值

```javascript
const a;
// SyntaxError: Missing initializer in const declaration
```

如果之前用`var`或`let`声明过变量，再用`const`声明同样会报错

```javascript
var a = 20
let b = 20
const a = 30
const b = 30
// 都会报错
```

`const`实际上保证的并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动

对于简单类型的数据，值就保存在变量指向的那个内存地址，因此等同于常量

对于复杂类型的数据，变量指向的内存地址，保存的只是一个指向实际数据的指针，`const`只能保证这个指针是固定的，并不能确保改变量的结构不变

```javascript
const foo = {}

// 为 foo 添加一个属性，可以成功
foo.prop = 123
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {} // TypeError: "foo" is read-only
```

其它情况，`const`与`let`一致

**四、区别**

`var`、`let`、`const`三者区别可以围绕下面五点展开：

- 变量提升

- 暂时性死区

- 块级作用域

- 重复声明

- 修改声明的变量

- 使用

**变量提升**

`var `声明的变量存在变量提升，即变量可以在声明之前调用，值为`undefined`

// 2023.4.25 更新

`let`和`const`不存在变量提升，即它们所声明的变量一定要在声明后使用，否则报错

let / const 不存在变量提升是不完全正确的，只能说由于暂时性死区的存在使得我们无法直观感受到变量提升的效果。

let 和 const 定义的变量都会被提升，但是不会被初始化，不能被引用，不会像var定义的变量那样，初始值为undefined。

当进入let变量的作用域时，会立即给它创建存储空间，但是不会对它进行初始化。

变量的赋值可以分为三个阶段：

- 创建变量，在内存中开辟空间

- 初始化变量，将变量初始化为undefined

- 真正赋值

关于let、var和function：

- let 的「创建」过程被提升了，但是初始化没有提升。

- var 的「创建」和「初始化」都被提升了。

- function 的「创建」「初始化」和「赋值」都被提升了。

```javascript
// var
console.log(a) // undefined
var a = 10

// let
console.log(b) // Cannot access 'b' before initialization
let b = 10

// const
console.log(c) // Cannot access 'c' before initialization
const c = 10
```

**暂时性死区**

`var`不存在暂时性死区

`let`和`const`存在暂时性死区，只有等到声明变量的那一行代码出现，才可以获取和使用该变量

```javascript
// var
console.log(a) // undefined
var a = 10

// let
console.log(b) // Cannot access 'b' before initialization
let b = 10

// const
console.log(c) // Cannot access 'c' before initialization
const c = 10
```

**块级作用域**

`var`不存在块级作用域

`let`和`const`存在块级作用域

```javascript
// var
{
  var a = 20
}
console.log(a) // 20

// let
{
  let b = 20
}
console.log(b) // Uncaught ReferenceError: b is not defined

// const
{
  const c = 20
}
console.log(c) // Uncaught ReferenceError: c is not defined
```

**重复声明**

`var`允许重复声明变量

`let`和`const`在同一作用域不允许重复声明变量

```javascript
// var
var a = 10
var a = 20 // 20

// let
let b = 10
let b = 20 // Identifier 'b' has already been declared

// const
const c = 10
const c = 20 // Identifier 'c' has already been declared
```

**修改声明的变量**

`var`和`let`可以

`const`声明一个只读的常量。一旦声明，常量的值就不能改变

```javascript
// var
var a = 10
a = 20
console.log(a) // 20

//let
let b = 10
b = 20
console.log(b) // 20

// const
const c = 10
c = 20
console.log(c) // Uncaught TypeError: Assignment to constant variable
```

**使用**

能用`const`的情况尽量使用`const`，其他情况下大多数使用`let`，避免使用`var`

---

## 15. ES6有哪些新特性？

**参考答案：**

**关于ES6和JavaScript的关系**

**1、ES6是对于ES2015+的俗称，也可以说是通常叫法，那么，ES6是什么呢？**

ES 全称是ECMAScript，它是JavaScript基础构建的一种语言，JavaScript正是建立在ECMAScript语言的基础规范中建立使用的，那么，ECMAScript的使用，对于JavaScript至关重要！

在我的理解中，ECMAScript是一种语言层面的东西，它只是定义了JavaScript以及在它基础之上建立的其他语言的语法规范，而JavaScript的语言，更关于一种平台性质在其中。

JavaScript包括 ECMAScript、DOM、BOM三个组成部分，DOM和BOM是web API提供的接口或者是JavaScript和浏览器之间进行交互的部分，实质就是操纵文档元素，进行展示布局，而ECMAScript在JavaScript中其中语法的作用，它不会去跟文档有直接的关系，但是他的数据处理完成后会通过web API展示在文档中。

**ES6新特性的分类**

新特性主要归为四大类：

- 解决原有语法上的一些不足

比如let 和 const 的块级作用域

- 对原有语法进行增强

比如解构、展开、参数默认值、模板字符串

- 全新的对象、全新的方法、全新的功能

比如promise、proxy、object的assign、is

- 全新的数据类型和数据结构

比如symbol、set、map

下面具体进行介绍

1. let、const 块级作用域以及和 var 的区别

- let、const 声明的变量，在 for，if 语句中，会形成块级作用域，块级作用域内的变量，不能被作用域外部使用

- let、const 声明变量不再会有声明提升，在变量声明之前使用运行时会报错

```javascript
//块级作用域一级块级作用域的使用
if (true) {
  const param = 'param in if block'
  console.log(param) //param in if block
}
console.log(param) //块级作用域外访问内部定义的变量，ReferenceError: param is not defined
```

- 块级作用域声明变量，会出现“暂时性死区”，块级作用域声明变量前使用变量，将会报错

```javascript
// 暂时性死区
const i = 100
if (i) {
  console.log(i) //ReferenceError: Cannot access 'i' before initialization
  const i = 1000
}
```

- const 声明的是一个常量，声明必须初始化

```javascript


    // const常量声明必须初始化
    const i;
    i = 10;
    console.log(i) //SyntaxError: Missing initializer in const declaration
```

- 如果 const 声明的是基本类型常量，初始化之后不能修改；引用类型的常量，可以修改其成员变量；

```javascript
// 基本类型常量不能修改，引用类型常量能修改属性
const str = 'str'
str = 'str1' //TypeError: Assignment to constant variable.

const arr = [1, 2, 3]
arr[0] = 100
console.log(arr[0]) //100
```

- 和 var 的区别

**2.解构-快速提取数组/对象中的元素**

- 数组解构

- 单独解构-根据数组索引，将数组解构成单独的元素

```javascript
const arr = [1, 2, 3]

const [a, b, c] = arr
console.log(a, b, c) //1,2,3
const [, , d] = arr
console.log(d) //3
```

- 默认值，解构时可以给变量设置默认值，数组没有这个元素的话

```javascript
const arr = [1, 2, 3]

const [, , , defaultVal = '4'] = arr
console.log('设置默认值', defaultVal)
```

- 剩余解构-用 "...+变量名" 解构剩余参数到新数组，只能用一次

```javascript
const arr = [1, 2, 3]

const [e, ...rest] = arr
console.log(rest) //[2, 3]
```

- 实例应用

```javascript
// 拆分字符串
const str = 'xiaobai/18/200'
const strArr = str.split('/')
const [, age] = strArr
console.log(age) //18
```

- 对象解构

- 单个/多个解构-跟数组解构差不多

```javascript
const obj = { name: 'xiaohui', age: 18, height: undefined }
const { name, age } = obj
console.log(name, age) // 'xiaohui', 18
```

- 解构+重命名-给解构出来的变量重命名

```javascript
const obj = { name: 'xiaohui', age: 18, height: undefined }
const { name: objName } = obj
console.log(objName)
```

- 默认值-给解构变量设置默认值

```javascript
const obj = { name: 'xiaohui', age: 18, height: undefined }
const { next = 'default' } = obj
console.log(next)
```

**3.模板字符串**

用法：使用\`\`将字符串包裹起来

功能：可以换行、插值、使用标签函数进行字符串操作

示例：

- 换行/插值

```javascript
//换行
const str = `fdsjak
    fdsa`
console.log(str)

// 插值
const strs = `random: ${Math.random()}`
console.log(strs)
```

- 标签函数-可以对模板字符串的字符串和插值进行处理和过滤等操作

```javascript
/**
 * 字符串模板函数
 * @param {array} strs 以插值为分隔符组成的字符串数组
 * @param {string} name 插值的value，有多少个就会传入多少个
 */
const tagFunc = (strs, name, gender) => {
  const [str1, str2, str3] = strs
  const genderParsed = gender == '1' ? '男' : '女'
  // 可以在此做过滤，字符串处理，多语言等操作
  return str1 + name + str2 + str3 + genderParsed
}

// 带标签的模板字符串,
const person = {
  name: 'xiaohui',
  gender: 1,
}
// 返回值为标签函数的返回值
const result = tagFunc`my name is ${person.name}.gender is ${person.gender}`
console.log(result) //my name is xiaohui.gender is 男
```

**4. 字符串扩展方法**

- includes-是否包含

- startsWith-是否以什么开始

- endsWith-是否以什么结束

```javascript
const str = 'abcd'

console.log(str.includes('e')) //false
console.log(str.startsWith('a')) //true
console.log(str.endsWith('a')) //false
```

**5.参数默认值&剩余参数**

- 给函数形参设置默认值

```javascript
// 带默认参数的形参一般放在后面，减少传参导致的错误几率
const defaultParams = function (name, age = 0) {
  return [age, name]
}
console.log(defaultParams(1))
```

- 使用...rest 形式设置剩余形参，支持无限参数

```javascript
// 剩余参数，转化成数组
const restParams = function (...args) {
  console.log(args.toString()) //1, 2, 3, 4, 5
}

restParams(1, 2, 3, 4, 5)
```

**6.展开数组**

使用...将数组展开

```javascript
const arr = [1, 2, 3]

console.log(...arr)
// 等价于es5中以下写法
console.log.apply(console, arr)
```

**7.箭头函数**

特性&优势：

- 1、简化了函数的写法

- 2、没有 this 机制，this 继承自上一个函数的上下文，如果上一层没有函数，则指向 window

- 3、作为异步回调函数时，可解决 this 指向问题

```javascript
const inc = (n) => n + 1
console.log(inc(100))

const obj = {
  name: 'aa',
  func() {
    setTimeout(() => {
      console.log(this.name) //aa
    }, 0)
    setTimeout(function () {
      console.log(this.name) //undefined
    }, 0)
  },
}
obj.func()
```

**8.对象字面量增强**

- 同名属性可以省略 key:value 形式，直接 key，

- 函数可以省略 key：value 形式

- 可以直接 func(),

- 可以使用计算属性，比如：{\[Math.random()]: value}

```javascript
/**
 * 1、增强了对象字面量：
 * 1，同名属性可以省略key:value形式，直接key，
 * 2，函数可以省略key：value形式
 * 3，可以直接func(),
 * 4，可以使用计算属性，比如：{[Math.random()]: value}
 */
const arr = [1, 2, 3]
const obj = {
  arr,
  func() {
    console.log(this.arr)
  },
  [Math.random()]: arr,
}

console.log(obj)
```

**9.Object.assign(target1, target2, targetN)-复制/合并对象**

```javascript
/**
 * Object.assign(target1, target2, ...targetn)
 * 后面的属性向前面的属性合并
 * 如果target1是空对象，可以创建一个全新对象，而不是对象引用
 */
const obj1 = {
  a: 1,
  b: 2,
}
const obj2 = {
  a: 1,
  b: 2,
}

const obj3 = Object.assign({}, obj1)
obj3.a = 5
console.log(obj3, obj2, obj1)
```

**10.Object.is(value1, value2)**

作用：比较两个值是否相等

特性：

- 没有隐式转换

- 可以比较+0,-0、NaN

```javascript
console.log(NaN === NaN) //false
console.log(Object.is(NaN, NaN)) //true
console.log(0 === -0) // true
console.log(Object.is(0, -0)) //false
console.log(Object.is(1, 1)) //true
```

**11.Proxy(object, handler)**

作用：

- 代理一个对象的所有，包括读写操作和各种操作的监听

用法：

```javascript
const P = {
  n: 'p',
  a: 19,
}

const proxy = new Proxy(P, {
  get(target, property) {
    console.log(target, property)
    return property in target ? target[property] : null
  },
  defineProperty(target, property, attrs) {
    console.log(target, property, attrs)
    //   throw new Error('不允许修改')
  },
  deleteProperty(target, property) {
    console.log(target, property)
    delete target[property]
  },
  set(target, property, value) {
    target[property] = value
  },
})

proxy.c = 100
console.log('pp', P)
```

与 Object.definePropert 对比

优势：

- 拥有很多 defineProperty 没有的属性方法，比如：

  - handler.getPrototypeOf() ---Object.getPrototypeOf 方法的监听器

  - handler.setPrototypeOf() ---Object.setPrototypeOf 方法的监听器。

  - handler.isExtensible() ---Object.isExtensible 方法的监听器。

  - handler.preventExtensions() ---Object.preventExtensions 方法的监听器。

  - handler.getOwnPropertyDescriptor() ---Object.getOwnPropertyDescriptor 方法的监听器。

  - handler.defineProperty() ---Object.defineProperty 方法的监听器。

  - handler.has() ---in 操作符的监听器。

  - handler.get() ---属性读取操作的监听器。

  - handler.set() ---属性设置操作的监听器。

  - handler.deleteProperty() ---delete 操作符的监听器

  - handler.ownKeys() ---Object.getOwnPropertyNames 方法和 Object.getOwnPropertySymbols 方法的监听器。

  - handler.apply() ---函数调用操作的监听器。

  - handler.construct() ---new 操作符的监听器。

- 对数组的监视更方便

- 以非侵入的访视监管对象的读写

**12.Reflect**

作用：

集成 Object 操作的所有方法，统一、方便，具体方法如下：

用于对对象的统一操作，集成 Object 相关的所有方法

1、apply：类似 Function.prototype.apply

2、Reflect.construct()

对构造函数进行 new 操作，相当于执行 new target(...args)。

3、Reflect.defineProperty()

和 Object.defineProperty() 类似。

4、Reflect.deleteProperty()

作为函数的 delete 操作符，相当于执行 delete target\[name]。

5、Reflect.get()

获取对象身上某个属性的值，类似于 target\[name]。

6、Reflect.getOwnPropertyDescriptor()

类似于 Object.getOwnPropertyDescriptor()。

7、Reflect.getPrototypeOf()

类似于 Object.getPrototypeOf(), 获取目标对象的原型。

8、Reflect.has()

判断一个对象是否存在某个属性，和 in 运算符 的功能完全相同。

9、Reflect.isExtensible()

类似于 Object.isExtensible().判断对象是否可扩展，可以添加额外属性

Object.seal(封闭对象)， Object.freeze（冻结对象）是不可扩展的

10、Reflect.ownKeys()

返回一个包含所有自身属性（不包含继承属性）的数组。(类似于 Object.keys(), 但不会受 enumerable 影响).

11、Reflect.preventExtensions()

类似于 Object.preventExtensions()。返回一个 Boolean。

12、Reflect.set()

将值分配给属性的函数。返回一个 Boolean，如果更新成功，则返回 true, 反之返回 false。

13、Reflect.setPrototypeOf()

类似于 Object.setPrototypeOf()。

示例：

```javascript
const obj = {
  name: 'reflect',
}
Reflect.preventExtensions(obj) //禁止扩展
console.log(Reflect.set(obj, 'age', 'xiaobai')) //false
console.log(obj) //{ name: 'reflect' }
console.log(Reflect.isExtensible(obj, 'name')) //false
console.log(Reflect.ownKeys(obj)) //[ 'name' ]
```

**13.Promise**

作用：解决异步编程中回调嵌套过深问题

**14.class&静态方法&继承**

定义

- 使用 class 关键字定义类

```javascript
class Person {
  constructor(props) {
    this.props = props
  }
}
```

方法

- 实例方法，需要实例化之后才能调用，this 指向实例

- 静态方法，用 static 修饰符修饰，可以直接通过类名调用，不需要实例化，this 不指向实例，而是指向当前类

```javascript
class Person {
  constructor(props) {
    this.props = props
  }
  // 实例方法
  eat() {}
  // 静态方法
  static run() {}
}
// 调用静态方法
Person.run()
const person = new Person('props')
// 调用实例方法
person.eat()
```

继承：子类使用 extends 关键字实现继承，可以继承父类所有属性

```javascript
class Student extends Person {
  constructor(props) {
    super(props)
  }
  printProps() {
    console.log(this.props)
  }
}

const student = new Student('student')
student.printProps()
```

**15.Set**

说明：

Set 是一种类似于数组的数据结构

特性：

- 元素唯一性，不允许重复元素

- 使用 add 增加重复元素，将会被忽略

用途：

- 数组去重

- 数据存储

```javascript
const arr = [1, 3, 1, 1, 1]
const set = new Set(arr)
set.add(1).add(1)
console.log(set.size) //2
const newArr = Array.from(set)
console.log(newArr) //[ 1, 3 ]
```

**16.Map**

说明：

类似 Object，以 key、value 形式存储数据

区别：

Map 键不会隐式转换成字符串，而是保持原有类型

实例：

```javascript
const map = new Map()
map.set(1, 1)
map.set('name', 'map')
map.set(obj, obj)
console.log(map.get(1)) //1
/**
        1 1
        name map
        { '1': 1, true: true, a: 'a' } { '1': 1, true: true, a: 'a' }
     */
map.forEach((val, key) => {
  console.log(key, val)
})
```

**17.Symbol**

说明：

JavaScript 第六种原始数据类型，用来定义一个唯一的变量

作用：

- 创建唯一的变量，解决对象键名重复问题

- 为对象、类、函数等创建私有属性

- 修改对象的 toString 标签

- 为对象添加迭代器属性

如何获取对象的 symbol 属性？

- Object.getOwnPropertySymbols(object)

实例

```javascript
// 对象属性重名问题；
const objSymbol = {
  [Symbol()]: 1,
  [Symbol()]: 2,
}
console.log(objSymbol)

// 2、为对象、类、函数等创建私有属性
const name = Symbol()
const obj2 = {
  [name]: 'symbol',
  testPrivate() {
    console.log(this[name])
  },
}

obj2.testPrivate()
// 定义toString标签；
console.log(obj2.toString())
obj2[Symbol.toStringTag] = 'xx'
console.log(obj2.toString()) //[object xx]
```

**18.for...of...**

用途：

已统一的方式，遍历所有引用数据类型

特性：

可以随时使用 break 终止遍历，而 forEach 不行

实例：

```javascript
// 基本用法
// 遍历数组
const arr = [1, 2, 3, 4]
for (const item of arr) {
  if (item > 3) {
    break
  }
  if (item > 2) {
    console.log(item)
  }
}

// 遍历set
const set = new Set()
set.add('foo').add('bar')
for (const item of set) {
  console.log('set for of', item)
}
// 遍历map
const map = new Map()
map.set('foo', 'one').set('bar', 'two')
for (const [key, val] of map) {
  console.log('for of map', key, val)
}
//迭代对象
const obj = {
  name: 'xiaohui',
  age: '10',
  store: [1, 2, 3],
  // 实现可迭代的接口
  [Symbol.iterator]: function () {
    const params = [this.name, this.age, this.store]
    let index = 0
    return {
      next() {
        const ret = {
          value: params[index],
          done: index >= params.length,
        }
        index++
        return ret
      },
    }
  },
}

for (const item of obj) {
  console.log('obj for of', item)
}
```

**19.迭代器模式**

作用：通过 Symbol.interator 对外提供统一的接口，获取内部的数据

外部可以通过 for...of...去迭代内部的数据

```javascript
const tods = {
  life: ['eat', 'sleep'],
  learn: ['js', 'dart'],
  // 增加的任务
  work: ['sale', 'customer'],
  [Symbol.iterator]: function () {
    const all = []
    Object.keys(this).forEach((key) => {
      all.push(...this[key])
    })
    let index = 0
    return {
      next() {
        const ret = {
          value: all[index],
          done: index >= all.length,
        }
        index++
        return ret
      },
    }
  },
}

for (const item of tods) {
  console.log(item)
}
```

**20.Generator 生成器**

- Generator

- 函数前添加 \*，生成一个生成器

- 一般配合 yield 关键字使用

- 最大特点，惰性执行，调 next 才会往下执行

- 主要用来解决异步回调过深的问题

```javascript
// 生成迭代器方法
//  生成器Generator的应用

function* createIdGenerator() {
  let id = 1
  while (id < 3) yield id++
}
const createId = createIdGenerator()
console.log(createId.next()) //{ value: 1, done: false }
console.log(createId.next()) //{ value: 2, done: false }
console.log(createId.next()) //{ value: undefined, done: true }

const todos = {
  life: ['eat', 'sleep', 'baba'],
  learn: ['es5', 'es6', 'design pattern'],
  work: ['b', 'c', 'framework'],
  [Symbol.iterator]: function* () {
    const all = [...this.life, ...this.learn, ...this.work]
    for (const i of all) {
      yield i
    }
  },
}
for (const item of todos) {
  console.log(item)
}
```

**21.includes 函数-es2016**

判断数组是否包含某个元素，包含 NaN，解决 indexOf 无法查找 NaN 问题

```javascript
//  includes函数
const arr = ['foo', 'bar', 'baz', NaN]
console.log(arr.includes(NaN)) //true
console.log(arr.indexOf(NaN)) //-1
```

**22.运算符-es2016**

指数运算

```javascript
// 指数运算符 **
// es5中2十次方
console.log(Math.pow(2, 10))
// es6中2十次方
console.log(2 ** 10)
```

**23.values 函数-es2017**

将对象的值以数组的形式返回

```javascript
const obj = {
  foo: 1,
  bar: 2,
  baz: 3,
}

console.log(Object.values(obj)) //[ 1, 2, 3 ]
```

**24.entries 函数-es2017**

将对象以键值对二维数组返回，使之可以使用 for...of...遍历

```javascript
'const obj = {
  foo: 1,
  bar: 2,
  baz: 3,
}
console.log(Object.entries(obj))
const entry = Object.entries(obj)
for (const [key, value] of entry) {
  console.log(key, value)
}
```

**25.Object.getOwnPropertyDescriptors(obj)-es2017**

获取对象的描述信息

可以通过获得的描述信息，配合 Object.defineProperties 来完整复制对象，包含 get，set 方法

```javascript
// getOwnPropertyDescriptors

// 普通get方法
const objGet = {
  foo: 1,
  bar: 2,
  get getCount() {
    return this.foo + this.bar
  },
}
// assign方法会把getCount当做普通属性复制，从而getCount为3，修改bar不管用
const objGet1 = Object.assign({}, objGet)
objGet1.bar = 3
console.log(objGet1.getCount) //3
// descriptors
const descriptors = Object.getOwnPropertyDescriptors(objGet)
console.log('des', descriptors)
// 通过descriptors来复制对象，可以完整复制对象，包含get，set
const objGet2 = Object.defineProperties({}, descriptors)
objGet2.bar = 3
console.log(objGet2.getCount) //4
```

**26.padStart, padEnd 函数-es2017**

在字符串前，或者后面追加指定字符串

参数：

targetLenght: 填充后的目标长度

padString:填充的字符串

规则：

1、填充的字符串超过目标长度，会在规定长度时被截断

2、填充字符串太短会以空格填充

3、padString 未传值，以空格填充

作用：

一般用来对齐字符串输出

```javascript
/**
     *  foo.................|1
        barbar..............|2
        bazbazbaz...........|3
     */
console.log(`${key.padEnd(20, '.')}${value.toString().padStart(2, '|')}`)
```

---

## 16. 如何把一个对象变成可迭代对象？

**参考答案：**

可迭代对象（Iterable object）是数组的泛化，这个概念是在说任何对象都可以被定制为可在 `for..of` 循环中使用的对象。

也就是说，可以应用 `for..of` 的对象被称为 `可迭代对象`。

**迭代器**

在 JavaScript 中，迭代器是一个对象，它定义一个序列，并在终止时可能返回一个返回值。

更具体地说，迭代器是通过使用 `next()` 方法实现 `Iterator protocol` 的任何一个对象，该方法返回具有两个属性的对象：

- `value`，这是序列中的 `next` 值

- `done`，如果已经迭代到序列中的最后一个值，则它为 `true`

如果 `value` 和 `done` 一起存在，则它是迭代器的返回值。

一旦创建，迭代器对象可以通过重复调用 `next() `显式地迭代。

迭代一个迭代器被称为消耗了这个迭代器，因为它通常只能执行一次。

在产生终止值之后，对 `next()` 的额外调用应该继续返回 `{done: true}`。

Javascript 中最常见的迭代器是 Array 迭代器，它只是按顺序返回关联数组中的每个值。

虽然很容易想象所有迭代器都可以表示为数组，但事实并非如此。数组必须完整分配，但迭代器仅在必要时使用，因此可以表示无限大小的序列，例如 0 和无穷大之间的整数范围。

这是一个可以做到这一点的例子。它允许创建一个简单的范围迭代器，它定义了从开始（包括）到结束（独占）间隔步长的整数序列。它的最终返回值是它创建的序列的大小，由变量 iterationCount 跟踪。

```javascript
let index = 0
const bears = ['ice', 'panda', 'grizzly']

let iterator = {
  next() {
    if (index < bears.length) {
      return { done: false, value: bears[index++] }
    }

    return { done: true, value: undefined }
  },
}

console.log(iterator.next()) //{ done: false, value: 'ice' }
console.log(iterator.next()) //{ done: false, value: 'panda' }
console.log(iterator.next()) //{ done: false, value: 'grizzly' }
console.log(iterator.next()) //{ done: true, value: undefined }
```

**实现可迭代对象**

如果一个对象拥有 `[Symbol.iterator]` 方法，并且该方法返回一个迭代器对象，这样的对象即可称为`可迭代对象`。

```javascript
let info = {
  bears: ['ice', 'panda', 'grizzly'],
  [Symbol.iterator]: function () {
    let index = 0
    let _iterator = {
      //这里一定要箭头函数，或者手动保存上层作用域的this
      next: () => {
        if (index < this.bears.length) {
          return { done: false, value: this.bears[index++] }
        }

        return { done: true, value: undefined }
      },
    }

    return _iterator
  },
}

let iter = info[Symbol.iterator]()
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())

//符合可迭代对象协议 就可以利用 for of 遍历
for (let bear of info) {
  console.log(bear)
}
//ice panda grizzly
```

---

## 17. 说说你对 Iterator, Generator 和 Async/Await 的理解

**参考答案：**

这里重点理解他们三者分别是什么，有什么区别，以及分别适用什么场景

**Iterator**

Iterator是最简单最好理解的。

简单的说，我们常用的 `for of` 循环，都是通过调用被循环对象的一个特殊函数 `Iterator` 来实现的，但是以前这个函数是隐藏的我们无法访问， 从 `Symbol` 引入之后，我们就可以通过 `Symbol.iterator` 来直接读写这个特殊函数。

对于循环语句来说，他并不关心被循环的对象到底是什么，他只负责调用 `data[Symbol.iterator]` 函数，然后根据返回值来进行循环。所以任何对象只要提供了标准的 Iterator 接口即可被循环，比如我们现在来创造一个自定义的数据：

```plaintext
var students = {}
students[Symbol.iterator] = function() {
  let index = 1;
  return { next() {
    return {done: index>100, value: index++} }
  }
}
for(var i of students) { console.log(i); }
```

除了这种方式外，我们也可以通过 `Generator` 来实现一个 `Iterator` 接口。

**Generator 基本语法**

Generator 是ES6引入的新语法，Generator是一个可以暂停和继续执行的函数。简单的用法，可以当做一个Iterator来用，进行一些遍历操作。复杂一些的用法，他可以在内部保存一些状态，成为一个状态机。

Generator 基本语法包含两部分：

- 函数名前要加一个星号

- 函数内部用 `yield` 关键字返回值

下面是一个简单的示例：

```javascript
function* count() {
  yield 1
  yield 2
  return 3
}
var c = count()
console.log(c.next()) // { value: 1, done: false }
console.log(c.next()) // { value: 2, done: false }
console.log(c.next()) // { value: 3, done: true }
console.log(c.next()) // { value: undefined, done: true }
```

由于Generator也存在 `Symbol.iterator` 接口，所以他也可以被 `for` 循环调用：

```javascript
function* count() {
  yield 1
  yield 2
  return 3
}
var c = count()
for (i of c) console.log(i) // 1, 2
```

不过这里要注意一个不同点，调用 `next` 的时候能得到 `3` ，但是用 `for` 则会忽略最后的 `return` 语句。 也就是 `for` 循环会忽略 `generator` 中的 `return` 语句.

另外 `yeild*` 语法可以用来在 `Generator` 中调用另一个 `Generator`，参见 [<span style="color: rgb(36,91,219); background-color: inherit">yield\* MDN</span>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield%2A)

**Generator VS Iterator**

Generator 可以看做是一个更加灵活的 `Iterator` ，他们之间是可以互相替代的，但是， `Generator` 由于可以通过 `yield` 随时暂停，因此可以很方便进行流程控制和状态管理，而 `Iterator` 就可能需要你写更多的代码进行相同的操作：

比如 Stack Overflow 上的这个中序遍历代码：

```javascript
function* traverseTree(node) {
  if (node == null) return
  yield* traverseTree(node.left)
  yield node.value
  yield* traverseTree(node.right)
}
```

同样的功能用 `iterator` 实现就会变得麻烦很多。

Generator 也是实现简单的状态机的最佳选择，因为他是在函数内部进行 `yield` 操作，因此不会丢失当前状态：

```javascript
function* clock() {
  yield 'tick'
  yield 'tock'
}
```

同样的功能如果普通的函数，因为每次都是调用这个函数，所以函数内部并不能保存状态，因此就需要在函数外面用一个变量来保存当前状态：

```javascript
let tick = false
function clock() {
  tick = !tick
  return tick ? 'tick' : 'tock'
}
```

其实Babel编译 `Generator` 的时候，也是用了一个 `Context` 来保存当前状态的，可以看看Babel编译后的代码，其中的 `_context` 就是当前状态，这里通过 `_context.next` 的值来控制调用 `next` 的时候应该进入到哪一个流程：

```javascript
var _marked = /*#__PURE__*/ regeneratorRuntime.mark(clock)

function clock() {
  return regeneratorRuntime.wrap(
    function clock$(_context) {
      while (1) {
        switch ((_context.prev = _context.next)) {
          case 0:
            _context.next = 2
            return 'tick'

          case 2:
            _context.next = 4
            return 'tock'

          case 4:
          case 'end':
            return _context.stop()
        }
      }
    },
    _marked,
    this,
  )
}
```

当然，如果是很复杂的，非线性状态变化的状态机，我还是会倾向于用一个类来实现。

**Generator 异步操作**

Generator 的设计，可以很方便执行异步操作，现在我们需要写一个小函数，可以取到用户信息然后打印出来，我们用generator来写就是这样的：

```javascript
function* fetchUser() {
  const user = yield ajax()
  console.log(user)
}
```

但是，generator本身并不会自动进行 `next` 操作，也就是，我们如果此时这样调用并不能打印出用户信息:

```javascript
const f = fetchUser()
```

因为`Generator` 本身只是一个状态机，他需要由调用者来改变他的状态，所以我们需要额外加一段控制代码来控制 `fetchUser` 进行状态转换:

```javascript
function* fetchUser() {
  const user = yield ajax()
  console.log(user)
}

const f = fetchUser()

// 加入的控制代码
const result = f.next()
result.value.then((d) => {
  f.next(d)
})
```

但是写了这些代码之后， `Generator` 的实现就变得非常不优雅了，如果我们内部有多个异步操作，控制代码就会变得很长。我们可以选择 co 库来帮我们做这个操作。

**Async/Await**

我最开始接触到 Async/Await 的时候把它当成了一个 `promise` 的语法糖，但是经过我们对 `Generator` 的理解后，明白了其实他就是 `Generator` 的一个语法糖：

- `async` 对应的是 `*`

- `await` 对应的是 `yield`

他只是自动帮我们进行了 `Generator` 的流程控制而已。

和上面的获取用户信息实现一样的功能的话，基本语法如下：

```javascript
async function fetchUser() {
  const user = await ajax()
  console.log(user)
}
```

因为有自动的流程控制，所以我们不用手动在ajax成功的时候手动调用 `next`。相比于 `Promise` 或者 `Generator` 的实现，代码要明显更加优雅。

如果有兴趣的话，可以参考一下 `Babel` 是如何编译 `Async/Await` 的，简单的说，代码分成了两部分，一部分是编译了一个 `Generator`，另一部分是通过 promise 实现了generator的流程控制。

对于如下代码：

```javascript
async function count() {
  let a = await 1
  let b = await 2
  return a + b
}
```

编译后的代码：

```javascript
var count = (function () {
  // 下面这部分是 generator 的一个实现
  var _ref = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
      var a, b
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2
                return 1

              // 省略...
            }
          }
        },
        _callee,
        this,
      )
    }),
  )

  return function count() {
    return _ref.apply(this, arguments)
  }
})()

// 下面这部分是用 promise 实现了流程控制。
function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments)
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg)
          var value = info.value
        } catch (error) {
          reject(error)
          return
        }
        if (info.done) {
          resolve(value)
        } else {
          return Promise.resolve(value).then(
            function (value) {
              step('next', value)
            },
            function (err) {
              step('throw', err)
            },
          )
        }
      }
      return step('next')
    })
  }
}
```

所以我们可以大约这么认为： async/await == generator + promise

**async/await 并发**

我们的代码在执行到await的时候会等待结果返回才执行下一行，这样如果我们有很多需要异步执行的操作就会变成一个串行的流程，可能会导致非常慢。

比如如下代码，我们需要遍历获取redis中存储的100个用户的信息：

```javascript
const users = []
for (var i = 0; i < ids.length; i++) {
  users.push(await db.get(ids))
}
```

由于每次数据库读取操作都要消耗时间，这个接口将会变得非常慢。如果我们把它变成一个并行的操作，将会极大提升效率：

```javascript
const users = await Promise.all(ids.map(async (id) => await db.get(id)))
```

**总结**

- `Iterator` 是一个循环接口，任何实现了此接口的数据都可以被 `for of` 循环遍历

- `Generator` 是一个可以暂停和继续执行的函数，他可以完全实现 `Iterator` 的功能，并且由于可以保存上下文，他非常适合实现简单的状态机。另外通过一些流程控制代码的配合，可以比较容易进行异步操作。

- `Async/Await` 就是generator进行异步操作的语法糖。而这个语法糖反而是被使用最广泛的，比如著名的 `Koa`

---

## 18. Map 和 WeakMap 有什么区别？

**参考答案：**

**Map**

**1.传统对象结构**

Map本质上是一个键值对的集合。和传统对象结构相比，传统对象只能用字符串作为键名，这在使用上造成了很大的限制。

```javascript
const data = {}
//element为节点对象
const element = document.querySelector('.node')
console.log(element) //输出div.node对象
console.log(element.toString())
//用点操作符不能有空格，所以采用中括号的形式给对象赋值
data[element] = 'objectData'
//输出objectData，说明在对象中存在[object HTMLDivElement]键名
console.log(data['[object HTMLDivElement]'])
```

上面带代码中，我们创建了一个对象并将一个节点对象作为它的键名，并进行了代码测试，首先验证了获取到的element节点为一个对象，再确定了经过toString方法转化后的结果，以这个值为键名成功的输出了value值objectData。

上面的代码证明了传统对象的键名会通过toString方法转化为字符串类型

注意：在我们访问对象成员的时，键名有空格时不能采用点访问，例如data.ab c 这是错误的。我们可以用data\['ab c']的形式访问

**2.Map结构**

Map类似于对象，但是键名不限于字符串，可以说Object结构提供键值对应，Map提供值值对应，因此采用Map结构会优于传统对象。

```javascript
const dataMap = new Map()
const element = document.querySelector('.node')
dataMap.set(element, 'objectData')
console.log(dataMap.get(element))
console.log(dataMap)
```

上面的代码中我们获取值时直接传入了element对象，成功将对象作为键名，弥补了传统对象的不足。

**3.Map的特点**

1. Map默认情况下不包含任何键，所有键都是自己添加进去的。不同于Object原型链上有一写默认的键。

2. Map的键可以时任何类型数据，就连函数都可以。

3. Map的键值对个数可以轻易通过size属性获取，Object需要手动计算。

4. Map在频繁增删键值对的场景下性能比Object更好。

**4.什么时候用Map**

1. 想要添加的键值名和Object上的默认键值名冲突，又不想改名，用Map。

2. 需要String和Symbol以外的数据类型做键值时，用Map。

3. 键值对很多，有时需要计算数量，用Map。

4. 需要频繁地增删键值对时，用Map。

**WeakMap**

**什么是WeakMap**

WeakMap是ES6中新增的一种集合类型，叫做'弱映射'。它和Map是兄弟关系，与Map的区别在于这个弱字，API还是Map那套API

**WeakMap的特性**

- WeakMap只能将对象作为键名

只接受对象作为键名(null除外)，不接受其它类型的值作为键名。

**2.WeakMap的键名引用的对象是弱引用**

首先我们需要知道什么是强引用什么是弱引用

强引用

```javascript
const e1 = document.getElementById('foo')
const e2 = document.getElementById('bar')
const arr = [
  [e1, 'foo'],
  [e2, 'bar'],
]
```

上面的代码中e1和e2是两个对象，通过arr数组对这两个对象添加一些文字说明。但是这样就形成了arr对e1和e2的引用，而这种引用又是强引用。它的区别就体现在这。当我们不再需要这两个对象时，我们必须手动删除这个引用，接触arr对两个对象的引用关系，否则垃圾回收机制不会释放e1和e2占用的内存。因为arr仍然存在着对对象的引用。

```javascript
arr[0] = null
arr[1] = null
```

弱引用

是指不能确保其引用的对象不会被垃圾回收器回收的引用。一个对象若只被弱引用所引用，则被认为是不可访问的，并因此可能在任何时刻被回收。

也就是说当我们创建一个弱引用的对象时，我们就可以静静地等待其被垃圾回收器回收。

总的来说，局势WeakMap保持了对键名所引用对象的弱引用，即垃圾回收机制不将该引用考虑在内。只要所引用的对象的其它引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap里面的键名对象和所对应的键值对会自动消失，不需要手动删除引用。

**3.不可遍历**

正因为WeakMap对键名引用的对象是弱引用关系 ，因此WeakMap内部成员是会取决于垃圾回收机制有没有执行，运行前后成员个数很可能是不一样的，而垃圾回收机制的执行又是不可预测的，因此不可遍历。

**Map和WeakMap区别**

- Map的键可以是任意类型，WeakMap只接受对象作为键，不接受其它类型的值作为键

- Map的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键；WeakMap的键是弱引用，键所指向的对象是可以被垃圾回收，此时键是无效的。

- Map可以被遍历，WeakMap不能被遍历

---

## 19. 说说你对 new.target 的理解

**参考答案：**

`new.target`属性允许你检测函数或构造方法是否是通过new运算符被调用的。

在通过new运算符被初始化的函数或构造方法中，`new.target`返回一个指向构造方法或函数的引用。在普通的函数调用中，`new.target` 的值是undefined。

我们可以使用它来检测，一个函数是否是作为构造函数通过new被调用的。

```javascript
function Foo() {
  if (!new.target) throw 'Foo() must be called with new'
  console.log('Foo instantiated with new')
}

Foo() // throws "Foo() must be called with new"
new Foo() // logs "Foo instantiated with new"
```

---

## 20. async/await 怎么进行错误处理？

**参考答案：**

一般情况下 async/await 在错误处理方面，主要使用 try/catch，像这样

```javascript
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('fetch data is me')
    }, 1000)
  })
}

;(async () => {
  try {
    const data = await fetchData()
    console.log('data is ->', data)
  } catch (err) {
    console.log('err is ->', err)
  }
})()
```

这么看，感觉倒是没什么问题，如果是这样呢？有多个异步操作，需要对每个异步返回的 error 错误状态进行不同的处理，以下是示例代码

```javascript
const fetchDataA = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('fetch data is A')
    }, 1000)
  })
}

const fetchDataB = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('fetch data is B')
    }, 1000)
  })
}

const fetchDataC = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('fetch data is C')
    }, 1000)
  })
}

;(async () => {
  try {
    const dataA = await fetchDataA()
    console.log('dataA is ->', dataA)
  } catch (err) {
    console.log('err is ->', err)
  }

  try {
    const dataB = await fetchDataB()
    console.log('dataB is ->', dataB)
  } catch (err) {
    console.log('err is ->', err)
  }

  try {
    const dataC = await fetchDataC()
    console.log('dataC is ->', dataC)
  } catch (err) {
    console.log('err is ->', err)
  }
})()
```

这样写代码里充斥着 try/catch，有代码洁癖的你能忍受的了吗？这时可能会想到只用一个 try/catch。

```javascript
// ... 这里 fetch 函数省略

;(async () => {
  try {
    const dataA = await fetchDataA()
    console.log('dataA is ->', dataA)
    const dataB = await fetchDataB()
    console.log('dataB is ->', dataB)
    const dataC = await fetchDataC()
    console.log('dataC is ->', dataC)
  } catch (err) {
    console.log('err is ->', err)
    // 难道要定义 err 类型，然后判断吗？？
    /**
     * if (err.type === 'dataA') {
     *  console.log('dataA err is', err)
     * }
     * ......
     * */
  }
})()
```

如果是这样写只会增加编码的复杂度，而且要多写代码，这个时候就应该想想怎么优雅的解决，async/await 本质就是 promise 的语法糖，既然是 promise 那么就可以使用 then 函数了

```javascript
;(async () => {
  const fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('fetch data is me')
      }, 1000)
    })
  }

  const data = await fetchData()
    .then((data) => data)
    .catch((err) => err)
  console.log(data)
})()
```

在上面写法中，如果 fetchData 返回 resolve 正确结果时，data 是我们要的结果，如果是 reject 了，发生错误了，那么 data 是错误结果，这显然是行不通的，再对其完善。

```javascript
;(async () => {
  const fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('fetch data is me')
      }, 1000)
    })
  }

  const [err, data] = await fetchData()
    .then((data) => [null, data])
    .catch((err) => [err, null])
  console.log('err', err)
  console.log('data', data)
  // err null
  // data fetch data is me
})()
```

这样是不是好很多了呢，但是问题又来了，不能每个 await 都写这么长，写着也不方便也不优雅，再优化一下

```javascript
;(async () => {
  const fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('fetch data is me')
      }, 1000)
    })
  }

  // 抽离成公共方法
  const awaitWrap = (promise) => {
    return promise.then((data) => [null, data]).catch((err) => [err, null])
  }

  const [err, data] = await awaitWrap(fetchData())
  console.log('err', err)
  console.log('data', data)
  // err null
  // data fetch data is me
})()
```

将对 await 处理的方法抽离成公共的方法，在使用 await 调用 awaitWrap 这样的方法是不是更优雅了呢。如果使用 typescript 实现大概是这个样子

```javascript
function awaitWrap<T, U = any>(promise: Promise<T>): Promise<[U | null, T | null]> {
    return promise
        .then<[null, T]>((data: T) => [null, data])
        .catch<[U, null]>(err => [err, null])
}
```

---

## 21. 说说对 ES6 中rest参数的理解

**参考答案：**

ES6 引入 rest 参数（形式为`...变量名`），用于获取函数的多余参数，这样就不需要使用`arguments`对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

```javascript
function add(...values) {
  let sum = 0

  for (var val of values) {
    sum += val
  }

  return sum
}

add(2, 5, 3) // 10
```

上面代码的`add`函数是一个求和函数，利用 rest 参数，可以向该函数传入任意数目的参数。

下面是一个 rest 参数代替`arguments`变量的例子。

```javascript
// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort()
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort()
```

上面代码的两种写法，比较后可以发现，rest 参数的写法更自然也更简洁。

`arguments`对象不是数组，而是一个类似数组的对象。所以为了使用数组的方法，必须使用`Array.prototype.slice.call`先将其转为数组。rest 参数就不存在这个问题，它就是一个真正的数组，数组特有的方法都可以使用。下面是一个利用 rest 参数改写数组`push`方法的例子。

```javascript
function push(array, ...items) {
  items.forEach(function (item) {
    array.push(item)
    console.log(item)
  })
}

var a = []
push(a, 1, 2, 3)
```

注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。

```javascript
// 报错
function f(a, ...b, c) {
  // ...
}
```

函数的`length`属性，不包括 rest 参数。

```javascript
;(function (a) {})
  .length(
    // 1
    function (...a) {},
  )
  .length(
    // 0
    function (a, ...b) {},
  ).length // 1
```

<span style="color: rgb(36,91,219); background-color: inherit">箭头函数不可以使用</span>`arguments`<span style="color: rgb(36,91,219); background-color: inherit">对象，该对象在函数体内不存在。如果要用，可以用 </span>`rest`<span style="color: rgb(36,91,219); background-color: inherit"> 参数代替</span>

---

## 22. 箭头函数的 this 指向哪⾥？

**参考答案：**

箭头函数不同于传统JavaScript中的函数，箭头函数并没有属于⾃⼰的this，它所谓的this是捕获其所在上下⽂的 this 值，作为⾃⼰的 this 值，并且由于没有属于⾃⼰的this，所以是不会被new调⽤的，这个所谓的this也不会被改变。

可以⽤Babel理解⼀下箭头函数:

```javascript
// ES6
const obj = {
  getArrow() {
    return () => {
      console.log(this === obj)
    }
  },
}
```

转化后：

```javascript
// ES5，由 Babel 转译
var obj = {
  getArrow: function getArrow() {
    var _this = this
    return function () {
      console.log(_this === obj)
    }
  },
}
```

---

## 23. 如果new一个箭头函数会怎么样？

**参考答案：**

箭头函数是ES6中的提出来的，它没有prototype，也没有自己的this指向，更不可以使用arguments参数，所以不能New一个箭头函数。

new操作符的实现步骤如下：

1、创建一个空的简单JavaScript对象（即{}）；

2、为步骤1新创建的对象添加属性\_\_proto\_\_，将该属性链接至构造函数的原型对象 ；

3、将步骤1新创建的对象作为this的上下文 ；

4、如果该函数没有返回对象，则返回this。

所以，上面的第二、三步，箭头函数都是没有办法执行的。

---

## 24. object.assign和扩展运算法是深拷贝还是浅拷贝，两者区别是什么？

**参考答案：**

- 扩展运算符

```javascript
let outObj = {
  inObj: { a: 1, b: 2 },
}
let newObj = { ...outObj }
newObj.inObj.a = 2
console.log(outObj) // {inObj: {a: 2, b: 2}}
```

- Object.assign()

```javascript
let outObj = {
  inObj: { a: 1, b: 2 },
}
let newObj = Object.assign({}, outObj)
newObj.inObj.a = 2
console.log(outObj) // {inObj: {a: 2, b: 2}}
```

可以看到，两者都是浅拷贝。

Object.assign()方法接收的第一个参数作为目标对象，后面的所有参数作为源对象。然后把所有的源对象合并到目标对象中。它会修改了一个对象，因此会触发 ES6 setter。

扩展操作符（…）使用它时，数组或对象中的每一个值都会被拷贝到一个新的数组或对象中。它不复制继承的属性或类的属性，但是它会复制ES6的 symbols 属性。

---

## 25. 谈谈 Object.defineProperty 与 Proxy 的区别

**参考答案：**

在 Vue2.x 的版本中，双向绑定是基于 Object.defineProperty 方式实现的。而 Vue3.x 版本中，使用了 ES6 中的 Proxy 代理的方式实现。

**Object.defineProperty(obj, prop, descriptor)**

使用 Object.defineProperty 会产生三个主要的问题：

- 不能监听数组的变化

在 Vue2.x 中解决数组监听的方法是将能够改变原数组的方法进行重写实现（比如：push、 pop、shift、unshift、splice、sort、reverse），举例：

```javascript
// 我们重写 push 方法
const originalPush = Array.prototype.push

Array.prototype.push = function () {
  // 我们在这个位置就可以进行 数据劫持 了
  console.log('数组被改变了')

  originalPush.apply(this, arguments)
}
```

- 必须遍历对象的每个属性

可以通过 Object.keys() 来实现

- 必须深层遍历嵌套的对象

通过递归深层遍历嵌套对象，然后通过 Object.keys() 来实现对每个属性的劫持

**Proxy**

- Proxy 针对的整个对象，Object.defineProperty 针对单个属性，这就解决了 需要对对象进行深度递归（支持嵌套的复杂对象劫持）实现对每个属性劫持的问题

```javascript
// 定义一个复杂对象
const obj = {
  obj: {
    children: {
      a: 1,
    },
  },
}

const objProxy = new Proxy(obj, {
  get(target, property, receiver) {
    console.log('-- target --')
    return Reflect.get(target, property, receiver)
  },

  set(target, property, value, receiver) {
    console.log('-- set --')
    return Reflect.set(target, property, value, receiver)
  },
})

console.log(objProxy.obj) // 输出 '-- target --'
console.log((objProxy.a = 2)) // 输出 '-- set --'
```

- Proxy 解决了 Object.defineProperty 无法劫持数组的问题

```javascript
const ary = [1, 2, 3]

const aryProxy = new Proxy(ary, {
  get(target, property, receiver) {
    console.log('-- target --')
    return Reflect.get(target, property, receiver)
  },
  set(target, property, value, receiver) {
    console.log('-- set --')
    return Reflect.set(target, property, value, receiver)
  },
})

console.log(aryProxy[0]) // 输出 '-- target --'
console.log(aryProxy.push(1)) // 输出 '-- set --'
```

- 比 Object.defineProperty 有更多的拦截方法，对比一些新的浏览器，可能会对 Proxy 针正对性的优化，有助于性能提升

---

## 26. ES6中的 Reflect 对象有什么用？

**参考答案：**

Reflect 对象不是构造函数，所以创建时不是用 new 来进行创建。

在 ES6 中增加这个对象的目的：

- 将 Object 对象的一些明显属于语言内部的方法（比如 Object.defineProperty），放到 Reflect 对象上。现阶段，某些方法同时在 Object 和 Reflect 对象上部署，未来的新方法将只部署在 Reflect 对象上。也就是说，从 Reflect 对象上可以拿到语言内部的方法。

- 修改某些 Object 方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而 Reflect.defineProperty(obj, name, desc)则会返回 false。

- 让 Object 操作都变成函数行为。某些 Object 操作是命令式，比如 name in obj 和 delete obj\[name]，而 Reflect.has(obj, name)和 Reflect.deleteProperty(obj, name)让它们变成了函数行为。

- Reflect 对象的方法与 Proxy 对象的方法一一对应，只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。这就让 Proxy 对象可以方便地调用对应的 Reflect 方法，完成默认行为，作为修改行为的基础。也就是说，不管 Proxy 怎么修改默认行为，你总可以在 Reflect 上获取默认行为。

```javascript
var loggedObj = new Proxy(obj, {
  get(target, name) {
    console.log('get', target, name)
    return Reflect.get(target, name)
  },
  deleteProperty(target, name) {
    console.log('delete' + name)
    return Reflect.deleteProperty(target, name)
  },
  has(target, name) {
    console.log('has' + name)
    return Reflect.has(target, name)
  },
})
```

上面代码中，每一个 Proxy 对象的拦截操作（get、delete、has），内部都调用对应的 Reflect 方法，保证原生行为能够正常执行。添加的工作，就是将每一个操作输出一行日志。

---

## 27. 简单介绍下 ES6 中的 Iterator 迭代器

**参考答案：**

想必大家使用过for循环、while循环等，遍历Array获取其中的值，那其他数据结构如何通过遍历获取呢？或者这样说，是否可以提供一个统一的访问机制？来访问Object、Map、Set等。

轮到Iterator迭代器出场，Iterator迭代器就是为了解决这个问题，它提供统一的接口，为不同的数据结构提供统一的访问机制。(目前Map、Set、Array支持Iterator)。

顾名思义，Iterator迭代器的出现就是为了迭代而生，为不同的集合：Object、Array、Map、Set，提供了一个统一的接口（这里接口可以简单的理解为方法，就是遍历方法）。像我们常用的for...of就是依赖与Iterator迭代器。

在这里顺便提一嘴，我理解到的遍历、迭代的关系：遍历就是访问数据结构的所有元素，而迭代是遍历的一种形式。

```javascript
// 阮一峰 ECMAScript 6 入门
// 模拟next方法返回值
var it = makeIterator(['a', 'b'])

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0
  return {
    next: function () {
      return nextIndex < array.length
        ? { value: array[nextIndex++], done: false }
        : { value: undefined, done: true }
    },
  }
}
```

上面的makeIterator函数，它就是一个迭代器生成函数，作用就是返回一个迭代器对象。对数组执行这个函数，就会返回该数组的迭代器对象it。

通过调用next函数，返回value和done两个属性；value属性返回当前位置的成员，done属性是一个布尔值，表示遍历是否结束，即是否还有必要再一次调用next方法；当done为true时，即遍历完成。

小结：Iterator迭代器就是一个接口方法，它为不同的数据结构提供了一个统一的访问机制；使得数据结构的成员能够按某种次序排列，并逐个被访问。

**Iterator规范**

在上面的代码中，迭代器对象it包含一个next() 方法，调用next()方法，返回两个属性：布尔值done和值value，value的类型无限制。

迭代器对象包含的属性我们知道了，那么在日常开发中，我们如何让一个对象成为一个可迭代对象呢？（可迭代对象即支持迭代器规范的对象）

要成为可迭代对象， 一个对象必须实现@@iterator方法。这意味着对象（或者它原型链上的某个对象）必须有一个键为@@iterator的属性，可通过常量 Symbol.iterator 访问该属性。

```javascript
let myIterable = {
  a: 1,
  b: 2,
  c: 3,
}
myIterable[Symbol.iterator] = function () {
  let self = this
  let arr = Object.keys(self)
  let index = 0
  return {
    next() {
      return index < arr.length
        ? { value: self[arr[index++]], done: false }
        : { value: undefined, done: true }
    },
  }
}

var it = myIterable[Symbol.iterator]()

it.next()

for (const i of myIterable) {
  console.log(i)
}
```

将myIterable对象添加Symbol.iterator属性，同时在返回的next方法中，添加两个属性，既让它成为了一个可迭代对象。（其实如果真的有这样的需求，可以考虑使用Map）。

小结：Iterator规范————Iterator迭代器包含一个next()方法，方法调用返回返回两个属性：done和value；通过定义一个对象的Symbol.iterator属性，即可将此对象修改为迭代器对象，支持for...of遍历。

---

## 28. 如何中断Promise？

**参考答案：**

Promise 有个缺点就是一旦创建就无法取消，所以本质上 Promise 是无法被终止的，但我们在开发过程中可能会遇到下面两个需求：

- 中断调用链

就是在某个 then/catch 执行之后，不想让后续的链式调用继续执行了。

```plaintext
somePromise
  .then(() => {})
  .then(() => {
    // 终止 Promise 链，让下面的 then、catch 和 finally 都不执行
  })
  .then(() => console.log('then'))
  .catch(() => console.log('catch'))
  .finally(() => console.log('finally'))
```

一种方法是在then中直接抛错, 这样就不会执行后面的then, 直接跳到catch方法打印err(但此方法并没有实际中断)。但如果链路中对错误进行了捕获，后面的then函数还是会继续执行。

Promise的then方法接收两个参数：

```javascript
Promise.prototype.then(onFulfilled, onRejected)
```

若onFulfilled或onRejected是一个函数，当函数返回一个新Promise对象时，原Promise对象的状态将跟新对象保持一致，详见Promises/A+标准。

因此，当新对象保持“pending”状态时，原Promise链将会中止执行。

```javascript
Promise.resolve()
  .then(() => {
    console.log('then 1')
    return new Promise(() => {})
  })
  .then(() => {
    console.log('then 2')
  })
  .then(() => {
    console.log('then 3')
  })
  .catch((err) => {
    console.log(err)
  })
```

- 中断Promise

注意这里是中断而不是终止，因为 Promise 无法终止，这个中断的意思是：在合适的时候，把 pending 状态的 promise 给 reject 掉。例如一个常见的应用场景就是希望给网络请求设置超时时间，一旦超时就就中断，我们这里用定时器模拟一个网络请求，随机 3 秒之内返回。

```javascript
function timeoutWrapper(p, timeout = 2000) {
  const wait = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('请求超时')
    }, timeout)
  })
  return Promise.race([p, wait])
}
```

---

## 第29题：什么是 let 的临时性死区？

**参考答案：**

let 会产生临时性死区，在当前的执行上下文中，会进行变量提升，但是未被初始化，所以在执行上下文执行阶段，执行代码如果还没有执行到变量赋值，就引用此变量就会报错，此变量未初始化。

---

## 29. 箭头函数和普通函数有啥区别？箭头函数能当构造函数吗？

**参考答案：**

**什么是箭头函数？**

ES6中允许使用箭头=>来定义箭头函数，具体语法，我们来看一个简单的例子：

```javascript
// 箭头函数
let fun = (name) => {
  // 函数体
  return `Hello ${name} !`
}

// 等同于
let fun = function (name) {
  // 函数体
  return `Hello ${name} !`
}
```

可以看出，定义箭头函在数语法上要比普通函数简洁得多。箭头函数省去了function关键字，采用箭头=>来定义函数。函数的参数放在=>前面的括号中，函数体跟在=>后的花括号中。

**箭头函数与普通函数的区别**

1、语法更加简洁、清晰

从上面的基本语法示例中可以看出，箭头函数的定义要比普通函数定义简洁、清晰得多，很快捷。

2、箭头函数不会创建自己的this（重要！！深入理解！！）

我们先来看看MDN上对箭头函数this的解释。

> <span style="color: rgb(36,91,219); background-color: inherit">箭头函数不会创建自己的this，所以它没有自己的this，它只会从自己的作用域链的上一层继承this。</span>

箭头函数没有自己的this，它会捕获自己在定义时（注意，是定义时，不是调用时）所处的外层执行环境的this，并继承这个this值。所以，箭头函数中this的指向在它被定义的时候就已经确定了，之后永远不会改变。

3、箭头函数继承而来的this指向永远不变（重要！！深入理解！！）

上面的例子，就完全可以说明箭头函数继承而来的this指向永远不变。对象obj的方法b是使用箭头函数定义的，这个函数中的this就永远指向它定义时所处的全局执行环境中的this，即便这个函数是作为对象obj的方法调用，this依旧指向Window对象。

4、.call()/.apply()/.bind()无法改变箭头函数中this的指向

.call()/.apply()/.bind()方法可以用来动态修改函数执行时this的指向，但由于箭头函数的this定义时就已经确定且永远不会改变。所以使用这些方法永远也改变不了箭头函数this的指向，虽然这么做代码不会报错。

5、箭头函数不能作为构造函数使用

我们先了解一下构造函数的new都做了些什么？简单来说，分为四步：

① JS内部首先会先生成一个对象； ② 再把函数中的this指向该对象； ③ 然后执行构造函数中的语句； ④ 最终返回该对象实例。

但是！！因为箭头函数没有自己的this，它的this其实是继承了外层执行环境中的this，且this指向永远不会随在哪里调用、被谁调用而改变，所以箭头函数不能作为构造函数使用，或者说构造函数不能定义成箭头函数，否则用new调用时会报错！

6、箭头函数没有自己的arguments

箭头函数没有自己的arguments对象。在箭头函数中访问arguments实际上获得的是外层局部（函数）执行环境中的值。

7、箭头函数没有原型prototype

```javascript
let sayHi = () => {
  console.log('Hello World !')
}
console.log(sayHi.prototype) // undefined
```

8、箭头函数不能用作Generator函数，不能使用yeild关键字

---

## 30. symbol 有什么用处？

**参考答案：**

ES5 的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是 ES6 引入Symbol的原因。

ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。

Symbol 值通过Symbol函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

---

## 31. async/await 和 Promise 有什么关系？

**参考答案：**

**Promise**

> <span style="color: rgb(36,91,219); background-color: inherit">Promise 对象是一个代理对象（代理一个值），被代理的值在Promise对象创建时可能是未知的。它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）。 这让异步方法可以像同步方法那样返回值，但并不是立即返回最终执行结果，而是一个能代表未来出现的结果的promise对象</span>

**async/await**

es2017的新语法，async/await就是generator + promise的语法糖

async/await 和 Promise 的关系非常的巧妙，await必须在async内使用，并装饰一个Promise对象，async返回的也是一个Promise对象。

async/await中的return/throw会代理自己返回的Promise的resolve/reject，而一个Promise的resolve/reject会使得await得到返回值或抛出异常。

- 如果方法内无await节点

  - return 一个字面量则会得到一个{PromiseStatus: resolved}的Promise。

  - throw 一个Error则会得到一个{PromiseStatus: rejected}的Promise。

- 如果方法内有await节点

  - async会返回一个{PromiseStatus: pending}的Promise（发生切换，异步等待Promise的执行结果）。

  - Promise的resolve会使得await的代码节点获得相应的返回结果，并继续向下执行。

  - Promise的reject 会使得await的代码节点自动抛出相应的异常，终止向下继续执行。
