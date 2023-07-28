# JavaScript
目录
<!-- [[toc]] -->

## 组成部分

- ECMAscript（核心）
- DOM（Document Object Model）
- BOM（Browser Object Model）

## 书写规范

```html
<scritp>
​	xxxxxxx
</script>
```

```html
<script scr=""></script>
<!--引入外部文件-->
```

## 语法

| 语法             | 功能         | 备注         |
| ---------------- | ------------ | ------------ |
| document.write() | 在页面打印   |              |
| console.log()    | 在控制台输出 | 调式程序     |
| alert()          | 弹窗         | 阻塞程序运行 |
| typeof           | 检测数据类型 |              |

## 变量

关键字：**var**	**let** 	**const**

数据类型：根据值的类型确定数据类型。

| 基本数据类型 | 说明       |
| ------------ | ---------- |
| number       | 数值型     |
| string       | 字符型     |
| boolean      | 布尔型     |
| undefined    | 未定义     |
| null         | 初始化对象 |

| 引用数据类型 | 说明 |
| :----------- | ---- |
| object       | 对象 |
| function     | 函数 |

## 运算符

| 运算符 | 说明   |
| ------ | ------ |
| +      | 加     |
| -      | 减     |
| *      | 乘     |
| /      | 除     |
| %      | 求余数 |

| 单目运算符 | 说明  |
| ---------- | ----- |
| ++         | 自加1 |
| --         | 自减1 |

| 三目运算符                  | 说明                                 |
| --------------------------- | ------------------------------------ |
| 表达式1 ? 表达式2 : 表达式3 | 条件为真执行表达式2，为假执行表达式3 |

| 逻辑运算符 | 说明 |
| ---------- | ---- |
| &&         | 与   |
| \|\|       | 或   |
| !          | 非   |

## 判断

| 判断  | 说明 |
| ----- | ---- |
| if    |      |
| swich |      |

```javascript
//if使用方法
var k = 2;
if(k>2){
	console.log("hhh");
}
else{
	console.log("ggg");
}
```

```javascript
//swich使用方法
var week = 7;
swich(week){
	case 1 : 
		console.log("一");
		brake;
    case 2 : 
		console.log("二");
		brake;
    case 3 : 
        console.log("三");
        brake;
    case 4 : 
        console.log("四");
        brake;
    case 5 : 
        console.log("五");
        brake;
    case 6 : 
        console.log("六");
        brake;
    case 7 : 
        console.log("七");
        brake;
	default :  console.log("输入错误");
}
```

## 循环

### 循环5大要素

1. 循环变量
2. 循环变量的初始
3. 循环变量终止条件
4. 循环变量的自增自减
5. 循环体

| 语法       | 说明         |
| ---------- | ------------ |
| for        | 最常用的循环 |
| while      | 先判断在循环 |
| do...while | 选循环再判断 |
| foreach    | 遍历数组     |
| break      | 跳出整个循环 |
| continue   | 继续执行循环 |

## 函数

### 函数的特点

1. 重复性使用
2. 隐藏内部原理（细节）
3. 选择性应用

### 创建函数

~~~javascript
//关键字
function 函数名称(){

}
~~~

~~~javascript
//字面量
var fn = function(){

}
~~~

~~~javascript
//构造函数
var fn = new Function();
~~~

### 函数的调用

~~~javascript
//函数名
函数名();
~~~

~~~javascript
//事件驱动
document.onclick = function(){
	函数名();
}
~~~

## 参数

| 类型 | 说明                             |
| ---- | -------------------------------- |
| 实参 | 函数在调用的时候用到的参数       |
| 形参 | 函数在制定的时候传递的参数，变量 |

~~~javascript
function fn (形参1,形参2...){

}
fn(实参1,实参2);
~~~

### 返回值

~~~javascript
function sum(n,m){
	return n+m;
}
console.log(sum(10,20));
~~~

> return也用作跳出当前函数体

### 作用域

> 在函数外部无法访问函数内部的变量

## 数组

### 数组的创建

~~~javascript
//字面量
var arr = [];
~~~

~~~javascript
//构造函数
var arr = new Array();
~~~

### 数组的赋值

~~~javascript
//直接赋值
var arr = [];
arr[0] = 'a';
~~~

~~~javascript
//调用方法
var arr = [];
arr.push('222');
~~~

### 数组的遍历

~~~javascript
//使用for循环遍历
var arr = [1,2,3,4,5,6,7,8];
for(var i = 0; i < arr.length; i++){
    console.log(arr[i]);
}
~~~

## DOM的操作

### 获取元素

~~~javascript
var obj = document.getElementById('box');//通过ID获取#box元素
var obj = document.getElementByTagName('div');//通过标签名获取元素

var obj = document.querySelector('#box') //IE低版本不支持
var obj = document.querySelectorAll('div') //获取全部div元素
~~~

### 创建节点

~~~javascript
var obj = document.creatElement('div');
~~~

### 设置样式

~~~javascript
obj.style.top = 30px;
obj.style.color = "#FF0000";
~~~

### 显示节点

~~~javascript
document.body.appendChild(obj);
~~~

### 绑定事件

~~~javascript
节点.obclick = function(){
    //事件处理程序
}
~~~

| 鼠标事件      | 说明               | 备注                                                 |
| ------------- | ------------------ | ---------------------------------------------------- |
| onclick       | 鼠标单击事件       | 必须在当前区域按下再弹起时才会触发                   |
| ondblclick    | 鼠标双击事件       |                                                      |
| oncontextmemu | 鼠标右击事件       |                                                      |
| onmouseover   | 鼠标移入事件       | 经过其子元素时也触发该事件                           |
| onmouseout    | 鼠标移出事件       | 经过其子元素时也触发该事件                           |
| onmouseenter  | 鼠标移入事件       | 经过其子元素时不触发该事件                           |
| onmouseleave  | 鼠标移出事件       | 经过其子元素时不触发该事件                           |
| onmousedown   | 鼠标按下时触发     | 按下立即触发                                         |
| onmousemove   | 鼠标指针移动时触发 | 耗费系统资源                                         |
| onmouseup     | 鼠标弹起的时候触发 | 不管在哪里按下，只要弹起的时候在目标区域上，就会触发 |

| 键盘事件   | 说明         | 备注                 |
| ---------- | ------------ | -------------------- |
| onkeyup    | 键盘抬起事件 |                      |
| onkeydown  | 键盘按下事件 | 任何键都可以响应     |
| onkeypress | 键盘按下事件 | 字母数字键才可以响应 |

| 表单事件 | 说明                       | 备注           |
| -------- | -------------------------- | -------------- |
| onfocus  | 获得焦点                   |                |
| onblur   | 失去焦点                   |                |
| oninput  | 文本框输入事件             | 实时监控文本框 |
| onchange | 文本框失去焦点内容发生改变 |                |
| onsubmit | 表单提交                   | form才有       |

| 其他事件     | 说明       | 备注 |
| ------------ | ---------- | ---- |
| onmousewheel | 滚轮事件   |      |
| onscroll     | 滚动条事件 |      |

### 定时器

我不也不知道定时器为什么放这里，不要在意细节

| 方法名                      | 说明       |
| --------------------------- | ---------- |
| setInterval(函数，时间)     | 设置定时器 |
| clearInterval(定时器的名称) | 清除定时器 |

~~~javascript
//设置定时器
var tiemr = setInterval(function(){
	console.log('111')
},1000)
~~~

~~~javascript
//清除定时器
var count = 1; 
var tiemr = setInterval(function(){
	console.log('111');
    count++;
    if(count > 10){
        clearInterval(timer);
    }
},1000)
~~~

## Cookie

- 大小限制（不超过4K）

- 每个域下cookie不能超过50个

- 有效期和设定时间有关

### 获取Cookie

~~~javascript
document.cookie
~~~

### 设置Cookie

~~~javascript
document.cookie = 'age=18;
~~~

### 设置过期时间

~~~javascript
//设置过期天数
var d = new Date();
d.setDate(d.getDate() + 10);
document.cookie='name=100;path=/;expires='+ d.toGMTString();
//name=100     cookie的值
//path=/       cookie在主域名的所有文件夹下都能访问
//expires      设置cookie过期时间
~~~

### 获取时间方法

~~~javascript
var date = new Date();
    console.log(date.getDate());  //号
    console.log(date.getDay());  //星期中的某一天，使用本地时间。返回值是 0（周日） 到 6（周六）
    console.log(date.getMinutes()); //分钟
    console.log(date.getHours());   //小时
    console.log(date.getMonth());   //月  0-11
    console.log(date.getSeconds()); //秒
    console.log(date.getFullYear()); //年
~~~

## 字符串方法

### charAt()

>说明：返回在指定位置的字符，索引从0开始

~~~javascript
let str = 'abcdef'
console.log(str.charAt(2)) // c
~~~

### indexOf()

>说明：查找字符串是否存在，第一个参数为需要查找的字符串，第二个参数可选，为开始查找的位置。如存在则返回所在位置，不存在则返回-1

~~~javascript
let str = "Hello World"
console.log(str.indexOf("l")) //2 找到了则立即返回，即使后面还存在该字符
console.log(str.indexOf("l",4)) //9 从第4个字符开始查找也就是从第一个o开始查找
console.log(str.indexOf("b")) //-1
~~~

### lastIndexOf()

>说明：从字符串尾部开始查找，其他与indexOf一样

### replace()

>说明：用来替换整个字符串中的某段文本。第一个参数为需要被替换的文本，可以使用正则表达式语法，第二个参数为用来替换的文本。不改变文本，返回替换后的文本。

~~~javascript
let str = "Hello World"
let newStr = str.replace("l","y")
console.log(str) // Hello World
console.log(newStr) // Heylo World   默认只替换一次
// 使用正则表达式可以全局替换
newStr = str.replace(/l/g,"y")
console.log(newStr) // Heyyo Woryd 使用正则就把全部的l都换成y
~~~

### slice()

>说明：用来提取字符串的某个部分，第一个参数为从哪个位置开始提取，第二个参数为提取到第几个位置，如果省略第二个参数，则取到最后一个位置。下标从0开始。返回提取出来的文本，不改变原文本

~~~javascript
let str = 'Hello'
console.log(str.slice(2)) // llo
console.log(str.slice(0,3)) // Hel 提取到下标为3的位置但是不包括下标3的字符
~~~

### split()

>说明：用某个指定的字符把字符串分割成数组，第一个参数为用来分割的字符，第二个参数为分割的数组设置最大长度，不写则不限制长度。不改变原字符串，返回分割后的数组。

~~~javascript
let str = "How are you"
console.log(str.split("")) // ["H", "o", "w", " ", "a", "r", "e", " ", "y", "o", "u"]  设置空则每个字符之间都分割
console.log(str.split("", 5)) // ["H", "o", "w", " ", "a"]
console.log(str.split(" ")) // ["How", "are", "you"]
~~~

### substr()

>说明：在字符串中取出从某个下标开始的指定数目的字符。第一个参数为开始的下标，第二个参数为取出文本的长度，不写则取到字符串最后的位置。不改变原文本，返回改变后的文本。

~~~javascript
let str = 'abcdefg'
console.log(str.substr(3)) // defg 从下标3开始，包含下标3，取到尾部
console.log(str.substr(2,6)) //cdefg 取到下标6，包括下标6
~~~

### substring()

>说明：用于提取字符串中介于两个指定下标之间的字符，与substr差别不大

~~~javascript
let str = 'abcdefg'
console.log(str.substring(3)) // defg
console.log(str.substring(2, 6)) // cdef 不包括下标6
~~~



### 大小写转换

字符串大小写转换使用函数 **toUpperCase()** / **toLowerCase()**:

~~~javascript
var txt="Hello World!";       // String
var txt1=txt.toUpperCase();   // txt1 文本会转换为大写
var txt2=txt.toLowerCase();   // txt2 文本会转换为小写
~~~

## 数组方法

### push()

>说明：往数组中的尾部添加数据，任意数量参数，参数为要添加的数据，可以是数组，字符串，对象。改变原数组，返回值为添加后数组的长度。往数组中的尾部添加数据，任意数量参数，参数为要添加的数据，可以是数组，字符串，对象。改变原数组，返回值为添加后数组的长度。

~~~javascript
const arr = [1,2,3]
arr.push(4,"5")
console.log(arr) // [1,2,3,4,"5"]
~~~

### unshift()

>说明：往数组最前部添加数据，任意数量参数，参数为要添加的数据，可以是数组，字符串，对象。改变原数组，返回值为添加后数组的长度。

~~~javascript
const arr = [1,2,3,4]
arr.unshift(5,"6")
console.log(arr) // [5,"6",1,2,3,4]
~~~

### pop()

>说明：弹出数组的最后一个元素，返回值为弹出的元素，改变原数组。弹出数组的最后一个元素，返回值为弹出的元素，改变原数组。

~~~javascript
const arr = [1,2,3,4,5]
const newArr = arr.pop()
console.log(arr) // [1,2,3,4]
console.log(newArr) // 5
~~~

### shift()

>说明：弹出数组的头部第一个元素，返回值为弹出的元素，改变原数组

~~~javascript
const arr = [1,2,3,4,5]
const newArr = arr.shift()
console.log(arr) // [2,3,4,5]
console.log(newArr) // 1
~~~

### slice()

>说明：两个参数，第一个参数为从第几个开始0为第一个，第二个参数为取到第几个，省略则取到最后一个，不改变原数组。

~~~javascript
const arr = [1,2,3,4,5]
console.log(arr.slice(0)) // [1,2,3,4,5]
console.log(arr.slice(0,3)) // [1,2,3]
console.log(arr) // [1,2,3,4,5] 原数组未受到影响
~~~

### splice()

>说明：可用来做对数组的增，删，改功能，重点在前两个参数。第一个参数为规定添加/删除的位置，0为往头部添加，1为在第一个元素之后。使用负数可以从数组尾部开始计算。第二个参数为要删除的项目数量，如果为0则不删除项目。后面的参数可以为无限个，为要添加的元素，返回值为删除的元素，如果有的话。方法改变原数组。

~~~javascript
// 在头部添加元素
const arr = [1,2,3,4,5]
const newArr = arr.splice(0,0,"6",7)
console.log(arr) // ["6", 7, 1, 2, 3, 4, 5]
console.log(newArr) // [] 因为未删除元素，所以为空数组
// ------------------
// 在第三个位置之后添加元素
const arr = [1,2,3,4,5]
const newArr = arr.splice(3,0,"6",7)
console.log(arr) //  [1, 2, 3, "6", 7, 4, 5]
console.log(newArr) // [] 因为未删除元素，所以为空数组
// ------------------
// 从第一个开始删除3个元素
const arr = [1,2,3,4,5]
const newArr = arr.splice(0,3)
console.log(arr) //  [4, 5]  
console.log(newArr) // [1, 2, 3] 为删除的3个元素
// ------------------
// 从第二个元素之后替换2个元素为6，7
const arr = [1,2,3,4,5]
const newArr = arr.splice(2,2,6,7)
console.log(arr) //  [1, 2, 6, 7, 5]
console.log(newArr) // [3, 4] 为删除的2个元素
~~~

### concat

>说明：连接数组的方法，不改变原数组

~~~javascript
const arr = [1,2,3,4]
const arr1 = ["Hello","World"]
const arr3 = arr.concat(arr1)
console.log(arr) // [1, 2, 3, 4] 不改变原数组
console.log(arr3) // [1, 2, 3, 4, "Hello", "World"]
// 也可以这样连接数组
const arr4 = [...arr,...arr1]
console.log(arr4)
~~~

### sort()

>说明：排序函数，接收一个特殊的方法,改变原数组。

~~~javascript
const arr = [4,21,532,54,43,74]
arr.sort(function(a,b){
    return a > b ? 1 : -1// 把这里的1改成-1，-1改成1则使用倒序排序
})
console.log(arr)// [4, 21, 43, 54, 74, 532]
~~~

### join()

>说明：把数组的每个元素用指定的字符连接成一个字符串,不改变原数组。

~~~javascript
const arr = [12,34,3,435,"Hello","你好"]
let str = arr.join("-")
console.log(arr) // [12, 34, 3, 435, "Hello", "你好"]
console.log(str) // 12-34-3-435-Hello-你好
~~~

### 清空数组

~~~javascript
const arr = [1,2,3]
arr = [] // 第一种方法
arr.length = 0 // 第二种方法，推荐
arr.splice(0) //第三种方法
while(arr.pop){} // 第四种方法
~~~

## localStorage

- 没有过期时间
- 没有域的限制
- 存储量在5M
- 只能存储字符串

### 永久储存

#### 存储

~~~javascript
localStorage.name = 'name';
localStorage['age'] = '18';
localStorage.setItem('sex','nan');
~~~

#### 读取

~~~javascript
localStorage.name;
localStorage['age'];
localStorage.setItem('sex');
~~~

#### 删除

~~~javascript
localStorage.removeItem('name');
~~~

### 临时存储

> 使用sessionStorage即可

## AJAX

### 优势

- 优化用户体验（异步状态）
- 实现网页某个板块的数据刷新
- 提高运行效率

### 工作流程

通过对象XMLHttpRequest  代理完成数据交互

> 前后端交互的一个桥梁

### 使用方法

~~~javascript
var xhr = new XMLHttpRequest();
xhr.open('get','url');
//open参数  1:post/get  2:接口（数据请求地址） 3：布尔值（可选）

xhr.send();//发送

//监测状态： ajax状态  服务端状态
~~~

#### AJAX状态码

| 状态码 | 说明                                           |
| ------ | ---------------------------------------------- |
| 0      | 初始化，尚未调用open()方法                     |
| 1      | 调用open()，已经调用send()的方法，正在发送请求 |
| 2      | 发送：已经调用send()方法，已接收到响应         |
| 3      | 解析正在解析响应数据                           |
| 4      | 成功                                           |

#### 服务器状态码

| 状态码 | 说明           |
| ------ | -------------- |
| 200    | 成功           |
| 301    | 永久重定向     |
| 404    | 未找到对应文件 |
| 500    | 服务器错误     |

## 关于This

JS中`this`的指向一直是个难点，难倒了多少学习前端的小白。

今天特意去收集一些资料来好好说说这个`this`

### this的问题

假如有这样一个对象，对象中有个方法。用来打印这个对象中的`bar`的值。并且让外部的`foo`变量等于这个对象里的`foo`方法。然后在外部也新建了个名为`bar`的变量，让他的值为2。

```javascript
var obj = {
  foo: function () { console.log(this.bar) },
  bar: 1
};
var foo = obj.foo;
var bar = 2;
```

```javascript
//如果我们这样去调用这个方法
obj.foo() // 1
```

那么得到这结果就是`obj`对象里的`bar`的值。

```javascript
//如果我们这样调用，那么他的结果则是外部bar变量的值
foo() // 2
```

这种差异的原因，就在于函数体内部使用了`this`关键字。很多教科书会告诉你，`this`指的是函数运行时所在的环境。对于`obj.foo()`来说，`foo`运行在`obj`环境，所以`this`指向`obj`；对于`foo()`来说，`foo`运行在全局环境，所以`this`指向全局环境。所以，两者的运行结果不一样。

这种解释没错，但是教科书往往不告诉你，为什么会这样？也就是说，函数的运行环境到底是怎么决定的？举例来说，为什么`obj.foo()`就是在`obj`环境执行，而一旦`var foo = obj.foo`，`foo()`就变成在全局环境执行？

要理解这个问题，就需要了解一下JS中的数据结构。

### JS的内存数据结构

JavaScript 语言之所以有`this`的设计，跟内存里面的数据结构有关系。

```javascript
var obj = { foo:  5 };
```

上面的代码将一个对象赋值给变量`obj`。JavaScript 引擎会先在内存里面，生成一个对象`{ foo: 5 }`，然后把这个对象的**内存地址**赋值给变量`obj`。注意是**内存地址**，而不是直接复制出一个对象。

也就是说，变量`obj`只是是一个地址（reference）。如果要读取`obj.foo`，引擎先从`obj`拿到内存地址，然后再从该地址读出原始的对象，返回它的`foo`属性。

原始的对象以字典结构保存，每一个属性名都对应一个属性描述对象。举例来说，上面例子的`foo`属性，实际上是以下面的形式保存的。

```javascript
{
  foo: {
    [[value]]: 5 // 值
    [[writable]]: true  // 是否可写
    [[enumerable]]: true // 是否可枚举
    [[configurable]]: true // 是否可配置
  }
}
```

`foo`属性的值保存在属性描述对象的`value`属性里面。

### 对象中的函数

如果对象属性的值为一个函数。

```javascript
var obj = { foo: function () {} };
```

这时，引擎会将函数单独保存在内存中，然后再将函数的地址赋值给`foo`属性的`value`属性。

由于函数是一个单独的值，所以它可以在不同的环境（上下文）执行。

```javascript
var f = function () {};
var obj = { f: f };

// 单独执行
f()

// obj 环境执行
obj.f()
```

直接执行函数f，函数f在全局环境执行，`this.x`指向全局环境的`x`。

通过`obj`调用函数f，函数f在`obj`环境执行，`this`指向`obj`

### 环境变量

JavaScript 允许在函数体内部，引用当前环境的其他变量。

 ```javascript
 var f = function () {
   console.log(x);
 };
 ```

上面代码中，函数体里面使用了变量`x`。该变量由运行环境提供。

现在问题就来了，由于函数可以在不同的运行环境执行，所以需要有一种机制，能够在函数体内部获得当前的运行环境（context）。所以，`this`就出现了，它的设计目的就是在函数体内部，指代函数当前的运行环境。

 ```javascript
 var f = function () {
   console.log(this.x);
 }
 ```

上面代码中，函数体里面的`this.x`就是指当前运行环境的`x`。

 ```javascript
 var f = function () {
   console.log(this.x);
 }
 
 var x = 1;
 var obj = {
   f: f,
   x: 2,
 };
 
 // 单独执行
 f() // 1
 
 // obj 环境执行
 obj.f() // 2
 ```

上面代码中，函数`f`在全局环境执行，`this.x`指向全局环境的`x`。

在`obj`环境执行，`this.x`指向`obj.x`。

回到开头提出的问题，`obj.foo()`是通过`obj`找到`foo`，所以就是在`obj`环境执行。一旦`var foo = obj.foo`，变量`foo`就直接指向函数本身，所以`foo()`就变成在全局环境执行。

> 本文参考：[JavaScript 的 this 原理](http://www.ruanyifeng.com/blog/2018/06/javascript-this.html)

## 垃圾回收机制

JS中有一些变量可能在执行完后就不会再用到了，所以JS引擎的垃圾回收机制就会对这些不再用到的变量进行清理，节约资源的目的。

但是垃圾回收机制怎么知道，哪些内存不再需要呢？

最常使用的方法叫做["引用计数"](https://en.wikipedia.org/wiki/Reference_counting)（reference counting）：语言引擎有一张"引用表"，保存了内存里面所有的资源（通常是各种值）的引用次数。如果一个值的引用次数是`0`，就表示这个值不再用到了，因此可以将这块内存释放。

::: tip

闭包的实现正是利用了这个机制

:::

但是，如果一个值不再需要了，引用数却不为`0`，垃圾回收机制无法释放这块内存，从而导致**内存泄漏**。

```javascript
const arr = [1, 2, 3, 4];
console.log('hello world');
```

上面代码中，数组`[1, 2, 3, 4]`是一个值，会占用内存。变量`arr`是仅有的对这个值的引用，因此引用次数为`1`。尽管后面的代码没有用到`arr`，它还是会持续占用内存。

如果增加一行代码，解除`arr`对`[1, 2, 3, 4]`引用，这块内存就可以被垃圾回收机制释放了。

```javascript
let arr = [1, 2, 3, 4];
console.log('hello world');
arr = null;
```

上面代码中，`arr`重置为`null`，就解除了对`[1, 2, 3, 4]`的引用，引用次数变成了`0`，内存就可以释放出来了。

因此，并不是说有了**垃圾回收机制**，程序员就轻松了。你还是需要关注内存占用。那些很占空间的值，一旦不再用到，你必须检查是否还存在对它们的引用。如果是的话，就必须手动解除引用。

> 本文参考：[JavaScript 内存泄漏](http://www.ruanyifeng.com/blog/2017/04/memory-leak.html)

## JavaScript运行机制

首先，我们需要了解线程

线程是程序中的一个执行流，每个线程都有自己的专有寄存器(栈指针、程序计数器等)，但代码区是共享的，即不同的线程可以执行同样的函数。
而线程又分为了以下两种机制。

- 单线程

  即程序执行时，所走的程序路径按照连续顺序排下来，前面的必须处理好，后面的才会执行。

- 多线程

  即在一个程序中可以同时运行多个不同的线程来执行不同的任务，也就是说允许单个程序创建多个并行执行的线程来完成各自的任务。

而我们的`JavaScript`就是单线程的。

### 为什么JavaScript是单线程？

`JavaScript`的单线程，与它的用途有关。作为浏览器脚本语言，`JavaScript`的主要用途是与用户互动，以及操作`DOM`。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定`JavaScript`同时有两个线程，一个线程在某个`DOM`节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

所以，为了避免复杂性，从一诞生，`JavaScript`就是单线程，这已经成了这门语言的核心特征，将来也不会改变。

但是`HTML5`提出`Web Worker`标准，允许`JavaScript`脚本创建多个线程，但是子线程完全受主线程控制，且不得操作`DOM`。所以，这个新标准并没有改变`JavaScript`单线程的本质。

### 任务队列

单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。

如果排队是因为计算量大，`CPU`忙不过来，倒也算了，但是很多时候`CPU`是闲着的，因为`IO设备`（输入输出设备）很慢（比如`Ajax`操作从网络读取数据），不得不等着结果出来，再往下执行。

`JavaScript`语言的设计者意识到，这时主线程完全可以不管`IO设备`，挂起处于等待中的任务，先运行排在后面的任务。等到`IO设备`返回了结果，再回过头，把挂起的任务继续执行下去。

于是，所有任务可以分成两种

- 同步任务（synchronous）

  在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务

- 异步任务（asynchronous）。

  异步任务指的是，不进入主线程、而进入**任务队列**（task queue）的任务，只有**任务队列**通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行

只要主线程运行结束了，就会去读取**任务队列**，这就是`JavaScript`的运行机制。这个过程会不断重复。

### 事件和回调函数

**任务队列**是一个事件的队列（也可以理解成消息的队列），IO设备完成一项任务，就在**任务队列**中添加一个事件，表示相关的异步任务可以进入**执行栈**了。主线程读取**任务队列**，就是读取里面有哪些事件。

**任务队列**中的事件，除了IO设备的事件以外，还包括一些用户产生的事件（比如鼠标点击、页面滚动等等）。只要**指定过回调函数**，这些事件发生时就会进入**任务队列**，等待主线程读取。

所谓**回调函数**（callback），就是那些会被主线程挂起来的代码。异步任务必须指定回调函数，当主线程开始执行异步任务，就是执行对应的回调函数。

**任务队列**是一个先进先出的数据结构，排在前面的事件，优先被主线程读取。主线程的读取过程基本上是自动的，只要执行栈一清空，**任务队列**上第一位的事件就自动进入主线程。

### 事件循环(Event Loop)

主线程从**任务队列**中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为`Event Loop`（事件循环）。

![Markdown](http://i2.tiimg.com/715842/eadf3db4bf455904.png)

上图中，主线程运行的时候，产生堆（`heap`）和栈（`stack`），栈中的代码调用各种外部API，它们在**任务队列**中加入各种事件（`click`，`load`，`done`）。只要栈中的代码执行完毕，主线程就会去读取"任务队列"，依次执行那些事件所对应的回调函数。

执行栈中的代码（同步任务），总是在读取**任务队列**（异步任务）之前执行。

```javascript
var req = new XMLHttpRequest();
req.open('GET', url);    
req.onload = function (){};    
req.onerror = function (){};    
req.send();
```

上面代码中的``req.send``方法是``Ajax``操作向服务器发送数据，它是一个**异步任务**，意味着只有当前脚本的所有代码执行完，系统才会去读取**任务队列**。所以，它与下面的写法等价。

```javascript
var req = new XMLHttpRequest();
req.open('GET', url);
req.send();
req.onload = function (){};    
req.onerror = function (){};   
```

也就是说，指定回调函数的部分（`onload`和`onerror`），在`send()`方法的前面或后面无关紧要，因为它们属于执行栈的一部分，系统总是执行完它们，才会去读取**任务队列**。

### 定时器

除了放置异步任务的事件，**任务队列**还可以放置定时事件，即指定某些代码在多少时间之后执行。这叫做**定时器**（`timer`）功能，也就是定时执行的代码。

定时器功能主要由`setTimeout()`和`setInterval()`这两个函数来完成，它们的内部运行机制完全一样，区别在于前者指定的代码是**一次性执行**，后者则为**反复执行**。以下主要讨论`setTimeout()`。

`setTimeout()`接受两个参数，第一个是回调函数，第二个是推迟执行的毫秒数。

```javascript
console.log(1);
setTimeout(function(){console.log(2);},1000);
console.log(3);
// 1
// 3
// 2
```

因为`setTimeout`是异步任务，所以`setTimeout`内的函数会最后执行。

如果将`setTimeout`的第二个参数设为0，就表示当前代码执行完以后，**立即执行**（0毫秒间隔）指定的回调函数。

```javascript
setTimeout(function(){console.log(1);}, 0);
console.log(2);
// 2
// 1
```

总之，`setTimeout`的含义是，指定某个任务在主线程最早可得的空闲时间执行，也就是说，尽可能早得执行。它在**任务队列**的尾部添加一个事件，因此要等到**同步任务**和**任务队列**现有的事件都处理完，才会得到执行。

::: warning

HTML5标准规定了setTimeout()的第二个参数的最小值（最短间隔），不得低于4毫秒，如果低于这个值，就会自动增加。在此之前，老版本的浏览器都将最短间隔设为10毫秒。另外，对于那些DOM的变动（尤其是涉及页面重新渲染的部分），通常不会立即执行，而是每16毫秒执行一次。这时使用requestAnimationFrame()的效果要好于setTimeout()。

:::

> 本篇参考:[JavaScript 运行机制详解](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)

## JS中的原型链

js中有对象，例如

```js
var obj = { name: '张三' }
```

我们可以对obj进行一些操作，包括

- 「读」属性
- 「新增」属性
- 「更新」属性
- 「删除」属性

下面我们主要来看一下「读」和「新增」属性。

#### 为什么会有valueOf / toString 属性呢？

我们在没有对obj进行任何其他操作之前，发现obj中已经有几个属性(方法)了：

![Markdown](http://cdn.bingkele.cc/FsDHRbrABa373HfHotYlhzGhAfcw)

**那么问题来了：`valueOf` / `toString` / `constructor` 是怎么来？我们并没有给 `obj.valueOf` 赋值呀。**

要搞清楚 `valueOf` / `toString` / `constructor` 是怎么来的，我们用 `console.dir` 打印一下。

![Markdown](http://cdn.bingkele.cc/FrDgaBD36IcxIkgLt92_dZcnc1GN)

我们发现 `console.dir(obj)` 打出来的结果是：

1. `obj` 本身有一个属性 `name`（这是我们给它加的）

2. `obj` 还有一个属性叫做 `__proto__`（它是一个对象）

3. `obj.__proto__` 有很多属性，包括 `valueOf`、`toString`、`constructor` 等

4. `obj.__proto__` 其实也有一个叫做 `__proto__ `的属性（console.log 没有显示），值为 `null`

现在回到我们的问题：`obj` 为什么会拥有 `valueOf` / `toString` / `constructor` 这几个属性？

**答案：**

这跟 `__proto__ `有关。

当我们「读取」 `obj.toString` 时，JS 引擎会做下面的事情：

1. 看看 `obj` 对象本身有没有 `toString` 属性。没有就走到下一步。

2. 看看 `obj.__proto__` 对象有没有 `toString` 属性，发现 `obj.__proto__` 有 `toString` 属性，于是找到了

   所以 `obj.toString` 实际上就是第 2 步中找到的 `obj.__proto__.toString`。

   可以想象，

3. 如果 `obj.__proto__` 没有，那么浏览器会继续查看 `obj.__proto__.__proto__`

4. 如果 `obj.__proto__.__proto`__ 也没有，那么浏览器会继续查看 `obj.__proto__.__proto__.__proto__`

5. 直到找到 `toString` 或者 `__proto__`为 `null`。

上面的过程，就是「读」属性的「搜索过程」。

而这个「搜索过程」，是连着由 `__proto__` 组成的链子一直走的。

**这个链子，就叫做「原型链」。**



#### **共享原型链**

现在我们有另一个对象

```js
var obj2 = { name: 'obj2' }
```

`obj.toString` 和 `obj2.toString` 其实是同一个东西，也就是 `obj2.__proto__.toString`。

这有什么意义呢？

如果我们改写 `obj2.__proto__.toString`，那么 `obj.toString` 其实也会变！

这样 `obj` 和 `obj2` 就是具有某些相同行为的对象，这就是意义所在。



#### **差异化**

如果我们想让 `obj.toString` 和 `obj2.toString` 的行为不同怎么做呢？

直接赋值就好了：

```js
obj.toString = function(){ return '新的 toString 方法' }
```

#### 总结

「读」属性时会**沿着原型链搜索**。

「新增」属性时**不会**去看原型链



> 参考链接：[https://zhuanlan.zhihu.com/p/23090041](https://zhuanlan.zhihu.com/p/23090041)

## JS中的new有什么用？

大部分讲 new 的文章会从面向对象的思路讲起，但是我始终认为，在解释一个事物的时候，不应该引入另一个更复杂的事物。

今天我从「省代码」的角度来讲 new。

----

想象我们在制作一个策略类战争游戏，玩家可以操作一堆士兵攻击敌方。

我们着重来研究一下这个游戏里面的「制造士兵」环节。

一个士兵的在计算机里就是一堆属性，如下图：

![Markdown](http://cdn.bingkele.cc/FijrWxjaoLwt7reStY3-WH43tTSP)

我们只需要这样就可以制造一个士兵：

```js
var 士兵 = {
  ID: 1, // 用于区分每个士兵
  兵种:"美国大兵",
  攻击力:5,
  生命值:42, 
  行走:function(){ /*走俩步的代码*/},
  奔跑:function(){ /*狂奔的代码*/  },
  死亡:function(){ /*Go die*/    },
  攻击:function(){ /*糊他熊脸*/   },
  防御:function(){ /*护脸*/       }
}

兵营.制造(士兵)
```

制造一百个士兵

如果需要制造100个士兵怎么办呢？

循环100次？

当然不！因为这样浪费了很多内存，也不符合程序员思维。

### 分析

1. 行走、奔跑、死亡、攻击、防御这五个动作对于每个士兵其实是一样的，只需要各自引用同一个函数就可以了，没必要重复创建 100 个行走、100个奔跑……
2. 这些士兵的兵种和攻击力都是一样的，没必要创建 100 次。
3. 只有 ID 和生命值需要创建 100 次，因为每个士兵有自己的 ID 和生命值。

### 改进

我们可以使用`new`关键字，可以让我们少些很多行代码：

```js
function 士兵(ID){
  this.ID = ID
  this.生命值 = 42
}

士兵.prototype = {
  兵种:"美国大兵",
  攻击力:5,
  行走:function(){ /*走俩步的代码*/},
  奔跑:function(){ /*狂奔的代码*/  },
  死亡:function(){ /*Go die*/    },
  攻击:function(){ /*糊他熊脸*/   },
  防御:function(){ /*护脸*/       }
}

// 保存为文件：士兵.js
```

然后是创建士兵（加了一个 `new` 关键字）：

```js
var 士兵们 = []
for(var i=0; i<100; i++){
  士兵们.push(new 士兵(i))
}

兵营.批量制造(士兵们)
```

**new 的作用，就是省那么几行代码。（也就是所谓的语法糖）**

### 注意 constructor 属性

`new` 操作为了记录「临时对象是由哪个函数创建的」，所以预先给「`士兵.prototype`」加了一个 `constructor` 属性：

```js
士兵.prototype = {
  constructor: 士兵
}
```

如果你重新对「士兵.prototype」赋值，那么这个 `constructor` 属性就没了，所以你应该这么写：

```js
士兵.prototype.兵种 = "美国大兵"
士兵.prototype.攻击力 = 5
士兵.prototype.行走 = function(){ /*走俩步的代码*/}
士兵.prototype.奔跑 = function(){ /*狂奔的代码*/  }
士兵.prototype.死亡 = function(){ /*Go die*/    }
士兵.prototype.攻击 = function(){ /*糊他熊脸*/   }
士兵.prototype.防御 = function(){ /*护脸*/       }
```

或者你也可以自己给 `constructor` 重新赋值：

```js
士兵.prototype = {
  constructor: 士兵,
  兵种:"美国大兵",
  攻击力:5,
  行走:function(){ /*走俩步的代码*/},
  奔跑:function(){ /*狂奔的代码*/  },
  死亡:function(){ /*Go die*/    },
  攻击:function(){ /*糊他熊脸*/   },
  防御:function(){ /*护脸*/       }
}
```



> 参考： [https://zhuanlan.zhihu.com/p/23987456](https://zhuanlan.zhihu.com/p/23987456)
