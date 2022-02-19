// 现在有一个提案，为 JavaScript 脚本引入了#!命令，写在脚本文件或者模块文件的第一行。
// 写在脚本文件第一行
    // #!/usr/bin/env node
    // 'use strict';
    // console.log(1);

// 写在模块文件第一行
    // #!/usr/bin/env node
    // export {};
    // console.log(1);


  // 有了这一行以后，Unix 命令行就可以直接执行脚本。 @I

    // # 以前执行脚本的方式
    // $ node hello.js

    // # hashbang 的方式
    // $ ./hello.js