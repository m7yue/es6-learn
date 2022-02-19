var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6

// babel 转码后
"use strict";
var a = [];
var _loop = function _loop(i) {
  a[i] = function () {
    console.log(i);
  };
};
for (var i = 0; i < 10; i++) {
  _loop(i);
}
a[6]();


// for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。
for (let i = 0; i < 3; i++) {
  let i = 'abc'; // 没有报错, 如果在同一作用域会报错
  console.log(i);
}
// abc
// abc
// abc