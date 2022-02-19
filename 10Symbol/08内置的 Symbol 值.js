// Symbol.toStringTag, Symbol.iterator, Symbol.toPrimitive, Symbol.hasInstance


// 声明对象的属性和类成员。
const getClassNameSymbol = Symbol();
class C {
    [getClassNameSymbol](){
       return "C";
    }
}
let c = new C();
let className = c[getClassNameSymbol](); // "C"

// Symbol.hasInstance
class Even {
  static [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0;
  }
}
x = new Even()
console.log(1 instanceof Even);//false
console.log(2 instanceof Even);//true

// Symbol.isConcatSpreadable  布尔值 示当在一个对象上调用Array.prototype.concat时，可设置这个对象的数组元素是否可展开。
let arr1 = [1,2,3]
let arr2 = [4,5,6]
arr1.concat(arr2) // [1, 2, 3, 4, 5, 6]
arr1[Symbol.isConcatSpreadable] = false
arr1.concat(arr2) // [Array(3), 4, 5, 6]


// Symbol.species  对象的Symbol.species属性，指向一个构造函数。创建衍生对象时，会使用该属性。
class MyArray extends Array {
}
const a = new MyArray(1, 2, 3);
const b = a.map(x => x);
const c = a.filter(x => x > 1);

b instanceof MyArray // true
c instanceof MyArray // true
// =========================================================================================
class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
}
const a = new MyArray();
const b = a.map(x => x);

b instanceof MyArray // false
b instanceof Array // true


// Symbol.match 正则方法会检查他们的第一个参数是否是一个正则表达式，如果是，会抛出一个TypeError
// 如果 match 设为 false, 则检查会认为参数不是正则表达式
// Symbol.replace, Symbol.search, Symbol.split
var re = /foo/;
re[Symbol.match] = false;
'/foo/'.startsWith(re); // true
'/baz/'.endsWith(re);   // false


// Symbol.iterator  可重写对象的默认迭代器
var myIterable = {}
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};
[...myIterable] // [1, 2, 3]

// 隐式转换调用 Symbol.toPrimitive
let obj = {
  [Symbol.toPrimitive] (type) {
      console.log(type)
  }
}
const res = obj++ // number
const res = `abc${obj}` // string


// Symbol.toStringTag 供String.prototype.toString()函数使用的一个方法，用于创建对象的描述信息。
Object.defineProperty(Array.prototype, Symbol.toStringTag, {
  get: function () {
      return 'myArray';
  },
  enumerable: true,
  configurable: true
});
Object.prototype.toString.call([]) // "[object myArray]"
class Person {
  get [Symbol.toStringTag](){
    return 'Person'
  }
}
Object.prototype.toString.call(new Person()) // "[object Person]"

// Symbol.unscopables  一个对象，该对象的属性指示了哪些属性名不允许被包含在 with 语句中。
var obj = { 
  foo: 1, 
  bar: 2 
}
obj[Symbol.unscopables] = { 
  foo: false, 
  bar: true 
}
with (obj) {
  console.log(foo); // 1
  console.log(bar); // ReferenceError: bar is not defined
}


// Symbol.keyFor   方法用来获取 symbol 注册表中与某个 symbol 关联的键。
var globalSym = Symbol.for('foo'); // create a new global symbol
Symbol.keyFor(globalSym); // "foo"
var localSym = Symbol();
Symbol.keyFor(localSym); // undefined



