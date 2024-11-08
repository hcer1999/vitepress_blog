# 方法

| 名称             | 描述                                                                                           | 示例                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `close`          | 关闭当前打开的SweetAlert，就像你按下了取消按钮一样。                                           | `swal.close()`                                        |
| `getState`       | 获取当前SweetAlert弹窗的状态。                                                                 | `swal.getState()`                                     |
| `setActionValue` | 更改弹窗按钮的承诺值。你可以只传递一个字符串（默认情况下它会更改确认按钮的值），或者一个对象。 | `swal.setActionValue({ confirm: 'Text from input' })` |
| `stopLoading`    | 移除弹窗按钮上的所有加载状态。与按钮选项`closeModal: false`结合使用。                          | `swal.stopLoading()`                                  |
