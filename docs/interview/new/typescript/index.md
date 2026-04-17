## 1. 说说对 TypeScript 中命名空间与模块的理解？区别？

**参考答案： &#x20;**

一、模块

`TypeScript` 与` ECMAScript` 2015 一样，任何包含顶级 `import` 或者 `export` 的文件都被当成一个模块

相反地，如果一个文件不带有顶级的`import`或者`export`声明，那么它的内容被视为全局可见的

例如我们在在一个 `TypeScript` 工程下建立一个文件 `1.ts`，声明一个变量`a`，如下：

```javascript
const a = 1
```

然后在另一个文件同样声明一个变量`a`，这时候会出现错误信息&#x20;

![](<images/9. TypeScript（46题）-image-1.png>)

提示重复声明`a`变量，但是所处的空间是全局的

如果需要解决这个问题，则通过`import`或者`export`引入模块系统即可，如下：

```javascript
const a = 10

export default a
```

在`typescript`中，`export`关键字可以导出变量或者类型， 用法与`es6`模块一致，如下：&#x20;

```javascript
export const a = 1
export type Person = {
    name: String
}
```

通过`import` 引入模块，如下：

```javascript
import { a, Person } from './export'
```

二、命名空间

命名空间一个最明确的目的就是解决重名问题

命名空间定义了标识符的可见范围，一个标识符可在多个名字空间中定义，它在不同名字空间中的含义是互不相干的

这样，在一个新的名字空间中可定义任何标识符，它们不会与任何已有的标识符发生冲突，因为已有的定义都处于其他名字空间中

`TypeScript` 中命名空间使用 `namespace` 来定义，语法格式如下：

```javascript
namespace SomeNameSpaceName {
   export interface ISomeInterfaceName {      }
   export class SomeClassName {      }
}
```

以上定义了一个命名空间 `SomeNameSpaceName`，如果我们需要在外部可以调用 `SomeNameSpaceName` 中的类和接口，则需要在类和接口添加 `export` 关键字

使用方式如下：

```javascript
SomeNameSpaceName.SomeClassName
```

命名空间本质上是一个对象，作用是将一系列相关的全局变量组织到一个对象的属性，如下：

```javascript
namespace Letter {
  export let a = 1;
  export let b = 2;
  export let c = 3;
  // ...
  export let z = 26;
}
```

编译成`js`如下：

```javascript
var Letter
;(function (Letter) {
  Letter.a = 1
  Letter.b = 2
  Letter.c = 3
  // ...
  Letter.z = 26
})(Letter || (Letter = {}))
```

&#x20;

三、区别

- 命名空间是位于全局命名空间下的一个普通的带有名字的 JavaScript 对象，使用起来十分容易。但就像其它的全局命名空间污染一样，它很难去识别组件之间的依赖关系，尤其是在大型的应用中

- 像命名空间一样，模块可以包含代码和声明。 不同的是模块可以声明它的依赖

- 在正常的TS项目开发过程中并不建议用命名空间，但通常在通过 d.ts 文件标记 js 库类型的时候使用命名空间，主要作用是给编译器编写代码的时候参考使用

---

## 2. 说说你对 typescript 的理解？与 javascript 的区别？

**参考答案：**

一、是什么

`TypeScript` 是 `JavaScript` 的类型的超集，支持`ES6`语法，支持面向对象编程的概念，如类、接口、继承、泛型等

> <span style="color: rgb(36,91,219); background-color: inherit">超集，不得不说另外一个概念，子集，怎么理解这两个呢，举个例子，如果一个集合A里面的的所有元素集合B里面都存在，那么我们可以理解集合B是集合A的超集，集合A为集合B的子集</span>

![](<images/9. TypeScript（46题）-image-3.png>)

其是一种静态类型检查的语言，提供了类型注解，在代码编译阶段就可以检查出数据类型的错误

同时扩展了` JavaScript` 的语法，所以任何现有的` JavaScript` 程序可以不加改变的在 `TypeScript` 下工作

为了保证兼容性，`typescript`在编译阶段需要编译器编译成纯`Javascript`来运行，是为大型应用之开发而设计的语言，如下：

`tsx`文件如下：

```javascript
const hello : string = "Hello World!"
console.log(hello)
```

编译文件后：

```javascript
const hello = 'Hello World!'
console.log(hello)
```

二、特性

`typescript`的特性主要有如下：

- 类型批注和编译时类型检查 ：在编译时批注变量类型

- 类型推断：ts中没有批注变量类型会自动推断变量的类型

- 类型擦除：在编译过程中批注的内容和接口会在运行时利用工具擦除

- 接口：ts中用接口来定义对象类型

- 枚举：用于取值被限定在一定范围内的场景

- Mixin：可以接受任意类型的值

- 泛型编程：写代码时使用一些以后才指定的类型

- 名字空间：名字只在该区域内有效，其他区域可重复使用该名字而不冲突

- 元组：元组合并了不同类型的对象，相当于一个可以装不同类型数据的数组

- ...

类型批注

通过类型批注提供在编译时启动类型检查的静态类型，这是可选的，而且可以忽略而使用`JavaScript`常规的动态类型

```javascript
function Add(left: number, right: number): number {
 return left + right;
}
```

对于基本类型的批注是`number`、`bool`和`string`，而弱或动态类型的结构则是`any`类型

类型推断

当类型没有给出时，TypeScript编译器利用类型推断来推断类型，如下：

```javascript
let str = 'string'
```

变量`str`被推断为字符串类型，这种推断发生在初始化变量和成员，设置默认参数值和决定函数返回值时

如果由于缺乏声明而不能推断出类型，那么它的类型被视作默认的动态`any`类型

接口

接口简单来说就是用来描述对象的类型 数据的类型有`number`、` null`、` string`等数据格式，对象的类型就是用接口来描述的

```javascript
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25
};
```

三、区别

- ypeScript 是 JavaScript 的超集，扩展了 JavaScript 的语法

- TypeScript 可处理已有的 JavaScript 代码，并只对其中的 TypeScript 代码进行编译

- TypeScript 文件的后缀名 .ts （.ts，.tsx，.dts），JavaScript 文件是 .js

- 在编写 TypeScript 的文件的时候就会自动编译成 js 文件

更多的区别如下图所示：

![](<images/9. TypeScript（46题）-image-2.png>)

---

## 3. Typescript中泛型是什么？

**参考答案：**

一、是什么

泛型程序设计（generic programming）是程序设计语言的一种风格或范式

泛型允许我们在强类型程序设计语言中编写代码时使用一些以后才指定的类型，在实例化时作为参数指明这些类型 在`typescript`中，定义函数，接口或者类的时候，不预先定义好具体的类型，而在使用的时候在指定类型的一种特性

假设我们用一个函数，它可接受一个 `number` 参数并返回一个` number` 参数，如下写法：

```javascript
function returnItem (para: number): number {
    return para
}
```

如果我们打算接受一个 `string` 类型，然后再返回 `string`类型，则如下写法：

```javascript
function returnItem (para: string): string {
    return para
}
```

上述两种编写方式，存在一个最明显的问题在于，代码重复度比较高

虽然可以使用 `any`类型去替代，但这也并不是很好的方案，因为我们的目的是接收什么类型的参数返回什么类型的参数，即在运行时传入参数我们才能确定类型

这种情况就可以使用泛型，如下所示：

```javascript
function returnItem<T>(para: T): T {
    return para
}
```

可以看到，泛型给予开发者创造灵活、可重用代码的能力

二、使用方式

泛型通过`<>`的形式进行表述，可以声明：

- 函数

- 接口

- 类

函数声明

声明函数的形式如下：

```javascript
function returnItem<T>(para: T): T {
    return para
}
```

定义泛型的时候，可以一次定义多个类型参数，比如我们可以同时定义泛型 `T` 和 泛型 `U`：

```javascript
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

swap([7, 'seven']); // ['seven', 7]
```

接口声明

声明接口的形式如下：

```javascript
interface ReturnItemFn<T> {
    (para: T): T
}
```

那么当我们想传入一个number作为参数的时候，就可以这样声明函数:

```javascript
const returnItem: ReturnItemFn<number> = para => para
```

类声明

使用泛型声明类的时候，既可以作用于类本身，也可以作用于类的成员函数

下面简单实现一个元素同类型的栈结构，如下所示：

```javascript
class Stack<T> {
    private arr: T[] = []

    public push(item: T) {
        this.arr.push(item)
    }

    public pop() {
        this.arr.pop()
    }
}
```

使用方式如下：

```javascript
const stack = new Stacn<number>()
```

如果上述只能传递 `string` 和 `number` 类型，这时候就可以使用 `<T extends xx>` 的方式猜实现约束泛型，如下所示：

![](<images/9. TypeScript（46题）-image-4.png>)

除了上述的形式，泛型更高级的使用如下：

例如要设计一个函数，这个函数接受两个参数，一个参数为对象，另一个参数为对象上的属性，我们通过这两个参数返回这个属性的值

这时候就设计到泛型的索引类型和约束类型共同实现

索引类型、约束类型

索引类型 `keyof T` 把传入的对象的属性类型取出生成一个联合类型，这里的泛型 U 被约束在这个联合类型中，如下所示：

```javascript
function getValue<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key] // ok
}
```

上述为什么需要使用泛型约束，而不是直接定义第一个参数为 `object`类型，是因为默认情况 `object` 指的是`{}`，而我们接收的对象是各种各样的，一个泛型来表示传入的对象类型，比如 `T extends object`

使用如下图所示：

![](<images/9. TypeScript（46题）-image.png>)

多类型约束

例如如下需要实现两个接口的类型约束：

```javascript
interface FirstInterface {
  doSomething(): number
}

interface SecondInterface {
  doSomethingElse(): string
}
```

可以创建一个接口继承上述两个接口，如下：

```javascript
interface ChildInterface extends FirstInterface, SecondInterface {

}
```

正确使用如下：

```javascript
class Demo<T extends ChildInterface> {
  private genericProperty: T

  constructor(genericProperty: T) {
    this.genericProperty = genericProperty
  }
  useT() {
    this.genericProperty.doSomething()
    this.genericProperty.doSomethingElse()
  }
}
```

通过泛型约束就可以达到多类型约束的目的

三、应用场景

通过上面初步的了解，后述在编写 `typescript` 的时候，定义函数，接口或者类的时候，不预先定义好具体的类型，而在使用的时候在指定类型的一种特性的时候，这种情况下就可以使用泛型

灵活的使用泛型定义类型，是掌握`typescript` 必经之路

---

## 4. TypeScript中有哪些声明变量的方式？

**参考答案：**

1. 使用 `let` 关键字：

```javascript
let x: number = 10;
```

- 使用 `const` 关键字来声明常量：

```javascript
const pi: number = 3.14;
```

- 使用 `var` 关键字（不推荐，通常在ES6之前使用）：

```javascript
var name: string = "John";
```

- 使用函数作用域声明变量

```javascript
function example() {
    var localVar: number = 42;
}
```

- 使用函数参数的方式声明变量：

```javascript
function greet(name: string) {
    console.log(`Hello, ${name}!`);
}
```

- 使用对象字面量声明变量：

```javascript
let person: { name: string, age: number } = { name: "Alice", age: 30 };
```

- 使用数组字面量声明数组变量：

```javascript
let numbers: number[] = [1, 2, 3, 4, 5];
```

- 使用接口声明对象的结构：

```javascript
interface Person {
    name: string;
    age: number;
}

let person: Person = { name: "Bob", age: 25 };
```

- 使用类来声明对象：

```javascript
class Animal {
    constructor(public name: string, public species: string) {}
}

let cat: Animal = new Animal("Fluffy", "Cat");
```

---

## 5. 什么是Typescript的方法重载？

**参考答案：**

在TypeScript中，方法重载（Method Overloading）是一种允许函数在不同参数数量或参数类型下具有不同的返回类型或行为的特性。这允许您以一种更灵活的方式定义函数，并根据传入的参数类型或数量来选择适当的行为或返回类型。

方法重载通常用于提供更加严格的类型检查和更好的类型推断，以及在代码中提供更清晰的接口。它使得函数可以根据不同的参数签名，提供不同的实现方式，而无需使用额外的运行时检查。

要定义方法重载，您需要按照以下步骤进行：

1. 首先，定义一个函数的多个签名（overload signatures）。每个签名包含一个参数列表和一个返回类型。

2. 然后，定义一个实际的函数体，这个函数体实现了多个签名所涵盖的不同情况。

这里有一个简单的例子，演示了如何在TypeScript中使用方法重载：

```javascript
function greet(name: string): string;
function greet(age: number): string;
function greet(value: string | number): string {
  if (typeof value === "string") {
    return `Hello, ${value}!`;
  } else {
    return `You are ${value} years old!`;
  }
}

console.log(greet("Lydia")); // Output: "Hello, Lydia!"
console.log(greet(30)); // Output: "You are 30 years old!"
```

上面定义了`greet`函数的两个不同的签名：一个接受`string`类型参数，另一个接受`number`类型参数。然后，我们实现了一个函数体，根据传入的参数类型进行相应的处理。

使用方法重载，TypeScript能够更好地检查函数调用，以确保传递的参数类型与预期的类型相符，并提供适当的类型推断，从而增加代码的类型安全性和可读性。

---

## 6. 请实现下面的 sleep 方法

```javascript
/**
 * @file 返回一个 Promise，并在 ms 毫秒后 Promise 变为完成状态
 */

export function sleep(ms: number): Promise<undefined> {
  // 补全此处代码
    throw new Error('功能待实现');
}

async function main(){
    console.log('a')
    await sleep(1000);
    console.log('b');
    await sleep(1000);
    console.log('c');
}
main()

export default {}
```

**参考答案：**

```javascript
/**
 * @file 返回一个 Promise，并在 ms 毫秒后 Promise 变为完成状态
 */

export function sleep(ms: number): Promise<undefined> {
  // 参考答案
  return new Promise(
    (
      resolve: (value: undefined) => void,
      reject: (value: undefined) => void
    ) => {
      setTimeout(() => {
        resolve(undefined);
      }, ms);
    }
  );
}

async function main() {
  console.log("a");
  await sleep(1000);
  console.log("b");
  await sleep(1000);
  console.log("c");
}
main();

export default {};
```

---

## 7. typescript 中的 is 关键字有什么用？

**参考答案：**

TypeScript 中的 `is` 关键字用于类型保护，可以在运行时判断一个对象是否属于某个类型，并根据不同的类型执行不同的逻辑。

具体来说，`is` 关键字通常和 `instanceof` 运算符一起使用，用于判断一个对象是否是某个类的实例。例如：

```javascript
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
}

function isDog(animal: Animal): animal is Dog {
    return (animal as Dog).breed !== undefined;
}

let a1 = new Animal("Tom");
let d1 = new Dog("Tony", "Poodle");

console.log(isDog(a1));  // false
console.log(isDog(d1));  // true
```

在上面的代码中，我们定义了一个 `isDog` 函数，它接受一个 `Animal` 类型的参数，返回值是一个布尔值。如果这个参数是 `Dog` 类型的实例，则返回 `true`；否则返回 `false`。注意，这里我们使用 `animal is Dog` 语法来显式地指定返回值类型为布尔值，表示这个函数就是一个类型谓词函数。

在 `isDog` 函数中，我们通过判断传入的 `animal` 参数是否含有 `breed` 属性，来判断它是否是 `Dog` 类型的实例。如果是，则返回 `true`；否则返回 `false`。

最后，我们可以通过调用 `isDog` 函数来判断一个对象是否是 `Dog` 类型的实例，并根据不同的类型执行相应的逻辑。

---

## 8. TypeScript支持的访问修饰符有哪些？

**参考答案：**

TypeScript支持访问修饰符 public，private 和 protected，它们决定了类成员的可访问性。

- 公共（public），类的所有成员，其子类以及该类的实例都可以访问。

- 受保护（protected），该类及其子类的所有成员都可以访问它们。 但是该类的实例无法访问。

- 私有（private），只有类的成员可以访问它们。

如果未指定访问修饰符，则它是隐式公共的，因为它符合 JavaScript 的便利性。

---

## 9. 请实现下面的 myMap 方法

```javascript
/**
 * @file 实现数组 map 方法
 */

function myMap<T, R>(arr: T[], callbackFn: (v: T) => R): R[] {
    // 补全此处代码，可以使用除数组 map 以外的其他任何函数
    throw new Error('功能待实现');
}
// 测试
console.log(myMap([1, 2, 3], v => v * 2)) // [2, 4, 6]

export default {};
```

**参考答案：**

```javascript
/**
 * @file 实现数组 map 方法
 */

function myMap<T, R>(arr: T[], callbackFn: (v: T) => R): R[] {
  // 参考答案
  var arr1: R[] = [];
  for (var i = 0; i < arr.length; i++) {
    arr1[i] = callbackFn(arr[i]);
  }
  return arr1;
}
// 测试
console.log(myMap([1, 2, 3], (v) => v * 2)); // [2, 4, 6]

export default {};
```

---

## 10. 请实现下面的 treePath 方法

```javascript
/**
 * @file 二叉树所有路径
 */

type Tree = {
    value: number;
    left?: Tree;
    right?: Tree;
}
const tree: Tree = {
    value: 1,
    left: {
        value: 2,
        right: { value: 5 }
    },
    right: { value: 3 }
};
function treePath(root: Tree): string[] {
    // 补全此处代码
    throw new Error('功能待实现');
}
console.log(treePath(tree)) // [ '1->2->5', '1->3' ]

export default {}
```

**参考答案：**

```javascript
/**
 * @file 二叉树所有路径
 */

type Tree = {
  value: number;
  left?: Tree;
  right?: Tree;
};

const tree: Tree = {
  value: 1,
  left: {
    value: 2,
    right: { value: 5 },
  },
  right: { value: 3 },
};

function treePath(root: Tree): string[] {
  const answer: [] = [];
  let tmp: [][] = [];
  const travel = (r: Tree) => {
    if (r == null) {
      return;
    }
    //@ts-ignore
    tmp.push(r.value);
    if (r.left == null && r.right == null) {
      //@ts-ignore
      answer.push(tmp);
      tmp = [tmp[0]];
      return;
    }
    if (r.left) travel(r.left);
    if (r.right) travel(r.right);
  };
  travel(root);
  //@ts-ignore
  return answer.map((t) => t.join("->"));
}
console.log(treePath(tree)); // [ '1->2->5', '1->3' ]

export default {};
```

---

## 11. 请实现下面的 product 方法

```javascript
/**
@file 计算数组笛卡尔积 */
// 示例 product([1, 2], [3, 4]) // [[1, 3], [1, 4], [2, 3], [2, 4]]
function product(xList: number[], yList: number[]): [number, number][] { // 补全内部实现 throw new Error('功能待实现'); }
export default {}
```

```javascript
/**
 * @file 计算数组笛卡尔积
 */

// 示例
console.log(product([1, 2], [3, 4])); // [[1, 3], [1, 4], [2, 3], [2, 4]]

function product(xList: number[], yList: number[]): [number, number][] {
  // 参考答案
  return xList.reduce((v, t) => {
    return v.concat(yList.map((item) => [t, item]));
  }, [] as [number, number][]);
}

export default {};
```

---

## 12. 请实现下面的 myAll 方法

```javascript
/**
 * @file 实现 PromiseAll 方法
 */

import { sleep } from "./8.sleep";

async function myAll<T extends unknown[] | []>(values: T): Promise<{ [P in keyof T]: Awaited<T[P]> }> {
    // 补全此处代码，使用 Promise.all 以外的语法完成
    throw new Error('功能待实现');
}

// 一秒钟后返回结果 value
async function request(value: string) {
    await sleep(1000);
    return value;
}
async function main() {
    console.log('start');
    const res = await myAll([
        request('a'),
        request('b'),
        request('c'),
    ])
    console.log(res); // 预期输出 start 一秒后输出 ['a', 'b', 'c']
}
main()

export default {}
```

**参考答案：**

```javascript
/**
 * @file 实现 PromiseAll 方法
 */

import { sleep } from "./8.sleep";

async function myAll<T extends unknown[] | []>(
  values: T
): Promise<{ [P in keyof T]: Awaited<T[P]> }> {
  // 补全此处代码，使用 Promise.all 以外的语法完成
  // throw new Error('功能待实现');
  var arr = [];
  for (var i = 0; i < values.length; i++) {
    arr.push(await values[i]);
  }
  return arr as { [P in keyof T]: Awaited<T[P]> };
}

// 一秒钟后返回结果 value
async function request(value: string) {
  await sleep(1000);
  return value;
}
async function main() {
  console.log("start");
  const res = await myAll([request("a"), request("b"), request("c")]);
  console.log(res); // 预期输出 start 一秒后输出 ['a', 'b', 'c']
}
main();

export default {};
```

---

## 13. 请实现下面的 sum 方法

```javascript
/**
 * @file 假设加法是一个异步过程，如何计算多个数组之和？
 */
function sleep(ms: number) {
    return new Promise(r => {
        setTimeout(() => {
            r(undefined)
        }, ms);
    })
}

async function asyncAdd(a: number, b: number) {
    await sleep(1000);
    return a + b;
}

function sum(arr: number[]): Promise<number> {
    // 补全这里代码，涉及 arr 中两数求和只能使用 asyncAdd，禁止使用加号
    throw new Error('功能待实现');
}

console.time('a')
sum([1, 2, 3, 4, 5, 6, 7, 8])
    .then(v => {
        console.log(v) // 36
        console.timeEnd('a') // a: <耗时>
    })

export default {}
```

**参考答案：**

```javascript
/**
 * @file 假设加法是一个异步过程，如何计算多个数组之和？
 */
function sleep(ms: number) {
  return new Promise((r) => {
    setTimeout(() => {
      r(undefined);
    }, ms);
  });
}

async function asyncAdd(a: number, b: number) {
  await sleep(1000);
  return a + b;
}

async function sum(arr: number[]): Promise<number> {
  // 参考答案
  var s: number = arr[0];
  for (var i = 1; i < arr.length; i++) {
    s = await asyncAdd(s, arr[i]);
  }
  return s;
}

console.time("a");
sum([1, 2, 3, 4, 5, 6, 7, 8]).then((v) => {
  console.log(v); // 36
  console.timeEnd("a"); // a: <耗时>
});

export default {};
```

---

## 14. 请实现下面的 mergeArray 方法

```javascript
/**
 * @file 合并两个有序数组
 */

function merge(arr: number[], arr2: number[]): number[] {
    // 补全此处代码
    throw new Error('功能待实现');
}

// 参数数组从小到大排列
console.log(merge([1, 2, 3], [2, 5, 6])) // [ 1, 2, 2, 3, 5, 6 ]

export default {}
```

**参考答案：**

```javascript
/**
 * @file 合并两个有序数组
 */

function merge(arr: number[], arr2: number[]): number[] {
  // 参考答案
  return arr.concat(arr2).sort((a: number, b: number) => a - b);
}

// 参数数组从小到大排列
console.log(merge([1, 2, 3], [2, 5, 6])); // [ 1, 2, 2, 3, 5, 6 ]

export default {};
```

---

## 15. 实现下面的 firstSingleChar 方法

```javascript
/**
 * @file 找出字符串中第一个只出现一次的字符
 */

function firstSingleChar(str: string) {
    // 补全此处代码
    throw new Error('功能待实现');
}

// a 和 b 都出现了两次，只有 c 出现了一次，返回 c
console.log(firstSingleChar('abcba')) // c
// b c d 都出现了一次，返回第一个
console.log(firstSingleChar('aabcdee')) // b
// a 和 b 都出现了多次，没有只出现一次的元素，返回 undefined
console.log(firstSingleChar('aaaabbbb')) // undefined

export default {}
```

**参考答案：**

```javascript
/**
 * @file 找出字符串中第一个只出现一次的字符
 */

function firstSingleChar(str: string) {
  // 参考答案
  return str.split("").filter((item: string, index: number, arr: string[]) => {
    arr.splice(index, 1);
    return !arr.includes(item);
  })[0];
}

// a 和 b 都出现了两次，只有 c 出现了一次，返回 c
console.log(firstSingleChar("abcba")); // c
// b c d 都出现了一次，返回第一个
console.log(firstSingleChar("aabcdee")); // b
// a 和 b 都出现了多次，没有只出现一次的元素，返回 undefined
console.log(firstSingleChar("aaaabbbb")); // undefined
console.log(firstSingleChar("dabvb"));

export default {};
```

---

## 16. 实现下面的 reverseWord 方法

```javascript
/**
 * @file 反转句子
 *
 * 同时满足以下条件：1、去除首尾空格，2、单词间隔中多个空格变成一个；
 * 注意console示例运行结果
 */

function reverseWord(str: string) {
    // 补全此处代码
    throw new Error('功能待实现');
}

console.log(reverseWord('the sky is blue')); // blue is sky the
// 去除首尾空格
console.log(reverseWord("  hello world  ")); // world hello
// 单词间隔中多个空格变成一个
console.log(reverseWord("a good   example")); // example good a

export default {}
```

**参考答案：**

```javascript
/**
 * @file 反转句子
 *
 * 同时满足以下条件：1、去除首尾空格，2、单词间隔中多个空格变成一个；
 * 注意console示例运行结果
 */

function reverseWord(str: string):string {
    // 参考答案
    return (<string[]>str.match(/\S+/g)).reverse().join(" ");
}

console.log(reverseWord('the sky is blue')); // blue is sky the
// 去除首尾空格
console.log(reverseWord("  hello world  ")); // world hello
// 单词间隔中多个空格变成一个
console.log(reverseWord("a good   example")); // example good a

export default {}
```

---

## 17. 如何定义一个数组，它的元素可能是字符串类型，也可能是数值类型？

**参考答案：**

```javascript
 // 方法1：
let arr1: (number | string)[] = [1]
arr1.push(1)
arr1.push('3')

// 方法2：
let  arr2 : Array<string | number> = [1, '2']
arr2.push(1)
arr2.push('3')

// 方法3：
type newType = number|string
let arr3:newType []= [3]
arr3.push(1)
arr4.push('5')
```

---

## 18. 请补充 objToArray 函数

```javascript
/**
 * @file objToArray
 *
 * 将对象按照要求转为数组
 * 注意console示例运行结果
 */
type Obj = Record<string, string>;
interface FormatItem {
  key: string;
  op: string;
  value: string;
}

function objToArray(obj: Record<string, Obj>): FormatItem[] {
  // 补全此处代码
  throw new Error("功能待实现");
}

console.log(
  objToArray({
    key1: {
      op1: "value1",
    },
    key2: {
      op2: "value2",
    },
  })
);
// result示例
// [
//     {key: 'key1', op: 'op1', value: 'value1'},
//     {key: 'key2', op: 'op2', value: 'value2'}
// ]

export default {};
```

**参考答案：**

```javascript
/**
 * @file objToArray
 *
 * 将对象按照要求转为数组
 * 注意console示例运行结果
 */
type Obj = Record<string, string>;
interface FormatItem {
  key: string;
  op: string;
  value: string;
}

function objToArray(obj: Record<string, Obj>): FormatItem[] {
  return Object.keys(obj).reduce((value: Array<FormatItem>, key: string) => {
    var op: string = Object.keys(obj[key])[0];
    value.push({ key: key, op: op, value: obj[key][op] });
    return value;
  }, []);
}

console.log(
  objToArray({
    key1: {
      op1: "value1",
    },
    key2: {
      op2: "value2",
    },
  })
);
// result示例
// [
//     {key: 'key1', op: 'op1', value: 'value1'},
//     {key: 'key2', op: 'op2', value: 'value2'}
// ]

export default {};
```

---

## 19. 使用TS实现一个判断传入参数是否是数组类型的方法

**参考答案：**

unknown 用于变量类型不确定，但肯定可以确定的情形下，比如下面这个示例中，参数总归会有个值，根据这个值的类型进行不同的处理，这里使用 unknown 替代 any 则会更加类型安全

```javascript
function isArray(x: unknown): boolean {
        return Array.isArray(x)
}
```

---

## 20. TypeScript 的内置数据类型有哪些？

**参考答案：**

- boolean：表示布尔值，可以是 true 或 false。

- number：表示数字，包括整数和浮点数。

- string：表示字符串。可以使用单引号或双引号来表示字符串。

- void：表示没有任何返回值的函数的返回类型。

- null 和 undefined：这两个类型是所有类型的子类型。 symbol：表示独特的值，类似于数字或字符串。

除此之外，TypeScript 还支持以下复合类型：

- array：表示一个元素类型为 T 的数组。例如，number\[] 表示一个数字数组。

- tuple：表示已知元素数量和类型的数组。例如，\[string, number] 表示一个字符串和数字组成的元组。

- enum：表示一个命名的常量枚举。

- any：表示任意类型。

- unknown：与 any 类似，但是在更严格的类型检查下使用。

- object：表示非原始类型的对象。

- 还有一些其他的类型，例如 never、union 和 intersection，它们可以用于描述更复杂的类型。

---

## 21. ts中any和unknown有什么区别？

**参考答案：**

unknown 和 any 的主要区别是 unknown 类型会更加严格：在对 unknown 类型的值执行大多数操作之前，我们必须进行某种形式的检查。而在对 any 类型的值执行操作之前，我们不必进行任何检查。

举例说明：

```javascript
let foo: any = 123;
console.log(foo.msg); // 符合TS的语法
let a_value1: unknown = foo;   // OK
let a_value2: any = foo;      // OK
let a_value3: string = foo;   // OK

let bar: unknown = 222; // OK
console.log(bar.msg); // Error
let k_value1: unknown = bar;   // OK
let K_value2: any = bar;      // OK
let K_value3: string = bar;   // Error
```

因为bar是一个未知类型(任何类型的数据都可以赋给 `unknown` 类型)，所以不能确定是否有msg属性。不能通过TS语法检测；而 unknown 类型的值也不能将值赋给 any 和 unknown 之外的类型变量

总结

any 和 unknown 都是顶级类型，但是 unknown 更加严格，不像 any 那样不做类型检查，反而 unknown 因为未知性质，不允许访问属性，不允许赋值给其他有明确类型的变量。

---

## 22. 如何将 unknown 类型指定为一个更具体的类型？

**参考答案：**

- 使用 typeof 进行类型判断（这些缩小类型范围的技术都有助于TS基于控制流程下的类型分析）

```javascript
  function unknownToString(value: unknown): string {
    if (typeof value === "string") {
     return value;
    }

    return String(value);
  }
```

- 对 unknown 类型使用类型断言

要强制编译器信任类型为 unknown 的值为给定类型，则可以使用类型断言：

```javascript
  const value: unknown = "Hello World";
  const foo: string = value; // Error
  const bar: string = value as string; // OK
```

断言错了时语法能通过检测，但是运行的时候就会报错了！

```javascript
  const value: unknown = "Hello World";

  const bar: number = value as number; // runtime Error
```

---

## 23. 使用ts实现一个判断入参是否是数组类型的方法？

**参考答案：**

unknown 用于变量类型不确定，但肯定可以确定的情形下，比如下面这个示例中，入参总归会有个值，根据这个值的类型进行不同的处理，这里使用 unknown 替代 any 则会更加类型安全。

```javascript
function isArray(x: unknown): boolean {
  if (Array.isArray(x)) {
    return true;
  }
  return false;
}
```

---

## 24. tsconfig.json文件有什么用？

**参考答案：**

tsconfig.json文件是JSON格式的文件。

在tsconfig.json文件中，可以指定不同的选项来告诉编译器如何编译当前项目。

目录中包含tsconfig.json文件，表明该目录是TypeScript项目的根目录。

```javascript
// 常用配置
{
  /*
      tsconfig.json是ts编译器的配置文件，ts可以根据它的信息来对待吗进行编译 可以再tsconfig中写注释
      include : 用来指定哪些文件需要被编译
      exclude : 用来指定哪些文件不需要被编译 ：默认node_module
      extends : 用来指定继承的配置文件
      files   : 用来指定被编译的文件列表，只有编译少量文件才使用
      compilerOptions : 编译器的选项是配置文件中非常重要也是非常复杂的配置选项
  */
  "include":[
    // ** : 任意目录 ， * : 任意文件
    "./src/**/*"
  ],
  "exclude": [
    "./src/hello/**/*"
  ],
  // "extends": "./configs/base",
  "files": [
    "1.ts",
    // "2.ts"
  ],
  "compilerOptions": {
    // 用来指定 ES 版本 ESNext : 最新版。 'ES3', 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', 'ESNext'
    "target": "ES2020",
    // 指定要使用模块化的规范 : 'None', 'CommonJS', 'AMD', 'System', 'UMD', 'ES6'/'ES2015', 'ES2020' or 'ESNext'
    "module": "ESNext",
    // 用来指定项目中要使用的库 'ES5', 'ES6', 'ES2015', 'ES7', 'ES2016', 'ES2017', 'ES2018', 'ESNext', 'DOM', 'DOM.Iterable',
    //                          'WebWorker', 'ScriptHost', 'ES2015.Core', 'ES2015.Collection', 'ES2015.Generator', 'ES2015.Iterable',
    //                          'ES2015.Promise', 'ES2015.Proxy', 'ES2015.Reflect', 'ES2015.Symbol', 'ES2015.Symbol.WellKnown',
    //                          'ES2016.Array.Include', 'ES2017.object', 'ES2017.Intl', 'ES2017.SharedMemory', 'ES2017.String',
    //                          'ES2017.TypedArrays', 'ES2018.Intl', 'ES2018.Promise', 'ES2018.RegExp', 'ESNext.AsyncIterable',
    //                          'ESNext.Array', 'ESNext.Intl', 'ESNext.Symbol'
    // 运行在浏览器中不用设置，运行在node或其他中才需要设置
    // "lib":[]，
    // 用来指定编译后文件的存放位置
    "outDir":"./dist",
    // 将代码合并为一个文件,设置之后所有的全局作用域中的代码会合并到同一个文件中 但是只能在  'amd' and 'system' 中才能使用
    // "outFile": "./dist/app.js",
    // 是否对js文件进行编译，默认false
    "allowJs": false,
    // 是否检查js代码是否符合语法规范，默认false
    "checkJs": false,
    // 是否移除注释，默认false
    "removeComments":false,
    // 是否不生成编译后文件，默认false
    "noEmit": false,
    // 当有错误时是否生成文件，默认false
    "noEmitOnError": false,
    // 是否生成sourceMap，默认false  这个文件里保存的，是转换后代码的位置，和对应的转换前的位置。有了它，出错的时候，通过断点工具可以直接显示原始代码，而不是转换后的代码。
    "sourceMap":false,

    // 所有的严格检查的总开关，默认false
    "strict": false,
    // 编译后的文件是否开启严格模式，默认false
    "alwaysStrict": false,
    // 不允许隐式的any，默认false(允许)
    "noImplicitAny": false,
    // 不允许隐式的this，默认false(允许)
    "noImplicitThis": false,
    // 是否严格的检查空值，默认false 检查有可能为null的地方
    "strictNullChecks": true,
    // 是否严格检查bind、call和apply的参数列表，默认false  检查是否有多余参数
    "strictBindCallApply":false,
    // 是否严格检查函数的类型，
    "strictFunctionTypes":false,
    // 是否严格检查属性是否初始化，默认false
    "strictPropertyInitialization":false,

    // 是否检查switch语句包含正确的break，默认false
    "noFallthroughCasesInSwitch":false,
    // 检查函数没有隐式的返回值，默认false
    "noImplicitReturns":false,
    // 是否检查检查未使用的局部变量，默认false
    "noUnusedLocals":false,
    // 是否检查未使用的参数，默认false
    "noUnusedParameters":false,

    // 是否检查不可达代码报错，默认false   true，忽略不可达代码 false，不可达代码将引起错误
    "allowUnreachableCode":false
  }
```

---

## 25. TypeScript中的 Declare 关键字有什么用？

**参考答案：**

JavaScript库或框架没有TypeScript声明文件。 但是，如果要在TypeScript文件中使用它们而没有任何编译错误，则必须使用declare关键字。 declare关键字用于环境声明和您要定义可能在其他位置存在的变量的方法。

如果要在我们的TypeScript代码中使用该库，则可以使用以下代码：

```javascript
declare var myLibrary;
```

TypeScript运行时会将myLibrary变量分配为 any。

---

## 26. 解释一下TypeScript中的枚举。

**参考答案：**

枚举是TypeScipt数据类型，它允许我们定义一组命名常量。 使用枚举使记录意图或创建一组不同的案例变得更加容易。 它是相关值的集合，可以是数字值或字符串值。

```javascript
enum Gender {
    Male,
    Female
    Other
}
console.log(Gender.Male); // Output: 0

//We can also access an enum value by it's number value.
console.log(Gender[1]); // Output: Female
```

---

## 27. TypeScript 的主要特点是什么？

**参考答案：**

- 跨平台：TypeScript 编译器可以安装在任何操作系统上，包括 Windows、macOS 和 Linux。

- ES6 特性：TypeScript 包含计划中的 ECMAScript 2015 (ES6) 的大部分特性，例如箭头函数。

- 面向对象的语言：TypeScript 提供所有标准的 OOP 功能，如类、接口和模块。

- 静态类型检查：TypeScript 使用静态类型并帮助在编译时进行类型检查。因此，你可以在编写代码时发现编译时错误，而无需运行脚本。

- 可选的静态类型：如果你习惯了 JavaScript 的动态类型，TypeScript 还允许可选的静态类型。

- DOM 操作：您可以使用 TypeScript 来操作 DOM 以添加或删除客户端网页元素。

---

## 28. TypeScript中的方法重写是什么?

**参考答案：**

如果子类(子类)具有与父类中声明的相同的方法，则称为方法覆盖。换句话说，在派生类或子类中重新定义基类方法。

方法重写的规则

- 该方法必须具有与父类相同的名称

- 该方法必须具有与父类相同的参数。

- 必须有一个IS-A关系(继承)。

例子

```javascript
class NewPrinter extends Printer {
    doPrint(): any {
        super.doPrint();
        console.log("Called Child class.");
    }
    doInkJetPrint(): any {
        console.log("Called doInkJetPrint().");
    }
}
let printer: new () => NewPrinter;
printer.doPrint();
printer.doInkJetPrint();
```

---

## 29. 什么是TypeScript映射文件？

**参考答案：**

- TypeScript Map文件是一个源映射文件，其中包含有关我们原始文件的信息。

- .map文件是源映射文件，可让工具在发出的JavaScript代码和创建它的TypeScript源文件之间进行映射。

- 许多调试器可以使用这些文件，因此我们可以调试TypeScript文件而不是JavaScript文件。

---

## 30. TypeScript中的类型有哪些？

**参考答案：**

类型系统表示语言支持的不同类型的值。它在程序存储或操作所提供的值之前检查其有效性。

它可以分为两种类型，

- 内置：包括数字(number)，字符串(string)，布尔值(boolean)，无效(void)，空值(null)和未定义(undefined)。

- 用户定义的：它包括枚举(enums)，类(classes)，接口(interfaces)，数组(arrays)和元组(tuple)。

---

## 31. 如何检查TypeScript中的null和undefined ？

**参考答案：**

通过使用一个缓冲检查，我们可以检查空和未定义:

```javascript
if (x == null) {
}
```

如果我们使用严格的检查，它将总是对设置为null的值为真，而对未定义的变量不为真。

例子

```javascript
var a: number;
var b: number = null;
function check(x, name) {
    if (x == null) {
        console.log(name + ' == null');
    }
    if (x === null) {
        console.log(name + ' === null');
    }
    if (typeof x === 'undefined') {
        console.log(name + ' is undefined');
    }
}
check(a, 'a');
check(b, 'b');
```

输出

```javascript
'a == null'
'a is undefined'
'b == null'
'b === null'
```

---

## 32. 如何在TypeScript中实现继承？

**参考答案：**

继承是一种从另一个类获取一个类的属性和行为的机制。它是OOPs语言的一个重要方面，并且具有从现有类创建新类的能力，继承成员的类称为基类，继承这些成员的类称为派生类。

继承可以通过使用extend关键字来实现。我们可以通过下面的例子来理解它。

```javascript
class Shape {
   Area:number
   constructor(area:number) {
      this.Area = area
   }
}
class Circle extends Shape {
   display():void {
      console.log("圆的面积: "+this.Area)
   }
}
var obj = new Circle(320);
obj.display()
```

---

## 33. 什么是TypeScript Declare关键字?

**参考答案：**

我们知道所有的JavaScript库/框架都没有TypeScript声明文件，但是我们希望在TypeScript文件中使用它们时不会出现编译错误。为此，我们使用declare关键字。在我们希望定义可能存在于其他地方的变量的环境声明和方法中，可以使用declare关键字。

例如，假设我们有一个名为myLibrary的库，它没有TypeScript声明文件，在全局命名空间中有一个名为myLibrary的命名空间。如果我们想在TypeScript代码中使用这个库，我们可以使用以下代码:

```javascript
declare var myLibrary;
```

TypeScript运行时将把myLibrary变量赋值为任意类型。这是一个问题，我们不会得到智能感知在设计时，但我们将能够使用库在我们的代码。

---

## 34. TypeScript 和 JavaScript 的区别是什么？

**参考答案：**

Typescript 是 JavaScript 的超集，可以被编译成 JavaScript 代码。用 JavaScript 编写的代码，在 TypeScript 中依然有效。Typescript 是纯面向对象的编程语言，包含类和接口的概念。 程序员可以用它来编写面向对象的服务端或客户端程序，并将它们编译成 JavaScript 代码。

---

## 35. Typescript中什么是类类型接口？

**参考答案：**

- 如果接口用于一个类的话，那么接口会表示“行为的抽象”

- 对类的约束，让类去实现接口，类可以实现多个接口

- 接口只能约束类的公有成员（实例属性/方法），无法约束私有成员、构造函数、静态属性/方法

---

## 36. Typescript中never 和 void 的区别？

**参考答案：**

- void 表示没有任何类型（可以被赋值为 null 和 undefined）。

- never 表示一个不包含值的类型，即表示永远不存在的值。

- 拥有 void 返回值类型的函数能正常运行。拥有 never 返回值类型的函数无法正常返回，无法终止，或会抛出异常。

---

## 37. Typescript中 interface 和 type 的差别是什么？

**参考答案：**

相同点

- 都可以描述一个对象或者函数

interface

```javascript
interface User {
  name: string
  age: number
}

interface SetUser {
  (name: string, age: number): void;
}
```

type

```javascript
type User = {
  name: string
  age: number
};

type SetUser = (name: string, age: number)=> void;
```

- 都允许拓展（extends）

interface 和 type 都可以拓展，并且两者并不是相互独立的，也就是说 interface 可以 extends type, type 也可以 extends interface 。 虽然效果差不多，但是两者语法不同。

interface extends interface

```javascript
interface Name {
  name: string;
}
interface User extends Name {
  age: number;
}
```

type extends type

```javascript
type Name = {
  name: string;
}
type User = Name & { age: number  };
```

interface extends type

```javascript
type Name = {
  name: string;
}
interface User extends Name {
  age: number;
}
```

type extends interface

```javascript
interface Name {
  name: string;
}
type User = Name & {
  age: number;
}
```

不同点

- type 可以而 interface 不行

type 可以声明基本类型别名，联合类型，元组等类型

```javascript
// 基本类型别名
type Name = string

// 联合类型
interface Dog {
    wong();
}
interface Cat {
    miao();
}

type Pet = Dog | Cat

// 具体定义数组每个位置的类型
type PetList = [Dog, Pet]
```

type 语句中还可以使用 typeof 获取实例的 类型进行赋值

```javascript
// 当你想获取一个变量的类型时，使用 typeof
let div = document.createElement('div');
type B = typeof div
```

其他骚操作

```javascript
type StringOrNumber = string | number;
type Text = string | { text: string };
type NameLookup = Dictionary<string, Person>;
type Callback<T> = (data: T) => void;
type Pair<T> = [T, T];
type Coordinates = Pair<number>;
type Tree<T> = T | { left: Tree<T>, right: Tree<T> };
```

- interface 可以而 type 不行

interface 能够声明合并

```javascript
interface User {
  name: string
  age: number
}

interface User {
  sex: string
}

/*
User 接口为 {
  name: string
  age: number
  sex: string
}
*/
```

一般来说，如果不清楚什么时候用interface/type，能用 interface 实现，就用 interface , 如果不能就用 type 。

---

## 38. 说一说TypeScript中的类及其特性。

**参考答案：**

TypeScript 引入了类，以便它们可以利用诸如封装和抽象之类的面向对象技术的好处。

TypeScript 编译器将 TypeScript 中的类编译为普通的 JavaScript 函数，以跨平台和浏览器工作。

一个类包括以下内容：

- 构造器（Constructor）

- 属性（Properties）

- 方法（Methods）

```javascript
class Employee {
    empID: number;
    empName: string;

    constructor(ID: number, name: string) {
        this.empName = name;
        this.empID = ID;
    }

    getSalary(): number {
        return 40000;
    }
}
```

类的其他特性有：

- 继承（Inheritance）

- 封装（Encapsulation）

- 多态（Polymorphism）

- 抽象（Abstraction）

---

## 39. TypeScript中的变量以及如何声明？

**参考答案：**

变量是内存中用于存储值的命名空间。

在 TypeScript 中声明变量的类型语法在变量名称后包括一个冒号（:)，后跟其类型。 与 JavaScript 相似，我们使用var关键字声明变量。

在Typescript中声明变量时，必须遵循某些规则：

- 变量名称必须是字母或数字。

- 不能以数字开头名称。

- 除下划线（ \_ ）和美元（ $ ）符号外，它不能包含空格和特殊字符。

---

## 40. TypeScript 中的类是什么？你如何定义它们？

**参考答案：**

类表示一组相关对象的共享行为和属性。

例如，我们的类可能是Student，其所有对象都具有该attendClass方法。另一方面，John是一个单独的 type 实例，Student可能有额外的独特行为，比如attendExtracurricular.

你使用关键字声明类class：

```javascript
class Student {
    studCode: number;
    studName: string;
    constructor(code: number, name: string) {
            this.studName = name;
            this.studCode = code;
    }
 }
```

---

## 41. TypeScript 中的 getter/setter 是什么？你如何使用它们？

**参考答案：**

Getter 和 setter 是特殊类型的方法，可帮助你根据程序的需要委派对私有变量的不同级别的访问。

Getters 允许你引用一个值但不能编辑它。Setter 允许你更改变量的值，但不能查看其当前值。这些对于实现封装是必不可少的。

例如，新雇主可能能够了解get公司的员工人数，但无权set了解员工人数。

```javascript
const fullNameMaxLength = 10;
class Employee {
  private _fullName: string = "";
  get fullName(): string {
    return this._fullName;
  }
  set fullName(newName: string) {
    if (newName && newName.length > fullNameMaxLength) {
      throw new Error("fullName has a max length of " + fullNameMaxLength);
    }
    this._fullName = newName;
  }
}
let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
  console.log(employee.fullName);
}
```

---

## 42. Typescript中什么是装饰器，它们可以应用于什么？

**参考答案：**

装饰器是一种特殊的声明，它允许你通过使用@\<name>注释标记来一次性修改类或类成员。每个装饰器都必须引用一个将在运行时评估的函数。

例如，装饰器@sealed将对应于sealed函数。任何标有 的@sealed都将用于评估sealed函数。

```javascript
function sealed(target) {
  // do something with 'target' ...
}
```

它们可以附加到：

- 类声明

- 方法

- 配件

- 特性

- 参数

注意：默认情况下不启用装饰器。要启用它们，你必须`experimentalDecorators从tsconfig.json`文件或命令行编辑编译器选项中的字段。

---

## 43. 解释如何使用 TypeScript mixin。

**参考答案：**

Mixin 本质上是在相反方向上工作的继承。Mixins 允许你通过组合以前类中更简单的部分类设置来构建新类。

相反，类A继承类B来获得它的功能，类B从类A需要返回一个新类的附加功能。

---

## 44. TypeScript 中的类型断言是什么？

**参考答案：**

TypeScript 中的类型断言的工作方式类似于其他语言中的类型转换，但没有 C# 和 Java 等语言中可能的类型检查或数据重组。类型断言对运行时没有影响，仅由编译器使用。

类型断言本质上是类型转换的软版本，它建议编译器将变量视为某种类型，但如果它处于不同的形式，则不会强制它进入该模型。

---

## 45. TypeScript 中的模块是什么？

**参考答案：**

TypeScript 中的模块是相关变量、函数、类和接口的集合。 你可以将模块视为包含执行任务所需的一切的容器。可以导入模块以轻松地在项目之间共享代码。

```javascript
module module_name{
  class xyz{
    export sum(x, y){
      return x+y;
    }
  }
}
```

---

## 46. 为什么推荐使用 TypeScript ？

**参考答案：**

TypeScript是微软公司开发和维护的一种面向对象的编程语言。它是JavaScript的超集，包含其所有元素。

强类型和弱类型、静态类型和动态类型是两组不同的概念。

类型强弱是针对类型转换是否显示来区分，静态和动态类型是针对类型检查的时机来区分。

TS对JS的改进主要是静态类型检查，静态类型检查有何意义？标准答案是“静态类型更有利于构建大型应用”。

推荐使用TypeScript的原因有：

- TypeScript简化了JavaScript代码，使其更易于阅读和调试。

- TypeScript是开源的。

- TypeScript为JavaScript ide和实践（如静态检查）提供了高效的开发工具。

- TypeScript使代码更易于阅读和理解。

- 使用TypeScript，我们可以大大改进普通的JavaScript。

- TypeScript为我们提供了ES6（ECMAScript 6）的所有优点，以及更高的生产率。

- TypeScript通过对代码进行类型检查，可以帮助我们避免在编写JavaScript时经常遇到的令人痛苦的错误。

- 强大的类型系统，包括泛型。

- TypeScript只不过是带有一些附加功能的JavaScript。

- TypeScript代码可以按照ES5和ES6标准编译，以支持最新的浏览器。

- 与ECMAScript对齐以实现兼容性。

- 以JavaScript开始和结束。

- 支持静态类型。

- TypeScript将节省开发人员的时间。

- TypeScript是ES3、ES5和ES6的超集。
