# gsap.config()

`gsap.config()` 允许您配置 GSAP 的非补间动画特定设置，如 `autoSleep`、`force3D` 和 `units`。要影响应该由个别补间动画 **继承** 的属性，请改用 `gsap.defaults()`。以下是 config() 选项的列表：

- **`autoSleep`** - 在 GSAP 内部检查是否应该关闭内部计时器以节省系统资源和移动设备上的电池寿命之间的帧数。默认值为 `120`（大约每 2 秒）。
- **`force3D`** - GSAP 会自动尝试通过应用带有 3D 组件的变换，如 `translate3d()` 而不是 `translate()`，在动画期间激活 GPU 加速，然后在可能的情况下在动画结束时切换回 2D 变体以节省 GPU 内存。这描述了 `force3D:"auto"` 行为（默认设置）。设置 `force3D: false` 会禁用这种行为。设置 `force3D: true` 将强制所有与变换相关的补间动画使用 3D 组件，并且在补间动画结束时不切换回 2D。
- **`nullTargetWarn`** - 默认情况下，当尝试对不存在（为 null）的元素进行补间动画时，GSAP 会抛出警告。您可以通过设置 `nullTargetWarn: false` 来关闭此警告。
- **`trialWarn`** - 如果加载了会员专属插件的试用版本，则会在控制台记录警告。要禁用此警告，请设置 `trialWarn: false`。
- **`units`** - 当未提供单位时，为各种属性设置要使用的默认 CSS 单位。例如，`{left: 100}` 将 CSS "left" 属性补间动画到 100px，因为 "left" 属性的默认单位是 "px"。如果您希望 `{left: 100}` 默认补间动画到 100%，您可以定义 `gsap.config({units: {left: "%"}})`。只有您设置的属性会被更改。大多数数字的默认单位是 `"px"`，旋转相关的值是 `"deg"`。

### 示例

```javascript
// 您只需要定义您想要更改的配置设置。省略的属性将不受影响。
gsap.config({
  autoSleep: 60,
  force3D: false,
  nullTargetWarn: false,
  trialWarn: false,
  units: { left: '%', top: '%', rotation: 'rad' },
})
```

这段示例代码展示了如何修改 GSAP 的全局配置。您可以根据需要调整这些设置，以优化 GSAP 在您的项目中的性能和行为。
