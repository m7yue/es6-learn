let [a, b, c] = [1, 2, 3];
console.log(a, b, c)

let [foo, [[bar], baz]] = [1, [[2], 3]];
console.log(foo) // 1
console.log(bar) // 2
console.log(baz) // 3

let [ , , third] = ["foo", "bar", "baz"];
console.log(third) // "baz"

let [x, , y] = [1, 2, 3];
console.log(x) // 1
console.log(y) // 3

let [head, ...tail] = [1, 2, 3, 4];
console.log(head) // 1
console.log(tail) // [2, 3, 4]

let [xa, ya, ...za] = ['a'];
console.log(xa) // "a"
console.log(ya) // undefined
console.log(za) // []

// 不完全解构
let [x1, y1] = [1, 2, 3];
console.log(x1, y1) // 1, 2

let [a1, [b1], d1] = [1, [2, 3], 4];
console.log(a1, b1, d1) // 1, 2, 4

// 报错
// let [foo1] = 1;
// let [foo2] = false;
// let [foo3] = NaN;
// let [foo4] = undefined;
// let [foo5] = null;
// let [foo6] = {};
// 因为前五个表达式转换为对象后也都不具备 Iterator 接口, 最后一个表达式不具备 Iterator 接口

// 对于 Set 结构，也可以使用数组的解构赋值。
let [xs, ys, zs] = new Set(['a', 'b', 'c']);
console.log(xs, ys, zs)


// 事实上，只要某种数据结构具有 Iterator 接口，都可以采用 数组形式 的解构赋值。@I
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
let [first1, second1, third1, fourth1, fifth1, sixth1,seven1] = fibs();
console.log(first1, second1, third1, fourth1, fifth1, sixth1,seven1) // 0 1 1 2 3 5 8
const g = fibs();
console.log(g.next(), g.next(), g.next())


// 默认值 @I
let [foom = true] = [];
console.log(foom) // true

// 注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。@I
// undefined
let [xd = 1] = [undefined];
console.log(xd) // 1
let [xn = 1] = [null];
console.log(xn) // null  // 因为null不严格等于undefined。

// 默认值是表达式
function f() {
  console.log('aaa');
}
let [xf = f()] = [1];
console.log(xf)
// 这个表达式是惰性求值的，即只有在用到的时候，才会求值。 等价于@I
let xf1;
if ([1][0] === undefined) {
  xf1 = f();
} else {
  xf1 = [1][0];
}

// 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError: y is not defined  暂时性死区


