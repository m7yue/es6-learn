// 如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。 @I
export { foo, bar } from 'my_module';
// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
// 但需要注意的是，写成一行以后，foo和bar实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用foo和bar。

// 模块的接口改名和整体输出，也可以采用这种写法。
  // 接口改名
  export { foo as myFoo } from 'my_module';
  // 整体输出
  export * from 'my_module';


// 默认接口的写法如下。
export { default } from 'foo';

// 具名接口改为默认接口的写法如下。
export { es6 as default } from './someModule';
// 等同于
import { es6 } from './someModule';
export default es6;

// 同样地，默认接口也可以改名为具名接口。
export { default as es6 } from './someModule';


// ES2020 之前，有一种import语句，没有对应的复合写法。
import * as someIdentifier from "someModule";
// ES2020补上了这个写法。
export * as ns from "mod";
// 等同于
import * as ns from "mod";
export {ns};


