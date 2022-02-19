// 现在有一个提案，为 import 命令添加了一个元属性import.meta，返回当前模块的元信息。 @I

// import.meta只能在模块内部使用，如果在模块外部使用会报错。

// import.meta至少会有下面两个属性。

// （1）import.meta.url  返回当前模块的 URL 路径

// （2）import.meta.scriptElement   是浏览器特有的元属性，返回加载模块的那个<script>元素，相当于document.currentScript属性。
        // HTML 代码为
        // <script type="module" src="my-module.js" data-foo="abc"></script>

        // my-module.js 内部执行下面的代码
        import.meta.scriptElement.dataset.foo
        // "abc"