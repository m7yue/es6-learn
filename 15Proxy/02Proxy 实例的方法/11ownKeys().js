// ownKeys()方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作。 @I
//   Object.getOwnPropertyNames()
//   Object.getOwnPropertySymbols()
//   Object.keys()
//   for...in循环

let target = {
  a: 1,
  b: 2,
  c: 3
};

let handler = {
  ownKeys(target) {
    return ['a'];
  }
};

let proxy = new Proxy(target, handler);

Object.keys(proxy) // [ 'a' ]


let target = {
  _bar: 'foo',
  _prop: 'bar',
  prop: 'baz'
};

let handler = {
  ownKeys (target) {
    return Reflect.ownKeys(target).filter(key => key[0] !== '_');
  }
};

let proxy = new Proxy(target, handler);
for (let key of Object.keys(proxy)) {
  console.log(target[key]);
}
// "baz"


// 使用Object.keys()方法时，有三类属性会被ownKeys()方法自动过滤，不会返回。@II
//   目标对象上不存在的属性
//   属性名为 Symbol 值
//   不可遍历（enumerable）的属性
let target = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.for('secret')]: '4',
};

Object.defineProperty(target, 'key', {
  enumerable: false,
  configurable: true,
  writable: true,
  value: 'static'
});

let handler = {
  ownKeys(target) {
    return ['a', 'd', Symbol.for('secret'), 'key'];
  }
};

let proxy = new Proxy(target, handler);

Object.keys(proxy)
// ['a']


// ownKeys()方法还可以拦截Object.getOwnPropertyNames()。
var p = new Proxy({}, {
  ownKeys: function(target) {
    return ['a', 'b', 'c'];
  }
});

Object.getOwnPropertyNames(p)
// [ 'a', 'b', 'c' ]


// for...in循环也受到ownKeys()方法的拦截。
const obj = { hello: 'world' };
const proxy = new Proxy(obj, {
  ownKeys: function () {
    return ['a', 'b'];
  }
});

for (let key in proxy) {
  console.log(key); // 没有任何输出  不会返回原对象中没有的属性
}


// ownKeys()方法返回的数组成员，只能是字符串或 Symbol 值。如果有其他类型的值，或者返回的根本不是数组，就会报错。 @I
var obj = {};

var p = new Proxy(obj, {
  ownKeys: function(target) {
    return [123, true, undefined, null, {}, []];
  }
});

Object.getOwnPropertyNames(p)
// Uncaught TypeError: 123 is not a valid property name



// 如果目标对象自身包含不可配置的属性，则该属性必须被ownKeys()方法返回，否则报错。 @I
var obj = {};
Object.defineProperty(obj, 'a', {
  configurable: false,
  enumerable: true,
  value: 10 }
);

var p = new Proxy(obj, {
  ownKeys: function(target) {
    return ['b'];
  }
});

Object.getOwnPropertyNames(p)
// Uncaught TypeError: 'ownKeys' on proxy: trap result did not include 'a'


// 如果目标对象是不可扩展的（non-extensible），这时ownKeys()方法返回的数组之中，必须包含原对象的所有属性，且不能包含多余的属性，否则报错。 @I
var obj = {
  a: 1
};

Object.preventExtensions(obj);

var p = new Proxy(obj, {
  ownKeys: function(target) {
    return ['a', 'b'];
  }
});

Object.getOwnPropertyNames(p)
// Uncaught TypeError: 'ownKeys' on proxy: trap returned extra keys but proxy target is non-extensible



