// 只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
// ES6 明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

function bar(x = y, y = 2) {
  return [x, y];
}

bar(); // 报错

// babel 转码
"use strict";
function bar() {
  var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : y; // 严格模式下，y未定义
  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return [x, y];
}
bar();