// ES5 的Object.getOwnPropertyDescriptor()方法会返回某个对象属性的描述对象（descriptor）。
// ES2017 引入了Object.getOwnPropertyDescriptors()方法，返回指定对象所有自身属性（非继承属性）的描述对象。

const obj = {
  foo: 123,
  get bar() { return 'abc' }
};

Object.getOwnPropertyDescriptors(obj)
  // { 
  //   foo: { 
  //     value: 123,
  //     writable: true,
  //     enumerable: true,
  //     configurable: true 
  //   },
  //   bar: {
  //     get: [Function: get bar],
  //     set: undefined,
  //     enumerable: true,
  //     configurable: true 
  //   }
  // }



// 该方法的引入目的，主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题。
// Object.getOwnPropertyDescriptors()方法配合Object.defineProperties()方法，就可以实现正确拷贝。
const source = {
  set foo(value) {
    console.log(value);
  }
};

const target2 = {};
Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
Object.getOwnPropertyDescriptor(target2, 'foo')
// { get: undefined,
//   set: [Function: set foo],
//   enumerable: true,
//   configurable: true }


// Object.getOwnPropertyDescriptors()方法的另一个用处，是配合Object.create()方法，将对象属性克隆到一个新对象。这属于浅拷贝。 @I
const shallowClone = (obj) => Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
);