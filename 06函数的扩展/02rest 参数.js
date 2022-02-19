function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}
add(2, 5, 3) // 10
// 利用 rest 参数，可以向该函数传入任意数目的参数。


// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}
// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();
// rest 参数是一个真正的数组，数组特有的方法都可以使用。


// rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。
// 报错
function f(a, ...b, c) {
  // ...
}

// 函数的length属性，不包括 rest 参数。
(function(a) {}).length  // 1
(function(...a) {}).length  // 0
(function(a, ...b) {}).length  // 1


