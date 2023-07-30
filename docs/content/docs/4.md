# 简单实现 Vue 的双向数据绑定

Vue 的双向数据绑定的核心是`Object.defineProperty()`,通过这个方法来劫持各个属性的`setter`，`getter`，在数据变动时同时改变绑定这个数据的元素的值。这个方法有三个参数。

1. 要绑定的对象
2. 绑定对象操作的值
3. 对应的方法

#### 数据属性

在第三个参数内，可以设置以下几个数据属性

1. **Configurable**: 表示能否通过`delete`将属性删除，能否把属性修改为访问器属性, 默认为`false`。当把属性`Configurable`设置为`false`后，该属性不能通过 delete 删除，并且也无法再将该属性的`Configurable`设置回`true`
2. **Enumerable**: 表示属性可否被枚举(即是否可以通过`for in`循环返回)，默认`false`
3. **Writable**: 表示属性是否可写(即是否可以修改属性的值)，默认`false`
4. **Value**: 该属性的数据值, 默认是`undefined`

#### 访问器属性

还有以下两个访问器属性

1. **Get**: 读取属性时调用的函数, 默认为`undefined`
2. **Set**: 写入属性时调用的函数, 默认是`undefined`

#### 代码

```html
<input id="txt" type="text" autocomplete="off" />
<p id="p"></p>
```

```js
const oTxt = document.querySelector('#txt')
const oP = document.querySelector('#p')
var data = {}
Object.defineProperty(data, 'val', {
  configurable: true,
  enumerable: true,
  get() {},
  set(val) {
    // 在每次设置data中的val属性时,都改变p标签和文本框的值
    oTxt.value = val
    oP.innerHTML = val
  },
})
oTxt.addEventListener('input', function (event) {
  // 每次输入值的时候就把值传给data中的val属性
  data.val = event.target.value
})
```

#### 实现

<input id="txt" type="text" autocomplete="off" placeholder="在这输入试试">

<p id="p"></p>

<script type="text/javascript">
const oTxt = document.querySelector('#txt');
			const oP = document.querySelector('#p')
			var data = {}
			Object.defineProperty(data,'val',{
				configurable: true,// 是否可配置
				enumerable: true,// 是否可枚举
				get(){},
				set(val){
					// 在每次设置data中的val属性时,都改变p标签和文本框的值
					oTxt.value = val;
					oP.innerHTML = val;
				}
			})
			oTxt.addEventListener('input', function(event){
				// 每次输入值的时候就把值传给data中的val属性
				data.val = event.target.value
			})
</script>

#### 最后

这只是简单的实现了双向数据绑定，Vue 的绑定更复杂些，以后再写啦~
