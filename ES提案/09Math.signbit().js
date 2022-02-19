// 有一个提案，引入了Math.signbit()方法判断一个数的符号位是否设置了。
Math.signbit(2) //false
Math.signbit(-2) //true
Math.signbit(0) //false
Math.signbit(-0) //true

// 该方法的算法如下。

// 如果参数是NaN，返回false
// 如果参数是-0，返回true
// 如果参数是负值，返回true
// 其他情况返回false