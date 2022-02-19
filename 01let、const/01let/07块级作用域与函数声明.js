// ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。
// ES6 规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用。

// 浏览器的 ES6 环境
function f() { console.log('I am outside!'); }
(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }
  f();
}());
// Uncaught TypeError: f is not a function


// ES6 的块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域。
// 第一种写法，报错
if (true) let x = 1;

// 第二种写法，不报错
if (true) {
  let x = 1;
}


// 考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。
// 如果确实需要，也应该写成函数表达式，而不是函数声明语句。
// 块级作用域内部的函数声明语句，建议不要使用
{
  let a = 'secret';
  function f() {
    return a;
  }
}

// 块级作用域内部，优先使用函数表达式
{
  let a = 'secret';
  let f = function () {
    return a;
  };
}