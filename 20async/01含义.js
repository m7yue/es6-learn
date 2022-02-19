// ES2017 标准引入了 async 函数，使得异步操作变得更加方便。
// async 函数是什么？一句话，它就是 Generator 函数的语法糖。

// async函数对 Generator 函数的改进，体现在以下四点。
// （1）内置执行器。
    // Generator 函数的执行必须靠执行器，所以才有了co模块，而async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样，只要一行。
    // 上面的代码调用了asyncReadFile函数，然后它就会自动执行，输出最后结果。这完全不像 Generator 函数，需要调用next方法，或者用co模块，才能真正执行，得到最后结果。

// （2）更好的语义。
    // async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。

// （3）更广的适用性
    // co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，
    // 可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。

  async function async1(){
      console.log('async1 start') // 2
      await async2()
      console.log('async 1 end') // 10
  }
  
  async function async2(){
       await new Promise(function(resolve){
          console.log('async2 start') // 3
          resolve()
          console.log('after resolve') // 4
      }).then(function(){
          console.log('async2 end') // 7
      })
      console.log(99999) // 9
  }
  
  console.log('script start') // 1
  
  setTimeout(function(){
      console.log('setTimeout') //11
  },0)
  
  async1()
  
  new Promise(function(resolve){
      console.log('promise1') // 5
      resolve()
  }).then(function(){
      console.log('promise2') // 8
  })
  
  console.log('script end') // 6



  async function fn(args){
    // ...
  }
  
  // 等同于
  function fn(args){ 
    return spawn(function*() {
      // ...
      yield XXX
    }); 
  }
  
  function spawn(genF) {
    // 这里可以看出 async 返回的就是一个 Promise
    return new Promise(function(resolve, reject) {
      var gen = genF();
      step(function() { return gen.next(undefined); });
      
      function step(nextF) {
        try {
          var next = nextF(); // 执行 await 之前的代码块，拿到 await（yeild）返回值 {value,done}
        } catch(e) {
          return reject(e); // 执行错误 返回 Promise reject
        }
        if(next.done) {
          return resolve(next.value); // 返回Promise结果
        } 
        // 把返回结果用 Promise 包装一下, 执行下一个 await 之前的代码块
        Promise.resolve(next.value).then(function(v) { // 这个 v 可以最终可以赋值给变量
          step(function() { return gen.next(v); });     
        }, function(e) {
          step(function() { return gen.throw(e); });
        });
      }
    });
  }

  const spawn = (genF) => {
    return new Promise((re, rj) => {
      const grn = genF()
      step(() => gen.next(undefined))

      const step = (nextF) => {
        try{
          var next = nextF
        }catch(e) {
          return rj(e)
        }

        if(next.done){
          return re(next.value)
        }

        Promise.resolve(next.value).then((v) => {
          step(() => gen.next(v))
        }, (e) => {
          step(() => gen.throw(e))
        })
      }
    })
  }