// Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，
// 可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

// ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。
var proxy = new Proxy(target, handler);
// new Proxy()表示生成一个Proxy实例，target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。

var proxy = new Proxy({}, {
  get: function(target, propKey) {
    return 35;
  }
});

proxy.time // 35
proxy.name // 35
proxy.title // 35
// 注意，要使得Proxy起作用，必须针对Proxy实例（上例是proxy对象）进行操作，而不是针对目标对象（上例是空对象）进行操作。

// 如果handler没有设置任何拦截，那就等同于直接通向原对象。
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';
target.a // "b"


// 一个技巧是将 Proxy 对象，设置到object.proxy属性，从而可以在object对象上调用。
var object = { proxy: new Proxy(target, handler) };


// Proxy 实例也可以作为其他对象的原型对象。 @I
var proxy = new Proxy({}, {
  get: function(target, propKey) {
    return 35;
  }
});

let obj = Object.create(proxy);
obj.time // 35


// 同一个拦截器函数，可以设置拦截多个操作。
var handler = {
  get: function(target, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'Hello, ' + name;
  },

  apply: function(target, thisBinding, args) {
    return args[0];
  },

  construct: function(target, args) {
    return {value: args[1]};
  }
};

var fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);

fproxy(1, 2) // 1
new fproxy(1, 2) // {value: 2}
fproxy.prototype === Object.prototype // true
fproxy.foo === "Hello, foo" // true



// 下面是 Proxy 支持的拦截操作一览，一共 13 种。

// get(target, propKey, receiver): 拦截对象属性的读取，比如proxy.foo和proxy['foo']。

// set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。

// has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。

// deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。

// ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。
// 该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。

// getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。

// defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。

// preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。方法让一个对象变的不可扩展，也就是永远不能再添加新的属性。

// getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。 方法返回指定对象的原型

// isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。 方法判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）。

// setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
// Object.setPrototypeOf() 方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  null.应该使用 Object.create()来创建带有你想要的[[Prototype]]的新对象。

// apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。

// construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
