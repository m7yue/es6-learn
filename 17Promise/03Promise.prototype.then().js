// then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）

// then 方法如果显式的返回 Promise, 那要等这个 Promise 变更后才能执行 后面的 then, 即返回的新 Promsie 状态依赖当前显式返回的 Promise 的状态