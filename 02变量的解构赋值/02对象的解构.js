let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"

// 对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: 'aaa', bar: 'bbb' };
baz // undefined  // 如果解构失败，变量的值等于undefined。


// 对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。
let { log, sin, cos } = Math;

const { log } = console;
log('hello') // hello


// 别名
let { foo: baz } = { foo: 'aaIa', bar: 'bbb' };
baz // "aaa"
// @I
let { foo: foo1,foo:foo2 } = { foo: 'aaa', bar: 'bbb' };
foo1 // 'aaa'
foo2 // 'aaa'


let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
// 这实际上说明，对象的解构赋值是下面形式的简写
let { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' };


// 嵌套结构的对象。
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};
let { p: [x, { y }] } = obj;


const node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};
let { loc, loc: { start }, loc: { start: { line }} } = node;
line // 1
loc  // Object {start: Object}
start // Object {line: 1, column: 5}


// 报错
let {foo: {bar}} = {baz: 'baz'}; // 因为foo这时等于undefined，再取子属性就会报错


// 对象的解构赋值可以取到继承的属性。 @I
const obj1 = {};
const obj2 = { foo: 'bar' };
Object.setPrototypeOf(obj1, obj2);
const { foo } = obj1;
foo // "bar"


let objGet = {}; // 这个分号必须加上
({a: objGet.a, b: objGet.b, c: objGet.c, f: objGet.f } = { a: I1, b: 2, c: 3, d: '4', e: '5', f: 7})
// 这提供了一种简便方法,获取对象的部分属性 @I
function trans(obj, ...args){
  let res = {}
  args.forEach(key => ({[key]: res[key]} = obj)) // 在平常写业务代码的时候，不会使用循环 会根据业务写死，就很方便

  return res
}
let obj = {a:1,b:2,c:3}
trans(obj, 'a','c')
// {a:1, c:3}


// 默认值
var {x = 3} = {};
x // 3

var {x, y = 5} = {x: 1};
x // 1
y // 5

var {x: y = 3} = {};
y // 3

// var {x=3: y} = {}; // 报错

var {x: y = 3} = {x: 5};
y // 5

var { message: msg = 'Something went wrong' } = {};
msg // "Something went wrong"


// 默认值生效的条件是，对象的属性值严格等于undefined。
var {x = 3} = {x: undefined};
x // 3

var {x = 3} = {x: null}; // @I
x // null

// 数组可以当成对象解构  , 用解构获取数组第一项和最后一项 @I
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3

I
// 错误的写法
let x;
// {x} = {x: 1};
// SyntaxError: syntax error

// 正确的写法
let x;
({x} = {x: 1});

