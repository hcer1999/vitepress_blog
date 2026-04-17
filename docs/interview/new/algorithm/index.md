## 1. 最大的钻石

1 楼到 n 楼的每层电梯门口都放着一颗钻石，钻石大小不一。你乘坐电梯从 1 楼到 n 楼，每层楼电梯门都会打开一次，只能拿一次钻石，问怎样才能拿到「最大」的一颗？

**参考答案：**

题中包含一个隐藏条件：随机放置。所有的分析都是基于随机放置给出的。换句话说，如果放置钻石是人为干预大小，那么本题的所以分析则全部不成立。

其实这个问题的原型叫做秘书问题，该类问题全部属于最佳停止问题。

这类问题都有着统一的解法：

![](<images/6. 算法（19题）-image-1.png>)

---

## 2. 举例说明你对尾递归的理解，以及有哪些应用场景

**参考答案：**

一、递归&#x20;

递归（英语：Recursion）

在数学与计算机科学中，是指在函数的定义中使用函数自身的方法&#x20;

在函数内部，可以调用其他函数。如果一个函数在内部调用自身本身，这个函数就是递归函数

其核心思想是把一个大型复杂的问题层层转化为一个与原问题相似的规模较小的问题来求解&#x20;

一般来说，递归需要有边界条件、递归前进阶段和递归返回阶段。当边界条件不满足时，递归前进；当边界条件满足时，递归返回

下面实现一个函数 `pow(x, n)`，它可以计算 `x` 的 `n` 次方

使用迭代的方式，如下：

```javascript
function pow(x, n) {
  let result = 1

  // 再循环中，用 x 乘以 result n 次
  for (let i = 0; i < n; i++) {
    result *= x
  }
  return result
}
```

使用递归的方式，如下：

```javascript
function pow(x, n) {
  if (n == 1) {
    return x
  } else {
    return x * pow(x, n - 1)
  }
}
```

`pow(x, n)` 被调用时，执行分为两个分支：

```javascript
             if n==1  = x
             /
pow(x, n) =
             \
              else     = x * pow(x, n - 1)
```

也就是说`pow` 递归地调用自身 直到 `n == 1`

![](<images/6. 算法（19题）-image.png>)

为了计算 `pow(2, 4)`，递归变体经过了下面几个步骤：

1. `pow(2, 4) = 2 * pow(2, 3)`

2. `pow(2, 3) = 2 * pow(2, 2)`

3. `pow(2, 2) = 2 * pow(2, 1)`

4. `pow(2, 1) = 2`

因此，递归将函数调用简化为一个更简单的函数调用，然后再将其简化为一个更简单的函数，以此类推，直到结果

二、尾递归

尾递归，即在函数尾位置调用自身（或是一个尾调用本身的其他函数等等）。尾递归也是递归的一种特殊情形。尾递归是一种特殊的尾调用，即在尾部直接调用自身的递归函数

尾递归在普通尾调用的基础上，多出了2个特征：

- 在尾部调用的是函数自身

- 可通过优化，使得计算仅占用常量栈空间

在递归调用的过程当中系统为每一层的返回点、局部量等开辟了栈来存储，递归次数过多容易造成栈溢出

这时候，我们就可以使用尾递归，即一个函数中所有递归形式的调用都出现在函数的末尾，对于尾递归来说，由于只存在一个调用记录，所以永远不会发生"栈溢出"错误

实现一下阶乘，如果用普通的递归，如下：

```javascript
function factorial(n) {
  if (n === 1) return 1
  return n * factorial(n - 1)
}

factorial(5) // 120
```

如果`n`等于5，这个方法要执行5次，才返回最终的计算表达式，这样每次都要保存这个方法，就容易造成栈溢出，复杂度为`O(n)`

如果我们使用尾递归，则如下：

```javascript
function factorial(n, total = 1) {
  if (n === 1) return total
  return factorial(n - 1, n * total)
}

factorial(5) // 120
```

可以看到，每一次返回的就是一个新的函数，不带上一个函数的参数，也就不需要储存上一个函数了。尾递归只需要保存一个调用栈，复杂度 O(1)

二、应用场景

数组求和

```javascript
function sumArray(arr, total) {
  if (arr.length === 1) {
    return total
  }
  return sumArray(arr, total + arr.pop())
}
```

使用尾递归优化求斐波那契数列

```javascript
function factorial2(n, start = 1, total = 1) {
  if (n <= 2) {
    return total
  }
  return factorial2(n - 1, total, total + start)
}
```

数组扁平化

```javascript
let a = [1, 2, 3, [1, 2, 3, [1, 2, 3]]]
// 变成
let a = [1, 2, 3, 1, 2, 3, 1, 2, 3]
// 具体实现
function flat(arr = [], result = []) {
  arr.forEach((v) => {
    if (Array.isArray(v)) {
      result = result.concat(flat(v, []))
    } else {
      result.push(v)
    }
  })
  return result
}
```

数组对象格式化

```javascript
let obj = {
  a: '1',
  b: {
    c: '2',
    D: {
      E: '3',
    },
  },
}
// 转化为如下：
let obj = {
  a: '1',
  b: {
    c: '2',
    d: {
      e: '3',
    },
  },
}

// 代码实现
function keysLower(obj) {
  let reg = new RegExp('([A-Z]+)', 'g')
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let temp = obj[key]
      if (reg.test(key.toString())) {
        // 将修改后的属性名重新赋值给temp，并在对象obj内添加一个转换后的属性
        temp = obj[
          key.replace(reg, function (result) {
            return result.toLowerCase()
          })
        ] = obj[key]
        // 将之前大写的键属性删除
        delete obj[key]
      }
      // 如果属性是对象或者数组，重新执行函数
      if (typeof temp === 'object' || Object.prototype.toString.call(temp) === '[object Array]') {
        keysLower(temp)
      }
    }
  }
  return obj
}
```

---

## 3. 去除字符串中出现次数最少的字符，不改变原字符串的顺序。

实现删除字符串中出现次数最少的字符，若出现次数最少的字符有多个，则把出现次数最少的字符都删除。输出删除这些单词后的字符串，字符串中其它字符保持原来的顺序。

```javascript
“ababac” —— “ababa”
“aaabbbcceeff” —— “aaabbb”
```

**参考答案：**

可以通过以下步骤使用 JavaScript 去除字符串中出现次数最少的字符，同时不改变原字符串的顺序：

1. 定义一个对象来存储每个字符出现的次数。

2. 遍历字符串，将每个字符出现的次数保存到对象中。

3. 找出出现次数最少的字符，并将其从对象中删除。

4. 遍历字符串并根据存储的次数对象过滤出符合条件的字符。

5. 将符合条件的字符拼接成新的字符串并返回。

下面是代码示例：

```javascript
function removeLeastFrequentChar(str) {
  // 定义存储每个字符出现次数的对象
  const charMap = {}

  // 遍历字符串并将每个字符出现的次数保存到对象中
  for (let i = 0; i < str.length; i++) {
    const char = str[i]
    if (!charMap[char]) {
      charMap[char] = 1
    } else {
      charMap[char]++
    }
  }

  // 找出出现次数最少的字符，并将其从对象中删除
  const minCount = Math.min(...Object.values(charMap))
  for (const key in charMap) {
    if (charMap.hasOwnProperty(key)) {
      if (charMap[key] === minCount) {
        delete charMap[key]
      }
    }
  }

  // 遍历字符串并根据存储的次数对象过滤出符合条件的字符
  const filteredChars = []
  for (let i = 0; i < str.length; i++) {
    const char = str[i]
    if (charMap[char]) {
      filteredChars.push(char)
    }
  }

  // 将符合条件的字符拼接成新的字符串并返回
  return filteredChars.join('')
}
```

---

## 4. 请手写“快速排序”

**参考答案：**

**算法简介**

快速排序的基本思想：通过一趟排序将待排记录分隔成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，则可分别对这两部分记录继续进行排序，以达到整个序列有序。

**算法描述和实现**

快速排序使用分治法来把一个串（list）分为两个子串（sub-lists）。具体算法描述如下：

- 从数列中挑出一个元素，称为 “基准”（pivot）；

- 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；

- 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。

**代码实现**

```javascript
/*方法说明：快速排序
@param  array 待排序数组*/
//方法一
function quickSort(array, left, right) {
  if (
    Object.prototype.toString.call(array).slice(8, -1) === 'Array' &&
    typeof left === 'number' &&
    typeof right === 'number'
  ) {
    if (left < right) {
      var x = array[right],
        i = left - 1,
        temp
      for (var j = left; j <= right; j++) {
        if (array[j] <= x) {
          i++
          temp = array[i]
          array[i] = array[j]
          array[j] = temp
        }
      }
      quickSort(array, left, i - 1)
      quickSort(array, i + 1, right)
    }
    return array
  } else {
    return 'array is not an Array or left or right is not a number!'
  }
}

//方法二
var quickSort2 = function (arr) {
  if (arr.length <= 1) {
    return arr
  }

  const pivotIndex = Math.floor(arr.length / 2)
  const pivot = arr[pivotIndex]
  const less = []
  const greater = []

  for (let i = 0; i < arr.length; i++) {
    if (i === pivotIndex) {
      continue
    }

    if (arr[i] < pivot) {
      less.push(arr[i])
    } else {
      greater.push(arr[i])
    }
  }

  return [...quickSort2(less), pivot, ...quickSort2(greater)]
}

var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
console.log(quickSort(arr, 0, arr.length - 1)) //[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
console.log(quickSort2(arr)) //[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
```

**算法分析**

- 最佳情况：T(n) = O(nlogn)

- 最差情况：T(n) = O(n2)

- 平均情况：T(n) = O(nlogn)

---

## 5. 洗牌算法

洗牌算法是将原来的数组进行打散，使原数组的某个数在打散后的数组中的每个位置上等概率的出现，即为乱序算法。

请使用 js 实现一个洗牌算法。

**参考答案：**

**洗牌算法(shuffle)的js实现**

**Fisher-Yates**

先看最经典的 [<span style="color: rgb(36,91,219); background-color: inherit">Fisher-Yates</span>](http://en.wikipedia.org/wiki/Fisher-Yates_shuffle) 的洗牌算法

这里有一个该算法的[<span style="color: rgb(36,91,219); background-color: inherit">可视化实现</span>](https://bost.ocks.org/mike/shuffle/)

其算法思想就是 从原始数组中随机抽取一个新的元素到新数组中

1. 从还没处理的数组（假如还剩n个）中，产生一个\[0, n]之间的随机数 random

2. 从剩下的n个元素中把第 random 个元素取出到新数组中

3. 删除原数组第random个元素

4. 重复第 2 3 步直到所有元素取完

5. 最终返回一个新的打乱的数组

按步骤一步一步来就很简单的实现

```javascript
function shuffle(arr) {
  var result = [],
    random
  while (arr.length > 0) {
    random = Math.floor(Math.random() * arr.length)
    result.push(arr[random])
    arr.splice(random, 1)
  }
  return result
}
```

这种算法要去除原数组 arr 中的元素，所以时间复杂度为 O(n2)

**Knuth-Durstenfeld Shuffle**

Fisher-Yates 洗牌算法的一个变种是 Knuth Shuffle

每次从未处理的数组中随机取一个元素，然后把该元素放到数组的尾部，即数组的尾部放的就是已经处理过的元素，这是一种原地打乱的算法，每个元素随机概率也相等，时间复杂度从 Fisher 算法的 O(n2)提升到了 O(n)

1. 选取数组(长度n)中最后一个元素(arr\[length-1])，将其与n个元素中的任意一个交换，此时最后一个元素已经确定

2. 选取倒数第二个元素(arr\[length-2])，将其与n-1个元素中的任意一个交换

3. 重复第 1 2 步，直到剩下1个元素为止

```javascript
function shuffle(arr) {
  var length = arr.length,
    temp,
    random
  while (0 != length) {
    random = Math.floor(Math.random() * length)
    length--
    // swap
    temp = arr[length]
    arr[length] = arr[random]
    arr[random] = temp
  }
  return arr
}
```

Durstenfeld Shuffle的算法是从数组第一个开始，和Knuth的区别是遍历的方向不同

**Other**

**Array.sort()**

利用Array的sort方法可以更简洁的实现打乱，对于数量小的数组来说足够。因为随着数组元素增加，随机性会变差。

```javascript
;[1, 2, 3, 4, 5, 6].sort(function () {
  return 0.5 - Math.random()
})
```

**ES6**

Knuth-Durstenfeld shuffle 的 ES6 实现，代码更简洁

```javascript
function shuffle(arr) {
  let n = arr.length,
    random
  while (0 != n) {
    random = (Math.random() * n--) >>> 0 // 无符号右移位运算符向下取整
    ;[arr[n], arr[random]] = [arr[random], arr[n]] // ES6的结构赋值实现变量互换
  }
  return arr
}
```

---

## 6. 什么是尾调用优化和尾递归？

**参考答案：**

**什么是尾调用？**

尾调用的概念非常简单，一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数。

```javascript
function f(x) {
  return g(x)
}
```

上面代码中，函数f的最后一步是调用函数g，这就叫尾调用。

以下两种情况，都不属于尾调用。

```javascript
// 情况一
function f(x) {
  let y = g(x)
  return y
}

// 情况二
function f(x) {
  return g(x) + 1
}
```

上面代码中，情况一是调用函数g之后，还有别的操作，所以不属于尾调用，即使语义完全一样。情况二也属于调用后还有操作，即使写在一行内。

尾调用不一定出现在函数尾部，只要是最后一步操作即可。

```javascript
function f(x) {
  if (x > 0) {
    return m(x)
  }
  return n(x)
}
```

上面代码中，函数m和n都属于尾调用，因为它们都是函数f的最后一步操作。

**尾调用优化**

尾调用之所以与其他调用不同，就在于它的特殊的调用位置。

我们知道，函数调用会在内存形成一个"调用记录"，又称"调用帧"（call frame），保存调用位置和内部变量等信息。如果在函数A的内部调用函数B，那么在A的调用记录上方，还会形成一个B的调用记录。等到B运行结束，将结果返回到A，B的调用记录才会消失。如果函数B内部还调用函数C，那就还有一个C的调用记录栈，以此类推。所有的调用记录，就形成一个"调用栈"（call stack）。

尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用记录，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用记录，取代外层函数的调用记录就可以了。

```javascript
function f() {
  let m = 1
  let n = 2
  return g(m + n)
}
f()

// 等同于
function f() {
  return g(3)
}
f()

// 等同于
g(3)
```

上面代码中，如果函数g不是尾调用，函数f就需要保存内部变量m和n的值、g的调用位置等信息。但由于调用g之后，函数f就结束了，所以执行到最后一步，完全可以删除 f() 的调用记录，只保留 g(3) 的调用记录。

这就叫做"尾调用优化"（Tail call optimization），即只保留内层函数的调用记录。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用记录只有一项，这将大大节省内存。这就是"尾调用优化"的意义。

**尾递归**

函数调用自身，称为递归。如果尾调用自身，就称为尾递归。

递归非常耗费内存，因为需要同时保存成千上百个调用记录，很容易发生"栈溢出"错误（stack overflow）。但对于尾递归来说，由于只存在一个调用记录，所以永远不会发生"栈溢出"错误。

```javascript
function factorial(n) {
  if (n === 1) return 1
  return n * factorial(n - 1)
}

factorial(5) // 120
```

上面代码是一个阶乘函数，计算n的阶乘，最多需要保存n个调用记录，复杂度 O(n) 。

如果改写成尾递归，只保留一个调用记录，复杂度 O(1) 。

```javascript
function factorial(n, total) {
  if (n === 1) return total
  return factorial(n - 1, n * total)
}

factorial(5, 1) // 120
```

"尾调用优化"对递归操作意义重大，所以一些函数式编程语言将其写入了语言规格。ES6也是如此，第一次明确规定，所有 ECMAScript 的实现，都必须部署"尾调用优化"。这就是说，在 ES6 中，只要使用尾递归，就不会发生栈溢出，相对节省内存。

---

## 7. 合并K个升序链表

给你一个链表数组，每个链表都已经按升序排列。

请你将所有链表合并到一个升序链表中，返回合并后的链表。

示例 1：

```javascript
输入：lists = [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]
解释：链表数组如下：
[
  1->4->5,
  1->3->4,
  2->6
]
将它们合并到一个有序链表中得到。
1->1->2->3->4->4->5->6
```

示例 2：

```javascript
输入：lists = []
输出：[]
```

示例 3：

```javascript
输入：lists = [[]]
输出：[]
```

提示：

- k == lists.length

- 0 <= k <= 10^4

- 0 <= lists\[i].length <= 500

- -10^4 <= lists\[i]\[j] <= 10^4

- lists\[i] 按 升序 排列

- lists\[i].length 的总和不超过 10^4

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {}
```

---

## 8. 什么是时间复杂度？

**参考答案：**

> <span style="color: rgb(36,91,219); background-color: inherit">时间复杂度的计算并不是计算程序具体运行的时间，而是算法执行语句的次数。</span>

随着n的不断增大，时间复杂度不断增大，算法花费时间越多。

**常见的时间复杂度**

- 常数阶O(1)

- 对数阶O(log2 n)

- 线性阶O(n)

- 线性对数阶O(n log2 n)

- 平方阶O(n^2)

- 立方阶O(n^3)

- k次方阶O(n^K)

- 指数阶O(2^n)

**计算方法**

- 选取相对增长最高的项

- 最高项系数是都化为1

- 若是常数的话用O(1)表示

举个例子：如f(n)=3\*n^4+3n+300 则 O(n)=n^4

通常我们计算时间复杂度都是计算最坏情况。计算时间复杂度的要注意的几个点:

- 如果算法的执行时间不随n的增加而增长，假如算法中有上千条语句，执行时间也不过是一个较大的常数。此类算法的时间复杂度是O(1)。

举例如下：代码执行100次，是一个常数，复杂度也是O(1)。

```javascript
let x = 1
while (x < 100) {
  x++
}
```

- 有多个循环语句时候，算法的时间复杂度是由嵌套层数最多的循环语句中最内层语句的方法决定的。

举例如下：在下面for循环当中，外层循环每执行一次，内层循环要执行n次，执行次数是根据n所决定的，时间复杂度是O(n^2)。

```javascript
for (i = 0; i < n; i++) {
  for (j = 0; j < n; j++) {
    // ...code
  }
}
```

- 循环不仅与n有关，还与执行循环判断条件有关。

举例如下：在代码中，如果arr\[i]不等于1的话，时间复杂度是O(n)。如果arr\[i]等于1的话，循环不执行，时间复杂度是O(0)。

```javascript
for (var i = 0; i < n && arr[i] != 1; i++) {
  // ...code
}
```

---

## 9. 请手写“基数排序”

**参考答案：**

**算法简介**

基数排序是按照低位先排序，然后收集；再按照高位排序，然后再收集；依次类推，直到最高位。有时候有些属性是有优先级顺序的，先按低优先级排序，再按高优先级排序。最后的次序就是高优先级高的在前，高优先级相同的低优先级高的在前。基数排序基于分别排序，分别收集，所以是稳定的。

**算法描述**

具体算法描述如下：

- 取得数组中的最大数，并取得位数；

- arr为原始数组，从最低位开始取每个位组成radix数组；

- 对radix进行计数排序（利用计数排序适用于小范围数的特点）；

**代码实现**

```javascript
/**
 * 基数排序适用于：
 *  (1)数据范围较小，建议在小于1000
 *  (2)每个数值都要大于等于0
 * @author damonare
 * @param  arr 待排序数组
 * @param  maxDigit 最大位数
 */
//LSD Radix Sort

function radixSort(arr, maxDigit) {
  var mod = 10
  var dev = 1
  var counter = []
  console.time('基数排序耗时')
  for (var i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
    for (var j = 0; j < arr.length; j++) {
      var bucket = parseInt((arr[j] % mod) / dev)
      if (counter[bucket] == null) {
        counter[bucket] = []
      }
      counter[bucket].push(arr[j])
    }
    var pos = 0
    for (var j = 0; j < counter.length; j++) {
      var value = null
      if (counter[j] != null) {
        while ((value = counter[j].shift()) != null) {
          arr[pos++] = value
        }
      }
    }
  }
  console.timeEnd('基数排序耗时')
  return arr
}
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
console.log(radixSort(arr, 2)) //[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
```

**算法分析**

- 最佳情况：T(n) = O(n \* k)

- 最差情况：T(n) = O(n \* k)

- 平均情况：T(n) = O(n \* k)

---

## 10. 请手写“桶排序”

**参考答案：**

**算法简介**

桶排序 (Bucket sort)的工作的原理：假设输入数据服从均匀分布，将数据分到有限数量的桶里，每个桶再分别排序（有可能再使用别的排序算法或是以递归方式继续使用桶排序进行排

**算法描述**

具体算法描述如下：

- 设置一个定量的数组当作空桶；

- 遍历输入数据，并且把数据一个一个放到对应的桶里去；

- 对每个不是空的桶进行排序；

- 从不是空的桶里把排好序的数据拼接起来。

**代码实现**

```javascript
/*方法说明：桶排序
@param  array 数组
@param  num   桶的数量*/
function bucketSort(array, num) {
  if (array.length <= 1) {
    return array
  }
  var len = array.length,
    buckets = [],
    result = [],
    min = (max = array[0]),
    regex = '/^[1-9]+[0-9]*$/',
    space,
    n = 0
  num = num || (num > 1 && regex.test(num) ? num : 10)
  console.time('桶排序耗时')
  for (var i = 1; i < len; i++) {
    min = min <= array[i] ? min : array[i]
    max = max >= array[i] ? max : array[i]
  }
  space = (max - min + 1) / num
  for (var j = 0; j < len; j++) {
    var index = Math.floor((array[j] - min) / space)
    if (buckets[index]) {
      //  非空桶，插入排序
      var k = buckets[index].length - 1
      while (k >= 0 && buckets[index][k] > array[j]) {
        buckets[index][k + 1] = buckets[index][k]
        k--
      }
      buckets[index][k + 1] = array[j]
    } else {
      //空桶，初始化
      buckets[index] = []
      buckets[index].push(array[j])
    }
  }
  while (n < num) {
    result = result.concat(buckets[n])
    n++
  }
  console.timeEnd('桶排序耗时')
  return result
}
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
console.log(bucketSort(arr, 4)) //[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
```

**算法分析**

桶排序最好情况下使用线性时间O(n)，桶排序的时间复杂度，取决与对各个桶之间数据进行排序的时间复杂度，因为其它部分的时间复杂度都为O(n)。很显然，桶划分的越小，各个桶之间的数据越少，排序所用的时间也会越少。但相应的空间消耗就会增大。

- 最佳情况：T(n) = O(n+k)

- 最差情况：T(n) = O(n+k)

- 平均情况：T(n) = O(n2)

---

## 11. 请手写“计数排序”

**参考答案：**

**算法简介**

计数排序(Counting sort)是一种稳定的排序算法。计数排序使用一个额外的数组C，其中第i个元素是待排序数组A中值等于i的元素的个数。然后根据数组C来将A中的元素排到正确的位置。它只能对整数进行排序。

**算法描述**

具体算法描述如下：

- 找出待排序的数组中最大和最小的元素；

- 统计数组中每个值为i的元素出现的次数，存入数组C的第i项；

- 对所有的计数累加（从C中的第一个元素开始，每一项和前一项相加）；

- 反向填充目标数组：将每个元素i放在新数组的第C(i)项，每放一个元素就将C(i)减去1。

**代码实现**

```javascript
function countingSort(array) {
  var len = array.length,
    B = [],
    C = [],
    min = (max = array[0])
  console.time('计数排序耗时')
  for (var i = 0; i < len; i++) {
    min = min <= array[i] ? min : array[i]
    max = max >= array[i] ? max : array[i]
    C[array[i]] = C[array[i]] ? C[array[i]] + 1 : 1
  }
  for (var j = min; j < max; j++) {
    C[j + 1] = (C[j + 1] || 0) + (C[j] || 0)
  }
  for (var k = len - 1; k >= 0; k--) {
    B[C[array[k]] - 1] = array[k]
    C[array[k]]--
  }
  console.timeEnd('计数排序耗时')
  return B
}
var arr = [2, 2, 3, 8, 7, 1, 2, 2, 2, 7, 3, 9, 8, 2, 1, 4, 2, 4, 6, 9, 2]
console.log(countingSort(arr)) //[1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 6, 7, 7, 8, 8, 9, 9]
```

**算法分析**

当输入的元素是n 个0到k之间的整数时，它的运行时间是 O(n + k)。计数排序不是比较排序，排序的速度快于任何比较排序算法。由于用来计数的数组C的长度取决于待排序数组中数据的范围（等于待排序数组的最大值与最小值的差加上1），这使得计数排序对于数据范围很大的数组，需要大量时间和内存。

- 最佳情况：T(n) = O(n+k)

- 最差情况：T(n) = O(n+k)

- 平均情况：T(n) = O(n+k)

---

## 12. 请手写“堆排序”

**参考答案：**

**算法简介**

堆排序（Heapsort）是指利用堆这种数据结构所设计的一种排序算法。堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值或索引总是小于（或者大于）它的父节点。

**算法描述**

具体算法描述如下：

- 将初始待排序关键字序列(R1,R2….Rn)构建成大顶堆，此堆为初始的无序区；

- 将堆顶元素R\[1]与最后一个元素R\[n]交换，此时得到新的无序区(R1,R2,……Rn-1)和新的有序区(Rn),且满足R\[1,2…n-1]<=R\[n]；

- 由于交换后新的堆顶R\[1]可能违反堆的性质，因此需要对当前无序区(R1,R2,……Rn-1)调整为新堆，然后再次将R\[1]与无序区最后一个元素交换，得到新的无序区(R1,R2….Rn-2)和新的有序区(Rn-1,Rn)。不断重复此过程直到有序区的元素个数为n-1，则整个排序过程完成。

**代码实现**

```javascript
/*方法说明：堆排序
@param  array 待排序数组*/
function heapSort(array) {
  console.time('堆排序耗时')
  if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
    //建堆
    var heapSize = array.length,
      temp
    for (var i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
      heapify(array, i, heapSize)
    }

    //堆排序
    for (var j = heapSize - 1; j >= 1; j--) {
      temp = array[0]
      array[0] = array[j]
      array[j] = temp
      heapify(array, 0, --heapSize)
    }
    console.timeEnd('堆排序耗时')
    return array
  } else {
    return 'array is not an Array!'
  }
}
/*方法说明：维护堆的性质
@param  arr 数组
@param  x   数组下标
@param  len 堆大小*/
function heapify(arr, x, len) {
  if (Object.prototype.toString.call(arr).slice(8, -1) === 'Array' && typeof x === 'number') {
    var l = 2 * x + 1,
      r = 2 * x + 2,
      largest = x,
      temp
    if (l < len && arr[l] > arr[largest]) {
      largest = l
    }
    if (r < len && arr[r] > arr[largest]) {
      largest = r
    }
    if (largest != x) {
      temp = arr[x]
      arr[x] = arr[largest]
      arr[largest] = temp
      heapify(arr, largest, len)
    }
  } else {
    return 'arr is not an Array or x is not a number!'
  }
}
var arr = [91, 60, 96, 13, 35, 65, 46, 65, 10, 30, 20, 31, 77, 81, 22]
console.log(heapSort(arr)) //[10, 13, 20, 22, 30, 31, 35, 46, 60, 65, 65, 77, 81, 91, 96]
```

**算法分析**

- 最佳情况：T(n) = O(nlogn)

- 最差情况：T(n) = O(nlogn)

- 平均情况：T(n) = O(nlogn)

---

## 13. 请手写“归并排序”

**参考答案：**

**算法简介**

归并排序是建立在归并操作上的一种有效的排序算法。该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。归并排序是一种稳定的排序方法。将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，称为2-路归并。

**算法描述**

具体算法描述如下：

- 把长度为n的输入序列分成两个长度为n/2的子序列；

- 对这两个子序列分别采用归并排序；

- 将两个排序好的子序列合并成一个最终的排序序列。

```javascript
function mergeSort(arr) {
  //采用自上而下的递归方法
  var len = arr.length
  if (len < 2) {
    return arr
  }
  var middle = Math.floor(len / 2),
    left = arr.slice(0, middle),
    right = arr.slice(middle)
  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  var result = []
  console.time('归并排序耗时')
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }

  while (left.length) result.push(left.shift())

  while (right.length) result.push(right.shift())
  console.timeEnd('归并排序耗时')
  return result
}
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
console.log(mergeSort(arr))
```

**算法分析**

- 最佳情况：T(n) = O(n)

- 最差情况：T(n) = O(nlogn)

- 平均情况：T(n) = O(nlogn)

---

## 14. 请手写“希尔排序”

**参考答案：**

**算法简介**

希尔排序的核心在于间隔序列的设定。既可以提前设定好间隔序列，也可以动态的定义间隔序列。动态定义间隔序列的算法是《算法（第4版》的合著者Robert Sedgewick提出的。

**算法描述**

先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，具体算法描述：

- 选择一个增量序列t1，t2，…，tk，其中ti>tj，tk=1；

- 按增量序列个数k，对序列进行k 趟排序；

- 每趟排序，根据对应的增量ti，将待排序列分割成若干长度为m 的子序列，分别对各子表进行直接插入排序。仅增量因子为1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。

**代码实现**

```javascript
function shellSort(arr) {
  var len = arr.length,
    temp,
    gap = 1
  console.time('希尔排序耗时:')
  while (gap < len / 5) {
    //动态定义间隔序列
    gap = gap * 5 + 1
  }
  for (gap; gap > 0; gap = Math.floor(gap / 5)) {
    for (var i = gap; i < len; i++) {
      temp = arr[i]
      for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j]
      }
      arr[j + gap] = temp
    }
  }
  console.timeEnd('希尔排序耗时:')
  return arr
}
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
console.log(shellSort(arr)) //[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
```

**算法分析**

- 最佳情况：T(n) = O(nlog2 n)

- 最坏情况：T(n) = O(nlog2 n)

- 平均情况：T(n) =O(nlog n)

---

## 15. 请手写“插入排序”

**参考答案：**

**算法简介**

插入排序（Insertion-Sort）是一种简单直观的排序算法。它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。插入排序在实现上，通常采用in-place排序（即只需用到O(1)的额外空间的排序），因而在从后向前扫描过程中，需要反复把已排序元素逐步向后挪位，为最新元素提供插入空间。

**算法描述**

一般来说，插入排序都采用in-place在数组上实现。具体算法描述如下：

- 从第一个元素开始，该元素可以认为已经被排序；

- 取出下一个元素，在已经排序的元素序列中从后向前扫描；

- 如果该元素（已排序）大于新元素，将该元素移到下一位置；

- 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；

- 将新元素插入到该位置后；

- 重复步骤2\~5。

**代码实现**

```javascript
function insertionSort(array) {
  if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
    console.time('插入排序耗时：')
    for (var i = 1; i < array.length; i++) {
      var key = array[i]
      var j = i - 1
      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j]
        j--
      }
      array[j + 1] = key
    }
    console.timeEnd('插入排序耗时：')
    return array
  } else {
    return 'array is not an Array!'
  }
}
```

**改进插入排序**

查找插入位置时使用二分查找的方式

```javascript
function binaryInsertionSort(array) {
  if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
    console.time('二分插入排序耗时：')

    for (var i = 1; i < array.length; i++) {
      var key = array[i],
        left = 0,
        right = i - 1
      while (left <= right) {
        var middle = parseInt((left + right) / 2)
        if (key < array[middle]) {
          right = middle - 1
        } else {
          left = middle + 1
        }
      }
      for (var j = i - 1; j >= left; j--) {
        array[j + 1] = array[j]
      }
      array[left] = key
    }
    console.timeEnd('二分插入排序耗时：')

    return array
  } else {
    return 'array is not an Array!'
  }
}
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
console.log(binaryInsertionSort(arr)) //[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
```

**算法分析**

- 最佳情况：输入数组按升序排列。T(n) = O(n)

- 最坏情况：输入数组按降序排列。T(n) = O(n2)

- 平均情况：T(n) = O(n2)

---

## 16. 请手写“选择排序”

**参考答案：**

**算法简介**

选择排序(Selection-sort)是一种简单直观的排序算法。它的工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。

**算法步骤**

- 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置

- 再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。

- 重复第二步，直到所有元素均排序完毕。

**代码实现**

```javascript
function selectionSort(arr) {
  var len = arr.length
  var minIndex, temp
  console.time('选择排序耗时')
  for (var i = 0; i < len - 1; i++) {
    minIndex = i
    for (var j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        //寻找最小的数
        minIndex = j //将最小数的索引保存
      }
    }
    temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
  console.timeEnd('选择排序耗时')
  return arr
}
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
console.log(selectionSort(arr)) //[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
```

**算法分析**

- 最佳情况：T(n) = O(n2)

- 最差情况：T(n) = O(n2)

- 平均情况：T(n) = O(n2)

---

## 17. 请手写“冒泡排序”

**参考答案：**

**算法描述**

冒泡排序是一种简单的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。

**算法步骤**

- 比较相邻的元素。如果第一个比第二个大，就交换他们两个。

- 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。

- 针对所有的元素重复以上的步骤，除了最后一个。

- 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。

```javascript
function bubbleSort(arr) {
  var len = arr.length
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        //相邻元素两两对比
        var temp = arr[j + 1] //元素交换
        arr[j + 1] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
console.log(bubbleSort(arr)) //[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
```

**改进冒泡排序**

设置一标志性变量pos,用于记录每趟排序中最后一次进行交换的位置。由于pos位置之后的记录均已交换到位,故在进行下一趟排序时只要扫描到pos位置即可。

```javascript
function bubbleSort2(arr) {
  console.time('改进后冒泡排序耗时')
  var i = arr.length - 1 //初始时,最后位置保持不变
  while (i > 0) {
    var pos = 0 //每趟开始时,无记录交换
    for (var j = 0; j < i; j++)
      if (arr[j] > arr[j + 1]) {
        pos = j //记录交换的位置
        var tmp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = tmp
      }
    i = pos //为下一趟排序作准备
  }
  console.timeEnd('改进后冒泡排序耗时')
  return arr
}
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
console.log(bubbleSort2(arr)) //[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
```

**继续优化**

传统冒泡排序中每一趟排序操作只能找到一个最大值或最小值,我们考虑利用在每趟排序中进行正向和反向两遍冒泡的方法一次可以得到两个最终值(最大者和最小者) , 从而使排序趟数几乎减少了一半。

```javascript
function bubbleSort3(arr3) {
  var low = 0
  var high = arr.length - 1 //设置变量的初始值
  var tmp, j
  console.time('2.改进后冒泡排序耗时')
  while (low < high) {
    for (
      j = low;
      j < high;
      ++j //正向冒泡,找到最大者
    )
      if (arr[j] > arr[j + 1]) {
        tmp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = tmp
      }
    --high //修改high值, 前移一位
    for (
      j = high;
      j > low;
      --j //反向冒泡,找到最小者
    )
      if (arr[j] < arr[j - 1]) {
        tmp = arr[j]
        arr[j] = arr[j - 1]
        arr[j - 1] = tmp
      }
    ++low //修改low值,后移一位
  }
  console.timeEnd('2.改进后冒泡排序耗时')
  return arr3
}
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
console.log(bubbleSort3(arr)) //[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
```

---

## 18. 写一个 LRU 缓存函数

**参考答案：**

关于缓存，有个常见的例子是，当用户访问不同站点时，浏览器需要缓存在对应站点的一些信息，这样当下次访问同一个站点的时候，就可以使访问速度变快（因为一部分数据可以直接从缓存读取）。 但是想想内存空间是有限的，所以必须有一些规则来管理缓存的使用，而LRU（Least Recently Used） Cache就是其中之一，直接翻译就是“最不经常使用的数据，重要性是最低的，应该优先删除”。

**需求分析**

假设我们要实现一个简化版的这个功能，先整理下需求：

- 需要提供put方法，用于写入不同的缓存数据，假设每条数据形式是{'域名','info'},例如{'[<span style="color: rgb(36,91,219); background-color: inherit">https://segmentfault.com</span>](https://segmentfault.com/)': '一些关键信息'}（如果是同一站点重复写入，就覆盖）;

- 当缓存达到上限时， 调用put写入缓存之前, 要删除最近最少使用的数据；

- 提供get方法，用于读取缓存数据，同时需要把被读取的数据，移动到最近使用数据 ；

- 考虑到读取性能，希望get操作的复杂度是O(1)（简单理解就是，读取缓存时不能去遍历所有数据）

**数据选型**

首先题目里很明显的提到了，需要能够标记数据的插入或使用顺序， 所以肯定不能简单使用object实现，需要借助数组，或者es6的Map和Set实现(Map和Set数据遍历是有序的，遍历顺序即插入顺序)；

其次需要实现O(1)复杂度，那就也无法用单纯使用数组来实现，所以可以考虑的只有Map和Set，那么最后再考虑下数据重复性的问题，会发现这道题不太需要考虑这个场景，所以我们可以先使用Map来实现。

由于Map的特性是：新插入的数据排在后面，旧数据放在前面， 所以我们只要专注于维持这个逻辑就好了:

- 如果遇到要删除数据，则优先从前面删除, 因为最前面的必定是最不常用数据；

- 如果读取某条数据，则应该把数据放到末尾，保证该数据变为最近使用数据；

**算法实现**

接下来就可以一步步是实现代码了，首先是最基本的 构造函数:

```javascript
// 第一步代码
class LRUCache {
  constructor(n) {
    this.size = n // 初始化最大缓存数据条数n
    this.data = new Map() // 初始化缓存空间map
  }
}
```

接下来是put方法，put方法要处理3个逻辑：

1、如果待写入的域名，已存在于内存之中，直接更新数据并移动到末尾； 2、如果当前未达到缓存数量上限，直接写入新数据； 3、如果当前已经达到缓存数量上限， 要先删除最不经常使用的数据，再写入数据；

其他都可以直接操作，移动到末尾这个行为，可以拆成"先删除该数据，再从末尾重新插入一条该数据"，这样就简单多了。所以我们继续更新代码：

```javascript
// 第一步代码
class LRUCache {
  constructor(n) {
    this.size = n // 初始化最大缓存数据条数n
    this.data = new Map() // 初始化缓存空间map
  }
  // 第二步代码
  put(domain, info) {
    if (this.data.has(domain)) {
      this.data.delete(domain) // 移除数据
      this.data.set(domain, info) // 在末尾重新插入数据
      return
    }
    if (this.data.size >= this.size) {
      // 删除最不常用数据
      const firstKey = this.data.keys().next().value // 不必当心data为空，因为this.size 一般不会取0，满足this.data.size >= this.size时，this.data自然也不为空。
      this.data.delete(firstKey)
    }
    this.data.set(domain, info) // 写入数据
  }
}
```

接着就只剩下get方法了，get方法同样也要处理2种逻辑：

1、根据给定的key，查找是否有对应的信息，若不存在则返回false； 2、若第一步结果存在，则把被访问数据移动到末尾；

```javascript
// 第一步代码
class LRUCache {
  constructor(n) {
    this.size = n // 初始化最大缓存数据条数n
    this.data = new Map() // 初始化缓存空间map
  }

  // 第二步代码
  put(domain, info) {
    if (this.data.size >= this.size) {
      // 删除最不常用数据
      const firstKey = [...this.data.keys()][0] // 次数不必当心data为空，因为this.size 一般不会取0，满足this.data.size >= this.size时，this.data自然也不为空。
      this.data.delete(firstKey)
    }
    this.data.set(domain, info) // 写入数据
  }

  // 第三步代码
  get(domain) {
    if (!this.data.has(domain)) {
      return false
    }
    const info = this.data.get(domain) //获取结果
    this.data.delete(domain) // 移除数据
    this.data.set(domain, info) // 重新添加该数据
    return info
  }
}
```

这一步要稍微注意的是，我们是先移除数据后添加数据，严格遵循最大数量不超过n。

---

## 19. 实现一个函数，判断输入是不是回文字符串。

“回文串”是一个正读和反读都一样的字符串，比如“level”或者“noon”等等就是回文串。

**参考答案：**

- 解法一

```javascript
function isPlalindrome(input) {
  if (typeof input !== 'string') return false
  return input.split('').reverse().join('') === input
}
```

- 解法二

```javascript
function isPlalindrome(input) {
  if (typeof input !== 'string') return false
  let i = 0,
    j = input.length - 1
  while (i < j) {
    if (input.charAt(i) !== input.charAt(j)) return false
    i++
    j--
  }
  return true
}
```
