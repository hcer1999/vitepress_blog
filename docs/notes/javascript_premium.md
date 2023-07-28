# JavaScript - 进阶知识点
<!-- 目录 -->
<!-- [[toc]] -->

## 1. 数据类型检测的方式有哪些
1. typeof

```js
console.log(typeof 2);             //number
console.log(typeof true);          //boolean
console.log(typeof 'str');         //string
console.log(typeof []);            //object
console.log(typeof function(){});  //function
console.log(typeof undefined);     //object
console.log(typeof null);          //undefined
```

2. instanceof
    `instanceof`可以正确判断对象的类型， 其内部运行机制是判断在其原型链中能否找到该类型的原型。
```js
console.log(5 instanceof Number);             //false
console.log(false instanceof Boolean);         //false
console.log('str' instanceof String);         //false
console.log([] instanceof Array);             //true
console.log(function(00instanceof Function);  //true
console.log(0 instanceof 0bject);             //true

```
 `instanceof` 只能正确判断引用数据类型， 而不能判断基本数据类型。 `instanceof` 运算符可以用来测试一个对象在其原型链中是否存在一个构造函数的` prototype` 属性。
 3. constructor
```javascript
console.log((2).constructor === Number);               //true
console.log((true) .constructor === Boolean);          //true
console.log(('str').constructor === String);           //true
console.log(([]).constructor === Array);               //true
console.log((function() {}).constructor === Function);  //true
console.log((0).constructor =e= 0bject);               //true
```
 `constructor`有两个作用，一是判断数据的类型，二是对象实例通过`constrcutor` 对象访问它的构造函数。 需要注意，如果创建一个对象来改变它的原型， `constructor` 就不能用来判断数据类型了。
 ```javascript
function Fn(){};
Fn.prototype = new Array();
var f = new Fn();
console.log(f.constructor === Fn);    // false
console.log(f.constructor === Array); // true
 ```
 4. Object.prototype.toString.call()
Object.prototype.toString.call() 使用 `Object` 对象的原型方法
`toString`来判断数据类型：
 ```javascript
var a = Object.prototype.toString;
console.log(a.call(2));     //[object Number]
console.log(a.call(true));   //[object Boolean]
console.log(a.call('str'));  //[object String]
console.log(a.call([]));     //[object Array]
console.log(a.call(function(){}));   //[object Function]
console.log(a.call({}));             //[object Object]
console.log(a.call(undefined));      //[object Undefined]
console.log(a.call(null));           //[object Null]
 ```

## 2. null 和 undefined 区别

- 首先 `Undefined` 和 `Null` 都是基本数据类型， 这两个基本数据类型分别都只有一个值， 就是 `undefined` 和 `null`。

- `undefined` 代表的含义是未定义， `null` 代表的含义是空对象。 一般变量声明了但还没有定义的时候会返回`undefined`， `null`主要用于赋值给一些可能会返回对象的变量， 作为初始化。`undefined` 在 `JavaScript` 中不是一个保留字， 这意味着可以使用`undefined`来作为一个变量名， 但是这样的做法是非常危险的， 它会影响对`undefined` 值的判断。 我们可以通过一些方法获得安全的`undefined`值，比如说 `void 0`。
- 当对这两种类型使用 `typeof `进行判断时， `Null`类型化会返回`object` ，这是一个历史遗留的问题。 当使用双等号对两种类型的值进行比较时会返回`true`， 使用三个等号时会返回 `false`。

## 3. intanceof 操作符的实现原理及实现
`instanceof`运算符用于判断构造函数的 `prototype` 属性是否出现在对象的原型链中的任何位置。

```javascript
function myInstanceof(left, right) {
  //获取对象的原型
  let proto = object.getPrototypeof(left) //获取构造函数的 prototype对象
  let prototype = right.prototype
  //判断构造函数的prototype对象是否在对象的原型链上
  while (true) {
    if (!proto) return false
    if ((proto = prototype)) return true
    //如果没有找到,就继续从其原型上找，object.getPrototypeof方法用来获取指定对象的原型
    proto = object.getprototypeof(proto)
  }
}
```

## 4.  如何获取安全的 undefined 值？  

因为 `undefined` 是一个标识符， 所以可以被当作变量来使用和赋值，但是这样会影响 `undefined` 的正常判断。 表达式 `void ___` 没有返回值， 因此返回结果是 `undefined`。` void` 并不改变表达式的结果，只是让表达式不返回值。 因此可以用 `void 0` 来获得 `undefined`。  

## 5. Object.is() 与比较操作符 “ ===” 、 “ ==” 的区别？  

- 使用双等号（ ==） 进行相等判断时，如果两边的类型不一致，则会进行强制类型转化后再进行比较。

- 使用三等号（ ===）进行相等判断时，如果两边的类型不一致时，不会做强制类型准换， 直接返回 `false`。

- 使用 `Object.is` 来进行相等判断时，一般情况下和三等号的判断相同，它处理了一些特殊的情况， 比如 -0 和 +0 不再相等， 两个 `NaN`是相等的。  

## 6. 什么是 JavaScript 中的包装类型？  

在 JavaScript 中， 基本类型是没有属性和方法的， 但是为了便于操作基本类型的值， 在调用基本类型的属性或方法时 JavaScript 会在后台隐式地将基本类型的值转换为对象， 如：  

```javascript
const a = "abc" ;
a.length;  // 3
a.toUpperCase();// "ABC”"
```

在 访 问` 'abc'.length` 时 ， JavaScript 将 `'abc' `在 后 台 转 换 成`String('abc')`， 然后再访问其 `length` 属性。
`JavaScript` 也可以使用 `Object` 函数显式地将基本类型转换为包装类型：  

```javascript
var a = 'abc'
0bject(a)// String {"abc"}
```

也可以使用 valueOf 方法将包装类型倒转成基本类型：  

```javascript
var a = 'abc"
var b = Object(a)
var c = b.valueof( // "abc"
```

看看如下代码会打印出什么：  

```javascript
var a = new Boolean(false);
if(!a) {
console.log("Oops” );// never runs
}
```

答案是什么都不会打印， 因为虽然包裹的基本类型是 `false`， 但是`false` 被包裹成包装类型后就成了对象， 所以其非值为 `false`， 所以循环体中的内容不会运行。  

## 7. 为什么会有 BigInt 的提案？  

JavaScript 中 `Number.MAX_SAFE_INTEGER` 表示最⼤安全数字， 计算结果是 `9007199254740991`， 即在这个数范围内不会出现精度丢失（小数除外） 。 但是⼀旦超过这个范围， js 就会出现计算不准确的情况，这在⼤数计算的时候不得不依靠⼀些第三⽅库进⾏解决， 因此官⽅提出了 `BigInt` 来解决此问题。 

## 8. 如何判断一个对象是空对象 ?

1. 使用 JSON 自带的.stringify 方法来判断  :

   ```javascript
   if(json.stringify(0bj)=='{}'){
       console.log('空对象");
   }
   ```

2. 使用 ES6 新增的方法 Object.keys()来判断：  

   ```javascript
   if(Object.keys(Obj).length < 0){
   console.log("空对象");
   }
   ```

## 9. const 对象的属性可以修改吗  ?

`const` 保证的并不是变量的值不能改动， 而是变量指向的那个内存地址不能改动。 对于基本类型的数据（ 数值、 字符串、 布尔值） ，其值就保存在变量指向的那个内存地址， 因此等同于常量。
但对于引用类型的数据（ 主要是对象和数组） 来说， 变量指向数据的内存地址， 保存的只是一个指针， `const` 只能保证这个指针是固定不变的， 至于它指向的数据结构是不是可变的， 就完全不能控制了。  

## 10. 如果 new 一个箭头函数的会怎么样 ?

箭头函数是 `ES6` 中的提出来的， 它没有 `prototype`， 也没有自己的 `this`指向， 更不可以使用 `arguments` 参数， 所以不能` New` 一个箭头函数。

new 操作符的实现步骤如下：
1.创建一个对象
2.将构造函数的作用域赋给新对象（ 也就是将对象的__proto__属性指向构造函数的 `prototype` 属性）
3.指向构造函数中的代码， 构造函数中的 `this` 指向该对象（ 也就是为这个对象添加属性和方法）
4.返回新的对象
所以， 上面的第二、 三步， 箭头函数都是没有办法执行的 。
