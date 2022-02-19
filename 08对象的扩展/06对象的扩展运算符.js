// 解构赋值
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }

// 由于解构赋值要求等号右边是一个对象，所以如果等号右边是undefined或null，就会报错，因为它们无法转为对象。
let { ...z } = null; // 运行时错误
let { ...z } = undefined; // 运行时错误


// 解构赋值必须是最后一个参数，否则会报错。
let { ...x, y, z } = someObject; // 句法错误
let { x, ...y, ...z } = someObject; // 句法错误

// 注意，解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。
let obj = { a: { b: 1 } };
let { ...x } = obj;
obj.a.b = 2;
x.a.b // 2



// 另外，扩展运算符的解构赋值，不能复制继承自原型对象的属性。
let o1 = { a: 1 };
let o2 = { b: 2 };
o2.__proto__ = o1;
let { ...o3 } = o2;
o3 // { b: 2 }
o3.a // undefined
let {a,b}=o2
a // 1
b // 2

const o = Object.create({ x: 1, y: 2 }); // o.__propto__={x:1,y:2}
o.z = 3;
let { x, ...newObj } = o; // 不能复制继承自原型对象的属性。@I
let { y, z } = newObj;
x // 1
y // undefined
z // 3


// 扩展某个函数的参数
function baseFunction({ a, b }) {
  // ...
}
function wrapperFunction({ x, y, ...restConfig }) {
  // 使用 x 和 y 参数进行操作
  // 其余参数传给原始函数
  return baseFunction(restConfig);
}
// 上面代码中，原始函数baseFunction接受a和b作为参数，函数wrapperFunction
// 在baseFunction的基础上进行了扩展，能够接受多余的参数，并且保留原始函数的行为。




// 扩展运算符
// 对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。
let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }

// 由于数组是特殊的对象，所以对象的扩展运算符也可以用于数组。
let foo = { ...['a', 'b', 'c'] };
foo
// {0: "a", 1: "b", 2: "c"}

// 如果扩展运算符后面是一个空对象，则没有任何效果。
({...{}, a: 1})
// { a: 1 }
// 上面代码中，扩展运算符后面是整数1，会自动转为数值的包装对象Number{1}。由于该对象没有自身属性，所以返回一个空对象。

// @I
// 等同于 {...Object(true)}
({...true}) // {}
// 等同于 {...Object(undefined)}
({...undefined}) // {}
// 等同于 {...Object(null)}
({...null}) // {}


({...'hello'})
// {0: "h", 1: "e", 2: "l", 3: "l", 4: "o"}

// 对象的扩展运算符等同于使用Object.assign()方法。
let aClone = { ...a };
// 等同于
let aClone = Object.assign({}, a);

// 上面的例子只是拷贝了对象实例的属性，如果想完整克隆一个对象，还拷贝对象原型的属性，可以采用下面的写法。@I
// 写法一
const clone1 = {
  __proto__: Object.getPrototypeOf(obj),
  ...obj
};
// 写法二
const clone2 = Object.assign(
  Object.create(Object.getPrototypeOf(obj)),
  obj
);
// 写法三
const clone3 = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
)
// 上面代码中，写法一的__proto__属性在非浏览器的环境不一定部署，因此推荐使用写法二和写法三。


// 扩展运算符可以用于合并两个对象。
let ab = { ...a, ...b };
// 等同于
let ab = Object.assign({}, a, b);

// 如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。 react ...state


// 扩展运算符的参数对象之中，如果有取值函数get，这个函数是会执行的。
let a = {
  get x() {
    throw new Error('not throw yet');
  }
}

let aWithXGetter = { ...a }; // 报错
