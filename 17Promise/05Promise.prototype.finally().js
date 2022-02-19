// finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。  
// 参数式一个回调函数，但这个回调函数没有接收任何参数。
// 这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

// finnally 不会更改状态， 也不会改变状态的值
new Promise((r,j)=>j(7)).finally(()=>6).then(undefined,v=>console.log(v)) // 7

Promsie.finally = (cb) => {
  return this.then(
    value  => MyPromise.resolve(cb()).then(() => value),  // 又执行了一次then 返回上一次的值
    reason => MyPromise.resolve(cb()).then(() => { throw reason })
  );
}

