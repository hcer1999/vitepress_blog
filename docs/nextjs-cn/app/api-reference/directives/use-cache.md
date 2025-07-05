---
title: 'use cache'
description: 了解如何使用 'use cache' 指令来缓存计算结果。
---

`'use cache'` 是一个 React 指令，允许你缓存评估返回值的结果，避免重复工作。当组件重新渲染或多个组件请求相同数据时，这可以提高性能。

```jsx
import { longRunningOperation } from './operation'

function useData() {
  'use cache'
  return longRunningOperation()
}

export default function Page() {
  const data = useData()
  ...
}
```

## 何时使用

如果你对 TypeScript 中默认的行为不清楚，可以使用 `use cache` 明确指定函数的输出应该被缓存。这在以下情况下很有用：

- **重复调用**：避免在同一请求中多次调用同一函数时的重复工作
- **数据需求重叠**：当多个组件需要相同的数据时
- **计算开销高**：用于计算密集型任务的性能优化

## 工作原理

`use cache` 会缓存函数调用的结果，用它们的参数作为缓存键。相同参数的后续调用可以重用之前的结果，而不需要重新评估函数。

请记住：

- 缓存具有**请求范围**，不会跨请求持久存在
- 指令仅适用于在服务器上执行的代码
- 它不是自动应用的——你必须明确添加 `use cache` 指令
- 你可以在函数范围内的任何位置使用 `use cache`

## 示例

### 基本用法

下面的示例说明了 `use cache` 的简单使用场景：

```jsx
function getPokemonName(id) {
  'use cache'
  console.log(`缓存未命中：获取神奇宝贝 #${id}`) // 演示缓存命中/未命中
  return fetchPokemonName(id) // 假设这是一个获取神奇宝贝的函数
}

export default function Page() {
  // 第一次调用 - 将执行函数
  const pokemon1 = getPokemonName(1)

  // 第二次使用相同的 ID - 将重用缓存的结果
  const pokemon1Again = getPokemonName(1)

  // 使用不同的 ID - 将执行函数
  const pokemon2 = getPokemonName(2)

  return (
    <div>
      <p>神奇宝贝 1: {pokemon1}</p>
      <p>相同神奇宝贝: {pokemon1Again}</p> {/* 缓存命中 */}
      <p>神奇宝贝 2: {pokemon2}</p>
    </div>
  )
}
```

### 组件之间共享数据

`use cache` 可以帮助避免多个组件请求相同数据时的冗余工作：

```jsx
// 共享数据获取函数
function fetchPokemonData(id) {
  'use cache'
  console.log(`获取神奇宝贝 #${id} 数据`)
  return fetchFromDatabase(id) // 假设的数据库调用
}

// 使用共享数据获取的两个组件
export function PokemonName({ id }) {
  const pokemon = fetchPokemonData(id) // 重用缓存的结果
  return <h1>{pokemon.name}</h1>
}

export function PokemonStats({ id }) {
  const pokemon = fetchPokemonData(id) // 重用缓存的结果
  return (
    <ul>
      <li>攻击: {pokemon.attack}</li>
      <li>防御: {pokemon.defense}</li>
    </ul>
  )
}
```

```jsx
import { PokemonName, PokemonStats } from '../components'

export default function PokemonPage({ params }) {
  const id = params.id

  return (
    <div>
      {/* 这两个组件共享同一个缓存的数据获取结果 */}
      <PokemonName id={id} />
      <PokemonStats id={id} />
    </div>
  )
}
```

## 兼容性与限制

- `use cache` 只在**服务器组件**中工作
- 该缓存限于当前请求的生命周期
- 当使用传递函数参数时，来自相同函数但不同参数值的不同调用将有不同的缓存条目
- 这主要是一个优化，不应该用于更改应用程序的行为

有关具体实现细节，请参考 [React 文档](https://react.dev/reference/rsc/use-cache)。
