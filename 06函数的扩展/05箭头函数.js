var f = v => v;

// 如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。
var f = () => 5;
var sum = (num1, num2) => num1 + num2;

// 如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。
var sum = (num1, num2) => { return num1 + num2; }


// 由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。
// 报错
// let getTempItem = id => { id: id, name: "Temp" };
// 不报错
let getTempItem = id => ({ id: id, name: "Temp" });

let foo = () => { a: 1 };
// babel 转码
var foo = function foo() {
  a: 1;
};
foo() // undefined


// 如果箭头函数只有一行语句，且不需要返回值，可以采用下面的写法，就不用写大括号了。
let fn = () => void doesNotReturn()
let fn = () => void 7
fn() // undefined
let fn = () => 7
fn() // 7


// 箭头函数可以与变量解构结合使用。
const full = ({ first, last }) => first + ' ' + last;


// 使用注意点 
  // （1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
  // （2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
  // （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
  // （4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
  // （5）由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。
  // （6）以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target。

function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  // 箭头函数
  setInterval(() => this.s1++, 1000); // this 指向 Timer 实例
  // 普通函数
  setInterval(function () {
    this.s2++; // this 指向 window
  }, 1000);
}
var timer = new Timer();
setTimeout(() => console.log('s1: ', timer.s1), 3100); // 4 正确答案是3  setInterval 不是立即执行
setTimeout(() => console.log('s2: ', timer.s2), 3100); // 0
// this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，
// 导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数。


// 箭头函数转成 ES5 的代码如下
// ES6
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}
// ES5
function foo() {
  var _this = this;

  setTimeout(function () {
    console.log('id:', _this.id);
  }, 100);
}


function foo() {
  return () => {
    return () => {
      return () => {
        console.log('id:', this.id);
      };
    };
  };
}
var f = foo.call({id: 1});
var t1 = f.call({id: 2})()(); // id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4}); // id: 1
// 上面代码之中，只有一个this，就是函数foo的this，所以t1、t2、t3都输出同样的结果。
// 因为所有的内层函数都是箭头函数，都没有自己的this，它们的this其实都是最外层foo函数的this。

// 除了this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target。



// 不适用场合
// 第一个场合是定义对象的方法，且该方法内部包括this。
const cat = {
  lives: 9,
  jumps: () => {
    this.lives--;
  }
}
// 调用cat.jumps()时，如果是普通函数，该方法内部的this指向cat；
// 如果写成上面那样的箭头函数，使得this指向全局对象，因此不会得到预期结果。
// 这是因为对象不构成单独的作用域，导致jumps箭头函数定义时的作用域就是全局作用域。

// 第二个场合是需要动态this的时候，也不应使用箭头函数。
var button = document.getElementById('press');
button.addEventListener('click', () => {
  this.classList.toggle('on');
});
// 上面代码运行时，点击按钮会报错，因为button的监听函数是一个箭头函数，导致里面的this就是全局对象。如果改成普通函数，this就会动态指向被点击的按钮对象。


// 另外，如果函数体很复杂，有许多行，或者函数内部有大量的读写操作，不单纯是为了计算值，这时也不应该使用箭头函数，而是要使用普通函数，这样可以提高代码可读性。



// 嵌套的箭头函数
// 管道机制（pipeline）的例子，即前一个函数的输出是后一个函数的输入。
const pipeline = (...funcs) => val => funcs.reduce((a, b) => b(a), val);
const plus1 = a => a + 1;
const mult2 = a => a * 2;
const addThenMult = pipeline(plus1, mult2);
addThenMult(5) // 12

// redux 中间件源码辅助函数, 从后往前执行
const compose = (...funcs) =>  funcs.reduce((a, b) => (...args) => a(b(...args)))
const plus1 = a => a + 1;
const mult2 = a => a * 2;
const mult3 = a => a + 1;
const addThenMult = compose(plus1, mult2, mult3); // reduce 返回的函数
addThenMult(5) // 13

// 另一种等价写法
const compose = (...funcs) => (...args) => funcs.reduce((a, b) => a(b(...args)))
const plus1 = a => a + 1;
const mult2 = a => a * 2;
const mult3 = a => a + 1;
const addThenMult = compose(plus1, mult2, mult3); // 返回函数 reduce 返回值
addThenMult(5) // 13