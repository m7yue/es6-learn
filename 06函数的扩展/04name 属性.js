// 函数的name属性，返回该函数的函数名。
function foo() {}
foo.name // "foo"

// @I 需要注意的是，ES6 对这个属性的行为做出了一些修改。如果将一个 匿名函数 赋值给一个变量，
// ES5 的name属性，会返回空字符串，而 ES6 的name属性会返回实际的函数名。
var f = function () {};
// ES5
f.name // ""
// ES6
f.name // "f"


// 如果将一个具名函数赋值给一个变量，则 ES5 和 ES6 的name属性都返回这个具名函数原本的名字。
const bar = function baz() {};
// ES5
bar.name // "baz"
// ES6
bar.name // "baz"


// Function构造函数返回的函数实例，name属性的值为anonymous。
(new Function).name // "anonymous"


// bind返回的函数，name属性值会加上bound前缀。
function foo() {};
foo.bind({}).name // "bound foo"

(function(){}).bind({}).name // "bound "


// 判断 async 函数
async function A(){}
A.constructor.name