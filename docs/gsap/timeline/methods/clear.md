# GSAP中文文档 - timeline 方法 - 清除(clear)

## 清除（clear）

清空时间线上的所有补间、时间线和回调（以及可选的标签）。

### 方法签名

```plaintext
clear( labels: Boolean ): self
```

清空时间线上的所有补间、时间线和回调（以及可选的标签）。

### 参数（Parameters）

- **labels**: Boolean
  - （默认值为 `true`）如果为 `true`（默认值），则标签也会被清除。

### 返回值（Returns）

- self
  - 返回实例本身，便于链式调用。

### 详细信息（Details）

清空时间线上的所有补间、时间线和回调（以及可选的标签）。事件回调（如 `onComplete`, `onUpdate`, `onStart` 等）不会被移除。如果您需要移除事件回调，请使用 `eventCallback()` 方法并将它们设置为 `null`，如 `myTimeline.eventCallback("onComplete", null);`
