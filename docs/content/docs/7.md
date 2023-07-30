# element-ui 中 upload 组件上传图片转换 base64 方法

我们需要先在`element-ui`的`upload`组件中绑定`on-change`事件拿到文件信息，并且需要把自动上传给关掉。

- `on-change` **文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用**
- `auto-upload` **是否在选取文件后立即进行上传**
- `limit` 限制文件上传数量
- `list-type` 文件列表的类型

```html
<el-upload action="" :on-change="uploadChange" :limit="1" list-type="picture" :auto-upload="false">
  <el-button size="small" type="primary">选择图片上传</el-button>
</el-upload>
```

然后在`methods`中定义`on-change`事件绑定的方法通过 file 就能拿到文件信息了

```js
uploadChange(file,fileList) {
	console.log(file.raw) // file.raw才是文件格式的数据
},
```

然后定义一下方法，用来把图片内容转为`base64`格式

```js
getBase64(file) {
      return new Promise(function(resolve, reject) {
        const reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function() {
          imgResult = reader.result
        }
        reader.onerror = function(error) {
          reject(error)
        }
        reader.onloadend = function() {
          resolve(imgResult)
        }
   })
}
```

最后调用一下即可

```js
// 使用async await的方式调用Promise
async uploadChange(file, fileList) {
  const base64 = await this.getBase64(file.raw)
}
```
