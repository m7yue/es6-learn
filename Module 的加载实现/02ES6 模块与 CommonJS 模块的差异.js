// ES6 模块与 CommonJS 模块完全不同。
    // 1.CommonJS 模块"输出"的是一个值的拷贝，ES6 模块"输出"的是值的引用。
    // 2.CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
        // 第二个差异是因为 CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。
        // 而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。



// CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
    // lib.js
    var counter = 3;
    function incCounter() {
      counter++;
      counterObj.counter++
    }
    let counterObj = {
      counter
    }
    module.exports = {
      counter: counter, // 这里输出的是一个值
      incCounter: incCounter,
      get counter1() {
        return counter
      },
      counterObj
    };
    // main.js
    var mod = require('./lib');
    console.log(mod.counter);  // 3
    console.log(mod.counter1);  // 3
    console.log(mod.counterObj); // { counter: 3 }
    mod.incCounter();
    console.log(mod.counter); // 3
    console.log(mod.counter1); // 4
    console.log(mod.counterObj); // { counter: 4 }


// ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，
// 就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。@I
    // lib1.js
    export let counter = 3;
    export function incCounter() {
      counter++;
    }

    // main1.js
    import { counter, incCounter } from './lib';
    console.log(counter); // 3
    incCounter();
    console.log(counter); // 4 @I
// 由于 ES6 输入的模块变量，只是一个“符号连接”，所以这个变量是只读的，对它进行重新赋值会报错。
    // lib2.js
    export let obj = {};
    // main2.js  
    import { obj } from './lib';  // 好比创造了一个名为obj的const变量。
    obj.prop = 123; // OK
    obj = {}; // TypeError


// export通过接口，输出的是同一个值。不同的脚本加载这个接口，得到的都是同样的实例。
    // mod3.js
    function C() {
      this.sum = 0;
      this.add = function () {
        this.sum += 1;
      };
      this.show = function () {
        console.log(this.sum);
      };
    }
    export let c = new C();

    // x.js
    import {c} from './mod';
    c.add(); // 0 -> 1

    // y.js
    import {c} from './mod';
    c.show(); // log 1

    // main.js
    import './x';
    import './y';   




