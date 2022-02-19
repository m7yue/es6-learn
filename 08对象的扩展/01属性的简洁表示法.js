const foo = 'bar';
const baz = {foo};
baz // {foo: "bar"}

// 除了属性简写，方法也可以简写
const o = {
  method() {
    return "Hello!";
  }
};
// 等同于
const o = {
  method: function() {
    return "Hello!";
  }
};
// 注意，简写的对象方法不能用作构造函数，会报错。
const obj = {
  f() {
    this.foo = 'bar';
  }
};
new obj.f() // 报错
