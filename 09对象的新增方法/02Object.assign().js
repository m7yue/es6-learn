// Object.assign()方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
// Object.assign()拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）。但包括 Symbol

const target = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}


// 注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
const target = { a: 1, b: 1 };
const source1 = { b: 2, c: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}

// 如果只有一个参数，Object.assign()会直接返回该参数。
const obj = {a: 1};
Object.assign(obj) === obj // true

// 如果该参数不是对象，则会先转成对象，然后返回。
typeof Object.assign(2) // "object"


// 由于undefined和null无法转成对象，所以如果它们作为参数，就会报错。
Object.assign(undefined) // 报错
Object.assign(null) // 报错


// 如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。
// 首先，这些参数都会转成对象，如果无法转成对象，就会跳过。这意味着，如果undefined和null不在首参数，就不会报错。
let obj = {a: 1};
Object.assign(obj, undefined) === obj // true
Object.assign(obj, null) === obj // true


// 其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。
const v1 = 'abc';
const v2 = true;
const v3 = 10;

const obj = Object.assign({}, v1, v2, v3);
console.log(obj); // { "0": "a", "1": "b", "2": "c" }
// 上面代码中，v1、v2、v3分别是字符串、布尔值和数值，结果只有字符串合入目标对象
// （以字符数组的形式），数值和布尔值都会被忽略。这是因为只有字符串的包装对象，会产生可枚举属性。
Object(true) // {[[PrimitiveValue]]: true}
Object(10)  //  {[[PrimitiveValue]]: 10}
Object('abc') // {0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"}




// 属性名为 Symbol 值的属性，也会被Object.assign()拷贝。
Object.assign({ a: 'b' }, { [Symbol('c')]: 'd' })
// { a: 'b', Symbol(c): 'd' }


// 注意点
// （1）浅拷贝
// Object.assign()方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。
const obj1 = {a: {b: 1}};
const obj2 = Object.assign({}, obj1);

obj1.a.b = 2;
obj2.a.b // 2

// （2）同名属性的替换
// 对于这种嵌套的对象，一旦遇到同名属性，Object.assign()的处理方法是替换，而不是添加。
const target = { a: { b: 'c', d: 'e' } }
const source = { a: { b: 'hello' } }
Object.assign(target, source)
// { a: { b: 'hello' } }


// （3）数组的处理   Object.assign()可以用来处理数组，但是会把数组视为对象。
Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]


// （4）取值函数的处理   Object.assign()只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。 @I
const source = {
  get foo() { return 1 }
};
const target = {};

Object.assign(target, source)
// { foo: 1 }
// Object.assign()不会复制这个取值函数，只会拿到值以后，将这个值复制过去。



// 常见用途
// Object.assign()方法有很多用处。

// （1）为对象添加属性
class Point {
  constructor(x, y) {
    Object.assign(this, {x, y}); // 将x属性和y属性添加到Point类的对象实例 @I
  }
}

// （2）为对象添加方法 @I
Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {
  },
  anotherMethod() {
  }
});

// （3）克隆对象
function clone(origin) {
  return Object.assign({}, origin);
}
// 不过，采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。如果想要保持继承链，可以采用下面的代码。
function clone(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}


// （4）合并多个对象
// 将多个对象合并到某个对象。
const merge = (target, ...sources) => Object.assign(target, ...sources);


// （5）为属性指定默认值
const DEFAULTS = {
  logLevel: 0,
  outputFormat: 'html'
};

function processContent(options) {
  options = Object.assign({}, DEFAULTS, options);
  console.log(options);
}
// 注意，由于存在浅拷贝的问题，DEFAULTS对象和options对象的所有属性的值，最好都是简单类型，
// 不要指向另一个对象。否则，DEFAULTS对象的该属性很可能不起作用
