// JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。

// Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。@I
// 也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。
  const m = new Map();
  const o = {p: 'Hello World'};

  m.set(o, 'content')
  m.get(o) // "content"

  m.has(o) // true
  m.delete(o) // true
  m.has(o) // false


// Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
  const map = new Map([
    ['name', '张三'],
    ['title', 'Author']
  ]);
  
  map.size // 2
  map.has('name') // true
  map.get('name') // "张三"
  map.has('title') // true
  map.get('title') // "Author"


// Map构造函数接受数组作为参数，实际上执行的是下面的算法。
const items = [
  ['name', '张三'],
  ['title', 'Author']
];
const map = new Map();
items.forEach(
  ([key, value]) => map.set(key, value)
);

// 事实上，不仅仅是数组，任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构
// 都可以当作Map构造函数的参数。这就是说，Set和Map都可以用来生成新的 Map。@I
const set = new Set([
  ['foo', 1],
  ['bar', 2]
]);
const m1 = new Map(set);
m1.get('foo') // 1

const m2 = new Map([['baz', 3]]);
const m3 = new Map(m2);
m3.get('baz') // 3


// 如果对同一个键多次赋值，后面的值将覆盖前面的值。
const map = new Map();
map
.set(1, 'aaa')
.set(1, 'bbb');
map.get(1) // "bbb"

// 如果读取一个未知的键，则返回undefined。
new Map().get('asfddfsasadf')
// undefined


// 注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。
const map = new Map();
map.set(['a'], 555);
map.get(['a']) // undefined


// 如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，比如0和-0就是一个键，布尔值true和字符串true则是两个不同的键。
// 另外，undefined和null也是两个不同的键。         虽然NaN不严格相等于自身，但 Map 将其视为同一个键。@I
let map = new Map();
map.set(-0, 123);
map.get(+0) // 123

map.set(true, 1);
map.set('true', 2);
map.get(true) // 1

map.set(undefined, 3);
map.set(null, 4);
map.get(undefined) // 3

map.set(NaN, 123);
map.get(NaN) // 123  虽然NaN不严格相等于自身，但 Map 将其视为同一个键I。@I
