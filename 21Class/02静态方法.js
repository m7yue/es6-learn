// 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function


// 注意，如果静态方法包含this关键字，这个this指的是类，而不是实例。
class Foo {
  static bar() {
    this.baz();
  }
  static baz() {
    console.log('hello');
  }
  baz() { // 从这个例子还可以看出，静态方法可以与非静态方法重名。
    console.log('world');
  }
}
Foo.bar() // hello


// 父类的静态方法，可以被子类继承。
class Foo {
  static classMethod() {
    return 'hello';
  }
}
class Bar extends Foo {
}
Bar.classMethod() // 'hello'


// 静态方法也是可以从super对象上调用的。
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}

Bar.classMethod() // "hello, too"




