// 字符串是一个类似数组的对象，也原生具有 Iterator 接口。
var someString = "hi";
typeof someString[Symbol.iterator]
// "function"
var iterator = someString[Symbol.iterator]();
iterator.next()  // { value: "h", done: false }
iterator.next()  // { value: "i", done: false }
iterator.next()  // { value: undefined, done: true }


// 可以覆盖原生的Symbol.iterator方法，达到修改遍历器行为的目的。@I
var str = new String("hello 7 yue");

[...str] // ["h", "e", "l", "l", "o", " ", "7", " ", "y", "u", "e"]

str[Symbol.iterator] = function() {
  return {
    next: function() {
      if (this.cur<str.split(' ').length) {
        return { value: str.split(' ')[this.cur++], done: false };
      } else {
        return { done: true };
      }
    },
    cur: 0
  };
};

[...str] // ["hello", "7", "yue"]