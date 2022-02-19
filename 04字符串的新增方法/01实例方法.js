// includes(), startsWith(), endsWith() 
  // includes()：返回布尔值，表示是否找到了参数字符串。
  // startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
  // endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
let s = 'Hello world!';
s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true

// 这三个方法都支持第二个参数，表示开始搜索的位置。
let s = 'Hello world!';
s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false


// repeat方法返回一个新字符串，表示将原字符串重复n次。
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""

// 如果repeat的参数是负数或者Infinity，会报错。
'na'.repeat(Infinity)
// RangeError
'na'.repeat(-1)
// RangeError

// 但是，如果参数是 0 到-1 之间的小数，则等同于 0，这是因为会先进行取整运算。0 到-1 之间的小数，取整以后等于-0，repeat视同为 0。
'na'.repeat(-0.9) // ""

// 参数NaN等同于 0。
'na'.repeat(NaN) // ""

// 如果repeat的参数是字符串，则会先转换成数字。
'na'.repeat('na') // ""
'na'.repeat('3') // "nanana"


// 实例方法：padStart()，padEnd()
// ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。
// 一共接受两个参数，第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串。
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'

// 如果省略第二个参数，默认使用空格补全长度。
'x'.padStart(4) // '   x'
'x'.padEnd(4) // 'x   '

// padStart()的常见用途是为数值补全指定位数。
'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"



// 实例方法：trimStart()，trimEnd()
// ES2019 对字符串实例新增了trimStart()和trimEnd()这两个方法。它们的行为与trim()一致，
// trimStart()消除字符串头部的空格，trimEnd()消除尾部的空格。它们返回的都是新字符串，不会修改原始字符串。
// 除了空格键，这两个方法对字符串头部（或尾部）的 tab 键、换行符等不可见的空白符号也有效。@I
// 浏览器还部署了额外的两个方法，trimLeft()是trimStart()的别名，trimRight()是trimEnd()的别名。
const s = '  abc  ';
s.trim() // "abc"
s.trimStart() // "abc  "
s.trimEnd() // "  abc"


// matchAll()方法返回一个正则表达式在当前字符串的所有匹配. 返回值是一个可迭代对象
console.log([...'abcd'.matchAll(/a/g)])
