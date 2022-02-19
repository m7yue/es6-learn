function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}


// ES6 允许块级作用域的任意嵌套。
{{{{
  {let insane = 'Hello World'}
  console.log(insane); // 报错
}}}};

// 内层作用域可以定义外层作用域的同名变量。
{{{{
  let insane = 'Hello World';
  {let insane = 'Hello World'}
}}}};


// 块级作用域的出现，实际上使得获得广泛应用的匿名立即执行函数表达式（匿名 IIFE）不再必要了。
// IIFE 写法
var r = (function () {
  var tmp = 1;
  return function(){
    console.log(tmp)
  }
}());
r() // 1

// 块级作用域写法
let r
{
  let tmp = 1;
  r=function(){
    console.log(tmp)
  }
}
r() // 1