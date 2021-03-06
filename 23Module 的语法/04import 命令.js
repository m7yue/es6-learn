// 重命名
// import命令要使用as关键
import { lastName as surname } from './profile.js.js';

// import命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。 @I
import {a} from './xxx.js.js'
a = {}; // Syntax Error : 'a' is read-only;


// 如果a是一个对象，改写a的属性是允许的。
import {a} from './xxx.js'
a.foo = 'hello'; // 合法操作
// 不过，这种写法很难查错，建议凡是输入的变量，都当作完全只读，不要轻易改变它的属性。


// import后面的from指定模块文件的位置，可以是相对路径，也可以是绝对路径，.js后缀可以省略。
// 如果只是模块名，不带有路径，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。
import {myMethod} from 'util';


// import命令具有提升效果，会提升到整个模块的头部，首先执行。
foo();
import { foo } from 'my_module';
// 上面的代码不会报错，因为import的执行早于foo的调用。这种行为的本质是，import命令是编译阶段执行的，在代码运行之前。


// 由于import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。
    // 报错
        // import { 'f' + 'oo' } from 'my_module';
    // 报错
      // let module = 'my_module';
      // import { foo } from module;

    // 报错
      // if (x === 1) {
      //   import { foo } from 'module1';
      // } else {
      //   import { foo } from 'module2';
      // }
// 上面三种写法都会报错，因为它们用到了表达式、变量和if结构。在静态分析阶段，这些语法都是没法得到值的。  



// import语句会执行所加载的模块
import 'lodash';
// 如果多次重复执行同一句import语句，那么只会执行一次，而不会执行多次。 @I
import 'lodash';
import 'lodash';

import { foo } from 'my_module';
import { bar } from 'my_module';
// 等同于
import { foo, bar } from 'my_module';
// 虽然foo和bar在两个语句中加载，但是它们对应的是同一个my_module实例。也就是说，import语句是 Singleton 模式。


// 目前阶段，通过 Babel 转码，CommonJS 模块的require命令和 ES6 模块的import命令，可以写在同一个模块里面，
// 但是最好不要这样做。因为import在静态解析阶段执行，所以它是一个模块之中最早执行的。下面的代码可能不会得到预期结果。
require('core-js/modules/es6.symbol');
require('core-js/modules/es6.promise');
import React from 'React';
