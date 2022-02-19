// setPrototypeOf()方法主要用来拦截Object.setPrototypeOf()方法。
var handler = {
  setPrototypeOf (target, proto) {
    throw new Error('Changing the prototype is forbidden');
  }
};
var proto = {};
var target = function () {};
var proxy = new Proxy(target, handler);
Object.setPrototypeOf(proxy, proto);
// Error: Changing the prototype is forbidden

// 注意，该方法只能返回布尔值，否则会被自动转为布尔值。
// 另外，如果目标对象不可扩展（non-extensible），setPrototypeOf()方法不得改变目标对象的原型。