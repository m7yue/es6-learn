// 表达式 || , 某个属性的值是null或undefined 或 空字符串 或 false 或 0 或 NaN 都会生效
let a = '' || 7 // 7
let a = 0 || 7 // 7
let a = false || 7 // 7
let a = NaN || 7 // 7
let a = undefined || 7 // 7
let a = null || 7 // 7

// ES2020 引入了一个新的 Null 判断运算符??。它的行为类似||，但是只有运算符左侧的值为null或undefined时，才会返回右侧的值。 @I
let a = '' ?? 7 // ''
let a = 0 ?? 7 // 0
let a = false ?? 7 // false
let a = NaN ?? 7 // NaN
let a = undefined ?? 7 // 7
let a = null ?? 7 // 7

// ??有一个运算优先级问题，它与&&和||的优先级孰高孰低。现在的规则是，如果多个逻辑运算符一起使用，必须用括号表明优先级，否则会报错。

