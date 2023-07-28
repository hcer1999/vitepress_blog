# CSS 篇
<!-- 目录
[[toc]] -->
## 一. 两种盒模型分别说一下。

- W3C 盒子模型(标准盒模型)
- IE 盒子模型(怪异盒模型)

盒模型都是由内容(`content`)、填充(`padding`)、边界(`margin`)、 边框(`border`)组成。他们的区别就是怪异盒模型把`border`和`padding`计算在`content`之内

## 二. 如何水平居中？

- 元素为行内元素，设置父元素 `text-align` 为 `center`
- 如果元素宽度固定，可以设置左右 `margin` 为 `auto`;
- 如果元素为绝对定位，设置父元素 `position` 为 `relative`，元素设 `left:0`;`right:0`;`margin:auto`;
- 使用 `flex-box` 布局，指定 `justify-content` 属性为 `center`
- `display` 设置为 `tabel-ceil`

## 三. 如何垂直居中？

- 将显示方式设置为表格，`display`:`table-cell`,同时设置` vertial-align``：middle `
- 使用`flex`布局，设置为`align-item：center`
- 绝对定位中设置 `bottom:0`,`top:0`,并设置 `margin:auto`
- 绝对定位中固定高度时设置 `top:50%`，`margin-top` 值为高度一半的负值
- 文本垂直居中设置 `line-height` 为 `height` 值

## 四. flex 怎么用，常用属性有哪些？

`flex` 主要用于一维布局,`flex` 容器中存在两条轴， 横轴和纵轴， 容器中的每个单元称为 `flexitem`。

::: tip 注意
注意：当设置 `flex` 布局之后，子元素的 float、clear、vertical-align 的属性将会失效。
:::

**flex 容器有以下属性：**

- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-items
- align-content

**flex 的子元素有以下属性：**

- order
- flex-basis
- flex-grow
- flex-shrink
- flex
- align-self

## 五. link 与@import 的区别

- `link`是`HTML`方式， `@import`是`CSS`方式
- `link`最大限度支持并行下载，`@import`过多嵌套导致串行下载，出现 FOUC(文档样式短暂失效)
- `link`可以通过`rel="alternate stylesheet"`指定候选样式
- 浏览器对`link`支持早于`@import`，可以使用`@import`对老浏览器隐藏样式
- `@import`必须在样式规则之前，可以在`css`文件中引用其他文件
- 总体来说：`link`优于`@import`

## 六. display 有哪些值？说明他们的作用

**display：** `none` | `inline` | `block` | `list-item` | `inline-block` | `table` | `inline-table` | `table-caption` | `table-cell` | `table-row` | `table-row-group` | `table-column` | `table-column-group` | `table-footer-group` | `table-header-group` | `run-in` | `box` | `inline-box` | `flexbox` | `inline-flexbox` | `flex` | `inline-flex`

::: details 展开作用详情

- none： 隐藏对象。与 visibility 属性的 hidden 值不同，其不为被隐藏的对象保留其物理空间
- inline： 指定对象为内联元素。
- block： 指定对象为块元素。
- list-item： 指定对象为列表项目。
- inline-block： 指定对象为内联块元素。（CSS2）
- table： 指定对象作为块元素级的表格。类同于 html 标签 table（CSS2）
- inline-table： 指定对象作为内联元素级的表格。类同于 html 标签 table（CSS2）
- table-caption： 指定对象作为表格标题。类同于 html 标签 caption（CSS2）
- table-cell： 指定对象作为表格单元格。类同于 html 标签 td（CSS2）
- table-row： 指定对象作为表格行。类同于 html 标签 tr（CSS2）
- table-row-group： 指定对象作为表格行组。类同于 html 标签 tbody（CSS2）
- table-column： 指定对象作为表格列。类同于 html 标签 col（CSS2）
- table-column-group： 指定对象作为表格列组显示。类同于 html 标签 colgroup（CSS2）
- table-header-group： 指定对象作为表格标题组。类同于 html 标签 thead（CSS2）
- table-footer-group： 指定对象作为表格脚注组。类同于 html 标签 tfoot（CSS2）
- run-in： 根据上下文决定对象是内联对象还是块级对象。（CSS3）
- box： 将对象作为弹性伸缩盒显示。（伸缩盒最老版本）（CSS3）
- inline-box： 将对象作为内联块级弹性伸缩盒显示。（伸缩盒最老版本）（CSS3）
- flexbox： 将对象作为弹性伸缩盒显示。（伸缩盒过渡版本）（CSS3）
- inline-flexbox： 将对象作为内联块级弹性伸缩盒显示。（伸缩盒过渡版本）（CSS3）
- flex： 将对象作为弹性伸缩盒显示。（伸缩盒最新版本）（CSS3）
- inline-flex： 将对象作为内联块级弹性伸缩盒显示。（伸缩盒最新版本）（CSS3）

:::

## 七. BFC 是什么？

BFC（Block Formatting Context）块级格式化上下文，是 Web 页面中盒模型布局的 CSS 渲染模式，指一个独立的渲染区域或者说是一个隔离的独立容器。

形成 BFC 的条件：

- 根元素
- 浮动元素，`float` 除 `none`以外的值
- 定位元素，`position`（`absolute`，`fixed`）
- `display` 为以下其中之一的值 `inline-block`，`table-cell`，`table-caption`
- `overflow` 除了 `visible` 以外的值（`hidden`，`auto`，`scroll`）

BFC 的特性：

- 内部的 Box 会在垂直反向上一个接一个的放位置
- 垂直方向上的距离有`margin` 距离
- `BFC` 的区域不会与 `float` 的元素区域重叠
- 计算 `BFC` 的高度时，浮动元素也参与计算
- `BFC` 就是页面上的独立容器，容器里面的子元素不会影响外面元素

BFC的作用：

- 可以包含浮动元素
- 不被浮动元素覆盖
- 阻止父子元素的`margin`折叠

## 八. CSS 选择器优先级

!important > 行内样式 > ID 选择器 > 类名选择器 = 属性选择器 = 伪类选择器 > 标签选择器

::: tip 注意
如果权重值一样，则按照样式规则的先后顺序来应用，顺序靠后的覆盖靠前的规则
:::

## 九. 说一下清除浮动的几种方式

清除浮动的核心是`clear:both`;

1. 使用额外标签法（不推荐使用）

   在浮动的盒子下面再放一个标签，使用 `clear:both`;来清除浮动

2. 使用 `overflow` 清除浮动（不推荐使用）

   先找到浮动盒子的父元素，给父元素添加一个属性：`overflow:hidden`;就会清除子元素对页面的影响

3. 使用伪元素清除浮动(用的最多)

   ```css
   .clearfix:after {
     content: '';
     height: 0;
     line-height: 0;
     display: block;
     clear: both;
     visibility: hidden; /*将元素隐藏起来
      在页面的 clearfix 元素后面添加了一个空的块级元素
     （这个元素的高为 0 行高也为 0   并且这个元素清除了浮动）*/
   }
   .clearfix {
     zoom: 1; /*为了兼容 IE6*/
   }
   ```

## 十. CSS选择符有哪些？

- id选择器(#myid)
- 类选择器(.myclassname)
- 标签选择器(div)
- 后代选择器(h1 p)
- 相邻后代选择器/子选择器(ul>li)
- 兄弟选择器(li~a)
- 相邻兄弟选择器(li+a)
- 属性选择器(a[rel="external"])
- 伪类选择器(a:hover)
- 伪元素选择器(::before)
- 通配符选择器(*)

## 十一. 伪类与伪元素的区别

伪类用于当已有元素处于的某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，当用户悬停在指定的元素时，我们可以通过`:hover` 来描述这个元素的状态。虽然它和普通的 `css` 类相似，可以为已有的元素添加样式，但是它只有处于 `dom` 树无法描述的状态下才能为元素添加样式，所以将其称为伪类。

伪元素用于**创建**一些不在文档树中的元素，并为其**添加样式**。比如说，我们可以通过`:before` 来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。

## 十二. CSS 中哪些属性可以继承？

- 字体系列

  `font`、`font-family`、`font-weight`、`font-size`、`font-style`、`font-variant`、`font-stretch`、`font-size-adjust`

- 文本系列

  `text-indent`、`text-align`、`text-shadow`、`line-height`、`word-spacing`、`letter-spacing`、
  `text-transform`、`direction`、`color`

- 表格布局属性

  `caption-side`、`border-collapse`、`empty-cells`

- 列表属性

  `list-style-type`、`list-style-image`、`list-style-position`、`list-style`

- 光标属性

  `cursor`

- 元素可见性

  `visibility`

::: tip
当一个属性不是继承属性时，可以使用inherit关键字指定一个属性应从父元素继承它的值，inherit关键字用于显式地指定继承性，可用于任何继承性/非继承性属性。
:::

## 十三. 请解释一下 CSS3 的 Flex布局，以及适用场景？

- 任何一个容器都可以指定为Flex布局。行内元素也可以使用Flex布局。设为Flex布局以后，子元素的`float`、`clear`和`vertical-align`属性将失效。
- 容器默认存在两根轴：水平的主轴（`mainaxis`）和垂直的交叉轴（`crossaxis`），项目默认沿主轴排列。

**容器属性**

- `flex-direction`属性决定主轴的方向（即项目的排列方向）。
- `flex-wrap`属性定义，如果一条轴线排不下，是否需要换行。
- `flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`。
- `justify-content`属性定义了项目在主轴上的对齐方式。
- `align-items`属性定义了项目在交叉轴上的对齐方式。
- `align-content`属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

**子元素属性**

- `order`属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
- `flex-grow`属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
- `flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
- `flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。
- `flex`属性是`flex-grow`，`flex-shrink`和`flex-basis`的简写，默认值为`0 1 auto`。
- `align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。

## 十四. 用纯 CSS 创建一个三角形的原理是什么？

采用的是相邻边框连接处的均分原理。

将元素的宽高设为0，只设置 `border`，把任意三条边隐藏掉（颜色设为` transparent`），剩下的就是一个三角形。

```css
#demo {
  width: 0;
  height: 0;
  border-width: 20px;
  border-style: solid;
  border-color: transparent transparent red transparent;
}
```

## 十五. 为什么要初始化CSS样式？

- 因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对`CSS`初始化往往会出现浏览器之间的页面显示差异。
- 初始化样式会对`SEO`有一定的影响，但鱼和熊掌不可兼得，但力求影响最小的情况下初始化。
- 最简单的初始化方法：`*{padding:0;margin:0;}`（强烈不建议）

## 十六. 使用图片 base64 编码的优点和缺点

`base64`编码是一种图片处理格式，通过特定的算法将图片编码成一长串字符串，在页面上显示的时候，可以用该字符串来代替图片的`url`属性。

优点：

- 减少一个图片的HTTP请求

缺点：

- 根据`base64`的编码原理，编码后的大小会比原文件大小大1/3，如果把大图片编码到`html/css`中，不仅会造成文件体积的增加，影响文件的加载速度，还会增加浏览器对`html`或`css`文件解析渲染的时间。
- 使用`base64`无法直接缓存，要缓存只能缓存包含`base64`的文件，比如`HTML`或者`CSS`，这相比域直接缓存图片的效果要差很多。
- 兼容性的问题，`ie8`以前的浏览器不支持。

## 十七. 说说px，em，rem的区别

`css`单位中分为相对长度单位、绝对长度单位。

|     单位     |                  属性                  |
| :----------: | :------------------------------------: |
| 相对长度单位 | em、ex、ch、rem、vw、vh、vmin、vmax、% |
| 绝对长度单位 |         cm、mm、in、px、pt、pc         |

**px(绝对长度单位)**

px这个单位是大家并不陌生，px这个单位基于像素点，兼容性可以说是相当可以，大家对px的了解肯定是没有很大的问题的。

**em(相对长度单位)**

- 使用
  - 浏览器的默认字体都是`16px`，那么`1em`=`16px`，以此类推计算`12px`=`0.75em`，`10px`=`0.625em`，`2em`=`32px`；
  - 这样使用很复杂，很难很好的与`px`进行对应,也导致书写、使用、视觉的复杂(`0.75em`、`0.625em`全是小数点)；

  - 为了简化font-size的换算，我们在body中写入一下代码

```css
body {font-size: 62.5%;  } /*  公式16px*62.5%=10px  */  
```

这样页面中`1em`=`10px`,`1.2em`=`12px`,`1.4em`=`14px`,`1.6em`=`16px`，使得视觉、使用、书写都得到了极大的帮助。

- 缺点
  - em的值并不是固定的
  - em会继承父级元素的字体大小（参考物是父元素的font-size；）
  - em中所有的字体都是相对于父元素的大小决定的；所以如果一个设置了`font-size:1.2em`的元素在另一个设置了`font-size:1.2em`的元素里，而这个元素又在另一个设置了`font-size:1.2em`的元素里，那么最后计算的结果是1.2X1.2X1.2=`1.728em`

**rem(相对长度单位)**

- 使用
  - 浏览器的默认字体都是`16px`，那么`1rem`=`16px`，以此类推计算`12px`=`0.75rem`，`10px`=`0.625rem`，`2rem`=`32px`；

  - 这样使用很复杂，很难很好的与`px`进行对应,也导致书写、使用、视觉的复杂(`0.75rem`、`0.625em`全是小数点) ；

  - 为了简化`font-size`的换算，我们在根元素`html`中加入`font-size: 62.5%;`

```css
html {font-size: 62.5%;  } /*  公式16px*62.5%=10px  */  
```

这样页面中`1rem`=`10px`,`1.2rem`=`12px`,`1.4rem`=`14px`,`1.6rem`=`16px`;使得视觉、使用、书写都得到了极大的帮助；

- 特点
  - `rem`单位可谓集相对大小和绝对大小的优点于一身

  - 和`em`不同的是`rem`总是相对于根元素(如:root{})，而不像`em`一样使用级联的方式来计算尺寸。这种相对单位使用起来更简单。

  - `rem`支持`IE9`及以上，意思是相对于根元素`html`（网页），不会像`em`那样，依赖于父元素的字体大小，而造成混乱。使用起来安全了很多。

**注意：**

- 值得注意的浏览器支持问题：` IE8`，`Safari 4`或 `iOS 3.2`中不支持rem单位。
- 如果你的用户群都使用最新版的浏览器，那推荐使用`rem`，如果要考虑兼容性，那就使用`px`,或者两者同时使用。

## 十八. display:inline-block 什么时候不会显示间隙？(携程)

- 移除空格
- 使用`margin`负值
- 使用`font-size:0`
- `letter-spacing`
- `word-spacing`

## 十九. rgba()和opacity的透明效果有什么不同？

- `rgba()`和`opacity`都能实现透明效果，但最大的不同是`opacity`作用于元素，以及元素内的所有内容的透明度
- 而`rgba()`只作用于元素的颜色或其背景色。（设置`rgba`透明的元素的子元素不会继承透明效果！）

## 二十. css sprite(雪碧图)是什么,有什么优缺点

- 概念

  将多个小图片拼接到一个图片中。通过`background-position`和元素尺寸调节需要显示的背景图案。

- 优点
  - 减少`HTTP`请求数，极大地提高页面加载速度
  - 增加图片信息重复度，提高压缩比，减少图片大小
  - 更换风格方便，只需在一张或几张图片上修改颜色或样式即可实现
- 缺点
  - 图片合并麻烦
  - 维护麻烦，修改一个图片可能需要从新布局整个图片，样式

## 二十一. 什么是FOUC?如何避免

- `Flash Of Unstyled Content`：用户定义样式表加载之前浏览器使用默认样式显示文档，用户样式加载渲染之后再从新显示文档，造成页面闪烁。
- **解决方法**：把样式表放到文档的`head`

## 二十二. position有哪几个属性，分别有什么用？

- **static(默认值)**

  默认的属性，指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。此时 `top`, `right`, `bottom`, `left` 和 `z-index `属性无效。

- **relative(相对定位)**

  元素先放置在未添加定位时的位置，再在不改变页面布局的前提下调整元素位置。元素会以自身为定位，可以对它设置`top`，`right`，`bottom`，`left`值

- **absolute(绝对定位)**

  元素会被移出正常文档流，并不为元素预留空间，通过指定元素相对于最近的非 static 定位祖先元素的偏移，来确定元素位置。绝对定位的元素可以设置外边距（margins），且不会与其他边距合并。

- **fixed(固定定位)**

  元素会被移出正常文档流，并不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变。打印时，元素会出现在的每页的固定位置。

- **sticky(粘性定位)**

  元素根据正常文档流进行定位，然后相对它的最近滚动祖先和 最近块级祖先，基于`top`, `right`, `bottom`, 和`left`的值进行偏移。

## 二十三. 父盒子中子盒子浮动有什么后果？

如果父盒子的高度低于子盒子的高度或者父盒子没有高度的话，会造成**高度塌陷**。

示例

```html
<div class="pic-box">
    <div class="container">
        <img class="pic-1" src="img1.jpg">
        <img class="pic-2" src="img2.jpg">
        <img class="pic-3" src="img3.jpg">
    </div>
</div>
```

由于我们没给父盒子设置高度，所以父盒子的高度是由图片撑开的。

![未浮动](https://img-blog.csdn.net/20170519142404832?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMzE5MTU3NDU=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

如果我们让img3浮动的话，会变成这样。

![浮动](https://img-blog.csdn.net/20170519142445808?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMzE5MTU3NDU=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

如果要解决高度塌陷，则需要**清除浮动**。

## 二十四. HTML行内元素、块状元素、行内块状元素的区别

### 行内元素

代表标签：`span`、`b`、`i`

行内元素特征：

- 设置宽高无效
- 不会自动进行换行
- 对`margin`仅设置左右方向有效，上下无效
- 对`padding`设置上下左右都有效

### 块元素

代表标签：`div`、`p`、`nav`、`aside`、`header`、`footer`、`section`、`article`、`ul-li`、`address`

块状元素特征：

- 能够识别宽高
- 对`margin`和`padding`的设置上下左右均对其有效
- 可以自动换行
- 多个块状元素标签写在一起，默认排列方式为从上至下

### 行内块元素

行内块状元素综合了行内元素和块状元素的特性，但是各有取舍。因此行内块状元素在日常的使用中，由于其特性，使用的次数也比较多。

行内块状元素特征：

- 不自动换行
- 能够识别宽高
- 默认排列方式为从左到右

## 二十五. 行内元素、行内块元素的默认间隙问题

1. 将所有的行内块元素直接设置浮动，个人认为最直接的方法，当然是在适当的场景中，因为过度的浮动会产生需要清除浮动的必要
2. 在产生边距的行内块的父元素设置属性：font-size：0px;
3. 在父元素上设置，word-spacing(词边距)的值设为合适的负值即可
4. 在html中将行内块元素在同一行显示，不要进行美观缩进或者换行
   
