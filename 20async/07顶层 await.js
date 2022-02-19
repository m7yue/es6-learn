// 根据语法规格，await命令只能出现在 async 函数内部，否则都会报错。

// 目前，有一个语法提案，允许在模块的顶层独立使用await命令，使得上面那行代码不会报错了。这个提案的目的，是借用await解决模块异步加载的问题。

// awaiting.js
let output;
async function main() {
  const dynamic = await import(someMission);
  const data = await fetch(url);
  output = someProcess(dynamic.default, data);
}
main();
export { output };


// 上面的代码也可以写成立即执行函数的形式。
let output;
(async function main() {
  const dynamic = await import(someMission);
  const data = await fetch(url);
  output = someProcess(dynamic.default, data);
})();
export { output };

// 顶层的await命令，它保证只有异步操作完成，模块才会输出值。
// awaiting.js
const dynamic = import(someMission);
const data = fetch(url);
export const output = someProcess((await dynamic).default, await data);

// 加载这个模块的写法如下。
// usage.js
import { output } from "./awaiting.js";
function outputPlusValue(value) { return output + value }
console.log(outputPlusValue(100));
setTimeout(() => console.log(outputPlusValue(100)), 1000)
// 模块的加载会等待依赖模块（上例是awaiting.js）的异步操作完成，才执行后面的代码，有点像暂停在那里。
// 所以，它总是会得到正确的output，不会因为加载时机的不同，而得到不一样的值。


// 如果加载多个包含顶层await命令的模块，加载命令是同步执行的。
// x.js
console.log("X1");
await new Promise(r => setTimeout(r, 1000));
console.log("X2");

// y.js
console.log("Y");

// z.js
import "./x.js";
import "./y.js";
console.log("Z");
// 打印结果是X1、Y、X2、Z。这说明，z.js并没有等待x.js加载完成，再去加载y.js。
// 顶层的await命令有点像，交出代码的执行权给其他的模块加载，等异步操作完成后，再拿回执行权，继续向下执行。