// 模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。

// 一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。

// export命令除了输出变量，还可以输出函数或类（class）。
export function multiply(x, y) {
  return x * y;
};

// 可以使用as关键字重命名
const a = 1
export {a as b}


// 错误的写法
  // export 1;
// 报错
  // var m = 1;
  // export m;

// 正确的写法
// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};


// export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
// 上面代码输出变量foo，值为bar，500 毫秒之后变成baz。
// 这一点与 CommonJS 规范完全不同。CommonJS 模块输出的是值的缓存，不存在动态更新，详见《Module 的加载实现》@I


// export命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，import命令也是如此。
// 这是因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷。