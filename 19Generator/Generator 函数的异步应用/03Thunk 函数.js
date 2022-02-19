// Thunk 函数是自动执行 Generator 函数的一种方法。

// 编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数。


// 一个简单的 Thunk 函数转换器。
// ES5版本
var Thunk = function(fn){
  return function (){
    var args = Array.prototype.slice.call(arguments);
    return function (callback){
      args.push(callback);
      return fn.apply(this, args);
    }
  };
};

// ES6版本
const Thunk = function(fn) { // fn 是真正的执行函数  比如 fs.readFile
  return function (...args) { // 执行函数需要的参数列表
    return function (callback) { // 执行函数的回调函数
      return fn.call(this, ...args, callback);
    }
  };
};
var readFileThunk = Thunk(fs.readFile);
readFileThunk(fileA)(callback);
// 另一个完整的例子。
function f(a, cb) {
  cb(a);
}
const ft = Thunk(f);
ft(1)(console.log) // 1


function total(a, b, c, d, e){
  return a + b + c + d + e
}
function mythunk(fn){
  let len = fn.length
  let argsArr = []
  let context = this
  return function next(...args){
    const iLen = args.length
    argsArr.push(...args)
    if(len - iLen > 0) {
      len -= iLen
      return next.bind(context)
    } else {
      return fn.call(context, ...argsArr)
    }
  }
}
let t = mythunk(total)
t(1)(2)(3)(4)(5) // 15


// Thunkify 模块
// 生产环境的转换器，建议使用 Thunkify 模块。
  // 首先是安装。  $ npm install thunkify
  // 使用方式如下。
  var thunkify = require('thunkify');
  var fs = require('fs');

  var read = thunkify(fs.readFile);
  read('package.json')(function(err, str){
    // ...
  });
  // Thunkify 的源码与上一节那个简单的转换器非常像。
  function thunkify(fn) {
    return function() {
      var args = new Array(arguments.length);
      var ctx = this;
  
      for (var i = 0; i < args.length; ++i) {
        args[i] = arguments[i];
      }
  
      return function (done) {
        var called;
  
        args.push(function () {
          if (called) return;
          called = true;
          done.apply(null, arguments);
        });
  
        try {
          fn.apply(ctx, args);
        } catch (err) {
          done(err);
        }
      }
    }
  };
  // 变量called确保回调函数只运行一次。这样的设计与下文的 Generator 函数相关。
  function f(a, b, callback){
    var sum = a + b;
    callback(sum);
    callback(sum);
  }
  
  var ft = thunkify(f);
  var print = console.log.bind(console);
  ft(1, 2)(print);
  // 3
  // 上面代码中，由于thunkify只允许回调函数执行一次，所以只输出一行结果。


// Generator 函数的流程管理
// 你可能会问， Thunk 函数有什么用？回答是以前确实没什么用，但是 ES6 有了 Generator 函数，Thunk 函数现在可以用于 Generator 函数的自动流程管理。

// Generator 函数可以自动执行。
function* gen() {
  // ...
}

var g = gen();
var res = g.next();

while(!res.done){
  console.log(res.value);
  res = g.next();
}

// 但是，这不适合异步操作。如果必须保证前一步执行完，才能执行后一步，上面的自动执行就不可行。这时，Thunk 函数就能派上用处。

// Thunk 函数的自动流程管理 
var fs = require('fs');
var thunkify = require('thunkify');
var readFileThunk = thunkify(fs.readFile);

function run(fn) {
  var gen = fn();

  function next(err, data) {
    var result = gen.next(data);
    if (result.done) return;
    result.value(next);// next 这里是 readFile callback 文件读取后会执行   readFileThunk('fileA')(callback)
  }

  next();
}

var g = function* (){
  var f1 = yield readFileThunk('fileA');  // yield命令后面的必须是 Thunk 函数
  var f2 = yield readFileThunk('fileB');
  // ...
  var fn = yield readFileThunk('fileN');
};

run(g);
