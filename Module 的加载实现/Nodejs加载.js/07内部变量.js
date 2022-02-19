// ES6 模块应该是通用的，同一个模块不用修改，就可以用在浏览器环境和服务器环境。为了达到这个目标，Node 规定 ES6 模块之中不能使用 CommonJS 模块的特有的一些内部变量。

// 首先，就是this关键字。ES6 模块之中，顶层的this指向undefined；CommonJS 模块的顶层this指向当前模块，这是两者的一个重大差异。


// 其次，以下这些顶层变量在 ES6 模块之中都是不存在的。
    // arguments
    // require
    // module
    // exports
    // __filename
    // __dirname