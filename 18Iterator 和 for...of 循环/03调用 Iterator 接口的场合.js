// 有一些场合会默认调用 Iterator 接口（即Symbol.iterator方法）

// （1）解构赋值   对数组和 Set 结构进行解构赋值时，会默认调用Symbol.iterator方法。
    let set = new Set().add('a').add('b').add('c');
    let [x,y] = set;
    // x='a'; y='b'
    let [first, ...rest] = set;
    // first='a'; rest=['b','c'];

// （2）扩展运算符   扩展运算符（...）也会调用默认的 Iterator 接口。
  // 例一
  var str = 'hello';
  [...str] //  ['h','e','l','l','o']

  // 例二
  let arr = ['b', 'c'];
  ['a', ...arr, 'd']
  // ['a', 'b', 'c', 'd']
// 实际上，这提供了一种简便机制，可以将任何部署了 Iterator 接口的数据结构，转为数组。
// 也就是说，只要某个数据结构部署了 Iterator 接口，就可以对它使用扩展运算符，将其转为   数组。

// （3）yield*  yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。@I
let generator = function* () {
  yield 1;
  yield* [2,3,4];
  yield 5;
};

var iterator = generator();

iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 3, done: false }
iterator.next() // { value: 4, done: false }
iterator.next() // { value: 5, done: false }
iterator.next() // { value: undefined, done: true }

([...generator]) // [1, 2, 3, 4, 5]


  // （4）其他场合  由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。
  // for...of
  // Array.from()
  // Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
  // Promise.all()
  // Promise.race()
