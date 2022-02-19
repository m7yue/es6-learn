// exports字段的优先级高于main字段。它有多种用法。
// （1）子目录别名   package.json文件的exports字段可以指定脚本或子目录的别名。
    // ./node_modules/es-module-package/package.json
    // {
    //   "exports": {
    //     "./submodule": "./src/submodule.js"
    //   }
    // }
    // 然后就可以从别名加载这个文件。
    import submodule from 'es-module-package/submodule';
    // 加载 ./node_modules/es-module-package/src/submodule.js

    // 子目录别名的例子。
    // ./node_modules/es-module-package/package.json
    // {
    //   "exports": {
    //     "./features/": "./src/features/"
    //   }
    // }

    import feature from 'es-module-package/features/x.js';
    // 加载 ./node_modules/es-module-package/src/features/x.js


    // 如果没有指定别名，就不能用“模块+脚本名”这种形式加载脚本。
    // 报错
    import submodule from 'es-module-package/private-module.js';

    // 不报错
    import submodule from './node_modules/es-module-package/private-module.js';



// （2）main 的别名   exports字段的别名如果是.，就代表模块的主入口，优先级高于main字段，并且可以直接简写成exports字段的值。
    // {
    //   "exports": {
    //     ".": "./main.js"
    //   }
    // }

    // {
    //   "exports": "./main.js"
    // }

    // 由于exports字段只有支持 ES6 的 Node.js 才认识，所以可以用来兼容旧版本的 Node.js。
        // {
        //   "main": "./main-legacy.cjs",
        //   "exports": {
        //     ".": "./main-modern.cjs"
        //   }
        // }
      // 上面代码中，老版本的 Node.js （不支持 ES6 模块）的入口文件是main-legacy.cjs，新版本的 Node.js 的入口文件是main-modern.cjs。


// （3）条件加载   利用.这个别名，可以为 ES6 模块和 CommonJS 指定不同的入口。目前，这个功能需要在 Node.js 运行的时候，打开--experimental-conditional-exports标志。
    // {
    //   "type": "module",
    //   "exports": {
    //     ".": {
    //       "require": "./main.cjs",
    //       "default": "./main.js"
    //     }
    //   }
    // }
  // 上面代码中，别名.的require条件指定require()命令的入口文件（即 CommonJS 的入口），default条件指定其他情况的入口（即 ES6 的入口）。

  // 上面的写法可以简写如下。
    // {
    //   "exports": {
    //     "require": "./main.cjs",
    //     "default": "./main.js"
    //   }
    // }
  // 注意，如果同时还有其他别名，就不能采用简写，否则或报错。
    // {
    //   // 报错
    //   "exports": {
    //     "./feature": "./lib/feature.js",
    //     "require": "./main.cjs",
    //     "default": "./main.js"
    //   }
    // }