// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;

// babel 转码后
"use strict";
console.log(bar);
var bar = 2;