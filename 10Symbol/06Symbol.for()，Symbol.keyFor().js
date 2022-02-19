// 有时，我们希望重新使用同一个 Symbol 值，Symbol.for()方法可以做到这一点。 @I
// 它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，
// 就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局。这个全局范围包含：当前页面，iframe,serviceWorker
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');
s1 === s2 // true

Symbol("bar") === Symbol("bar")
// false

// Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的key。 Symbol.for 登记的 @I
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"
let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined

let s1 = Symbol.for("key特长key特长key特长key特长key特长key特长key特长key特长key特长key特长key特长key特长key特长")
let s2 = Symbol.for(Symbol.keyFor(s1))
s1===s2 // true


// 注意，Symbol.for()为 Symbol 值登记的名字，是全局环境的，不管有没有在全局环境运行。  @I
function foo() {
  return Symbol.for('bar');
}
const x = foo();
const y = Symbol.for('bar');
console.log(x === y); // true
// 上面代码中，Symbol.for('bar')是函数内部运行的，但是生成的 Symbol 值是登记在全局环境的。所以，第二次运行Symbol.for('bar')可以取到这个 Symbol 值。

// Symbol.for()的这个全局登记特性，可以用在不同的 iframe 或 service worker 中取到同一个值。
iframe = document.createElement('iframe');
iframe.src = String(window.location);
document.body.appendChild(iframe);

iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo')