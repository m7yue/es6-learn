// export default命令，为模块指定默认输出。

// export-default.js
export default function () {
  console.log('foo');
}

// 其他模块加载默认输出模块时，import命令可以为该模块指定任意名字。

// import-default.js
import customName from './export-default';
customName(); // 'foo'


// export default命令用在非匿名函数前，也是可以的。
  // export-default.js
  export default function foo() {
    console.log('foo');
  }
  // 或者写成
  function foo() {
    console.log('foo');
  }
  export default foo;
// foo函数的函数名foo，在模块外部是无效的。加载的时候，视同匿名函数加载。



// 第一组
export default function crc32() { // 输出
  // ...
}
import mycrc32 from 'crc32'; // 输入

// 第二组
export function crc32() { // 输出
  // ...
};
import {crc32} from 'crc32'; // 输入
// 第一组是使用export default时，对应的import语句不需要使用大括号；第二组是不使用export default时，对应的import语句需要使用大括号。
// 一个模块只能有一个默认输出，因此export default命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能唯一对应export default命令。


// export default 它后面不能跟变量声明语句。@I
// 正确
export var a = 1;
// 正确
var a = 1;
export default a;
// 错误
// export default var a = 1;
// export default a的含义是将变量a的值赋给变量default。



// 因为export default命令的本质是将后面的值，赋给default变量，所以可以直接将一个值写在export default之后。
// 正确
export default 42;
// 报错
// export 42;



// 有了export default命令，输入模块时就非常直观了，以输入 lodash 模块为例。
import _ from 'lodash';
// 如果想在一条import语句中，同时输入默认方法和其他接口，可以写成下面这样。@I
import _, { each, forEach } from 'lodash';


export default function (obj) {
  // ···
}
export function each(obj, iterator, context) {
  // ···
}
export { each as forEach };
// 上面代码的最后一行的意思是，暴露出forEach接口，默认指向each接口，即forEach和each指向同一个方法。


// export default也可以用来输出类。
// MyClass.js
export default class {  }

// main.js
import MyClass from 'MyClass';
let o = new MyClass();



