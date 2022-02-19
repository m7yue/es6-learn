// ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
// Set本身是一个构造函数，用来生成 Set 数据结构。
const s = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
for (let i of s) {
  console.log(i);
}
// 2 3 5 4

// Set函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。
const set = new Set([1, 2, 3, 4, 4]);
[...set] // [1, 2, 3, 4]

const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5

const set = new Set(document.querySelectorAll('div'));
set.size // 56

// 去除数组的重复成员
([...new Set(array)])

// 去除字符串里面的重复字符
([...new Set('ababbc')].join('')) // 'abc'

// 向 Set 加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，
// 它类似于精确相等运算符（===），主要的区别是向 Set 加入值时认为NaN等于自身，而精确相等运算符认为NaN不等于自身。 @I
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
set // Set {NaN}

let set = new Set();
set.add({});
set.size // 1
set.add({});
set.size // 2

