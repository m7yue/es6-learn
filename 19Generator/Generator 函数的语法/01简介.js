// Generator 函数有多种理解角度。语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。
// 执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。
// 返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。
// yeild 产出


// 调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是遍历器对象（Iterator Object）。

// yield表达式是暂停执行的标记，而next方法可以恢复执行


// yield 表达式 
// 由于 Generator 函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield表达式就是暂停标志。 @I
    // 遍历器对象的next方法的运行逻辑如下。

    // （1）遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。

    // （2）下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式。

    // （3）如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。

    // （4）如果该函数没有return语句，则返回的对象的value属性值为undefined。

// yeild 后面的表达式是惰性求值的
function* gen() {
  yield  123 + 456;
}
// yield后面的表达式123 + 456，不会立即求值，只会在next方法将指针移到这一句时，才会求值。


// Generator 函数可以不用yield表达式，这时就变成了一个单纯的暂缓执行函数。
function* f() {
  console.log('执行了！')
}

var generator = f();

setTimeout(function () {
  generator.next()
}, 2000);


// 另外需要注意，yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。
// 会报错
var arr = [1, [[2, 3], 4], [5, 6]];
var flat = function* (a) {
  a.forEach(function (item) {
    if (typeof item !== 'number') {
      yield* flat(item);
    } else {
      yield item;
    }
  });
};


for (var f of flat(arr)){
  console.log(f);
}
// 正确写法
var arr = [1, [[2, 3], 4], [5, 6]];

var flat = function* (a) {
  var length = a.length;
  for (var i = 0; i < length; i++) {
    var item = a[i];
    if (typeof item !== 'number') {
      yield* flat(item);
    } else {
      yield item;
    }
  }
};

for (var f of flat(arr)) {
  console.log(f);
}
// 1, 2, 3, 4, 5, 6


// yield表达式如果用在另一个表达式之中，必须放在圆括号里面。
function* demo() {
  // console.log('Hello' + yield); // SyntaxError
  // console.log('Hello' + yield 123); // SyntaxError

  console.log('Hello' + (yield)); // OK
  console.log('Hello' + (yield 123)); // OK
}
let t = demo()
t.next()  // {value: undefined, done: false}
t.next()  //Helloundefined   {value: 123, done: false}
t.next() // Helloundefined  {value: undefined, done: true}

// yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号。 @I
function* demo() {
  foo(yield 'a', yield 'b'); // OK
  let input = yield; // OK
}
function foo(a,b){console.log(a,b)}
let g=demo()
g.next()  // {value: "a", done: false}
g.next(1) // {value: "b", done: false}
g.next(2) // undefined undefined    {value: undefined, done: false}
g.next() // {value: undefined, done: true}
