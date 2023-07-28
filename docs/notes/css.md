# CSS
<!-- 目录
[[toc]] -->
## 使用方法

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>网页的标题</title>
    <style>
      css语法：选择符 {
                属性：属性值；
                属性：属性值；
                属性：属性值1 属性值2 属性值3；
            }
    </style>
  </head>
  <body></body>
</html>
```

所有的 css 代码 都要放在 css 样式表里面

1:内部样式表

在 head 里面添加 style 标签

```html
<style>
  css语法：选择符 {
          属性：属性值；
          属性：属性值；
          属性：属性值1 属性值2 属性值3；
      }
</style>
```

2:外部样式表

```html
<link rel="stylesheet" href="路径" />
<!--rel="stylesheet"作用:建立关联性-->
```

3:内联样式表 直接添加在标签上面

```html
<标签 style="css 语法"></标签>
```

## 权重问题

> 内联>内部>外部
> 外部样式的权重和内部样式表的权重,和书写顺序有关,后面的样式会把前面的样式覆盖
> 覆盖的只是相同属性的样式,不同属性会继续执行.

选择符

1. 类型选择符

   直接用标签名当作选择符

   特点：选中所有同类元素

   ```css
   div{}；
   选中所有div
   ```

2. id 名称

   ```css
   #div{}
   选中id名为div的元素
   ```

3. class 名称(类名)

   ```css
   .div{}
   选中class为div的元素
   ```

4. 包含选择符()

   ```css
   div	.box{}
   选中div标签元素内class为box的元素
   ```

5. 群组选择符

   ```css
   div,a,p,span{}
   选中所有div a p span 标签
   ```

6. 通配符

   ```css
   *{}
   选中所有元素
   ```

7. 伪类选择器

   ```css
   a:hover{}
   当鼠标滑过的时候，样式发生改变
   ```

## 伪类选择器

### :hover

```css
div:hover {
  width: 300px;
}
/*当鼠标放在div元素上时，div元素的宽度变为300px*/
```

### :target

```html
<a href="#box1"></a>
<div id="box1"></div>
```

```css
div:target {
  background: orange;
}

/*当一个元素被相关url指向 样式做改变*/
```

### :nth-child

```html
<div>1</div>
<div>2</div>
<div>3</div>
```

```css
div:nth-child(2) {
  /*此时选中了第二给div*/
}
```

## 选择符权重问题

css 中用四位数字表示权重，权重的表达方式如：0，0，0，0

- （元素）类型选择符的权重为 0001
- 伪元素选择符的权重为 0001
- class 选择符的权重为 0010
- 属性选择符的权重为 0010
- 伪类选择符的权重为 0010
- id 选择符的权重为 0100
- 内联样式的权重为 1000
- 通配符的权重为 0000
- 子选择符的权重为 0000
- 继承样式的权重为 0000
- 兄弟选择符的权重为 0000

**经典语录：权重就是越大针对性越高**

## CSS 属性

### 常用属性

1. 文本属性

   | 属性           | 说明       | 示例                                      |
   | -------------- | ---------- | ----------------------------------------- |
   | font-size      | 文本大小   | font-size:18px                            |
   | color          | 文本颜色   | color:#ff0000                             |
   | font-family    | 文本类型   | font-family:'微软雅黑'                    |
   | font-weight    | 文本加粗   | font-weight:bold/bolder normal 为常规文本 |
   | font-style     | 文本的倾斜 | font-style: italic normal 为常规文本      |
   | line-height    | 文本的行高 | line-height:30px                          |
   | letter-spacing | 字符间距   |                                           |
   | word-spacing   | 单词间距   |                                           |

2. 列表属性

   | 属性       | 说明     | 示例             |
   | ---------- | -------- | ---------------- |
   | list-style | 列表样式 | list-style:none; |

3. 边框属性

   ```css
   border:10px solid red;

   solid 实线
   dashed 虚线
   dootted 点线
   double 双实线
   ```

   ```css
   设置三角:
   div {
     width: 0;
     height: 0;
     border-left: 50px solid purple;
     border-top: 50px solid transparent;
     border-bottom: 50px solid transparent;
   }
   ```

4. 背景属性

   ```css
   background: 简写

   background-color:

   background-image:url()

   background-repeat:no-repeat/repeat-x/repeat-y;

   background-position:背景图的位置
   ```

### 其他常用属性

```css
text-decoration：none /*清除a标签中的下划线*/
				underline /*增加下划线*/
display:none
/*设置元素不可见*/

display:block
/*设置元素为块元素*/

opacity: 0.4;
/*设置元素透明度，从 0.0 (完全透明)到 1.0(完全不透明)*/

border-radius:50%
/*设置圆角，50%为圆形*/

overflow:hidden
/*溢出隐藏*/

box-shadow: 10px 10px 5px #888888;
/*阴影效果*/
```

## 盒子模型

### padding

#### padding 的作用

```
用于控制子元素和父元素之间的位置关系
```

#### padding 设置方法

```css
padding:10px
padding:10px 20px  上下  左右
padding:10px 20px 30px    上 左右 下
padding:10px 20px 30px 40px   上右下左
```

**注意事项：必须在宽高的基础上减去 padding 大小**

### margin

#### margin 的作用

```
控制盒子与盒子之间的位置关系
```

#### margin 的设置方法

```css
margin:10px
margin:10px 20px  上下  左右
margin:10px 20px 30px    上 左右 下
margin:10px 20px 30px 40px   上右下左

margin:0 auto; //让当前元素在父元素里面左右居中
```

**注意事项：相邻两个盒子上下的 margin 值.按照最大值设置**

### 怪异盒模型

```css
box-sizing：border-box
/*增加margin和padding会把content压小*/
```

### 普通盒模型

```css
box-sizing：content-box
/*会把盒子撑大content大小不变（不要用在pc段）*/
```

### 弹性盒模型

```css
display：flex
```

- 作用：让挡前盒子形成弹性元素 控制子元素布局
- 特点：盒子里的子元素 都是沿着主轴排列 默认情况下主轴是 X 轴
- 特点二：盒子里的子元素都能直接添加宽高（非块级元素也能添加宽高如 span）
- 特点三：改变主轴的排列方向：flex-direction

属性值：

- row 默认在一行内排列
- row-reverse 反转排列
- column：纵向排列
- column-reverse 反向纵排列

## 浮动

**注意：浮动是不占空间的，即脱离文档流**

```css
float: left/right/none;
```

## 定位

### 静态定位

```css
position: static 默认值，指定left/right/top/bottom/ 没有作用。;
```

### 绝对定位

```css
position: absolute;
```

##### 绝对定位注意事项：

1. 参照物：已经设置定位的父元素。【如果没父元素或者父元素都没有定位的情况下，以 body 参照物】
2. 破坏文档流（布局流），不占据空间

### 相对定位

```css
position: relative;
```

##### 相对定位注意事项

1. 参照物：是自身默认位置
2. 不会破坏文档流，占据空间。

### 固定定位

```css
position: fixed;
```

##### 固定定位注意事项

1. 参照物：浏览器窗口
2. 不占据空间

### 定位的注意事项

##### 包含块的设置

> ​ 如果想让某个父元素形成“参照物”,需要给父元素设置 position:relative;
>
> ​ 需要做定位的子元素，添加 position:absolute;

##### 层次关系

> z-index: 属性值为一个数值。数值越大越在上层显示。
>
> 默认值为 auto;

## 动画

### transform 属性

transform 属性向元素应用 2D 或 3D 转换。该属性允许我们对元素进行旋转、缩放、移动或倾斜。

| 值                            | 描述                                  |
| ----------------------------- | ------------------------------------- |
| none                          | 定义不进行转换。                      |
| translate(_x_,_y_)            | 定义 2D 转换                          |
| translate3d(_x_,_y_,_z_)      | 定义 3D 转换。                        |
| translateX(_x_)               | 定义转换，只是用 X 轴的值。           |
| translateY(_y_)               | 定义转换，只是用 Y 轴的值。           |
| translateZ(_z_)               | 定义 3D 转换，只是用 Z 轴的值。       |
| scale(_x_,_y_)                | 定义 2D 缩放转换。                    |
| scale3d(_x_,_y_,_z_)          | 定义 3D 缩放转换。                    |
| scaleX(_x_)                   | 通过设置 X 轴的值来定义缩放转换。     |
| scaleY(_y_)                   | 通过设置 Y 轴的值来定义缩放转换。     |
| scaleZ(_z_)                   | 通过设置 Z 轴的值来定义 3D 缩放转换。 |
| rotate(_angle_)               | 定义 2D 旋转，在参数中规定角度。      |
| rotate3d(_x_,_y_,_z_,_angle_) | 定义 3D 旋转。                        |
| rotateX(_angle_)              | 定义沿着 X 轴的 3D 旋转。             |
| rotateY(_angle_)              | 定义沿着 Y 轴的 3D 旋转。             |
| rotateZ(_angle_)              | 定义沿着 Z 轴的 3D 旋转。             |

### 变形原点

```css
transform-origin: X轴位置 Y轴位置;
/*改变2d旋转的中心点*/
```

**注：角度的单位是 deg**

### transition 属性

transition 属性是一个简写属性，用于设置四个过渡属性：

| 值                         | 描述                                |
| :------------------------- | :---------------------------------- |
| transition-property        | 规定设置过渡效果的 CSS 属性的名称。 |
| transition-duration        | 规定完成过渡效果需要多少秒或毫秒。  |
| transition-timing-function | 规定速度效果的速度曲线。            |
| transition-delay           | 定义过渡效果何时开始。              |

#### transition-property

> transition-property 属性规定应用过渡效果的 CSS 属性的名称。（当指定的 CSS 属性改变时，过渡效果将开始）。
>
> **提示：**过渡效果通常在用户将鼠标指针浮动到元素上时发生。
>
> **注释：**请始终设置 transition-duration 属性，否则时长为 0，就不会产生过渡效果。
>
> **默认值：**all(所有属性都将获得过渡效果)

语法：

```css
transition-property: width; /*规定改变的属性为宽度*/
```

#### transition-duration

> transition-duration 属性规定完成过渡效果需要花费的时间（以秒或毫秒计）
>
> 默认值是 0，意味着不会有效果。

语法：

```css
transition-duration: 3s; /*延迟3秒*/
```

#### transition-timing-function

> transition-timing-function 属性规定过渡效果的速度曲线。
>
> 该属性允许过渡效果随着时间来改变其速度。

| 值          | 描述                                                                              |
| :---------- | :-------------------------------------------------------------------------------- |
| linear      | 规定以相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）。                |
| ease        | 规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）。 |
| ease-in     | 规定以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）。                       |
| ease-out    | 规定以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）。                       |
| ease-in-out | 规定以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）。              |

语法：

```css
transition-timing-function: linear; /*匀速运动*/
```

#### transition-delay

> transition-delay 属性规定过渡效果何时开始。
>
> transition-delay 值以秒或毫秒计。
>
> 默认值为 0

语法：

```css
transition-delay: 2s; /*规定动画延迟2秒再执行*/
```

#### 简写方式

```css
transition: width 3s linear 2s;
```

## 3D 动画

```css
transform-style: preserve-3d;
/*转成3d空间*/
```

## animation 属性

animation 属性是一个简写属性，用于设置六个动画属性

| 值                        | 描述                                     |
| :------------------------ | :--------------------------------------- |
| animation-name            | 规定需要绑定到选择器的 keyframe 名称。。 |
| animation-duration        | 规定完成动画所花费的时间，以秒或毫秒计。 |
| animation-timing-function | 规定动画的速度曲线。                     |
| animation-delay           | 规定在动画开始之前的延迟。               |
| animation-iteration-count | 规定动画应该播放的次数。                 |
| animation-direction       | 规定是否应该轮流反向播放动画。           |

**注释：**请始终规定 animation-duration 属性，否则时长为 0，就不会播放动画了。

### 使用方法

需要先定义一个 keyframes

```css
@keyframes pic {
  0% {
    transform: rotateX(0deg) rotateY(0deg);
  }
  50% {
    transform: rotateX(180deg) rotateY(180deg);
  }
  100% {
    transform: rotateX(360deg) rotateY(360deg);
  }
}
```

然后才能在 animation 中调用

```css
animation: pic 10s infinite linear;

/*
animation:关键帧的名称 动画的时间  延迟的时间  运动的次数  运动的类型
无限循环：infinite
控制动画的运行和停止：animation-play-state:running/paused  运行/暂停
*/
```

更多资料请参考：https://www.w3school.com.cn/cssref/pr_animation.asp
