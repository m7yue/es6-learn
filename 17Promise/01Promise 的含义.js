// 所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
// 从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。
// Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。



// Promise对象有以下两个特点。
    // （1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。
    // 只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
    // 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。
    // 只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。



// Promise 的缺点。
//   1.无法取消Promise，一旦新建它就会立即执行，无法中途取消。
//   2.如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
//   3.当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

// 判断变量否为function
const isFunction = variable => typeof variable === 'function'

// 定义Promise的三种状态常量
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

// Promise的值是指状态改变时传递给回调函数的值

class MyPromise {
  constructor (handle) {
    if (!isFunction(handle)) {
      throw new Error('MyPromise must accept a function as a parameter')
    }
    
    this._status = PENDING // 状态
    this._value = undefined // 值
    this._fulfilledQueues = [] // 添加成功回调函数队列
    this._rejectedQueues = [] // 添加失败回调函数队列
   
    try {
      handle(this._resolve.bind(this), this._reject.bind(this))  // 执行handle
    } catch (err) {
      this._reject(err)
    }
  }

   // resovle 执行函数
   _resolve (val) {
    const run = () => {
      if (this._status !== PENDING) return
      // 依次执行成功队列中的函数，并清空队列
      const runFulfilled = (value) => {
        let cb;
        while (cb = this._fulfilledQueues.shift()) {
          cb(value)
        }
      }
      // 依次执行失败队列中的函数，并清空队列
      const runRejected = (error) => {
        let cb;
        while (cb = this._rejectedQueues.shift()) {
          cb(error)
        }
      }
      /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
        当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
      */
      if (val instanceof MyPromise) {
        val.then(value => {
          this._value = value
          this._status = FULFILLED
          runFulfilled(value)
        }, err => {
          this._value = err
          this._status = REJECTED
          runRejected(err)
        })
      } else {
        this._value = val
        this._status = FULFILLED
        runFulfilled(val)
      }
    }
    // 模拟微任务
    setTimeout(run, 0)
  }

  // reject 执行函数
  _reject (val) { 
    const run = () => {
      if (this._status !== PENDING) return
      // 依次执行成功队列中的函数，并清空队列
      const runFulfilled = (value) => {
        let cb;
        while (cb = this._fulfilledQueues.shift()) {
          cb(value)
        }
      }
      // 依次执行失败队列中的函数，并清空队列
      const runRejected = (error) => {
        let cb;
        while (cb = this._rejectedQueues.shift()) {
          cb(error)
        }
      }
      /* 如果reject的参数为Promise对象，则必须等待该Promise对象状态改变后,
        当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
      */
      if (val instanceof MyPromise) {
        val.then(value => {
          this._value = value
          this._status = FULFILLED
          runFulfilled(value)
        }, err => {
          this._value = err
          this._status = REJECTED
          runRejected(err)
        })
      } else {
        this._value = val
        this._status = REJECTED
        runRejected(val)
      }
    }
    // 模拟微任务
    setTimeout(run, 0)
  }

  // then方法
  then (onFulfilled, onRejected) {
    const { _value, _status } = this
    // 返回一个新的Promise对象
    return new MyPromise((onFulfilledInThen, onRejectedInThen) => {
      // 封装一个成功时执行的函数
      let fulfilled = value => {
        try {
          // 如果onFulfilled 不是函数，直接更改状态为 Fulfilled，并返回 当前 Promise 的值
          if (!isFunction(onFulfilled)) {
            onFulfilledInThen(value)
          } else {
            let res =  onFulfilled(value);
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个 then 的回调： Promise 本身就是 订阅发布模式 ，当状态没有变更是，会注册/订阅一些未来可能执行的 then 回调，当状态变更就会 发布/执行
              res.then(onFulfilledInThen, onRejectedInThen)
            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledInThen(res)
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedInThen(err)
        }
      }
      // 封装一个失败时执行的函数
      let rejected = error => {
        try {
           // onRejected  不是函数，直接更改状态为 Rejected，并返回 当前 Promise 的值
          if (!isFunction(onRejected)) {
            onRejectedInThen(error)
          } else {
              let res = onRejected(error);
              if (res instanceof MyPromise) {
                // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                res.then(onFulfilledInThen, onRejectedInThen)
              } else {
                //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数  状态自动变为 fulfilled
                onFulfilledInThen(res)
              }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedInThen(err)
        }
      }
      switch (_status) {
        // 当状态为pending时，将then方法回调函数加入执行队列等待执行
        case PENDING:
          this._fulfilledQueues.push(fulfilled)
          this._rejectedQueues.push(rejected)
          break
        // 当状态已经改变时，立即执行对应的回调函数
        case FULFILLED:
          fulfilled(_value)
          break
        case REJECTED:
          rejected(_value)
          break
      }
    })
  }

  // catch方法
  catch (onRejected) {
    return this.then(undefined, onRejected)
  }

  // 静态resolve方法
  static resolve (value) {
    // 如果参数是MyPromise实例，直接返回这个实例
    if (value instanceof MyPromise) return value
    return new MyPromise(resolve => resolve(value))
  }

  // 静态reject方法
  static reject (value) {
    return new MyPromise((resolve ,reject) => reject(value))
  }

  // 静态all方法
  static all (list) {
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
  // 静态any方法
  static any (list) {
    return new MyPromise((resolve, reject) => {
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

  // 静态allSettled方法
  static allSettled (list) {
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

  // 静态race方法
  static race (list) {
    return new MyPromise((resolve, reject) => {
      for (let p of list) {
        // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
        this.resolve(p).then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
      }
    })
  }

  // finally 方法 , 不管 Promise 对象最后状态如何，都会执行的操作, 返回的依然是个Promise; 
  // 参数 cb 没有接收之前 Promise 的值， 只是执行 cb 并继承之前的状态
  finally (cb) {
    return this.then(
      value  => MyPromise.resolve(cb()).then(() => value),
      reason => MyPromise.resolve(cb()).then(() => { throw reason })
    );
  }
}