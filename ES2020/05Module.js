// import和export命令只能在模块的顶层，不能在代码块之中（比如，在if代码块之中，或在函数之中）。

// 这样的设计，固然有利于编译器提高效率，但也导致无法在运行时加载模块。在语法上，条件加载就不可能实现。
// 如果import命令要取代 Node 的require方法，这就形成了一个障碍。因为require是运行时加载模块，import命令无法取代require的动态加载功能。


// ES2020提案 引入import()函数，支持动态加载模块。
import(specifier)
// import函数的参数specifier，指定所要加载的模块的位置。import命令能够接受什么参数，import()函数就能接受什么参数，两者区别主要是后者为动态加载。


// import()返回一个 Promise 对象。下面是一个例子。
const main = document.querySelector('main');

import(`./section-modules/${someVariable}.js`)
  .then(module => {
    module.loadPageInto(main);
  })
  .catch(err => {
    main.textContent = err.message;
  });

// import()函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。
// 它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块。
// 另外，import()函数与所加载的模块没有静态连接关系，这点也是与import语句不相同。
// import()类似于 Node 的require方法，区别主要是前者是异步加载，后者是同步加载。



// import() 适用场合

// （1）按需加载。  import()可以在需要的时候，再加载某个模块。
button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
});


// （2）条件加载   import()可以放在if代码块，根据不同的情况，加载不同的模块。
if (condition) {
  import('moduleA').then();
} else {
  import('moduleB').then();
}


// 动态的模块路径  import()允许模块路径动态生成。
import(f())
.then()


// 注意点
// import()加载模块成功以后，这个模块会作为一个对象，当作then方法的参数。因此，可以使用对象解构赋值的语法，获取输出接口。
import('./myModule.js')
.then(({export1, export2}) => {
  // ...·
});

// 如果模块有default输出接口，可以用参数直接获得。
import('./myModule.js')
.then(myModule => {
  console.log(myModule.default);
});
// 上面的代码也可以使用具名输入的形式。
import('./myModule.js')
.then(({default: theDefault}) => {
  console.log(theDefault);
});

// 如果想同时加载多个模块，可以采用下面的写法。
Promise.all([
  import('./module1.js'),
  import('./module2.js'),
  import('./module3.js'),
])
.then(([module1, module2, module3]) => {
});


// import()也可以用在 async 函数之中。
async function main() {
  const myModule = await import('./myModule.js');
  const {export1, export2} = await import('./myModule.js');
  const [module1, module2, module3] =
    await Promise.all([
      import('./module1.js'),
      import('./module2.js'),
      import('./module3.js'),
    ]);
}
main();


