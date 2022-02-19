// CommonJS 的require命令不能加载 ES6 模块，会报错，只能使用import()这个方法加载。

(async () => {
  await import('./my-app.mjs');
})();

// 上面代码可以在 CommonJS 模块中运行。