# html2canvas 中文文档 - 功能

了解 `html2canvas` 支持的不同功能

以下是所有支持的 CSS 属性和值的列表。

## 支持的 CSS 属性

### 背景相关

- background
- background-clip (不支持 text)
- background-color
- background-image
  - url()
  - linear-gradient()
  - radial-gradient()
- background-origin
- background-position
- background-size

### 边框相关

- border
- border-color
- border-radius
- border-style (只支持 solid)
- border-width

### 定位与布局

- bottom
- box-sizing
- display
- flex
- float
- left
- margin
- padding
- position
- right
- top
- z-index

### 尺寸相关

- height
- width
- max-height
- max-width
- min-height
- min-width

### 文本与字体

- color
- content
- font
- font-family
- font-size
- font-style
- font-variant
- font-weight
- letter-spacing
- line-break
- text-align
- text-decoration
- text-decoration-color
- text-decoration-line
- text-decoration-style (只支持 solid)
- text-shadow
- text-transform

### 列表样式

- list-style
- list-style-image
- list-style-position
- list-style-type

### 其他

- opacity
- overflow
- overflow-wrap
- transform (有限支持)
- visibility
- white-space
- word-break
- word-spacing
- word-wrap

## 不支持的 CSS 属性

以下 CSS 属性在当前版本中不支持:

- background-blend-mode
- border-image
- box-decoration-break
- box-shadow
- filter
- font-variant-ligatures
- mix-blend-mode
- object-fit
- repeating-linear-gradient()
- writing-mode
- zoom
