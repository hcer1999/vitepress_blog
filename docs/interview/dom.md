# DOM 篇
<!-- 目录
[[toc]] -->
## 一. 事件模型

> `W3C`中定义事件的发生经历三个阶段：捕获阶段（`capturing`）、目标阶段（`targetin`）、冒泡阶段（`bubbling`）

- 冒泡型事件：当你使用事件冒泡时，子级元素先触发，父级元素后触发
- 捕获型事件：当你使用事件捕获时，父级元素先触发，子级元素后触发
- DOM 事件流：同时支持两种事件模型：捕获型和冒泡型
- 阻止冒泡：在高级浏览器中，使用 `stopPropagation()`方法；在 `IE` 浏览器中使用 `cancelBubel = true`
- 阻止捕获：阻止事件的默认行为，例如 `a` 标签的 `click` 事件，在高级浏览器中使用 `preventDefault()`方法，在 IE 浏览器中设置 `window.event.returnValue = false`

同时存在捕获与冒泡时，捕获的优先级是高于冒泡的

## 二. 用 mouse 事件写一个可拖曳的 div

- 给需要拖拽的节点绑定`mousedown`, `mousemove`, `mouseup`事件
- `mousedown`事件触发后，开始拖拽
- `mousemove`时，需要通过`event.clientX`和`clientY`获取拖拽位置，并实时更新位置
- `mouseup`时，拖拽结束
- 需要注意浏览器边界的情况

## 三. 给DOM元素绑定事件有哪些方法？

有以下三种方法。

- 使用内联
- 使用`onclick`的方式
- 使用事件监听`addEventListener`的方式

### 使用内联

```html
<input type="button" value="按钮" onclick="alert(1);">
```

这种方式就是在一个元素上面直接绑定了一个点击`onclick`事件，此事件为**DOM 0级标准**。同时，这个事件的优先级是最高的。

### 使用on事件名的方式

```html
<input type="button" value="按钮">

<script type="text/javascript">
	var bt = document.getElementsBytagname("input")[0];
	bt.onclick = function(){
		alert(2)
	}
</script>
```

使用这种形式也是可以给一个`DOM`元素添加上一个事件，这个也是**DOM 0级标准**。

**弊端**

以上两种方式都是存在一个弊端的，就是一个元素只能添加一个事件。

### addEventListener

```html
<input type="button" value="按钮">

<script type="text/javascript">
	var bt = document.getElementsBytagname("input")[0];
	bt.addEventListener("click", function(){
		alert(1)
	})
	bt.addEventListener("click", function(){
		alert(2)
	})
</script>
```

上面的方式就可以给一个DOM对象绑定一个或者是多个事件。**强烈推荐使用这一种绑定事件的方式**。

`addEventListener`有三个参数

1. 事件类型，**不需要**添加上`on`
2. 事件函数
3. 是否开启事件捕获（布尔值），默认是`false`，即不捕获，那就是事件冒泡。

#### 取消绑定

取消一个使用`addEventListener`绑定的事件函数，可以使用`removeEventListener`。

## 四. 关于事件代理（委托）

一般情况下，如果一个元素下存在多个点击事件，代码结构如下：

```html
<ul id="box">
	<li>list-1</li>
	<li>list-2</li>
	<li>list-3</li>
	<li>list-4</li>
</ul>
```

此时，如果你要给每一个`li`标签添加一个点击事件，弹出每一个`li`的索引值，初学者可能会使用`for`循环的方式或者是使用闭包。

但是以上两种都不是一个最好的方法，因为需要不断的与`dom`节点进行交互，访问`dom`的次数越多，引起浏览器重绘与重排的次数也就越多，就会延长整个页面的交互就绪时间。那么，此时如果使用事件代理的方式，效果会更好。 

### 事件委托的原理

事件委托是利用事件的冒泡原理来实现的，何为事件冒泡呢？

就是事件从最深的节点开始，然后逐步向上传播事件，举个例子：页面上有这么一个节点树，`div`>`ul`>`li`>`a`;比如给最里面的`a`加一个`click`点击事件，那么这个事件就会一层一层的往外执行，执行顺序`a`>`li`>`ul`>`div`，有这样一个机制，那么我们给最外面的`div`加点击事件，那么里面的`ul`，`li`，`a`做点击事件的时候，都会冒泡到最外层的`div`上，所以都会触发，这就是事件委托，委托它们父级代为执行事件。

### 事件委托的实现

```js
var oBox = document.getElementById("box");
oBox.addEventListener('click',function(e){
	var target = e.target;
	// 判断点击的是li
	if ( target.nodeName == 'LI' ) {
		alert(target.innerHTML)
	}
})
```

