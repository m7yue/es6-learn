// JavaScript 所有数字都保存成 64 位浮点数，这给数值的表示带来了两大限制。一是数值的精度只能到 53 个二进制位（相当于 16 个十进制位），大于这个范围的整数，
// JavaScript 是无法精确表示的，这使得 JavaScript 不适合进行科学和金融方面的精确计算。二是大于或等于2的1024次方的数值，JavaScript 无法表示，会返回Infinity。

// 超过 53 个二进制位的数值，无法保持精度
Math.pow(2, 53) === Math.pow(2, 53) + 1 // true
// 超过 2 的 1024 次方的数值，无法表示
Math.pow(2, 1024) // Infinity

// ES2020 引入了一种新的数据类型 BigInt（大整数），来解决这个问题，这是 ECMAScript 的
// 第八种数据类型(Number、String、Boolean、Null、undefined、object、symbol、bigInt)。
// BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。
const a = 2172141653n; // typeof a // 'bigint'
const b = 15346349309n;
// BigInt 可以保持精度
a * b // 33334444555566667777n

// 为了与 Number 类型区别，BigInt 类型的数据必须添加后缀n


// BigInt 同样可以使用各种进制表示，都要加上后缀n。
0b1101n // 二进制
0o777n // 八进制
0xFFn // 十六进制


// BigInt 与普通整数是两种值，它们之间并不相等。
42n === 42 // false


// typeof运算符对于 BigInt 类型的数据返回bigint。
typeof 123n // 'bigint'


// BigInt 可以使用负号（-），但是不能使用正号（+），因为会与 asm.js 冲突。
-42n // 正确
+42n // 报错


// JavaScript 以前不能计算70的阶乘（即70!），因为超出了可以表示的精度。
let p = 1;
for (let i = 1; i <= 70; i++) {
  p *= i;
}
console.log(p); // 1.197857166996989e+100

let p = 1n;
for (let i = 1n; i <= 70n; i++) {
  p *= i;
}
console.log(p); // 11978571669969891796072783721689098736458938142546425857555362864628009582789845319680000000000000000n



// BigInt 对象
// JavaScript 原生提供BigInt对象，可以用作构造函数生成 BigInt 类型的数值。转换规则基本与Number()一致，将其他类型的值转为 BigInt。
BigInt(123) // 123n
BigInt('123') // 123n
BigInt(false) // 0n
BigInt(true) // 1n

// BigInt()构造函数必须有参数，而且参数必须可以正常转为数值，下面的用法都会报错。
new BigInt() // TypeError
BigInt(undefined) //TypeError
BigInt(null) // TypeError   Number(null) 为0
BigInt('123n') // SyntaxError  字符串123n无法解析成 Number 类型，所以会报错。
BigInt('abc') // SyntaxError
// 参数如果是小数，也会报错。
BigInt(1.5) // RangeError
BigInt('1.5') // SyntaxError


// 转换规则
// 可以使用Boolean()、Number()和String()这三个方法，将 BigInt 可以转为布尔值、数值和字符串类型。
Boolean(0n) // false  取反运算符（!）也可以将 BigInt 转为布尔值
Boolean(1n) // true
Number(1n)  // 1
String(1n)  // "1"  转为字符串时后缀n会消失



// 数学运算
// 数学运算方面，BigInt 类型的+、-、*和**这四个二元运算符，与 Number 类型的行为一致。除法运算/会舍去小数部分，返回一个整数。
9n / 5n// 1n
// 几乎所有的数值运算符都可以用在 BigInt，但是有两个例外。
//   不带符号的右移位运算符>>>
//   一元的求正运算符+

1n + 1.3 // 报错


// 错误的写法
Math.sqrt(4n) // 报错
// 正确的写法
Math.sqrt(Number(4n)) // 2


// 其他运算
// BigInt 对应的布尔值，与 Number 类型一致，即0n会转为false，其他值转为true。
if (0n) {
  console.log('if');
} else {
  console.log('else');
}


// 比较运算符（比如>）和相等运算符（==）允许 BigInt 与其他类型的值混合计算，因为这样做不会损失精度。
0n < 1 // true
0n < true // true
0n == 0 // true
0n == false // true
0n === 0 // false