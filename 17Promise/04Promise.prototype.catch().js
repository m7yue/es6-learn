// Promise.prototype.catch()方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。

const promise = new Promise(function(resolve, reject) {
  throw new Error('test');
});
promise.catch(function(error) {
  console.log(error);
});
// Error: test   代码实现用 try catch 包裹 @I



// 如果 Promise 状态已经变成resolved，再抛出错误是无效的。
const promise = new Promise(function(resolve, reject) {
  resolve('ok');
  throw new Error('test');
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
// ok


new Promise((r,j)=>{throw new Error(123)}).then(undefined, ()=>2).catch(console.log).then(console.log) // catch 不会接收
new Promise((r,j)=>{throw new Error(123)}).then(()=>2).catch(console.log) // catch 会接收



