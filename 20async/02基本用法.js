// 下面是另一个例子，指定多少毫秒后输出一个值。
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 1000); // 1秒后输出 hello world

// 由于async函数返回的是 Promise 对象，可以作为await命令的参数。所以，上面的例子也可以写成下面的形式。
async function timeout(ms) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 1000);



// async 函数有多种使用形式。

// 函数声明
async function foo() {} 

// 函数表达式
const foo = async function () {}; 

// 对象的方法
let obj = { async foo() {} };
obj.foo().then()

// Class 的方法
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}
const storage = new Storage();
storage.getAvatar('jake').then();


// 箭头函数
const foo = async () => {};

