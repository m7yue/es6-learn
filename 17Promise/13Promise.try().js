// 实际开发中，经常遇到一种情况：不知道或者不想区分，函数f是同步函数还是异步操作，但是想用 Promise 来处理它。 @I

Promise.resolve().then(f)
// 缺点：就是如果f是同步函数，那么它会在本轮事件循环的末尾执行。


// 让同步函数同步执行，异步函数异步执行

// 用async函数来写
(async () => f())()
.then()
.catch()

// 用new Promise()
const f = () => console.log('now');
(
  () => new Promise(resolve => resolve(f()))
)();
console.log('next');
// now
// next


// Promise.try方法替代上面的写法。
const f = () => console.log('now');
Promise.try(f);
console.log('next');  