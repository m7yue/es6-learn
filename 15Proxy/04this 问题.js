// 目标对象内部的this关键字会指向 Proxy 代理  @I

const target = {
  m: function () {
    console.log(this === proxy);
  }
};
const handler = {};

const proxy = new Proxy(target, handler);

target.m() // false
proxy.m()  // true

// 下面是一个例子，由于this指向的变化，导致 Proxy 无法代理目标对象。 @I
const _name = new WeakMap();
class Person {
  constructor(name) {
    _name.set(this, name);
  }
  get name() {
    return _name.get(this);
  }
}
const jane = new Person('Jane');
jane.name // 'Jane'
const proxy = new Proxy(jane, {});
proxy.name // undefined


// 有些原生对象的内部属性，只有通过正确的this才能拿到，所以 Proxy 也无法代理这些原生对象的属性。 @I
const target = new Date();
const handler = {};
const proxy = new Proxy(target, handler);

proxy.getDate();
// TypeError: this is not a Date object.


// 可以将 this 绑定原始对象，解决这个问题。 @I
const target = new Date('2015-01-01');
const handler = {
  get(target, prop) {
    if (prop === 'getDate') {
      return target.getDate.bind(target);
    }
    return Reflect.get(target, prop);
  }
};
const proxy = new Proxy(target, handler);

proxy.getDate() // 1