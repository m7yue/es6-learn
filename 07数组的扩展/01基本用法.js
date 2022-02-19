console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

([...document.querySelectorAll('div')])
// [<div>, <div>, <div>]


function push(array, ...items) {
  array.push(...items);
}
let arr = []
let arr1 = [1,2,3]
push(arr, ...arr1)


function add(x, y) {
  return x + y;
}

const numbers = [4, 38];
add(...numbers) // 42
// babel转码
add.apply(void 0, numbers)


// 扩展运算符与正常的函数参数可以结合使用，非常灵活。
function f(v, w, x, y, z) { }
const args = [0, 1];
f(-1, ...args, 2, ...[3]);
// babel 转码
f.apply(void 0, [-1].concat(args, [2], [3]));


// 扩展运算符后面还可以放置表达式。 @I
const arr = [
  ...(x > 0 ? ['a'] : []),
  'b',
];


// 如果扩展运算符后面是一个空数组，则不产生任何效果。
[...[], 1]
// [1]


