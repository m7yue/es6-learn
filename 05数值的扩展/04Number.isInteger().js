// Number.isInteger()用来判断一个数值是否为整数。

Number.isInteger(25) // true
Number.isInteger(25.1) // false

Number.isInteger(25) // true
Number.isInteger(25.0) // true
25.0 === 25 // true


// 如果参数不是数值，不进行转换，Number.isInteger返回false。
Number.isInteger() // false
Number.isInteger(null) // false
Number.isInteger('15') // false
Number.isInteger(true) // false


// 注意，由于 JavaScript 采用 IEEE 754 标准，数值存储为64位双精度格式，数值精度最多可以达到 53 个二进制位（1 个隐藏位与 52 个有效位）
// 。如果数值的精度超过这个限度，第54位及后面的位就会被丢弃，这种情况下，Number.isInteger可能会误判。@I
Number.isInteger(3.0000000000000002) // true
// 上面代码中，Number.isInteger的参数明明不是整数，但是会返回true。原因就是这个小数的精度达到了小数点后16个十进制位，转成二进制位超过了53个二进制位，导致最后的那个2被丢弃了。