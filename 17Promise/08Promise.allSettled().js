// Promise.allSettled()方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。
// 只有等到所有这些参数实例都返回结果，不管是fulfilled还是rejected，包装实例才会结束。该方法由 ES2020 引入。

const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);

const allSettledPromise = Promise.allSettled([resolved, rejected]);

allSettledPromise.then(function (results) {
  console.log(results);
});
// [
//    { status: 'fulfilled', value: 42 },
//    { status: 'rejected', reason: -1 }
// ]



Promise.allSettled = (list) => {
  return new MyPromise((resolve, reject) => {
    // 所有给定的promise状态都已被确定
    let values = []
    let count = 0
    for (let [i, p] of list.entries()) {
      // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
      this.resolve(p).then(res => {
        values[i] = res
        count++
        if (count === list.length) resolve(values)
      }, err => {
        values[i] = err
        count++
        if (count === list.length) resolve(values)
      })
    }
  })
}