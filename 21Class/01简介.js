class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}

// 上面代码定义了一个“类”，可以看到里面有一个constructor方法，这就是构造方法，而this关键字则代表实例对象。
// Point类除了构造方法，还定义了一个toString方法。 类的所有方法都定义在类的prototype属性上面。
class Point {
  constructor() {
    // ...
  }
  toString() {
    // ...
  }
  toValue() {
    // ...
  }
}
// 等同于
Point.prototype = {
  constructor() {}, // new 自动执行constructor 因为 constructor 指向类本身
  toString() {},
  toValue() {},
};

// 由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。Object.assign方法可以很方便地一次向类添加多个方法。
class Point {
  constructor(){
    // ...
  }
}

Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
});


// 类的prototype对象的constructor属性，直接指向“类”的本身，这与 ES5 的行为是一致的。
Point.prototype.constructor === Point // true


// 类的内部所有定义的方法，都是不可枚举的（non-enumerable）。
class Point {
  constructor(x, y) {
    // ...
  }

  toString() {
    // ...
  }
}

Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]

// 这一点与 ES5 的行为不一致。
var Point = function (x, y) {
  // ...
};

Point.prototype.toString = function() {
  // ...
};
Object.keys(Point.prototype)
// ["toString"]
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]



// constructor 方法
// constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
  class Point {
  }

  // 等同于
  class Point {
    constructor() {}
  }


// constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo
// false


// 类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。
class Foo {
  constructor() {
    return Object.create(null);
  }
}

Foo()
// TypeError: Class constructor Foo cannot be invoked without 'new'





// 类的实例
// 与 ES5 一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。
//定义类
class Point {
  z=1
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
var point = new Point(2, 3); // Point {z: 1, x: 2, y: 3}
point.toString() // (2, 3)
point.z = 1
point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true


// 与 ES5 一样，类的所有实例共享一个原型对象。
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__ === p2.__proto__
//true
// 

// 这也意味着，可以通过实例的__proto__属性为“类”添加方法。
// __proto__ 并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，虽然目前很多现代浏览器的 JS 引擎中都提供了这个私有属性，
// 但依旧不建议在生产中使用该属性，避免对环境产生依赖。生产环境中，我们可以使用 Object.getPrototypeOf 方法来获取实例对象的原型，然后再来为原型添加方法/属性。



// 取值函数（getter）和存值函数（setter）@I
// 与 ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'


// 存值函数和取值函数是设置在属性的 Descriptor 对象上的。 @I
class CustomHTMLElement {
  constructor(element) {
    this.element = element;
  }

  get html() {
    return this.element.innerHTML;
  }

  set html(value) {
    this.element.innerHTML = value;
  }
}

var descriptor = Object.getOwnPropertyDescriptor(
  CustomHTMLElement.prototype, "html"
);

"get" in descriptor  // true
"set" in descriptor  // true
// 上面代码中，存值函数和取值函数是定义在html属性的描述对象上面，这与 ES5 完全一致。


// 属性表达式
// 类的属性名，可以采用表达式。
let methodName = 'getArea';

class Square {
  constructor(length) {
    // ...
  }

  [methodName]() {
    // ...
  }
}



// Class 表达式
// 与函数一样，类也可以使用表达式的形式定义。
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
// 需要注意的是，这个类的名字是Me，但是Me只在 Class 的内部可用，指代当前类。在 Class 外部，这个类只能用MyClass引用。
let inst = new MyClass();
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined

// 如果类的内部没用到的话，可以省略Me，也就是可以写成下面的形式。
const MyClass = class { /* ... */ };


// 采用 Class 表达式，可以写出立即执行的 Class。
let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"



// 注意点
  // （1）严格模式
  //   类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。
  //   考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。

  // （2）不存在提升
  new Foo(); // ReferenceError
  class Foo {}

  // （3）name 属性
  // 由于本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被Class继承，包括name属性。

  // （4）Generator 方法
  // 如果某个方法之前加上星号（*），就表示该方法是一个 Generator 函数。
  class Foo {
    constructor(...args) {
      this.args = args;
    }
    * [Symbol.iterator]() { // Symbol.iterator方法返回一个Foo类的默认遍历器，for...of循环会自动调用这个遍历器。
      for (let arg of this.args) {
        yield arg;
      }
    }
  }

  for (let x of new Foo('hello', 'world')) {
    console.log(x);
  }
  // hello
  // world


// （5）this 的指向
// 类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
// printName方法中的this，默认指向Logger类的实例。但是，如果将这个方法提取出来单独使用，this会指向该方法运行时所在的环境
// （由于 class 内部是严格模式，所以 this 实际指向的是undefined），从而导致找不到print方法而报错。

// @I
// 一个比较简单的解决方法是，在构造方法中绑定this，这样就不会找不到print方法了。
class Logger {
  constructor() {
    this.printName = this.printName.bind(this);
  }

  // ...
}

// 另一种解决方法是使用箭头函数。
class Obj {
  constructor() {
    this.getThis = () => this;
  }
}

const myObj = new Obj();
myObj.getThis() === myObj // true


// 还有一种解决方法是使用Proxy，获取方法的时候，自动绑定this。
function selfish (target) {
  const cache = new WeakMap();
  const handler = {
    get (target, key) {
      const value = Reflect.get(target, key);
      if (typeof value !== 'function') {
        return value;
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(target));
      }
      return cache.get(value);
    }
  };
  const proxy = new Proxy(target, handler);
  return proxy;
}

const logger = selfish(new Logger());
const { printName } = logger; // 会执行坚挺的 get 方法