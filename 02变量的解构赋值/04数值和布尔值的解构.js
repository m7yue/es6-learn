let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: bol} = true;
bol === Boolean.prototype.toString // true

//解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。@I
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError