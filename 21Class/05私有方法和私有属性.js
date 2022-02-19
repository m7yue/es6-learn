// 私有方法和私有属性，是只能在类的内部访问的方法和属性，外部不能访问。这是常见需求，有利于代码的封装，但 ES6 不提供，只能通过变通方法模拟实现。
// 将私有方法移出模块
class Widget {
  foo (baz) {
    bar.call(this, baz);
  }

  // ...
}

function bar(baz) {
  return this.snaf = baz;
}


// 利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值。
const bar = Symbol('bar');
const snaf = Symbol('snaf');
export default class myClass{
  // 公有方法
  foo(baz) {
    this[bar](baz);
  }
  // 私有方法
  [bar](baz) {
    return this[snaf] = baz;
  }
  // ...
};
// 但是通过 Reflect.ownKeys() 依然可以拿到它们。



// 私有属性的提案   chrome 可以运行
// 使用#表示
class IncreasingCounter {
  #count = 0;
  get value() {
    console.log('Getting the current value!');
    return this.#count;
  }
  increment() {
    this.#count++;
  }
}
const counter = new IncreasingCounter();
counter.#count // 报错
counter.#count = 42 // 报错


class Point {
  #x;

  constructor(x = 0) {
    this.#x = +x;
  }

  get x() {
    return this.#x;
  }

  set x(value) {
    this.#x = +value;
  }
}
// 井号#是属性名的一部分，使用时必须带有#一起使用，所以#x和x是两个不同的属性。


// 之所以要引入一个新的前缀#表示私有属性，而没有采用private关键字，是因为 JavaScript 是一门动态语言，没有类型声明，
// 使用独立的符号似乎是唯一的比较方便可靠的方法，能够准确地区分一种属性是否为私有属性。ES6 没有用这个符号而使用#，是因为@已经被留给了 Decorator。


// 这种写法不仅可以写私有属性，还可以用来写私有方法。
class Foo {
  #a;
  #b;
  constructor(a, b) {
    this.#a = a;
    this.#b = b;
  }
  #sum() { // 私有方法
    return this.#a + this.#b;
  }
  printSum() {
    console.log(this.#sum());
  }
}


// 私有属性不限于从this引用，只要是在类的内部，实例也可以引用私有属性。
class Foo {
  #privateValue = 42;
  static getPrivateValue(foo) {
    return foo.#privateValue;
  }
}

Foo.getPrivateValue(new Foo()); // 42



// 私有属性和私有方法前面，也可以加上static关键字，表示这是一个静态的私有属性或私有方法。
class FakeMath {
  static PI = 22 / 7;
  static #totallyRandomNumber = 4;

  static #computeRandomNumber() {
    return FakeMath.#totallyRandomNumber;
  }

  static random() {
    console.log('I heard you like random numbers…')
    return FakeMath.#computeRandomNumber();
  }
}

FakeMath.PI // 3.142857142857143
FakeMath.random()
// I heard you like random numbers…
// 4
FakeMath.#totallyRandomNumber // 报错
FakeMath.#computeRandomNumber() // 报错

