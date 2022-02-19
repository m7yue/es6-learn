// 在 node.js 中ES6 模块和 CommonJS 采用各自的加载方案。从 v13.2 版本开始，Node.js 已经默认打开了 ES6 模块支持。

// Node.js 要求 ES6 模块采用.mjs后缀文件名。也就是说，只要脚本文件里面使用import或者export命令，
// 那么就必须采用.mjs后缀名。Node.js 遇到.mjs文件，就认为它是 ES6 模块，默认启用严格模式，不必在每个模块文件顶部指定"use strict"。

// 如果不希望将后缀名改成.mjs，可以在项目的package.json文件中，指定type字段为module。

// 如果这时还要使用 CommonJS 模块，那么需要将 CommonJS 脚本的后缀名都改成.cjs。
// 如果没有type字段，或者type字段为commonjs，则.js脚本会被解释成 CommonJS 模块。


// 总结为一句话：.mjs文件总是以 ES6 模块加载，.cjs文件总是以 CommonJS 模块加载，.js文件的加载取决于package.json里面type字段的设置。

// 注意，ES6 模块与 CommonJS 模块尽量不要混用。require命令不能加载.mjs文件，会报错，
// 只有import命令才可以加载.mjs文件。反过来，.mjs文件里面也不能使用require命令，必须使用import。