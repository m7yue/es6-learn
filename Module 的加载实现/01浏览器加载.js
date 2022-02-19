// 传统方法

// 默认情况下，浏览器是同步加载 JavaScript 脚本，即渲染引擎遇到<script>标签就会停下来，
// 等到执行完脚本，再继续向下渲染。如果是外部脚本，还必须加入脚本下载的时间。

// 如果脚本体积很大，下载和执行的时间就会很长，因此造成浏览器堵塞，用户会感觉到浏览器“卡死”了，
// 没有任何响应。这显然是很不好的体验，所以浏览器允许脚本异步加载，下面就是两种异步加载的语法。
    // <script src="path/to/myModule.js" defer></script>
    // <script src="path/to/myModule.js" async></script>

// defer与async的区别
    // defer要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行
    // async一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。
    // 如果有多个defer脚本，会按照它们在页面出现的顺序加载，而多个async脚本是不能保证加载顺序的。


// 加载规则
// 浏览器加载 ES6 模块，也使用<script>标签，但是要加入type="module"属性。
<script type="module" src="./foo.js"></script>
// 浏览器对于带有type="module"的<script>，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了<script>标签的defer属性。@I
// 如果网页有多个<script type="module">，它们会按照在页面出现的顺序依次执行。@I


// ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。
  // <script type="module">
  //   import utils from "./utils.js";

  //   // other code
  // </script>


  // 对于外部的模块脚本（上例是foo.js），有几点需要注意。
      // 代码是在模块作用域之中运行，而不是在全局作用域运行。模块内部的顶层变量，外部不可见。
      // 模块脚本自动采用严格模式，不管有没有声明use strict。
      // 模块之中，可以使用import命令加载其他模块（.js后缀不可省略，需要提供绝对 URL 或相对 URL），也可以使用export命令输出对外接口。
      // 模块之中，顶层的this关键字返回undefined，而不是指向window。也就是说，在模块顶层使用this关键字，是无意义的。@I
      // 同一个模块如果加载多次，将只执行一次。
    import utils from 'https://example.com/js/utils.js';
    const x = 1;
    console.log(x === window.x); //false
    console.log(this === undefined); // true
    // 利用顶层的this等于undefined这个语法点，可以侦测当前代码是否在 ES6 模块之中。
    const isNotModuleScript = this !== undefined;





