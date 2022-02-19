// Set 结构的实例有以下属性。

// Set.prototype.constructor：构造函数，默认就是Set函数。

// Set.prototype.size：返回Set实例的成员总数。

// Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。

//下面先介绍四个操作方法。
  // Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
  // Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
  // Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
  // Set.prototype.clear()：清除所有成员，没有返回值。

// Array.from方法可以将 Set 结构转为数组。
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items); // [1,2,3,4,5]

// 这就提供了去除数组重复成员的另一种方法。
function dedupe(array) {
  return Array.from(new Set(array));
}
dedupe([1, 1, 2, 3]) // [1, 2, 3]


// Set 结构的实例有四个遍历方法，可以用于遍历成员。
  // Set.prototype.keys()：返回键名的遍历器
  // Set.prototype.values()：返回键值的遍历器
  // Set.prototype.entries()：返回键值对的遍历器
  // Set.prototype.forEach()：使用回调函数遍历每个成员


// Set的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用。

// keys()，values()，entries()
// keys方法、values方法、entries方法返回的都是遍历器对象。由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。
    let set = new Set(['red', 'green', 'blue']);

    for (let item of set.keys()) {
      console.log(item);
    }
    // red
    // green
    // blue

    for (let item of set.values()) {
      console.log(item);
    }
    // red
    // green
    // blue

    for (let item of set.entries()) {
      console.log(item);
    }
    // ["red", "red"]
    // ["green", "green"]
    // ["blue", "blue"]


// Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。
Set.prototype[Symbol.iterator] === Set.prototype.values
// true

// 这意味着，直接用for...of循环遍历 Set。
let set = new Set(['red', 'green', 'blue']);

for (let x of set) {
  console.log(x);
}
// red
// green
// blue


// Set 结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，没有返回值。
let set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + ' : ' + value))
// 1 : 1
// 4 : 4
// 9 : 9
// forEach方法还可以有第二个参数，表示绑定处理函数内部的this对象。


// 遍历的应用
// 扩展运算符（...）内部使用for...of循环，所以也可以用于 Set 结构。
let set = new Set(['red', 'green', 'blue']);
let arr = [...set];
// ['red', 'green', 'blue']


// 使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。 @I
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}


// 在遍历操作中，同步改变原来的 Set 结构，目前没有直接的方法，但有两种变通方法。
// 方法一
let set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2));
// set的值是2, 4, 6

// 方法二
let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2));
// set的值是2, 4, 6