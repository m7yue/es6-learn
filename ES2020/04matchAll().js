// matchAll()方法返回一个正则表达式在当前字符串的所有匹配. 返回值是一个可迭代对象
console.log([...'abcd'.matchAll(/a/g)])