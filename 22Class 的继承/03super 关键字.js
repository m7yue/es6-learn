// super这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。

// 第一种情况，super作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次super函数。

// 注意，super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B的实例，
// 因此super()在这里相当于  A.prototype.constructor.call(this)。@II
class A {
  constructor() {
    console.log(new.target.name);
  }
}
class B extends A {
  constructor() {
    super();  // A.prototype.constructor.call(this)
  }
}
new A() // A
new B() // B

// 作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。



// 第二种情况，super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。@I
class A {
  p() {
    return 2;
  }
}

class B extends A {
  constructor() {
    super();
    console.log(super.p()); // 2
  }
}

let b = new B();

// 这里需要注意，由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。@I
class A {
  constructor() {
    this.p = 2;
  }
}

class B extends A {
  get m() {
    return super.p;
  }
}

let b = new B();
b.m // undefined


// 如果属性定义在父类的原型对象上，super就可以取到。
class A {}
A.prototype.x = 2;

class B extends A {
  constructor() {
    super();
    console.log(super.x) // 2
  }
}

let b = new B();



// ES6 规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。  A.prototype.constructor.call(this)@I
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print();
  }
}

let b = new B();
b.m() // 2



// 由于this指向子类实例，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。@I
class A {
  constructor() {
    this.x = 1;
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
    super.x = 3;
    console.log(super.x); // undefined  定义在父类实例上的方法或属性，是无法通过super调用的
    console.log(this.x); // 3
  }
}

let b = new B();

// 如果super作为对象，用在“静态方法”之中，这时super将指向父类，而不是父类的原型对象。@I
class Parent {
  static myMethod(msg) {
    console.log('static', msg);
  }

  myMethod(msg) {
    console.log('instance', msg);
  }
}

class Child extends Parent {
  static myMethod(msg) {
    super.myMethod(msg); // super 指向父类
  }

  myMethod(msg) {
    super.myMethod(msg); // super 指向父类原型对象
  }
}

Child.myMethod(1); // static 1

var child = new Child();
child.myMethod(2); // instance 2



// 在子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类，而不是子类的实例。@I
class A {
  constructor() {
    this.x = 1;
  }
  static print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  static m() {
    super.print(); // super 指向父类， 方法中的 this 指向子类，而不是子类实例
  }
}

B.x = 3; // 静态属性
B.m() // 3



// 使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。 @I
class A {}

class B extends A {
  constructor() {
    super();
    // console.log(super); // 报错    console.log(super)当中的super，无法看出是作为函数使用，还是作为对象使用，所以 JavaScript 引擎解析代码的时候就会报错。
  }
}


class A {}

class B extends A {
  constructor() {
    super();
    console.log(super.valueOf() instanceof B); // true   super.valueOf()表明super是一个对象，因此就不会报错
  }
}

let b = new B();
// 由于super使得this指向B的实例，所以super.valueOf()返回的是一个B的实例。



