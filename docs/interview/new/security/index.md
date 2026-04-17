## 1. 说说你对 XSS 的了解

**参考答案：**

一、初探`XSS`

跨站脚本攻击，英文全称是 `Cross Site Script`，本来缩写是 `CSS`，但是为了和层叠样式表（`Cascading Style Sheet`，`CSS`）有所区别，所以在安全领域叫做“`XSS`”。

`XSS`攻击，通常指黑客通过`HTML`注入 篡改网页，插入恶意脚本，从而在用户浏览网页时，控制用户浏览器的一种攻击行为。在这种行为最初出现之时，所有的演示案例全是跨域行为，所以叫做 "跨站脚本" 。时至今日，随着`Web`端功能的复杂化，应用化，是否跨站已经不重要了，但 `XSS`这个名字却一直保留下来。

随着`Web`发展迅速发展，`Web`开发已经被应用的非常广泛了，由之前的单一`PC`端扩展到现在的移动端（`APP`、`H5`），甚至包括桌面工具、设备大屏等等，所以在产生的应用场景越来越多，越来越复杂的情况下，同时大多数互联网（尤其是传统行业）的产品开发版本迭代上线时间非常短，一周一版本，两周一大版本的情况下，忽略了安全这一重要属性，一旦遭到攻击，后果将不堪设想。

`二、XSS`攻击类型分类

`XSS`攻击可以分为3类：反射型（非持久型）、存储型（持久型）、基于`DOM XSS`；

反射型

反射型`XSS`只是简单地把用户输入的数据“反射”给浏览器。也就是说，黑客往往需要诱使用户“点击”一个恶意链接，才能攻击成功。反射型`XSS`也叫做 “非持久型 `XSS`”（`Non-persistent XSS`）。

通常反射型`XSS`的恶意代码存在`URL`里，通过`URL`传递参数的功能，如网站搜索、跳转等。由于需要用户主动打开恶意的`URL`才能生效，攻击者往往会结合多种手段诱导用户点击。

一个最初级的反射型攻击是：我们对网页数据进行获取:

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>XSS攻防演练</title>
</head>
<body>
    <div id="t"></div>
    <input id="s" type="button" value="这是一个按钮" onclick="test()">
</body>
<script>
    function test() {
        const arr = [
            '自定义的数据1',
            '自定义的数据2',
            '自定义的数据3',
            '<img src="11" onerror="console.log(window.localStorage)" />'
        ];
        const t = document.querySelector('#t');
        arr.forEach(item => {
            const p = document.createElement('p');
            p.innerHTML = item;
            t.append(p);
        })
    }
</script>
</html>
```

当黑客点击`这是一个按钮`时，即可轻松获取本地`localStorage`数据，从而获取关键信息。

存储型

存储型 `XSS` 会把用户输入的数据“存储”在服务器端。这种 `XSS` 具有很强的稳定性。

比较常见的一个场景就是，黑客写下一篇包含有恶意 `JavaScript` 代码的博客文章，文章发表后，所有访问该博客文章的用户，都会在他们的浏览器中执行这段恶意的 `JavaScript` 代码。 黑客把恶意的脚本保存到服务器端，所以这种 `XSS` 攻击就叫做 “存储型 `XSS`”。

```javascript
<!-- 例如我们分别在网站中的输入框中输入以下信息，并保存到远程数据库 -->
<img src="11" onerror="console.log(window.localStorage)" />
<img src="11" onerror="alert(111)" />
```

![](<images/11. 前端安全（21题）-image-12.png>)

![](<images/11. 前端安全（21题）-image-6.png>)

使用者浏览页面，分别先后触发了`alert`弹框和`localStorage`获取本地数据：

![](<images/11. 前端安全（21题）-image-11.png>)

![](<images/11. 前端安全（21题）-image-10.png>)

以上就是一个典型的存储型攻击。

基于`DOM XSS`

实际上，这种类型的`XSS`并非按照“数据是否保存在服务器端”来划分，`DOM Based XSS`从效果上来说也是反射型`XSS`。单独划分出来，是因为`DOM Based XSS` 的形成原因比较特别，发现它的安全专家专门提出了这种类型的`XSS`。`DOM 型 XSS`跟前两种`XSS`的区别：`DOM 型 XSS`攻击中，取出和执行恶意代码由浏览器端完成，属于前端`JavaScript`自身的安全漏洞，而其他两种`XSS`都属于服务端的安全漏洞。

接下来我们来看一个简单的示例：

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>XSS攻防演练</title>
</head>
<body>
    <h3>基于DOM的XSS</h3>
    <input type="text" id="input">
    <button id="btn">提交内容</button>
    <div id="div"></div>
</body>
<script>
    const input = document.getElementById('input');
    const btn = document.getElementById('btn');
    const div = document.getElementById('div');

    let inputValue;

    input.addEventListener('change', (e) => {
        inputValue = e.target.value;
    }, false);

    btn.addEventListener('click', () => {
        div.innerHTML = `<a href=${inputValue}>链接地址</a>`
    }, false);
</script>
</html>
```

我们在页面输入框中输入以下文本`'' onclick=alert(/xss/)`，这里的`''`引号是为了关闭掉`href`属性，给它赋予了一个空值。然后点击`提交内容`按钮，则页面中的`<div id="div"></div>`标签包含了一下`html`内容

```javascript
<a href onlick="alert(/xss/)">
  链接地址
</a>
```

![](<images/11. 前端安全（21题）-image-9.png>)

`三、XSS`攻击防御

关于`XSS`的防御是非常复杂的，值得幸运的是现代浏览器、前端框架/库已经帮我们做了相当大的一部分工作。

`HttpOnly`

`HttpOnly` 最早是由微软提出，并在`IE 6`中最先实现的，至今已经逐渐成为一个标准。浏览器将禁止页面的`JavaScript`访问带有`HttpOnly`属性的`Cookie`。所以我们需要在`http`的响应头`set-cookie`时设置`httpOnly`，让浏览器知道不能通过`document.cookie`的方式获取到`cookie`内容。

严格地说，`HttpOnly` 并非为了对抗 `XSS——HttpOnly` 解决的是`XSS`后的 `Cookie` 劫持攻击。所以说使用`HttpOnly`有助于缓解`XSS`攻击，但仍然需要其他能够解决`XSS`漏洞的方案；

输入检查

对于用户的输入内容我们需要持怀疑态度。在对输入不做任何过滤检查的情况下用户可能输入任何字符串。比如我们期望输入的内容是：`hello word`, 也许我们收到的内容是`onclick=alert(/xss/)`。

在`XSS`的防御上，输入检查一般是检查用户输入的数据中是否包含一些特殊字符，如`＜、＞、’、”`等。如果发现存在特殊字符，则将这些字符过滤或者编码。这种输入检查的方式，可以称为`“XSS Filter”`。互联网上有很多开源的`“XSS Filter”`的实现。比如一个简单的`htmlencode`转义：

```javascript
const htmlEncode = function (handleString) {
  return handleString
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/ /g, '&nbsp;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;')
}
```

但是输入检查也有弊端，比如

- 攻击者绕过前端页面直接使用接口就可以提交恶意代码到远程库中。

- 输入数据，还可能会被展示在多个地方，每个地方的语境可能各不相同，如果使用单一的替换操作，则可能会出现问题。输入检查也需要有针对性，如果我们想表达的意思是一个数小于另一个数（ `3 < 4`）,前端转义后的字符就变成`3 < 4`，当这个值被存到远端时后，再通过`AJAX`获取使用就会造成不必要的麻烦，比如我就进行数值计算等等。

输出检查

一般来说，除富文本的输出外，在变量输出到`HTML`页面时，可以使用编码或转义的方式来防御`XSS`攻击。

XSS的本质还是一种“HTML 注入”，用户的数据被当成了HTML代码一部分来执行，从而混淆了原本的语义，产生了新的语义。

如同输入检查一样，我们可以对输出进行编码转义。

在`HTML`中输出

比如我们的html代码中有这样一段代码：

```javascript
<div>$htmlVar</div>
<a href="">$htmlVar</a>
```

如果输出的变量没有进行安全处理，直接使用并渲染在页面中，都能导致直接产生`XSS`。最终的结果可能生成一下代码：

```javascript
<div><script>alert('我是一个XSS攻击者')</script></div>
<a href="#"><img href="" onclick="alert('我是另外一个XSS攻击者')"></a>
```

这个预防的方法就是对html进行转义检查

在`HTML`属性中输出

如果我们的html属性时动态值，那么利用属性也可以被攻击；

```javascript
<div id="testXSS" data-name=""></div>
```

现在往`data-name`属性中插入一段未转义的代码`"><script>alert('我是一个XSS攻击者')</script><"`,结果如下：

```javascript
<div id="testXSS" data-name=""><script>alert('我是一个XSS攻击者')</script><""></div>
```

在`<script>`标签中输出

在`<script>`标签中输出时，首先应该确保输出的变量在引号中。

```javascript
<script>// 假设userData是攻击者注入的数据 let xssVar = userData;</script>
```

攻击者需要先闭合引号才能实施XSS攻击：

```javascript
<script>
  // 假设userData是攻击者注入的数据 let xssVar = "";alert('我是一个script XSS攻击者');
</script>
```

在`CSS`中输出

在 `CSS` 和 `style`、`style attribute` 中形成 `XSS` 的方式非常多样化，所以，一般来说，尽可能禁止用户可控制的变量在“`<style>`标签”、“`HTML`标签的`style`属性”以及“`CSS` 文件”中输出。如果一定有这样的需求，则推荐使用一个关于CSS转义库。

四、防御`DOM Based XSS`

`DOM Based XSS`是一种比较特别的`XSS`漏洞，前文提到的几种防御方法都不太适用，需要特别对待。这个本质上，实际上就是网站前端JavaScript代码本身不够严谨，把不可信的数据当作代码执行了。

如果用 `Vue/React` 技术栈，并且不使用 `v-html`/`dangerouslySetInnerHTML`功能，就在前端`render`阶段避免`innerHTML`、`outerHTML`的 `XSS`隐患。稍后会有专门的`Vue`关于`XSS`的防御段落。

会触发`DOM Based XSS`的地方有很多，以下几个地方是`JavaScript`输出到`HTML`页面的必经之路。

- `document.write()`;

- `document.writeln()`;

- `xxx.innerHTML()`;

- `xxx.outerHTML()`;

- `xxx.innerHTML.replace()`;

- `document.attachEvent()`;

- `window.attachEvent()`;

- `window.location()`;

- `window.name()`;

所以开发者需要重点关注这几个地方的参数是否可以被用户控制。如果项目中有用到这些的话，一定要避免在字符串中拼接不可信数据。

`五、Vue`中的`XSS`防御

如果你在项目中使用了`Vue`作为前端开发框架，恭喜你，`Vue`将为你解决绝大多数的`XSS`攻击问题，但是`Vue`不是一个预防`XSS`攻击的框架，在开发使用的时候还是有被攻击的漏洞存在；

`Vue`中的防御措施

不论使用模板还是渲染函数，`Vue`都会将插值的内容都会自动转义。也就是说对于这份模板：

```javascript
<template>
    <p>{{userData}}</p>
</template>

<script>
    // 从远程获取的数据
    userData = "<script>alert('xss')</script>"
</script>
```

最终编译后页面显示的`html`源码内容如下：

```javascript
<p>
  <script>alert('xss')</script>
</p>
```

原因是`Vue`帮我们对数据进行了转义，因此避免了脚本注入。该转义通过诸如 textContent 的浏览器原生的 API 完成，所以除非浏览器本身存在安全漏洞，否则不会存在安全漏洞。转义后的内容如下：

```javascript
&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;
```

注入`HTML`

如果你要动态注入远程的`HTML`内容，首先你应该确保这些内容是安全有效的，否则你应该采取一些防御措施，去过滤或转义掉一些危险的标签符号；例如你可以这样显示的渲染`HTML`：

```javascript
<!-- 当使用模版时 -->
<div v-html="userProvidedHtml"></div>

<!-- 当使用渲染函数时 -->
<script>
    h('div', {
    domProps: {
        innerHTML: this.userProvidedHtml
    }
    })
</script>
<!-- 当使用JSX 的渲染函数时 -->
<div domPropsInnerHTML={this.userProvidedHtml}></div>
```

例如我们可以使用一个简单的方法（或者引用一个更加健壮的库/插件[<span style="color: rgb(36,91,219); background-color: inherit">XSS</span>](https://jsxss.com/zh/index.html)来过滤一遍这个远程的`userProvidedHtml`数据内容，以确保安全；

```javascript
// 一个简单的函数，通过转义<为&lt以及>为&gt来实现防御HTML节点内容
const escape = function (str) {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
```

样式注入

在使用`Vue` 要在模板内避免渲染 `style` 标签:

```javascript
<style>{{ userProvidedStyles }}</style>
```

这是因为，一但通过`userProvidedStyles`，恶意用户仍可以提供 `CSS` 来进行“点击诈骗”，例如将链接的样式设置为一个透明的方框覆盖在“登录”按钮之上。然后再把`https://user-XSS-website.com/` 做成你的应用的登录页的样子，它们就可能获取一个用户真实的登录信息，所以Vue推荐使用`对象语法`且只允许用户提供特定的可以安全控制的`property`的值:

```javascript
<!-- sanitizedUrl应为受控的地址 -->
<a
  v-bind:href="sanitizedUrl"
  v-bind:style="{
    color: userProvidedColor,
    background: userProvidedBackground
  }"
>
  click me
</a>
```

安全问题“没有银弹”

> <span style="color: rgb(36,91,219); background-color: inherit">在解决安全问题的过程中，不可能一劳永逸，也就是说“没有银弹”。</span>
>
> <span style="color: rgb(36,91,219); background-color: inherit">一般来说，人们都会讨厌麻烦的事情，在潜意识里希望能够让麻烦越远越好。而安全，正是一件麻烦的事情，而且是无法逃避的麻烦。任何人想要一劳永逸地解决安全问题，都属于一相情愿，是“自己骗自己”，是不现实的。</span>

最佳实践

通用的规则是只要允许执行未过滤的用户提供的内容 (不论作为 `HTML`、`JavaScript` 甚至 `CSS`)，你就可能令自己处于被攻击的境地。这些建议实际上不论使用 `Vue`、`React`还是别的框架甚至不使用框架，都是成立的。

---

## 2. web常见的攻击方式有哪些，以及如何进行防御？

**参考答案：**

一、是什么

Web攻击（WebAttack）是针对用户上网行为或网站服务器等设备进行攻击的行为

如植入恶意代码，修改网站权限，获取网站用户隐私信息等等

Web应用程序的安全性是任何基于Web业务的重要组成部分

确保Web应用程序安全十分重要，即使是代码中很小的 bug 也有可能导致隐私信息被泄露

站点安全就是为保护站点不受未授权的访问、使用、修改和破坏而采取的行为或实践

我们常见的Web攻击方式有

- XSS (Cross Site Scripting) 跨站脚本攻击

- CSRF（Cross-site request forgery）跨站请求伪造

- SQL注入攻击

二、XSS

XSS，跨站脚本攻击，允许攻击者将恶意代码植入到提供给其它用户使用的页面中

`XSS`涉及到三方，即攻击者、客户端与`Web`应用

`XSS`的攻击目标是为了盗取存储在客户端的`cookie`或者其他网站用于识别客户端身份的敏感信息。一旦获取到合法用户的信息后，攻击者甚至可以假冒合法用户与网站进行交互

举个例子：

一个搜索页面，根据`url`参数决定关键词的内容

```javascript
<input type="text" value="<%= getParameter("keyword") %>">
<button>搜索</button>
<div>
  您搜索的关键词是：<%= getParameter("keyword") %>
</div>
```

这里看似并没有问题，但是如果不按套路出牌呢？

用户输入`"><script>alert('XSS');</script>`，拼接到 HTML 中返回给浏览器。形成了如下的 HTML：

```javascript
<input type="text" value=""><script>alert('XSS');</script>">
<button>搜索</button>
<div>
  您搜索的关键词是："><script>alert('XSS');</script>
</div>
```

浏览器无法分辨出 `<script>alert('XSS');</script>` 是恶意代码，因而将其执行，试想一下，如果是获取`cookie`发送对黑客服务器呢？

根据攻击的来源，`XSS`攻击可以分成：

- 存储型

- 反射型

- DOM 型

存储型

存储型 XSS 的攻击步骤：

1. 攻击者将恶意代码提交到目标网站的数据库中

2. 用户打开目标网站时，网站服务端将恶意代码从数据库取出，拼接在 HTML 中返回给浏览器

3. 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行

4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作

这种攻击常见于带有用户保存数据的网站功能，如论坛发帖、商品评论、用户私信等

反射型 XSS

反射型 XSS 的攻击步骤：

1. 攻击者构造出特殊的 URL，其中包含恶意代码

2. 用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器

3. 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行

4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作

反射型 XSS 跟存储型 XSS 的区别是：存储型 XSS 的恶意代码存在数据库里，反射型 XSS 的恶意代码存在 URL 里。

反射型 XSS 漏洞常见于通过 URL 传递参数的功能，如网站搜索、跳转等。

由于需要用户主动打开恶意的 URL 才能生效，攻击者往往会结合多种手段诱导用户点击。

POST 的内容也可以触发反射型 XSS，只不过其触发条件比较苛刻（需要构造表单提交页面，并引导用户点击），所以非常少见

DOM 型 XSS

DOM 型 XSS 的攻击步骤：

1. 攻击者构造出特殊的 URL，其中包含恶意代码

2. 用户打开带有恶意代码的 URL

3. 用户浏览器接收到响应后解析执行，前端 JavaScript 取出 URL 中的恶意代码并执行

4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作

DOM 型 XSS 跟前两种 XSS 的区别：DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞，而其他两种 XSS 都属于服务端的安全漏洞

XSS的预防

通过前面介绍，看到`XSS`攻击的两大要素：

- 攻击者提交而恶意代码

- 浏览器执行恶意代码

针对第一个要素，我们在用户输入的过程中，过滤掉用户输入的恶劣代码，然后提交给后端，但是如果攻击者绕开前端请求，直接构造请求就不能预防了

而如果在后端写入数据库前，对输入进行过滤，然后把内容给前端，但是这个内容在不同地方就会有不同显示

例如：

一个正常的用户输入了 `5 < 7` 这个内容，在写入数据库前，被转义，变成了 `5 < 7`

在客户端中，一旦经过了 `escapeHTML()`，客户端显示的内容就变成了乱码( `5 < 7` )

在前端中，不同的位置所需的编码也不同。

- 当 `5 < 7` 作为 HTML 拼接页面时，可以正常显示：

```javascript
<div title="comment">5 &lt; 7</div>
```

- 当 `5 < 7` 通过 Ajax 返回，然后赋值给 JavaScript 的变量时，前端得到的字符串就是转义后的字符。这个内容不能直接用于 Vue 等模板的展示，也不能直接用于内容长度计算。不能用于标题、alert 等

可以看到，过滤并非可靠的，下面就要通过防止浏览器执行恶意代码：

在使用 `.innerHTML`、`.outerHTML`、`document.write()` 时要特别小心，不要把不可信的数据作为 HTML 插到页面上，而应尽量使用 `.textContent`、`.setAttribute()` 等

如果用 `Vue/React` 技术栈，并且不使用 `v-html`/`dangerouslySetInnerHTML` 功能，就在前端 `render` 阶段避免 `innerHTML`、`outerHTML` 的 XSS 隐患

DOM 中的内联事件监听器，如 `location`、`onclick`、`onerror`、`onload`、`onmouseover` 等，`<a>` 标签的 `href` 属性，JavaScript 的 `eval()`、`setTimeout()`、`setInterval()` 等，都能把字符串作为代码运行。如果不可信的数据拼接到字符串中传递给这些 API，很容易产生安全隐患，请务必避免

```javascript
<!-- 链接内包含恶意代码 -->
< a href=" ">1</ a>

<script>
// setTimeout()/setInterval() 中调用恶意代码
setTimeout("UNTRUSTED")
setInterval("UNTRUSTED")

// location 调用恶意代码
location.href = 'UNTRUSTED'

// eval() 中调用恶意代码
eval("UNTRUSTED")
```

三、CSRF

CSRF（Cross-site request forgery）跨站请求伪造：攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求

利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目

一个典型的CSRF攻击有着如下的流程：

- 受害者登录a.com，并保留了登录凭证（Cookie）

- 攻击者引诱受害者访问了b.com

- b.com 向 a.com 发送了一个请求：a.com/act=xx。浏览器会默认携带a.com的Cookie

- a.com接收到请求后，对请求进行验证，并确认是受害者的凭证，误以为是受害者自己发送的请求

- a.com以受害者的名义执行了act=xx

- 攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让a.com执行了自己定义的操作

`csrf`可以通过`get`请求，即通过访问`img`的页面后，浏览器自动访问目标地址，发送请求

同样，也可以设置一个自动提交的表单发送`post`请求，如下：

```javascript
<form action="http://bank.example/withdraw" method=POST>
    <input type="hidden" name="account" value="xiaoming" />
    <input type="hidden" name="amount" value="10000" />
    <input type="hidden" name="for" value="hacker" />
</form>
<script> document.forms[0].submit(); </script>
```

访问该页面后，表单会自动提交，相当于模拟用户完成了一次`POST`操作

还有一种为使用`a`标签的，需要用户点击链接才会触发

访问该页面后，表单会自动提交，相当于模拟用户完成了一次POST操作

```javascript
< a href="http://test.com/csrf/withdraw.php?amount=1000&for=hacker" taget="_blank">
    重磅消息！！
<a/>
```

CSRF的特点

- 攻击一般发起在第三方网站，而不是被攻击的网站。被攻击的网站无法防止攻击发生

- 攻击利用受害者在被攻击网站的登录凭证，冒充受害者提交操作；而不是直接窃取数据

- 整个过程攻击者并不能获取到受害者的登录凭证，仅仅是“冒用”

- 跨站请求可以用各种方式：图片URL、超链接、CORS、Form提交等等。部分请求方式可以直接嵌入在第三方论坛、文章中，难以进行追踪

CSRF的预防

CSRF通常从第三方网站发起，被攻击的网站无法防止攻击发生，只能通过增强自己网站针对CSRF的防护能力来提升安全性

防止`csrf`常用方案如下：

- 阻止不明外域的访问

  - 同源检测

  - Samesite Cookie

- 提交时要求附加本域才能获取的信息

  - CSRF Token

  - 双重Cookie验证

这里主要讲讲`token`这种形式，流程如下：

- 用户打开页面的时候，服务器需要给这个用户生成一个Token

- 对于GET请求，Token将附在请求地址之后。对于 POST 请求来说，要在 form 的最后加上

```javascript
<input type=”hidden” name=”csrftoken” value=”tokenvalue”/>
```

- 当用户从客户端得到了Token，再次提交给服务器的时候，服务器需要判断Token的有效性

四、SQL注入

Sql 注入攻击，是通过将恶意的 `Sql `查询或添加语句插入到应用的输入参数中，再在后台 `Sql `服务器上解析执行进行的攻击

![](<images/11. 前端安全（21题）-image-3.png>)

流程如下所示：

- 找出SQL漏洞的注入点

- 判断数据库的类型以及版本

- 猜解用户名和密码

- 利用工具查找Web后台管理入口

- 入侵和破坏

预防方式如下：

- 严格检查输入变量的类型和格式

- 过滤和转义特殊字符

- 对访问数据库的Web应用程序采用Web应用防火墙

上述只是列举了常见的`web`攻击方式，实际开发过程中还会遇到很多安全问题，对于这些问题， 切记不可忽视

---

## 3. 说说你对前端鉴权的理解

**参考答案：**

一、什么是鉴权

鉴权也叫身份认证，指验证用户是否有系统的访问权限。就很像我们经常乘坐动车的票据（对应的标识，一定的时间范围）。

二、认证方式

接下来介绍几种我们工作中通常用到的认证方式。

Session-Cookie 认证

利用服务端的 Session（会话）和浏览器（客户端）的 Cookie 来实现的前后端通信认证模式。

来源

由于 HTTP 请求时是无状态的，服务端正常情况下无法得知请求发送者的身份。这个时候如果我们要记录状态，就需要在服务端创建会话，将相同客户端的请求都维护在各自的会话记录中，每当请求到达服务端时，先校验请求中的用户标识是否存在于 Session 中，如果有则表示已经认证成功，否则表示认证失败。

流程

![](<images/11. 前端安全（21题）-image-8.png>)

实践

boss（我们的一个产品） 这边 Session ID 存在数据库里面，在 Memcached 里面做缓存。客户端每次调用接口的时候会通过 response headers 里面的 Set-Cookie 更新过期时间（boss 这边设置的是 6 个小时），这样做的作用是防止你在做一些复杂操作的时候，cookie 突然过期。

⚠️整个过程是比较重的，因为每次的接口调用都得更新过期时间。

优点：

- 简单易用，浏览器会自动带上

缺点：

- 脱离浏览器没法用，比如原生应用

四、关于 Cookie 的安全问题

Cookie 属性：

![](<images/11. 前端安全（21题）-image-5.png>)

提高安全性的办法

- Expires/Max-Age 设置合理过期时间

- HttpOnly 设置为 true

- Secure 设置为 true（使用 https）

五、Token 认证

来源

负载均衡多服务器的情况，不好确认当前用户是否登录，因为多服务器不共享 Session。这个问题也可以将 Session 存在一个服务器中来解决，但是就不能完全达到负载均衡的效果。

Token 和 Session-Cookie 认证方式中的 Session ID 不同，并非只是一个标识符。Token 一般会包含用户的相关信息，通过验证 Token 不仅可以完成身份校验，还可以获取预设的信息。

客户端可以将 token 存放于 localStroage 等容器中。客户端每次访问都传递 token，服务端解密 token，服务端就不需要存储 Session 占用存储空间，就很好的解决负载均衡多服务器的问题了。

流程

![](<images/11. 前端安全（21题）-image-1.png>)

实践

平常用的最多的就是 JSON Web Token（JWT），也是目前最流行的跨域身份验证解决方案。

JWT 组成：头部. 载荷. 签名

头部和载荷用 base64 编码

签名计算：

```plaintext
    HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload) , secret)
```

使用方法：

```plaintext
    Authorization: Bearer <token>
```

但是 JWT 有个大缺点是服务器不保存会话状态，所以在使用期间不可能取消令牌或更改令牌的权限。也就是说，一旦 JWT 签发，在有效期内将会一直有效。

⚠️载荷的内容任何人都可以读到，不要放入敏感信息

jwt 存储位置的争论：我觉得如果存储信息多，天然防止 csrf 的话，放到 localStorage 或者 sessionStoraged 都行。

除了 JWT 可以提升 token 的安全性，Refresh token 也可以。

业务接口用来鉴权的 token，我们称之为 access token。越是权限敏感的业务，我们越希望 access token 有效期足够短，以避免被盗用。但是过短的有效期会造成 access token 经常过期，过期后怎么办呢？

一种办法是，让用户重新登录获取新 token，显然不够友好，要知道有的 access token 过期时间可能只有几分钟。

另外一种办法是，再来一个 token，一个专门生成 access token 的 token，我们称为 refresh token。

refresh token 的过期时间一般比较长，比如 6 个小时，access token 的过期时间比较短，比如 10 分钟。我们在实际业务中，api 调用时只传递 access token 进行鉴权。如果 access token 过期，则使用 refresh token 去授权服务器更新 access token。最终 refresh token 也过期了，这时候用户就得重新登陆了。

优点：

- 轻量，服务端不用存储，移动端可用

缺点：

- 一旦派发出去，失效之前都是有效的（虽然可以解决，但是就类似于 Session 机制了）

六、单点登录

来源

但当我们业务线越来越多，就会有更多业务系统分散到不同域名下，就需要「一次登录，全线通用」的能力，叫做「单点登录」。

流程

![](<images/11. 前端安全（21题）-image-4.png>)

对浏览器来说，SSO 域下返回的数据要怎么存，才能在访问 A 的时候带上？这就需要也只能由 A 提供 A 域下存储凭证的能力。

![](<images/11. 前端安全（21题）-image-7.png>)

实践

OIDC

1. OIDC 登陆点击，重定向到登录的 OpenID 网站

2. 输入用户名密码，如果验证成功。则会重定向到登陆回调（之前设置好的地址）

3. 回调地址里面有个 code 参数，code 验证正确后，下发 sk，boss 系统登陆成功

4. 前端通过添加 iframe 的方式轮询 authing 链接实现单点登出

七、关于 OIDC

OIDC 是一个 OAuth2 上层的简单身份层协议。它允许客户端验证用户的身份并获取基本的用户配置信息。OIDC 使用 JSON Web Token（JWT）作为信息返回，通过符合 OAuth2 的流程来获取。

八、关于 OAuth2

OAuth2 最终目的是为第三方应用颁发一个有时效性的令牌 token。使得第三方应用能够通过该令牌获取相关的资源。当你想要登录某个论坛，但没有账号，而这个论坛接入了如 QQ、Facebook 等登录功能，在你使用 QQ 登录的过程中就使用的 OAuth 2.0 协议。

![](<images/11. 前端安全（21题）-image-2.png>)

- Client 请求 Resource Owner 的授权。授权请求可以直接向 Resource Owner 请求，也可以通过 Authorization Server 间接的进行。

- Client 获得授权许可。

- Client 向 Authorization Server 请求访问令牌。

- Authorization Server 验证授权许可，如果有效则颁发访问令牌。

- Client 通过访问令牌从 Resource Server 请求受保护资源。

- Resource Server 验证访问令牌，有效则响应请求。

九、关于 LDAP

LDAP (Light Directory Access Portocol)，中文名轻量目录访问协议，是一个开放、广泛被使用的工业标准。比如我们的 Jira、Confluence、Yapi。

但是 LDAP 并不能做到单点登录 SSO，只是可以用同样的用户名和密码可以登陆不同的系统，但达不到一次登陆之后可以访问多个系统。

十、Others 认证方式

2FA（双因素认证）

线上的 boss 必须开启二次认证，会生成一个二维码，那个二维码就是一个 SecretKey，通过 CryptoJS.HmacSHA1（默认算法），每次会计算出一个 6 位（默认长度）随机数。计算公式为

![](<images/11. 前端安全（21题）-image.png>)

⚠️因为默认是 30s 内有效，所以用户手机时间要比较准确

Google 验证器

谷歌身份验证器最早是谷歌为了减少 Gmail 邮箱遭受恶意攻击而推出的两步验证方式，后来被很多网站支持。使用谷歌身份验证器，可以避免比如不久前发生的 Coinbase 短信二次验证导致的安全事故。开启谷歌身份验证之后，登录账户，除了输入用户名和密码，还需要输入谷歌验证器上的动态密码。

谷歌验证器上的动态密码，也称为一次性密码，密码按照时间或使用次数不断动态变化（默认 30 秒变更一次）。它和很多银行发行的动态口令卡类似，可以断网使用，只不过前者是谷歌推出的一个 App，后者是专门的一个硬件。

在手机端生成动态口令后，在Google相关的服务登陆中除了用正常用户名和密码外，需要输入一次动态口令才能验证成功，此举是为了保护用户的信息安全。

与传统单因子密码不同，其采用的是更安全的双因子（2FA two-factor authentication）认证。

FA是指结合密码以及实物（信用卡、SMS手机、令牌或指纹等生物标志）两种条件对用户进行认证的方法。只需要在手机上安装如此高大上的密码生成应用程序，就可以生成一个随着时间变化的一次性密码，用于帐户验证，而且这个应用程序不需要连接网络即可工作。

实际上 `Google Authenticator` 采用的算法是TOTP（`Time-Based One-Time Password`基于时间的一次性密码），其核心内容包括以下三点：

- 一个共享密钥（一个比特序列）；

- 当前时间输入；

- 一个签署函数。

---

## 4. 如何禁止别人调试自己的前端代码？

**参考答案：**

**无限 debugger**

前端页面防止调试的方法主要是通过不断 debugger 来疯狂输出断点，因为 debugger 在控制台被打开的时候就会执行。由于程序被 debugger 阻止，所以无法进行断点调试，所以网页的请求也是看不到的。

以下是使用无限debugger方式阻止代码调试的示例：

```javascript
/**
 * 基础禁止调试代码
 */
;(() => {
  function ban() {
    setInterval(() => {
      debugger
    }, 50)
  }
  try {
    ban()
  } catch (err) {}
})()
```

不过，如果仅仅是加上面那么简单的代码，对于一些技术人员而言作用不大。可以通过控制台中的 Deactivate breakpoints 按钮或者使用快捷键 Ctrl + F8 关闭无限 debugger。这种方式虽然能去掉碍眼的 debugger，但是无法通过左侧的行号添加 breakpoint。

**禁止断点的对策**

如果将 setInterval 中的代码写在一行，就能禁止用户断点，即使添加 logpoint 为 false 也无用。当然即使有些人想到用左下角的格式化代码，将其变成多行也是没用的。

```javascript
;(() => {
  function ban() {
    setInterval(() => {
      debugger
    }, 50)
  }
  try {
    ban()
  } catch (err) {}
})()
```

**忽略执行的代码**

可以通过添加 `add script ignore list` 需要忽略执行代码行或文件，也可以达到禁止无限 debugger。

不过，我们可以通过将 debugger 改写成 `Function("debugger")();` 的形式来应对，Function 构造器生成的 debugger 会在每一次执行时开启一个临时 js 文件。当然使用的时候，为了更加的安全，最好使用加密后的脚本。

```javascript
// 加密前
;(() => {
  function ban() {
    setInterval(() => {
      Function('debugger')()
    }, 50)
  }
  try {
    ban()
  } catch (err) {}
})()

// 加密后
eval(
  (function (c, g, a, b, d, e) {
    d = String
    if (!''.replace(/^/, String)) {
      for (; a--; ) e[a] = b[a] || a
      b = [
        function (f) {
          return e[f]
        },
      ]
      d = function () {
        return 'w+'
      }
      a = 1
    }
    for (; a--; ) b[a] && (c = c.replace(new RegExp('\b' + d(a) + '\b', 'g'), b[a]))
    return c
  })(
    '(()=>{1 0(){2(()=>{3("4")()},5)}6{0()}7(8){}})();',
    9,
    9,
    'block function setInterval Function debugger 50 try catch err'.split(' '),
    0,
    {},
  ),
)
```

**终极增强防调试**

为了让自己写出来的代码更加的晦涩难懂，需要对上面的代码再优化一下：将 `Function('debugger').call()` 改成 `(function(){return false;})['constructor'](debugger)\'call'\`;

并且添加条件，当窗口外部宽高和内部宽高的差值大于一定的值 ，我把 body 里的内容换成指定内容，当然使用的时候，为了更加的安全，最好加密后再使用。

```javascript
;(() => {
  function block() {
    if (
      window.outerHeight - window.innerHeight > 200 ||
      window.outerWidth - window.innerWidth > 200
    ) {
      document.body.innerHTML = '检测到非法调试,请关闭后刷新重试!'
    }
    setInterval(() => {
      ;(function () {
        return false
      })
        ['constructor']('debugger')
        ['call']()
    }, 50)
  }
  try {
    block()
  } catch (err) {}
})()
```

**其他防调试技术**

除此之外，我们还可以通过【禁止右键菜单】、【禁止F12快捷键】、【检测开发者工具】等手段来禁止调试。

禁止右键菜单

禁止右键菜单是目前比较常见的一种禁止调试的方法，因为浏览器默认右键菜单是可以调出开发者工具的。可以通过以下JS代码实现：

```javascript
document.oncontextmenu = function () {
  return false
}
```

这样一来，当用户在富文本编辑器的区域内右键时，就不会弹出菜单，从而避免了用户调出开发者工具的情况。

禁止F12快捷键

F12快捷键是打开开发者工具的常用快捷键，禁止这个快捷键也是一种禁止调试的方法。可以通过以下JS代码实现：

```javascript
document.onkeydown = function (e) {
  if (e.keyCode === 123) {
    return false
  }
}
```

这样一来，当用户按下F12键时，就会被拦截，从而避免了用户打开开发者工具的情况。

检测开发者工具

还有一种方法是通过检测开发者工具是否打开来实现禁止调试的目的，可以通过以下JS代码实现：

```javascript
setInterval(function () {
  if (typeof console.clear !== 'undefined') {
    location.reload()
  }
}, 1000)
```

这段代码会每隔1秒检测一次当前页面是否打开了开发者工具，如果发现开发者工具已经打开，则会刷新当前页面，从而避免用户使用开发者工具对页面进行调试。

---

## 5. CSP（Content Security Policy）可以解决什么问题?

**参考答案：**

CSP（Content Security Policy）是为了解决 Web 应用程序中的安全问题而创建的一种规范。

CSP 通过限制 Web 应用程序能够加载和执行的内容，来减少恶意攻击的成功率。具体来说，CSP 允许 Web 应用程序管理员定义哪些来源可以加载资源和运行 JavaScript 等代码。这些源可以是域名、协议或端口号等。

当浏览器尝试加载一个 Web 页面时，它会检查页面是否包含 CSP 头，并根据该头信息确定允许加载哪些资源。如果某个资源的来源不在允许列表内，则浏览器将停止加载该资源并向用户发出警告。这样就可以防止注入恶意代码并帮助保护用户隐私和身份。

CSP 的工作流程如下：

- 客户端请求 Web 页面。

- 服务器返回 Web 页面及相关资源，并设置 CSP 头。

- 浏览器解析 Web 页面，并根据 CSP 头信息确定允许加载哪些资源。

- 如果某个资源的来源不在允许列表内，则浏览器将停止加载该资源并向用户发出警告。

需要注意的是，在实际应用中，Web 开发人员需要谨慎设置 CSP 规则，以确保不会限制正常的 Web 应用程序功能。此外，开发人员也需要定期审核 CSP 规则，以确保其仍然适用于最新的 Web 应用程序版本。

总之，CSP 的原理是通过限制 Web 应用程序能够加载和执行的内容，来减少恶意攻击的成功率。它可以帮助保护用户隐私和身份，并提高 Web 应用程序的安全性。

---

## 6. 前端怎么实现跨域请求？

**参考答案：**

什么是跨域？

什么是同源策略及其限制内容？

同源策略是一种约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到XSS、CSRF等攻击。所谓同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个ip地址，也非同源。

同源策略限制内容有：

- Cookie、LocalStorage、IndexedDB 等存储性内容

- DOM 节点

- AJAX 请求发送后，结果被浏览器拦截了

但是有三个标签是允许跨域加载资源：

- `<img src=XXX>`

- `<link href=XXX>`

- `<script src=XXX>`

常见跨域场景

当协议、子域名、主域名、端口号中任意一个不相同时，都算作不同域。不同域之间相互请求资源，就算作“跨域”。

特别说明两点：

- 第一：如果是协议和端口造成的跨域问题“前台”是无能为力的。

- 第二：在跨域问题上，仅仅是通过“URL的首部”来识别而不会根据域名对应的IP地址是否相同来判断。“URL的首部”可以理解为“协议, 域名和端口必须匹配”。

跨域并不是请求发不出去，请求能发出去，服务端能收到请求并正常返回结果，只是结果被浏览器拦截了。你可能会疑问明明通过表单的方式可以发起跨域请求，为什么 Ajax 就不会?因为归根结底，跨域是为了阻止用户读取到另一个域名下的内容，Ajax 可以获取响应，浏览器认为这不安全，所以拦截了响应。但是表单并不会获取新的内容，所以可以发起跨域请求。同时也说明了跨域并不能完全阻止 CSRF，因为请求毕竟是发出去了。

跨域有哪些方案？

这里只介绍几种开发中用的比较多的，几乎用不到的比如：

- document.domain + iframe：适用主域名相同，子域名不同的跨域场景

- window.name + iframe：利用name值最长可以 2M ，并用不同页面或不同域名加载后依然存在的特性

- location.hash + iframe：适用通过 C 页面来实现 A 页面与 B 页面通信的场景

就不过多展开了

CORS

CORS 通信过程都是浏览器自动完成，需要浏览器(都支持)和服务器都支持，所以关键在只要服务器支持，就可以跨域通信，CORS请求分两类，`简单请求`和`非简单请求`

另外CORS请求默认不包含Cookie以及HTTP认证信息，如果需要包含Cookie，需要满足几个条件：

- 服务器指定了 `Access-Control-Allow-Credentials: true`

- 开发者须在请求中打开withCredentials属性: `xhr.withCredentials = true`

- `Access-Control-Allow-Origin不要设为星号`，指定明确的与请求网页一致的域名，这样就不会把其他域名的Cookie上传

简单请求

需要同时满足两个条件，就属于简单请求：

- 请求方法是：`HEAD`、`GET`、`POST`，三者之一

- 请求头信息不超过以下几个字段：

  - Accept

  - Accept-Language

  - Content-Language

  - Last-Event-Id

  - Content-Type：值为三者之一application/x-www/form/urlencoded、multipart/form-data、text/plain

需要这些条件是为了兼容表单，因为历史上表单一直可以跨域

浏览器直接发出CORS请求，具体来说就是在头信息中增加Origin字段，表示请求来源来自哪个域(协议+域名+端口)，服务器根据这个值决定是否同意请求。如果同意，返回的响应会多出以下响应头信息

```javascript
Access-Control-Allow-Origin: http://juejin.com // 和 Orign 一致  这个字段是必须的
Access-Control-Allow-Credentials: true // 表示是否允许发送 Cookie  这个字段是可选的
Access-Control-Expose-Headers: FooBar // 指定返回其他字段的值   这个字段是可选的
Content-Type: text/html; charset=utf-8 // 表示文档类型
```

在简单请求中服务器至少需要设置：`Access-Control-Allow-Origin` 字段

非简单请求

比如 PUT 或 DELETE 请求，或 Content-Type 为 application/json ，就是非简单请求。

非简单 CORS 请求，正式请求前会发一次 OPTIONS 类型的查询请求，称为`预检请求`，询问服务器是否支持网页所在域名的请求，以及可以使用哪些头信息字段。只有收到肯定的答复，才会发起正式XMLHttpRequest请求，否则报错

预检请求的方法是OPTIONS，它的头信息中有几个字段

- Origin: 表示请求来自哪个域，这个字段是必须的

- Access-Control-Request-Method：列出CORS请求会用到哪些HTTP方法，这个字段是必须的

- Access-Control-Request-Headers： 指定CORS请求会额外发送的头信息字段，用逗号隔开

OPTIONS请求次数过多也会损耗性能，所以要尽量减少OPTIONS请求，可以让服务器在请求返回头部添加

```javascript
Access-Control-Max-Age: Number // 数字 单位是秒
```

表示预检请求的返回结果可以被缓存多久，在这个时间范围内再请求就不需要预检了。不过这个缓存只对完全一样的URL才会生效

**Nginx代理跨域**

配置一个代理服务器向服务器请求，再将数据返回给客户端，实质和CORS跨域原理一样，需要配置请求响应头Access-Control-Allow-Origin等字段

```javascript
server {
    listen 81; server_name www.domain1.com;
    location / {
        proxy_pass http://xxxx1:8080; // 反向代理
        proxy_cookie_domain www.xxxx1.com www.xxxx2.com; // 修改cookie里域名
        index index.html index.htm;
        // 当用webpack-dev-server等中间件代理接口访问nignx时，此时无浏览器参与，故没有同源限制，下面的跨域配置可不启用
        add_header Access-Control-Allow-Origin http://www.xxxx2.com; // 当前端只跨域不带cookie时，可为*
        add_header Access-Control-Allow-Credentials true;
    }
}
```

Node中间件代理跨域

在 Vue 中 vue.config.js 中配置

```javascript
module.export = {
    ...
    devServer: {
        proxy: {
            [ process.env.VUE_APP_BASE_API ]: {
                target: \'http://xxxx\',//代理跨域目标接口
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    [ \'^\' + process.env.VUE_APP_BASE_API ] : \'\'
                }
            }
        }
    }
}
```

Node + express

```javascript
const express = require(\'express\')
const proxy = require(\'http-proxy-middleware\')
const app = express()
app.use(\'/\', proxy({
    // 代理跨域目标接口
    target: \'http://xxxx:8080\',
    changeOrigin: true,
    // 修改响应头信息，实现跨域并允许带cookie
    onProxyRes: function(proxyRes, req, res) {
        res.header(\'Access-Control-Allow-Origin\', \'http://xxxx\')
        res.header(\'Access-Control-Allow-Credentials\', \'true\')
    },
    // 修改响应信息中的cookie域名
    cookieDomainRewrite: \'www.domain1.com\' // 可以为false，表示不修改
}));
app.listen(3000);
```

WebSocket

WebSocket是HTML5标准中的一种通信协议，以`ws://`(非加密)和`wss://`(加密)作为协议前缀，该协议不实行同源政策，只要服务器支持就行

因为WebSocket请求头信息中有Origin字段，表示请求源来自哪个域，服务器可以根据这个字段判断是否允许本次通信，如果在白名单内，就可以通信

postMessage

postMessage是HTML5标准中的API，它可以给我们解决如下问题：

- 页面和新打开的窗口间数据传递

- 多窗口之间数据传递

- 页面与嵌套的 iframe 之间数据传递

- 上面三个场景之间的`跨域传递`

postMessage 接受两个参数，用法如下：

- 参数一：发送的数据

- 参数二：你要发送给谁就写谁的地址`(协议 + 域名 +端口`)，也可以设置为`*`，表示任意窗口，为`/`表示与当前窗口同源的窗口

JSONP

原理就是通过添加一个\<script>标签，向服务器请求JSON数据，这样不受同源政策限制。服务器收到请求后，将数据放在一个callback回调函数中传回来。比如axios。

不过`只支持GET请求`且`不安全`，可能遇到XSS攻击，不过它的好处是可以向老浏览器或不支持CORS的网站请求数据

```javascript
let script = document.createElement('script')
script.type = 'text/javascript'
script.src = 'http://juejin.com/xxx?callback=handleCallback'
document.body.appendChild(script)

function handleCallback(res) {
  console.log(res)
}
```

服务器返回并立即执行

```javascript
handleCallback({ code: 200, msg: 'success', data: [] })
```

跨域时 Cookie 要做何处理？

指的就是对第三方使用 Cookie 的设置，在 Cookie 信息中添加 `SameSite` 属性

```javascript
Set-Cookie: widget_session=123456; SameSite=None; Secure
```

SameSite 有三个值：

- `strict`：严格模式，完全禁止使用Cookie

- `lax`：宽松模式，允许部分情况使用Cookie，`跨域的都行`，a标签跳转，link标签，GET提交的表单

- `none`：任何情况下都会发送Cookie，但必须同时设置Secure属性，意思是需要安全上下文，Cookie `只能通过https发送`，否则无效

Chrome 80之前默认值是none，之后是lax

不过在最新的 `Chrome91` 版本中这个`已经被移除`了，所以在 91之前的版本依然可以使用

如果 Chrome 或 Edge 版本大于91小于94的话，可以通过[<span style="color: rgb(36,91,219); background-color: inherit">Chromium支持的command-line flag</span>](https://peter.sh/experiments/chromium-command-line-switches/)

- 右键 Chrome 或 Edge 浏览器，选择属性

- 在目标(Target)属性末尾加上

```javascript
 --disable-features=SameSiteByDefaultCookies,CookiesWithoutSameSiteMustBeSecure
```

并且官方说的到 94 版本会连 comman-line 也会移除

官方的说法是任由开发者控制这两个选项，容易被攻击

---

## 7. HTTPS 有哪些优点？

**参考答案：**

HTTPS并非绝对安全，掌握根证书的机构、掌握加密算法的组织同样可以进行中间人形式的攻击，但HTTPS仍是现行架构下最安全的解决方案，主要有以下几个好处：

- 使用 HTTPS 协议可认证用户和服务器，确保数据发送到正确的客户机和服务器。

- HTTPS 协议是由SSL+HTTP 协议构建的可进行加密传输、身份认证的网络协议，要比 HTTP 协议安全，可防止数据在传输过程中不被窃取、修改，确保数据的完整性。

- HTTPS 是现行架构下最安全的解决方案，虽然不是绝对安全，相比于http，https可以提供更加优质保密的信息，保证了用户数据的安全性，此外https同时也一定程度上保护了服务端，使用恶意攻击和伪装数据的成本大大提高。

- 谷歌曾在2014年8月份调整搜索引擎算法，并称“比起同等HTTP网站，采用HTTPS加密的网站在搜索结果中的排名将会更高”。

---

## 8. webSocket 有哪些安全问题，应该如何应对？

**参考答案：**

**WebSocket特性介绍**

WebSocket是HTML5开始提供的一种浏览器与服务器间进行全双工通讯的网络技术。WebSocket通信协议于2011年被IETF定为标准RFC 6455，WebSocket API也被W3C定为标准，主流的浏览器都已经支持WebSocket通信。

WebSocket协议是基于TCP协议上的独立的通信协议，在建立WebSocket通信连接前，需要使用HTTP协议进行握手，从HTTP连接升级为WebSocket连接。浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。

WebSocket定义了两种URI格式, “ws://“和“wss://”，类似于HTTP和HTTPS, “ws://“使用明文传输，默认端口为80，”wss://“使用TLS加密传输，默认端口为443。

```javascript
ws-URI : "ws://host[:port]path[?query]" wss-URI : "wss://host[:port]path[?query]"复制代码
```

WebSocket 握手阶段，需要用到一些HTTP头，升级HTTP连接为WebSocket连接如下表所示。

![](<images/11. 前端安全（21题）-1719986199753.png>)

一次完整的握手连接如下图:

![](<images/11. 前端安全（21题）-db1e6e27a75812c07a92754d9739d9f.jpg>)

一旦服务器端返回 101 响应，即可完成 WebSocket 协议切换。服务器端可以基于相同端口，将通信协议从 [<span style="color: rgb(36,91,219); background-color: inherit">http://或</span>](http://xn--1nu/) https:// 切换到 ws://或 wss://。协议切换完成后，浏览器和服务器端可以使用 WebSocket API 互相发送和收取文本和二进制消息。

WebSocket应用安全问题

WebSocket作为一种通信协议引入到Web应用中，并不会解决Web应用中存在的安全问题，因此WebSocket应用的安全实现是由开发者或服务端负责。这就要求开发者了解WebSocket应用潜在的安全风险，以及如何做到安全开发规避这些安全问题。

认证

WebSocket 协议没有规定服务器在握手阶段应该如何认证客户端身份。服务器可以采用任何 HTTP 服务器的客户端身份认证机制，如 cookie认证，HTTP 基础认证，TLS 身份认证等。在WebSocket应用认证实现上面临的安全问题和传统的Web应用认证是相同的，如：[<span style="color: rgb(36,91,219); background-color: inherit">CVE-2015-0201</span>](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-0201), Spring框架的Java SockJS客户端生成可预测的会话ID，攻击者可利用该漏洞向其他会话发送消息; [<span style="color: rgb(36,91,219); background-color: inherit">CVE-2015-1482</span>](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1482), Ansible Tower未对用户身份进行认证，远程攻击者通过websocket连接获取敏感信息。

授权

同认证一样，WebSocket协议没有指定任何授权方式，应用程序中用户资源访问等的授权策略由服务端或开发者实现。WebSocket应用也会存在和传统Web应用相同的安全风险，如：垂直权限提升和水平权限提升。

跨域请求

WebSocket使用基于源的安全模型，在发起WebSocket握手请求时，浏览器会在请求中添加一个名为Origin的HTTP头，Oringin字段表示发起请求的源，以此来防止未经授权的跨站点访问请求。WebSocket 的客户端不仅仅局限于浏览器，因此 WebSocket 规范没有强制规定握手阶段的 Origin 头是必需的，并且WebSocket不受浏览器同源策略的限制。如果服务端没有针对Origin头部进行验证可能会导致跨站点WebSocket劫持攻击。该漏洞最早在 2013 年被Christian Schneider 发现并公开，Christian 将之命名为跨站点 WebSocket 劫持 (Cross Site WebSocket Hijacking)(CSWSH)。跨站点 WebSocket 劫持危害大，但容易被开发人员忽视。

![](<images/11. 前端安全（21题）-f3df2a132c2e076087f61aa3cc4c226.jpg>)

上图展示了跨站WebSocket劫持的过程，某个用户已经登录了WebSocket应用程序，如果他被诱骗访问了某个恶意网页，而恶意网页中植入了一段js代码，自动发起 WebSocket 握手请求跟目标应用建立 WebSocket 连接。注意到，Origin 和 Sec-WebSocket-Key 都是由浏览器自动生成的，浏览器再次发起请求访问目标服务器会自动带上Cookie 等身份认证参数。如果服务器端没有检查 Origin头，则该请求会成功握手切换到 WebSocket 协议，恶意网页就可以成功绕过身份认证连接到 WebSocket 服务器，进而窃取到服务器端发来的信息，或者发送伪造信息到服务器端篡改服务器端数据。与传统跨站请求伪造(CSRF)攻击相比，CSRF 主要是通过恶意网页悄悄发起数据修改请求，而跨站 WebSocket 伪造攻击不仅可以修改服务器数据，还可以控制整个双向通信通道。也正是因为这个原因，Christian 将这个漏洞命名为劫持(Hijacking)，而不是请求伪造(Request Forgery)。

理解了跨站WebSocket劫持攻击的原理和过程，那么如何防范这种攻击呢？处理也比较简单，在服务器端的代码中增加 对Origin头的检查，如果客户端发来的 Origin 信息来自不同域，服务器端可以拒绝该请求。但是仅仅检查 Origin 仍然是不够安全的，恶意网页可以伪造Origin头信息，绕过服务端对Origin头的检查，更完善的解决方案可以借鉴CSRF的解决方案-令牌机制。

拒绝服务

WebSocket设计为面向连接的协议，可被利用引起客户端和服务器端拒绝服务攻击。

(1). 客户端拒绝服务

WebSocket连接限制不同于HTTP连接限制，和HTTP相比，WebSocket有一个更高的连接限制，不同的浏览器有自己特定的最大连接数,如：火狐浏览器默认最大连接数为200。通过发送恶意内容，用尽允许的所有Websocket连接耗尽浏览器资源，引起拒绝服务。

(2). 服务器端拒绝服务

WebSocket建立的是持久连接，只有客户端或服务端其中一发提出关闭连接的请求，WebSocket连接才关闭，因此攻击者可以向服务器发起大量的申请建立WebSocket连接的请求，建立持久连接，耗尽服务器资源，引发拒绝服务。针对这种攻，可以通过设置单IP可建立连接的最大连接数的方式防范。攻击者还可以通过发送一个单一的庞大的数据帧(如, 2^16)，或者发送一个长流的分片消息的小帧，来耗尽服务器的内存，引发拒绝服务攻击, 针对这种攻击，通过限制帧大小和多个帧重组后的总消息大小的方式防范。

中间人攻击

WebSocket使用HTTP或HTTPS协议进行握手请求，在使用HTTP协议的情况下，若存在中间人可以嗅探HTTP流量，那么中间人可以获取并篡改WebSocket握手请求，通过伪造客户端信息与服务器建立WebSocket连接，如下图所示。防范这种攻击，需要在加密信道上建立WebSocket连接，使用HTTPS协议发起握手请求。

![](<images/11. 前端安全（21题）-95cb7b7f742efb0ac0f45c45d04ea64.jpg>)

输入校验

WebSocket应用和传统Web应用一样，都需要对输入进行校验，来防范来客户端的XSS攻击，服务端的SQL注入，代码注入等攻击。

总结

Websocket是一个基于TCP的HTML5的新协议，可以实现浏览器和服务器之间的全双工通讯。在即时通讯等应用中，WebSocket具有很大的性能优势, 并且非常适合全双工通信，但是，和任何其他技术一样，开发WebSocket应用也需要考虑潜在的安全风险。

---

## 9. 什么是点击劫持？如何防范点击劫持？

**参考答案：**

点击劫持是一种视觉欺骗的攻击手段，攻击者将需要攻击的网站通过 iframe 嵌套的方式嵌入自己的网页中，并将 iframe 设置为透明，在页面中透出一个按钮诱导用户点击。

我们可以在 http 相应头中设置 X-FRAME-OPTIONS 来防御用 iframe 嵌套的点击劫持攻击。通过不同的值，可以规定页面在特 定的一些情况才能作为 iframe 来使用。

---

## 10. 什么是 Samesite Cookie 属性？

**参考答案：**

SameSite 是HTTP响应头 `Set-Cookie` 的属性之一。它允许声明该 `Cookie` 是否仅限于第一方或者同一站点上下文。

- 将 Samesite 设为 `strict` ，这种称为严格模式，表示这个 cookie 在任何情况下都不可能作为第三方 cookie。

- 将 Samesite 设为 `Lax` ，这种模式称为宽松模式，也是目前浏览器中的默认值。如果这个请求是个 GET 请求，并且这个请求改变了当前页面或者打开了新的页面，那么这个 cookie 可以作为第三方 cookie，其余情况下都不能作为第三方 cookie。使用这种方法的缺点是，因为它不支持子域，所以子域没有办法与主域共享登录信息，每次转入子域的网站，都需要重新登录。还有一个问题就是它的兼容性不够好。

- 将 Samesite 设为 `None`，Cookie将在所有上下文中发送，即允许跨域发送。

响应头设置方式：

```javascript
Set-Cookie: flavor=choco; SameSite=None; Secure
```

---

## 11. Cookie 的 SameSite 属性有什么作用？

**参考答案：**

Chrome 51 开始，浏览器的 Cookie 新增加了一个SameSite属性，用来防止 CSRF 攻击和用户追踪。

相关概念：

- 第一方cookie：第一方 cookie 指的是由网络用户访问的域创建的 cookie。

- 第三方cookie：第三方 cookie 是建立在别的域名不是你访问的域名（地址栏中的网址），比如：广告网络商就是最常见的第三方 cookies 的来源，他们用它们在多个网站上追踪用户的行为，当然这些活动可以用来调整广告。此外图像、 JavaScript 和 iframe 通常也会导致第三方 cookies 的生成。

CSRF 攻击是什么？

Cookie 往往用来存储用户的身份信息，恶意网站可以设法伪造带有正确 Cookie 的 HTTP 请求，这就是 CSRF 攻击。

举例来说，用户登陆了银行网站your-bank.com，银行服务器发来了一个 Cookie。

```plaintext
Set-Cookie:id=a3fWa;
```

用户后来又访问了恶意网站`malicious.com`，上面有一个表单。

```javascript
<form action="your-bank.com/transfer" method="POST">
  ...
</form>
```

用户一旦被诱骗发送这个表单，银行网站就会收到带有正确 Cookie 的请求。为了防止这种攻击，表单一般都带有一个随机 token，告诉服务器这是真实请求。

```javascript
<form action="your-bank.com/transfer" method="POST">
  <input type="hidden" name="token" value="dad3weg34">
  ...
</form>
```

这种第三方网站引导发出的 Cookie，就称为第三方 Cookie。它除了用于 CSRF 攻击，还可以用于用户追踪。

比如，Facebook 在第三方网站插入一张看不见的图片。

```plaintext
<img src="facebook.com" style="visibility:hidden;">
```

浏览器加载上面代码时，就会向 Facebook 发出带有 Cookie 的请求，从而 Facebook 就会知道你是谁，访问了什么网站。

SameSite 属性

Cookie 的SameSite属性用来限制第三方 Cookie，从而减少安全风险。

它可以设置三个值:

- Strict

- Lax

- None

Strict

Strict最为严格，完全禁止第三方 Cookie，跨站点时，任何情况下都不会发送 Cookie。换言之，只有当前网页的 URL 与请求目标一致，才会带上 Cookie。

```plaintext
Set-Cookie: CookieName=CookieValue; SameSite=Strict;
```

这个规则过于严格，可能造成非常不好的用户体验。比如，当前网页有一个 GitHub 链接，用户点击跳转就不会带有 GitHub 的 Cookie，跳转过去总是未登陆状态。

Lax

Lax规则稍稍放宽，大多数情况也是不发送第三方 Cookie，但是导航到目标网址的 Get 请求除外。

```plaintext
Set-Cookie: CookieName=CookieValue; SameSite=Lax;
```

导航到目标网址的 GET 请求，只包括三种情况：链接，预加载请求，GET 表单。详见下表。

![](<images/11. 前端安全（21题）-1719987087057.png>)

设置了Strict或Lax以后，基本就杜绝了 CSRF 攻击。当然，前提是用户浏览器支持 SameSite 属性。

None

网站可以选择显式关闭SameSite属性，将其设为None，这样无论是否跨站都会发送 Cookie。不过，前提是必须同时设置Secure属性（Cookie 只能通过 HTTPS 协议发送），否则无效。

下面的设置无效。

```plaintext
Set-Cookie: widget_session=abc123; SameSite=None
```

下面的设置有效。

```plaintext
Set-Cookie: widget_session=abc123; SameSite=None; Secure
```

---

## 12. cookie中的 HttpOnly 属性有什么用途？

**参考答案：**

MDN 上对HttpOnly属性的解释：

> <span style="color: rgb(36,91,219); background-color: inherit">JavaScript Document.cookie API 无法访问带有 HttpOnly 属性的cookie；此类 Cookie 仅作用于服务器。例如，持久化服务器端会话的 Cookie 不需要对 JavaScript 可用，而应具有 HttpOnly 属性。此预防措施有助于缓解跨站点脚本（XSS） (en-US)攻击。</span>

也就是说，对于设置了 HttpOnly 属性为 true 的cookie，无法通过 js 进行访问或其他操作，只是在发送对应域下的请求时，浏览器会自动带上。这样可以有效缓解 XSS 攻击。

---

## 13. 前端的常规安全策略

**参考答案：**

- 定期请第三方机构做安全性测试，漏洞扫描

- 使用第三方开源库做上线前的安全测试，可以考虑融合到CI中

- code review 保证代码质量

- 默认项目中设置对应的 Header 请求头，如 X-XSS-Protection、 X-Content-Type-Options 、X-Frame-Options Header、Content-Security-Policy 等等

- 对第三方包和库做检测：NSP(Node Security Platform)，Snyk

---

## 14. 静态资源完整性校验

**参考答案：**

使用 内容分发网络 (CDNs) 在多个站点之间共享脚本和样式表等文件可以提高站点性能并节省带宽。然而，使用CDN也存在风险，如果攻击者获得对 CDN 的控制权，则可以将任意恶意内容注入到 CDN 上的文件中 （或完全替换掉文件），因此可能潜在地攻击所有从该 CDN 获取文件的站点。

预防方案

将使用 base64 编码过后的文件哈希值写入你所引用的 \<script> 或 标签的 integrity 属性值中即可启用子资源完整性能。

---

## 15. 前端数据安全

**参考答案：**

描述

反爬虫。如猫眼电影、天眼查等等，以数据内容为核心资产的企业

预防方案：

- i）font-face拼接方式：猫眼电影、天眼查

- ii）background 拼接：美团

- iii）伪元素隐藏：汽车之家

- iv）元素定位覆盖式：去哪儿

- v）iframe 异步加载：网易云音乐

---

## 16. iframe 安全

**参考答案：**

说明：

- i）嵌入第三方 iframe 会有很多不可控的问题，同时当第三方 iframe 出现问题或是被劫持之后，也会诱发安全性问题

- ii）点击劫持攻击者将目标网站通过 iframe 嵌套的方式嵌入自己的网页中，并将 iframe 设置为透明，诱导用户点击。

- iii）禁止自己的 iframe 中的链接外部网站的JS

- 预防方案：

- i）为 iframe 设置 sandbox 属性，通过它可以对iframe的行为进行各种限制，充分实现“最小权限“原则

ii）服务端设置 X-Frame-Options Header头，拒绝页面被嵌套，X-Frame-Options 是HTTP 响应头中用来告诉浏览器一个页面是否可以嵌入 \<iframe> 中eg.

X-Frame-Options: SAMEORIGIN

- SAMEORIGIN: iframe 页面的地址只能为同源域名下的页面

- ALLOW-FROM: 可以嵌套在指定来源的 iframe 里

- DENY: 当前页面不能被嵌套在 iframe 里

- iii）设置 CSP 即 Content-Security-Policy 请求头

- iv）减少对 iframe 的使用

---

## 17. sql 注入

**参考答案：**

就是通过把SQL命令插入到Web表单递交或输入域名或页面请求的查询字符串，最终达到欺骗数据库服务器执行恶意的SQL命令,从而达到和服务器

进行直接的交互

预防方案

- i）后台进行输入验证，对敏感字符过滤。

- ii）使用参数化查询，能避免拼接SQL，就不要拼接SQL语句。

---

## 18. 网络劫持

**参考答案：**

- DNS劫持（涉嫌违法）：修改运行商的 DNS 记录，重定向到其他网站。DNS 劫持是违法的行为，目前 DNS 劫持已被监管，现在很少见 DNS 劫持

- HTTP劫持：前提有 HTTP 请求。因 HTTP 是明文传输，运营商便可借机修改 HTTP 响应内容（如加广告）。

预防方案

全站 HTTPS

---

## 19. CSRF攻击及防护

**参考答案：**

- 跨站点请求伪造（Cross-Site Request Forgeries），冒充用户发起请求（在用户不知情的情况下）， 完成一些违背用户意愿的事情（如修改用户信息，删除评论等）。

- 1、**可能造成危害**：

  1. 利用已通过认证的用户权限更新设定信息等；

  2. 利用已通过认证的用户权限购买商品；

  3. 利用已通过的用户权限在留言板上发表言论。

- 2、**防御**：

  1. 验证码；强制用户必须与应用进行交互，才能完成最终请求。

  2. 尽量使用 post ，限制 get 使用；get 太容易被拿来做 csrf 攻击；

  3. 请求来源限制，此种方法成本最低，但是并不能保证 100% 有效，因为服务器并不是什么时候都能取到 Referer，而且低版本的浏览器存在伪造 Referer 的风险。

  4. token 验证 CSRF 防御机制是公认最合适的方案。

- **使用token的原理**：

  1. 第一步：后端随机产生一个 token，把这个token 保存到 session 状态中；同时后端把这个token 交给前端页面；

  2. 第二步：前端页面提交请求时，把 token 加入到请求数据或者头信息中，一起传给后端；

  3. 后端验证前端传来的 token 与 session 是否一致，一致则合法，否则是非法请求。

---

## 20. 中间人攻击

**参考答案：**

中间人攻击（Man-in-the-middle attack, MITM），指攻击者与通讯的两端分别创建独立的联系，并交换其所收到的数据，使通讯的两端认为他们正在通过一个私密的连接与对方直接对话，但事实上整个会话都被攻击者窃听、篡改甚至完全控制。没有进行严格的证书校验是中间人攻击着手点。目前大多数加密协议都提供了一些特殊认证方法以阻止中间人攻击。如 SSL （安全套接字层）协议可以验证参与通讯的用户的证书是否有权威、受信任的数字证书认证机构颁发，并且能执行双向身份认证。攻击场景如用户在一个未加密的 WiFi下访问网站。在中间人攻击中，攻击者可以拦截通讯双方的通话并插入新的内容。

场景

- i）在一个未加密的Wi-Fi 无线接入点的接受范围内的中间人攻击者，可以将自己作为一个中间人插入这个网络

- ii）Fiddler / Charles （花瓶）代理工具

- iii）12306 之前的自己证书

过程

- i）客户端发送请求到服务端，请求被中间人截获

- ii）服务器向客户端发送公钥

- iii）中间人截获公钥，保留在自己手上。然后自己生成一个【伪造的】公钥，发给客户端

- iv）客户端收到伪造的公钥后，生成加密hash值发给服务器

- v）中间人获得加密hash值，用自己的私钥解密获得真秘钥,同时生成假的加密hash值，发给服务器

- vi）服务器用私钥解密获得假密钥,然后加密数据传输给客户端

使用抓包工具fiddle来进行举例说明

- 首先通过一些途径在客户端安装证书

- 然后客户端发送连接请求，fiddle在中间截取请求，并返回自己伪造的证书

- 客户端已经安装了攻击者的根证书，所以验证通过

- 客户端就会正常和fiddle进行通信，把fiddle当作正确的服务器

- 同时fiddle会跟原有的服务器进行通信，获取数据以及加密的密钥，去解密密钥

常见攻击方式

- 嗅探：嗅探是一种用来捕获流进和流出的网络数据包的技术，就好像是监听电话一样。比如：抓包工具

- 数据包注入：在这种，攻击者会将恶意数据包注入到常规数据中的，因为这些恶意数据包是在正常的数据包里面的，用户和系统都很难发现这个内容。

- 会话劫持：当我们进行一个网站的登录的时候到退出登录这个时候，会产生一个会话，这个会话是攻击者用来攻击的首要目标，因为这个会话，包含了用户大量的数据和私密信息。

- SSL剥离：HTTPS是通过SSL/TLS进行加密过的，在SSL剥离攻击中，会使SSL/TLS连接断开，让受保护的HTTPS，变成不受

保护的HTTP（这对于网站非常致命）

- DNS欺骗，攻击者往往通过入侵到DNS服务器，或者篡改用户本地hosts文件，然后去劫持用户发送的请求，然后转发到攻击者想要转发到的服务器

- ARP欺骗，ARP(address resolution protocol)地址解析协议，攻击者利用APR的漏洞，用当前局域网之间的一台服务器，来冒充客户端想要请求的服务端，向客户端发送自己的MAC地址，客户端无从得到真正的主机的MAC地址，所以，他会把这个地址当作真正

的主机来进行通信，将MAC存入ARP缓存表。

- 代理服务器

预防方案：

- i）用可信的第三方CA厂商

- ii）不下载未知来源的证书，不要去下载一些不安全的文件

- iii）确认你访问的URL是HTTPS的，确保网站使用了SSL，确保禁用一些不安全的SSL，只开启：TLS1.1，TLS1.2

- iv）不要使用公用网络发送一些敏感的信息

- v）不要去点击一些不安全的链接或者恶意链接或邮件信息

---

## 21. 点击劫持

**参考答案：**

- Clickjacking： 点击劫持，是指利用透明的按钮或连接做成陷阱，覆盖在 Web 页面之上。然后诱使用户在不知情的情况下，点击那个连接访问内容的一种攻击手段。这种行为又称为界面伪装(UI Redressing) 。

- 大概有两种方式：

攻击者使用一个透明 iframe，覆盖在一个网页上，然后诱使用户在该页面上进行操作，此时用户将在不知情的情况下点击透明的 iframe 页面；

攻击者使用一张图片覆盖在网页，遮挡网页原有的位置含义。

---

一般步骤

- 黑客创建一个网页利用 iframe 包含目标网站；

- 隐藏目标网站，使用户无法无法察觉到目标网站存在；

- 构造网页，诱变用户点击特点按钮

- 用户在不知情的情况下点击按钮，触发执行恶意网页的命令。

防御 <span style="color: rgb(216,57,49); background-color: inherit">X-FRAME-OPTIONS</span>；
X-FRAME-OPTIONS HTTP 响应头是用来给浏览器指示允许一个页面可否在\<frame>,

\<iframe> 或者 \<object> 中展现的标记。

网站可以使用此功能，来确保自己网站内容没有被嵌到别人的网站中去，也从而避免点击劫持的攻击。
有三个值：

- DENY：表示页面不允许在 frame 中展示，即便是在相同域名的页面中嵌套也不允许。

- SAMEORIGIN：表示该页面可以在相同域名页面的 frame 中展示。

- ALLOW-FROM url：表示该页面可以在指定来源的 frame 中展示。
