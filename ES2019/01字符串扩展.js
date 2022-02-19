// 实例方法：trimStart()，trimEnd()
// ES2019 对字符串实例新增了trimStart()和trimEnd()这两个方法。它们的行为与trim()一致，trimStart()消除字符串头部的空格，trimEnd()消除尾部的空格。它们返回的都是新字符串，不会修改原始字符串。
// 除了空格键，这两个方法对字符串头部（或尾部）的 tab 键、换行符等不可见的空白符号也有效。
// 浏览器还部署了额外的两个方法，trimLeft()是trimStart()的别名，trimRight()是trimEnd()的别名。
const s = '  abc  ';
s.trim() // "abc"
s.trimStart() // "abc  "
s.trimEnd() // "  abc"


// JSON.stringify()改造：可返回不符合UTF-8标准的字符串


// 直接输入U+2028和U+2029：字符串可直接输入行分隔符和段分隔符