// 当使用for...of循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。

// 一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。

// ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，或者说，一个数据结构只要具有Symbol.iterator属性，
// 就可以认为是“可遍历的”（iterable）。Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。
// 执行这个函数，就会返回一个遍历器。至于属性名Symbol.iterator，它是一个表达式，
// 返回Symbol对象的iterator属性，这是一个预定义好的、类型为 Symbol 的特殊值，所以要放在方括号内


// ES6 的有些数据结构原生具备 Iterator 接口（比如数组），即不用任何处理，就可以被for...of循环遍历。
// 原因在于，这些数据结构原生部署了Symbol.iterator属性, 另外一些数据结构没有（比如对象）.
// 凡是部署了Symbol.iterator属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。

// 原生具备 Iterator 接口的数据结构如下。
    // Array  Array.prototype[Symbol.iterator]===Array.prototype.values
    // Map  Map.prototype[Symbol.iterator]=== Map.prototype.entries
    // Set  Set.prototype[Symbol.iterator]=== Set.prototype.keys === Set.prototype.values
    // String
    // TypedArray
    // 函数的 arguments 对象
    // NodeList 对象

// 对于原生部署 Iterator 接口的数据结构，不用自己写遍历器生成函数，for...of循环会自动遍历它们。
// 除此之外，其他数据结构（主要是对象）的 Iterator 接口，都需要自己在Symbol.iterator属性上面部署，这样才会被for...of循环遍历。


// 一个对象如果要具备可被for...of循环调用的 Iterator 接口，就必须在Symbol.iterator的属性上部署遍历器生成方法（原型链上的对象具有该方法也可@I）。
class RangeIterator {
  constructor(start, stop) {
    this.value = start;
    this.stop = stop;
  }

  [Symbol.iterator]() { return this; }

  next() {
    var value = this.value;
    if (value < this.stop) {
      this.value++;
      return {done: false, value: value};
    }
    return {done: true, value: undefined};
  }
}

function range(start, stop) {
  return new RangeIterator(start, stop);
}

for (var value of range(0, 3)) {
  console.log(value); // 0, 1, 2
}
// 上面代码是一个类部署 Iterator 接口的写法。Symbol.iterator属性对应一个函数，执行后返回当前对象的遍历器对象。


// 下面是通过遍历器实现指针结构的例子。
function Obj(value) {
  this.value = value;
  this.next = null;
}

Obj.prototype[Symbol.iterator] = function() {
  var iterator = { next: next };

  var current = this;

  function next() {
    if (current) {
      var value = current.value;
      current = current.next;
      return { done: false, value: value };
    } else {
      return { done: true };
    }
  }
  return iterator;
}

var one = new Obj(1);
var two = new Obj(2);
var three = new Obj(3);

one.next = two;
two.next = three;

for (var i of one){
  console.log(i); // 1, 2, 3
}


// 下面是另一个为对象添加 Iterator 接口的例子。 @I
let obj = {
  data: [ 'hello', 'world' ],
  [Symbol.iterator]() {
    const self = this;
    let index = 0;
    return {
      next() {
        if (index < self.data.length) {
          return {
            value: self.data[index++],
            done: false
          };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};


// 对于类似数组的对象（存在数值键名和length属性），部署 Iterator 接口，有一个简便方法，就是Symbol.iterator方法直接引用数组的 Iterator 接口。
  // NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
  // // 或者
  // NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];
  // [...document.querySelectorAll('div')] // 可以执行了



// 下面是另一个类似数组的对象调用数组的Symbol.iterator方法的例子。@I
let iterable = {
  0: 'a',
  3: 'b',
  6: 'c',
  length: 7,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // a undefined undefined b undefined undefined c
}


// 普通对象部署数组的Symbol.iterator方法，并无效果。
let iterable = {
  a: 'a',
  b: 'b',
  c: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // undefined, undefined, undefined
}


// 如果Symbol.iterator方法对应的不是遍历器生成函数（即会返回一个遍历器对象），解释引擎将会报错。
var obj = {};
obj[Symbol.iterator] = () => 1;
[...obj] // TypeError: Result of the Symbol.iterator method is not an object


// 有了遍历器接口，数据结构就可以用for...of循环遍历（详见下文），也可以使用while循环遍历。
var $iterator = ITERABLE[Symbol.iterator]();
var $result = $iterator.next();
while (!$result.done) {
  var x = $result.value;
  // ...
  $result = $iterator.next();
}
// 上面代码中，ITERABLE代表某种可遍历的数据结构，$iterator是它的遍历器对象。
// 遍历器对象每次移动指针（next方法），都检查一下返回值的done属性，如果遍历还没结束，就移动遍历器对象的指针到下一步（next方法），不断循环。

