// 交换变量的值
let x = 1;
let y = 2;
[x, y] = [y, x];


// 从函数返回多个值
function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象
function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();



// 函数参数的定义
// 参数是一组有次序的值
function f([x, y, z]) {  }
f([1, 2, 3]);
// 参数是一组无次序的值, 多用于options参数
function f({x, y, z}) {  }
f({z: 3, y: 2, x: 1});


// 提取 JSON 数据
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};
let { id, status, data: numbers } = jsonData;


// 函数参数的默认值
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
} = {}) {
  // ... do stuff
};
// 指定参数的默认值，就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句。


// 遍历 Map 结构
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
}
for (let [key] of map) {
}
for (let [,value] of map) {
}


// 输入模块的指定方法
const { SourceMapConsumer, SourceNode } = require("source-map");
