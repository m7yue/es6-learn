// Object.keys()

// ES5 引入了Object.keys方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。
var obj = { foo: 'bar', baz: 42 };
Object.keys(obj)
// ["foo", "baz"]


// ES2017 引入了跟Object.keys配套的Object.values和Object.entries，作为遍历一个对象的补充手段，供for...of循环使用。
let {keys, values, entries} = Object;
let obj = { a: 1, b: 2, c: 3 };

for (let key of keys(obj)) {
  console.log(key); // 'a', 'b', 'c'
}

for (let value of values(obj)) {
  console.log(value); // 1, 2, 3
}

for (let [key, value] of entries(obj)) {
  console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
}



// Object.values()
// Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。
const obj = { foo: 'bar', baz: 42 };
Object.values(obj)
// ["bar", 42]

const obj = Object.create({}, {p: {value: 42}});
Object.values(obj) // []
// Object.create方法的第二个参数添加的对象属性（属性p），如果不显式声明，默认是不可遍历的，
// 因为p的属性描述对象的enumerable默认是false @I，Object.values不会返回这个属性。只要把enumerable改成true，Object.values就会返回属性p的值。
const obj = Object.create({}, {p:
  {
    value: 42,
    enumerable: true
  }
});
Object.values(obj) // [42]

// Object.values会过滤属性名为 Symbol 值的属性。
Object.values({ [Symbol()]: 123, foo: 'abc' });
// ['abc']

// 如果Object.values方法的参数是一个字符串，会返回各个字符组成的一个数组。
Object.values('foo')
// ['f', 'o', 'o']

// 如果参数不是对象，Object.values会先将其转为对象。由于数值和布尔值的包装对象，都不会为实例添加非继承的属性。所以，Object.values会返回空数组。
Object.values(42) // []
Object.values(true) // []



// Object.entries()  Object.entries()方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。
const obj = { foo: 'bar', baz: 42 };
Object.entries(obj)
// [ ["foo", "bar"], ["baz", 42] ]

// 如果原对象的属性名是一个 Symbol 值，该属性会被忽略。
Object.entries({ [Symbol()]: 123, foo: 'abc' });
// [ [ 'foo', 'abc' ] ]

// Object.entries方法的另一个用处是，将对象转为真正的Map结构。 @I
const obj = { foo: 'bar', baz: 42 };
const map = new Map(Object.entries(obj));
map // Map { foo: "bar", baz: 42 }


// 自己实现Object.entries方法，非常简单。
// Generator函数的版本
function* entries(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

// 非Generator函数的版本
function entries(obj) {
  let arr = [];
  for (let key of Object.keys(obj)) {
    arr.push([key, obj[key]]);
  }
  return arr;
}

