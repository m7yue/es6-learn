// 属性名表达式
// ES6 允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。
let lastWord = 'last word';
const a = {
  'first word': 'hello',
  [lastWord]: 'world'
};
a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"

// 表达式还可以用于定义方法名。
let obj = {
  ['h' + 'ello']() {
    return 'hi';
  }
};
obj.hello() // hi


// 逗号表达式
let a=(_a={},_a.b=1,_a.c=2,_a)
a // {b:1, c:2}