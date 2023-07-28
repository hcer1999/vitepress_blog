# Jquery
<!-- 目录
[[toc]] -->
- jQuery 是一个 JavaScript 库。
- jQuery 极大地简化了 JavaScript 编程。
- jQuery 很容易学习。

## 引入

```html
<script src="文件路径"></script>
```

## 应用

### 获取元素

```javascript
$('div') //以标签名获取
$('#mydiv') //以id名获取
$('.mydiv') //以class名获取
```

### 绑定事件

```javascript
$('选择符').事件类型(function() {}) //绑定事件
```

#### 常见的事件类型

##### 鼠标事件

| 事件名       | 触发情况                         |
| ------------ | -------------------------------- |
| click()      | 当单击元素时                     |
| dblclick()   | 当双击元素时                     |
| mouseenter() | 当鼠标指针穿过（进入）被选元素时 |
| mouseleave() | 当鼠标指针离开被选元素时         |
| hover()      | 当鼠标指针悬停在上面时           |

##### 键盘事件

| 事件名     | 触发情况                                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------------------ |
| keypress() | 当键被按下时。keypress 事件不会触发所有的键（比如 ALT、CTRL、SHIFT、ESC）。请使用 keydown() 方法来检查这些键 |
| keydown()  | 当键盘键被按下时                                                                                             |
| keyup()    | 当键盘键被松开时                                                                                             |

##### 表单事件

| 事件名   | 触发情况                                                                                                                                        |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| submit() | 当提交表单时(只适用于 form 元素)                                                                                                                |
| change() | 当元素的值改变时(当用于 select 元素时，change 事件会在选择某个选项时发生。当用于 text field 或 text area 时，change 事件会在元素失去焦点时发生) |
| focus()  | 当通过鼠标点击选中元素或通过 tab 键定位到元素时                                                                                                 |
| blur()   | 当元素失去焦点时                                                                                                                                |

##### 文档/窗口事件

| 事件名   | 触发情况                                                                                |
| -------- | --------------------------------------------------------------------------------------- |
| load()   | 当指定的元素已加载时。**注：load() 方法在 jQuery 版本 1.8 中已废弃**                    |
| resize() | 当调整浏览器窗口大小时                                                                  |
| scroll() | 当用户滚动指定的元素时                                                                  |
| unload() | 当用户离开页面时。**注：unload() 方法在 jQuery 版本 1.8 中被废弃，在 3.0 版本被移除。** |

### 获取集合绑定事件

```javascript
var aBox = $('box')
aBox.click(function() {
  console.log('okok')
}) //自动遍历绑定所有box
```

### 关于 This

```javascript
//jQuery里面的this返回的是原始js对象
var aBox = $('box')
aBox.click(function() {
  console.log($(this)) //这样返回的就是jQuery对象
})
```

### 获取对象索引值

```javascript
//使用index()方法
var aBox = $('box')
aBox.click(function() {
  console.log($(this).index())
})
```

### DOM 操作

#### 获得内容

三个简单实用的用于 DOM 操作的 jQuery 方法：

- text() - 设置或返回所选元素的文本内容
- html() - 设置或返回所选元素的内容（包括 HTML 标记）
- val() - 设置或返回表单字段的值

##### text()

```javascript
$('#btn1').click(function() {
  alert('Text: ' + $('#test').text())
})
```

##### html()

```javascript
$('#btn2').click(function() {
  alert('HTML: ' + $('#test').html())
})
```

##### val()

```javascript
$('#btn1').click(function() {
  alert('值为: ' + $('#test').val())
})
```

#### 获得属性

- 对于 HTML 元素本身就带有的固有属性，在处理时，使用 **prop()** 方法。
- 对于 HTML 元素我们自己自定义的 DOM 属性，在处理时，使用 **attr()** 方法。

##### prop()

1.如果有相应的属性，返回指定属性值。

2.如果没有相应的属性，返回值是空字符串。

```javascript
$('button').click(function() {
  alert($('a').attr('href'))
}) //由于href是a标签的固有属性，所以我们使用prop方法
```

##### attr()

1.如果有相应的属性，返回指定属性值。

2.如果没有相应的属性，返回值是 undefined。

```javascript
$('button').click(function() {
  alert($('#img').attr('data-id'))
}) //由于data-id是我们自定义的属性，所以我们使用attr()方法
```

#### 设置内容

##### 设置 text

```javascript
$('#btn1').click(function() {
  $('#test1').text('Hello world!')
})
```

##### 设置 html

```javascript
$('#btn2').click(function() {
  $('#test2').html('<b>Hello world!</b>')
})
```

##### 设置 val

```javascript
$('#btn3').click(function() {
  $('#test3').val('RUNOOB')
})
```

#### 设置属性

##### 设置 attr

```javascript
$('button').click(function() {
  $('#runoob').attr('href', 'http://www.runoob.com/jquery')
})
```

##### 设置多个属性

```javascript
$('button').click(function() {
  $('#runoob').attr({
    href: 'http://www.runoob.com/jquery',
    title: 'jQuery 教程'
  })
})
```

**注：设置的方法均支持回调函数**

#### 添加元素

- append() - 在被选元素的结尾插入内容
- prepend() - 在被选元素的开头插入内容
- after() - 在被选元素之后插入内容
- before() - 在被选元素之前插入内容

> append/prepend 是在选择元素内部嵌入。
>
> after/before 是在元素外面追加。

##### append()

append() 方法在被选元素的结尾插入内容（仍然该元素的内部）

```javascript
$('p').append('追加文本')
```

##### appendto()

appendto()方法与 append()方法相同，只是书写顺序不同

```javascript
$(’<div></div>‘).appendto($('.box'));
```

##### prepend()

prepend() 方法在被选元素的开头插入内容

```javascript
$('p').prepend('在开头追加文本')
```

##### after()

after() 方法在被选元素之后插入内容

```javascript
$('img').after('在后面添加文本')
```

##### before()

```javascript
$('img').before('在前面添加文本')
```

#### 复制元素

复制元素也叫克隆元素(如果添加 true，绑定的方法也复制)

```javascript
'b'.clone().prependTo('p')
```

#### 删除元素

如需删除元素和内容，一般可使用以下两个 jQuery 方法：

- remove() - 删除被选元素（及其子元素）
- empty() - 从被选元素中删除子元素

##### remove()

remove() 方法删除被选元素及其子元素

```javascript
$('#div1').remove()
```

##### empty()

empty() 方法删除被选元素的子元素

```javascript
$('#div1').empty()
```

##### 过滤被删除的元素

remove() 方法也可接受一个参数，允许您对被删元素进行过滤。

该参数可以是任何 jQuery 选择器的语法。

下面的例子删除 class="italic" 的所有 p 元素：

```javascript
$('p').remove('.italic')
```

#### CCS 类

- addClass() - 向被选元素添加一个或多个类
- removeClass() - 从被选元素删除一个或多个类
- toggleClass() - 对被选元素进行添加/删除类的切换操作
- css() - 设置或返回样式属性

##### addClass()

```javascript
$('button').click(function() {
  $('h1,h2,p').addClass('blue')
  $('div').addClass('important')
})
```

##### removeClass()

```javascript
$('button').click(function() {
  $('h1,h2,p').removeClass('blue')
})
```

##### toggleClass()

```javascript
$('button').click(function() {
  $('h1,h2,p').toggleClass('blue')
})
```

##### css()方法

```javascript
$('div').css('属性') //获取css样式
$('div').css('属性', '属性值') //设置css样式
$('div').css({
  属性: 属性值,
  属性: 属性值
}) //设置多个css样式
```

### 选择器

#### 1.基本选择器

```javascript
$('#id') //ID选择器
$('div') //元素选择器
$('.classname') //类选择器
$('.classname,.classname1,#id1') //组合选择器
```

#### 2.层次选择器

```javascript
$('#id>.classname ') //子元素选择器
$('#id .classname ') //后代元素选择器
$('#id + .classname ') //紧邻下一个元素选择器
$('#id ~ .classname ') //兄弟元素选择器
```

#### 3.过滤选择器(重点)

```javascript
$('li:first') //第一个li
$('li:last') //最后一个li
$('li:even') //挑选下标为偶数的li
$('li:odd') //挑选下标为奇数的li
$('li:eq(4)') //下标等于 4 的li(第五个 li 元素)
$('li:gt(2)') //下标大于 2 的li
$('li:lt(2)') //下标小于 2 的li
$('li:not(#runoob)') //挑选除 id="runoob" 以外的所有li
$('p:first-child') //其父元素的第一个子元素的所有 <p> 元素
$('p:first-of-type') //其父元素的第一个 <p> 元素的所有 <p> 元素
$('p:last-child') //其父元素的最后一个子元素的所有 <p> 元素
$('p:last-of-type') //其父元素的最后一个 <p> 元素的所有 <p> 元素
$('p:nth-child(2)') //其父元素的第二个子元素的所有 <p> 元素
$('p:nth-last-child(2)') //其父元素的第二个子元素的所有 <p> 元素，从最后一个子元素开始计数
$('p:nth-of-type(2)') //其父元素的第二个 <p> 元素的所有 <p> 元素
$('p:nth-last-of-type(2)') //其父元素的第二个 <p> 元素的所有 <p> 元素，从最后一个子元素开始计数
$('p:only-child') //其父元素的唯一子元素的所有 <p> 元素
$('p:only-of-type') //其父元素的特定类型的唯一子元素的所有 <p> 元素
```

##### **3.2 内容过滤选择器**

```javascript
$("div:contains('Runob')") // 包含 Runob文本的元素
$('td:empty') //不包含子元素或者文本的空元素
$('div:has(selector)') //含有选择器所匹配的元素
$('td:parent') //含有子元素或者文本的元素
```

##### **3.3 可见性过滤选择器**

```javascript
$('li:hidden') //匹配所有不可见元素，或type为hidden的元素
$('li:visible') //匹配所有可见元素
```

##### **3.4 属性过滤选择器**

```javascript
$('div[id]') //所有含有 id 属性的 div 元素
$("div[id='123']") // id属性值为123的div 元素
$("div[id!='123']") // id属性值不等于123的div 元素
$("div[id^='qq']") // id属性值以qq开头的div 元素
$("div[id$='zz']") // id属性值以zz结尾的div 元素
$("div[id*='bb']") // id属性值包含bb的div 元素
$("input[id][name$='man']") //多属性选过滤，同时满足两个属性的条件的元素
```

##### **3.5 状态过滤选择器**

```javascript
$('input:enabled') // 匹配可用的 input
$('input:disabled') // 匹配不可用的 input
$('input:checked') // 匹配选中的 input
$('option:selected') // 匹配选中的 option
```

#### 4.表单选择器

```javascript
$(':input') //匹配所有 input, textarea, select 和 button 元素
$(':text') //所有的单行文本框，$(":text") 等价于$("[type=text]")，推荐使用$("input:text")效率更高，下同
$(':password') //所有密码框
$(':radio') //所有单选按钮
$(':checkbox') //所有复选框
$(':submit') //所有提交按钮
$(':reset') //所有重置按钮
$(':button') //所有button按钮
$(':file') //所有文件域
```

### 其他方法

#### 清除事件冒泡

e.stopPropagation()方法可以清除事件冒泡
