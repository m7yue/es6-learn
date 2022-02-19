// circleplus.js
export * from 'circle';
export var e = 2.71828182846;
export default function(x) {
  return Math.exp(x);
}
// 上面代码中的export *，表示再输出circle模块的所有属性和方法。
// export *命令会忽略circle模块的default方法。上面代码又输出了自定义的e变量和默认方法。


// circleplus.js
export { area as circleArea } from 'circle';
// 只输出circle模块的area方法，且将其改名为circleArea。


// 加载上面模块的写法如下。
// main.js
import * as math from 'circleplus';
import exp from 'circleplus';
console.log(exp(math.e));