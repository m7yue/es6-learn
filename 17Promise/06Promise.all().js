const p = Promise.all([p1, p2, p3]);

// p的状态由p1、p2、p3决定，分成两种情况。
//   （1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
//   （2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。


Promise.all =  (list) => {
  return new MyPromise((resolve, reject) => {
    /**
     * 返回值的集合
     */
    let values = []
    let count = 0
    for (let [i, p] of list.entries()) {
      // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
      this.resolve(p).then(res => {
        values[i] = res
        count++
        // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
        if (count === list.length) resolve(values)
      }, err => {
        // 有一个被rejected时返回的MyPromise状态就变成rejected
        reject(err)
      })
    }
  })
}