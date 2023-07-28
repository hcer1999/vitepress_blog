# Vue篇

<!-- 目录
[[toc]] -->

## 一. watch 和 computed 和 methods 区别是什么？

### watch

用法：监听一个值，当值发生变化的时候，可以执行一个函数。

::: details 点击查看示例

```html
<div>
      <p>FullName: {{fullName}}</p>
      <p>FirstName: <input type="text" v-model="firstName"></p>
</div>
```

```js
new Vue({
  el: '#root',
  data: {
    firstName: 'Dawei',
    lastName: 'Lou',
    fullName: ''
  },
  watch: {
    firstName(newName, oldName) {
      this.fullName = newName + ' ' + this.lastName;
// 监听firstName的值
// 方法中有两个参数，一个个是改变后的值，第二个是改变前的值
    }
  } 
})
```

:::

::: danger 注意

**不应该使用箭头函数来定义 watcher 函数** (例如 `searchQuery: newValue => this.updateAutocomplete(newValue)`)。理由是箭头函数绑定了父级作用域的上下文，所以 `this` 将不会按照期望指向 Vue 实例，`this.updateAutocomplete` 将是 undefined。

:::

### computed

用法：当你想要在模板中多次引用此处的翻转字符串时，就会更加难以处理。

所以，对于任何复杂逻辑，你都应当使用**计算属性**。

::: details 点击查看示例

```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```

:::

::: tip 注意

计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。注意，如果某个依赖 (比如非响应式属性) 在该实例范畴之外，则计算属性是**不会**被更新的。

:::

### methods

用法：`methods` 将被混入到 `Vue` 实例中。可以直接通过 `VM` 实例访问这些方法，或者在指令表达式中使用。方法中的 `this` 自动绑定为 `Vue` 实例。

::: details 点击展开示例

```js
var vm = new Vue({
  data: { a: 1 },
  methods: {
    plus: function () {
      this.a++
    }
  }
})
vm.plus()
vm.a // 2
```

:::

::: danger 注意

注意，**不应该使用箭头函数来定义 method 函数** (例如 `plus: () => this.a++`)。理由是箭头函数绑定了父级作用域的上下文，所以 `this` 将不会按照期望指向 Vue 实例，`this.a` 将是 undefined。

:::

### 区别

`computed`是在`HTML` `DOM`加载后马上执行的，如赋值

`methods`则必须要有一定的触发条件才能执行，如点击事件

`watch`则是用于观察`Vue`实例上的数据变动。对应一个对象，键是观察表达式，值是对应回调。值也可以是方法名，或者是对象，包含选项。

所以他们的执行顺序为：默认加载的时候先`computed`再`watch`，不执行`methods`；等触发某一事件后，则是：先`methods`再`watch`。

`computed` vs `watched` ：Vue 确实提供了一种更通用的方式来观察和响应 `Vue` 实例上的数据变动：`watch` 属性。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 `watch`，通常更好的想法是使用 `computed` 属性而不是命令式的 `watch` 回调。

## 二. Vue 有哪些生命周期钩子函数？分别有什么用？

- beforecreated：

   实例初始化之后，this指向创建的实例，不能访问到`data`、`computed`、`watch`、`methods`上的方法和数据

- created：

  实例创建完成，可访问`data`、`computed`、`watch`、`methods`上的方法和数据，未挂载到`DOM`，不能访问到`$el`属性，`$ref`属性内容为空数组

- beforeMount：

  在挂载开始之前被调用，`beforeMount`之前，会找到对应的`template`，并编译成`render`函数

- mounted：

   实例挂载到DOM上，此时可以通过`DOM API`获取到`DOM`节点，`$ref`属性可以访问

- beforeUpdate： 

  响应式数据更新时调用，发生在虚拟`DOM`打补丁之前

- updated：

  虚拟 `DOM` 重新渲染和打补丁之后调用，组件`DOM`已经更新，可执行依赖于`DOM`的操作

- beforeDestroy：

  实例销毁之前调用。这一步，实例仍然完全可用，`this`仍能获取到实例

- destroyed：

  实例销毁后调用，调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁

**总结**

`beforecreate`：可以在这加个loading事件

`created` ：在这结束loading，还做一些初始化，实现函数自执行

`mounted` ： 在这发起后端请求，拿回数据，配合路由钩子做一些事情

`beforeDestroy`： 你确认删除XX吗？ destroyed ：当前组件已被删除，清空相关内容

## 三. Vue 如何实现组件间通信？

### 父组件向子组件传值

::: details 点击展开示例

```vue
<!--App.vue父组件-->
<template>
  <div id="app">
    <users v-bind:users="users"></users>
<!--前者自定义名称便于子组件调用，后者要传递数据名-->
  </div>
</template>
<script>
import Users from "./components/Users"
export default {
  name: 'App',
  data(){
    return{
      users:["Henry","Bucky","Emily"]
    }
  },
  components:{
    "users":Users
  }
}
```

```vue
<!--users子组件-->
<template>
  <div class="hello">
    <ul>
      <li v-for="user in users">{{user}}</li>
        <!--遍历传递过来的值，然后呈现到页面-->
    </ul>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  props:{
    users:{           
      //这个就是父组件中子标签自定义名字
      type:Array,
      required:true
    }
  }
}
</script>
```

:::

总结：父组件通过`props`向下传递数据给子组件。注：组件中的数据共有三种形式：`data`、`props`、`computed`

### 子组件向父组件传值（通过事件形式）

::: details 点击展开示例

```vue
<!--父组件-->
<template>
  <div id="app">
    <app-header v-on:titleChanged="updateTitle" ></app-header>
   <!--与子组件titleChanged自定义事件保持一致-->
   <!--updateTitle($event)接受传递过来的文字-->
    <h2>{{title}}</h2>
  </div>
</template>
<script>
import Header from "./components/Header"
export default {
  name: 'App',
  data(){
    return{
      title:"传递的是一个值"
    }
  },
  methods:{
    updateTitle(e){   //声明这个函数
      this.title = e;
    }
  },
  components:{
   "app-header":Header,
  }
}
</script>
```

```vue
<!--子组件-->
<template>
  <header>
    <h1 @click="changeTitle">{{title}}</h1>
	<!--绑定一个点击事件-->
  </header>
</template>
<script>
export default {
  name: 'app-header',
  data() {
    return {
      title:"Vue.js Demo"
    }
  },
  methods:{
    changeTitle() {
      this.$emit("titleChanged","子向父组件传值");//自定义事件  传递值“子向父组件传值”
    }
  }
}
</script>
```

:::

总结：子组件通过`events`给父组件发送消息，实际上就是子组件把自己的数据发送到父组件。

### $emit/$on(全组件传值)

这种方法通过一个空的`Vue`实例作为中央事件总线（事件中心），用它来触发事件和监听事件,巧妙而轻量地实现了任何组件间的通信，包括父子、兄弟、跨级。

#### 实现方式

```js
var Event=new Vue();
Event.$emit(事件名,数据);
Event.$on(事件名,data => {});
```

::: details 点击展开示例
```vue
<div id="itany">
	<my-a></my-a>
	<my-b></my-b>
	<my-c></my-c>
</div>
<template id="a">
  <div>
    <h3>A组件：{{name}}</h3>
    <button @click="send">将数据发送给C组件</button>
  </div>
</template>
<template id="b">
  <div>
    <h3>B组件：{{age}}</h3>
    <button @click="send">将数组发送给C组件</button>
  </div>
</template>
<template id="c">
  <div>
    <h3>C组件：{{name}}，{{age}}</h3>
  </div>
</template>
<script>
var Event = new Vue();//定义一个空的Vue实例
var A = {
	template: '#a',
	data() {
	  return {
	    name: 'tom'
	  }
	},
	methods: {
	  send() {
	    Event.$emit('data-a', this.name);
	  }
	}
}
var B = {
	template: '#b',
	data() {
	  return {
	    age: 20
	  }
	},
	methods: {
	  send() {
	    Event.$emit('data-b', this.age);
	  }
	}
}
var C = {
	template: '#c',
	data() {
	  return {
	    name: '',
	    age: ""
	  }
	},
	mounted() {//在模板编译完成后执行
	 Event.$on('data-a',name => {
	     this.name = name;//箭头函数内部不会产生新的this，这边如果不用=>,this指代Event
	 })
	 Event.$on('data-b',age => {
	     this.age = age;
	 })
	}
}
var vm = new Vue({
	el: '#itany',
	components: {
	  'my-a': A,
	  'my-b': B,
	  'my-c': C
	}
});	
</script>
```
:::

### Vuex

请看第七题

## 四. Vue 数据响应式(双向数据绑定)怎么做到的？

Vue响应式的核心是`Object.defineProperty()`,通过这个方法来劫持各个属性的`setter`，`getter`，在数据变动时同时改变绑定这个数据的元素的值。他有3个参数，分别是：

1. 要绑定的对象
2. 绑定对象操作的值
3. 对应的方法

**代码**

```html
<input id="txt" type="text" autocomplete="off">
<p id="p"></p>
```

```js
const oTxt = document.querySelector('#txt');
const oP = document.querySelector('#p')
var data = {}
Object.defineProperty(data,'val',{
    configurable: true,
    enumerable: true,
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
```

## 五. Vue.set()和this.$set()是做什么用的？

在我们使用`vue`进行开发的过程中，可能会遇到一种情况：当生成vue实例后，当再次给数据赋值时，有时候并不会自动更新到视图上去；

当我们去看`vue`文档的时候，会发现有这么一句话：**如果在实例创建之后添加新的属性到实例上，它不会触发视图更新**。

如下代码：

```js
data () {
  return {
    student: {
      name: '',
      sex: ''
    }
  }
}
mounted () { // ——钩子函数，实例挂载之后
  this.student.age = 24
}
```

受 `ES5` 的限制，`Vue.js` 不能检测到对象属性的添加或删除，所以页面不会刷新。因为 `Vue.js` 在初始化实例时将属性转为 getter/setter，所以属性必须在 `data` 对象上才能让 `Vue.js` 转换它，才能让它是响应的。

正确写法：`this.$set(target,key,value)`

- target：要更改的数据源(可以是对象或者数组)
- key：要更改的具体数据
- value ：重新赋的值

```js
mounted () {
  this.$set(this.student,"age", 24)
}
```

**注意**

`Vue.set()`和`this.$set()`功能一样，不过`this.$set()`是在`methods`中调用的

> [原文地址](https://juejin.im/post/5d3c7dcfe51d45572c060131)

## 七. Vuex 你怎么用的？

`Vuex` 是一个专为 `Vue.js` 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

Vuex有五大核心概念

- State

  `state` 定义了应用状态的数据结构，同样可以在这里设置默认的初始状态，类似于`data`。

  ```js
  state: {
    isLogin: true,
    isVip: false
  }
  ```

- Getter

  `Getters` 允许组件从 `Store` 中获取数据，譬如我们可以从 `Store` 中的用户是否登录信息。

  ```js
  getters: {
      getLoginState: state => {
      	return state.isLogin
      }
  }
  ```

- Mutation

  调用 `mutations` 是唯一允许更新应用状态(操作State中的数据)的地方。

  ```js
  mutations: {
      Login: state => {
      	state.isLogin = true
      }
  }
  ```

- Action

  `Actions` 即是定义提交触发更改信息的描述，常见的例子有从服务端获取数据，在数据获取完成后会调用`store.commit()`来调用更改 `Store` 中的状态。可以在组件中使用`dispatch`来发出 `Actions`。Action提交的操作是异步的。

  ```js
  actions: {
      Login: function ({ commit }) {
        axios.post('/api/login').then((response) => {
          commit('Login')
        }, (err) => {
          console.log(err)
        })
      }
    }
  ```

- Module

  `modules` 对象允许将单一的 `Store` 拆分为多个 `Store` 的同时保存在单一的状态树中。随着应用复杂度的增加，这种拆分能够更好地组织代码

  ```js
  const moduleA = {
    state: { ... },
    mutations: { ... },
    actions: { ... },
    getters: { ... }
  }
  
  const moduleB = {
    state: { ... },
    mutations: { ... },
    actions: { ... }
  }
  
  const store = new Vuex.Store({
    modules: {
      a: moduleA,
      b: moduleB
    }
  })
  
  store.state.a // -> moduleA 的状态
  store.state.b // -> moduleB 的状态
  ```

## 八. VueRouter 你怎么用的？

vue-router在单页面应用中,主要用于组件之间的切换.

**其本质就是:建立并管理url和对应组件之间的映射关系.**

在`HTML`中，有两个组件，分别是：

- **router-link**

  会被渲染成`a`标签用来导航，用户点击后切换到相关视图。

- **router-view**

  用来设置切换的视图在哪里渲染.(一个页面也可以有多个`router-view`分别展示特定的视图,并且支持嵌套)

我们有以下几种办法来切换：

- **HTML方式**

  ```html
  <div id="app">
    <h1>Hello App!</h1>
    <p>
      <!-- 使用 router-link 组件来导航. -->
      <!-- 通过传入 `to` 属性指定链接. -->
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <router-link to="/foo">Go to Foo</router-link>
      <router-link to="/bar">Go to Bar</router-link>
    </p>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
  ```

- **JavaScript方式**

  要想在JS中实现路由的跳转，需要以下准备：

  - 导入`vue-router`包
  - 引入需要跳转的组件
  - 通过`new VueRouter()`详细配置每个路由的路径
  - 将路由实例挂载到根实例上，`new Vue({router}).$mount('#app')`

  使用以下代码，来配置路由

  ```js
  // 1. 定义 (路由) 组件。
  // 可以从其他文件 import 进来
  const Foo = { template: '<div>foo</div>' }
  const Bar = { template: '<div>bar</div>' }
  
  // 2\. 定义路由
  // 每个路由应该映射一个组件。 其中"component" 可以是
  // 通过 Vue.extend() 创建的组件构造器，
  // 或者，只是一个组件配置对象。
  // 我们晚点再讨论嵌套路由。
  const routes = [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
  ]
  
  // 3\. 创建 router 实例，然后传 `routes` 配置
  // 你还可以传别的配置参数, 不过先这么简单着吧。
  const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
  })
  
  // 4\. 创建和挂载根实例。
  // 记得要通过 router 配置参数注入路由，
  // 从而让整个应用都有路由功能
  const app = new Vue({
    router
  }).$mount('#app')
  ```

  通过注入路由器，我们可以在任何组件内通过 `this.$router` 访问路由器。

  ```js
  methods: {
      goBack () {
        this.$router.push('/')
        // 跳转到指定路由
        this.$router.go(-1)
        // 类似浏览器的前进与后退
     }
  }
  ```

## 九. $router和$route的区别是什么？

- `$router`是指整个**路由实例**,你可以操控整个路由,通过`$router.push`往其中添加任意的路由对象
- `$route`:是指当前路由实例('$router')跳转到的**路由对象**
- 路由实例可以包含多个路由对象.它们是父子包含关系

```js
this.$route.params.username
// 这样我们就可以获取到当前路由的查询语句中的username
```

```js
this.$router.push('/')
// 跳转到指定路由
this.$router.go(-1)
// 类似浏览器的前进与后退
```

## 十. 导航(路由)守卫是什么？

导航守卫就是路由跳转过程中的一些钩子函数，再直白点路由跳转是一个大的过程，这个大的过程分为跳转前中后等等细小的过程，在每一个过程中都有一函数，这个函数能让你操作一些其他的事儿的时机，这就是导航守卫。

**导航守卫的钩子函数：**

- **beforeEach：全局前置守卫**

  即，当一个导航触发时，则调用此函数。

  ```js
  const router = new VueRouter({ ... })
  
  router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  })
  ```

- **beforeResolve：全局解析守卫**

  **2.5.0新增**，和 `router.beforeEach` 类似，，区别是在导航被确认之前，**同时在所有组件内守卫和异步路由组件被解析之后**，解析守卫就被调用。

- **afterEach：全局后置守卫**

  没有`next`函数，导航执行的最后调用此函数。

  ```js
  router.afterEach((to, from) => {
    // ...
  })
  ```

- **beforeEnter：路由独享的守卫**

  针对某个路由设置独享的守卫

  ```js
  const router = new VueRouter({
    routes: [
      {
        path: '/foo',
        component: Foo,
        beforeEnter: (to, from, next) => {
          // ...
        }
      }
    ]
  })
  ```

- **组件内的守卫**

  可以在路由组件内直接定义以下路由导航守卫

  - **beforeRouteEnter**

    ```js
    const Foo = {
      template: `...`,
      beforeRouteEnter (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
      }
    }
    ```

  - **beforeRouteUpdate** (2.2 新增)

    ```js
    const Foo = {
      template: `...`,
      beforeRouteUpdate (to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
      }
    }
    ```

  - **beforeRouteLeave**

    ```js
    const Foo = {
      template: `...`,
      beforeRouteLeave (to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
      }
    }
    ```

> [官方对于导航守卫的介绍](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)

## 十一. 为什么使用v-for时必须添加唯一的key?

`key`的作用主要是为了高效的更新虚拟`DOM`。另外`vue`中在使用相同标签名元素的过渡切换时，也会使用到`key`属性，其目的也是为了让`vue`可以区分它们，否则`vue`只会替换其内部属性而不会触发过渡效果。

::: danger 注意

key的值不建议使用循环中的`index`或者`random`随机数

:::

## 十二. Vue如何清空data数据?(未解答)

等你来回答...

## 十三. Vue如何设置全局方法?

可以在main.js里进行全局注册

```js
Vue.prototype.fun = function (){
    console.log('这是一个全局方法')
}
```

在其他组件内，可以通过`this.fun`来调用。

## 十四. Watch监视函数能写成箭头函数吗，为什么？

**不能使用箭头函数来定义 watcher 函数** (例如 `searchQuery: newValue => this.updateAutocomplete(newValue)`)。

理由是箭头函数绑定了父级作用域的上下文，所以 `this` 将不会按照期望指向 Vue 实例，`this.updateAutocomplete` 将是 `undefined`。

## 十五. Vue为什么只有一个根组件，原因是什么?

我们在`body`里新增一个`id`为`app`的`div`，就是给`Vue`开启一个入口，这个入口，就是一个`Vue`类，`Vue`在渲染数据的时候，会把渲染的数据插入到这个入口中，如果发现`Vue`类不止一个，那么`Vue`就无法识别，不知道那个才是这个入口类。

----

**当我们在`webpack`搭建的`Vue`开发环境下,为什么template下也必须有且只能有一个div呢？**

简单来说就是，组件的`template`最终会转换成`VNode`对象，一个组件对应一个根元素对应一个`VNode`对象。从效率上，如果多个根，那么就会产生多个入口（遍历、查找）从效率上来说都不方便。

然后我们看一看`template`这个标签，这个标签是`HTML5`出来的新标签，它有三个特性：

1. 隐藏性：该标签不会显示在页面的任何地方，即便里面有多少内容，它永远都是隐藏的状态；

2. 任意性：该标签可以写在页面的任何地方，甚至是head、body、sciprt标签内；

3. 无效性：该标签里的任何HTML内容都是无效的，不会起任何作用；

但是呢，你可以通过`innerHTML`来获取到里面的内容。

知道了这个，我们再来看`.vue`的单文件组件。其实本质上，一个单文件组件，本质上（我认为）会被各种各样的`loader`处理成为`.js`文件（因为当你`import`一个单文件组件并打印出来的时候，是一个`vue`实例），通过`template`的任意性我们知道，`template`包裹的`HTML`可以写在任何地方，那么对于一个`.vue`来讲，这个`template`里面的内容就是会被`vue`处理为虚拟`dom`并渲染的内容，导致结果又回到了开始 ：既然一个`.vue`单文件组件是一个`vue`实例，那么这个实例的入口在哪里？

如果在`template`下有多个`div`，那么该如何指定这个`vue`实例的根入口？
为了让组件能够正常的生成一个`vue`实例，那么这个`div`会被自然的处理成程序的入口。

**通过这个‘根节点’，来递归遍历整个`vue`‘树’下的所有节点，并处理为`vdom`，最后再渲染成真正的`HTML`，插入在正确的位置**

## 十六. Vue监听数组变化的方法有哪些(未解答)

等你来解答...

## 十七. Vue中img通过src动态绑定的图片无法显示，怎么解决?

`webpack`官网大图告诉我们，资源经过`loader`处理，变成处理好的文件。如果不用`require`的话，图片资源是不会加入的。

所以我们应该这样引入

```js
imges:[
  {src:require("../../assets/imges/homePageSwipe/timg.jpg")},
  {src:require("../../assets/imges/homePageSwipe/timg1.jpg")},
  {src:require("../../assets/imges/homePageSwipe/timg2.jpg")},
  {src:require("../../assets/imges/homePageSwipe/timg3.jpg")}
]
```

## 十八. $nextTick是做什么的?

`$nextTick`可以让我们在下次 `DOM` 更新循环结束之后执行延迟回调，用于获得更新后的 `DOM`

我们可以看这样的例子：

::: details 展开代码详情

```html
<div class="app">
  <div ref="msgDiv">{{msg}}</div>
  <div v-if="msg1">Message got outside $nextTick: {{msg1}}</div>
  <div v-if="msg2">Message got inside $nextTick: {{msg2}}</div>
  <div v-if="msg3">Message got outside $nextTick: {{msg3}}</div>
  <button @click="changeMsg">
    Change the Message
  </button>
</div>
```

```js
new Vue({
  el: '.app',
  data: {
    msg: 'Hello Vue.',
    msg1: '',
    msg2: '',
    msg3: ''
  },
  methods: {
    changeMsg() {
      this.msg = "Hello world."
      this.msg1 = this.$refs.msgDiv.innerHTML
      this.$nextTick(() => {
        this.msg2 = this.$refs.msgDiv.innerHTML
      })
      this.msg3 = this.$refs.msgDiv.innerHTML
    }
  }
})
```

:::

**改变前**

![img](http://cdn.bingkele.cc/FuFq5h6n30LbgTyknJTK36-7y8CX)

**改变后**

![](http://cdn.bingkele.cc/FhyJA8l354gVU7-2hEQnlxkBdLEP)

可以得知：`msg1`和`msg3`显示的内容还是变换之前的，而`msg2`显示的内容是变换之后的。其根本原因是因为`Vue`中`DOM`更新是异步的

### 应用场景

- 在Vue生命周期的`created()`钩子函数进行的`DOM`操作一定要放在`this.$nextTick()`的回调函数中
- 在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的`DOM`结构的时候，这个操作都应该放进`this.$nextTick()`的回调函数中。

## 十九.Proxy 可以实现什么功能？  

在 `Vue3.0` 中通过 `Proxy` 来替换原本的`Object.defineProperty`来实现数据响应式。`Proxy` 是 `ES6` 中新增的功能， 它可以用来自定义对象中的操作。  

```javascript
let p = new Proxy(target, handler)
```

`target`代表需要添加代理的对象， `handler` 用来自定义对象中的操作， 比如可以用来自定义 `set` 或者 `get` 函数。  

下面来通过 `Proxy` 来实现一个数据响应式：  

```javascript
let onWatch = (obj, setBind, getLogger) => {
  let handler = {
    get(target, property, receiver) {
      getLogger(target, property)
      return Reflect.get(target, property, receiver)
    },
    set(target, property, value, receiver) {
      setBind(value, property)
      return Reflect.set(target, property, value)
    },
  }
  return new Proxy(obj, handler)
}
let obj = { a: 1 }
let p = onWatch(
  obj,
  (v, property) => {
    console.log(`监听到属性${property}改变为${v}`)
  },
  (target, property) => {
    console.log(`"${property} = ${target[property]}`)
  }
)
p.a = 2 //监听到属性a改变
p.a     // 'a' = 2
```

在上述代码中，通过自定义 `set` 和 `get` 函数的方式，在原本的逻辑中插入了我们的函数逻辑，实现了在对对象任何属性进行读写时发出通知。
当然这是简单版的响应式实现，如果需要实现一个 `Vue` 中的响应式，需要在 `get` 中收集依赖， 在 `set` 派发更新，之所以 `Vue3.0` 要使用`Proxy` 替换原本的 API 原因在于 `Proxy` 无需一层层递归为每个属性添加代理，一次即可完成以上操作，性能上更好，并且原本的实现有一些数据更新不能监听到， 但是 `Proxy` 可以完美监听到任何方式的数据改变，唯一缺陷就是浏览器的兼容性不好。

