# GSAP中文文档 - timeline 方法 - 下一个标签（nextLabel）

## 下一个标签（nextLabel）

返回在 `time` 参数之后出现的下一个标签（如果有）。如果没有提供 `time`，则使用时间线的当前播放头时间。无论时间线是否反转（"之后" 指的是在时间线的本地时间区域中更晚），都没有区别。

返回在 `time` 参数之后出现的下一个标签（如果有）。如果没有提供 `time`，则使用时间线的当前播放头时间。如果标签正好位于与 `time` 参数相同的 `time`，则会被忽略。

您可以将 `nextLabel()` 与 `tweenTo()` 结合使用，使时间线补间到下一个标签，如下所示：

```javascript
tl.tweenTo(tl.nextLabel())
```

### 方法签名

```plaintext
nextLabel(time: Number): String
```

返回在指定时间之后的第一个标签名称，如果没有提供时间，则使用当前播放头的位置。

### 参数（Parameters）

- **time**: Number（可选）
  - 要检查的特定时间。

### 返回值（Returns）

- String
  - 返回在指定时间之后的第一个标签名称，如果没有标签，则返回 `null` 或 `undefined`。
