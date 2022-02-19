// 静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。
// 老写法
class Foo {
}

Foo.prop = 1;
Foo.prop // 1

// 新写法
class MyClass {
  static myStaticProp = 42;

  constructor() {
    console.log(MyClass.myStaticProp); // 42
  }
}