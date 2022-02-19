// 目前，一个模块同时支持 ES6 和 CommonJS 两种格式的常见方法是，package.json文件的main字段指定 CommonJS 入口，
// 给 Node.js 使用；module字段指定 ES6 模块入口，给打包工具使用，因为 Node.js 不认识module字段。

// ./node_modules/pkg/package.json
    // {
    //   "type": "module",
    //   "main": "./index.cjs",
    //   "exports": {
    //     "require": "./index.cjs",
    //     "default": "./wrapper.mjs"
    //   }
    // }

// 上面代码指定了 CommonJS 入口文件index.cjs，下面是这个文件的代码。   
    // ./node_modules/pkg/index.cjs
    exports.name = 'value';

// 然后，ES6 模块可以加载这个文件。
  // ./node_modules/pkg/wrapper.mjs
  import cjsModule from './index.cjs';
  export const name = cjsModule.name;

// 注意，import命令加载 CommonJS 模块，只能整体加载，不能只加载单一的输出项。
  // 正确
  import packageMain from 'commonjs-package';
  // 报错
  import { method } from 'commonjs-package';


// 还有一种变通的加载方法，就是使用 Node.js 内置的module.createRequire()方法。z  
  // cjs.cjs
  module.exports = 'cjs';

  // esm.mjs
  import { createRequire } from 'module';

  const require = createRequire(import.meta.url);

  const cjs = require('./cjs.cjs');
  cjs === 'cjs'; // true