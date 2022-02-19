// Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。
// Set 和 Map 也包含数字索引结构
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 4
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ["a", "b", "c", empty]

// ES6的写法
let arr2 = Array.from(arrayLike); // ["a", "b", "c", undefined]

// 实际应用中，常见的类似数组的对象是 DOM 操作返回的 NodeList 集合，以及函数内部的arguments对象。Array.from都可以将它们转为真正的数组。@I
// NodeList对象  也是数字索引结构 
let ps = document.querySelectorAll('p');
Array.from(ps).filter(p => {
  return p.textContent.length > 100;
});

// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}

// 只要是部署了 Iterator 接口的数据结构，Array.from都能将其转为数组。@I

Array.from('hello')
// ['h', 'e', 'l', 'l', 'o']
let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']

// 值得提醒的是，扩展运算符（...）也可以将某些数据结构转为数组。
// arguments对象
function foo() {
  const args = [...arguments];
}

// NodeList对象
[...document.querySelectorAll('div')]


// 扩展运算符背后调用的是遍历器接口（Symbol.iterator），如果一个对象没有部署这个接口，就无法转换。Array.from方法还支持类似数组的对象。
// 所谓类似数组的对象，本质特征只有一点，即必须有length属性。因此，任何有length属性的对象，都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换。@I
Array.from({ length: 3 });
// [ undefined, undefined, undefined ]


// 对于还没有部署该方法的浏览器，可以用Array.prototype.slice方法替代。
const toArray = (() =>
  Array.from ? Array.from : obj => [].slice.call(obj)
)();


// Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);
Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]

// 下面的例子是取出一组 DOM 节点的文本内容。@I
let spans = document.querySelectorAll('span.name');
// map()
let names1 = Array.prototype.map.call(spans, s => s.textContent);
// Array.from()
let names2 = Array.from(spans, s => s.textContent)

// 下面的例子将数组中布尔值为false的成员转为0。
Array.from([1, , 2, , 3], (n) => n || 0)

// 另一个例子是返回各种数据的类型。
function typesOf () {
  return Array.from(arguments, value => typeof value)
}
typesOf(null, [], NaN) // ['object', 'object', 'number']

// 如果map函数里面用到了this关键字，还可以传入Array.from的第三个参数，用来绑定this。@I


Array.from({ length: 2 }, () => 'jack')
// ['jack', 'jack']
// 上面代码中，Array.from的第一个参数指定了第二个参数运行的次数。这种特性可以让该方法的用法变得非常灵活。



