// yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作 上一个@I yield表达式的返回值。
function* f() {
  for(var i = 0; true; i++) {
    var reset = yield i;
    if(reset) { i = -1; }
  }
}

var g = f();

g.next() // { value: 0, done: false }
g.next() // { value: 1, done: false }
g.next() // { value: 2, done: false }
g.next(true) // { value: 0, done: false }



// 这个功能有很重要的语法意义。Generator 函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。通过next方法的参数，就有办法在 Generator 
// 函数开始运行之后，继续向函数体内部注入值。也就是说，可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }

// 注意，由于next方法的参数表示上一个yield表达式的返回值，所以在第一次使用next方法时，传递参数是无效的。@I
// V8 引擎直接忽略第一次使用next方法时的参数，只有从第二次使用next方法开始，参数才是有效的。从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数。


// 如果想要第一次调用next方法时，就能够输入值，可以在 Generator 函数外面再包一层。
function wrapGnerator(g){
  return function(...args){
    let itor = g(...args)
    itor.next()
    return itor
  }
}
const wrap = wrapGnerator(function *(){
  console.log(`输入值：${yeild}`)
  return 'done'
})
wrap().next('7 yue') // 输入值：7 yue  {value: "done", done: true}