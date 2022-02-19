// Promise.any()方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只要参数实例有一个变成fulfilled状态，
// 包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。该方法目前是一个第三阶段的提案 。

// 还只是提案  浏览器未部署


Promise.any=function(list){
  return new Promise((resolve, reject) => {
    let count = 0
    for (let [i, p] of list.entries()) {
      // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
      // 有一个变为 成功 状态变为 fulfilled
      this.resolve(p).then(res => {
        resolve(res)
      }, err => {
        // 所有的 promises 都被拒绝 状态变为 rejected
        count++
        if (count === list.length) reject(err)
      })
    }
  })
}

const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);

const allSettledPromise = Promise.any([resolved, rejected]);