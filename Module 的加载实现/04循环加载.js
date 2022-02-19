// CommonJS 模块的加载原理

// CommonJS 的一个模块，就是一个脚本文件。require命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象。
    // {
    //   id: '...',  // 模块名
    //   exports: { ... }, // 模块输出的各个接口
    //   loaded: true, // 是一个布尔值，表示该模块的脚本是否执行完毕。
    //   ...
    // }

// 以后需要用到这个模块的时候，就会到exports属性上面取值。即使再次执行require命令，也不会再次执行该模块，而是到缓存之中取值。
// 也就是说，CommonJS 模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。


// CommonJS 模块的循环加载
// CommonJS 模块的重要特性是加载时执行，即脚本代码在require的时候，就会全部执行。
// 一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。
// https://es6.ruanyifeng.com/#docs/module-loader 该部分例子


// ES6 模块的循环加载
// https://es6.ruanyifeng.com/#docs/module-loader#%E5%BE%AA%E7%8E%AF%E5%8A%A0%E8%BD%BD


