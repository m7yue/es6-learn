Promise.resolve = (value) => {
  // 如果参数是MyPromise实例，直接返回这个实例
  if (value instanceof Promise) return value
  return new Promise(resolve => resolve(value))
}


// （1）参数是一个 Promise 实例
// 如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。

// （2）参数是一个thenable对象
// thenable对象指的是具有then方法的对象，比如下面这个对象。

// （3）参数不是具有then方法的对象，或根本就不是对象
// 如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。

// （4）不带有任何参数
// Promise.resolve()方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。



// 如果希望得到一个 Promise 对象，比较方便的方法就是直接调用Promise.resolve()方法。
const p = Promise.resolve();
p.then(function () {
  // ...
});