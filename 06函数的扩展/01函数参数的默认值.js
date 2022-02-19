// ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。

function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}

const p = new Point();
p // { x: 0, y: 0 }

// 参数变量是默认声明的，所以不能用let或const再次声明。@I
function foo(x = 5) {
  let x = 1; // error
  const x = 2; // error
}

// 一个容易忽略的地方是，参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。@I
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}
foo() // 100
x = 100;
foo() // 101


// 与解构赋值默认值结合使用
function foo({x, y = 5}) {
  console.log(x, y);
}
foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
foo() // TypeError: Cannot read property 'x' of undefined
function foo({x, y = 5} = {}) {
  console.log(x, y);
}
foo() // undefined 5

function foo({y = 5}) {
  console.log(x, y);
}
foo() // TypeError: Cannot read property 'y' of undefined

// 参数默认值的位置
// 通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的。


// 函数的 length 属性 
// 指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真。@I
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2

// rest 参数也不会计入length属性。
(function(...args) {}).length // 0

// 如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了。@I
(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1



// 作用域 @I
// 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。
// 等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。
var x = 1;
function f(x, y = x) {
  console.log(y);
}
// babel转码
function f(x) {
  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
  console.log(y);
}
f(2) // 2
// 上面代码中，参数y的默认值等于变量x。调用函数f时，参数形成一个单独的作用域。在这个作用域里面，默认值变量x指向第一个参数x，而不是全局变量x，所以输出是2。


let x = 1;
function f(y = x) {
  let x = 2;
  console.log(y);
}
// babel转码
"use strict";
function f() {
  var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : x;
  return function () { // 对内部代码块的处理
    var x = 2;
    console.log(y);
  }();
}
f() // 1
// 上面代码中，函数f调用时，参数y = x形成一个单独的作用域。这个作用域里面，变量x本身没有定义，所以指向外层的全局变量x。函数调用时，函数体内部的局部变量x影响不到默认值变量x。



function f(y = x) {
  let x = 2;
  console.log(y);
}
f() // ReferenceError: x is not defined


var x = 1;
function foo(x = x) {
  // ...
}
foo() // ReferenceError: x is not defined
// 上面代码中，参数x = x形成一个单独作用域。实际执行的是let x = x，由于暂时性死区的原因，这行代码会报错”x 未定义“。 @I


// 如果参数的默认值是一个函数，该函数的作用域也遵守这个规则。
let foo = 'outer';
function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}
bar(); // outer


var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}
// babel 转码
"use strict";
function foo(x) {
  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {x = 2;};
  return function (x) {
    var x = 3;
    y();
    console.log(x);
  }(x);
}

foo() // 3
x // 1
// 函数foo的参数形成一个单独作用域。y的默认值是一个匿名函数。这个匿名函数内部的变量x，指向同一个作用域的第一个参数x。
// 函数foo内部又声明了一个内部变量x，该变量与第一个参数x由于不是同一个作用域，所以不是同一个变量，因此执行y后，内部变量x和外部全局变量x的值都没变。
var x = 1;
function foo(x, y = function() { x = 2; }) {
  x = 3;
  y();
  console.log(x);
}
foo() // 2
x // 1
// 如果将var x = 3的var去除，函数foo的内部变量x就指向第一个参数x，与匿名函数内部的x是一致的，所以最后输出的就是2，而外层的全局变量x依然不受影响。


// 应用 @I
// 利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。
function throwIfMissing() {
  throw new Error('Missing parameter');
}
function foo(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}
foo()
// Error: Missing parameter
// 这表明参数的默认值不是在定义时执行，而是在运行时执行。