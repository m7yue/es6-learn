// 2019 JavaScript 语言的try...catch结构，以前明确要求catch命令后面必须跟参数，接受try代码块抛出的错误对象。
try {
  // ...
} catch (err) {
  // 处理错误
}

// 很多时候，catch代码块可能用不到这个参数。但是，为了保证语法正确，还是必须写。ES2019 做出了改变，允许catch语句省略参数。 @I
try {
  // ...
} catch {
  // ...
}