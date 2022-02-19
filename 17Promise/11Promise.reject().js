// Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。

Promise.reject = (value) => {
  return new MyPromise((resolve ,reject) => reject(value))
}

// Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。这一点与Promise.resolve方法不一致。