// co 模块是著名程序员 TJ Holowaychuk 于 2013 年 6 月发布的一个小工具，用于 Generator 函数的自动执行。
var gen = function* () {
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};


// co 模块可以让你不用编写 Generator 函数的执行器。
var co = require('co');
co(gen);
// Generator 函数只要传入co函数，就会自动执行。

// co函数返回一个Promise对象，因此可以用then方法添加回调函数。
co(gen).then(function (){
  console.log('Generator 函数执行完成');
});


// co 模块的原理 

// 前面说过，Generator 就是一个异步操作的容器。它的自动执行需要一种机制，当异步操作有了结果，能够自动交回执行权。
  // 两种方法可以做到这一点。
  // （1）回调函数。将异步操作包装成 Thunk 函数，在回调函数里面交回执行权。
  // （2）Promise 对象。将异步操作包装成 Promise 对象，用then方法交回执行权。
  // co 模块其实就是将两种自动执行器（Thunk 函数和 Promise 对象），包装成一个模块。使用 co 的前提条件是，Generator 
  // 函数的yield命令后面，只能是 Thunk 函数或 Promise 对象。如果数组或对象的成员，全部都是 Promise 对象，也可以使用 co


// 基于 Promise 对象的自动执行
var fs = require('fs');

var readFile = function (fileName){
  return new Promise(function (resolve, reject){
    fs.readFile(fileName, function(error, data){
      if (error) return reject(error);
      resolve(data);
    });
  });
};

var gen = function* (){
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
// 自动执行器。
function run(gen){
  var g = gen();

  function next(data){
    var result = g.next(data);
    if (result.done) return result.value;
    result.value.then(function(data){
      next(data);
    });
  }

  next();
}

run(gen);


// co 模块的源码
// co 就是上面那个自动执行器的扩展，它的源码只有几十行，非常简单。
function co(gen) {
  var ctx = this;
  var args = slice.call(arguments, 1);

  return new Promise(function(resolve, reject) {
    if (typeof gen === 'function') gen = gen.apply(ctx, args);
    if (!gen || typeof gen.next !== 'function') return resolve(gen);
    onFulfilled();
    
    // 包装成onFulfilled函数。这主要是为了能够捕捉抛出的错误。
    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
      return null;
    }

    function onRejected(err) {
      var ret;
      try {
        ret = gen.throw(err);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    function next(ret) {
      if (ret.done) return resolve(ret.value); // 检查当前是否为 Generator 函数的最后一步，如果是就返回。
      var value = toPromise.call(ctx, ret.value); // 确保每一步的返回值，是 Promise 对象。
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected); // 使用then方法，为返回值加上回调函数，然后通过onFulfilled函数再次调用next函数。
      
      // 在参数不符合要求的情况下（参数非 Thunk 函数和 Promise 对象），将 Promise 对象的状态改为rejected，从而终止执行。
      return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
        + 'but the following object was passed: "' + String(ret.value) + '"')); 
    }
  });
}



// 处理并发的异步操作
// co 支持并发的异步操作，即允许某些操作同时进行，等到它们全部完成，才进行下一步。
// 这时，要把并发的操作都放在数组或对象里面，跟在yield语句后面。
// 数组的写法
co(function* () {
  var res = yield [
    Promise.resolve(1),
    Promise.resolve(2)
  ];
  console.log(res);
}).catch(onerror);

// 对象的写法
co(function* () {
  var res = yield {
    1: Promise.resolve(1),
    2: Promise.resolve(2),
  };
  console.log(res);
}).catch(onerror);


co(function* () {
  var values = [n1, n2, n3];
  yield values.map(somethingAsync);
});

function* somethingAsync(x) {
  // do something async
  return y
}
// 上面的代码允许并发三个somethingAsync异步操作，等到它们全部完成，才会进行下一步。



// 实例：处理 Stream
// Node 提供 Stream 模式读写数据，特点是一次只处理数据的一部分，数据分成一块块依次处理，
// 就好像“数据流”一样。这对于处理大规模数据非常有利。Stream 模式使用 EventEmitter API，会释放三个事件。
    // data事件：下一块数据块已经准备好了。
    // end事件：整个“数据流”处理完了。
    // error事件：发生错误。
// 使用Promise.race()函数，可以判断这三个事件之中哪一个最先发生，只有当data事件最先发生时，
// 才进入下一个数据块的处理。从而，我们可以通过一个while循环，完成所有数据的读取。
const co = require('co');
const fs = require('fs');

const stream = fs.createReadStream('./les_miserables.txt');
let valjeanCount = 0;

co(function*() {
  while(true) {
    const res = yield Promise.race([
      new Promise(resolve => stream.once('data', resolve)),
      new Promise(resolve => stream.once('end', resolve)),
      new Promise((resolve, reject) => stream.once('error', reject))
    ]);
    if (!res) {
      break;
    }
    stream.removeAllListeners('data');
    stream.removeAllListeners('end');
    stream.removeAllListeners('error');
    valjeanCount += (res.toString().match(/valjean/ig) || []).length;
  }
  console.log('count:', valjeanCount); // count: 1120
});
