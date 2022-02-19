// async函数的语法规则总体上比较简单，难点是错误处理机制。

// 返回 Promise 对象
    // async函数内部return语句返回的值，会成为then方法回调函数的参数。
    // async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。抛出的错误对象会被catch方法回调函数接收到。

// Promise 对象的状态变化
    // async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，
    // 除非遇到return语句或者抛出错误。也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。

// await 命令  
  // 正常情况下，await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。
  // (原理 Promise.resolve(next.value).then(function(v) {step(function() { return gen.next(v) })}) 主要还是 gen.next(v)


  // 另一种情况是，await命令后面是一个thenable对象（即定义了then方法的对象），那么await会将其等同于 Promise 对象。
  class Sleep {
    constructor(timeout) {
      this.timeout = timeout;
    }
    then(resolve, reject) {
      const startTime = Date.now();
      setTimeout(
        () => resolve(Date.now() - startTime),
        this.timeout
      );
    }
  }
  
  (async () => {
    const sleepTime = await new Sleep(1000);
    console.log(sleepTime);
  })();
  // 1000

  // 一个简化的sleep实现。
  function sleep(interval) {
    return new Promise(resolve => {
      setTimeout(resolve, interval);
    })
  }
  // 用法
  async function one2FiveInAsync() {
    for(let i = 1; i <= 5; i++) {
      console.log(i);
      await sleep(1000);
    }
  }
  one2FiveInAsync();

// await命令后面的 Promise 对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到。
// 原理 try { var next = nextF() } catch(e) { return reject(e) }  gen.throw(e) 触发
  async function f() {
    await Promise.reject('reject了');
  }

  f()
  .then(v => console.log(v))
  .catch(e => console.log(e))
  // reject了


// 任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。

// 有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。这时可以将第一个
// await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行。
  async function f() {
    try {
      await Promise.reject('出错了');
    } catch(e) {
    }
    return await Promise.resolve('hello world');
  }

  f()
  .then(v => console.log(v))
  // hello world

// 另一种方法是await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误。
  async function f() {
    await Promise.reject('出错了')
      .catch(e => console.log(e));
    return await Promise.resolve('hello world');
  }

  f()
  .then(v => console.log(v))
  // 出错了
  // hello world


  // 错误处理
  async function f() {
    await new Promise(function (resolve, reject) {
      throw new Error('出错了');
    });
  }
  
  f()
  .catch(e => console.log(e))
  // Error：出错了


// 如果有多个await命令，可以统一放在try...catch结构中。
async function main() {
  try {
    const val1 = await firstStep();
    const val2 = await secondStep(val1);
    const val3 = await thirdStep(val1, val2);
    console.log('Final: ', val3);
  }
  catch (err) {
    console.error(err);
  }
}

// 下面的例子使用try...catch结构，实现多次重复尝试。  @III
const superagent = require('superagent');
const NUM_RETRIES = 3;
async function test() {
  let i;
  for (i = 0; i < NUM_RETRIES; ++i) {
    try {
      await superagent.get('http://google.com/this-throws-an-error');
      break;
    } catch(err) {}
  }
  console.log(i); // 3
}
test();



// 使用注意点

// 1.最好把await命令放在try...catch代码块中
// 2.多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
  let foo = await getFoo();
  let bar = await getBar();
  // getFoo和getBar是两个独立的异步操作（即互不依赖），被写成继发关系。这样比较耗时，因为只有getFoo完成以后，才会执行getBar，完全可以让它们同时触发。
    // 写法一
    let [foo, bar] = await Promise.all([getFoo(), getBar()]);
    // 写法二
    let fooPromise = getFoo();
    let barPromise = getBar();
    let foo = await fooPromise;
    let bar = await barPromise;

// 3.await命令只能用在async函数之中，如果用在普通函数，就会报错。
  function dbFuc(db) { //这里不需要 async
    let docs = [{}, {}, {}];

    // 可能得到错误结果
    docs.forEach(async function (doc) {
      await db.post(doc);
    });
  }
  // 上面代码可能不会正常工作，原因是这时三个db.post操作将是并发执行，也就是同时执行，而不是继发执行。正确的写法是采用for循环。  @I
  async function dbFuc(db) {
    let docs = [{}, {}, {}];
  
    for (let doc of docs) {
      await db.post(doc);
    }
  }
  // 如果确实希望多个请求并发执行，可以使用Promise.all方法。当三个请求都会resolved时，下面两种写法效果相同。
  async function dbFuc(db) {
    let docs = [{}, {}, {}];
    let promises = docs.map((doc) => db.post(doc));
    let results = await Promise.all(promises);
    console.log(results);
  }
  // async 函数可以保留运行堆栈。
  const a = async () => {
    await b();
    c();
  };
  // 上面代码中，b()运行的时候，a()是暂停执行，上下文环境都保存着。一旦b()或c()报错，错误堆栈将包括a()。
