// Realm API 提供沙箱功能（sandbox），允许隔离代码，防止那些被隔离的代码拿到全局对象。
const globalOne = window;
const globalTwo = new Realm().global;

globalOne.evaluate('1 + 2') // 3
globalTwo.evaluate('1 + 2') // 3

// Realm 顶层对象与原始顶层对象是两个对象。
let a1 = globalOne.evaluate('[1,2,3]');
let a2 = globalTwo.evaluate('[1,2,3]');
a1.prototype === a2.prototype; // false
a1 instanceof globalTwo.Array; // false
a2 instanceof globalOne.Array; // false


// Realm 沙箱里面只能运行 ECMAScript 语法提供的 API，不能运行宿主环境提供的 API。
globalTwo.evaluate('console.log(1)')
// throw an error: console is undefined

// 如果要解决这个问题，可以使用下面的代码。
globalTwo.console = globalOne.console;