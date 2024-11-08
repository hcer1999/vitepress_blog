# 配置

- ## `text`

**类型：** `string`

**默认值：** `""` （空字符串）

**描述：**

弹窗的文本内容。可以作为配置项在`text`键下添加（如下例所示），或者作为`swal`函数的第一个且唯一的参数（例如`swal("Hello world!")`），或者作为第二个参数，如果你有多个字符串参数（例如`swal("A title", "Hello world!")`）。

**示例：**

```javascript
swal({ text: 'Hello world!' })
```

- ## `title`

**类型：** `string`

**默认值：** `""` （空字符串）

**描述：**

弹窗的标题。可以作为配置项在`title`键下添加（如下例所示），或者作为`swal`函数的第一个字符串参数——只要它不是唯一的一个——（例如`swal("Here's a title!", "Here's some text")`）。

**示例：**

```javascript
swal({ title: "Here's a title!" })
```

- ## `icon`

**类型：** `string`

**默认值：** `""` （空字符串）

**描述：**

弹窗的图标。SweetAlert2内置了4个图标：

- `"warning"`
- `"error"`
- `"success"`
- `"info"`

可以作为配置项在`icon`键下添加，或者作为`swal`函数的第三个字符串参数（例如`swal("Title", "Text", "success")`）。

**示例：**

```javascript
swal({ icon: 'success' })
```

- ## `button`

**类型：** `string|boolean|ButtonOptions`

**默认值：**

```javascript
{ text: "OK", value: true, visible: true, className: "", closeModal: true }
```

**描述：**

默认显示的确认按钮。你可以通过将`button`设置为字符串来更改其文本，或者通过传递一个`ButtonOptions`对象来调整更多设置。设置为`false`可以隐藏按钮。

**示例：**

```javascript
swal({ button: 'Coolio' })
```

- ## `buttons`

**类型：** `boolean|string[]|ButtonOptions[]|ButtonList`

**默认值：**

```javascript
{ cancel: { text: "Cancel", value: null, visible: false, className: "", closeModal: true }, confirm: { text: "OK", value: true, visible: true, className: "", closeModal: true }}
```

**描述：**

指定确切的按钮数量及其行为。如果你使用数组，你可以将元素设置为字符串（仅设置文本），`ButtonOptions`列表，或两者的组合。你也可以将其中一个元素设置为`true`以简单地获得默认选项。

如果你想拥有超过预定义的取消和确认按钮，你需要指定一个`ButtonList`对象，其键（按钮的命名空间）指向`ButtonOptions`。

你也可以指定`false`以隐藏所有按钮（与`button`选项的行为相同）。

**示例：**

```javascript
swal({ buttons: ['Stop', 'Do it!'] })
```

- ## `content`

**类型：** `Node|string`

**默认值：** `null`

**描述：**

用于自定义内容，不仅限于文本和图标。

**示例：**

```javascript
swal({ content: 'input' })
```

- ## `className`

**类型：** `string`

**默认值：** `""` （空字符串）

**描述：**

为SweetAlert2弹窗添加自定义类。这在更改外观时非常有用。

**示例：**

```javascript
swal('Hello world!', { className: 'red-bg' })
```

- ## `closeOnClickOutside`

**类型：** `boolean`

**默认值：** `true`

**描述：**

决定用户是否可以通过点击弹窗外部来关闭弹窗。

**示例：**

```javascript
swal({ closeOnClickOutside: false })
```

- ## `closeOnEsc`

**类型：** `boolean`

**默认值：** `true`

**描述：**

决定用户是否可以通过按下`ESC`键来关闭弹窗。

**示例：**

```javascript
swal({ closeOnEsc: false })
```

- ## `dangerMode`

**类型：** `boolean`

**默认值：** `false`

**描述：**

如果设置为`true`，确认按钮将变为红色，并且默认焦点将设置在取消按钮上。这在显示警告弹窗时非常有用，其中确认操作是危险的（例如删除项目）。

**示例：**

```javascript
swal('Are you sure?', { dangerMode: true, buttons: true })
```

- ## `timer`

**类型：** `number`

**默认值：** `null`

**描述：**

在一定时间（以毫秒为单位）后关闭弹窗。与`buttons: false`结合使用非常有用。

**示例：**

```javascript
swal('This modal will disappear soon!', { buttons: false, timer: 3000 })
```
