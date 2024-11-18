# GSAP中文文档 - timeline 方法 - 重复延迟（repeatDelay）

## 重复延迟（repeatDelay）

repeatDelay 方法用于获取或设置时间轴在每次重复之间应该等待的秒数。

### 方法签名

```plaintext
repeatDelay(value: Number): self
```

获取或设置时间轴在每次重复之间应该等待的秒数。

### 参数（Parameters）

- **value**: Number
  - 要设置的时间轴重复之间的延迟时间（以秒为单位）。

### 返回值（Returns）

- self
  - 返回实例本身，便于链式调用。

### 详细信息（Details）

省略参数时，`repeatDelay()` 方法将返回当前的重复延迟时间（getter）。如果提供了参数，则设置时间轴的重复延迟时间（setter），并返回实例本身以便于链式调用。

例如，如果 `repeat` 设置为 `2` 且 `repeatDelay` 设置为 `1`，则时间轴将首先播放，然后等待1秒钟后重复播放，再次播放后，再等待1秒钟后进行最后一次重复。可以通过 `vars` 参数设置初始的 `repeatDelay` 值，如下所示：

```javascript
var tl = gsap.timeline({ repeat: 2, repeatDelay: 1 })
```

此方法既作为 getter 也作为 setter。省略参数时返回当前值（getter），定义参数时设置值（setter），并返回实例本身以便于链式调用，如 `myTimeline.repeat(2).yoyo(true).play();`
