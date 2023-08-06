# 关于 NewSelectCompanyAndMember 组件使用说明

- 作者：hehaocheng
- 创建时间：2023-05-25
- 更新时间：2023-08-05
- 版本号：v1.0.1

说明：因为该组件在不同端使用到的场景不同，所以只做成组件库的形式，需要使用的时候直接复制代码到项目中使用，如果如果发现该组件不能正常运行，请在企业后台端（目前是在企业后台端更新的最新代码）复制该组件代码到项目中使用。如该组件目前的逻辑不能满足您的项目需求，请在不影响该组件原本功能的情况下进行修改或者复制本组件进行修改。

## 组件预览

![](http://cdn.bingkele.cc/FlspQbRpUUxtGkhiEc8s6gwv-wRU)

## 使用组件

### 1.导入

```js
import SelectCompanyAndMember from '@/components/NewSelectCompanyAndMember/index'
```

### 2.使用

本组件一般搭配 Dialog 组件一起使用

::: code-group

```html [vue]
<el-dialog
  title="添加成员"
  class="addMemberDialog"
  :visible.sync="addMemberDialogVisible"
  width="40%"
  :before-close="addMemberDialogHandleClose"
>
  <SelectCompanyAndMember
    :treeData="addMemberTreeData"
    leftTitle="选择"
    rightTitle="已选择"
    @selected="selectMemberChange"
    :prop="prop"
  ></SelectCompanyAndMember>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addMemberDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onSave">保 存</el-button>
  </span>
</el-dialog>
```

```js [js] {15}
<script>
  export default {
    data() {
      return {
        addMemberTreeData: [{}],        // 选择成员树数据
        prop: {                      // 选择成员树配置
          label: "name",            // 显示的字段
          children: "departList",  // 子节点字段
        },
      }
    }
    methods: {
      selectMemberChange(val) {
        this.members = val;  // members 为已选择的成员
      },
    }
 }
</script>

```

:::

## 组件参数

|   参数名    |  类型  |               默认值                |               说明                |
| :---------: | :----: | :---------------------------------: | :-------------------------------: |
|  treeData   | Array  |                 []                  |              树数据               |
|  leftTitle  | String |                选择                 |             左侧标题              |
| rightTitle  | String |               已选择                |             右侧标题              |
|    prop     | Object | `{label: 'name', children: 'list'}` |              树配置               |
| placeholder | String |          请在左侧勾选数据           | 右侧列表为空时的 placeholder 文案 |
|   nodeKey   | String |               userId                |     该参数必须是列表的唯一值      |

## 组件事件

|  事件名  | 返回值类型 |                         说明                          |
| :------: | :--------: | :---------------------------------------------------: |
| selected |   Array    | 当有勾选或者取消勾选时触发,返回当前已选中的人员的数据 |

## 组件内参数及方法说明

如果该组件不能满足你的项目需求，需要根据项目的实际情况进行修改，组件的方法如下，请在不影响该组件原本功能的情况下进行修改或者复制本组件进行修改。

### 0. 页面说明

页面中关键的地方就这几个，具体说明会在代码中注释

```html {6}
<el-tree
  class="tree_overflow"
  ref="tree" // 给组件绑定一个ref，用于获取到elementUI的tree组件的实例
  :data="treeData" // 将列表树数据传递给组件
  show-checkbox  // 显示复选框
  :node-key="nodeKey" // *重要* 该参数必须是列表的唯一值
  :filter-node-method="filterNode" // 过滤搜索框的方法
  @check-change="handleCheckChange"  // 左侧列表勾选或者取消勾选时触发
  :props="prop" // 树形列表组件的配置
></el-tree>
```

```html {4}
<span class="custom-tree-node" slot-scope="{ node, data }">
  <!-- 这里通过class来根据是否有entUserId来判断是部门还是人员，
  如果是部门就显示文件夹图标，如果是人员就显示人员图标 -->
  <i :class="!data.entUserId ? 'el-icon-folder' : 'el-icon-user'"></i>
  <span>{{ node.label }}</span>
</span>
```

```html {1}
<!-- 如果有enterpriseId，则是用户，否则是企业，企业就不显示出来了 -->
<div v-if="item.enterpriseId" class="item">
  <i :class="item.enterpriseId === 0 ? 'el-icon-folder' : 'el-icon-user'"></i>
  <span>{{ item[prop.label] }}</span>
  <span style="cursor: pointer" @click="delSingle(item)">X</span>
</div>
```

### 1.参数说明

|   参数名    |  类型  | 默认值 |      说明      |
| :---------: | :----: | :----: | :------------: |
| checkedData | Array  |   []   |   选中的数据   |
| filterText  | String |   ""   | 过滤搜索框的值 |

### 2.方法说明

> #### delSingle()

说明：该方法是在点击右侧某个选中项的删除图标时触发，用于删除单个选中项，具体原理请看代码注释

```js
delSingle(item) {
  // 调用elementUI的方法来取消选中
  this.$refs.tree.setChecked(item[this.nodeKey], false, true);
  // 从已选择的列表checkedData中删除这个元素
  this.checkedData = this.checkedData.filter(
    (el) => el[this.nodeKey] !== item[this.nodeKey]
  );
},
```

> #### handleCheckChange()

说明：该方法是在左侧列表中勾选或者取消勾选时触发，用于获取当前已经选中的节点，并且将其保存到`checkedData`中，具体原理请看代码注释

```js
handleCheckChange(node, isCheck, keys) {
  // 通过ElementUI提供的方法获取当前已经选中的节点
  const list = this.$refs.tree.getCheckedNodes();
  // 将带有entUserId的元素过滤出来，说明这条数据是用户而不是部门，然后赋值给checkedData
  this.checkedData = list.filter((el) => el.entUserId);
},
```

> #### filterNode()

- 说明：该方法是在搜索框输入值时触发，用于过滤左侧列表的数据

- 该方法为 ElementUI 提供的方法，跳转传送门：[https://element.eleme.cn/#/zh-CN/component/tree#jie-dian-guo-lu](https://element.eleme.cn/#/zh-CN/component/tree#jie-dian-guo-lu)

```js
filterNode(value, data) {
  if (!value) return true;
  return data.name.indexOf(value) !== -1;
},
```

### 3.监听器方法说明

> #### filterText()

说明：该方法是在监听搜索框绑定的值变更的方法，用于直接调用 ElementUI 提供的方法来过滤左侧列表的数据

```js
filterText(val) {
  this.$refs.tree.filter(val);
},
```

> #### checkedData()

说明：该方法是在监听选中的数据发生改变时触发，用于将选中的数据传递给父组件

```js
checkedData(newVal) {
  this.$emit("selected", newVal);
},
```
