// ES2019 对函数实例的toString()方法做出了修改。

// toString()方法返回函数代码本身，以前会省略注释和空格。
function /* foo comment */ foo () {}
foo.toString()  // function foo() {}

// 修改后的toString()方法，明确要求返回一模一样的原始代码。
function /* foo comment */ foo () {}
foo.toString() // "function /* foo comment */ foo () {}"


// 2019 JavaScript 语言的try...catch结构，以前明确要求catch命令后面必须跟参数，接受try代码块抛出的错误对象。
try {
  // ...
} catch (err) {
  // 处理错误
}

// 很多时候，catch代码块可能用不到这个参数。但是，为了保证语法正确，还是必须写。ES2019 做出了改变，允许catch语句省略参数。
try {
  // ...
} catch {
  // ...
}