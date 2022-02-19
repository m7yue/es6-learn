// （1）复制数组
  // ES5 只能用变通方法来复制数组。
  const a1 = [1, 2];
  const a2 = a1.concat();

  a2[0] = 2;
  a1 // [1, 2]

  // 扩展运算符提供了复制数组的简便写法。
  const a1 = [1, 2];
  // 写法一
  const a2 = [1, ...a1, 2];
  // babel 转码
  var a2 = [1].concat(a1, [2]);

  // 写法二
  const [a, ...a2] = a1;
  // babel 转码
  var a = a1[0], a2 = a1.slice(1);



// （2）合并数组
const arr1 = ['a', 'b'];
const arr2 = ['c'];
const arr3 = ['d', 'e'];

// ES5 的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6 的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]
// 不过，这两种方法都是浅拷贝，使用的时候需要注意。


// （3）与解构赋值结合
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]

// @I
const [first, ...rest] = [];
first // undefined
rest  // []
// babel 转码
var _ref = [], first = _ref[0], rest = _ref.slice(1);

const [first, ...rest] = ["foo"];
first  // "foo"
rest   // []

// 如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。
const [...butLast, last] = [1, 2, 3, 4, 5];
// 报错
const [first, ...middle, last] = [1, 2, 3, 4, 5];
// 报错


// （4）字符串
// 扩展运算符还可以将字符串转为真正的数组。
[...'hello']
// [ "h", "e", "l", "l", "o" ]

// （5）实现了 Iterator 接口的对象 @I
// 任何定义了遍历器（Iterator）接口的对象（参阅 Iterator 一章），都可以用扩展运算符转为真正的数组。
Number.prototype[Symbol.iterator] = function*() {
  let i = 0;
  let num = this.valueOf();
  while (i < num) {
    yield i++;
  }
}
console.log([...5]) // [0, 1, 2, 3, 4]


// （6）Map 和 Set 结构，Generator 函数
// 扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符，比如 Map 结构。
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let arr = [...map]; // [[1,'one'],[2,'two'],[3,'three']]


