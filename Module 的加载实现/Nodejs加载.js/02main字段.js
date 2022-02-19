// main 字段
// package.json文件有两个字段可以指定模块的入口文件：main和exports。
// 比较简单的模块，可以只使用main字段，指定模块加载的入口文件。
  // ./node_modules/es-module-package/package.json
    // {
    //   "type": "module",
    //   "main": "./src/index.js"
    // }
  // 然后，import命令就可以加载这个模块。
    // ./my-app.mjs
    import { something } from 'es-module-package';
    // 实际加载的是 ./node_modules/es-module-package/src/index.js